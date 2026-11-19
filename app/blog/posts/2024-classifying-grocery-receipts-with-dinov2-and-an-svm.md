---
title: "Classifying grocery receipts with DINOv2 and an SVM"
publishedAt: "2024"
summary: "Classifying grocery receipts with DINOv2 and an SVM"
reviewDraft: "true"
---

I was working at Truve recently and we wanted to test out leveraging large vision models to classify grocery receipt to detect fraudulent receipts. To test this out, I scraped ~1,000 grocery receipts off Twitter and trained a simple classifier on the images. I'll go through the process of training and inference. If you want to try it out yourself, you can clone the code here:

## Training

I'm leveraging two models to build a classifier to classify grocery receipts. 

First, I'm using the DINOv2 model as an image feature extractor. This model will process the input images and produce embeddings, which capture the essential features of the images. I'm using the largest ViT to test out if it's possible to build a performant classifier. 

Second, I'm using a Support Vector Machine (SVM) with a linear kernel as the classifier. The SVM is trained on the embeddings produced by the DINOv2 model. There's probably a better choice here but I wanted to go with something simple that wouldn't overfit. 

Here's how the training process looks like. First, load up the DINOv2 model:

```python
dino = torch.hub.load('facebookresearch/dinov2', 'dinov2_vitg14')
dino.eval()
```

Then, for each image, I'm converting it into a PIL object, applying the DINOv2 transforms and taking the output of the model as a feature vector:

```python
img = Image.open('img.jpg')
img = transforms(img)
embedding = dino(img).squeeze(0).detach().numpy()
```

Once I have the feature vectors, I'm using them to train an SVM model:

```python
clf = SVC(kernel='linear', C=1.0, random_state=42)
clf.fit(X, y)
```

## Inference

Once the model is trained, I can use it to predict whether a new, unseen image is a grocery receipt or not. I'll use the same DINOv2 model as a feature extractor, and then pass the extracted features to the trained SVM.

```python
img = Image.open('img.jpg')
img = transforms(img)
embedding = dino(img).squeeze(0).detach().numpy()
prediction = clf.predict(embedding.reshape(1, -1))[0]
```

## Clustering

In `clustering.ipynb`, I have some code to visualize the embeddings and also to look at similar images. 

It can be useful to look through the predictions to see if there are any false positives. One failure case I noticed was false positives on Costco receipts.

## Dataset

I scraped the dataset from Twitter by doing a search for Costco receipts. Obviously, this isn't the most representative dataset since it's only one store and a lot of people share their Costco receipts on Twitter. However, this was good enough to test out the approach. 

Ideally, we could scrape Google Maps for every grocery store and get a representative dataset. However, I didn't want to spend too much time on this.

## Next Steps

This was really just a quick experiment to see if I could use large vision models to look at grocery receipts. There are a few enhancements that can be done:

1. Dataset: Scraping Google Maps to get a representative dataset would be a good idea.
2. Classifier: The SVM and DINOv2 approach is good enough. However, there are probably better classifiers that can be used.
3. OCRing: I didn't OCR the images and just used the raw images. It might be useful to OCR the images and use the text as features.

## Notes from 2026:

By 2026, I would only use an SVM if I was directly comparing it with a fine-tuned model. If I were to do this today, I'd probably use a VLM like Qwen3.5-4B and fine-tune it on the grocery receipt dataset. It's likely that the VLM would be able to generalize better than the SVM.

I'm still curious about whether we can use VLMs to classify images. Grocery receipts are just one example. You can imagine other uses like classifying images of cars or classifying images of food, where the images are very similar.