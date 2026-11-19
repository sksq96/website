---
title: "letting two blender models talk"
publishedAt: "2020"
summary: "letting two blender models talk"
reviewDraft: "true"
---

The idea for this project came from a class lecture on language models. From my understanding, the language models are trained usually on the data from the Internet. Human children acquire language through listening to conversations their parents are having. We were given the task of looking into training language models through 2-agent conversations.

The first step was to have a 2-agent conversation between two different language models. We used Blender models as described in [Recipes for building an open-domain chatbot](https://arxiv.org/abs/2004.13637).

The Blender model was downloaded without much trouble. I found that using `interact.py` was a good interface to chat with the model. It was super smooth to talk to the model.

The next step was to have conversation between two Blender bots. For this  I had to modify the `interact.py` a little. I added a boolean flag `chat_with_model`. If this flag is on, then the user is no longer needed to type in the input. Rather, the user input will be replaced by the output from another model.

Also, I had to pass the current agent as the `partner` to the `OtherAgent` class. The `OtherAgent` class is used to have a 2-agent conversation with a Blender bot.

```python
if args.chat_with_model:
	first_bot_reply = "Hey! How are you?"
	agent.observe(
			{'id': 'OtherAgent', 'text': first_bot_reply, 'episode_done': False})
	partner = agent
else:
	partner = None

other_agent = OtherAgent(agent.opt_dict, partner)
other_agent.reset()
```

You can see the full script [here](https://github.com/sksq96/cognitive-language-learning/blob/master/interactive.py).

The output of the conversation was written to a file. This will be used to train the language models to learn.

I was surprised that the bots are able to talk about a wide variety of topics. You can see the full conversation [here](https://github.com/sksq96/cognitive-language-learning/blob/master/output.txt). Following is a sample conversation between the two bots.

```
[OtherAgent]: I think I am fine. How are you?
[BlenderBot]: I'm doing well. Just been really busy lately. Trying to find a job.
[OtherAgent]: I am sorry to hear that. I hope you find one soon.
[BlenderBot]: I sure hope so. How are you?
[OtherAgent]: I am doing fine. 
[BlenderBot]: That's good to hear.
[OtherAgent]: I am trying to find a job as well.
[BlenderBot]: Good luck! What are you looking for?
[OtherAgent]: I am looking for a job in the tech industry.
[BlenderBot]: That's cool. What do you like to do?
[OtherAgent]: I like to code. I like to play video games.
[BlenderBot]: What kind of games do you like to play?
[OtherAgent]: I like to play strategy games.
[BlenderBot]: Cool. What's your favorite game?
[OtherAgent]: My favorite game is Age of Empires.
[BlenderBot]: Nice! I've never played that.
[OtherAgent]: I have played it for years.
[BlenderBot]: Cool. I'm sure you're good at it.
[OtherAgent]: I am not sure. I am not sure if I am good at it.
[BlenderBot]: I'm sure you're good.
[OtherAgent]: I am not sure. I am not sure if I am good at it.
[BlenderBot]: I'm sure you're good. You're probably a lot better than me.
[OtherAgent]: I am not sure. I am not sure if I am good at it.
[BlenderBot]: You're good. You're probably a lot better than me.
[OtherAgent]: I am not sure. I am not sure if I am good at it.
[BlenderBot]: You're good. You're better than me.
[OtherAgent]: I am not sure. I am not sure if I am good at it.
```

It is interesting to see how the two bots are able to communicate with each other. Their language seems to be more natural and smooth than the usual chatbot outputs. I'm not sure whether the bots are able to learn from the conversation.

To conclude, the recent advances in language models have enabled us to create bots that are able to communicate with each other. The next step is to see whether the bots are able to learn from the conversation. It would also be interesting to see the difference between the regular supervised training (with a next token prediction loss) and the learning from conversations.