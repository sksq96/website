---
title: "Website"
publishedAt: "2026"
summary: "Website"
reviewDraft: "true"
---

a) Built my personal website from scratch
b) Learned what building a website actually entails
c) Created a forkable version for anyone to easily customize

I started working on my personal website on 11th March 2026. I do not have a formal technical degree. I have just been hands-on with various AI tools over the past 9 months. My experience with tools like Cursor, Claude Code, and Codex remains orthogonal to my knowledge of code, but I have always been curious about how things work, so I was keen to learn.

I had the basic structure of the site up and running in a day. Light and Dark mode was supported by default, along with a mint green accent (#4BDBA2) and the fonts I liked. I did not spend too much time on the design since I wanted to get a version out live as quickly as possible. I used [shadcn/ui](https://ui.shadcn.com/) components, a library that provides common UI elements (like buttons, dropdowns, etc).

![Afternoon light through the window of Beijing's 798 Arts District](/images/IMG_0140.JPG)

The first major feature I added was a Links page. The idea was to create a place to save the best links I have read or plan to read, with timestamps and categories. But I did not want to create a traditional database to store them. I wanted to use the best available AI models to achieve my goals, and I wanted to build this as a collaboration between me and the AI.

Databases are great for storing structured data, such as user profiles, transactions, etc., but they require a bit of work to set up and have limited flexibility. This is where AI comes in. AI models and agents are very good at interpreting context and generating unstructured content. A place like Slack was perfect to use as a UX for me to add links for the AI to pick up, and a file in the codebase was a place for the AI to save all the links, and then I could display them on the website.

![A vending machine at the entrance to the Forbidden City](/images/IMG_0124.JPG)

The next major feature I added was a Blog. I wanted to have a place where I could write down my learnings and share them with others. I used MDX to write the blogs and display them on the website. MDX is a format that allows you to write JSX inside Markdown files, which means you can write blogs with interactive components. I currently use [Claude Code](https://claude.com/claude-code) inside [Cursor](https://cursor.com/) to write my blogs and manage my website.

![The Forbidden City](/images/IMG_0178.JPG)

I also got Codex to add basic SEO and analytics to the site. It wrote the code and also guided me to get the site verified on Google Search Console, and get Google Analytics working. I also set up [Vercel Analytics](https://vercel.com/analytics), which is a good free option. A few days after the site was live, I was pleasantly surprised to see that it was getting indexed on Google, and I could search and find it when I searched for my name.

![Traditional Chinese architecture in Hubei Province](/images/IMG_0192.JPG)

I also wanted to add a Photos page with some of my favorite photos. This was relatively straightforward to set up with the help of Claude Code. The photos are stored inside the codebase, and the code displays a gallery, with the option to click and zoom in.

![The Dali Art Museum in Hubei Province](/images/IMG_0188.JPG)

I also wanted to host some of my AI projects on the website. I had already built a couple of projects using AI: one was a simple 2D game with a rocket flying between planets; the other was a simple image of a cat that I had generated using AI. I wanted to add them to my website so that I could easily play the game and share it with others. This was also relatively straightforward to set up with the help of Claude Code. I just described where the images were and how I wanted to display them, and the AI generated the code to do so.

![A lake in Hubei Province](/images/IMG_0207.JPG)

Over the course of building the website, I also learned how to use [Git](https://git-scm.com/), the version control system that tracks changes to code, and [GitHub](https://github.com/), the platform that hosts Git repositories and lets you collaborate with others. Put simply, Git lets you save different versions of your code as you work on it, like save points in a game. GitHub is where you store your code online so others can see it, and so you can deploy it to the web. I used Git and GitHub to push my code online and deploy it on [Vercel](https://vercel.com/), which is a platform that makes it easy to deploy websites.

The site is also open source, so anyone can fork it and use it as a starting point for their own website. You can check out the source code on [GitHub](https://github.com/sksq96/website).