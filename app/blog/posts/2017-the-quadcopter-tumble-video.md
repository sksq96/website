---
title: "Teach a Quadcopter How to Fly"
publishedAt: "2017"
summary: "Teach a Quadcopter How to Fly"
reviewDraft: "true"
---

![quadcopter](/assets/images/projects/rl_quadcopter/quadcopter.png)

When I was a kid, I got this $10 remote controlled flying toy from a local store. It was in a capsule thing, like the type of toy car toy you get in capsules from a vending machine.  It was a rather simple one, I think it just flew vertically, but I still remember my amazement and joy the first time I saw it fly. It was the first time I saw a machine take to the air.

Fast forward a few years and I found myself teaching a quadcopter how to fly. Not just any quadcopter, but how to fly in a simulator.

This was one of the projects during my Udacity Deep RL Nanodegree. In this project, I designed three Deep Reinforcement Learning agents to control several quadcopter flying tasks, including take-off, hover and landing.

I used Deep Deterministic Policy Gradients to train the agents. For each task, I designed different reward functions to help the quadcopter learn to fly. The details about the environment, hyperparameter search, results and future improvements are described in my project repository.

Here's a video showing how the quadcopter learned to fly.

<video width="750" height="500" controls="controls">
    <source src="/assets/images/projects/rl_quadcopter/quadcopter_tumble.mp4" type="video/mp4">
</video>

---

![quadcopter_tumble](/assets/images/projects/rl_quadcopter/quadcopter_tumble.png)

A video like this can show a symptom but it cannot distinguish between a wrong action, a bad reward signal, or a controller that lost the aircraft. Which measurements would help narrow it down?

- altitude alone
- thrust commands alone
- attitude, angular rates, and position
- only the final crash frame

Without the telemetry around the roll, I’d be guessing. Which fields do you think would distinguish those failure modes?