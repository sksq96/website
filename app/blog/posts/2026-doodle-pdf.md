---
title: "doodle pdf"
publishedAt: "2026-11-12"
dateBasis: "source event date; reconstructed post"
summary: "doodle pdf"
reviewDraft: "true"
---

I wrote my first xkcd-style comic to explain a coding task to a friend. This is how I ended up turning it into a tool I could use to make more such comics.

Let me back up and explain how I got here.

I built an iPhone app recently, and it has gotten to the point where I want other people to use it. So I sent a build to a friend to let him try it out.

But before my friend could get started, he had a lot of questions. A lot. And the questions weren't just about the app, they were about all the other stuff that comes with it. How do we handle authentication? What app is this based on? Where is the code? How many people are using it?

That was a lot more than he could take in over text, so I wrote up a note and sent it to him.

The note was still a lot, so I wrote a comic to explain it.

I liked the comic, but I didn't like the process of making it. I used [excalidraw](https://excalidraw.com/) to draw the boxes and arrows, and it got really annoying when I wanted to rearrange elements on the screen, or resize them, or change the text. It also started to get tedious when I wanted to make a multi-page comic.

I thought I could write some code to take all that work away from me.

I originally thought that I would write an API that would let me draw behind the scenes, and then I would run it in a Jupyter notebook to see its output. But then I realized that would be reinventing the wheel - what I really wanted was a DSL.

I've never made a DSL before, but I knew the basics. It would be some kind of markup language that a parser would turn into a dict. The dict would then be used to draw the final output.

So I wrote a DSL that looked something like this:

```
people:
  me | hair | it worked on my laptop
  ci | hat | it did not

```

The drawing types are keywords followed by a colon. Then you provide a block of items, each indented. Each item has a set of fields, delimited by a pipe.

I wrote a parser to turn that DSL into a dict that looked something like this:

```
{
  "page_type": "normal",
  "title": "THE FIX",
  "subtitle": "",
  "items": [
    {
      "type": "checklist",
      "numbered": true,
      "items": [
        {
          "label": "regenerate the lockfile",
          "note": "one command, in the container CI uses"
        },
        {
          "label": "pin the python version",
          "note": "in the lockfile and in the CI config"
        }
      ]
    },
    {
      "type": "text",
      "text": "if the two machines disagree, make them say so out loud.",
      "style": "warn"
    }
  ]
}
```

The parser had some basic logic to turn the text into something the drawing logic could understand. For example, a paragraph starting with "!" would be styled red, and a paragraph starting with a keyword like "checklist:" would be rendered as a checklist.

Then I wrote the drawing logic. I'm not going to go into too much detail here, but it is based on Pillow, and the `_draw_comic` function in the file is where that happens.

The actual drawing logic was pretty straightforward, but the layout logic was a bit tricky. I had to know the size of the boxes and text that I was going to write, but I didn't want to actually draw it on the canvas yet because I didn't know where I wanted it.

One thing that really helped me here was to use the fact that I was drawing on a PNG image. I could just place my elements in a temporary PNG, and then read the size of the image. Then I would know how big to make the boxes in the actual image.

The other thing that helped was to write the DSL such that the structure of the comic was mostly vertical. That meant I could render the comic from top to bottom, adding some margins between elements.

I'm pretty happy with the code I ended up with, and I'm excited to add new kinds of drawings to the DSL.

Here's the link to the repo: [doodle-pdf](https://github.com/sksq96/doodle-pdf)