---
title: "nyu nlp"
publishedAt: "2018"
summary: "nyu nlp"
reviewDraft: "true"
---

I recently finished my NLP class at NYU. This post is a summary of my assignments throughout the course.

Assignment 1: visualizing the words in some of the dimensions in word2vec embeddings space.

The Jupyter notebook can be found here.

I started by going through the lectures in week 1 and 2. Then I started the first assignment. It was a simple task of using PCA to visualize 300D word embeddings in 2D. That was relatively simple. There were some interesting observations about the words in the space. For example, color words mostly lied in one cluster. There were also some outliers like the word "coors".

Assignment 2: using RNNs to predict the relationship between sentences.

The full code can be found here.

Assignment 2 was more challenging. The task was to detect if a pair of sentences have a neutral, entailment or contradiction relation. I tried a few different models. The main ones are:

* a simple model using a single linear layer with GloVe embeddings
* a CNN model with word2vec embeddings
* RNN with GloVe embeddings
* RNN with fastText embeddings

I experimented with different hyperparameters such as dropout, hidden state size and observed their effects on model performance. The best model (RNN with fastText embeddings) achieved an accuracy of 71%. As a comparison, human performance is 92%. There is certainly room for improvement.

The detailed report can be found here.

---

Thanks for reading. If you like this post, consider sharing or adding claps to this post. More posts like this to come.

Subscribe to my newsletter to keep updated with cool projects and tutorials.