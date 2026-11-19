---
title: "colorizing a photograph with vgg16"
publishedAt: "2017-01-06"
dateBasis: "source event date; reconstructed post"
summary: "colorizing a photograph with vgg16"
reviewDraft: "true"
---

When I first discovered that computers can colorize black-and-white photos, I was not impressed. The results were very washed out, weirdly off, or deliberately fake.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-colored-paint.webp)
![](colorize-b-w-photos-with-neural-networks/colorized-photo-cat.webp)

This was not useful to me. I was expecting the machine to guess what the colors were in reality, not to invent something out of nothing.

But then, I found this repo by @sksq96. The results are amazing. It's possible to colorize photos with a vivid and realistic look.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-tiger.webp)

Here's how it works.

The machine has to guess an image's colors based on the grayscale values alone. It does this by taking a single grayscale channel and mapping it to a 3D color map (L\*a\*b\*).

The L\*a\*b\* color space helps the machine learn better because it is similar to how humans perceive color. It's based on a model of human vision that's used by the International Commission on Illumination.

The L\*a\*b\* space separates the L\* channel (lightness) from the a\* and b\* channel (color). L\* is based on a black-and-white photo. The a\* and b\* are based on the three primary colors of human vision (blue-yellow, red-green, and black-white).

The machine is given millions of existing photos to compare, analyze, and make connections. I was amazed at how simple and elegant the architecture is. It uses a pre-trained VGG16 model (object detection model from 2014). The output of the first few layers and the last few layers are used to make predictions for the a\* and b\* channel (the color).

![](colorize-b-w-photos-with-neural-networks/colorized-photo-architecture.webp)

As the image data goes through a convolutional neural network, it gets compressed and features are detected. The features get more complex at the deeper layers. So the output from different layers are the different features that the image consists of: edges, corners, textures, objects, etc.

The first layer (conv1\_1) is the raw pixel data. It gets sampled and connected to the first set of filters. When the filters respond to the raw pixels, they create feature maps. Combined, the maps make a new version of the image with the same dimensions but with the edges highlighted.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-cnn-layer.webp)

After going through multiple layers, it creates different feature maps from the images.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-cnn-layers-example.webp)

These feature maps get fed into the concatenated layers, where they are upsampled to make it the same size as the input image.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-concatenated-layer.webp)

The concatenated layers are the hypercolumns. They are used for finer localizations, and they are very good at capturing context. The hypercolumns are then connected to a fully connected layer to make predictions.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-hypercolumns.webp)

Every single pixel of the black-and-white photo is connected to a feature in the neural network. This is a huge computational task and it takes some time to compute.

When you give it a new image, it makes a guess of what the colors are. It does this by computing the probability of features given the grayscale input.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-perception.webp)

This is the part that's mind-boggling. The machine is making a guess based on statistical correlations. I've read through many comments and none of them could explain how the machine does what it does.

For example, how does it know that the wall is white and that the car is black? There's no way to verify this based on a black-and-white photo. But yet, when you test the machine, it will guess right most of the time. Here's an example.

![](colorize-b-w-photos-with-neural-networks/colorized-photo-car-before.webp)

![](colorize-b-w-photos-with-neural-networks/colorized-photo-car-after.webp)