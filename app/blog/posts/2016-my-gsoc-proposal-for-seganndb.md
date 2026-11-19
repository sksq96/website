---
title: "my gsoc proposal for seganndb"
publishedAt: "2016-03-23"
dateBasis: "source event date; reconstructed post"
summary: "my gsoc proposal for seganndb"
reviewDraft: "true"
---

I wrote this in March 2016

> ### Intro to SegAnnDB
>
> SegAnnDB is a web app for visualizing signal data, segmentations, and genomic annotations. The app is faster, with greater interactive features than any other existing application. However, it still has some shortcomings.
>
> For example, the app lacks a side panel that displays information for the annotations. This is a feature that I [experienced](http://d3noob.org/2015/08/05/d3-js-how-to-create-a-simple-clickable-legend-for-a-chart.html) when playing with D3. The [tutorial](http://d3noob.org/2015/08/05/d3-js-how-to-create-a-simple-clickable-legend-for-a-chart.html) which I followed  had a clickable legend that dynamically highlighted the data series in the chart. I found this to be useful because it was intuitive and simple to use. I believe that by adopting this feature, it will increase the usability of SegAnnDB.
>
>
> ### Initial Proposal
>
> #### Design
>
> The elements that will be displayed on the panel are:
>
>   - The type of annotation (segmentation, breakpoint, or copy number)
>   - The genomic coordinates of the highlighted annotation
>   - The current state of the annotation ("editing","pending","done")
>   - The number of breakpoints in the segmentation
>
> These elements will be updated in real time when the user clicks on an annotation. The panel will also have "delete" and "edit" buttons for the annotation.
>
> The panel should be located on the left side of the screen because human eyes usually scan from left to right. If the panel is on the right side, then the next element the user will see after the panel is the "Profile" tab. The user might mistakenly click on the "Profile" tab instead of the "Annotate" tab.
>
> #### Implementation
>
> An SVG element will be created on the left side of the screen. Since the element will be created using D3, it will be possible to update the elements in real time. This SVG element will be linked to the already established legend located at the bottom right of the screen. The legend should be updated to a clickable legend similar to the one in the tutorial above.
>
>
> ### What I've learned
>
> I was surprised to learn that D3 is a lot simpler than I had originally imagined! Since I am not too familiar with Javascript, I had trouble understanding what a callback function was. But after some experimentation, I was able to reproduce my own version of the clickable legend. Next, I plan to add the panel and link it to the legend.

The year was 2016, and I had just joined R/Bioconductor's GSOC program, courtesy of Toby Dylan Hocking. I was green as they come, knew what D3 was but hadn't worked on SegAnnDB codebase yet.

Writing this proposal was a great experience for me because it forced me to think through what I wanted my annotation experience to look like. I had to consider what an user would want to see when annotating a genomic plot. What information should be on the panel? How will users interact with annotations? How should the panel behave?

I had to answer all those questions before writing the code. It was a great learning experience for me.