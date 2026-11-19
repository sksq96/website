---
title: "Flowchart creator for DNASeq Pipelines"
publishedAt: "2016-03-16"
dateBasis: "source event date; reconstructed post"
summary: "Flowchart creator for DNASeq Pipelines"
reviewDraft: "true"
---

I finally got time today to complete the task at hand. And I must say it took me a lot of time to do this. Though I was under the impression that I would be able to complete the task in 4-5 hours tops. 

I started off with the basic research on various graph visualization python libraries such as networkx, matplotlib, graphviz and bokeh. After a bit of research, I found graphviz to be the most easy to use and learn. I also looked at some of the other tasks of GSoC but this was the one I was most interested in.

It took me a while to get the basic program up and running. The program reads the .ini files, stores the variables in an array and then uses the array to create the block diagram. After this, I started with the documentation. This was the hardest part. Because I had never worked with graphviz before, and I had to learn the syntax and the syntax that I had to use, was quite different from the original syntax that is used.

Though the graphviz library is quite extensive and has a lot of features that can be used to make the flowcharts look more pretty. But for the time being, I have not used those. I have tried to keep the program as simple as possible so that it is easier to understand.

The code for this task can be found in this [repository](https://github.com/sksq/DNAseqPipelineFlowchart). The flowchart diagram can be found in the output folder, but for convenience I have attached the diagram below:

![Alt text](https://raw.githubusercontent.com/sksq96/DNAseqPipelineFlowchart/master/output/DNAseqPipeline.png "DNAseq Pipeline")