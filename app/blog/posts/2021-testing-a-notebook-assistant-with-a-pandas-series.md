---
title: "Analyzing Data Science Problems for Evaluating Python Code Generation Models"
publishedAt: "2021-09-09"
dateBasis: "source event date; reconstructed post"
summary: "Analyzing Data Science Problems for Evaluating Python Code Generation Models"
reviewDraft: "true"
---

Recently, I have been working on using Deep Learning to generate python code for Data Science problems. Awesome people at [Microsoft](https://github.com/microsoft) have created a new benchmark called [DS-1000](https://github.com/xlang-ai/DS-1000) that contains 1000 such problems. The goal of this blog post is to make this exercise hands-on and do a deep dive into one of the problems as an example.

![Image by Author](pandas-example.png)

This problem is one of the 66 pandas problems in the benchmark. 

As you can see in the image above, we have a dataframe that contains two columns that look like strings. The goal is to strip the quotes from the value in parameter column. That is our problem. Using the information given, we first have to create a dataset with the original dataframe and the required dataframe after performing the operation. 

Here's how we can do it. First, I create a csv file called `test.csv` which contains the following data.

```
ID,Paramater,Configuration,Vendor
1,"'cpu'","'intel'","'dell'"
2,"'cpu'","'AMD'","'dell'"
3,"'gpu'","'nvidia'","'dell'"
```

Now, using this file, I can create a pandas dataframe.

```
import pandas as pd


df = pd.read_csv("test.csv")
```

Now to solve the problem, we need to strip the quotes from the `Parameter` column of the dataframe.

```
series = df["Paramater"].str.strip("'")
```

Now that we have the `series`, we can perform some checks on the output of the model. First we can check the length of the output.

```
len(series) == 3
```

Then we can check if the output is a `pandas.Series` object.

```
isinstance(result, pd.Series)
```

Finally we can check if the output is equal to the expected output.

```
result == series
```

These tests and a few more constitute the test cases for this problem. The goal of the model is to generate code that when executed, passes all the test cases.

Now, let's say that we have a model that takes in a prompt and generates code. We can use the following prompt to generate code for this problem.

```
import pandas as pd
df = pd.read_csv("test.csv")
# df has Paramater column with values like
# 'cpu'
# 'cpu'
# 'gpu'

# Write code to strip the quotes from the Paramater column so that df looks like
# Paramater
# cpu
# cpu
# gpu
# # YOUR CODE HERE
```

We feed this prompt to the model and get the following output.

```
df["Paramater"] = df["Paramater"].str.strip("'")
```

This is the code that the model generated. Let's see if it passes the test cases.

```
import pandas as pd


df = pd.read_csv("test.csv")

df["Paramater"] = df["Paramater"].str.strip("'")

series = df["Paramater"].str.strip("'")

assert df["Paramater"].equals(series)
assert df["Paramater"].dtype == series.dtype
assert df["Paramater"].tolist() == series.tolist()
```

If the above code runs without any errors, then we can say that the model has passed the test cases.