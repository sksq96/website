---
title: "an outline for a fifteen minute ml podcast"
publishedAt: "2018"
summary: "an outline for a fifteen minute ml podcast"
reviewDraft: "true"
---

I started a podcast in 2018 called *ML in Under 15 Minutes*. The description in my WorkFlowy notes was:

> Do you already know the basics of modern reinforcement learning and want a whirlwind tour of the latest papers? Then this is the podcast for you.

The implied "so you're not the target audience if you aren't" was off-putting to some listeners, but I wanted to be clear that I was trading depth for breadth. I was, and still am, an amateur at ML, and I even more strongly believe in the importance of taking the time to understand foundational work and ideas. I decided to do the podcast because I felt the podcasts and vlogs I was consuming were too long and too basic, so I wanted to make something that was relatively short and relatively high-level.

Here's the outline I scribbled for the first episode on proximal policy optimization (PPO), which I still think is a great algorithm:

> Q: What is this paper about?
>
> A: It's about reinforcement learning and how to make it work better.
>
> Q: What did they do in this paper?
>
> A: They propose a new objective function for policy optimization.
>
> Q: What is an objective function?
>
> A: An objective function is a function that you want to maximize (as opposed to minimize) to solve a problem.
>
> Q: What is policy optimization? What is a policy?
>
> A: A policy is a function that takes a state and outputs an action. Policy optimization is making a policy better.
>
> Q: What does "making a policy better" mean?
>
> A: Making a policy better means making the policy take better actions.
>
> Q: So, what did they do in this paper again?
>
> A: They proposed a new objective function for making policies better.
>
> Q: What was the objective function before this paper?
>
> A: The objective function was the probability of each action from your policy multiplied by the advantage of each action from your policy.
>
> Q: What does advantage mean here?
>
> A: Advantage means how much better a certain action is than the average action.
>
> Q: What's the problem with the previous objective function?
>
> A: The problem is that it doesn't constrain how much your policy can change in one step. You can take a step that maximizes the objective function but that's terrible.
>
> Q: How do they fix that in this paper?
>
> A: They fix that by clipping their new objective function.
>
> Q: Does it work?
>
> A: Yes.

That's a pretty good overview of the paper. I wasn't able to get through it in fifteen minutes, so I ended up splitting the episode into two parts. The second part of the episode is about the *World Models* paper. It's a little more complicated, but here's the outline:

> Q: What is this paper about?
>
> A: This paper is about reinforcement learning.
>
> Q: What does it say?
>
> A: They train a neural network to play video games.
>
> Q: How?
>
> A: They train a variational autoencoder to generate latent vectors corresponding to frames of the game, they train a mixture density recurrent neural network to predict future latent vectors, and they train a controller to take actions based on the generated latent vectors.
>
> Q: How well does it work?
>
> A: It works pretty well on their selected games, but it doesn't scale well to other games.

And then I read small chunks of the paper and summarized them.

I have a script for the first ninety seconds of the first episode, but I don't know if I have a full record of all the audio I recorded for these episodes. I found this audio folder, but that doesn't appear to be all of it.