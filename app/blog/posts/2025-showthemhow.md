---
title: "showthemhow"
publishedAt: "2025-02-23"
dateBasis: "source event date; reconstructed post"
summary: "showthemhow"
reviewDraft: "true"
---

![me at a hackathon, 2025](/posts/hackathon-2025.jpg)

I've always been fascinated by the power of screen recording. Whenever I have doubts with a software or a workflow, I would record my screen and ask ChatGPT, which would respond with step-by-step instructions (worked amazingly with the o3 model). However, o3 required me to upload the screen recording manually, and I wanted to be able to do this on the fly. I also wanted to be able to ask multi-turn questions and provide further context. So I built ShowThemHow, which allows you to record your screen and get step-by-step instructions on how to get unstuck.

My experience with video processing was limited, but I had a good idea of what I wanted to build. I figured I could use the MediaStream API to record the screen, and then use the Gemini API to process the video and generate the instructions (I initially wanted to use OpenAI but it didn't support video processing at the time).

The custom prompt I used was:

```
You are an experienced software engineer who is faced with troubleshooting a problem, but you are stuck. Your task is to watch the screen recording and provide a high-level overview of what is happening, and then provide step-by-step instructions on how to get unstuck. Remember to be precise with the instructions.

The user has provided some context: ${context}.
The output should be in markdown format. Anything that requires special attention should be bolded. Make sure to structure the output clearly with markdown formatting.
```

The UI was simply a button to record the screen, a text area to provide context, and a button to submit the recording. I thought it would be cool to have the recording be a floating window that follows the cursor, so I used the screen-capture-stream-to-video API to create a video element that is positioned at the bottom right of the screen.

![Floating window](/posts/floating-window.png)

The recording would be created as a blob object, which I would then upload to a video processing API. I used the Gemini API through a proxy API I built, which would process the video and return the instructions.

The final result is a chat interface that would display the instructions. I also had a webcam feed that would be displayed in the chat interface, so the user could see themselves and the instructions at the same time.

It was pretty fun to build this, though I had a shitty demo video that I didn't want to upload. I would probably vibe code a much better version of this in the future, with a much more polished UI and a better demo video. The repo can be found [here](https://github.com/sksq96/showthemhow).