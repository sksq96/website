---
title: "gan-pytorch"
publishedAt: "2017-02-14"
dateBasis: "source event date; reconstructed post"
summary: "gan-pytorch"
reviewDraft: "true"
---

### Understanding GAN

OpenAI recently posted a fake handwriting written by their RNN, and I was blown away by the quality of text generated. I've been wondering how to train an RNN to generate realistic samples, and I stumbled upon this blog post by [@erikbern](https://twitter.com/erikbern). I've also heard about GANs, and decided to read up about its theory.

* **GAN**: Generative Adversarial Networks
* **Generator**: Neural network that generates fake data
* **Discriminator**: Neural network that decides if the data is real or fake
* **Generative**: model the distribution of data (opposite of discriminative model). For instance,  given the data which are image pixels,  discriminative models tries to classify if the image is of a cat or  a dog; while a generative model tries to predict the probability of the image's pixel values.

GANs are like a **counterfeiter**(Generator) and a **cop**(Discriminator) in a game of cat and mouse. The counterfeiter is trying to generate fake currency and use it without getting caught, while the cop is trying to detect the fake currency.

In a typical GAN setting, the counterfeiter and the cop are both neural networks. The counterfeiter takes in noise as input and generates a sample. The cop takes a sample (real data or fake data) as input and predicts if the sample is real or fake. The cop and the counterfeiter are competing each other in a game, and as the game goes on, they both get better at their own tasks. When the game converges, the counterfeiter can generates samples that are almost indistinguishable to the cop.

![](images/gan-comic.png)
([source](https://github.com/eriklindernoren/PyTorch-GAN/blob/master/img/gan_comic.png))

Here's a simplified example from the [original paper](https://arxiv.org/pdf/1406.2661v1.pdf). We want to generate samples that look like $(1,1)$. We define a Generator $G$ that takes in a random number $z$ and outputs a pair $(x_1, x_2)$. We then define a Discriminator $D$ that takes in the pair and outputs a score $0$ or $1$, with $1$ indicating that $D$ thinks the pair is real. $G$ and $D$ are both parametrized by a neural network, and we want to optimize the following objective:

$$ \min_{G} \max_{D} \mathbb{E}_{x \sim p_{data}} \log D(x) + \mathbb{E}_{z \sim p_{z}} \log (1 - D(G(z))) $$

$$A = \mathbb{E}_{x \sim p_{data}} \log D(x)$$
$$B = \mathbb{E}_{z \sim p_{z}} \log (1 - D(G(z)))$$

Intuitively, $D$ wants to maximize the objective, while $G$ wants to minimize it. The term $A$ says that if we get a real sample, we want $D$ to output a higher score $(\rightarrow 1)$. The term $B$ says that if we get a fake sample, we want $D$ to output a lower score $(\rightarrow 0)$.

$A + B$ is $D$'s objective. If $D$ outputs 1 for real samples and 0 for fake samples, the objective is maximized. For the counterfeiter, its objective is $A + B$. Since $A$ is fixed (it does not depend on the generator), $G$'s goal is to minimize $B$. If $G$ is good, it can generate fake samples that are indistinguishable from the real samples, forcing $D$ to output 1 for the fake samples. $B$ is minimized ($\log (1-1)$).

Specifically for this problem, we can define a loss function for $G$ and $D$ and train them in tandem. Here's the model architecture:

```
D = Sequential (
  (0): Linear (2 -> 25)
  (1): Tanh ()
  (2): Linear (25 -> 25)
  (3): Tanh ()
  (4): Linear (25 -> 1)
  (5): Sigmoid ()
)

G = Sequential (
  (0): Linear (1 -> 25)
  (1): Tanh ()
  (2): Linear (25 -> 25)
  (3): Tanh ()
  (4): Linear (25 -> 2)
)
```

The Generator takes in noise $z$ and outputs pairs of points, and the Discriminator takes in points and outputs a score.

```python
# train the discriminator
d_real_decision = D(X)
d_real_loss = criterion(d_real_decision, Variable(torch.ones(m, 1)))

d_fake_decision = D(G(z))
d_fake_loss = criterion(d_fake_decision, Variable(torch.zeros(m, 1)))

d_loss = d_real_loss + d_fake_loss

# train the generator
g_fake_decision = D(G(z))
g_loss = criterion(g_fake_decision, Variable(torch.ones(m, 1)))
```

The real data are distributed around $(1,1)$, and the fake data from the generator are distributed around $(0,0)$. After 10000 iterations, the generator learns to generate samples that look like real samples.

![](images/gan-train.gif)

This is a simple example, and I still need to figure out how to apply GAN to RNN and text generation. Generating text seems to be harder, as it depends on both the semantics and the structure of the sentence. I'll also need to understand the mathematical theory behind GAN. In the next few weeks, I'll try to generate Chinese poems with GAN.

**Resources**

* [Generative Adversarial Networks](https://arxiv.org/abs/1406.2661)
* [Generative Adversarial Networks, Explained](https://blog.statsbot.co/generative-adversarial-networks-explained-54a32d0e4c4e)
* [What are GANs](https://github.com/OpenAI/pixel-cnn)
* [** Generative Adversarial Networks **](https://github.com/eriklindernoren/PyTorch-GAN)
* [torch-GAN](https://github.com/carpedm20/DCGAN-tensorflow)
* [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)