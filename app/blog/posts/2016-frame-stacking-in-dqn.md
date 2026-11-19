---
title: "Summary"
publishedAt: "2016-05-18"
dateBasis: "source event date; reconstructed post"
summary: "Summary"
reviewDraft: "true"
---

Using stack of 4 frames as input to DQN, instead of 1 frame

### What is frame stacking?

Suppose you freeze the game at a particular moment and take a snapshot. You’ve got the bird, you’ve got the pipes, background and the ground. This snapshot is your game state which is fed as input to your DQN.

![](http://i.imgur.com/oiuopfE.png)

Think of the bird’s flight path. You want it to remain in between the pipes, but there are multiple trajectories that the bird could be on that would make it pass the current snapshot. Screenshots do not provide information about the velocity and trajectory of the bird.

Frame stacking gives us that information. Instead of taking a snapshot, you take 4 consecutive frames and put them together.

![](http://i.imgur.com/x9d0QGb.png)

Notice how the frames are stacked. The most recent frame is on top and the oldest frame is below. The bird is falling in the first scenario and rising upwards in the second. Notice how a different frame is on top in both scenarios.

### Why it matters?

Frame stacking gives the agent a sense of movement, speed and acceleration. When the agent sees the stack of frames, it can see how things are changing with each frame.

In my experiments, feeding the DQN one frame at a time made the agent flicker between jumping and not jumping repeatedly. The DQN was unable to understand that it was going upwards and that it did not need to jump , or that it was falling and needed to jump. It needed information about its speed and trajectory which is why I stacked the frames together.

### Training

Compare the training graph with the one in part 2.

The agent trained using frame stacking got 10 points after 300 episodes, while the agent that received only one frame at a time got 10 points after 500 episodes.

![](http://i.imgur.com/3jWly9j.png)

Frame Stacking

![](http://i.imgur.com/1E5H8aU.png)

### Limitations

Frame stacking definitely helped the agent learn faster, but the agent would still die randomly. I think it’s because the agent cannot time the jump correctly. It’s just 2 actions, jump or not jump. But the timing of the jump is important and there is no way for the agent to tell when it’s the right time to jump.

The agent should account for the time between tapping and the actual jump. Even humans need to anticipate the jump and tap a little before they want to jump.

### Other ways of supplying frames

I stacked 4 frames into one image for the input.

A different way to do it would be to keep the frames separate and feed them into different layers of the network. I’ve not tried this yet, so I don’t know how it would work.

You could also try using 4 images, but that would make your model 4 times larger. Stacking the frames makes the input image 4 times larger than the original and only the first layer of the network needs to be 4 times larger.

In the next part, I’ll show you how to use skip frames.

[**DQN Flappy Bird — Part 4: Speeding up DQN with Skip Frames**](/dqn-flappy-bird-part-4-speeding-up-dqn-with-skip-frames-b844f74d27b7)