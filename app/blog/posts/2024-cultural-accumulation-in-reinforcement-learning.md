---
title: "cultural accumulation in reinforcement learning"
publishedAt: "2024-06-15"
dateBasis: "approximate day; source month"
summary: "cultural accumulation in reinforcement learning"
reviewDraft: "true"
---

*This is Part 2 of a series. For Part 1, see [here](/2023/11/14/cultural-accumulation/).*

### RLHF

The first paper that sparked my interest in cultural accumulation was [this one](/assets/pdf/lu-et-al-2023-insight-augmented-social-learning.pdf). I saved a copy on June 6th, 2023, though I’m not sure if I read it then. I didn’t get around to reading it until November, when I started learning more about cultural accumulation.

It’s a cool paper. The authors try to model cultural accumulation in a reinforcement learning setting.

They take a base model and feed in a fixed number of human demonstrations, which you can think of as a kind of culture being transferred to the agent. They then compare the performance of this base model to another model which has had the chance to train against the base model. If the latter model performs better, it means that the agent has been able to accumulate culture.

The authors find that, yes, agents are able to accumulate culture. They compare the performance of a human-trained model to an agent-trained model on a set of tasks. The agent-trained model outperforms the human-trained model on 6 out of 8 tasks.

They also find evidence of a ratchet effect in the agents. If an agent is trained to perform a certain task, they are able to accumulate culture and perform better on that task. However, if they are trained to perform a different task, they are not able to accumulate culture and perform as well as the base model.

One concern I have with this paper is how they model cultural transfer. They use a fixed number of demonstrations, which is not how culture is transferred in the real world. In the real world, culture is transferred through a process of social learning, where agents learn from each other in a dynamic and ongoing process. There’s no fixed number of demonstrations.

I’m curious to see how this model would perform if they used a more realistic model of cultural transfer. Maybe they could use a model like [this one](/assets/pdf/foster-et-al-2006-cultural-evolution-and-ecological-transitions-in-early-human-settlement-of-the-eastern-sahara.pdf), which models cultural transfer as a process of social learning.

Despite this concern, I think this paper is a great first step in modeling cultural accumulation in a reinforcement learning setting. I’m excited to see where this research goes.