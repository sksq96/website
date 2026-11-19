---
title: "World Models"
publishedAt: "2018-04-08"
dateBasis: "source event date; reconstructed post"
summary: "World Models"
reviewDraft: "true"
---

![Automated Car Racing Game](../images/world-models/combined.png)

<center>

*Fig 1. The combined goal of the three models.*

</center>

The paper is an attempt to replicate how real world would work in an artificial environment - by letting the agent explore the environment and learn by itself.

It is a combination of three models.

1. Vision: V model to encode the raw pixel information (high dimensional) into more succinct latent vector.
2. Memory: M model to predict future representation in the latent vector space.
3. Controller: C model to determine best action given the latent vector and hidden state of M.

The paper is a cool and fun read. My notes here are only about the methods and details required to build the model.

## Vision - VAE Model

The VAE model was used to convert the high dimensional pixel information into a compressed latent vector. This was done by using a variational autoencoder.

![VAE](../images/world-models/vae.png)

<center>

*Fig 2. VAE*

</center>

The loss function was a simple combination of two things:

1. Reconstruction loss. This was the difference between the input image and the generated image. They say they use Euclidean loss. I'm not sure what that is exactly. But I know it's the difference in pixel values. They also say it is the same as optimizing the ELBO loss. So maybe it's not really Euclidean loss but just a name they gave it.
2. KL divergence. This was between the latent vector and N(0, I). They use a Gaussian latent vector, so this is used here.

One thing different to the paper is that I used a simple convolutional layer at the end to map from 4 channels to 3 channels. I cannot get the deconvolution to work perfectly.

I found that the VAE was able to learn very quickly. With only 2000 steps (20 epochs), the reconstruction was already quite good. The paper mentions that they used 10k steps.

## Memory - MDN-RNN

The second model is the memory model. The idea of this model is to learn the dynamics of the world in the latent space. Then it is able to generate what the next state would look like, given the previous state. The model is trained on three inputs:

1. The latent space of the VAE.
2. The hidden state of the RNN itself.
3. The action taken.

The model then outputs the next hidden state and the next latent vector.

### MDN-RNN

The RNN itself is a normal RNN. The key characteristics of this model is that it's output produces the parameters of a Mixture Density Network.

The MDN can be thought of as a weighted sum of gaussians. If the VAE produces a latent vector of shape (z,), then the gaussian has mean (z,) and variance (z,). The weights are scalar values.

The way the MDN works is that we use the RNN output to predict the parameters of the MDN. Then from the MDN, we can sample to get the latent vector.

The MDN is trained using the maximum likelihood loss function. The idea is that we want to maximize the likelihood of the latent vector given the gaussian.

One thing to note here is that the z value is a sampling. There will be noise. The MDN should learn to cater for this noise.

![RNN](../images/world-models/rnn.png)

<center>

*Fig 3. RNN*

</center>

## Controller

There are two main parts to this model.

1. The final loss function.
2. Training the controller.

The final loss function is the sum of the rewards. This is the loss function that we want to optimize. Most of the other loss functions were there to build the VAE and RNN.

The controller was trained using a genetic algorithm. The idea is this:

1. We have a population of agents. Each agent is a controller.
2. For each agent, we evaluate their performance.
3. We then select the top performing agents.
4. We then crossover and mutate the agents.
5. We then repeat the process.

They used CMA-ES as their optimization algorithm.

## Results

I didn't really try to replicate the results. The VAE and RNN are already hard to put together. I was interested in the results from training the controller entirely in the dream.

I think this is the most interesting part of the paper. It shows that training in the dream can be as effective as training in the real world.

## Code

My code is here.

I don't have the code for the controller that they used. But I have written my own VAE and RNN models so that you can play around with them. They are all in PyTorch.

## References

- David Ha and Jürgen Schmidhuber. 2018. World Models.

[1]: https://github.com/sksq96/dl-papernotes/tree/master/world-models
[2]: https://github.com/sksq96/dl-papernotes/tree/master/world-models/pytorch