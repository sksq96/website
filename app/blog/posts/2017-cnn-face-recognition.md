---
title: "cnn face recognition"
publishedAt: "2017"
summary: "cnn face recognition"
reviewDraft: "true"
---

It’s been a while since I made the first commit for this project, yet I never got around to finishing it. I needed a library that could identify me in a class of 50 students, or recognize my friends from a photo on my hard drive. Face recognition using Deep Convolutional Neural Nets seemed like a perfect solution to the problem.

The delight of seeing a computer recognize your face, though, is priceless. I started this project about 5 months before starting my internship at Carnegie Mellon University. I started working on this project as an effort to understand the process of training Convolutional Neural Nets on such a large scale. I was amazed to see the results that I got in the end and the visualization of feature vectors that I obtained from the neural net.

I used Openface, a CNN based face recognition library to develop the solution. Originally, the project was geared towards automatic attendance system for schools, but I modified it to work for any large dataset.

### Face Detection

The most important feature of any face recognition library is that it should be able to detect faces *accurately*. A CNN model which tries to recognize faces is only as good as the data it is trained on. For face recognition, the face should be at the center, and the model should not have to worry about other features.

Openface uses [Dlib’s HOG + SVM and CNN](http://dlib.net/) implementation for face detection. Both of these techniques are state of the art and widely used in face recognition libraries. These work much better than other implementations such as Viola–Jones.

**Histogram of Oriented Gradients:**

The histogram of oriented gradients (HOG) is a feature descriptor used in computer vision and image processing for the purpose of object detection. I used Dlib’s face detector that uses HOG features together with a linear classifier, an image pyramid, and a sliding detection window.

**The basic idea is that even without knowing exactly what the pixel values should look like, we can still look at the *edges* that make up the object and come up with a pretty good idea of what the object looks like.**

For example, the gradients and edges of my face when looking towards the camera and when looking away from the camera are going to be fairly similar.

### Alignment

Aligning faces is very important, as it significantly improves the feature vectors for faces obtained from the neural net. Without alignment, the face recognition is not as accurate.

Once we are able to detect the facial keypoints, we can use them to align the image. This is done by warping and rotating the image in such a way that the eyes and lips are always in the same place in the resulting image.

I trained my own model on the [CASIA-WebFace](http://vm.nju.edu.cn/xiaowu/CASIA-WebFace/) dataset for alignment.

### Feature extraction

The network takes in an aligned face and outputs a 128-dimension unit vector for the face. This is the feature vector representation of the face.

This vector is later passed to a linear SVM to classify the face.

The model architecture is based on [FaceNet](https://arxiv.org/abs/1503.03832).

### Face recognition

The face recognition pipeline is as follows:

1. Obtain the feature vectors from the neural net.
2. Use k-NN classifier to predict the subject based on the feature vector.

### Clustering

As the project is meant to be used for large and unlabelled datasets, I implemented clustering algorithm to cluster the images. The clusters can later be validated by a human to obtain the labels.

DBSCAN is a good choice for this problem. It does not require to know the number of clusters to look for and it labels anomalies as *noise*.

### Visualization

![](/assets/img/blog/cnn-face-recognition/1.jpg)

t-SNE visualization of the face vectors obtained from the neural net.

The above image shows the feature vectors obtained from the neural net for *400* different people. The feature vectors are 128 dimensions, but have been reduced to 2 dimensions using t-SNE algorithm.