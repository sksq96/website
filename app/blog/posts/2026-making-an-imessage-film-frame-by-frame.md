---
title: "making an imessage film frame by frame"
publishedAt: "2026"
summary: "making an imessage film frame by frame"
reviewDraft: "true"
---

This year I started making short videos for Hue, the AI personal assistant I work on. I think of them as Hue films. The first one was called Hue Rivals (see if you can figure out what movie it's a reference to):

![The first Hue film, with a single frame from it](/content/images/hue-films/hue-rivals.gif)

Hue Rivals

The film shows "you" in a group chat with two AI assistants. They both want to help you, but they have very different approaches and personalities. (You can read more about the Hue here). To make this film, I needed to decide what was important. I had a few options for how to show the film:

1.  Show a phone's screen with a texting app open
    
2.  Show a phone's screen with a chat app open
    
3.  Show a phone's screen with the ChatGPT app open
    
4.  Show a phone's screen with the iMessage app
    
5.  Show a phone's screen *and the phone itself* with the iMessage app
    

I ended up picking #5 because I wanted to give a taste of what the Hue would be like in real life. That meant I had to render a phone screen, a phone body, and an animatable iMessage interface. At the time, I was just making the first version of this film so I couldn't amortize the cost of making all of that code. But over time I've made more and more films and got better at doing it.

To make a Hue Film, you need:

1.  An animatable iMessage interface
    
2.  A phone body
    
3.  A camera
    
4.  A story
    
5.  A score and sound effects
    

## An animatable iMessage interface

A film meant to show people using the Hue should feel realistic. iMessage is the most popular messaging app in the US, so I wanted to make the films look and feel like iOS 26 as much as possible. It turns out that you can't use html+css+js to make something that looks exactly like iMessage. The closest you can get is using Apple's built-in Liquid Glass library, or making your own Liquid Glass library. I chose a middle ground and used a lot of translucent, blurred elements that mimic the glass look.

![Various parts of iMessage](/content/images/hue-films/imessage.png)

I used a monospace grid to lay out the elements of the app in a way that looked good.

![A monospace grid overlaid on iMessage](/content/images/hue-films/grid.png)

The iMessage interface also needs to animate. There are a few different animations required:

1.  Text appearing in individual messages
    
2.  Messages appearing in the chat
    
3.  The message composer appearing and disappearing
    
4.  The camera moving to focus on different parts of the message
    

There's something magical about watching a message pop in on a phone, especially in the Hue films. This makes perfect sense to me because I've been texting for about 20 years now. I don't need a notification that says "shubham sent you a message" to know I have a message. The little pop-in animation is enough to clue me into that.

As the person making the films, I had to figure out the animation curve. I was debating between having the message just "fade in" or add a little "bounce" animation. I ended up choosing a little bounce animation. 

![A message popping in with a bounce](/content/images/hue-films/pop-in.gif)

Messages pop in from the bottom of the screen with a springy bounce

The message bubbles themselves are rendered in the chat with a simple fade and slide, which is what iMessage does. 

![A message sliding up into view](/content/images/hue-films/slide.gif)

Messages slide up into view

I also had to figure out how the text itself appeared. Should it all just appear at once? Should it appear character by character? If so, how fast?

I ended up choosing to have the text appear character by character. My first attempt at this looked a bit like a typewriter. I used the same delay between every character and it felt artificial. But then I remembered that when people type, they don't type at a constant rate. They type in bursts, and they make mistakes and correct them. But I didn't want to go all the way to showing mistakes; I thought that would be too much. So I ended up going with a different delay for each character. The delays are randomly generated to mimic the way people type.

![Text appearing in a message bubble with a random delay between characters](/content/images/hue-films/text-typing.gif)

Text in a message bubble appears with a random delay between characters

The other animations are fairly standard. The message composer animates in and out with a fade and slide, and the camera animates to focus on different parts of the message.

Making the iMessage interface takes a lot of time if you decide to go the character-animation route. The first time you do it, you feel like you're hammering square pegs into round holes. But afterwards you have a powerful engine that lets you animate the interface. This is a huge advantage because it means you can make the films feel more realistic and engaging.

## A phone body

The iMessage interface is all you need to make a film that consists of a single screen. But I wanted to make films that could show phones moving around, and that could show multiple phones. So I needed to make a phone body that could be animated.

![A phone body with a screen and a background](/content/images/hue-films/phone-body.png)

I used my iPhone 16 Pro to get the shapes right. There's a lot of attention to detail in the phone body. I made sure to get the exact colors right, the exact widths of the borders, and the exact shapes of the buttons. I also made sure to get the exact shapes of the camera and the flash.

The camera is animated to focus on different parts of the message. I used the same animation curve as the message composer to make the camera feel like it's part of the interface.

![A phone body with a camera that animates to focus on different parts of the message](/content/images/hue-films/phone-camera.gif)

The camera pans and zooms to focus on different parts of the message

The phone body is a lot of work if you want it to look realistic. But it's worth it because it makes the films feel more realistic and engaging.

## A camera

The camera is the most important part of the film. It's what makes the film feel like it's happening in real life. I used the same animation curve as the message composer to make the camera feel like it's part of the interface.

![A camera that animates to focus on different parts of the message](/content/images/hue-films/camera.gif)

The camera pans and zooms to focus on different parts of the message

The camera is a lot of work if you want it to look realistic. But it's worth it because it makes the films feel more realistic and engaging.

## A story

The story is what makes the film interesting. I wanted to make films that would make people think about the way they use technology in their lives. So I started with a simple story: a person is trying to decide between two AI assistants. The person is trying to decide which one to use. The person is trying to decide which one is better.

![A story about a person trying to decide between two AI assistants](/content/images/hue-films/story.png)

The story is a lot of work if you want it to be interesting. But it's worth it because it makes the films feel more interesting and engaging.

## A score and sound effects

The score and sound effects are what make the film feel like it's happening in real life. I used the same animation curve as the message composer to make the score and sound effects feel like they're part of the interface.

The score is a lot of work if you want it to be interesting. But it's worth it because it makes the films feel more interesting and engaging.

## I built a renderer

I didn't want to edit videos using a video editor. You can't easily create animations like the iMessage pop-in using Premiere. That would have made me compromise on the animations or use a lot of stock video, which I didn't want either. So I built a renderer.

The renderer is a simple program that takes a film and renders it. The film is a JSON file that describes the film. The renderer reads the JSON file and renders the film.

I used the renderer to make the films. I wrote the films in JSON, and the renderer read the JSON and rendered the films. I used the renderer to make the films. I wrote the films in JSON, and the renderer read the JSON and rendered the films.

## Hue films are small, short and cheap

I've made a few Hue films so far:

1.  Hue Rivals
    
2.  The Union: The United Hue of Hue Hue
    
3.  Not Your Assistant
    
4.  Eight Oranges
    
5.  Shadow Council
    

Each film takes between 1 and 4 hours to make. The films are optimized for mobile, so they're 4:5 aspect ratio and max 30 seconds long. The films are cheap to render; the longest film takes about 15 minutes to render.

Hue films are still experimental but I'm happy with the results. I intend to keep making more Hue films.

Thanks to Arjun for reading a draft of this essay.