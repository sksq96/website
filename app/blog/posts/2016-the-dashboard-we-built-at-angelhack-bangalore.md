---
title: "How we built Prodigy"
publishedAt: "2016-07-17"
dateBasis: "source event date; reconstructed post"
summary: "How we built Prodigy"
reviewDraft: "true"
---

I still have vivid memories of building Prodigy for the Bangalore AngelHack. The first challenge is to set up the environment: installing Python 2.7, the required libraries, and something for the frontend. We built a Flask app with D3 for the frontend and went exploring.

To understand Prodigy, take a restaurant—any restaurant. It will likely be listed on Zomato and in Google Maps. It will probably have a Twitter account too. These are the easy sources. Facebook and other social media could be mined as well, but we did not have the time.

Now let’s look at the data. Imagine you’re a business owner. A customer has just visited your restaurant and posted a review:

> “The food was awesome. Service was slow. Would come again.”

A lot can be said based on this review. It can be correlated with your competitors, the services you’re good or bad at, the services you’re good or bad at compared to your competitors, the kind of customers visiting your restaurant, the kind of food they like, and the kind of food they like compared to your competitors. The list goes on.

Prodigy uses an NLTK-based algorithm to extract the aspects and the features of the sentence. It also determines the sentiment of the sentence—negative, positive, or neutral (with a score). It then puts this on a dashboard that looks like this:

![Prodigy dashboard](/img/prodigy_dashboard.png)

We also built a map dashboard, showing the distribution of restaurants. The other tabs are not shown here for brevity.

We used NLTK to process the review and extract aspects and features. We then used VADER for sentiment analysis. Here’s a code snippet:

```python
#Get sentiment analysis from VADER
sid = SentimentIntensityAnalyzer()
ss = sid.polarity_scores(sentence)
print(ss)
#Get aspects sentiment with VADER
for x in aspects:
    ss = sid.polarity_scores(x)
    print(x)
    print(str(ss))
```

All of this looks simple on paper. The project sat at the intersection of multiple domains: data extraction, data analysis, and visualisation.

The data extraction was a hack in itself. We scrape all the data from the sites using Selenium. We also use the Twitter API for Twitter.

The real fun is visualising the data. The dashboard is built using D3. We also built a map using Processing. The dashboard is only a static representation and not connected to the backend as of now.

The way the analysis works now is a proof of concept. When analysing a review such as the one above, we get a sentiment score of 0.3. This means that the review is positive. But it neglects the fact that customers are complaining about the service. The current version of the algorithm is quite naive.

We also experimented with extracting topics using LDA and NMF, but both were slow and did not work well.