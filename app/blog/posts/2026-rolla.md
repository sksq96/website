---
title: "Rolla"
publishedAt: "2026-09-05"
dateBasis: "source event date; reconstructed post"
summary: "Rolla"
reviewDraft: "true"
---

- github.com/sksq96/rolla

So I got this itch to make a dice roller app and distribute it, then I distributed it successfully. I think of it as a bit of a meta skill, where even if the app itself is not useful, I have flexed the muscles to take an idea and push it to an app store.

I had not been able to do this for years now, because you need some money and because you need a Mac. So I spent a couple bucks for an Apple developer account, and I rent a Mac and I got the app out. I think that's pretty cool.

The idea is actually pretty simple. I basically found a way to rent a Mac and then use that to initiate a build with my Apple developer account and then use my Apple developer account to release to a beta testing app called Speedflight.

I learned a lot in this and I was rolling around with the ideas for many days. I was working on a project called Clawster that involved building apps for an iPhone. I was trying out many different things and I got tired of it because there were so many different steps involved. So I decided to start from scratch.

So I made a simple dice rolling app. I put it together pretty easily. The trouble was just getting the app to run on my phone. I didn't actually need a Mac at all to code this up. It's just some SwiftUI code. In fact, I had the agent write all of it for me. However, I needed a Mac to build it with Xcode. And I needed a certificate to sign the app.

So I went to the Apple Developer website and created a certificate. Turns out that you can create a p12 file that has the private key and store that on GitHub. And then you can use the GitHub Action Mac to sign your app. That was probably the hardest part.

But the other part was distributing it. Turns out TestFlight is really annoying, because Apple gets to review your app. And Apple won't let you beta test your app unless Apple has reviewed it. I was like, wow, what are the other options? And I found this app called Speedflight, which actually lets you make an app on the app store and then distribute it from there.

So I had to do quite a bit of work on that, and I submitted it. I'm not sure if it's live yet, but I was able to install it on my phone. Which was really cool.