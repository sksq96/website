---
title: "rereading the few shot examples in gpt 3"
publishedAt: "2020"
summary: "rereading the few shot examples in gpt 3"
reviewDraft: "true"
---

I'm trying to linger on each of the GPT-3 examples from the paper before moving on to the next one, with the hope that it will help me understand GPT-3 better.

I'm going to continue with the Grammar correction example (Section 3.9.4).

The input to the model is:

```
Original: She no went to the market.
Standard English: She didn't go to the market.
Original: I no want to eat.
Standard English: I don't want to eat.
Original: She gave none of me money.
Standard English: She didn't give me any money.
Original: I am going to the market.
Standard English:
```

And the model generates:

```
I'm going to the market.
```

This example is very similar to the English to French translation example, but instead of going between two languages, you translate between two 'forms' of a language: standard english and non-standard english.

The rule that the model is supposed to infer from the demonstrations is that the output should be grammatically correct english. I was tempted to think that the model was looking at the english phrase starting with "She no", seeing that the next phrase that starts with "She no" begins with "She didn't" and then replacing "no went" with "didn't go". But then it sees "I am", it would try to produce the next phrase that starts with "I am". Luckily there's no such phrase in the examples. If there were, then the model would probably generate that one. However, that's not how any of the GPT-3 examples work. The input to the model is the same string. It doesn't see a sequence of separate phrases. All it sees is a sequence of tokens. The task for the model is to produce the next token. So I don't think that's the right way to think about it.

What if we replaced "Standard English" with "Correct English" or "Right English" or something like that? What if we put "Correct English" before the English sentences, and "Incorrect English" before the non-standard English sentences? What if there were a few examples of non-standard English that were translated to other languages? What if we didn't have the "Original:" and "Standard English:" phrases, and just had the English sentences?

That's the main reason why I'm lingering on the few-shot prompts: I want to see if I can understand how they work by  modifying them. I'll try to do an actual experiment soon. Actually, I might even try to do that in a future post (by the time you've read this, it might already be done).

The paper says that this example is from the BEA-2019 dataset, and that GPT-3 gets a 68.2 BLEU score, and that this is "near the state of the art." I'm not sure why this example is remarkable. If you've read the paper, you'll probably remember that GPT-3 is known for doing well at few-shot tasks. So I'm not sure why this particular example is so interesting.

**Note:** I wrote this post in 2020. It's now 2024. You've been warned.

In retrospect, I think this example is actually quite remarkable, but I don't think many people were surprised by it. The reason I think it's remarkable is that translation is quite an involved process. It's not just mapping words from one language to another. If that's how translation worked, then it would be easy to write a program to do it. Translation involves understanding the meaning of a sentence, and then rephrasing it in another language. I think GPT-3 shows that it's capable of doing this.

I've been thinking about the Grammar correction example for a few days now. I'm going to move on to the next example.