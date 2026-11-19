---
title: "synth main"
publishedAt: "2022"
summary: "synth main"
reviewDraft: "true"
---

It's 2022 and the world is abuzz with excitement (and fear) about a new technology that has the potential to completely revolutionize how we build software.

It's not blockchain, it's not Web3, it's not the metaverse, and it's certainly not NFTs. I am talking about AI code synthesis models. These are machine learning models that can interpret a natural language description of a desired function and produce code that does that function. For example, this is what OpenAI's Codex model produced as the "solution" for a simple programming problem.

It is tempting to believe that this is the future of programming and that humans can soon be replaced by AI models. But is this really true? I am actually quite doubtful. We have had machine learning models that generate natural language for a while now. You can go to sites like this and create poems or stories even if you are not a poet or a writer. But this has not meant the end for poets and writers.

I think the most likely impact of AI code synthesis models is that they will fundamentally change how humans write code. They will enable humans to focus on higher-order tasks like describing the desired functionality and not have to worry about writing lower-order implementations of that functionality.

This is a fascinating future to imagine and it's one that I have spent a lot of time studying. Over the past few months, I worked on an internal tool called Synth that GitHub Research team is launching today. Synth uses AI to automatically evaluate how well AI models synthesize code. We are trying to answer questions like: 
- How well do AI models perform on real-world code repositories? 
- How many synthetic implementations of complex functions pass real-world test suites? 
- How good are AI models at synthesizing code for functions without docstrings?

Synth is a tool that is aimed at answering these questions and more. It is capable of performing the following steps on a real-world GitHub repository:

1. Identify the functions that are called by the repository's test suite. 
2. Remove the bodies of these functions and use AI models to synthesize implementations for them. 
3. Check if the synthetic implementations pass the test suite.

This approach is quite different from the way we currently evaluate AI code synthesis models. The most popular evaluation benchmark for AI code synthesis models is the HumanEval benchmark, which is a collection of 164 programming problems. For each problem, the model is given a function signature and docstring and it has to generate the body of the function. The generated body is then executed on a suite of tests to verify its correctness. 
[Image]
This approach is perfectly fine for simple, self-contained functions like the ones in the HumanEval benchmark. But it does not work for functions that are part of a complex code repository. For most real-world functions, it is not possible to cleanly separate the function from the rest of the code repository. This means that the model has to generate a correct implementation for the function, and also for all the functions that it calls. I would argue that this is a much harder task than the HumanEval task.

Let's take an example to understand how our approach works. Let's take a look at the scrapy repository, which is a popular open source library for web scraping. This repository has a test called test_start_requests_from_url in the tests/test_spiders.py file.

When we run Synth on this repository, it detects that this test calls a function called start_requests in the scrapy/spiders/__init__.py file. After removing the body of this function and synthesizing a new one, we get the following three implementations that pass the test suite.
[Image]
The first implementation is the original implementation. The second and third implementations are the result of AI synthesis. If you look at the original implementation, it is not trivial to understand what it does. This implementation raises a NotImplementedError and refers to a different function called start_requests. The second and third implementations are also not trivial to understand. They use the yield keyword to return a generator of Request objects. The second implementation uses the requests module to make HTTP requests. The third implementation uses the scrapy.Request class to make requests.

As you can see, these implementations are not trivial to understand. They are also not trivial to synthesize. This is the kind of task that Synth is focused on. As far as I know, this is the first time that AI code synthesis models have been used to synthesize code for complex functions that are part of a real-world code repository. It is exciting to see how well these models perform on this task.

I am working on another blog post that will describe how you can use Synth to evaluate AI code synthesis models on your own code repositories. In the meantime, you can check out the Synth repository and the Synth paper to learn more. I will also be giving a talk about Synth at the MLOps.community meetup in August.