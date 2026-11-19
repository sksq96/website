---
title: "Where the 1,119 data science problems came from"
publishedAt: "2022-01-15"
dateBasis: "approximate day; source month"
summary: "Where the 1,119 data science problems came from"
reviewDraft: "true"
---

In my last [blog post](./data-science-problems.md), I introduced a project called Data Science Problems. In this blog post, I explain how I created Data Science Problems.

The goal of Data Science Problems is to benchmark AI models on data science tasks.

### nbgrader

Before we dive into the details, there is one tool you need to know called [nbgrader](https://nbgrader.readthedocs.io/en/stable/). nbgrader is a toolkit for creating and grading notebooks. By using nbgrader, a teacher can make an assignment notebook that includes text, code and tests, and a student can fill out the notebook and submit it for grading. A notebook that uses nbgrader looks similar to a typical Jupyter notebook except it has some additional fields like a cell type called "Read-Only" and a notebook metadata field called "nbgrader".

Here is a notebook from the course "Computational and Inferential Thinking" by Josh Hug at UC Berkeley that uses nbgrader:

<img src="./pandas-example.png" height="100%" width="100%">

You can see that the notebook has two code cells with a cell type of "Read-Only" and two code cells with a cell type of "Autograded". The two "Autograded" cells are empty because the student should fill them in with their solution to the assignment.

### A single example

Suppose we wanted to start Data Science Problems with just a single data science problem. Let's see if we can find such an example in the "Computational and Inferential Thinking" notebook above.

The notebook above has a single question: "Find where the number of bikes is highest". This question qualifies as a data science problem because it asks the student to use a data science tool called the pandas library to solve an analytical task. 

However, there are two issues: we don't have a dataset to work with and we don't have a way to check the student's solution. We can solve both issues by using the functions and data from the first cell in the notebook.

This first cell contains the following:
```python
import pandas as pd

def load_bike_share():
    """Loads the bike sharing dataset."""
    return pd.read_csv('data/bike-share.csv', parse_dates=['timestamp'])
```

This cell defines a function that loads a dataset. We can use this code to dynamically load the dataset inside our Data Science Problem.

The cell also has some code that is not needed for our Data Science Problem. These are the imports and the docstring for the function. To remove these, we can use regular expressions to find and delete them.

Since we have code to load the dataset and our question, we have most of a Data Science Problem. However, we still need a way to check the student's solution. Fortunately, the notebook already contains tests through the use of the `assert` statement that we can repurpose. Here is the code from the cell that contains the tests:
```python
assert bike.timestamp.iloc[hour] == '2011-01-01 05:00:00'
assert bike.iloc[hour].casual == 0
```
We can use this code to check the student's solution by dynamically calling the tests after the student has filled out the Data Science Problem.

Now that we have a dataset, a question, and tests, we can create a Data Science Problem. Here is a draft of the data structure we end up with:

```json
{
	"name": "bike-share-peak-hour",
	"code": [
		"import pandas as pd\n",
		"def load_bike_share():\n    \"\"\"Loads the bike sharing dataset.\"\"\"\n    return pd.read_csv('data/bike-share.csv', parse_dates=['timestamp'])\n"
	],
	"question": [
		"**Question 3.** In what hour of the day is the number of bikes rented highest?\n"
	],
	"tests": [
		"assert bike.timestamp.iloc[hour] == '2011-01-01 05:00:00'\n",
		"assert bike.iloc[hour].casual == 0\n"
	]
}
```

### Finding more examples

Now that we have a single data science problem, we can look for more. The above example came from a notebook that uses nbgrader. We can use the nbgrader package to find more notebooks with nbgrader metadata. Then, we can use regular expressions to extract cells with code, tests and questions from these notebooks.

I decided to look for notebooks on GitHub. I used the tool [Octotree](https://octotree.io/) to view codebases that seemed to contain notebooks like academic courses. I also used the tool [Sourcegraph](https://sourcegraph.com/search?q=repo:%5Egithub%5C.com/%5B%5E/%5D%2B/%5B%5E/%5D%2B%24+file:%5C.ipynb%24+%22nbgrader%22+%22tests%22+count:all&patternType=literal) to find notebooks with nbgrader metadata.

It took me a couple of weeks to find roughly 1,000 notebooks that use nbgrader. I also found many notebooks with data science problems that don't use nbgrader. For example, I found many notebooks that have questions and tests but don't use nbgrader. I ended up manually labeling these notebooks and writing code to extract questions from them.

In the end, I found 306 teaching notebooks that have data science problems. The notebooks contain 1,119 data science problems that provide data for the model to perform the task. Each problem has questions, tests and some surrounding context. Here is a chart that breaks down the notebooks by category:

<img src="./results.png" height="100%" width="100%">

### Data issues

Some of the notebooks have data science problems that depend on previous problems. This is an issue because it means a model might not be able to solve a problem unless it has correctly solved the previous problems. For example, suppose a notebook has two problems. In the first problem, the model has to find the average of a column in a dataframe. In the second problem, the model has to find the average of a different column in the same dataframe. The code to load the dataframe is only in the first problem. This means the model cannot solve the second problem unless it correctly solves the first problem.

We can solve this issue in two ways: we can either remove the problems that depend on previous problems or we can dynamically inject the code from previous problems into the problem. I decided to do both. I dynamically injected the code from previous problems into the problem and I also removed the problems that depend on previous problems.

To see which problems depend on previous problems, I wrote code to run each problem one cell at a time. If a problem has a NameError, then it depends on a previous problem. If a problem doesn't have a NameError, then it doesn't depend on a previous problem. This strategy doesn't work for all problems. For example, one issue is that some problems have NameErrors but don't depend on previous problems. To solve this issue, I also manually labeled the problems that depend on previous problems. Additionally, some problems have NameErrors after the student has filled out the problem. To solve this issue, I assumed that the tests don't have typos and I used the tests to figure out which variables are missing.

The following notebook has multiple problems that depend on the code from Question 1: https://github.com/rmleaming/dsci100-21w/blob/dsci100-21w-final/labs/labs/lab10/lab10.ipynb

### How this differs from other benchmarks

In this blog post, I explained how I created Data Science Problems. You might be wondering how Data Science Problems differs from other benchmarks like HumanEval. The short answer is that Data Science Problems is a benchmark of data science tasks while HumanEval is a benchmark of coding tasks.

HumanEval is a benchmark introduced in the paper [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374). HumanEval consists of 164 hand-written programming problems along with unit tests. Each problem has a function signature, docstring, body and unit tests. The models are evaluated on their ability to complete the function body based on the signature and docstring.

In contrast, Data Science Problems is a benchmark of data science tasks. Data Science Problems consists of 1,119 data science problems along with unit tests. Each problem has code to load a dataset, a question, and unit tests. The models are evaluated on their ability to answer the question based on the code and the question.

Here is an example from HumanEval:

```python
def has_close_elements(numbers: List[float], threshold: float) -> bool:
    """ Check if in given list of numbers, are any two numbers closer to each other than
    given threshold.
    >>> has_close_elements([1.0, 2.0, 3.0], 0.5)
    False
    >>> has_close_elements([1.0, 2.8, 3.0, 4.0, 5.0, 2.0], 0.3)
    True
    """
```

Here is an example from Data Science Problems:

```python
import pandas as pd

def load_bike_share():
    """Loads the bike sharing dataset."""
    return pd.read_csv('data/bike-share.csv', parse_dates=['timestamp'])

bike = load_bike_share()

# **Question 3.** In what hour of the day is the number of bikes rented highest?