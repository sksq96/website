---
title: "COVERAGEEVAL: Can Language Models Understand Code Coverage?"
publishedAt: "2023-07-15"
dateBasis: "approximate day; source month"
summary: "COVERAGEEVAL: Can Language Models Understand Code Coverage?"
reviewDraft: "true"
---

*(COVERAGEEVAL is a benchmark to evaluate language models’ ability to reason about code coverage.)*

Here’s a quick programming quiz:

```python
def solve(lst):
    if len(lst) == 0:
        return []
    max_value = max(lst)
    result = [max_value] * len(lst)
    return result

assert solve([]) == []
```

This is a Python function `solve` that takes a list `lst` as input and does some computation on the list. Below the function is a test case `solve([])`.

Which lines of code are covered by the test case? Take a minute to think about it before reading on.

I’m going to use a special notation: I’ll put a `+` in front of a line that is covered by the test case.

```python
def solve(lst):
+   if len(lst) == 0:
+       return []
    max_value = max(lst)
    result = [max_value] * len(lst)
    return result

assert solve([]) == []
```

The test case calls `solve([])`, which means `lst` is `[]` (the empty list), so the `if` condition is True and the function returns `[]`. The first two lines in the function are covered by the test case, while the last three lines are not.

## What is code coverage?

Code coverage is a software testing metric that helps you understand how thoroughly your tests exercise your code. When you run a test case, some lines of code are executed during the test, and some are not (for example, the lines after a conditional branch that is not taken). You can use code coverage to measure how much of your code is executed by your tests. In the example above, the test case `solve([])` covers 2 of the 5 lines of code in the function, so the code coverage is 40%.

Language models are being used to generate software tests. The generated tests are then used to find bugs and improve code quality. One way to measure the quality of the generated tests is to measure their code coverage. But can language models understand code coverage?

## Our benchmark: COVERAGEEVAL

In this blog post, I introduce a new benchmark called COVERAGEEVAL to evaluate language models’ ability to reason about code coverage. It’s a simple benchmark that consists of 2000 examples, each of which is a Python function from HumanEval and a test case. For each example, the model’s task is to predict which lines of code are covered by the test case.

## How we created COVERAGEEVAL

HumanEval is a popular benchmark to evaluate language models’ ability to generate code from natural language specifications. Each example in HumanEval is a Python function with a docstring and a set of test cases. We use the test cases from HumanEval to create COVERAGEEVAL. For each test case, we create an example in COVERAGEEVAL.

To get the ground truth coverage for a test case, we run the test case and use a Python package called coverage.py to collect the coverage information.

## How to use COVERAGEEVAL

Each example in COVERAGEEVAL is a test case in HumanEval. The model’s task is to predict which lines of code are covered by the test case.

Here is an example prompt:

```python
def numerical_letter_grade(grades):
    """
    It is the last week of the semester and the teacher has to give grades to
    students. The teacher has been creating her own algorithm for grading.
    The only problem is, she has lost the code she used for grading.
    She has given you a list of GPAs of some students and you have to write
    a function that can output a letter grade based on the following table:

    GPA       |    Letter grade
    4.0                A+
    > 3.7               A 
    > 3.3               A- 
    > 3.0               B+
    > 2.7               B 
    > 2.3               B-
    > 2.0               C+
    > 1.7               C
    > 1.3               C-
    > 1.0               D+
    > 0.7               D 
    > 0.0               D-
    0.0                E


    Example:
    grade_equation([4.0, 3, 1.7, 2, 3.5]) = ['A+', 'B', 'C-', 'C', 'A-']
    """
    letter_grade = []
    for gpa in grades:
        if gpa == 4.0:
            letter_grade.append("A+")
        elif gpa > 3.7:
            letter_grade.append("A")
        elif gpa > 3.3:
            letter_grade.append("A-")
        elif gpa > 3.0:
            letter_grade.append("B+")
        elif gpa > 2.7:
            letter_grade.append("B")
        elif gpa > 2.3:
            letter_grade.append("B-")
        elif gpa > 2.0:
            letter_grade.append("C+")
        elif gpa > 1.7:
            letter_grade.append("C")
        elif gpa > 1.3:
            letter_grade.append("C-")
        elif gpa > 1.0:
            letter_grade.append("D+")
        elif gpa > 0.7:
            letter_grade.append("D")
        elif gpa > 0.0:
            letter_grade.append("D-")
        else:
            letter_grade.append("E")
    return letter_grade

assert numerical_letter_grade([4.0, 3, 1.7, 2, 3.5]) == ['A+', 'B', 'C-', 'C', 'A-']
```

This is a function `numerical_letter_grade` that takes a list of GPAs and returns a list of letter grades. The test case is `numerical_letter_grade([4.0, 3, 1.7, 2, 3.5])`.

The model is asked to predict which lines of code are covered by the test case. We use `+` to denote the lines that are covered by the test case.

The ground truth coverage for this test case is:

```python
+def numerical_letter_grade(grades):
    """
    It is the last week of the semester and the teacher has to give grades to
    students. The teacher has been creating her own algorithm for grading.
    The only problem is, she has lost the code she used for grading.
    She has given you a list of GPAs of some students and you have to write
    a function that can output a letter grade based on the following table:

    GPA       |    Letter grade
    4.0                A+
    > 3.7               A 
    > 3.3               A- 
    > 3.0               B+
    > 2.7               B 
    > 2.3               B-
    > 2.0               C+
    > 1.7               C
    > 1.3               C-
    > 1.0               D+
    > 0.7               D 
    > 0.0               D-
    0.0                E


    Example:
    grade_equation([4.0, 3, 1.7, 2, 3.5]) = ['A+', 'B', 'C-', 'C', 'A-']
    """
+    letter_grade = []
+    for gpa in grades:
+        if gpa == 4.0:
+            letter_grade.append("A+")
+        elif gpa > 3.7:
            letter_grade.append("A")
+        elif gpa > 3.3:
+            letter_grade.append("A-")
+        elif gpa > 3.0:
            letter_grade.append("B+")
+        elif gpa > 2.7:
+            letter_grade.append("B")
            letter_grade.append("B-")
+        elif gpa > 2.0:
            letter_grade.append("C+")
+        elif gpa > 1.7:
            letter_grade.append("C")
        elif gpa > 1.3:
+            letter_grade.append("C-")
        elif gpa > 1.0:
            letter_grade.append("D+")
        elif gpa > 0.7:
            letter_grade.append("D")
        elif gpa > 0.0:
            letter_grade.append("D-")
        else:
            letter_grade.append("E")
+    return letter_grade
```

We use the F1 score to measure the correctness of the predicted coverage.

## Results

We evaluate GPT3.5 and GPT4 on COVERAGEEVAL.

| Model | 0-shot | 1-shot | 2-shot | 3-shot |
|-------|--------|--------|--------|--------|
| GPT-3.5 | 69.8 | 72.3 | 73.4 | 73.8 |
| GPT-4 | 78.4 | 80.2 | 79.2 | 80.0 |

We find that GPT4 performs much better than GPT3.5 and that 1-shot prompting is the most effective.

## Error analysis

One common failure mode is that the model predicts a line is covered when it is not. For example, in the example above, the model predicted that the following line is covered:

```python
elif gpa > 2.7:
    letter_grade.append("B")
    letter_grade.append("B-")
```

But the line `letter_grade.append("B-")` is not covered.

## Conclusion

In this blog post, I introduced a new benchmark called COVERAGEEVAL to evaluate language models’ ability to reason about code coverage. I hope this benchmark will help us better understand language models’ ability to reason about code and that it will be useful for future research.

If you are interested in this benchmark, please check out the GitHub repository for more details.