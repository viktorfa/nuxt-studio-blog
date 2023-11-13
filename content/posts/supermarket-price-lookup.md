---
title: "Supermarket Price Lookup"
date: 2018-11-15T14:42:46+01:00
language: english
type: post
---

There is no service that lets consumers easily look up and compare prices on common products typically sold in supermarkets, such as groceries. This article will discuss whether it makes sense making an online tool for doing so.

### Price lookup and comparison

Almost all other products have some online tool for looking up and comparing prices. The most well-known in Norway is [Prisjakt](https://prisjakt.no) which compares products that online stores feed to Prisjakt's database. It works as markering for the online stores and Prisjakt makes money by being an affiliate. Due to many reasons, groceries and other products sold at supermarkets are not included in Prisjakt's or and of their competitors' databases.

### Supermarket catalogs

All supermarkets in Norway publish a catalog with special offers every week or every few weeks. The quality of the offers vary. Some are indeed very cheap and actually sold at a loss by the stores, while some are made to look like offers while not actually being cheaper than similar products with their competitors. The offers may vary regionally in Norway, so each region typically has its own catalog. The set of offers are, however, often overlapping across regions. The catalogs are interesting because there exist very successful apps – both in terms of active users and value [1] – that merely presents the supermarket catalogs in a digital format. The weakness of these apps is that their listings are limited to what is published in the catalogs, and in the case of Mattilbud, not indexed and searchable, so that the user has to manually scroll through every catalog.

### Other offers

Supermarkets also often have offers not published in the catalogs. These are made by independent franchised stores. They are typically marketed on signs outside and inside the physical stores. They can also not be marketed at all, and only discoverable by looking at the product's price tag inside the store.

### Prices in online supermarkets

The most significant innovation in the supermarket business lately has been the introduction of online supermarkets such as [kolonial.no](https://kolonial.no). These are interesting for us because they provide a full overview of prices for all typical products. A simple web scraping bot can thrawl their online catalog and save all prices in a database, so that the price and price history of every product is searchable and can be compared to other supermarkets. This allow us to automatically assess the quality of an offer by comparing the price to that of the price in the online supermarket. The prices on kolonial.no are typically the same or 1-5% higher than in the cheap Rema 1000 chain.

### Current situation

The app Mattilbud in Norway and Shopgun in Denmark have been wildly successful considering all they do is showing a collection of digital catalogs. There is a quite popular Facebook group for sharing various offers in Norwegian supermarkets called [Tilbud og priskriger](https://www.facebook.com/groups/1522454624723003/) with 24199 members. Members often ask about some good offers and share good offers they have discovered. It seems like Pepsi Max and Grandiosa are the most popular products here. This is done manually and there is no easy way to search for prices of products among all supermarkets in Norway.

### Suggestion for new application

Our idea is to make a website/PWA/app that is backed by a reasonably up-to-date database with prices of all popular supermarket products in Norway, including offers in the catalogs. The data is gathered by scraping the online supermarkets (kolonial, meny, europris) and using Shopgun's API to get the catalog offers in a digital format. Additional sources can be users' contributions and receipt scanning, but these are hard to implement, and the app should work well without them. The app simply has a text input box for searching for products names or categories. It may have a top list of relevant offers for the user. It can be customized for each user by using their location, history, or user submitted information.

### Arguments against the new application

- The main competitor, Mattilbud, can easily implement a search function themselves
- It's not clear whether users actually want a search function, or any of the new features the new app can have
- It's very hard to market a new app to a general audience
- It's hard to maintain high quality data about prices as they vary across time, regions, and individual stores

### Arguments in favor of the new application

- There is usually space for some competition in a profitable market
- No current apps collect prices from products not listed in catalogs
- Mattilbud in Norway is not as popular as Shopgun in Denmark, maybe because Mattilbud is not as good as Shopgun
- Making a MVP and marketing it for free in Facebook groups is not expensive or very time consuming
- Mattilbud is only available as a native app on Android or iOS
- User contributions can allow independent supermarkets such as immigrant stores, which often has better goods and lower prices than the main chains, to get the promotion they deserve, and help break the supermarket oligopoly in Norway

\[1\] [Shopgun buys Mattilbud for 7-figure sum (NOK)](https://e24.no/naeringsliv/danske-shopgun-kjoeper-den-norske-appen-mattilbud-for-tosifret-millionbeloep/24416671)

Online supermarkets:

- [kolonial.no](https://kolonial.no) (Norway)
- [Meny](https://meny.no/varer) (Norway)
- [Europris](https://www.europris.no/) (Norway)
- [mat.se](https://www.mat.se/) (Sweden)

Offer catalog apps:

- [Shopgun](https://shopgun.com/) (Norway, Denmark, ++)
- [Mattilbud](http://www.mattilbud.com/) (Norway)
