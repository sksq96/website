---
title: "Do language models know the odd numbers?"
publishedAt: "2019-11-15"
dateBasis: "approximate day; source month"
summary: "Do language models know the odd numbers?"
reviewDraft: "true"
---

Imagine that you were given a sequence: 1, 3, 5. What kind of knowledge about this sequence will you infer? And what kind of knowledge will you pass on when you predict the next item?

In a review of a project that aims to add numeracy to the language models, I will attempt to answer these questions.

This is the third part of a series on language models. In the first part, I introduce you to the models and how they work. In the second part, I review the application of language models in text generation.

**What is numeracy?**

The project is about the addition of numeracy to neural network language models. So what is numeracy?

Numeracy, as I understand it, is the ability to understand and perform operations on numbers. Humans are numerate. So are computers.

Why do we want to teach a language model about numeracy?

The authors of the project say that the models have “(implicit) access to some of the most fundamental building blocks of our world: integers.”

**What is a language model?**

As I explained in the first part, a language model tries to predict the next word in a sentence or the probability of a sequence of words.

**How will you test for numeracy?**

The project is about language models and numeracy. How do you know that a model has numeracy?

The authors propose three tasks that test for the following abilities:

- **Precision**: Ability to generate precise numbers that are not in the training set
- **Computation**: Ability to solve problems with numbers in few-shot settings
- **Generalization**: Ability to generate arbitrarily long sequences of numbers

**What are the numbers?**

Before we discuss how the model is made numerate, lets clarify what numbers are we talking about.

The numbers here are not your usual numbers. They are not numbers as we know them. They are strings of digits. And they are also English words.

**What is the problem with numbers in language models?**

What problem are the authors trying to solve here?

The first problem they face is that of tokenization. For example, the number 2018 might be tokenized into 20 and 18.

The second problem is that of vocabulary. The number of unique numbers has to be finite. The authors gave an example. If you use only the numbers 0 to 999,999, then you cannot generate 1,000,000.

**How is this solved?**

The authors propose a digit-based tokenization. In the vocabulary, they have the digits 0–9, a comma as thousands separator and a minus sign for negative numbers.

**What are the results?**

The authors tried their method with the WikiText-2 dataset. The dataset is composed of 2,088,628 training tokens, 217,646 validation tokens and 245,145 test tokens.

They compared the new model with a baseline. The baseline model has a full-number vocabulary model trained with byte-pair encoding (BPE). With BPE, if the number is not in the vocabulary, then the model breaks it into sub-word units. The units are in the vocabulary. This means that the model is able to generate any number. But it might not be precise.

The authors report that with the new model they achieved “significant improvements in perplexity and near-perfect number generation on large scale datasets” and that the model is “able to generalize to numbers outside the training set”.

**How will you continue the sequence?**

If you were given a sequence: 1, 3, 5. What kind of knowledge about this sequence will you infer? And what kind of knowledge will you pass on when you predict the next item?

I did not answer these questions at the beginning. I will not answer them now.

But I will end with a proposed experiment. Lets train a language model on the first 100 odd numbers. Then lets see if the model is able to generate the 101st odd number.