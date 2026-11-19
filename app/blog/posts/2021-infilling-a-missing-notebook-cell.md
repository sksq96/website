---
title: "Filling in missing code in Jupyter notebooks"
publishedAt: "2021"
summary: "Filling in missing code in Jupyter notebooks"
reviewDraft: "true"
---

25th September 2021

Jupyter notebooks are an interactive data exploration tool used widely by data scientists and analysts. They serve as a digital notebook, allowing code to be easily inspected and modified.

Problems can occur due to the unstructured nature of the tool - in particular, cells in a notebook can be run out of order, leading to issues during later attempts to reproduce results.

Suppose we have an empty cell in a Jupyter notebook, how can we infer the code in that cell?

We can approach this by comparing two models: the first that is trained only on code which precedes the empty cell (the 'prefix'), and the second which is trained on code from the cell which comes after the empty cell (the 'suffix'). The extent to which the second model performs better than the first therefore indicates how much information the suffix contains about the empty cell.

We can evaluate on empty cells in two scenarios: when the suffix is available, and when the suffix is missing (as in the case when the empty cell is the last cell in the notebook).

## Example

As an example, suppose we have a notebook which contains two code cells. The first cell loads a dataset `sales.csv` into Pandas, and the second cell groups the data by `date` and sums the `revenue` column:

```
df = pd.read_csv("sales.csv") 
```

```
result = df.groupby("date")["revenue"].sum()
```

If the middle cell is empty, in the first scenario we must rely only on the contents of the preceding cell(s) to infer the contents of the empty cell. The fact that the cell loads `sales.csv` into a Pandas dataframe tells us something, but not enough to know exactly how the next cell will use the dataframe.

The second scenario also assumes the availability of the suffix, i.e. the contents of the next cell after the empty cell. In our example, the next cell uses a variable `df`. This tells us that the empty cell must have defined `df`. The fact that the next cell calls `.groupby` on `df` and passes `revenue` as a column name to the `.sum()` method tells us that `df` must be a Pandas dataframe. This gives us much more information than the first scenario.

## Evaluation

I used the [Google BigQuery Public Datasets](https://console.cloud.google.com/marketplace?project=&page=browse&organizationId=&productIdFilter=dataset-id:*). As of July 2020, there were over 2TB of data from 149 datasets, including GitHub and Hacker News, as well as datasets from the US and European governments, data from NASA, and more. I focused on the [GitHub Archive dataset](https://console.cloud.google.com/marketplace/product/github/github-repos?project=&organizationId=) which contains all public GitHub activity. In particular, I was interested in Jupyter notebooks (`.ipynb` files) committed to repositories.

I used Google BigQuery to retrieve the URLs of these notebook files. After filtering for notebooks with at least 3 cells, there were 1,176,479 notebooks. Due to the large size of the dataset, I subsampled 100,000 notebooks, of which 16,503 were Python notebooks.

For each notebook, I split the notebook into segments of code cells delimited by empty cells. I then picked one of the empty cells at random as the cell to predict. The code in the empty cell serves as the ground truth. For each example, I use up to a maximum of 1,000 preceding tokens as context.

To evaluate our model, we can compute the average log likelihood per token, which I denote as $\mathcal{L}_{t}$ (we filter out cells with more than 1,000 tokens).

I use a GPT-2 model which is a causal language model. GPT-2 is a transformer-based model that is trained to predict the next word, conditioned on previous words. I chose [`gpt2-medium`](https://github.com/huggingface/transformers/tree/master/examples/language-modeling#training) which has 345M parameters and was trained on 40GB of text from the WebText dataset. GPT-2 has been shown to be capable of generating coherent text, however, it cannot generate text conditioned on future text. Therefore, we need to treat the suffix in a special way.

### Prefix-only model

Our first model conditions on only the prefix ($\text{prefix}$), i.e. the code preceding the empty cell. In other words, the likelihood of the empty cell is computed as $p(\text{empty} \mid \text{prefix})$.

```
def evaluate(self, dataset, prefix_only=False):
    """
    Computes the average log likelihood per token
    of the code in the empty cell conditioned on the prefix

    Arguments:
        dataset: list of dicts in the form {"prefix": "...", "empty": "...", "suffix": "..."}
        prefix_only: unused
    Returns:
        a tensor of shape (len(dataset),)
    """
    nlls = []
    with torch.no_grad():
        for i, example in enumerate(dataset):
            prefix, empty = example["prefix"], example["empty"]
            context = prefix + "\n##### CODE CELL\n"
            context_enc = self.tokenizer.encode(context)
            empty_enc = self.tokenizer.encode(empty)
            n_tokens = len(empty_enc)
            input_ids = torch.tensor([context_enc + empty_enc])
            input_ids = input_ids.to(self.device)
            output = self.model(input_ids, labels=input_ids)
            
            nlls.append(output[0].mean())
            
    return torch.tensor(nlls)
```

### Suffix-only model

Our second model is trained on the suffix ($\text{suffix}$), i.e. the code after the empty cell. Specifically, the model is trained to generate the suffix conditioned on the prefix and the empty cell ($p(\text{suffix} \mid \text{prefix}, \text{empty})$). During test time, we use Bayes' Rule to compute the likelihood of the empty cell given the suffix, and also condition on the prefix:

$$
\begin{aligned}
\underbrace{p(\text{empty} \mid \text{prefix}, \text{suffix})}_{\mathcal{L}_{\text{empty}}} &\propto p(\text{suffix} \mid \text{prefix}, \text{empty}) p(\text{empty} \mid \text{prefix}) \\
&= p(\text{suffix} \mid \text{prefix}, \text{empty}) \underbrace{p(\text{empty} \mid \text{prefix})}_{\mathcal{L}_{\text{prefix}}}
\end{aligned}
$$

$\mathcal{L}_{\text{prefix}}$ is the same likelihood as the first model.

The intuition behind the suffix-only model is that the suffix should be a good predictor of the empty cell. This is because when the suffix is the next cell after the empty cell, it is likely that the suffix depends on variables defined in the empty cell, and the suffix may also give clues as to how those variables were used.

### Prefix and suffix model

The third model conditions on both the prefix and the suffix. As with the suffix-only model, we can use Bayes' Rule to compute the likelihood of the empty cell given the prefix and the suffix:

$$
\underbrace{p(\text{empty} \mid \text{prefix}, \text{suffix})}_{\mathcal{L}_{\text{empty}}} \propto 
\underbrace{p(\text{suffix} \mid \text{prefix}, \text{empty})}_{\mathcal{L}_{\text{suffix}}} \underbrace{p(\text{empty} \mid \text{prefix})}_{\mathcal{L}_{\text{prefix}}}
$$

$\mathcal{L}_{\text{prefix}}$ and $\mathcal{L}_{\text{suffix}}$ are the same as the first and second models respectively, so there is little extra code to implement. We just need to add the log likelihoods from the first and second models.

```
def evaluate(self, dataset):
    """
    Computes the average log likelihood per token
    of the code in the empty cell conditioned on the prefix and suffix

    Arguments:
        dataset: list of dicts in the form {"prefix": "...", "empty": "...", "suffix": "..."}
    Returns:
        a tensor of shape (len(dataset),)
    """
    nlls = []
    with torch.no_grad():
        for i, example in enumerate(dataset):
            prefix, empty, suffix = example["prefix"], example["empty"], example["suffix"]
            context = prefix + "\n##### CODE CELL\n" + empty + "\n##### CODE CELL\n"
            context_enc = self.tokenizer.encode(context)
            suffix_enc = self.tokenizer.encode(suffix)
            n_tokens = len(suffix_enc)
            input_ids = torch.tensor([context_enc + suffix_enc])
            input_ids = input_ids.to(self.device)
            output = self.model(input_ids, labels=input_ids)
            
            nlls.append(output[0].mean())
            
    return torch.tensor(nlls)
```

I've used the notation $\mathcal{L}_{\text{prefix}}$,$\mathcal{L}_{\text{suffix}}$ and $\mathcal{L}_{\text{empty}}$ to denote the log likelihood of the prefix, suffix and empty cell respectively.

### Infilling model

The final model is a model trained on the task of infilling. This is a different model to the previous three, as it performs the infilling task directly. The infilling model is trained to generate the empty cell conditioned on the prefix and suffix ($p(\text{empty} \mid \text{prefix}, \text{suffix})$).1

I did not perform any training of the models. Instead, I evaluated the models on the test set.

## Results

The performance of the suffix-only model is very poor compared to the other models. This is expected, as the suffix is not a good predictor of the empty cell:

![Results](results.png)
![Results](result-infilling.png)

The difference in likelihoods between when the suffix is available versus when the suffix is not available is computed as

$$
\begin{aligned}\text{prefix \& suffix} - \text{prefix-only} &= p(\text{empty} \mid \text{prefix}, \text{suffix}) - p(\text{empty} \mid \text{prefix}) \\&= p(\text{suffix} \mid \text{prefix}, \text{empty}) \underbrace{p(\text{empty} \mid \text{prefix})}_{\mathcal{L}_{\text{prefix}}} - p(\text{empty} \mid \text{prefix}) \\&= \underbrace{p(\text{empty} \mid \text{prefix})}_{\mathcal{L}_{\text{prefix}}} (p(\text{suffix} \mid \text{prefix}, \text{empty}) - 1)\end{aligned}
$$

![Results](results-other.png)

## References

1.["Evaluating Large Language Models Trained on Code"](https://arxiv.org/abs/2107.03374) by Mark Chen, Jerry Tworek, Heewoo Jun, Qiming Yuan, Henrique Ponde de Oliveira Pinto, Jared Kaplan, Harri Edwards, Yuri Burda, Nicholas Joseph, Greg Brockman, Alex Ray, Raul Puri, Gretchen Krueger, Michael Petrov, Heidy Khlaaf, Girish Sastry, Pamela Mishkin, Brooke Chan, Scott Gray, Nick Ryder, Mikhail Pavlov, Alethea Power, Lukasz Kaiser, Mohammad Bavarian, Clemens Winter, Philippe Tillet, Felipe Petroski Such, Dave Cummings, Matthias Plappert, Fotios Chantzis, Elizabeth Barnes, Ariel Herbert-Voss, William Hebgen Guss, Alex Nichol, Alex Paino, Nikolas Tezak, Jie Tang, Igor Babuschkin, Suchir Balaji, Shantanu Jain, William Saunders, Christopher Hesse, Andrew N. Carr, Jan Leike, Joshua Achiam, Vedant Misra, Evan Morikawa, Alec Radford, Matthew Knight, Miles Brundage, Mira Murati, Katie Mayer, Peter Welinder, Bob McGrew, Dario Amodei, Sam McCandlish, Ilya Sutskever, Wojciech Zaremba