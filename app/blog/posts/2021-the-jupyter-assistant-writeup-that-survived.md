---
title: "Using pretrained language models to build a Jupyter notebook assistant"
publishedAt: "2021"
summary: "Using pretrained language models to build a Jupyter notebook assistant"
reviewDraft: "true"
---

In a recent project, I explored how we can use the capabilities of pretrained language models to assist data scientists in their Jupyter notebook workflows. Here I’ll walk through my thought process, technical details, and potential next steps.

*Update (Jan 2022): the work described in this blogpost is now available as a paper with more experiments! You can check it out [here](https://arxiv.org/pdf/2112.07832.pdf) and the code for the paper at [github.com/sksq96/jupyter-copilot](https://github.com/sksq96/jupyter-copilot).*
<hr>

## The power and pitfalls of Jupyter notebooks

Jupyter notebooks are a fantastic tool for data scientists. They enable us to quickly prototype, debug, and communicate our work. However, notebooks have several usability issues, including:

1. The user often has to switch back and forth between the notebook and a web browser to look up solutions to simple problems, which can be tedious and time-consuming.
2. The notebook’s state is not always in sync with the source code, leading to challenges in reproducing results.
3. The user can get stuck in an infinite loop of debugging and Googling, which can be frustrating and lead to burnout.

In fact, these issues are not unique to Jupyter notebooks. They are common to many interactive programming environments. In this project, I focus on the first issue and explore how we can use the capabilities of pretrained language models to assist data scientists in their Jupyter notebook workflows.

## The Dataset

I used the [Jupyter Code Search Data](https://github.com/IBM/jupyter-code-search) dataset from IBM. This dataset contains over 1.25 million Jupyter notebooks from GitHub, along with their associated metadata. You can view the documentation and download the data on the [Jupyter Code Search](https://www.kaggle.com/ibm/jupyter-code-search) page on Kaggle.

![](pandas-example.png)

## The Model

Inspired by [my work](../blog/code-infilling.md) on code infilling with large language models, I decided to take a similar approach with Jupyter notebooks. I used the [CodeParrot](https://huggingface.co/codeparrot) implementation of GPT-2, which is a pretrained language model trained on a large corpus of Python code from GitHub. I also experimented a bit with [CodeBERT](https://github.com/microsoft/CodeBERT) for the infilling task, but eventually decided to stick with CodeParrot for now.

## Prompt Engineering

The first step was to figure out how to represent the notebook as a sequence of tokens that the language model can understand. Since the data only consists of the output code cells, a simple strategy is to tokenize the code cells and stack them on top of each other, and then feed them into the language model. However, this approach does not work well. The language model is not able to understand the context of the code and generate meaningful results.

For example, suppose we want to explore the Pandas library in a notebook. A straightforward way to do this is to use the `dir` function to list all the available methods and attributes of the `pd` module. However, if we simply feed the command `dir(pd)` into the language model, it will not be able to understand the context of the command and will generate nonsensical results.

```python
import pandas as pd
dir(pd)
```

One way to address this issue is to use *prompt engineering*. Prompt engineering is the process of designing prompts that will elicit the desired behavior from a language model. In this case, we can use the following prompt:

```python
# Using pandas, what methods and attributes are available for the variable `pd`?
import pandas as pd
dir(pd)
```

Here, we provide extra context about the code block in the form of a comment. This prompt is more likely to elicit the desired behavior from the language model.

![](result-infilling.png)

## Infilling

I used the idea of prompt engineering to build a code infilling system for Jupyter notebooks. The system can predict the missing code given the surrounding context. For example, given the following context:

```python
import numpy as np
x = np.array([1, 2, 3])
y = np.array([4, 5, 6])
```

The system can predict the missing code `x + y`.

![](nll-loss.png)

We can use the negative log-likelihood (NLL) loss to measure the quality of the predictions. The lower the NLL loss, the better the predictions. In the plot below, we can see that the NLL loss decreases as we increase the amount of context. This suggests that the system is able to learn from the context and make better predictions.

![](results.png)

## What’s next

There are several areas that I would like to explore in the future:

1. Something that I’ve been toying with recently is the idea of *reverse prompt engineering*. The idea is to give a language model access to both the input and the output of a function, and ask it to generate a prompt that will elicit the desired output. In this case, we would give the model the code `dir(pd)` and the output `['DataFrame', 'Series', 'Index', 'MultiIndex', 'Panel', ...]` and ask it to generate a prompt that will elicit the output `dir(pd)`. This is an interesting idea that I would like to explore further.
2. I would like to explore the use of *self-supervised learning* to train the model on a large corpus of Jupyter notebooks. Self-supervised learning is a form of unsupervised learning where the model is trained to predict missing or corrupted parts of the input. In this case, we can use the model to predict missing or corrupted code cells in a notebook. This would allow us to train the model on a large corpus of Jupyter notebooks without the need for labeled data.
3. I would like to explore the use of *reinforcement learning* to train the model to interact with the user in a notebook environment. Reinforcement learning is a form of machine learning where an agent learns to interact with an environment in order to maximize a reward. In this case, we can use the model to interact with the user in a notebook environment and learn to generate code that is useful to the user. This would allow us to train the model to generate code that is tailored to the user’s needs.
4. I would like to explore the use of *neural code search* to build a search engine for Jupyter notebooks. Neural code search is a form of code search where the search engine is trained to retrieve code snippets that are semantically similar to a given query. In this case, we can use the model to retrieve code snippets that are semantically similar to a given query. This would allow us to build a search engine for Jupyter notebooks that is tailored to the user’s needs.