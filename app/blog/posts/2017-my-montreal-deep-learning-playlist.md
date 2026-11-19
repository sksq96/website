---
title: "my montreal deep learning playlist"
publishedAt: "2017"
summary: "my montreal deep learning playlist"
reviewDraft: "true"
---

I was playing through [the playlist for the 2016 Montreal Deep Learning Summer School](https://www.youtube.com/playlist?list=PLXK48qYodJz84T1-5Yvvl_K19I_ZEu8pW) again, and thought I'd highlight my favorite talk so far and add a bit of detail.

[Yoshua Bengio: Deep Learning and Representations](https://www.youtube.com/watch?v=VjD4KzOEa9I)

The summary (as I understand it):

The first part of the talk covers [Distributed Representations](https://en.wikipedia.org/wiki/Distributed_representation) and the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality).

We want to learn a function f(x) that can map our input (x) to a target (y). If our input is represented in a high-dimensional space, and our target is represented in a much lower dimensional space (e.g. one-hot encoded class labels), then we are forced to learn some kind of intermediate representation.

The problem with high-dimensional spaces is that we need a lot of data in order to learn many different things. An intermediate representation can force our model to make generalizations, because it's trying to learn from a lower dimensional representation than our original input.

Distributed representations also help with generalization, because they can be combined in different ways to represent different things. A good distributed representation would require fewer dimensions than a one-hot representation, and would also be able to generalize to new concepts that may not have been seen during training.

![One-hot representation vs Distributed representation](/img/distributed.png)

This applies not only to our input representation, but also to the intermediate representations that our models learn.

For example, with images, we can think of them as a grid of pixels, each with a red, green, and blue value. That's a perfectly valid way to represent an image as a vector (a 3 * width * height sized vector). However, this doesn't let us generalize very well. Learning a representation like this will be forced to learn things that are too specific (e.g. this exact distribution of pixel values in this exact location always means the image contains a cat).

If we are able to learn an intermediate representation of our original image vector, that representation can be more useful. For example, maybe our model can learn to recognize a furry texture, or the shape of ears, or the shape of eyes. These representations are more general to the concept of a cat, and can be used to recognize many different cat images.

In the second part of the talk, Yoshua covers the motivation for unsupervised learning and the different approaches to unsupervised learning, like a recap of the last ten years in deep learning.

Yoshua's main argument is that we can use unsupervised learning to learn generalized representations of our data. We can then use these representations to improve the performance of supervised learning.

# Experiment

This week I worked on a small experiment to try to learn a mapping from the [NIST128 dataset](https://github.com/jbrownlee/Datasets), which is a set of 128x128 black and white images resized from the MNIST dataset.

Because I want to do unsupervised learning, I'm not using any labels.

The model I use for autoencoder is just a very simple convolutional autoencoder. I'm using the NIST128 dataset, but I'm down-sizing the images to 64x64, using 1/4 of the dataset (15,000 images), and only training for 5 epochs.

```python
def autoencoder(input_shape):
    return Sequential([
        Conv2D(8, (3, 3), activation="relu", padding='same', input_shape=input_shape, name="encoder_conv1"),
        MaxPooling2D((2, 2), padding='same', name="encoder_maxpool1"),
        Conv2D(4, (3, 3), activation="relu", padding='same', name="encoder_conv2"),
        MaxPooling2D((2, 2), padding='same', name="encoder_maxpool2"),
        Conv2D(4, (3, 3), activation="relu", padding='same', name="decoder_conv1"),
        UpSampling2D((2, 2), name="decoder_upsample1"),
        Conv2D(8, (3, 3), activation="relu", padding='same', name="decoder_conv2"),
        UpSampling2D((2, 2), name="decoder_upsample2"),
        Conv2D(1, (3, 3), activation="sigmoid", padding='same', name="decoder_conv3")
    ])
```

After training the autoencoder, the next step is to create a new model that uses the encoder layers of the autoencoder.

```python
def encoder(autoencoder):
    layers = [autoencoder.get_layer("encoder_conv1"),
              autoencoder.get_layer("encoder_maxpool1"),
              autoencoder.get_layer("encoder_conv2"),
              autoencoder.get_layer("encoder_maxpool2")]
    return Sequential(layers)
```

We can now use this new model (`encoder`) to generate a new set of training data to use.

```python
def encode_images(encoder, images):
    return encoder.predict(images)

X_train_encoded = encode_images(encoder, X_train)
X_test_encoded = encode_images(encoder, X_test)
```

I also tried flattening the encoded images, and using PCA to reduce the dimensionality of the data.

```python
from sklearn.decomposition import PCA

def pca_encode(images, components):
    pca = PCA(n_components=components, whiten=True)
    return pca.fit_transform(
        images.reshape((images.shape[0], images.shape[1] * images.shape[2] * images.shape[3])))

pca_components = 64
X_train_pca = pca_encode(X_train_encoded, pca_components);
X_test_pca = pca_encode(X_test_encoded, pca_components);
```

I did this just to try out different approaches. The point of the experiment is not to look at which approach gives the best results, but to compare the performance of supervised learning with and without the unsupervised approach.

I'm using a simple convolutional neural network for the supervised learning part.

```python
def classifier(input_shape, num_classes):
    return Sequential([
        Conv2D(4, (3, 3), activation="relu", padding='same', input_shape=input_shape),
        MaxPooling2D((2, 2), padding='same'),
        Conv2D(8, (3, 3), activation="relu", padding='same"),
        MaxPooling2D((2, 2), padding='same'),
        Conv2D(8, (3, 3), activation="relu", padding='same"),
        MaxPooling2D((2, 2), padding='same'),
        Conv2D(8, (3, 3), activation="relu", padding='same"),
        MaxPooling2D((2, 2), padding='same'),
        Flatten(),
        Dense(num_classes, activation='softmax')
    ])

def classifier_pca(input_shape, num_classes):
    return Sequential([
        Dense(num_classes, activation='softmax', input_shape=input_shape)
    ])
```

Training the classifier using the NIST128 dataset gives us a baseline of what the performance of our supervised learning approach is.

```
Epoch 5/5
45000/45000 [==============================] - 83s - loss: 0.1112 - acc: 0.9652 - val_loss: 0.1153 - val_acc: 0.9650
```

Then we can compare this with the classifier trained using the encoded images.

```
Epoch 5/5
45000/45000 [==============================] - 25s - loss: 0.1126 - acc: 0.9700 - val_loss: 0.1085 - val_acc: 0.9725
```

And the classifier trained using the PCA encoded images.

```
Epoch 5/5
45000/45000 [==============================] - 8s - loss: 0.1301 - acc: 0.9610 - val_loss: 0.1290 - val_acc: 0.9645
```

These results are far from conclusive, and I didn't tune the parameters at all, but I think it confirms that we can use unsupervised learning to improve the performance of supervised learning.

I'm using a simple convolutional autoencoder here, but I'm sure using different approaches, like [training with pseudo-labelling](https://blog.floydhub.com/semi-supervised-learning/) or [using a GAN to generate new images to train on](/2017/generative-adversarial-networks) would also work.