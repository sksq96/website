---
title: "Point: Add a lightweight commenting layer on top of the web"
publishedAt: "2026"
summary: "Point: Add a lightweight commenting layer on top of the web"
reviewDraft: "true"
---

I built a Chrome extension that lets you highlight text and comment on any web page. But you can also share your highlights and comments with your friends, and get notifications when your friends highlight something for you.

It's kind of like a lightweight version of Google Docs, but for the entire internet.

A lot of times when I'm reading things on the web, I want to make notes on the page. I also want to share it with my friends.

Are there any extensions that let me do that?

I found these two extensions: Inline and Diigo.

Inline is really good, but it doesn't let me share my highlights with my friends.

Diigo is the opposite. It has all the features I want, but it's really bloated and has a bad UI.

I figured, I would just build it myself. To make it a little more interesting, I added in features I thought would make it more viral.

# 1. Creating the MVP

Whenever I'm building a new app or extension, I like to focus on the absolute core functionality and get something minimal working, and then build on top of that.

For example, my first version of Point was a nothing but a sidebar where I could add highlights and comments. It didn't even connect to a database.

Once I got that working, I connected it to a database and added a login flow.

Then I started working on the social features. I added a way to send points (a point is a highlight you send to a friend), a friends list, and a notifications pane.

# 2. Adding Social Features

How can I build social features into a reading app?

I added points.

You can send a point to a friend by highlighting some text and then clicking "send point".

Your friend will get a notification in their extension.

# 3. Checking for points

I'm currently checking for points every 30 seconds by sending a request to my backend.

I could switch to using WebSockets, but I'm not sure it's worth it right now.

The 30 second check is a fine tradeoff for now.

# 4. Get it here

If you want to try it, you can get it here!

It's open source, and I'm actively adding new features.