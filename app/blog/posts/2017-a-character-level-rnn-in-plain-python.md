---
title: "RNNs"
publishedAt: "2017-03-06"
dateBasis: "source event date; reconstructed post"
summary: "RNNs"
reviewDraft: "true"
---

*To use my code, please go to this repository on Github.*

#### Big Picture

RNNs provide a mechanism for persisting state between time-steps in a model. The main task I am interested in is natural language processing, specifically language modelling (predicting the next word given the previous words).

The idea is to feed in a single character into a RNN, and then feed the output of the RNN back into the network at the next time-step, along with the next character in the sequence. The output of the RNN is a distribution over all the characters in the vocabulary, and we sample from this distribution so that we don't always get the most likely character, which would hinder exploration.

#### RNN Forward Pass

Imagine having a set of words to train on, such as:

- awesome, awe
- brilliant, bri
- magnificent, mag

The training goal is for the RNN to learn to predict the set of letters that come after the prefix, e.g. given "awe", predict "some".

Here, we would like to see what happens when we give the RNN one letter "a" as input.

We can run a single forward pass with the following code:

```python
  forward('a')
```

The output is:

```
Output: <class 'numpy.ndarray'>
Output shape: (1, 4)
Output: [ 0.04827797  0.0157286   0.08232615  0.04570201]
```

The four numbers above are the probabilities of the next character to appear after "a".

#### Unrolling RNN

We would like to see what happens when we unroll the RNN on the sequence "awe". `"awe"` will be one training example for our RNN.

```python
forward("awe", unroll=True)
```
The output is:
```
Output shape: (1, 4)
Output: [[ 0.13  0.17  0.35  0.34]
 [ 0.28  0.34  0.18  0.2 ]
 [ 0.16  0.23  0.26  0.35]]
```
The first row of this output `[ 0.13  0.17  0.35  0.34]` is the probabilities of the next character to appear after "a", the second row is the probabilities of the next character to appear after "w" (given that we saw "a" before "w") and the last row is the probabilities of the next character to appear after "e" (given that we saw "aw" before "e").

#### Sampling

Let's take a look at what the RNN can generate using just "awe" as our training set. We sample 2 times.

```python
sample("awe")
```

The output is:

```
Awesome
Aweeaa
```
As you can see, we got two different samples. This is because we sample from the predicted distribution.

To make it easier to see where the two strings differ, I have highlighted their first difference in red.

Awe**s**ome
Awe**e**aa

Note: the outputs above are all generated using an untrained RNN.