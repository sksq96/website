---
title: "Mixture Density Networks"
publishedAt: "2018-05-16"
dateBasis: "source event date; reconstructed post"
summary: "Mixture Density Networks"
reviewDraft: "true"
---

> What makes us human is the fact that we’re not machines. We’re not deterministic. We have free will.—– [David Ha](https://medium.com/@hardmaru/why-doesnt-my-machine-learning-model-work-6e05f2aa4e4f)

![mdn.png](./images/mdn.png)

In the previous posts, we used neural networks to fit a function or to classify images.

For regression tasks, the networks gave us a single target value for each input. But sometimes one target value is not enough.

We can have multiple possible outputs y for a single input x. In such a case, we might prefer to output a probability distribution over possible targets y.

This is exactly what a Mixture Density Network (MDN) does.

**In this post, I will explain how to implement a Mixture Density Network in Pytorch.** 

> ⚠️ This post assumes that you understand the basics of machine learning and are familiar with Pytorch. If you aren’t, I have several beginner posts that you can read before this one:

> - [How to teach a neural network to play Flappy Bird](./teaches-flappy-bird.md)
> - [Create your Neural Network from scratch in Python](./neural-network-from-scratch-in-python.md)

### Creating a non-linear data

Let’s start by creating a non-linear function and adding noise to it.

If you’re unfamiliar with Numpy, I would recommend to check my [Introduction to Numpy tutorial](https://github.com/sksq96/numpy-tutorial) first.

```python
import numpy as np
import matplotlib.pyplot as plt

def create_toy_data(N):
    X = np.random.uniform(0, 4, N)
    eps = np.random.normal(0, 0.3, size=N)
    Y = np.sin(2*X) + eps
    return X, Y
```

Let’s visualize our data!

```python
N = 1000
X, Y = create_toy_data(N)
plt.scatter(X, Y, alpha=0.5)
plt.show()
```

![Screenshot from 2018-05-16 02:55:45.png](./images/screenshot-from-2018-05-16-025545.png)

Now, if we take a vertical slice of the data, we can see that there are multiple possible outputs Y for a given input X. That is what we are trying to model with the Mixture Density Network.

![ezgif.com-video-to-gif.gif](./images/ezgifcom-video-to-gif.gif)

### Using a neural network to fit the data

Let’s try to fit our model using a simple neural network

```python
class SimpleNet(nn.Module):
    def __init__(self, hidden_size, activation_fn):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(1, hidden_size), 
            activation_fn,
            nn.Linear(hidden_size, hidden_size), 
            activation_fn,
            nn.Linear(hidden_size, 1),)

    def forward(self, x):
        return self.net(x)
```

We’ll need to convert our data to a Pytorch Tensor and train the network:

```python
import torch
from torch import nn, optim

X_tensor = torch.Tensor(X).view(-1, 1)
Y_tensor = torch.Tensor(Y).view(-1, 1)

net = SimpleNet(20, nn.ReLU())

criterion = nn.MSELoss()
optimizer = optim.Adam(net.parameters(), lr=1e-2)

for epoch in range(1000):
    y_pred = net(X_tensor)
    loss = criterion(y_pred, Y_tensor)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if epoch % 50 == 0:
        print("Step {}, Loss {}".format(epoch, loss))
```

We can visualize our prediction:

```python
X_range = torch.Tensor(np.linspace(0, 4, 1000)).view(-1, 1)

y_pred = net(X_range)

plt.plot(X, Y, 'o', alpha=0.5)
plt.plot(X_range.data, y_pred.data, 'r', lw=4)
plt.show()
```

![Screenshot from 2018-05-16 03:05:43.png](./images/screenshot-from-2018-05-16-030543.png)

Our network isn’t able to capture the complexity of our data.

If we look at the range X=(1.5, 3), the network can’t capture the vertical spread of the data. Instead of returning a distribution of output values, it returns a single average value.

### Mixture Density Network

A Mixture Density Network consists of a neural network with a mixture distribution at its output layer.

The mixture distribution is a weighted sum of probability distributions.

For example, we can create a mixture of three Gaussian distributions:

![image](./images/image-1.png)

In this example, the first distribution has a mean μ=2 and standard deviation σ=0.5. The second distribution has a mean μ=0 and standard deviation σ=1. and the third distribution has a mean μ=-2 and standard deviation σ=0.5.

As you can see in the plot, the mixture is the sum of the three distributions.

**How can we create a distribution of outputs using the neural networks?**

Instead of outputting a single value for each data point, the neural network will output the parameters of the mixture.

In our example, we have three Gaussian distributions in our mixture. Thus we need to output the weight, mean and standard deviation of each distribution.

```python
class MDN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size, nb_mixtures, activation_fn):
        super().__init__()
        self.nb_mixtures = nb_mixtures

        self.net = nn.Sequential(
            nn.Linear(input_size, hidden_size), 
            activation_fn,
            nn.Linear(hidden_size, hidden_size), 
            activation_fn,)

        self.pi = nn.Sequential(
            nn.Linear(hidden_size, self.nb_mixtures), 
            nn.Softmax(dim=1))
        self.mu = nn.Linear(hidden_size, output_size * self.nb_mixtures)
        self.sigma = nn.Sequential(
            nn.Linear(hidden_size, output_size * self.nb_mixtures), 
            nn.Softplus())

    def forward(self, x):
        z = self.net(x)
        pi = self.pi(z)
        mu = self.mu(z).view(-1, self.nb_mixtures, 1)
        sigma = self.sigma(z).view(-1, self.nb_mixtures, 1)
        return pi, mu, sigma
```

In our example, we are using a mixture of Gaussian distributions. The output of the network is the weight, mean and standard deviation of each Gaussian distributions.

The weight π is a value between 0 and 1 and all the weights sum to 1. We use a Softmax activation function to ensure that the output meet these criteria.

The mean μ can be any value. Therefore, we don’t use any activation function for this parameter.

The standard deviation σ must be positive. We use the Softplus activation function to ensure that the output is always positive

### Maximum likelihood estimation

Since we are predicting a distribution, we need to define a new loss function. We’ll use the maximum likelihood method to maximize the probability that our model produced the observed data.

![image](./images/image-2.png)

On the left side of the equation is the function that we’ll minimize to maximize the data likelihood.

On the right side of the equation is the probability distribution that we’ll use to compute the probability for each data point. This is the Gaussian distribution probability density function.

Let’s implement this in Pytorch.

```python
from torch.distributions.multivariate_normal import MultivariateNormal

def gaussian_distribution(y, mu, sigma):
  sigma = torch.exp(sigma)
  mvn = MultivariateNormal(loc=mu, covariance_matrix=sigma)
  return torch.exp(mvn.log_prob(y))
```

Now, we can compute the mixture probability density function by summing over each distribution.

```python
def mdn_loss_fn(pi, mu, sigma, y):
  total_prob = 0
  for idx in range(nb_mixtures):
    prob = gaussian_distribution(y, mu[:, idx], sigma[:, idx])
    total_prob += pi[:, idx] * prob
  return -torch.mean(torch.log(total_prob))
```

### Training

Let’s now try to train our model.

```python
nb_mixtures = 5
input_size = 1
hidden_size = 20
output_size = 1

X_tensor = torch.Tensor(X).view(-1, 1)
Y_tensor = torch.Tensor(Y).view(-1, 1)
y_range = torch.linspace(-2, 2, 1000)
y_range = torch.Tensor(y_range).view(-1, 1)

mdn = MDN(input_size, hidden_size, output_size, nb_mixtures, nn.ReLU())

optimizer = optim.Adam(mdn.parameters(), lr=1e-2)

for epoch in range(10000):
    pi, mu, sigma = mdn(X_tensor)
    loss = mdn_loss_fn(pi, mu, sigma, Y_tensor)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    if epoch % 100 == 0:
        print("Step {}, Loss {}".format(epoch, loss.item()))
```

As you can see in the plot below, we can’t fit the actual distribution.

![Annotation 2018-05-18 141607.png](./images/annotation-2018-05-18-141607.png)

This is because we are underfitting the model.

The mixture density network is more complex than the simple neural network. Thus we need to train it for longer.

However, this will take too much time to train. Instead, we can try to overfit the model by reducing the size of the data.

```python
X_tensor = torch.Tensor(X[:100]).view(-1, 1)
Y_tensor = torch.Tensor(Y[:100]).view(-1, 1)
```

![overfit.png](./images/overfit.png)

This is much better.

### Visualizing the distribution

We can also plot the distribution for a single input x to see how it changes through time.

![Annotation 2018-05-18 164816.png](./images/annotation-2018-05-18-164816.png)

And visualize the full distribution:

![Annotation 2018-05-18 164853.png](./images/annotation-2018-05-18-164853.png)

### Conclusion

In this post, I explained how to implement a Mixture Density Network in Pytorch. I implemented this model to make the RNN of the World Model stochastic. You can read more about it [here](./world-models-implementation-using-keras.md).