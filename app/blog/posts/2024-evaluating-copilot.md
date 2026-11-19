---
title: "When Coding Assistants Meet Code Execution"
publishedAt: "2024"
summary: "When Coding Assistants Meet Code Execution"
reviewDraft: "true"
---

*September 2023*

In this post, I will demonstrate a practical failure mode that occurs when using GitHub Copilot.

GitHub Copilot is a programming assistant powered by LLMs. When you start typing in the editor (e.g., VSCode), it can autocomplete your code, write docstrings, and even write the entire function. It can also provide suggestions for a given issue or error message. See here for a fun introduction to GitHub Copilot.

GitHub Copilot is evaluated on the HumanEval benchmark, which contains 164 hand-crafted programming problems. Each problem includes a function signature, a docstring, the function body, and a unit test. The model uses the function signature and docstring to complete the code, and the completion is considered correct if it passes the test.

Intuitively, it makes sense to use a benchmark that includes code execution to evaluate a code-generation model. However, in practice, the model does not have access to the Python interpreter while generating the code. Therefore, it is unclear how much the model benefits from code execution.

To test this, I prompted GitHub Copilot using the function signature and docstring from the HumanEval benchmark and recorded whether the suggested code passed the test. Then, I compared the success rate with the reported performance of OpenAI Codex, a Python code-generation model. Codex uses the same prompt and also does not have access to the Python interpreter. The models have a similar success rate (36.5% for Copilot and 37.6% for Codex), which strongly indicates that Copilot does not benefit from code execution.

## Case Study

Now, I will walk through a concrete example. I selected this example from my personal experience as it is highly relevant to my own workflow. Given a dataset, I want to write a function that returns the name of a specific column. To ensure that a coding assistant successfully completes the task, I need to write a test for the function before prompting the model.

To test the function, I create a dataset with a single column called “target” and assert that the function returns the correct column name.

Next, I prompt GitHub Copilot using the function signature and docstring. GitHub Copilot suggests the following code:

Since `df['target']` returns a pandas Series, `df['target'].name` will return the string “target” and the function will pass the test.

To address the problem stated at the beginning of this post, I want to write a function that returns the name of a specific column in a given dataset. However, GitHub Copilot writes code that does the following: given a dataset, it creates a new dataset with a single column called “target” and returns the name of that column.

To understand how this happened, we need to take a step back and look at how GitHub Copilot works. GitHub Copilot is a large language model that is trained on a large corpus of code. It is trained to predict the next token given the previous tokens. It uses the context around your cursor—the code in the current file and the neighboring tabs—to make predictions.

In this particular example, GitHub Copilot was primed by the line `target = "target"` in the test, and it used that information to write the code.

To fix this, I add the following line to the docstring:

Now, GitHub Copilot suggests the following code:

GitHub Copilot still fails to complete the task, but it no longer writes code that passes the test.

## Lesson

A coding assistant is not a replacement for writing tests. As with any programming tool, it is important to understand how it works and how it can fail. In particular, if your workflow involves running a lot of code, you should not expect a boost in performance from a coding assistant.