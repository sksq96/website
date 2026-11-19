---
title: "Three Types of Grammars for Natural Languages"
publishedAt: "2019-04-30"
dateBasis: "source event date; reconstructed post"
summary: "Three Types of Grammars for Natural Languages"
reviewDraft: "true"
---

*Originally posted at* [*https://tbc.sksq96.com/three-grammars*](https://tbc.sksq96.com/three-grammars).

## Context

Recently, I was working with some teammates on some problems related to BERT. I was trying to use BERT as a way to measure the likelihood of sentences. But, I was quite unsatisfied with the traditional view of BERT as a Markov Random Field. I wanted to view BERT as a latent variable model over sentences, with the masking procedure being the process in which we create latent variables. This then led me to the question of how to sample from BERT. The traditional way of sampling from BERT was to use a two-sided fill-in-the-blank (FITB) procedure, where you fill each blank with the most likely word given the surrounding context. But this didn’t really make sense to me. As I was trying to figure out how to sample from BERT, I ended up finding this paper by Tomaso Poggio et al., where they used a simple example to study the possible problem of the fill-in-the-blank procedure. The example was quite nice, so in this note, I will describe the example.

## Question

As mentioned above, the traditional way of sampling from BERT uses a two-sided fill-in-the-blank (FITB) procedure, where you fill each blank with the most likely word given the surrounding context. But this may not make sense. Why? Let’s look at a very simple example, inspired by [this paper](http://math.mit.edu/~poggio/publications/2020/Poggio_Soler_Simard_LeCun_2020.pdf). Let’s say we want a 2-gram model for a vocabulary of size 3. For example, let’s say our vocabulary is {*a*, *b*, *c*}. We want our 2-gram model to provide the likelihood of all 2-grams. However, we don’t have a direct likelihood model. Instead, we only have a conditional probability model. That is, we only have conditional probabilities, like *p(a|b)* and *p(c|a)*. We don’t have the direct likelihood of *p(a,b)* or *p(c,a)*. Okay, but there’s nothing to worry about. Let’s just build the likelihood table from the conditional probability table. This requires some normalization constants, but that shouldn’t be a problem.

Okay, on second thought, maybe it is a problem. Let’s have a look at what those normalization constants are.

![img](https://tbc.sksq96.com/assets/three-grammars.png)

From the above image, we see that our conditional probability are *p(a|a), p(b|a), p(c|a), p(a|b), p(b|b), p(c|b), p(a|c), p(b|c), p(c|c)*. We will view these as the “entries” of a matrix, so the order doesn’t matter too much as long as we’re consistent. We’ll just sort it alphabetically.

Now, let’s see what happens when we try to build the likelihood from the conditional probability. We have the following relationships.

![img](https://tbc.sksq96.com/assets/three-grammars2.png)

We’ll denote the normalization constants above as *z[1], z[2], ..., z[9]* (reading from top to bottom and left to right).

So what are these normalization constants? Ideally, we want to be able to solve for them. But notice that we only have 3 equations. We haven’t used the fact that the joint probability table needs to sum up to 1. So we get the following equation:

![img](https://tbc.sksq96.com/assets/three-grammars3.png)

which gives us two more equations

![img](https://tbc.sksq96.com/assets/three-grammars4.png)

Okay, but we still have 9 normalization constants, and we only have 5 equations. It’s underdetermined. So we can’t actually solve these normalization constants. It’s not that our model is overly complex. Rather, we’re missing some measurements. Without the normalization constants, we can’t build our likelihood.

## Interpretation

What does that mean? Well, it means our model is underspecified. We can’t specify a 2-gram model with just the conditional probabilities. Why is that? Because natural language is not a Markov Field. A Markov Field is completely determined by the maximum cliques in the Markov Network. For a 2-gram Markov Network, the cliques are just the edges. Each edge is defined by the joint probability over the two nodes. But we don’t have the joint probability in our model. We only have the conditional probability. Why is this a problem? Because the conditional probability is not only a function of the joint probability over the two nodes. It’s a function of the joint probability over all neighbors of the first node. And for a Markov Network, that neighbors are only the nodes directly connected to the first node. So the conditional probability is a function of the joint probability over all neighbors of the first node, which is a function of all neighbors of the first node, and so on.

In other words, we can’t determine the joint probability over the two nodes using only the conditional probability. The conditional probability is a function of the joint probability over all neighbors of the first node, which is a function of all neighbors of the first node, and so on. Hence, for natural language, we cannot assume that the context of a word only depends on the word itself. The context of a word also depends on words that are not directly connected to the word. Hence, the conditional probability *p(a|b)* cannot be used to determine the joint probability *p(a,b)*.

So the conditional probability is a function of the joint probability over all neighbors of the first node, which is a function of all neighbors of the first node, and so on. Hence, for natural language, we cannot assume that the context of a word only depends on the word itself. The context of a word also depends on words that are not directly connected to the word. Hence, the conditional probability *p(a|b)* cannot be used to determine the joint probability *p(a,b)*.