---
title: "editor"
publishedAt: "2025-07-01"
dateBasis: "source event date; reconstructed post"
summary: "editor"
reviewDraft: "true"
---

I wanted a distraction free word counter that autosaved to my browser's local storage. It's for writing but I've used it to track my daily moods, and as a place to dump notes.

It's a very simple app. I might add more features in the future. I built it to scratch my own itch, but figured others would find it useful too.

In this post, I'll share my learnings from building it.

## Why does this exist?

I was inspired by my friend Maya's [word counter](https://wordcounter.net/). It's very simple, she's had it for awhile, and it's a very useful tool.

I wanted to do what she did, but with a few tweaks:

1. Dark mode
2. Autosave to local storage
3. Hide the "Today's date" text after editing

The "Today's date" is a little inline reminder for me to write. It's a useless feature technically, but I find it useful as a prompt.

## Supporting multiple instances

As a user, I might have multiple instances of the editor open at the same time. I use the editor as a place to jot down notes. I might have one instance open where I'm writing, and another where I'm jotting down random notes.

To support this, the editor uses the `editorId` as the key for saving to the browser's local storage.

```ts
  const getStorageKey = (id: string) => `minimalist-editor-content-${id}`
```

So if I had one tab open with `editorId=1`, and another with `editorId=2`, the editor would save the content of the first tab to `minimalist-editor-content-1`, and the content of the second tab to `minimalist-editor-content-2`.

## Checking multiple instances for the "Today's date" text

There was a bug. When I clicked the "Clear" button, the editor would still show the "Today's date" text in other instances.

To fix this, I added a `checkForTodaysDateInOtherInstances` function.

```ts
  const checkForTodaysDateInOtherInstances = () => {
    // Check if any other instances have "Today's date" in their content
    const keys = Object.keys(localStorage)
    const editorKeys = keys.filter((key) => key.startsWith("minimalist-editor-content-"))

    for (const key of editorKeys) {
      const content = localStorage.getItem(key) || ""
      // Check for various forms of "Today's date"
      if (
        content.includes("Today's date") ||
        content.includes("Today&apos;s date") ||
        content.includes("Today&#39;s date")
      ) {
        return true
      }
    }

    return false
  }
```

It checks if any other instances have the "Today's date" text in their content. If they do, it returns `true`. If not, it returns `false`.

## The final product

The final app is live at [editor.samsk.io](https://editor.samsk.io).

It's a simple text editor with a word counter. It autosaves to the browser's local storage. It has a dark mode. It's not perfect, but it's useful.

If you're interested in the source code, it's available on [GitHub](https://github.com/sksq96/editor).