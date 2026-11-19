---
title: "BERT, as a Generative Model"
publishedAt: "2019"
summary: "BERT, as a Generative Model"
reviewDraft: "true"
---

I've read Weiran Wang and Jung-Woo Cho's [report](https://papers.nips.cc/paper/2018/file/1776-Paper.pdf) on how BERT could be viewed as a Markov Random Field (MRF). They showed that the training objective was a pseudo-likelihood. Their argument is as follows. Given a sentence of length $T$, let $x$ be the set of all words in the sentence. Let $X$ be the corresponding set of random variables. BERT predicts the conditional probability of a word at a given position $t$ in the sentence given all the other words $p(x_t \mid x_{-t})$. The joint probability $p(x_1, \ldots, x_T)$ is the probability of the sentence. They then say that $p(x_1, \ldots, x_T)$ has to follow the Hammersley-Clifford theorem, and would therefore be a Gibbs distribution. The corresponding graph is a fully connected graph. 

However, BERT is a generative model, where the generation process is not explicitly defined, but is instead specified by conditional distributions. BERT is a deep bidirectional model composed of multiple transformer layers stacked together. However, it is not bidirectional in the same sense as a bidirectional RNN. In a bidirectional RNN, the model is composed of two separate sets of parameters, a forward RNN and a backward RNN. In contrast, BERT uses the same set of parameters to model the left context and the right context, and uses self-attention to unify them. 

To see this, let's look at the components. First, BERT is composed of attention layers. Each attention layer uses self-attention to create a new representation of a word conditioned on all other words in the sentence. BERT then passes this representation into a position-wise feed-forward network. The entire process is repeated multiple times. Let us arbitrarily choose $T = 4$ and write out the computation.

$$
\begin{aligned}
h_1^0 = W_E x_1 + W_P (1) \\
h_2^0 = W_E x_2 + W_P (2) \\
h_3^0 = W_E x_3 + W_P (3) \\
h_4^0 = W_E x_4 + W_P (4)
\end{aligned}
$$
$$
\begin{aligned}
h_1^1 = h_1^0 + \text{SelfAttn}(h_1^0, h_2^0, h_3^0, h_4^0) \\
h_2^1 = h_2^0 + \text{SelfAttn}(h_2^0, h_1^0, h_3^0, h_4^0) \\
h_3^1 = h_3^0 + \text{SelfAttn}(h_3^0, h_1^0, h_2^0, h_4^0) \\
h_4^1 = h_4^0 + \text{SelfAttn}(h_4^0, h_1^0, h_2^0, h_3^0)
\end{aligned}
$$
$$
\begin{aligned}
h_1^2 = h_1^1 + \text{FeedForward}(h_1^1) \\
h_2^2 = h_2^1 + \text{FeedForward}(h_2^1) \\
h_3^2 = h_3^1 + \text{FeedForward}(h_3^1) \\
h_4^2 = h_4^1 + \text{FeedForward}(h_4^1)
\end{aligned}
$$

To keep things simple, let's look at the first layer only. The main component of the first layer is the self-attention mechanism. This mechanism attends to all other words in the sentence, and produces a new representation based on the other words. The representation is then passed on to a position-wise feed-forward network. The process is repeated multiple times. The final representation is then used to predict the probability of the word at a given position. From these equations, we can see that $h_1^1$ depends on $h_2^0, h_3^0, h_4^0$. $h_2^0$ depends on $x_2$, $h_3^0$ depends on $x_3$, and $h_4^0$ depends on $x_4$. Therefore, $h_1^1$ depends on $x_2, x_3, x_4$.

However, $h_2^1$ also depends on $x_1$, because $h_2^1 = h_2^0 + \text{SelfAttn}(h_2^0, h_1^0, h_3^0, h_4^0)$ and $h_1^0$ depends on $x_1$. Similarly, both $h_3^1$ and $h_4^1$ also depend on $x_1$, because of the self-attention mechanism. Therefore, if we were to expand the equations for $h_2^1, h_3^1, h_4^1$, we would see that $x_1$ shows up in all of them. Let's call this the $x_1$-potential. 

$$
\begin{aligned}
h_1^1 = h_1^0 + \text{SelfAttn}(h_1^0, h_2^0, h_3^0, h_4^0) \\
h_2^1 = h_2^0 + \text{SelfAttn}(h_2^0, h_1^0, h_3^0, h_4^0) \\
h_3^1 = h_3^0 + \text{SelfAttn}(h_3^0, h_1^0, h_2^0, h_4^0) \\
h_4^1 = h_4^0 + \text{SelfAttn}(h_4^0, h_1^0, h_2^0, h_3^0)
\end{aligned}
$$

To sample a sentence, we would usually sample $x_1 \sim p(x_1), x_2 \sim p(x_2 \mid x_1)$, and so on. However, we do not have explicit access to $p(x_1)$, and we cannot update the $x_1$-potential in all the other equations. This means that we cannot directly sample from BERT.

Instead, we have to use a different generation process. Each token is generated using the conditional distribution $p(x_t \mid X_{-t})$, conditioned on all other tokens in the sentence. We can initialize the sentence with all $\langle \text{mask} \rangle$ tokens. Then, we can sample a word for each position in the sentence. We can repeat this process multiple times until the sentence converges.
### References
- Weiran Wang and Jung-Woo Cho. Bert has a mouth, and it must speak: Bert as a Markov random field language model. arXiv preprint arXiv:1902.04094, 2019.
- Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova. Bert: Pre-training of deep bidirectional transformers for language understanding. arXiv preprint arXiv:1810.04805, 2018.
- My post on BERT as a generative model: [BERT as a Generative Model](../2019-05-07-bert-as-a-generative-model)