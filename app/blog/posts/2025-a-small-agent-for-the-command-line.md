---
title: "building a terminal agent"
publishedAt: "2025"
summary: "building a terminal agent"
reviewDraft: "true"
---

One of my first agents was one that could use my terminal. A lot of the inspiration came from SWE-agents. I was curious about how agents could perform tool use and what structure would be needed to build one. The idea was that I could use it to issue terminal commands and create files. 

I made it early 2025 when MCP (Model Context Protocol) was just coming out and I was curious about what it could do.

I was experimenting with various agentic patterns to see what worked. For the interface, I built a very simple web interface to show the agent’s activity.

This was one of my first experiences trying to build an agent, and it taught me a lot. It taught me about the importance of setting up the system prompt correctly, of how to define tools, and how to interpret the agent’s output.

![image](https://github.com/user-attachments/assets/f0b0b26b-4141-4276-a6d4-bb09d0b6cbe)

### System Prompt

One of the biggest lessons I learned was the importance of having a system prompt that is clear, unambiguous and explicit. It’s very important to tell the LLM what it can and cannot do, what tools it has access to, and how to interpret the output of the tools.

For example, in the first commit `sss` I did not bother putting a system prompt and the LLM would hallucinate and make up tools that did not exist.

I had to iterate a lot on the system prompt to get it to work properly.

### Tool Creation

Another important part of building agents is tool creation. The purpose of tool creation is to allow the agent to interact with the world. In my case it has a single terminal tool, but I experimented with other tools like a web search tool and an Aider tool.

You define tools in a separate file, and then you import that file into the agent. The tools are defined as functions that the agent can call. The agent can call the tools by issuing a `TOOL:` command followed by the tool name and the arguments.

For example, here is a simple tool in the MCP that will return the square of a number.

```python
@mcp.tool()
def calculate_square(number: float) -> float:
    """
    Calculate the square of a given number.
    
    Args:
        number: The number to calculate the square for
        
    Returns:
        The square of the number
    """
    return number * number 

```

### Interface

I wanted a simple interface to show the agent’s activity. I used Next.js to build a simple interface to show the agent’s activity. It’s very rudimentary, but it shows the agent’s activity. It’s very hacky.

### Installation

You can install the agent as a CLI utility. It’s not very useful, but it’s a start. 

```bash
cd ~/my-project
agent "Run ls -la"

agent --server /path/to/custom/server.py "List files in this directory"

agent --logs-dir ~/my-logs "Run ls -la"
```

![image](https://github.com/user-attachments/assets/99fbbbe0-5f35-4c5c-a4c7-c9bea1d7c73e)

### Evals

This was one of the first times I tried to build an eval framework. It was very hacky, but it worked. I’m not sure how useful it is, but I’m glad I tried it.

```bash
agent/evals/test_cases.py
agent/evals/run_evals.py
```

### Conclusion

This was a fun project. I learned a lot about agents and how to build them. I’m not sure if I’ll use this agent for anything, but I’m glad I built it. It was a good learning experience.

I would encourage others to build their own agents and see what they can do. It’s a lot of fun.