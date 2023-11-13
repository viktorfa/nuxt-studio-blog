---
title: Google product search vs vertex ai multimodal embeddings
date: 2023-11-13
language: english
draft: false
layout: article
---



Google offers a managed service for searching with images to find similar products called [Product Search](https://cloud.google.com/vision/product-search/docs). It's a quite neat service that allows you to do product search without manually embedding images, setting up a vector database, manipulating images etc. The pricing is quite predictable with 1 USD per 10000 images stored and 4.50 USD per 1000 queries using images.
The service has not been updated much by Google, and it has no graphical interface in the Cloud Console, which makes it a bit hard to use. This, together with the first generation of Google Cloud AI services, seem to be neglected in favor of the new [Vertex AI](https://cloud.google.com/vertex-ai-vision).

In this article I will compare the performance of managed Product Search with embedding images myself with Google Vertex's multimodal embedding. These two solutions will be referred to as _Product Search_ and _Vertex_.

## Methodology

I got target images from 380 products from one store categorized as "Eggs and diary" which form the search space. Then I found 13 test images of products from other stores or offer catalogs, all 13 judged by me to belong to the "Eggs and diary" category.

For Product Search the target images were indexed and set to the "general" category with no extra tags. Then the test images were queried to the product collection.

For Vertex multimodal the images were sent to the multimodal@001 embedding endpoint with only the image and no text. The test images were queried with scikit-learn NearestNeighbors (k=3) and cosine similarity.

## Results

::ProductSearch
::

## Discussion

Both solutions get most of the images right, and rank some images in a slightly different order when they have it right.

For "Tine Lettmelk med smak" and "Biola skogsbær/vanilje", only Product Search found a good match, while Vertex did not. These images were from offer catalogs, and had text in the foreground, which probably made the embeddings less likely to identify only the product image.

For "Philadelphia", there was no good match in the search space, so both solutions found other matches, these matches having lower scores than for images where there were good matches. Both ranked butter or margarine highest.

For "Smøremyk", which had no very visually similar matches, both found similar products, i.e. butter-imitation spreads.

## Conclusion

It seems that Product Search offers a better solution than using only multimodal embeddings and KNN queries. Perhaps Product Search does something in its pipeline to identify objects and extract the most relevant part of an image. For the Vertex solution to be equally good, we might have to preprocess images to identify products before embedding them.


## On pricing and management

Product search is a ready to use service, where experts at Google have made a good solution for the specific purpose of recognizing similar products from images. One only has to upload items for it to work. Using Vertex involves more steps and is, as demonstrated, not as good without optimizing the processing pipeline.


For indexing images one time, the price is the same for Vertex and Product Search: 1 USD per 10000 images. Product Search charges this monthly, while with Vertex one could store the embeddings much more cheaply.
For querying, Product Search charges 4.50 USD per 1000 queries, while for Vertex the cost of querying would vary depending on how one would do it. If the goal is to find similar products one time, then this could be done in a Python workbench for a negligible cost. To query continuously, the cost of managing a database capable of KNN search would depend on many factors. One could perhaps assume that the cost to run a vector database such as Google Vector Search is similar to the cost of using Product Search. 

Product Search has the capability of storing metadata with products, so that it is possible to filter search results. Using Vertex, one could of course filter and sort as one wished with any database system.

Vertex multimodal embedding also allows for embedding text strings in English in the same 1408-dimensional space as images, so searching your images with only text is not possible if using Product Search.
