---
title: "How to build a small and manageable website cheaply and with flexibility"
date: 2018-10-11T07:52:06+02:00
draft: false
language: english
description: "There are many complex or expensive ways to build websites. What about a simple and cheap way?"
---

Building a website is quite easy. Just some HTML, CSS and Javascript and you can make quite great things. Hosting it is also quite easy and often cost no money either, like when you use something like Firebase free tier. Making a website, hosting it, and managing content is where it's starting to get more difficult. You will need a CMS of some sort. Traditionally this locked you into a large framework such as Wordpress, Drupal or Squarespace, but quite recent inventions such as static site generators and headless CMSs mitigate that. As clients are not only web browsers anymore, but mobile devices, smart TVs, home assistants, and more, many projects require a headless CMS. Having complete ownership of your content with the possibility to migrate it anywhere is also a requirement for many of us. A static site generator or some CMSs will give you that. A problem with SSGs is that they can be quite inflexible with regards to what technologies you can use on the front end. Just using Babel and SASS in a Hugo project will turn the default superfast generator into a multistep, complicated, Webpack-configured mess. 

My ideal setup would be something like Squarespace where I have full ownership and control over the content, and I'm free to use whatever frontend I want to. It should have

- Serve content from the cloud with a restful api (like a headless CMS)
- Be editable in the cloud (like Wordpress or Squarespace)
- Be able to migrate all the content (like a self-hosted database or static site generator)
- Be able to host wherever I want

Having all this means that the data will have to live somewhere on the internet. Either a database, a Git repo, or a decentralized storage such as IPFS*. Unless all content is served dynamically through a headless CMS, we need a building step to build the static site. Services like NetlifyCMS and Forestry does this for you. After building is deployment. NetlifyCMS and Foresty do this for you, too, but I'm not sure how flexible they are with where you can deploy it. 


Strapi.io is an open-source Node CMS that you can host yourself, adding as many users as you want for no extra cost. Editing some content can trigger a hook that will build and deploy a static site with that data, or a completely dynamic client will be updated immediately. Sanity.io is a very similar but closed-source CMS. It provides a hosted backend for the content, but is quite pricey for hobbyists.

So, while there is no perfect stack for all projects, it's useful to be able to make a good decision on the stack you choose for whatever project you're working on. If it's something small that only you are going to update, it's probably best to just use a static site generator or a single page app based on your favorite framework. Just remember to host it on Github and write a readme for how to build and deploy it, so that everything is smooth when you switch to a new computer. If you don't wanna open an editor and do the build and deploy steps on your computer, you need to be able to edit, build, and deploy in the cloud. For a small project, maybe it's just best to use Netlify or Forestry with their free-tier. If you have bigger plans, and you're trying to make something scalable, you need to be more creative. Maybe you plan to have many users with different privileges. Maybe you want backups, many different data types with special widget editors. Maybe the pricing plans of the services don't work for you. Maybe you have an agency or want to create a platform for making a special kind of website. I really don't know how to handle this. Using different services might lock you in and be expensive. Hosting your own things have their own kinds of problems. 

I'll try to experiment and build some more, and try to write about how it went.



\* These technologies are cutting edge and not widely used at all, but it's very interesting to see how people experiment with them. If someone creates a user-friendly way to save something on IPFS with high availability (Fileocoin), it might open up a swath of new possibilities in static site hosting. Imagine just storing a complete static site project on IPFS, make changes and build the entire site in the browser. The site can then be previewed and deployed directly to IPFS. It will only require authentication with a private key that can be retrieved with a username-password or 2fa behind a cloud function or something. CMS, editor, building, deployment – all in the browser accessible from anywhere.  
