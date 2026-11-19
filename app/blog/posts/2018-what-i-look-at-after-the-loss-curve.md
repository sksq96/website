---
title: "what i look at after the loss curve"
publishedAt: "2018-12-15"
dateBasis: "approximate day; source month"
summary: "what i look at after the loss curve"
reviewDraft: "true"
---

Going through deep learning fast.ai courses, they do something very simple for machine learning projects that still seems like an afterthought in many other courses and blogs I've come across.

They look at their data. A lot.

__And so should we.__

_Let's try to understand why, and how we should do it._

_Note: This is a somewhat philosophical post. It's not supposed to be a quick how-to. There are many of those already. It explores a little bit of the why._

In the fast.ai course, the first thing they do is train a deep learning model to classify various breeds of dogs. Then, after the model is trained, they dig deeper and look at all the dogs that were not classified correctly.

If you just looked at the loss function, you would have no idea what's going on.

![](https://cdn-images-1.medium.com/max/800/1*9B5Ssc6mL2_m1x0RgxHNgw.gif)

Deep down in the guts of the model, it's just optimizing a loss function, a scalar value. That means that all the information that went into the model is being compressed into a single number. That's a huge amount of compression. And when you do a lot of compression, you lose a lot of information.

That's why we use accuracy, rather than loss, to determine how good our model is. Accuracy is more meaningful to a human. It's not a perfect metric, but its more useful than loss.

This loss curve also hides what you should really care about. It hides the transition from the initial state, where the model is basically just randomly guessing, to the point where you have a trained model. This is the part you care about. We want to make the model learn better and faster.

The loss curve is just an average of the model's performance across all data points. It doesn't tell you much about individual data points.

![](https://cdn-images-1.medium.com/max/800/1*2K2y-W7Jz7m4oV0MGPN5Gw.png)

Let's look at an example of training a quadcopter how to fly. I've done that in another blog post, but I'll share the results here as well.

In that project, I trained a deep reinforcement learning agent to takeoff, hover and land a quadcopter in a simulated environment. My first attempt at takeoff was not that successful.

![](https://cdn-images-1.medium.com/max/800/1*XzK8oVQ8GPy3fuOj0hVnGA.gif)

Here's an image of the reward function over the epochs. I tried many different reward functions, and this is a better example. You can see it rising over time. If you were to look at the loss curve for the deep neural network that was optimizing, it wouldn't show anything like this.

![](https://cdn-images-1.medium.com/max/800/1*gg0TZoGPy0S8F3l5rdoD6g.png)

Reward function for Reinforcement Learning quadcopter project

When I look at the video of the quadcopter, something becomes clear to me. It's learning. It's not just randomly moving around. It knows that whenever it is below a certain altitude, it should apply force to all rotors.

It's just missing a few subtle, but important details. It doesn't know what to do when it's getting close to the desired altitude. It doesn't know that it needs to slow down or do something different.

![](https://cdn-images-1.medium.com/max/800/1*XzK8oVQ8GPy3fuOj0hVnGA.gif)

Here is another example of the quadcopter learning to land. Again, just by looking at the video I can tell that it's learning. But it doesn't know how to slow down when it gets close to the ground. It's still trying to apply maximum thrust.

![](https://cdn-images-1.medium.com/max/800/1*xnqcVZqR-iEm3xM1G_9dXg.gif)

If I want to improve the outcome, the first thing I would do is design a better reward function. I would incentivize it to get better control over the quadcopter, perhaps by penalizing it for rotational velocity. I would also reward it for closer distance to the target altitude, rather than just a hard threshold.

In a supervised learning problem, you can do much more. You can look at all the samples that were misclassified. You can try to understand why the model is misclassifying them. Are they too dark (or too light)? Are they blurry? Are you missing many examples of this specific class of dogs in the training set? Did you incorrectly label some of them?

Here is an example from the fast.ai course in the first lesson, where they are training a deep convolutional neural network to detect various breeds of dogs. This is the confusion matrix. It looks at each data point and shows how many of them were correctly or incorrectly classified. It also shows what they were misclassified as.

![](https://cdn-images-1.medium.com/max/800/1*Tvr-0lR1nW-Z1nK5bZTGTg.png)

Confusion matrix example

Then it looks at the top 4 most common misclassifications, and shows you those images.

![](https://cdn-images-1.medium.com/max/800/1*-eW9P_79pT-XWxZJ7U8UAA.png)

When I look at those images, I can see that they are very hard to classify. The one in the top-left corner is a Siberian Husky. It's white, and it's very hard to distinguish from a white German Shepherd.

The one in the top-right corner is a Siberian Husky and a German Shepherd that are very similar. The one in the bottom-left corner is a German Shepherd. The one in the bottom-right corner is a Siberian Husky.

If I wanted to improve the model, I would add more examples of these images to the training set. I would also try to find more examples of these images that are not in the training set.

I'd do something similar to the quadcopter project. I'd look at the videos of the quadcopter failing, and try to understand why. I'd try to find a better reward function. I'd try to find a better neural network architecture. I'd try to find a better set of hyperparameters.

I'd also look at the images of the quadcopter that were correctly classified, and try to understand why. I'd try to find a better reward function. I'd try to find a better neural network architecture. I'd try to find a better set of hyperparameters.

And so should you!

The main takeaway is that you should look at the data. A lot. You should look at the images, the videos, the confusion matrices, the loss curves, the reward functions, the neural network architectures, the hyperparameters, and anything else that gives you a window into the model.

![](https://cdn-images-1.medium.com/max/800/1*nWZ9KoC3Mq2Z3w3IOxg3xw.gif)