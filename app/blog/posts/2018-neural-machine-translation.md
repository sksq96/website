---
title: "Neural Machine Translation"
publishedAt: "2018-11-15"
dateBasis: "source event date; reconstructed post"
summary: "Neural Machine Translation"
reviewDraft: "true"
---

Machine translation is one of the most important applications of NLP. This is also the field that has driven and evaluated much of the progress in NLP over the last few years. I thought it would be interesting to learn about neural machine translation (NMT). In this post, we will briefly go over the NMT process and apply it to a low-resource language pair: Vietnamese -> English.

## Introduction

WMT is a conference where different teams are invited to submit results on Machine Translation. In the last few years, teams have been submitting a combination of neural and statistical machine translation (SMT). Neural machine translation (NMT) is still inferior to SMT on some tasks but there is definite rapid progress.

Traditionally, translation systems have been built on top of large collections of rules. Rule-based systems are expensive to build and often do not generalize well to unseen text. In the 1990s, machine translation switched to a statistical approach. This approach uses statistical models whose parameters are learned from the analysis of bilingual text corpora.

Statistical machine translation has been the dominant paradigm in MT for almost twenty years. These systems work by decomposing the translation problem into smaller sub-problems. Unfortunately, these independently designed subcomponents are hard to tune for the overall translation quality.

NMT, on the other hand, is an attempt to build and train a single, large neural network that reads a sentence and outputs a correct translation.

## Neural Machine Translation

Neural networks are normally used to assign a probability to a classification label. For example, in image recognition, a neural network might assign a probability of 80% to a picture showing a dog, 50% to a picture showing a cat, and 10% to a picture showing a bird. We can use the same approach for machine translation. The only challenge is that a sentence is a sequence of words, not a single word. The sequence can be of arbitrary length. NMT proposes the use of a novel type of neural network called recurrent neural network (RNN), which can model sequences of text.

**Encoder-Decoder Architecture.** NMT is based on an encoder-decoder architecture. The encoder learns a representation of the source sentence. This representation is passed to the decoder which uses it to generate the translated sentence.

![seq2seq-rnn](/images/nmt/seq2seq-rnn.png)

The encoder and decoder can be based on vanilla RNNs, GRUs, or LSTMs.

**Attention Mechanism.** An attention mechanism is used to focus on specific parts of the input sequence. This is especially important in machine translation as long dependency in the input and output sentences can be very difficult to model with RNNs. Attention mechanisms can be added to encoder-decoder architectures.

![attention](/images/nmt/attention.png)

A simple to understand attention mechanism:

- Uses an RNN to get a vector representation for each word in the input sentence.
- Feeds every time step of the decoding RNN to compute a weight for every input's vector representation.
- Computes the weighted sum of the input vectors using these weights.
- Feeds the weighted sum into the decoder.

![attention-simple](/images/nmt/attention-simple.png)

**Architectures for NMT.** A lot of progress has been made in NMT in the last few years. Most of it has been building on the architectures described above.

**NMT Training.** Training of these architectures is similar in principle to other neural network models. We generally use a log-likelihood objective function and minimize it using stochastic gradient descent.

**NMT Decoding.** The most common decoding algorithm for NMT is greedy decoding, i.e., decoding word by word. Beam search decoding is a better approach as it compares multiple options simultaneously.

**NMT Evaluation.** BLEU is the most popular automatic evaluation metric for MT.

## Neural Machine Translation for Low-Resource Languages

NMT is generally hard in a low-resource scenario. In this section, we look at some tips to get the best results for low-resource languages.

- Use the right data:

    - Use parallel text for training.
    - Use parallel text for dev and test.
    - Use monolingual text (esp. for low-resource languages).

- Preprocessing:

    - Clean the data.
    - Segment the sentences.
    - Tokenize the words.
    - Normalize the words.
    - Lower case the text.
    - Remove rare words.

- Training:

    - Start with a small model.
    - Use a large batch size.
    - Use dropout.
    - Use attention.
    - Use label smoothing.
    - Use length normalization.
    - Use ensembling.

## Example

In this example, we will try to translate Vietnamese to English. We use the IWSLT Vietnamese-English corpus (TED talk subtitles).

**Data Preprocessing** We use the scripts from Harvard's NLP group to preprocess the data.

- Change `"` character to `&quot;` for the `vi` files.
- Combine both source and target files in one csv file.

**Training** We use the annotated transformer implementation from Harvard's NLP group as a starting point for training.

**Evaluation** We use greedy decoding and sacrebleu for evaluation. We built a test set from the test data. We got a BLEU score of 7.4. This is pretty low but understandable for a low-resource language pair. It was interesting to see that it could get some of the translations right and even the long ones. It was able to learn from just TED talks.

**Results**

```
Chúng ta đang đi đúng hướng. Chúng ta sẽ đến đó nhanh hơn.
We are going to get there. We are going to get there faster.

Lần đầu tiên ở Mexico, bạn chỉ nên đi với một người dân địa phương.
The first time in Mexico, you should only go with a local.

Tôi không biết phải nói gì.
I do not know what to say.

Chỉ có Chúa mới biết.
Only God knows.

Đừng sợ!
Do not be afraid!
```

## Conclusion

NMT is a very interesting field with a lot of progress in the last few years. It is still a challenging problem for low-resource languages. It is however possible to get some good results with the right data and training.

## References

- Tutorial on Neural Machine Translation - Wikipedia
- [Neural Machine Translation for Low-Resource Languages: A Survey](https://arxiv.org/abs/2005.14101)
- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)