---
title: "the bike rental problem i reviewed at udacity"
publishedAt: "2017"
summary: "the bike rental problem i reviewed at udacity"
reviewDraft: "true"
---

The first project in Udacity's Deep Learning Nanodegree was:

> **Predict the number of bikes that will be rented in a particular hour of the day.**

Students are given a few years of historical data.  Here are the first few rows of that data:

```
In [25]: data_features.head()
Out[25]:
   season  year  month  hour  holiday  weekday  workingday  weather  temp  \
0       2     0      1     0        0        6           0        1  0.24
1       2     0      1     1        0        6           0        1  0.22
2       2     0      1     2        0        6           0        1  0.22
3       2     0      1     3        0        6           0        1  0.24
4       2     0      1     4        0        6           0        1  0.24

   feel_temp  humidity  windspeed  casual  registered
0  0.2879          0.81       0     3         13
1  0.2727          0.80       0     8         32
2  0.2727          0.80       0     5         27
3  0.2879          0.75       0     3         10
4  0.2879          0.75       0     0          1
```

So for example the first row represents the counts from the zeroth hour of the first day of 2011, a non-holiday Saturday in winter with clear skies.  It was 0.24 degrees centigrade and 0.81 humid with no wind.  3 casual users and 13 registered users rented bikes during this hour.

The first neural network students write is a general purpose neural network.  It takes as input a vector of numbers, passes the vector through one or more hidden layers, and returns a vector of numbers as output.  Students have to write code to perform the forward pass, and the backward pass (to implement backpropagation).  Students then train this network to predict the number of bikes rented in a given hour, given the data available for that hour.

## Let's look at the predictions

Before looking at the predictions, let's look at the data.  This is the pattern of bike rentals in the data:

![](/assets/bike_rental_histogram.png)

So most hours have about 150 bike rentals, but a few hours have upwards of 800 bike rentals.

**What do you think the distribution of the predicted number of bike rentals will look like?**

Here's one student's predictions:

![](/assets/predicted_bike_rental_histogram.png)

Notice how there are hardly any predictions over 300.  Here are the predictions for some specific days.  The first day is a workday:

![](/assets/workday_predictions.png)

And the second day is a weekend:

![](/assets/weekend_predictions.png)

See how the predictions are pretty flat?  The model has learned the average number of bike rentals for each hour of the day, but it isn't able to predict the peaks and troughs.

The student I'm reviewing submitted a model where they minimised the loss function (mean squared error).  Here's the training and validation loss:

![](/assets/training_and_validation_loss.png)

Notice how the loss flattens out at around 85.  Here's what I would say to the student:

> Your loss does seem to have plateaued, but I'm not sure your predictions look like the targets.  Have a look at the predictions.
>
> The first plot shows the distribution of the predictions, and the second and third plots show how the predictions compare to the targets on a workday and a weekend.  See how the predictions are pretty flat?
>
> Do you know why this is happening?  Do you have any ideas on how you could improve the model?

I think the main reason students struggle is they don't look at the predictions of their model.  They train a model, check the loss, and if the loss has decreased they submit the model.  If the loss hasn't decreased they submit a different model.

I think _every_ model should be accompanied by at least one plot, showing the predictions of the model.  You can't improve a model if you don't know how it is failing.