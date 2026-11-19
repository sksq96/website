---
title: "Contact Book"
publishedAt: "2015-05-29"
dateBasis: "source event date; reconstructed post"
summary: "Contact Book"
reviewDraft: "true"
---

This app is a simple contact book application which I built as part of my [Intermediate Angular](http://codeschool.com/courses/shaping-up-with-angular-js) course. It was a fun project to work on and I'll like to share some of the things I learnt in the process.

Angular differentiates itself from other Javascript frameworks by its use of HTML as the template language. The basics of angular is to inject HTML with angular directives. Directives attributes are used to extend the HTML attributes. The first example of this is the [ng-app](https://docs.angularjs.org/api/ng/directive/ngApp).

ng-app is the root directive where the application begins. It defines the scope of the application and automatically initializes the application when the page loads. The first step is to include angular in your application.

```
<script src="lib/angular/angular.min.js"></script>
```

In this contact book app, we've attached the ng-app to the body element of our HTML page and the ng-controller directive to the div element. Let's look at the controller first.

```
<body ng-app="ContactBook">
    <div ng-controller="ListController">
        <img src="" ng-src="images/{{contacts[0].image}}">
        <span></span>
    </div>
</body>
```

We have ng-app attached to the body element of the HTML page. This is the extent of the application which is the body element, anything outside the body element will not be part of the angular applicaton.

### ng-controller

Controllers are used to add behaviour to the DOM elements. This is done by attaching a controller to the DOM via the ng-controller directive. The controller then injects the behaviour and value to the DOM element. You can see in the example above, that the span element has a "name" property. which gets its value from the controller. Let's look at the controller to see how the value is passed to the DOM element.

```
app.controller('ListController', function($scope){
    $scope.contacts = [
        {
            name: "Akshat Gupta",
            image: "Akshat_Gupta.jpg",
            website:"https://github.com/akshatgupta",
            age:"21",
            email: "gupt.akshat@gmail.com"
        },
        .....
    ];
})
```

The application uses the angular module controller to attach the controller to the DOM. The angular module encapsulates the application's controllers, directives, services, and other components into a single unit. This module is also used to inject dependencies into other modules. The controller attaches the array, which contains the attributes of the contacts, to the scope object. This scope object is then used to pass the data to the DOM element.

One of the interesting directives I used while building this application was the ng-src. The ng-src directive is used to set the source of the image. Let's compare this with the src attribute of the image element.

```
<img src="" ng-src="images/{{contacts[0].image}}">
```

The traditional way of setting the source of the image would be

```
<img src="images/{{contacts[0].image}}">
```

The problem that arises with the above code is that before Angular has a chance to replace the {{contacts[0].image}} with the actual image url, the browser tries to fetch the image and displays a broken image. This is because the browser automatically tries to fetch the image as soon as it sees the image element with the attribute.

The ng-src directive solves this problem by ensuring that the browser doesn't fetch the image with an invalid url. This directive waits for the angular to replace the {{contacts[0].image}} with the actual image url and only then it sets the source of the img element with the actual image url.

One of the other directives that I used was the ng-repeat directive.

```
<div ng-repeat="contact in contacts">
    <img src="" ng-src="images/{{contact.image}}">
    <span>{{contact.name}}</span>
    <a ng-href="website" target="_blank">{{contact.website}}</a>
    <span ng-show="contact.age">{{contact.age}}</span>
    <span>{{contact.email}}</span>
</div>
```

The ng-repeat directive is used to repeat a set of elements for each item in a collection. It iterates over the array and for each item in the array it adds the new set of elements to the DOM.

I also used the ng-show directive to conditionally show the age of the contact if the age is present in the contacts array. This is an example of how angular provides a clean way of doing things with its directives.

This was the first iteration of the application. It was a simple contact list with a few functionalities. Some of the changes that I made in the later stages of the application were the use of routes in the application. I'll be expanding on these changes in my next blog.

Have a look at the application [here](http://sksq.github.io/ContactBook/).

Check out the code for this application [here](https://github.com/sksq/ContactBook)