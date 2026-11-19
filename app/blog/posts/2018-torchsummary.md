---
title: "torchsummary"
publishedAt: "2018-04-25"
dateBasis: "source event date; reconstructed post"
summary: "torchsummary"
reviewDraft: "true"
---

I feel like I was using torchsummary for a long time, but I've only checked out the code now, and it's very simple.

Here is the most basic PyTorch model I can make. Doesn't work at all, but it shows the standard model representation.

```py
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(in_features=3, out_features=2),
    nn.Linear(in_features=2, out_features=1),
)

print(model)
```

```
Sequential(
  (0): Linear(in_features=3, out_features=2, bias=True)
  (1): Linear(in_features=2, out_features=1, bias=True)
)
```

It shows the names and parameters of all the layers, but no shapes. torchsummary adds lines like this:

```
   (0): Linear-1   [1, 2]    8
```

The only new information is the shape of the output: 2. It also keeps a running total of parameters. How does it compute this?

```py
def summary(model, input_size):
    device = next(model.parameters()).device
    x = torch.randn(2, *input_size).to(device)
```

It starts by making a random input. The size of each dimension of the input must be provided. The first dimension is batch size, which is set to 2, presumably because some layers (like batchnorm) behave differently with batch size 1.

```py
    def register_hook(module):
        def hook(module, input, output):
            class_name = str(module.__class__).split(".")[-1].split("'")[0]
            module.__dict__["input_shape"] = list(input[0].size())
            module.__dict__["output_shape"] = list(output.size())
            module.__dict__["num_params"] = sum(
                [
                    torch.numel(p)
                    for p in module.parameters()
                    if p.requires_grad
                ]
            )
```

This function does the core of the work. It defines a hook, which will be attached to each layer. When the layer is called, it will attach some fields to the layer object.

```py
        if not isinstance(module, nn.Sequential) and \
           not isinstance(module, nn.ModuleList) and \
           module != model:
            hooks.append(module.register_forward_hook(hook))
```

This registers the above hook to each module. "module != model" is because the model used to be a module itself (like nn.Sequential). The examples at the top of the file use that style, but the test file uses a user-defined class.

I guess if the top-level module was a Sequential, it would not have been a leaf module, and so it would never be called, and so the hook would never run.

```py
    hooks = []
    model.apply(register_hook)
```

"apply" applies the given function recursively to all child modules.
Then we run the model, which will run the hooks.

```py
    # make a forward pass
    model(x)
```

Then we loop through all the modules in the model, and print a row of info for each one.

```py
    for layer in model.modules():
        # we want only leaf modules
        if len(list(layer.children())) == 0:
            total_params += layer.num_params
```

I was a little confused by the model.children() vs model.modules() distinction, but the above comment is clear: "modules" traverses deep to the leaf modules, and "children" only looks at direct descendants.

There is also a bunch of code for printing the table. I learned some things from it!

I thought it was weird that this project was its own pypi package, when it's so simple. But I guess it's convenient to install it with "pip install torchsummary". And it's kind of satisfying to put a number in a table.