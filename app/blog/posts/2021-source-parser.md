---
title: "source-parser"
publishedAt: "2021-07-01"
dateBasis: "approximate placement; only year known"
summary: "source-parser"
reviewDraft: "true"
---

To extract methods and comments from code repositories. 

I wrote my first PR for this in January 2021, to scratch an itch. The itch was an obvious idea: writing a PR description is hard work, and we've got language models that are incredibly good at writing paragraphs of text—can we **automatically write PR descriptions**?

The idea is good, but the question is hard. The work of writing a PR description is the work of **summarizing code**. And that's hard, because it's like summarizing a book. Just as how a book can be summarized at many levels:

- the paragraph level
- the chapter level
- the book level

So, too, can code be summarized at different levels:

- the level of an individual **method**
- the level of a **file**
- the level of the entire **repository**

I knew that one way or another I'd need to be able to pull all this information out of a code repository, if I was going to be able to write a PR description. So... how do I do it?

## How do you parse a code file?

I'll be honest, I don't know a whole lot about parsers. You can't just split on whitespace and call it a day. If I wanted to get the description of a method in JavaScript, what should I do? I've spent a lot of time writing code, but I've never thought too much about how to parse it. I have no idea how I'm supposed to get the name of a method, or the comments that are associated with it, or anything like that.

As I searched for answers, I learned that there were 2 basic approaches to parsing code:

1. **Regex**: Write a thousand regexes to find every method in every language.
2. **Abstract Syntax Tree (AST)**: Use some tool to transform the code into an AST, and then use a structured set of heuristics to extract what you need.

I hadn't gone far in my computer science education, but I did know that the second approach is _probably_ more elegant than the first. 

So I went searching for a tool to transform code into an AST. After a little digging, I found [Tree Sitter](https://tree-sitter.github.io/tree-sitter/). It's got an API that lets you parse code into an AST for many programming languages! It's got a Python API, it seems like it's got some community around it, it's fast, it's easy to install. Just what I need!

So now I've got a tool that will transform code into an AST, but now I'm faced with another problem: What should I _do_ with that AST? I don't have any idea what to do with it.

To get some ideas, I went searching on github. Something that seemed promising was [CodeSearchNet](https://github.com/github/CodeSearchNet). Looking at their code, it seemed like they were doing just what I needed. They had a set of heuristics for extracting the name of a method, the comment description of the method, and other information I might want.

I dug in, and it turns out that the folks behind CodeSearchNet had already adopted Tree Sitter as their parsing library of choice. Bingo. Exactly what I need.

To recap: I've got a tool to transform code into an AST, and I've got a reference that shows how to extract the information I want from that AST using heuristics. Exactly what I need.

So I got started implementing the same solution for code repositories.

## What is an AST?

I knew enough to know that I _might_ want to use an AST, but what exactly _is_ an AST?

Let's answer that question with an example. Here's a simple Python function:

```python
def hello_world():
    print("Hello, World!")
```

The whole point of an AST is to give us a structured set of information about the code. What information should that structured set contain? Well, we'll need the method name, for one. We'll also want to know what the method is doing. In this case, it's printing a statement to the console. We'll want to know the list of parameters. If there are comments, we'll probably want to know about them as well. We'll want to know if the method has any dependencies on other methods. Etc.

To recap: We want an AST because it's a structured way of representing the information about a code file.

## Okay, I've got an AST. Now what?

Now that we've got an AST, what can we do? We've got a structured list of information, but how can we make use of it?

Let's look at an AST for the `hello_world` function above.

```python
>>> import tree_sitter
>>> from tree_sitter import Language, Parser
>>> python_language = Language('build/my-languages.so', 'python')
>>> parser = Parser()
>>> parser.set_language(python_language)
>>> tree = parser.parse(bytes("""def hello_world():\n    print("hello world")""", "utf8"))
>>> tree
<tree_sitter.Tree object at 0x7f5a4f9f8b40>
>>> tree.root_node
<Node type=module, start_point=(0, 0), end_point=(1, 23)>
>>> tree.root_node.children
[<Node type=function_definition, start_point=(0, 0), end_point=(1, 23)>]
```

The first thing we need to do is figure out what the **method definition** is. Something like this does the trick:

```python
def _method_node_types(self):
    return ['function_definition']
```

Now that we've got the method definition, we can extract information about the method from the AST. Let's start with the method name.

```python
def _method_name_node_types(self):
    return ['identifier']
```

Great, that's the name of the method. What about the comment?

```python
def _method_comment_node_types(self):
    return ['comment']
```

Now we've got the name of the method, and the description of the method. If the method has a docstring, we'll be able to get that as well.

## What did you do?

I took the heuristics that the CodeSearchNet folks had already built, and I started to experiment with applying these heuristics to full files and full code repositories. I was mostly interested in:

- Building the AST for each file in a repository, and caching it, so that we could reuse it and not have to do it again.
- Extending the heuristics to pull out file descriptions and repository descriptions.
- Extending the heuristics to pull out class definitions and descriptions.
- Extending the heuristics to pull out unit test definitions and descriptions.
- Turning the tool into a CLI, so that it could be easily installed and used.
- Making the tool multi-threaded, so that it could be used to parse many repositories at a time.
- Extending the tool to support more programming languages. Starting with Python, Java, and Go.

## What did you learn?

The first thing I learned was that I was right to be intimidated by the problem. It's a hard problem. The heuristics are hard to build. It's hard to know if the heuristics are right. It's hard to parse code repositories at scale. It's hard to parallelize the code. It's hard to build a tool that's easy to use. It's hard to build a tool that's easy to extend. It's hard to build a tool that's easy to maintain. It's hard to build a tool that's easy to understand.

I also learned that the heuristics were highly dependent on the programming language. I started with Python, because that's the language I'm most comfortable with. But the heuristics I built for Python didn't work for Java, or Go, or any other languages. The heuristics were highly dependent on the structure of the language.

Another thing I learned was that it's possible to do this, and it's possible to do it at scale. I was able to parse millions of files in a few hours, and store the information in a structured format. I was able to parse millions of repositories in a few days, and store the information in a structured format.

## Where can I find the code?

The code is on GitHub: [github/sksq96/source-parser](https://github.com/sksq96/source-parser)

## What's next?

I'll experiment with using language models to try and synthesize PR descriptions from code.