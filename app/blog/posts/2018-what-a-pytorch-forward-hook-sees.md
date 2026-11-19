---
title: "On torchsummary"
publishedAt: "2018-04-25"
dateBasis: "source event date; reconstructed post"
summary: "On torchsummary"
reviewDraft: "true"
---

The [torchsummary](https://github.com/sksq96/pytorch-summary) library that I wrote a while ago has been getting some attention recently. So I thought I’d write a blog post about it.

I wrote this library because I wanted something similar to Keras’ `model.summary()` in PyTorch. TensorFlow also has something similar (`tf.trainable_variables()`). I used Keras right before I switched to PyTorch, so Keras’ `model.summary()` is an API that I was very familiar with.

## Why use `torchsummary`?

**Debugging**

`torchsummary` is really useful as a debugging tool. It helps you “see” the network you have created. It shows you the shape of the output tensor of your layers. So if you get an error about the input dimension of your linear layer not matching your layer’s weights, you can check the output shape of the layers to see where the shape went wrong.

**Understanding**

`torchsummary` is also useful if you are just starting to learn PyTorch and want to understand how certain layers work. For example, if you run `torchsummary` on some model you will see an output like this:

![](https://cdn-images-1.medium.com/max/800/1*qXW9I1o-379X_TnAUh5Tlw.png)

Now take a look at the output shape of the `Conv2d` layer. Look closely. What does it tell you?

The output shape of `Conv2d` is `[-1, 10, 24, 24]`. The -1 here is the batch size. So each example is a 10 channel 2D matrix (`[10, 24, 24]`). This matrix is the output of `Conv2d`. The output of `Conv2d` is a matrix or tensor which is a linear combination of the input matrix.

Since the output of `Conv2d` is just a tensor or matrix we can do all sorts of things with it. For example, we can do more convolutions on top of it, we can do linear transformations on top of it (after flattening it).

I hope this example shows you how useful `torchsummary` can be for understanding layers.

### How does `torchsummary` work?

Using `torchsummary` is very simple. All you have to do is import the `summary` function from `torchsummary` and pass in the model and input shape.

```
from torchsummary import summary 

summary(model, (channels, H, W))
```

So how does this work?

Well, I used something called hooks. These are functions PyTorch provides that you can attach to any PyTorch layer. When a layer is called the hook function is executed. There are 2 kinds of hooks: `forward_hook` and `backward_hook`. `forward_hook` is called when the forward pass is executed. `backward_hook` is called when the backward pass is executed.

For `torchsummary` I used `forward_hook` because all I need is the shape of each layer’s output during the forward pass.

### How does `forward_hook` work?

Let’s look at the definition of `forward_hook`:

```
hook(module, input, output) -> None or modified output
```

First, `forward_hook` is attached to a layer/module. When the layer is called, `forward_hook` is also called with the layer passed in as the first argument, the input tensor to that layer passed in as the second argument and the output tensor returned by the layer passed in as the third argument. The hook function can either return `None` or modify the output.

An example is probably the best way to understand this.

```
import torch
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        return x

def hook(module, input, output):
    print("module:", module)
    print("input:", input)
    print("output:", output)

model = Net()
net = model.conv1
net.register_forward_hook(hook)
x = torch.rand(1, 1, 28, 28)
y = model(x)
```

The code above creates a simple conv net and registers a hook to the first conv layer. When you run this code you will get an output similar to this:

![](https://cdn-images-1.medium.com/max/800/1*Qeu1Fv_h2Q-wfQ3t8zdQ9w.png)

You can see that the hook is successfully attached to the conv layer. So when the conv layer is called, the hook function is also called with the layer passed in as the first argument, input tensor passed in as the second argument and output tensor passed in as the third argument.

### How does `torchsummary` work?

Now that you know how `forward_hook` works, understanding how `torchsummary` works should be easy.

`torchsummary` registers one hook to every layer. This hook function stores the shape of the input and output tensors of every layer as well as the number of parameters of each layer in an `OrderedDict`. Then a `forward` pass is made through the network. Finally, the stored shape and parameter information is pretty printed.

![](https://cdn-images-1.medium.com/max/800/1*1U6S5-njo-RQL6_7M3LBQw.png)

## Conclusion

So that’s all there is to `torchsummary`. I hope you found this blog post useful.

I’m curious to know what other use cases people can come up with for forward and backward hooks. I’m sure there are many.

## Resources

1. [torchsummary](https://github.com/sksq96/pytorch-summary)