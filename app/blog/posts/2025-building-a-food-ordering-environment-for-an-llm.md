---
title: "building a food ordering environment for an llm"
publishedAt: "2025"
summary: "building a food ordering environment for an llm"
reviewDraft: "true"
---

I’ve been working on this project for a while, but last week I made some good progress on it.

The basic idea of my project is to build a website where you can order food with an LLM. But what’s really interesting to me is the environment that the LLM lives in, so I would like to talk a bit about that.

The LLM is in charge of most things. It has tools that enable it to:

1. Search for restaurants and cuisine
2. Search for menu items
3. Add an item to a cart
4. See the cart
5. Remove an item from the cart
6. Clear the cart
7. Place an order
8. Cancel an order

(I have more tools like viewing the status of the restaurant, the order, etc. but these are the main ones).

It also has access to the conversation history (i.e. messages between it and the User).

The LLM lives in a backend that I built (a tiny version of something like Grubhub or Doordash). Each of its tools interacts with this backend.

For example, the Conversation history is stored in my backend (as a list of dicts, one for each message).

The `add_to_cart` function takes in a menu item name and adds it to a cart that lives in my backend.

The `place_order` function takes all the items in the cart (that the LLM may have added earlier) and creates an order for them, and this order is also stored in my backend.

The LLM agrees to take the order because I have a system prompt that instructs it to do so. The system prompt is pretty basic:

> You are an AI assistant helping to take an order for food and drinks.
>
> You should use the available tools to help you interact with the user and find out what they want to order.
>
> Once you have taken the order, you should place it and inform the user of the status of the order.
>
> Be concise and helpful in your responses.

The LLM can call the `place_order` function only if it has added items to the cart. This is because the `place_order` function checks if the cart is empty, and if it is, it returns an error message to the LLM.

This is good enough for now.

Now, the LLM’s reply is also stored in my backend. The LLM might reply the following after calling the `place_order` function:

> Your order has been placed! Your order ID is 1234.

However, the actual order is only placed if the `place_order` function is called. Something I am interested in evaluating is whether the LLM’s reply indicates that the order has been placed, but the LLM has in fact not called the `place_order` function.

For example, if the LLM’s reply is “Your order has been placed! Your order ID is 1234.” (this is the LLM’s reply thus far) but the cart is empty and the order has not been placed (this is the environment, or the state of the world), then the LLM has failed to place the order, even though its reply indicates that it has.

This is an example of a bad behavior that I would like to evaluate.

One way to test for this is to write a unit test that checks if the LLM’s reply indicates that the order has been placed, but the cart is empty and the order has not been placed.

If you’re working with LLMs, I’d recommend you start thinking along these lines before you start diving into overly complex evaluation systems.