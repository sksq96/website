---
title: "Does an Image Model Rediscover the Pixel?"
publishedAt: "2026-10-28"
dateBasis: "source event date; reconstructed post"
summary: "Does an Image Model Rediscover the Pixel?"
reviewDraft: "true"
---

*written in 2026*

# Does an image model rediscover the pixel?

I took an image, flattened it into a stream of RGB bytes, and let a small network learn where to place boundaries. The image, the bytes, and the learned chunks are visible in the figure below.

![A CIFAR-10 image beside the same image with its bytes colored by learned chunk boundaries. The boundaries are not regular pixel groups.](/images/pixhnet_chunks_zoom.png)

In text, each token is already a meaningful unit. A byte-level model has to discover that pattern itself, and H-Net does this with a router that decides where to place boundaries. An image is more awkward, because the byte stream is arbitrary and its local structure is weak. A pixel is already a three-byte RGB unit, and a patch is already a meaningful spatial unit.

The question I was interested in was whether H-Net's learned boundaries, which are emergent in text, could produce something like pixels or patches when applied to a byte stream.

H-Net does not work very well on images. On the CIFAR-10 byte-order runs reported below, fixed three-byte chunks reach 3.065 bits/dim, while learned boundaries and fixed six-byte chunks are about 4% behind. The learned router does not dominate the obvious fixed grouping.

The experiment is narrow in scope. It tests raster and Hilbert orderings on small images, where the byte stream is weak and the three-byte RGB grouping is already useful. Across other serialization orders and scales, the answer may differ.

I began with a raster RGB stream because it was the most direct structure to test. That stream has a particular failure mode: the red, green, and blue bytes of a pixel are adjacent, but learning to group them does not produce a robust visual representation. Reading a row of RGB bytes does not naturally give the model a useful sense of the image.

A Hilbert curve can be used for this experiment. If the bytes are reordered along a Hilbert curve, nearby points on the curve remain closer in the image. The local structure is then more continuous, so the byte stream becomes a more coherent sequence. The model can see more of the image locally, with less jumping between unrelated regions.

The image bytes are still flattened into a 1D stream. The model remains autoregressive. The Hilbert curve only changes the order.

The raster runs give the cleanest fixed-versus-learned comparison.

| arm | chunk ratio | epoch 8 bits/dim |
|---|---:|---:|
| L | 6 | 3.199 |
| F | 6 | 3.196 |
| L | 3 | 3.175 |
| F | 3 | 3.065 |

The Hilbert runs support the same conclusion.

| arm | chunk ratio | epoch 8 bits/dim |
|---|---:|---:|
| F | 3 | 3.176 |
| L | 3 | 3.269 |
| F | 6 | 3.352 |
| L | 6 | 3.353 |

Across both orderings, the learned boundary model is competitive at the six-byte ratio, but it does not beat fixed three-byte chunks.

The visualization makes another point. The learned boundaries are not simply rediscovering RGB bytes. They find their own structure, but that structure is not better than the fixed grouping already built into the image format.

The comparison is limited to small images, and each result comes from a single training seed. Still, the result is clear enough to stop trying the same approach.

For a byte-level image model, I would begin with a fixed three-byte chunker. I would train on raw RGB bytes, keep the sequence order stable, and use the Hilbert curve only if the raster sequence is too weak. I would not expect the router to invent the pixel for me.