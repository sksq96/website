---
title: "flappy bird was my introduction to deep learning"
publishedAt: "2016"
summary: "flappy bird was my introduction to deep learning"
reviewDraft: "true"
---

*In this post I randomly sample my 2016 actions and discuss them as a sequence.*

**2016-03-20:** I watched a video of an AI playing Flappy Bird (a simple game where you control a bird and try to fly between pipes).

**2016-05-11:** Again.

**2016-05-12:** I had the idea to make an AI that learns to play Flappy Bird. I found a recreation of the game in Python and decided that this was going to be my first machine learning project.

**2016-05-18:** I started a new repository called dqn-flappybird, and made the initial commit. I didn’t know how to train the AI, so I first just added functionality to control the bird with my arrow keys.

**2016-05-19:** I started working on the AI (a Q-learning algorithm, a type of Reinforcement Learning). This is when I discovered OpenAI Gym. It was announced in April, and it had lots of example programs that solved classic RL problems. I used them to understand how learning works in a simple environment.

**2016-05-20:** I started working on the Deep Learning part. I had to define a neural network to estimate the score for each action (jump or do nothing).

**2016-05-21:** After debugging I managed to make the whole system work as expected. This is when I figured out how to make a neural network learn (by trying different numbers for different parameters), how to make the code faster, and generally how to debug machine learning systems.

I’m not going to talk about the details of the implementation, but I recommend you open the GitHub repository in your browser and follow along. You can also read the code if you’re still confused.

## Playing the game

The first thing we have to do is to make the game playable. We can put the code in a class called GameController. We’ll be using PyGame’s API, which is very intuitive, so I won’t be explaining it here.

The only thing to note is that we’ll be using a dictionary called self.actions, which contains the possible actions as keys and the scores (explained later) as values.

![0.png](https://raw.githubusercontent.com/sksq96/sksq96.github.io/main/media/2022-06-23-misc-2016/0.png)

## Q-learning

Each time an action is performed (jump or do nothing), we receive a reward r. The goal is to make the best possible choice (jump or do nothing) at each point in time t, so that our total reward over all time steps is maximized.

For each possible state s and action a, we keep a table Q(s, a) with the expected reward for that particular s and a . We also have a known reward r for the current state for each of the two actions.

The update rule for Q(s,a) is Q(s,a) = r + γ\*max(Q(s′, a’)), where s′ is the next state, and a’ is the next action. The parameter γ is the discount factor, which quantifies how much we prefer getting rewards now, rather than later. We can think of the discount factor as a measure of how good our estimation is of the future total reward. If we believe that the future total reward we expect is correct, then we can use a high discount factor; on the other hand, if we are uncertain about what the future holds, it makes sense to have a lower discount factor.

For a simple environment we can just keep a lookup table with the Q(s,a) values, but when we want to solve complex games, like Flappy Bird, we have to use a neural network to estimate the Q(s,a) values.

![1.png](https://raw.githubusercontent.com/sksq96/sksq96.github.io/main/media/2022-06-23-misc-2016/1.png)

## Deep Q-learning

In Deep Q-learning, instead of updating the Q values, we update the weights of a neural network that estimates the Q values.

I used a convolutional neural network (CNN) with two convolutional layers, and two fully connected layers. The network takes four images as an input, and outputs the Q values for both actions (jump and do nothing). The loss function I used was the mean squared error (MSE).

![2.png](https://raw.githubusercontent.com/sksq96/sksq96.github.io/main/media/2022-06-23-misc-2016/2.png)