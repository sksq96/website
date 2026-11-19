---
title: "figment"
publishedAt: "2023"
summary: "figment"
reviewDraft: "true"
---

I have a Google search history from April 17, 2023: "figment ai."

I have a repo by the same name with its first commit dated 2023-04-17.

My first recorded contact with my notes came on 2023-04-27 at 17:39 IST, in a file named "unnamed.md". The entry was short:

"Why are you so scared of your own shit?"

It is an entry that reads like it was written to an acquaintance. But I have no memory of writing it or of this person. I would like to pretend that I did write it, but this doesn't feel like me. Even still, the sentence is good.

What happened next is easy to trace. I appended the note with one line:

"te: figment ai"

On 2023-04-28, I committed a rebuilt Figment. It included a JSONL loader that read Obsidian notes, stripped YAML front matter, extracted a title from the first Markdown heading, dropped empty notes, and wrote the result to data/obsidian.jsonl. That is the first time the note was normalized into records with text, source_path, type, extension, title, length, and uid.

The same commit added a minimal indexing script based on llamaindex. It loaded the JSONL file, created a VectorStoreIndex from the note text, and saved the index to disk. At that point, the note was no longer only a line in a journal. It was one chunk in a searchable structure.

The following commit added a different indexing path. It read the same JSONL file, removed the source_path field, and passed each note into a Chroma-backed VectorStoreIndex. It also changed the default embedding model to OpenAI text-embedding-ada-002, wrapped indexing in a tqdm progress bar, and made index creation optional behind a --index flag. The note now existed in two retrieval paths: the earlier local index experiment and the newer Chroma/llamaindex path.

On 2023-04-30, I committed a README update that documented this pipeline. It described Figment as a project for capturing, storing, and loading data about a person, with Obsidian and Roam journals as the initial source. It gave the commands for preparing Obsidian notes into JSONL and indexing the result with add.py. The README made the workflow explicit: vault first, cleaned records second, searchable index third.

On 2023-05-17, I committed a later Figment version with a new directory called sia. Inside it were retrieval and chat files: index, oai, oai_index, chatgpt_interface. The commit also added the JSONL notes data, Chroma index files, and FAISS index files. In the code, the note could now be read through the indexing layer, embedded, stored, and queried through the chat interface.

Here is the note, exactly as it was:

"Why are you so scared of your own shit?

te: figment ai"

Who is this?

Was this the only such note I had written in that file? Why did I call the file "unnamed"? Was it a conversation? I don't remember this person. I wish I could.

But I can share that the moment I discovered this note, I had a small moment of panic. I had written it. It doesn't feel like me. But the sentence is good. Actually, more than good. It is a great sentence. It could be used to produce a great quote. I wish I could share more details about this, but I cannot. Maybe I will when I remember more. I wonder how I would even do that.

And here is a good question I can now answer using this index. I don't remember when I wrote this question, but it is a good one to answer from this index.

"What was the most haunting thing in my life?"

But here is another question that I have to answer myself:

"What is in my life that is haunting itself?"

The answer probably lies in this list.