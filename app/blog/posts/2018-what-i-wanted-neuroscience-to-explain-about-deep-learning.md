---
title: "What I wanted neuroscience to explain about deep learning"
publishedAt: "2018"
summary: "What I wanted neuroscience to explain about deep learning"
reviewDraft: "true"
---

I first encountered Ankit Patel on my reading trail: I was reading up on autoencoders and was looking for information on the latent space learnt by them. I came across a paper about this by Ankit Patel.

Now, I have to place a bet on what portion of the internet will be reading this text. But the fact that you are reading this, I'm gonna assume that you are a deep learning aficionado, and hence probably find the idea of an autoencoder a lot more intuitive than neuroscience research.

So, I'll start with a brief overview of the paper and Ankit's work, and then I'll try to talk about things I found particularly interesting.

Autoencoders are a very useful tool to learn a good low dimensional projection of the data. Ideally, the representations learnt by the autoencoder should be able to capture the underlying structure of the data in the latent space, allowing one to do meaningful stuff like data compression, or interpolation between data points.

They are also known to learn interpretable representations. However, they are finicky to train, and in practice, it is very difficult to train an autoencoder that learns a good latent space.

Ankit is a neuroscientist, but he first got my attention via his paper titled "Is a good AI a good model of biological vision?". The paper is about a better way to evaluate if a neural network is a good model of human visual cortex.

The paper is interesting because it provides a novel perspective on what makes a good model. Usually, the quality of a model is evaluated using one of two metrics: either you evaluate the model by measuring how well it fits the data, or by measuring how well it predicts unseen data.

In Ankit's paper, he argues that the visual cortex is not necessarily optimized for either of those two metrics. Instead, he argues, we should compare the kind of errors a model makes with the kind of errors humans make.

In fact, with respect to low-level vision, it is possible for a model to have a near perfect score according to the two metrics above, and still model the visual cortex poorly.

In his paper, Ankit uses his neural networks with this error-based metric to evaluate if a model is a good model of the human visual cortex.

I was pretty excited by this idea because it gave me another way to evaluate the quality of the latent space learnt by an autoencoder. I could generate this kind of error-based metric for the latent space. I could then use this metric to evaluate my model.

And I was curious to know how this metric would behave. If there exist two models with similar data-fit and generalization error, would the error patterns help me choose between them? And would the model with better data-fit (or generalization) also do better on the this error-based metric?

Anyways, after finding Ankit's work interesting, I checked out his lab page. And I found a lot of interesting ideas.

For example, to understand visual processing, Ankit is working on applying the models he develops in his lab to other kinds of signals. This involves using deep learning to model how the brain processes music or language.

I found this very interesting, because the kinds of signals mentioned above are known to be correlated with vision. For example, words that co-occur often in text tend to be visually similar. Hence, it is possible for a network to use this information to understand vision.

But is this how the brain works? Does it use the correlations between different kinds of signals to understand the world?

Another interesting research interest is his work on "Computational psychiatry". Here, Ankit is using machine learning to predict a patient's response to treatment, given the patient's MRI scan.

Again, for a machine learning practitioner, this is like any other predictive task. But I find it interesting to think about this task in the context of neuroscience, because it might provide a way to probe the physical substrate of mental illness.

Anyways, I've now spent a lot of time talking about what Ankit does, and what's interesting about it.

But I wanted to use this opportunity to nudge you to go look through his lab page yourself, and maybe, if you are a neuroscientist, a discussion of how Ankit's work might intersect with deep learning.

The reason I'm interested is because I think the work in neuroscience, and the work in deep learning is similar in a very important way:

In both cases, you are trying to understand how some pixels (or numbers), pass through a series of linear and non-linear transformations, and eventually result in some label.

So, I'm hoping my neuroscientist friends can tell me:

- What are the interesting parallels between deep learning and neuroscience?
- How does the different kind of data available in both cases affect the algorithms we come up with?
- How can insights from one field help the other field?

I understand that these are pretty open ended questions, and perhaps, if you are a neuroscientist, you'll find some of my questions naive. But I'm hoping you'll let me know, and explain why.

I'm also hoping that my neuroscientist friends might find some of my naive questions interesting, and point me to relevant work.