---
title: "A CT scan with two extra slices"
publishedAt: "2019-06-15"
dateBasis: "approximate day; source month"
summary: "A CT scan with two extra slices"
reviewDraft: "true"
---

A CT scan is a three-dimensional image of the inside of a body. The one used here came from a Kaggle competition called LUNA16. The task was to find lung nodules, which are small, mostly round objects visible in the lungs.

Kaggle is a website where people compete to solve data science problems. For this competition, the dataset came as a collection of CT scans and labels from human experts. We were given the locations of nodules and asked to write a program that would predict those locations from the scan.

I spent a week reading tutorials and trying to make sense of the problem. The competition was over, but that was fine; I was just looking for a way to improve my medical imaging skills.

CT scans come in a special file format called DICOM. It is a complicated format, but the Python library `pydicom` can open it. I also needed `SimpleITK`, a library for medical images, and `opencv`, a library for computer vision.

The scans were stored as a series of 2D images, each a picture of a cross-section of the patient. To understand the data, I wrote a small program that displayed all the cross-sections one after another. It felt like flying through the patient’s lungs.

One of the training scans had a radiologist’s annotations manually overlaid on the lower part of the lungs. The annotations were visible in the original scan, and the program displayed them along with everything else.

I wanted to remove the annotations from the scan, or at least see what the data looked like without them. The easiest way might have been to use some kind of inpainting technology, but that would have been tedious and messy.

Instead, I found the original scan online, without the annotations, but there was a problem: the scans had different numbers of slices. That meant I could not just subtract one from the other.

I loaded both datasets with `SimpleITK` and printed the shapes of the volumes. The original image was 512×512×236, and the annotated version was 512×512×234. The annotated scan had more slices.

The scans were aligned with `SimpleITK`. I resampled the original image to match the annotated one using linear interpolation, and resampled the annotated image with nearest-neighbor interpolation to keep the mask binary. The resampled annotated image was then converted into a binary mask, where annotated pixels were set to 1 and everything else to 0.

The next step was to check how well the slices lined up. I used OpenCV’s template matching to compare each slice of the original image against the annotated one. The process was run across all slices, with results stored in a list. The best result was found by taking the maximum correlation coefficient, and the corresponding index was printed.

This produced a rough alignment between the original and annotated scans. The mask was then subtracted from the original image to remove the annotation. The resulting image was saved as `out_clean.mha`.

I also explored several other ways to align the images. These included using binary masks to locate the lungs, aligning with bounding boxes, and ultimately aligning through a rigid transformation based on the lung masks. This worked better than the earlier attempts.

After the transformation, the annotated image was resampled again using nearest-neighbor interpolation. The cleaned image was created by setting pixels to zero wherever the annotated mask was positive. The final image was written to `out_clean.mha`.

To confirm the result, the original image was resampled to match the cleaned image. The difference between the two was computed and saved as `out_diff.mha`.

There are likely better ways to align the images, but that seemed to work.

This work was mainly a proof of concept for aligning medical images. I did not end up using the dataset for training, so I never confirmed whether removing the annotations affected model performance.