---
title: "NetConnect: How my first project failed at its core aim"
publishedAt: "2015-01-23"
dateBasis: "source event date; reconstructed post"
summary: "NetConnect: How my first project failed at its core aim"
reviewDraft: "true"
---

The idea for this project was conceived when I was in 10th - 11th grade. I had observed that the rural and remote parts of our country had very slow and unreliable internet connections. This was also the time when the term "2G" was popular. When I came across the Android platform, I decided that I'd make an app that helps people on slow internet connections access the web.

## Overview

NetConnect is an Android app that lets users subscribe to services and access them on a 2G network or any other slow network.

## How it works

When the app is first opened, the user has to sign up to register himself. The app then takes him to the main screen where he can subscribe to the services he wants. The main screen is divided into four sections: "News", "Education", "Weather" and "Owner".

The weather section has a single service that shows the weather in the user's city. The owner section has a single service that allows the user to send a message to the developer.

In the news section, the user can subscribe to any combination of four news services: "Local news", "National news", "International news", "Sports news". The education section allows the user to subscribe to a number of educational services. One of the services is "Ask a question" that allows the user to send a question to volunteers who will answer it and send it back. Another service is "Exam times". This service allows users to send the name of a competitive examination to get the dates and details of that examination.

Once the user has subscribed to the services of his choice, he can start using the app. He can do so by going to the services screen (which can be accessed from the main screen). At the top of the services screen, there are two tabs: "Services" and "Inbox". The inbox tab has all the messages received from the services. The services tab has all the services that the user has subscribed to. Each service has an action that can be performed by selecting it. Some services such as "Weather" and "National news" require no external input and can be used by selecting the service and hitting the submit button. Some services like "Exam times" and "Ask a question" require extra input and this can be given using the edit text field. When the user sends in a request, a message showing that the request is being processed comes up. The user can now quit the app and the response from the service shows up in the notifications bar when it is received.

## How it is implemented

The app uses Parse as its backend. It uses Parse's user authentication system for the sign up. When a user registers, a new object of the class "subscribedServices" is created with the user's username. This object has one field for each of the services. These fields are of a boolean type and represent if the user has subscribed to that service or not. If the user unsubscribes from a service, then the corresponding boolean field is set to false and if the user subscribes, it is set to true.

When the user wishes to use a service, he goes to the services screen where he can see all the services that he has subscribed to. When the user selects one of the services, the app checks if that service requires any extra input other than the name of the service. If it does not, then the app sends a message to the class "requests". Each object in the class "requests" has four fields. The first is called "name" and is the username of the user who made the request. The second is called "service" and is the name of the service requested. The third is called "content" and is the content to be sent to the service. The fourth field is called "status" and is the status of the request (It can be either "toSend", "sent" or "delivered"). If the service requires some extra input, the app will prompt the user to enter it in the edit text field before sending a request to the "requests" class.

Whenever a request is sent to the "requests" class, a cloud code function is triggered. The cloud code function checks what service the user has requested for and then contacts another service to do the actual job. For example, if the user has requested the weather service, the cloud code function will contact OpenWeatherMap to get the weather of the user's city. The cloud code function then creates an object in the class "responses" with the response to the user's request. The class "responses" is similar to the class "requests" except instead of having a field called "service", it has a field called "response" which is the response to the user's request.

Whenever an object is created in the "responses" class, a push notification is sent to the user's device. If the user has the app open, the notification will not be visible but the app will update with the new response. If the user doesn't have the app open, he will get a notification with the response.

## Things that could have been done better

The app performs the very basic task that it is supposed to do, but it can be improved upon in a couple of ways:

1. There are many unnecessary network calls being made. For example, whenever the user opens the services screen, the app checks which services he has subscribed to by making a network call. This can be avoided by caching the result and updating only when the user subscribes or unsubscribes from a service.
2. The user has to wait for the request to be sent before he can quit the app. This can be avoided by using local data storage. Whenever a request is made, it can be stored in the local data storage and then synced with the server when there is a stable network connection.
3. There is no feedback if the request fails to send. This can be avoided by using the local data storage as described in the previous point and showing the user a message if the request fails to send. Another option is to use Parse's saveEventually function which will try to send the request until it is successful.