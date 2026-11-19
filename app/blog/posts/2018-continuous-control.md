---
title: "continuous control"
publishedAt: "2018-08-07"
dateBasis: "source event date; reconstructed post"
summary: "continuous control"
reviewDraft: "true"
---

In this post I'll be sharing my work on the second project of Udacity's Deep Reinforcement Learning Nanodegree program. The project is called Continuous Control. 

## Environment

For this project, we will use a Unity environment provided by the Udacity team. This environment consists of a double-jointed arm which can move to target locations. The agent receives a reward of +0.1 for each step that the arm's hand is in the target location, thus the goal of the agent is to maintain its position at the target location for as long as possible.

We are given two versions of the environment: a single-agent version, and a multi-agent version which contains 20 identical environments. The agent must receive an average score of +30 after 100 episodes to be considered "solved". We will use the multi-agent version and solve the environment when the 20 agents receive an average reward of +30 after 100 episodes. 

## Deep Reinforcement Learning Algorithm

The main challenge of this problem is the fact that the action space is continuous, instead of discrete. In the first project, we could use a neural network whose last layer was a softmax, which ensured that all action probability outputs added up to 1. We cannot use this same trick here, since we can't know the exact action to take. We will be using a variation of the Deep Q-Network called a Deep Deterministic Policy Gradient (DDPG). This algorithm is similar to the DPG algorithm used in Lillicrap et al. (2016), but the Q-function and mu (policy) are represented by neural networks. 

The main difference between this algorithm and a vanilla DQN algorithm is that we will train two networks: an Actor and a Critic. The Critic network is used to approximate the optimal action-value function. The Actor network is used to approximate the policy. If you're interested in a more detailed explanation, I have a blog post on my website that explains the algorithm in detail: **[Deep Deterministic Policy Gradient](https://www.sriramshankar.me/2018/08/ddpg/)**.

I implemented the algorithm using PyTorch, and the following are the hyperparameters I used for training the agent:

| Parameter Name | Value |
|----------------|-------|
| UPDATE_EVERY   | 20    |
| NUM_UPDATES    | 10    |
| BUFFER_SIZE    | 100000|
| BATCH_SIZE     | 128   |
| GAMMA          | 0.99  |
| TAU            | 1e-3  |
| LR_ACTOR       | 1e-4  |
| LR_CRITIC      | 1e-3  |
| WEIGHT_DECAY   | 0     |

I used batch normalization in the hidden layers of both the actor and critic. I also used a ReLU activation after each hidden layer. I had 3 hidden layers for both the Actor and Critic networks, and I used 400, 300 and 200 units respectively for both. The Actor's output layer uses a tanh activation. 

I also used OU noise, and experimented with the parameters for the distributions. The noise allowed for appropriate exploration while the agent was training. 

## Plot of Rewards

The results are shown below:

![](./rewards.png)

The environment was solved in 195 episodes, when the average reward over 100 episodes was above 30. 

## Ideas for Future Work

I would like to see how the Proximal Policy Optimization algorithm would work on this environment. I would also like to experiment with different neural network architectures, and layer hyperparameters. 

## References

- [Unity ML-Agents Github](https://github.com/Unity-Technologies/ml-agents)
- [Deep Deterministic Policy Gradient, Lillicrap et al. 2016](https://arxiv.org/abs/1509.02971)