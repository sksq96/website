---
title: "cua scrapybara"
publishedAt: "2025-03-11"
dateBasis: "source event date; reconstructed post"
summary: "cua scrapybara"
reviewDraft: "true"
---

I've been working on a lot of UI automation and computer use agents lately and wanted to share my notes.  With the Operator launch and the Computer Use API I think this is going to get really popular for developers and it's amazing to see how easy it is to build with. 

We've seen GPTs get much better at using tools and this is just another tool for them to use.

I've been playing with the new CUA for a week and I'll be building some things with it but I wanted to share my notes and code as well as some examples I've done with Open AI's Computer Use API.

![Operator](https://files.catbox.moe/2a7c2b.png)

I want to share how I used the new CUA and a wrapper I made for myself to let the CUA use my computer to do what it wants.

In this blog I'll cover Open AI's CUA and how to use it, what I've seen the CUA do, and my open source repo for using the CUA with Docker, Playwright, BrowserBase, and Scrapybara.

The way I like to think about what the CUA is doing is just like us humans going through a game of chess, we move, we wait for the opponent to move, and we make our move.

The model takes in a screenshot, infers what is needed to achieve a goal and returns what actions should be taken to achieve the goal the user has given it.

I've been testing the OpenAI Computer Use API for a couple days and I'm really impressed.

It's not very different from the Operator in theory but the way it's been implemented is cool. 

The way I like to think about what the Computer Use API is doing is just like us humans going through a game of chess, we move, we wait for the opponent to move, and we make our move.

I'll explain how the CUA works with an example. I asked the model to go to Google and find the weather in San Francisco.

The model starts in a bing page.

![Shows Bing](https://files.catbox.moe/apv1rk.png)

The model is asked to go to google.com so the actions it returns are typing in google.com and clicking return.

![Going to google .com](https://files.catbox.moe/41x1rc.png)

The model knows the next thing to do is to type in what it wanted to search for and hit enter. So it returns those actions.

![Model Knows to type in weather San Francisco and hit enter](https://files.catbox.moe/st4gtm.png)

The model now looks at the weather and returns to the user the weather.

![Shows the weather in San Francisco](https://files.catbox.moe/z4a5hd.png)

It's now up to the developer to decide if they want to keep going with the agent. So if you wanted to build out agentic workflows you would throw this in a loop and just keep calling the model.

## How to use the CUA

I'll dive into what the model expects as input and what we can expect as output so that we can build around it.

First we have to understand how the model works.

The model takes in a screenshot, infers what is needed to achieve a goal and returns what actions should be taken to achieve the goal the user has given it.

We put this in a loop to keep going and going until we're done.

## Putting it together

The way I currently have it working is like so:

```python
    def handle_computer_actions(self, computer, tool_outputs):
        """Execute the actions specified by CUA."""
        for action, call_id in tool_outputs:
            # Execute the action
            match action.type:
                case "click":
                    computer.click(action.x, action.y, action.button)
                case "double_click":
                    computer.double_click(action.x, action.y)
                case "scroll":
                    computer.scroll(action.x, action.y, action.scroll_x, action.scroll_y)
                case "type":
                    computer.type(action.text)
                case "wait":
                    computer.wait()
                case "move":
                    computer.move(action.x, action.y)
                case "keypress":
                    computer.keypress(action.keys)
                case "drag":
                    computer.drag([(p.x, p.y) for p in action.path])
                case "screenshot":
                    pass
                case _:
                    raise ValueError(f"Unknown action: {action.type}")

            # Take a screenshot after the action
            screenshot_base_64 = computer.screenshot()
            # Show the screenshot
            if SHOW_IMAGES:
                show_image(screenshot_base_64)
            # Append the screenshot to the list of computer calls
            tool_output = {
                "type": "computer_call_output",
                "call_id": call_id,
                "output": {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{screenshot_base_64}",
                },
            }
            # Append the screenshot to the response input
            self.response_input.append(tool_output)
        return True
```

I have a `Computer` abstract class that I use to define the actions that the model can take.

```python
class Computer:
    """Abstract class for computers."""
    def screenshot(self):
        """Return a base64-encoded screenshot."""
        raise NotImplementedError

    def click(self, x, y, button="left"):
        """Click at x, y."""
        raise NotImplementedError

    def double_click(self, x, y):
        """Double click at x, y."""
        raise NotImplementedError

    def scroll(self, x, y, scroll_x, scroll_y):
        """Scroll"""
        raise NotImplementedError

    def type(self, text):
        """Type text."""
        raise NotImplementedError

    def wait(self, ms=1000):
        """Wait for ms."""
        raise NotImplementedError

    def move(self, x, y):
        """Move the mouse to the specified coordinates."""
        raise NotImplementedError

    def keypress(self, keys):
        """Press the specified keys."""
        raise NotImplementedError

    def drag(self, path):
        """Drag the mouse along the specified path."""
        raise NotImplementedError
```

## Playing around with the CUA

I've started writing a wrapper around the CUA so that I can use it to automate things on my computer.

I put the code here: https://github.com/sksq96/cua-scrapybara and the README is quite clear on how to run it.

I haven't done a lot with it yet but I'll be updating it.

Some notable features are:
- It works with local playwright
- It works with docker
- It works with browserbase
- It works with Scrapybara

Feel free to submit PRs and I'll update this README.

I hope this is helpful for you! I'm excited to see what you build with this.

![CUA in action](https://files.catbox.moe/l0gj5c.png)

Using the CUA feels like chess with a computer. I take a turn, it takes a turn, I take a turn, it takes a turn, and so on.

The model isn't calling any APIs directly, it's just using the computer like a human would. I'm really excited to see how this evolves and what we can build with it.

I spent a week playing with the Open AI's Computer Use API and I'm really impressed. I built out a simple wrapper around the API so that I could use it to automate things on my computer and I'll be building more things with it.

I'm excited to see what you build with it.