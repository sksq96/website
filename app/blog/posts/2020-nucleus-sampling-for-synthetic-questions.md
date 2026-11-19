---
title: "nucleus sampling for synthetic questions"
publishedAt: "2020"
summary: "nucleus sampling for synthetic questions"
reviewDraft: "true"
---

**Nucleus sampling**, a method for generating diverse text, can help generate synthetic questions to improve the performance of Question Answering systems, according to my work that was accepted to [ACL 2020](https://www.aclweb.org/anthology/2020.findings-acl.206/). 

Here is a T5-based model that I finetuned. It is trained to generate a question given an answer span from a paragraph. In this case, the answer is “5,000 feet”, and the paragraph is about sandhill cranes.

![image](./assets/images/22021/5f1899f59baddad06b35b3f8.png)

**Beam search** is a common way to generate text, and it produces relevant questions like “How high do the sandhill cranes fly?” and “How high do sandhill cranes fly?”. However, the generated questions are repetitive and lack diversity.

**Nucleus sampling**, a decoding strategy proposed by Holtzman et al., 2019, is an alternative way to generate text. It can generate more diverse questions like “How far can sandhill cranes fly?” and “How far do sandhill cranes fly?”.

When we generate synthetic questions with nucleus sampling and train a Question Answering system on these questions, the system achieves a better performance than when we train it on questions generated with beam search.

## What is nucleus sampling?

Nucleus sampling (Holtzman et al., 2019) is a decoding strategy that helps generate diverse text. It is a more principled version of top-k sampling, another decoding strategy that helps generate diverse text.

The key idea of top-k sampling is to define the next-word distribution as a mixture of two distributions:
-   One distribution that places equal probability on the top-k likely words given the context so far, and zero probability on the other words.
-   Another distribution that places zero probability on all words.

The next word is then sampled according to this mixture distribution. The result is that the next word will be randomly sampled from the top-k most likely words, according to the probabilities assigned by the language model.

It is easy to see that, for large k values, the method reduces to sampling from the original distribution. This means that, for example, if the language model places 0.5 probability on the word apple, 0.25 on the word banana, and 0.25 on the word cherry, then top-500 sampling will result in selecting apple with probability 0.5, and so on. In this extreme case, top-k sampling generates very diverse text, but the text is often nonsensical.

For small k values, the method results in sampling from the top-k most likely words. This means that, for example, top-2 sampling will result in selecting apple with probability 2/3, and banana with probability 1/3. In this extreme case, top-k sampling generates less diverse text, but the text is more likely to be sensible.

Nucleus sampling improves on top-k sampling by allowing the size of the “top-k” set to change dynamically. It does this by setting a threshold on the cumulative probability of the top-k words. For example, we might want to choose the smallest k such that the cumulative probability of the top-k words is 90% or higher.

Nucleus sampling tends to generate more diverse text than top-k sampling, for two reasons. First, it allows k to vary from word to word. For example, if a language model assigns the probability 0.7 to the word apple, then k will be equal to 1, and apple will be chosen with probability 1. This is true regardless of the top-p threshold. Second, whenever k > 1, the smallest k such that the top-k words have cumulative probability ≥ p is often much smaller than the value of k that is typically used for top-k sampling.

## Nucleus sampling for Question Answering

My work (Puri et al., 2020) is part of a recent line of work that investigates how to generate synthetic questions to improve the performance of Question Answering systems.

The core idea behind this line of work is to feed a paragraph to a text generation model to generate a question, and then to train a Question Answering system on the generated question, instead of the original question. By decoupling the Question Answering system from the original labeled dataset, it can be trained with synthetic data. This allows it to be trained on a much larger set of examples, as the text generation model can be used to generate questions for unlabeled paragraphs.

![image](./assets/images/22021/f2744d8f79d3b2020b2054b9.png)

We finetuned a T5 model to generate a question given an answer span from a paragraph. We then used the model to generate synthetic questions for SQuAD. We compared two decoding strategies for generating the synthetic questions: beam search and nucleus sampling.

![image](./assets/images/22021/dd4e45c0fcc0b39b5b5b9c5.png)

We find that fine-tuning BERT on questions generated with nucleus sampling achieves a better performance on the SQuAD dev set than fine-tuning BERT on questions generated with beam search.

![image](./assets/images/22021/70558bbfc5580ac219d8b4ef.png)

## References

Holtzman, Ari, Jan Buys, Li Du, Maxwell Forbes, and Yejin Choi. “The curious case of neural text degeneration.” arXiv preprint arXiv:1904.09751 (2019).

Puri, Raul, Ryan Spring, Mohammad Shoeybi, Mostofa Patwary, and Bryan Catanzaro. “Training Question Answering Models From Synthetic Data.” Findings of the Association for Computational Linguistics: EMNLP 2020 (2020).