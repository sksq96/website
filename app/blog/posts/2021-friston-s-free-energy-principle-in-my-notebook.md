---
title: "Just sharing my notes on Friston’s free energy principle"
publishedAt: "2021"
summary: "Just sharing my notes on Friston’s free energy principle"
reviewDraft: "true"
---

*I am not a ML or neuroscience expert, so can’t comment on whether this interview is good, but thought I would share my notes on it anyways*

So, what is the free energy principle? According to this interview with Karl Friston ([link to youtube interview](https://www.youtube.com/watch?v=Q5hWZtW2czA&t=2022s)), it is the idea that you can explain a lot of what organisms do, from visual perception, to actions, to what organisms actually are, using the principle of minimizing free energy, which is a sort of proxy for surprise, or how well a model can explain the data.

What do you mean by proxy? So, if you want to minimize surprise, one way to do this is to directly find the type of surprise, or error in the model, and then minimize that. But this requires you to know the actual model. In practice, you don’t know the model but have a guess at it, and you use that to generate a proxy for the surprise, which you can then minimize. This proxy is called the free energy.

So in practice you don’t have the actual model, you have some estimate of the model, and you want to update that model in order to minimize the surprise (i.e. by having better predictions). But you don’t know the surprise, so you are trying to minimize the free energy instead, which is a sort of proxy for the surprise (it’s the surprise for your estimated model). And the higher the free energy, the more surprising the data is for your current guess at the model.

This feels like a weird idea. Why would this work? One intuition I have is that if you are surprised by the data, that means you didn’t have a good model that could predict the data. So you would say the model that generated the data is complex, and you have no good way of explaining it. You need to come up with a more complex model to capture the data. So this is a different way of measuring surprise. Surprise = how complex is the model that explains the data?

In this way, Friston defines free energy as the sum of 3 things, complexity, accuracy, and a constant. Complexity here is the complexity of the model (how many parameters it has), which is some decreasing function, and accuracy is how well your model does on the data, some increasing function. And the constant seems to be some constant that defines the minimum free energy?

As an example, say you are listening to a friend talk, but you are in an area with lots of noise so it’s hard to hear them. If they say the phrase “what a nice smile you have!”, then you might have a hard time understanding it. But if you are familiar with how they talk, which is basically having a model of it, then you can sort of fill in the gaps. This can also depend on priors. If you are unsure whether they said “nice smile” or “nice style”, but you know they are quite fashionable, you might fill in the gaps with “nice style” instead.

This theory of how perception can be explained as minimizing free energy is called predictive processing.

The idea of minimizing free energy can also be used to explain why we take certain actions. For example, when you go to the fridge to get something to eat, you are sort of predicting that you will be hungry if you don’t eat, and so you need to minimize your hunger by getting something to eat.

But what about more complicated behaviours? Such as choosing to work in a particular career? Well, you can view this as a sort of nested set of predictions. You predict that in the future, you will be more happy if you pursue this career than if you didn’t, so you choose to pursue it. And you can keep going back in time and explaining behaviour through a series of predictions of what is best for you in the future.

This part is something I’m a bit iffy on. I think you can explain behaviour by a series of predictions, but I’m not sure if it’s a satisfactory explanation, or if there are any predictions I can make using this idea. I feel like if you want to explain behaviour, you at least have to try to identify what are the set of parameters you are using to predict, as well as the generative model of how you get from those parameters to actions, and then see if you can use those to predict future actions. Also, I’m not sure why you should want to minimize free energy if it is a proxy for surprise. If you simply want to predict, you should be trying to minimize the “surprise”, or error of your model. If your model is poor, then you get a higher free energy, which doesn’t get you any closer to a better model.

The way Friston explains it is that you can see everything an organism does as trying to minimize its free energy, and so in the limit, you can see organisms as “the things that are on the periphery of this sort of self-organized non-equilibrium system”. As in, you can see organisms as the parts of matter that is trying to minimize its free energy, which is interesting but I’m not sure how useful this view of life is.

Starting with just the idea of minimizing free energy, Friston then goes on to explain how this can lead to neurons. This is a bit hard to follow, but basically he is saying that if you want to minimize your free energy, and to predict sensory data, then you end up with a sort of generative model of the world, which you can encode as parameters. And in order to optimize those parameters, you need to compute the gradient, which then causes the propagation of some error signal to propagate back throughout the model, which sort of mirrors the way neurons transmit signals.

But this feels a bit weird to me. Just because you can reason that you want some network to minimize a certain function, doesn’t mean the neurons in your brain somehow magically know how to optimize that function. How do they know what gradient to compute? How do they know what to optimize? I think what he is saying is that the neurons are not actually optimizing a function, rather, they are just doing what is necessary to make their own local free energy, or error, as small as possible. And then the hope is that if that is done, then the total error is as small as possible. This is sort of similar to how in backprop, your network is not actually taking steps to minimize some function, it is just locally updating weights according to some gradient.

Some other notes I made:

If you have a measure for complexity, that actually gives you a measure of the volume or surface of the space, which allows you to then estimate the density of particles in that space, which is sort of how you can get a measure of entropy. And a lot of the math that goes behind the free energy principle is similar to the math behind things like Boltzmann’s equation.

There are 3 types of search:
1. random search, just randomly try things. This is better for low dimensional spaces.
2. global search, try many different things
3. local search, try to move around the space and try things near where you are at

Global search can be thought of as exploring, and local search as exploiting. And in practice, you want to do a lot of global search at the beginning, and then more local search at the end. This is related to the softmax function, which introduces a temperature parameter, which controls how much exploration you want to do. You start with a high temperature, and slowly decrease it.

There’s some discussion on how free energy makes use of information geometry, which is a different way of visualizing information through a curved manifold. In this way, you can think of free energy as some sort of curvature of the manifold, and in order to minimize free energy, you have to move the manifold to some flat plane.

there is discussion on how the free energy principle relates to bayesian inference, but it’s not very clear or insightful.

there’s a lot of discussion on Boltzmann’s equation, and how it can be used to derive the free energy principle. I’m not sure if this is true, but there are some interesting things to note. For example, Friston has an idea of how to interpret the temperature in Boltzmann’s equation in terms of noise. You can also see the temperature as related to how much exploration versus exploitation you want to do in the model. As well, you can see the temperature as a sort of learning rate. Higher temperatures allow you to change your parameters quicker, but it also gives you a higher free energy. So you want to decrease the temperature as you train your model.

Some thoughts I have:

The idea of minimizing free energy is quite interesting, and I can see how it can be used to explain a lot of the things that organisms do. It seems a lot of times, you can explain many things by saying that something is trying to minimize some function, but in practice this is not very useful. In practice, you are not directly trying to minimize some function, but rather you are trying to find a good solution to some problem, and as a consequence, it minimizes some function. I feel like free energy as a proxy for surprise has the same problem. It is nice for explaining, but not very useful for actually doing something. I think a better thing to do would be to come up with a model of some organism, and then see if you can optimize that model to do something interesting. And then you can use the free energy principle as some guideline for analysis.

A lot of the discussion on neurons and how free energy can explain a lot of things about neuroscience seemed a bit contrived. The main problem is that Friston defines free energy as this thing that organisms want to minimize, but without any real reason. It seems like he is sort of just justifying why organisms want to minimize free energy by saying that this is what they are doing. But this feels a bit circular. The free energy principle says that organisms want to minimize free energy, and then he uses that to explain how organisms work. But how do you know that organisms want to minimize free energy? Well, because it explains how organisms work. What if there is some other thing that explains how organisms work better? Then maybe that is what organisms are minimizing.

I don’t think this is a fair critique though, because Friston is not claiming that free energy is the only thing that organisms are minimizing. He is saying that it is one thing that organisms are minimizing, and that this might be able to explain a lot of things about organisms. And it is an interesting idea.

I think overall, I can sort of see how the free energy principle is a good way of thinking about things. It’s a very high level idea, that has a lot of implications, and it can be used to explain a lot of things. But as with many high level theories, it is not very useful in practice. But I’m interested to see where this goes. Maybe there is some way to use the free energy principle to come up with some interesting models of organisms.