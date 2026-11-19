---
title: "searching a codebase in plain english"
publishedAt: "2023"
summary: "searching a codebase in plain english"
reviewDraft: "true"
---

Imagine being able to search your codebase in natural language. "Which function fetches this entity?" "Which function creates this entity?" You don't have to look for names and signatures.

I was working on a natural language search for code for a tool at work. I don't have the permission to say what it is, so I applied the same technique to [minGPT](https://github.com/karpathy/minGPT). Here is a search result for "which function creates the model":

![image.png](/images/searching-a-codebase-in-plain-english/image.png)

We don't even have to use the word model. "Which function initializes the neural net" gives the same function as the result:

![image.png](/images/searching-a-codebase-in-plain-english/image-1.png)

Why is it able to do this? Let's look at the prompt:

> File: mingpt\model.py
Language: python
Class: class GPT(nn.Module):
Class docstring: the full GPT language model, with a context size of block_size
Code: def \_\_init\_\_(self, config):
Summary:

And the summary:

> This code initializes a GPT model with a given configuration. It sets up the model's architecture, weight initialization, and optimization strategy.

Embeddings encode semantic information. We can put any language and the embedding for the string "neural net" is semantically close to the embedding for "model" and "GPT". It's similar to the [word2vec example](https://arxiv.org/abs/1310.4546), where vectors for king and queen are close to each other.

![image.png](/images/searching-a-codebase-in-plain-english/image-2.png)

![image.png](/images/searching-a-codebase-in-plain-english/image-3.png)

The second result is wrong. It's about BERT, a different kind of model. But there is something about the embedding that made it think it was relevant.

---

I was trying the same thing in IntelliCode. I think the result is better. Here is a search result for "which function creates the model":

![image.png](/images/searching-a-codebase-in-plain-english/image.png)

And here is the prompt and summary:

> File: src\IntelliCode.Model\Models\BaseLanguageModel.cs
Language: csharp
Class: public abstract class BaseLanguageModel : ILanguageModel
Class docstring: <summary>
Model representing the results of training a language model against a set of training data.
</summary>
Code: public BaseLanguageModel(string modelId, ModelHyperParameters hyperParameters, string modelVersion)
Summary: Initializes a new instance of the BaseLanguageModel class with the specified model ID,
hyper parameters, and model version.

Let's try something more complicated. "How is the model saved"

![image.png](/images/searching-a-codebase-in-plain-english/image-1.png)

The first result is again wrong, but the second is right. Let's look at the prompt and summary:

> File: src\IntelliCode.Model\Models\BaseLanguageModel.cs
Language: csharp
Class: public abstract class BaseLanguageModel : ILanguageModel
Class docstring: <summary>
Model representing the results of training a language model against a set of training data.
</summary>
Code: public void Save(string path)
Summary: This function saves a given model to a specified path. The function checks if the model is null
and throws an exception if it is. It then creates a new directory at the specified path and
concatenates the path with the model's ID to get the model path. Finally, it calls SaveModel
and SaveVocabulary with the model and vocabulary paths respectively.

This is great. Let's try "which function loads the data?"

![image.png](/images/searching-a-codebase-in-plain-english/image-2.png)

The first result is correct. Let's look at the 2nd and 3rd.

> File: src\IntelliCode.Model\SimilarityBasedModel\SimilarityBasedLanguageModel.cs
Language: csharp
Class: public class SimilarityBasedLanguageModel : BaseLanguageModel
Class docstring: <summary>
A language model that redicts the likely next token given an input context using a so-called
\"n-gram\" model. An n-gram is a sequence of n tokens. The model keeps track of the n-grams
that it observes in its training data, and when asked to predict the next token, it uses the
input context to find similar contexts in the training data and then predicts the token that
follows them. This model is very accurate for short contexts, but it's not very good at
predicting tokens for long contexts.
</summary>
Code: public static SimilarityBasedLanguageModel Load(string path, ModelHyperParameters hyperParameters = n
Summary: This code loads a pre-trained similarity-based language model from a given path. It takes in a
path and optional hyperparameters, and returns a SimilarityBasedLanguageModel object. The code
checks if the model and vocabulary paths exist, and if so, reads the model and vocabulary from
the paths. It then creates a new SimilarityBasedLanguageModel object with the model and
vocabulary, and sets its hyperparameters. Finally, it returns the model.

> File: src\IntelliCode.Completion\IntelliCode.Completion.Tests\NgramModelTests.cs
Language: csharp
Class: public class NgramModelTests
Class docstring:
Code: public NgramLanguageModel LoadModel()
Summary: This function loads a pre-trained language model from the file system. The function takes no arguments and returns an instance of the NgramLanguageModel class.

Both are about loading the model, not loading the data. But there is something about the embedding that made it think they were relevant. How about "how is the model trained"?

![image.png](/images/searching-a-codebase-in-plain-english/image-3.png)

The first and second result are relevant. Let's look at the 3rd.

> File: src\IntelliCode.Model\NgramModel\NgramLanguageModel.cs
Language: csharp
Class: public class NgramLanguageModel : BaseLanguageModel
Class docstring: <summary>
A language model that redicts the likely next token given an input context using a so-called
\"n-gram\" model. An n-gram is a sequence of n tokens. The model keeps track of the n-grams
that it observes in its training data, and when asked to predict the next token, it uses the
input context to find similar contexts in the training data and then predicts the token that
follows them. This model is very accurate for short contexts, but it's not very good at
predicting tokens for long contexts.
</summary>
Code: public void Train(IEnumerable<TokenizedDocument> tokenizedDocuments)
Summary: This code trains a language model on a given set of tokenized documents. It takes in a list of
TokenizedDocument objects, and for each document, it tokenizes the text and adds the tokens to
the vocabulary. It then adds the tokens to the model's context and updates the model's
vocabulary. Finally, it adds the tokens to the model's n-grams and updates the model's
weights.

Huh. I think this is about model training, but I'm not sure.

This is in the context of the WholeLineCompletion repo. I also tried the same idea in minGPT. The result is similar to IntelliCode, but not as good.

![image.png](/images/searching-a-codebase-in-plain-english/image-4.png)

This is a result for "which function creates the model". The first result is wrong, the 2nd is right, and the 3rd is wrong. Let's look at the prompt and summary for the 2nd result:

> File: mingpt\model.py
Language: python
Class: class GPT(nn.Module):
Class docstring: the full GPT language model, with a context size of block_size
Code: def \_\_init\_\_(self, config):
Summary: This code initializes a GPT model with a given configuration. It sets up the model's architecture, weight initialization, and optimization strategy.

This is great. But how about the 1st?

> File: mingpt\bpe.py
Language: python
Class: class BPE(object):
Class docstring:
Code: def \_\_init\_\_(self, encoder, bpe_merges, errors='replace'):
Summary: This function initializes the BPE encoder.

It's about a tokenizer and not about the model at all. Is it because it's used by the model?

How about "how is the model saved"

![image.png](/images/searching-a-codebase-in-plain-english/image-5.png)

Not bad. First two are wrong and the 3rd is right.

> File: mingpt\utils.py
Language: python
Class:
Class docstring:
Code: def \_\_init\_\_(self, fname):
Summary: This function initializes a logger object with a file name.

> File: mingpt\trainer.py
Language: python
Class: class Trainer:
Class docstring:
Code: def save_checkpoint(self, fname):
Summary: This function saves a checkpoint of the model to a file.

> File: mingpt\model.py
Language: python
Class: class GPT(nn.Module):
Class docstring: the full GPT language model, with a context size of block_size
Code: def from_pretrained(cls, model_type, override_args=None):
Summary: This function loads a pre-trained GPT model from the Hugging Face model zoo. It takes in a model type (e.g. 'gpt2', 'bert-base-uncased') and a dictionary of arguments to override the default arguments for the model. It returns a GPT model instance.

It's interesting that the embedding separated the two functions about saving the model. One is about saving the state and the other is about saving the weights. They are both about saving the model, but they are not the same.

---

There is tremendous potential for this idea. You don't have to know names or code at all. You can search for concepts and ideas.

I have a proof of concept here: natural-code-search. I have not tested it extensively, but it works for the examples I've tried so far.