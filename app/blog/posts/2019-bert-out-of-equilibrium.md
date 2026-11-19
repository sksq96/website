---
title: "BERT out of equilibrium"
publishedAt: "2019"
summary: "BERT out of equilibrium"
reviewDraft: "true"
---

## Masked language modeling and Markov random fields

In masked language modeling (MLM), we randomly choose some positions in a sentence to replace with the special “mask” token and train a model to predict the correct word at the masked positions. BERT is an implementation of masked language modeling, and, like all MLM models, it predicts words at masked positions conditioned on the unmasked positions.

One way to interpret a model that predicts masked tokens is as a Markov random field (MRF). The BERT authors do this in their paper. In an MRF, we are given a joint distribution $p(x_1, x_2, \ldots, x_n)$ over all possible sentences $x = (x_1, x_2, \ldots, x_n)$. We can then use this joint distribution to calculate conditional distributions like $p(x_1 | x_2, \ldots, x_n)$, which is the distribution modeled by BERT. Given the joint distribution, we can generate samples from it using Gibbs sampling.

But the authors don’t give an explicit joint distribution. Instead, they only give us conditional distributions like $p(x_1 | x_2, \ldots, x_n)$. And it’s not guaranteed that there exists a joint distribution (or equivalently, that the conditionals are consistent).

We can see this by trying to Gibbs sample from BERT. Gibbs sampling involves iteratively resampling each random variable in the joint distribution from the conditional distribution on the rest. So we might first sample $\tilde{x}_1 \sim p(x_1 | x_2, \ldots, x_n)$ and then $\tilde{x}_2 \sim p(x_2 | \tilde{x}_1, x_3, \ldots, x_n)$. If we do this enough times, we’ll eventually get a sample from the joint distribution (if a joint exists).

But if we sample from BERT like this, we see that the conditional distributions aren’t consistent. I’ll show this with an example. For the sentence, “We can see this by trying to Gibbs sample from BERT”, here is the predicted distribution for the second token conditioned on the first token being masked:

| as   | that | it   | Gibbs | :    |
| ---- | ---- | ---- | ----- | ---- |
| 0.25 | 0.20 | 0.13 | 0.02  | …    |

“Gibbs” has probability 0.02. And here is the distribution for the first token conditioned on the second being masked:

| We   | I    | You  | Gibbs | :    |
| ---- | ---- | ---- | ----- | ---- |
| 0.29 | 0.16 | 0.11 | 0.00  | …    |

“Gibbs” has probability 0.00 (less than 1e-10). But we can’t have it be the case that $p(x_2 = \text{Gibbs} | x_1 = \text{Gibbs}, \ldots) = 0.02$ and $p(x_1 = \text{Gibbs} | x_2 = \text{Gibbs}, \ldots) = 0.00$. It would have to be the case that $p(x_1 = \text{Gibbs}, x_2 = \text{Gibbs}, \ldots) \geq 0.02 \cdot p(x_1 = \text{Gibbs}, \ldots)$ and $p(x_1 = \text{Gibbs}, x_2 = \text{Gibbs}, \ldots) < 1e-10 \cdot p(x_2 = \text{Gibbs}, \ldots)$. The only way to make these inequalities hold is if $p(x_1 = \text{Gibbs}, \ldots) = p(x_2 = \text{Gibbs}, \ldots) = 0$, but that’s not possible because $p(x_2 = \text{Gibbs} | x_1 = \text{Gibbs}, \ldots) = 0.02 \neq 0$.

So Gibbs sampling from BERT gives us inconsistent results. This isn’t surprising – the BERT training objective only requires that the conditional distributions be accurate at the true values of the masked tokens, as opposed to at arbitrary values of the unmasked tokens. And the MRF interpretation of BERT only really makes sense if the conditionals are accurate at arbitrary values of the unmasked tokens.

But we can still use BERT to generate text. It just requires a bit of care.

## Masked language modeling as a generative process

We define a generative process that starts with a sentence with some masked tokens. In each step of the process, we pick a masked token and sample a value for it from BERT’s distribution, conditioned on the rest of the sentence.

This generative process is simple but it doesn’t necessarily define a joint distribution over sentences.

### Sampling from BERT

I used the generative process to sample from BERT. I tried three different ways of selecting which masked token to fill in at each step. For a given sentence with k masked tokens, we can choose which one to fill in:

- randomly (with uniform probability)
- by choosing the token with the highest probability of the most probable word (“max prob”)
- by choosing the token with the lowest entropy of its predicted distribution (“min entropy”)

Since this generative process isn’t guaranteed to give us a joint distribution, the order that we choose to fill in the tokens matters. So it makes sense that the different methods give us different samples.

Here are some examples of the samples. I started with the sentence “The _ _ is a _ .”. The underscores are masked tokens. I replace each underscore with a random word sampled from BERT:

| Random                                        | Max prob                                       | Min entropy                                    |
| --------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| The El Nino is a turtle .                     | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle .             | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle .             | The french language is a turtle .              | The french language is a turtle .              |
| The french word is a turtle                   | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french word is a turtle .                  |
| The french language is a turtle               | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle               | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle               | The french word is a turtle .                  | The french language is a turtle .              |
| The french language is a turtle .             | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french language is a turtle .              | The french language is a turtle .              |
| The N word is a turtle .                      | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french language is a turtle .              | The french language is a turtle .              |
| The french language is a turtle .             | The french language is a turtle .              | The french word is a turtle .                  |
| The endangered species is a accident .        | The french word is a turtle .                  | The french language is a turtle .              |
| The most important is a turtle .              | The french language is a turtle .              | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle                   | The french word is a turtle .                  | The french language is a turtle .              |
| The french word is a turtle .                 | The french word is a turtle .                  | The french language is a turtle .              |

We can see that the samples are quite predictable, and basically always end up being “The french language is a turtle.” This is because BERT was trained to predict the masked tokens conditioned on the original values of the unmasked tokens. And it never saw any arbitrary inputs like “The _ _ is a _ .”. But we can still use this sampling procedure to generate some sentences.

## Text infilling

One of the things the authors show is that BERT is quite good at filling in discontinuous spans from a sentence. For example, given the sentence “The man went to the store”, we can ask BERT to fill in the words between “The” and “store”. The authors show that it does this quite well – it comes up with reasonable words like “man”, “guy”, “boy”, etc.

My sampling procedure is very similar to the authors’ except that I don’t take the argmax of the predicted distribution for the masked token. I also have to choose an ordering for filling in the masked tokens. But I can use the same method as described above: random, max prob, or min entropy.

I used the text infilling task to study how well BERT can model a joint distribution over the masked tokens. I tried masking out the bigrams “woman’s husband” and “man’s wife” from the Wikipedia validation set. Then I tried filling in the missing words conditioned on the original text. Here are the results:

|                                                |                                    | Sampling method |                     |                   |
| ---------------------------------------------- | ---------------------------------- | --------------- | ------------------- | ----------------- |
| Bigram                                         | Metric                             | Random          | Max prob            | Min entropy       |
| woman’s husband                                | P(correct bigram)                  | 0.24            | 0.31                | 0.31              |
| P(correct first word)                          | 0.34                               | 0.45            | 0.45                |                   |
| P(correct second word)                         | 0.66                               | 0.82            | 0.85                |                   |
| P(correct first word, wrong second word)       | 0.01                               | 0.02            | 0.02                |                   |
| P(wrong first word, correct second word)       | 0.44                               | 0.52            | 0.55                |                   |
| P(wrong first word, wrong second word)         | 0.32                               | 0.16            | 0.13                |                   |
| man’s wife                                     | P(correct bigram)                  | 0.20            | 0.29                | 0.29              |
| P(correct first word)                          | 0.99                               | 0.99            | 1.00                |                   |
| P(correct second word)                         | 0.20                               | 0.29            | 0.29                |                   |
| P(correct first word, wrong second word)       | 0.78                               | 0.70            | 0.71                |                   |
| P(wrong first word, correct second word)       | 0.00                               | 0.00            | 0.00                |                   |
| P(wrong first word, wrong second word)         | 0.01                               | 0.01            | 0.00                |                   |
| woman’s husband, with the text “wife” inserted | P(correct bigram)                  | 0.09            | 0.21                | 0.21              |
| P(correct first word)                          | 0.10                               | 0.22            | 0.22                |                   |
| P(correct second word)                         | 0.88                               | 0.99            | 0.99                |                   |
| P(correct first word, wrong second word)       | 0.01                               | 0.01            | 0.01                |                   |
| P(wrong first word, correct second word)       | 0.80                               | 0.78            | 0.78                |                   |
| P(wrong first word, wrong second word)         | 0.10                               | 0.01            | 0.01                |                   |

The model is quite good at predicting “man” and “woman” correctly. It has more trouble with predicting “wife” and “husband” correctly. There is a bias towards “wife” over “husband”, with the model predicting “wife” correctly only 20-30% of the time.

The last set of results shows the effect of inserting “wife” into the context of “woman’s husband”. The model’s performance is considerably worse with this context. It predicts “husband” 88-99% of the time, but only predicts “woman” 10-22% of the time. After inserting “wife” into the context, the model creates very few sentences with “wife” in them. Instead, it predicts sentences like “man’s wife” and “his wife”.

This shows that BERT isn’t able to model the joint distribution over the masked tokens very well. Instead, we can think of the generative process as having a set of “attractor sentences” that it converges to. The process tends to stay with these sentences because BERT is trained on them. This is similar to the way that Gibbs sampling can get stuck on a few states if the joint distribution is very peaked.

See my GitHub repository for more details on the implementation.