---
title: "Object Detection and Localization - finetuning a Classification Model"
publishedAt: "2017-04-24"
dateBasis: "source event date; reconstructed post"
summary: "Object Detection and Localization - finetuning a Classification Model"
reviewDraft: "true"
---

This project is part of a series, [blog](https://medium.com/@sksq96/object-detection-and-localization-part-1-2d9fa69b8431) post I've written and code can be found [here](https://github.com/sksq96/cnn-localization).

## Overview

In part-1, we saw how we could finetune a classification model to not only solve the classification but also produce bounding boxed surrounding the object in question. We saw that the model was unable to learn to detect the head due to the fact that the training set was too small. Hence, we curated our own smaller, public dataset in [part-2](https://medium.com/@sksq96/object-detection-and-localization-part-2-building-a-dataset-bb9f3e9b8f2). Let's see what we can learn from that.

In this post, we'll take a closer look at how the model learns to localize over the training epochs.

![](https://cdn-images-1.medium.com/max/1600/1*mO0Q8J0WqWXlN9oFomG_vg.gif)

All images here are from the test set

### The First Few Epochs

Since we are finetuning a classification model, it already knows which features are important to classify the dog breed. Our goal is to have it learn which pixels within the larger receptive field of the filter is important to look at, in order to locate the head.

![](https://cdn-images-1.medium.com/max/800/1*A8rERiQgnS6jF_o-aewQBw.png)

Good enough bounding box

So in the first few epochs, it will try to draw a larger box around the head so that it learns the general location of the head. This results in a larger bounding box.

The other approach it might take is to draw tightly over the most discriminative features of the head(ie the pixels that show the most distinct features for the head). This results in a smaller bounding box.

![](https://cdn-images-1.medium.com/max/800/1*sHnc5zJ5-hPZqfvrWFg8eg.png)

The other approach

### Over The Epochs

For the first few epochs, it's not able to distinguish between the discriminative features that are associated with the classification and the discriminative features associated with the head. So the model will try to box the entire dog and maybe even the entire image. The advantage is that the classification accuracy stays high, but the localization accuracy doesn't.

![](https://cdn-images-1.medium.com/max/800/1*RF-d_w9bL3o8KiaepTf8HA.png)

Loosely fits the head

But as it trains more, it will learn that the head is in a general region of the image, and hence be able to loosely fit the head within a bounding box.

![](https://cdn-images-1.medium.com/max/800/1*sQbpvz5Z1t8r8G4T4B2Z6A.png)

loosely fits the dog

In the mean time, it will also take an approach where it tries to tightly fit the bounding box around the dog.

![](https://cdn-images-1.medium.com/max/800/1*CUjY2_atM_tJPsX2FchslA.png)

bounding box for a full body

### Until it Hits a Sweet Spot

Somewhere around the 40-60 epochs, the model learns that the head has a center that it can pinpoint, and hence it will learn to draw a box around the head. The bounding box will be very close to the ground truth, and hence have a lower L2-loss.

![](https://cdn-images-1.medium.com/max/800/1*nkzSyjmO7wU1N9Qyj7vuaQ.png)

![](https://cdn-images-1.medium.com/max/800/1*-K7j1s_kK8YB0B-k2GwkCA.png)

![](https://cdn-images-1.medium.com/max/800/1*jzRu5kQM3jCvnDJM-iP7Vg.png)

![](https://cdn-images-1.medium.com/max/800/1*g9a-cR4l7_3S9aE0OkJShw.png)

![](https://cdn-images-1.medium.com/max/800/1*c9qE5dT5Q3puXSC7ls3LNg.png)

![](https://cdn-images-1.medium.com/max/800/1*5QmgxDjjZqp4-nDFczWQfg.png)

![](https://cdn-images-1.medium.com/max/800/1*3i_nZHwFo7zrGsS5-LtPJw.png)

![](https://cdn-images-1.medium.com/max/800/1*D_8REcIdmWX1x6-fT6B05g.png)

![](https://cdn-images-1.medium.com/max/800/1*5lGbzN3E8c3UXQy0ZQ7-_w.png)

### Curious Cases

It's interesting to see that the model is able to generalize the concept of the head, despite the variance in the pose of the head. Unfortunately, it is not able to generalize this to humans.

![](https://cdn-images-1.medium.com/max/800/1*E6IpO0_DC3q4v2FC1B1cAw.png)

![](https://cdn-images-1.medium.com/max/800/1*mI5h7fC48fKSb9GjVx1Nng.png)

## The Final Model

If you've been following the series, you'll remember that the final model had an L2-loss of 0.012. So it's not able to outperform the dlib face detector when it comes to localization accuracy. But the model was trained only on dog images and yet it is able to generalize to human faces. But dlib, on the other hand, is not able to generalize to dog faces. Although, this is not a fair comparison, you can feed in more data to each model and they would be better at generalization.

The advantage here is that the model solves two tasks - classification and localization, with the same computation you would use for just classification. You can think of classification as a freebie.

Further, this approach does not use any hand-crafted features. The model learns the most discriminative features for the particular task (in this case, the head). So in theory, we can use this approach to train on any object, as long as we have enough training data.

In the next part, I will be trying out a new architecture called the YOLO net, which shows state-of-the-art performance on object detection and localization.