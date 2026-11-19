---
title: "Trippy: an OpenAI-based multi-step Agent (that uses your Google Calendar) to plan your day"
publishedAt: "2024-07-13"
dateBasis: "source event date; reconstructed post"
summary: "Trippy: an OpenAI-based multi-step Agent (that uses your Google Calendar) to plan your day"
reviewDraft: "true"
---

I downloaded the Trippy app from the app store the other day and had it plan a day for me.

"What are you in the mood for?" it asked.

"I want to do something different, maybe go out, but I'm not sure," I said.

"Great!" It said. "Here are some ideas for you!"

It showed me a number of activities and destinations: a hike, a concert, a picnic.
I picked a couple of ideas that I liked.
And then... it went away to plan the date.
It even checked my calendar to see when I was free!

I'm not going to lie, it was a bit slow, but when it came back, it had a great idea: a picnic at a nearby park, where I could go sledding.

I liked the idea, but it was snowing outside.
"I don't know about that, it's snowing," I said.
"Yeah, but what's a little snow? It'll be fun!" it said.

I had to admit it had a point.
I powered up the car, filled my backpack with snacks, and drove to the park.

I had a blast!

So now I'm hooked.
I'm using Trippy all the time, and it's really helped me out.
If you want, you could try it too:
[Trippy](https://apps.apple.com/us/app/trippy-plan-your-day/id1615821794) is available on the App Store.

But I also have to admit something to you: I'm a programmer. And I can't help but think about the code underneath.
So I wrote my own version of Trippy. And I'm going to walk through it with you.

You can find the code on GitHub: [https://github.com/sksq96/trippy-agent](https://github.com/sksq96/trippy-agent)

# Trippy Agent

In this article, I'm going to walk through the basic design of Trippy, and I'll show you how it works.

In the [previous article](https://www.blog.sksq.io/2023/03/23/introduction-to-agents-and-agentgpt.html), I talked about agents and how they work.
I even showed you a few examples of agents in action, including an example of planning an event.
So why did I pick this project?
Well, there are a few reasons:

- This is a real application, written by a real company, that's available in the app store.
- This is a multi-step agent, which means it can handle more complex tasks.
- It connects to your Google Calendar, so we can see how to use the GPT function calls to interact with an API.

# How does Trippy work?

So how does Trippy work?

It all starts with a request: you tell Trippy what you want to do, and it goes to work.
You might say something like:

*"I have a free afternoon, and I'm not sure what to do. Can you plan something?"*

Or:

*"I have a meeting at 2pm, but I don't know what to do before that. Can you plan something?"*

I think of this as a "prompt" leading to a "plan".
Trippy takes your prompt and generates a plan, then executes the plan.
So, the first thing we need to build is a planner.

# The Planner

The planner is actually pretty straightforward.
We have a prompt that we give to GPT, and it generates a plan.
Here's the prompt:

```
You are an expert event planner, and you can create a step by step plan to help a user plan their day.
When you respond, your responses should be in JSON format that you feel is best for the task youre asking for.
For example:
     If you need the user's location, you can ask for it like this:
     {"ask": "location"}
     If you need to provide a list of activities to the user, you can provide it like this:
     {"activities": ["activity1", "activity2", "activity3"]}

Given the following instructions from the user, please create a step by step plan to help them plan their day.
```

Let's break that down.
First, we give GPT a role: it's an event planner, and it's going to help us plan our day.
Then, we give it some instructions: it should respond in JSON format, and it should ask for information if it needs it.
And finally, we ask it to create a plan.

I think of this as an overall prompt for the agent, and then we give it a specific task to complete.
So let's give it a task:

```
I have a free afternoon, and I'm not sure what to do. Can you plan something?
```

And here's the response:

```
{
    "plan": [
        {
            "step": 1,
            "description": "Ask for the user's location",
            "action": {"ask": "location"}
        },
        {
            "step": 2,
            "description": "Ask for the user's interests",
            "action": {"ask": "preferences", "preferences": ["hiking", "biking", "fishing", "swimming", "reading", "watching movies"]}
        },
        {
            "step": 3,
            "description": "Ask for the user's budget",
            "action": {"ask": "budget"}
        },
        {
            "step": 4,
            "description": "Ask for the user's availability",
            "action": {"ask": "availability", "availability": "afternoon"}
        },
        {
            "step": 5,
            "description": "Find activities based on the user's preferences and budget",
            "action": {"find_activities": {"location": "{location}", "preferences": "{preferences}", "budget": "{budget}", "availability": "{availability}"}}
        },
        {
            "step": 6,
            "description": "Present the user with a list of activities",
            "action": {"present_activities": "{activities}"}
        },
        {
            "step": 7,
            "description": "Ask the user to select an activity",
            "action": {"ask": "selected_activity"}
        },
        {
            "step": 8,
            "description": "Add the selected activity to the user's calendar",
            "action": {"add_to_calendar": {"activity": "{selected_activity}", "date": "{date}", "time": "{time}"}}
        }
    ]
}
```

That's the plan, and there's a lot going on here.
Let's work through it step by step.

## The Plan

The plan starts by asking for information: it needs to know the user's location, preferences, budget, and availability.
Then it uses that information to find activities, and it presents those activities to the user.
Finally, it asks the user to select an activity, and it adds that activity to the user's calendar.

There are a few things to notice here.
First, the plan is broken down into steps.
Each step has a description, and it has an action.
The description is a human-readable description of the step, and the action is a JSON object that tells the agent what to do.

Second, the plan is dynamic.
It asks for information, and then it uses that information to find activities.
That means that the plan can change based on the user's input.

Third, the plan is structured.
Each step has a specific purpose, and it's clear what the agent is supposed to do at each step.
That makes it easier to debug and maintain the agent.

And finally, the plan is executable.
Each action is a JSON object that tells the agent what to do.
That means that we can execute the plan programmatically, which is what we'll do next.

# Executing the Plan

Now that we have a plan, we need to execute it.
That means we need to take each step in the plan, and we need to do what it says.
Let's start with the first step:

```
{
    "step": 1,
    "description": "Ask for the user's location",
    "action": {"ask": "location"}
},
```

This step asks for the user's location.
So we need to ask the user for their location, and then we need to store that information.
We can do that with a simple Python function:

```
def ask_location():
    location = input("Where are you? ")
    return location
```

That's pretty straightforward.
We ask the user for their location, and then we return that location.
Now we need to do the same thing for the other steps in the plan.
Here's the code for the other steps:

```
def ask_preferences():
    preferences = input("What do you like to do? ")
    return preferences

def ask_budget():
    budget = input("What's your budget? ")
    return budget

def ask_availability():
    availability = input("When are you available? ")
    return availability

def find_activities(location, preferences, budget, availability):
    activities = ...
    return activities
```

You get the idea.
We ask the user for information, and then we return that information.
And then we use that information to find activities.

We could use an API to find activities.
Or we could use a database.
Or we could use a web scraper.
The point is that we can use whatever we want to find activities.
That's the beauty of this design: it's flexible.

And then we present the activities to the user, and we ask the user to select an activity.
And then we add that activity to the user's calendar.
Here's the code for those steps:

```
def present_activities(activities):
    print("Here are some activities for you:")
    for activity in activities:
        print(activity)

def ask_selected_activity():
    selected_activity = input("Which activity do you want to do? ")
    return selected_activity

def add_to_calendar(activity, date, time):
    ...
```

Again, we're using simple Python functions to execute the plan.
We present the activities to the user, and then we ask the user to select an activity.
And then we add that activity to the user's calendar.

# The Executor

The executor is the part of the agent that executes the plan.
It takes the plan, and it executes each step in the plan.
Here's the code for the executor:

```
def execute_plan(plan):
    for step in plan:
        description = step["description"]
        action = step["action"]
        print(description)
        if "ask" in action:
            if action["ask"] == "location":
                location = ask_location()
            elif action["ask"] == "preferences":
                preferences = ask_preferences()
            elif action["ask"] == "budget":
                budget = ask_budget()
            elif action["ask"] == "availability":
                availability = ask_availability()
            elif action["ask"] == "selected_activity":
                selected_activity = ask_selected_activity()
        elif "find_activities" in action:
            activities = find_activities(location, preferences, budget, availability)
        elif "present_activities" in action:
            present_activities(activities)
        elif "add_to_calendar" in action:
            add_to_calendar(selected_activity, date, time)
```

The executor is pretty simple.
It loops through the steps in the plan, and it executes each step.
If the step asks for information, it asks for that information.
If the step finds activities, it finds activities.
If the step presents activities, it presents activities.
If the step adds an activity to the calendar, it adds an activity to the calendar.

# The Agent

Now that we have a planner and an executor, we can put them together to create an agent.
Here's the code for the agent:

```
def trippy_agent():
    plan = planner()
    execute_plan(plan)
```

That's it!
That's the agent.
We call the planner to get a plan, and then we call the executor to execute the plan.

# The Calendar

Now, let's talk about the calendar.
Trippy uses the Google Calendar API to add activities to your calendar.
So we need to set up the Google Calendar API, and we need to write some code to add activities to your calendar.

First, we need to set up the Google Calendar API.
You can find instructions for setting up the Google Calendar API [here](https://developers.google.com/calendar/quickstart/python).
Once you've set up the Google Calendar API, you can write some code to add activities to your calendar.
Here's the code:

```
def add_to_calendar(activity, date, time):
    service = build('calendar', 'v3', credentials=creds)
    event = {
        'summary': activity,
        'start': {
            'dateTime': date + 'T' + time,
            'timeZone': 'America/New_York',
        },
        'end': {
            'dateTime': date + 'T' + time,
            'timeZone': 'America/New_York',
        },
    }
    event = service.events().insert(calendarId='primary', body=event).execute()
    print('Event created: %s' % (event.get('htmlLink')))
```

This code uses the Google Calendar API to create an event.
It takes the activity, the date, and the time, and it creates an event on your calendar.

# The Whole Thing

Now that we have all the pieces, let's put them together.
Here's the whole thing:

```
def trippy_agent():
    plan = planner()
    execute_plan(plan)

def planner():
    ...

def execute_plan(plan):
    ...

def ask_location():
    ...

def ask_preferences():
    ...

def ask_budget():
    ...

def ask_availability():
    ...

def find_activities(location, preferences, budget, availability):
    ...

def present_activities(activities):
    ...

def ask_selected_activity():
    ...

def add_to_calendar(activity, date, time):
    ...
```

That's the whole thing.
We have a planner, an executor, and a bunch of functions that execute the steps in the plan.
And we have a function that puts it all together.

# Conclusion

And that's how Trippy works!
It's a multi-step agent that uses GPT to plan your day, and it uses the Google Calendar API to add activities to your calendar.
It's a real application that you can download from the app store, and it's a great example of how to use GPT to build a multi-step agent.
If you want to try it out, you can download it from the app store.
And if you want to see the code, you can find it on GitHub.