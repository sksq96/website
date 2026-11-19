---
title: "DCGAN: Experiments with Multiple Discriminators"
publishedAt: "2017"
summary: "DCGAN: Experiments with Multiple Discriminators"
reviewDraft: "true"
---

PyTorch Implementation of DCGAN with multiple Discriminators.

### The Discriminator and Generator

The Discriminator takes in the image and outputs a probability that the image is real (or fake, depending on how you want to define it).

The Generator takes in a random noise image, and outputs a fake image.

```
Input                                          Output

Discriminator Model:
Real Image                                      Probability that image is real

Generator Model:
Noise Image                                     Fake Image
```

### Pytorch

This is how the Discriminator is built in PyTorch.

```python
class Discriminator(nn.Module):
    def __init__(self, nc):
        super(Discriminator, self).__init__()
        self.main = nn.Sequential(
            # input is nc x 64 x 64
            nn.Conv2d(nc, ndf, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf) x 32 x 32
            nn.Conv2d(ndf, ndf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 2),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*2) x 16 x 16
            nn.Conv2d(ndf * 2, ndf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 4),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*4) x 8 x 8
            nn.Conv2d(ndf * 4, ndf * 8, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 8),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*8) x 4 x 4
            nn.Conv2d(ndf * 8, 1, 4, 1, 0, bias=False),
            nn.Sigmoid()
        )

    def forward(self, input):
        output = self.main(input)
        return output.view(-1, 1).squeeze(1)
```

This is how the Generator is built in PyTorch.

```python
class Generator(nn.Module):
    def __init__(self, nc):
        super(Generator, self).__init__()
        self.main = nn.Sequential(
            # input is Z, going into a convolution
            nn.ConvTranspose2d(nz, ngf * 8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 8),
            nn.ReLU(True),
            # state size. (ngf*8) x 4 x 4
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            # state size. (ngf*4) x 8 x 8
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            # state size. (ngf*2) x 16 x 16
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            # state size. (ngf) x 32 x 32
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh()
            # state size. (nc) x 64 x 64
        )

    def forward(self, input):
        output = self.main(input)
        return output
```

The original paper can be found here.

### Experimenting with Multiple Discriminators

I have wanted to experiment with multiple Discriminators when GANS just came out. I have been busy for the last 2 months and didn’t really have time to experiment. But now I got some time, and here’s what I did:

I used the DCGAN architecture with **two Discriminators**.

Here’s what I did:

```
1. Sample a batch of real images
2. Pass them into discriminator 1
3. Pass them into discriminator 2
4. Sample a batch of noise images
5. Pass them into generator
6. Pass the output of 5 into discriminator 1
7. Pass the output of 5 into discriminator 2
8. Update the weights of discriminator 1 and 2
9. Update the weights of the generator
```

Basically, the Generator will be trained by 2 Discriminators, which makes it harder for the Generator. I don’t think this will yield very impressive results, but it’s fun.

I’m just playing around, and I will update this repository if I see any interesting results.

### Future Experiments

My notes from Workflowy:

* Multiple Discriminators
* Multiple Generators
* Dueling Discriminators (instead of a single output, it outputs two logits, then taking a mean)
* Dueling Generators (same thing)
* Increasing the batch size to 128