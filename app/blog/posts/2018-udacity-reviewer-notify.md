---
title: "udacity reviewer notify"
publishedAt: "2018-05-11"
dateBasis: "source event date; reconstructed post"
summary: "udacity reviewer notify"
reviewDraft: "true"
---

**This post is outdated!** Please view the [repo](https://github.com/sksq96/udacity-reviewer-notify) for the latest instructions.
<br><br><br><br>
I started this project in April 2018, and have been consistently updating it with new ideas. The reason I started this project was that Udacity, the platform I work for, released a new feature in the reviewer dashboard called "BANG!" ([bangs](https://community.udacity.com/t/big-bang-and-super-fast-bang-review-description-and-request-for-input/#)). This feature allowed reviewers to "bang" for a project before the normal period of 6 hours. In essence, this meant that the project would be immediately assigned to you if you were the first one to click the "bang" button.

This resulted in a very competitive scenario on the platform. It was humanly impossible to consistently click on the "bang" button that would appear randomly to gain projects.

I thought of automating this process using Python.

### Getting into the queue

The first thing I did was to implement an automation script that would periodically check for projects in the queue.

One of the first things I did was to understand how the network requests were being sent and received by the browser. I used Google Chrome's developer tools to investigate the API calls being made and responses received.

One of the key pieces of information I needed to get right was the authorization token. The token can be found in the **Network** tab after logging in. In the API request headers, look for the parameter `Authorization`. Copy the value and paste it in `refresh.py`.

```python
# refresh.py
token = 'JWT <token here>'
```

I found `refresh.py` to be an effective tool to always refresh the queue. This was before the implementation of "bangs".

### Notifier

After a month of successfully refreshing the queue, I decided to take it to the next level. I read about Pushover and found it to be an easy way to receive notifications on my phone. I knew this was perfect for project notifications because it would allow me to focus on work without constantly checking my phone or computer.

![pushover](https://media.giphy.com/media/3o7btUnC4QMHuMzxTM/giphy.gif)

The implementation of this feature can be found in `notif.py`.

### Bang!

But I wasn't satisfied yet. I wanted to take it to the next level, and I did. In May 2018, I implemented the `bang.py` script. This script automatically presses the "bang" button for you!

If you want to double check all the network calls that `bang.py` makes, you can check out `c.json` and `c2.json`. These JSON files contain the GET and POST requests that are made when you bang for a project.

### More APIs

Today, I have created a lot of new scripts that are useful for reviewers. I have also created a lot of helper scripts. The `mentorship` folder contains scripts to analyze the feedback given by the mentor. This is heavily inspired by the work of [David Joyner](https://github.com/djoyner/). I have added support for both primary and secondary ratings.

### Analytics

I have also added a bunch of Jupyter notebooks to analyze your reviewer earnings and projects. These notebooks can be found in the root folder.

### Bash

I use bash to run these scripts throughout the day and set cron job.

```bash
#!/bin/bash
python get_api_token.py
python refresh.py
python bang.py
python notif.py
```

### What next?

I will continue to add more features and share them in this blog post.

My goal is to help the Udacity reviewers make better decisions.