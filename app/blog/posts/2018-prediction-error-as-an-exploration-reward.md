---
title: "prediction error as an exploration reward"
publishedAt: "2018-12-08"
dateBasis: "source event date; reconstructed post"
summary: "prediction error as an exploration reward"
reviewDraft: "true"
---

So if you have an agent, who has never seen the world before - and you give him a corridor with two paths - what path would he choose? 

One of the fun and exciting things about RL is that we can tell an agent to just go and learn something, and we can design its reward function to encourage him to explore the world. One of the ways to do that, is making our agent curious. And the way to do that is to give it a curiosity bonus in the form of an intrinsic reward function.

So what does this function do? It takes in the agent’s previous state, the action it took, and its current state - and passes them through a forward dynamics model. The forward dynamics model essentially predicts what the agent’s next state will be given its current state and action. The model predicts a state, and the agent then sees the state it actually got to - and the difference between these two states is the forward prediction error. 

This forward prediction error is the intrinsic reward signal. So for example, if the agent has been in a particular state before, and has learned what will happen if it takes a particular action, then its forward dynamics model will output a state that is exactly similar to the state it actually ends up in, and the forward prediction error is 0. However, if the agent has never seen the state before, it will not know what will happen if it takes a particular action and the prediction error will be high. This prediction error thus acts as a reward signal that encourages the agent to explore unknown states and try to learn more about its world.

Different ways of learning this model have been proposed. Usually we train the forward dynamics model using Stochastic Gradient Descent to minimize an error function that tries to align the predicted state with the state that the agent actually ended up in. And the agent’s reward function is just the forward prediction error. But this naive approach is often not enough. For example, we can add a fixed, random TV screen in one of the states in the agent’s environment. The agent might then learn to stay near the TV screen because it will get high intrinsic reward. But in this scenario, the high intrinsic reward can be attributed to the fact that the agent is unable to accurately predict what will happen on the TV screen next, not to the fact that the agent has learned something new about its environment.

So how can we distinguish the difference between the agent learning something new, and the agent being surprised at seeing a new, unpredictable stimulus?

<!--more-->