---
title: Serverless Strapi Tutorial
date: 2020-08-17T03:25:06+02:00
language: english
draft: false
---



## Motivation

The JAM Stack and Serverless are two trends in web development that have a lot going on right now. One of the most common thing to do for a web developer is to create a website with a CMS. Static sites in themselves follow the serverless paradigm of infinite scalability, pay-per-use, and no-touch operations. But we lack an all-round CMS with the same properties. 

Wordpress can be used as a headless CMS for modern front-ends, but the old giant is still not ready for more than a few use cases. There are managed CMS-es such as [Contentful](https://www.contentful.com/) and [Cosmic](https://www.cosmicjs.com/). These are good products, but are expensive for many users. Furthermore, they are not open source which entails some drawbacks such as not being very flexible.

Strapi is a leading open source headless CMS. While it's relatively new, it is popular, which means they really fill a need in the market. I have many complaints about Strapi, but they are, as far as I see it now, the best option for a general open source CMS. 

One drawback even with Strapi is that you need to host it yourself. While it's easy to spin up a server with a database, you have to be worried about scaling it. Even for hobby projects which will probably never have to scale, I feel uncomfortable knowing I might have to get my hands dirty with scaling a database and all that. 

Strapi is not made to be serverless. It is, however, possible to shoehorn a Strapi application onto AWS Lambda with the Serverless framework. Since AWS also has a MySQL compatible serverless database in Aurora, we might be able to create an infinitely scalable Strapi that requires very little ops, and costs nothing when not used. 

### What is serverless?

*It has little to do with servers.*

- **Infinitely scalable**
The infrastructure can handle spikes and sudden growth is use without problem.
- **No touch operations**
Not only is it scalable. Scaling does not require any effort. You don't manually add or remove instances. You don't write scripts to automatically do that stuff. It's taken care of in the infrastructure. You don't shut things down at night or in weekends to save money because you don't need to. You don't worry about scaling because you know it does so by itself.
- **Pay-per-use**
You only pay when things are being done. Costs are predictable and follow a smooth, linear curve. No execution means zero cost.

## Set Up Strapi

We start by setting up Strapi locally. We roughly follow the [official quick start guide](https://strapi.io/documentation/v3.x/installation/cli.html) for Strapi 3.1.

```bash
yarn create strapi-app sls-strapi --quickstart
```

This will create a basic Strapi app with the file based database SQLite in the `sls-strapi` folder. If successful, Strapi will run on `http://localhost:1337`.

![Untitled.png](Untitled.png)

![Untitled 1.png](Untitled_1.png)

While we won't use this instance of Strapi with the SQLite database, you should make at least one content type in Strapi either through the content type builder or by adding a content type in the `api/` folder. I will create a content type called **page** with a single field called **title**. Make the content type and wait for the server to restart.

![Untitled 2.png](Untitled_2.png)

Add a single item to the collection, then test that it works by getting `http://localhost:1337/pages`. You will get a `403 FORBIDDEN` message, as we need to allow unauthenticated users read access to the collection. 

![Untitled 3.png](Untitled_3.png)

Go to Roles & Permissions, edit the Public group and add permissions to read. `http://localhost:1337/pages` should now respond with your single page item.

We will come back to configuring Strapi for our serverless needs later.

## Set up Serverless

We will add some Serverless config in the same folder as our Strapi app. If you're not familiar with Serverless, you should perhaps try to deploy a simple Express app on Amazon Web Services (AWS) first, just to get some idea of how it works. To get started, check out the official [AWS quick start guide](https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/).

We install some packages and create a `serverless.yml` config and a `app.js` file to get started.

```bash
yarn add -D serverless-offline
yarn add serverless-http
```

`serverless-http` is an amazing plugin that makes it trivial to run any Node server as a Lambda function. Koa, which Strapi uses, is also supported.

`serverless-offline` is a well-made plugin that lets you run Serverless apps locally. It works well with `serverless-http` and even simulates API Gateway, which is a layer in the AWS cloud all http requests go through.

**TIP**
Use a profile in your Serverless config with AWS credentials.

::GistIsland{gist="viktorfa/909da389bfccd7255b147a63487ff7fd"}
::

::GistIsland{gist="viktorfa/8186fa9becd42baf5e83868a93de9297"}
::

You should now have `app.js` and `serverless.yml` in your root directory.

Before we try it, update the database config in `config/database.js`, so that the storage path for SQLite in the cloud is in the writeable `/tmp` directory.

::GistIsland{gist="viktorfa/da283a1381aaa6db8e7e89570ec5b08f"}
::

It should now be possible to run Strapi as a Serverless app. Test it locally by executing

```bash
sls offline
```

This will start the serverless-offline server, but Strapi won't start until you visit an endpoint. Go to `http://localhost:3000/dev/pages`. If you get a `200 OK` with the one page you created before, everything works as it should. The first response might be a bit slow, as the Strapi server takes some time to boot, but subsequent requests will be fast.

Serverless will add a `/dev` prefix to your URL path, and we need to configure Strapi to work around this later. This is a feature of API Gateway, and not easy to get around without using a custom domain.

![Untitled 4.png](Untitled_4.png)

Now that we have it working locally, maybe we should try to deploy it to the cloud just to see that everything works as it should there too. Let Serverless deploy it with:

```bash
sls deploy --verbose
```

![Untitled 5.png](Untitled_5.png)

That did not work. The size of our application is way too large for Lambda. This is a common problem when attempting to run applications that are not at all designed for Lambda, in Lambda.

Fortunately, it is quite easy to divide the Strapi monolith into a frontend and backend. Our plan is to host the frontend as a static website (which can practically be hosted anywhere), and the backend as a Serverless app in AWS Lambda.

### Trimming Strapi

First, let's follow the [official guide](https://strapi.io/documentation/v3.x/admin-panel/deploy.html#deploy-the-administration-panel-on-another-server-aws-s3-azure-etc-than-the-api) for running the admin part of Strapi separately, with some (maybe dirty) tricks to make it work well with our `/dev` path prefix. 

Edit the config of `config/server.js` to disable the admin panel, and take care of the path prefix.

::GistIsland{gist="viktorfa/23847bd9f9926872f860455329b0153e"}
::

We will also edit the build command in `package.json` to run a bash script after the normal build.

```json
// package.json
{
	...
	"build": "strapi build && ./scripts/post-build.sh",
	...
}
```

Create a script called [`post-build.sh`](http://post-build.sh) in a new folder called `scripts/`. Make it executable with:

```bash
chmod +x scripts/post-build.sh
```

::GistIsland{gist="viktorfa/4d0d3e1d9f6f317d7037bcead27f28c0"}
::

The script simply moves the bundle files in `build/` to a sub folder called `/dev` which fixes the issue with our path prefixes.

Build the admin panel with:

```bash
IS_OFFLINE=true yarn build
```

![Untitled 6.png](Untitled_6.png)

Verify that the current setup works by starting the serverless-offline app with `sls offline`, and then serve the frontend as a separate static site.

You can serve the frontend with

```bash
npm i -g serve
serve build/
```

![Untitled 7.png](Untitled_7.png)

Go to `http://localhost:5000` and check that Strapi still works. Remember to run sls offline in the background.

It may be boring to move slowly and double check everything. One thing I've learnt using Serverless and AWS Lambda is that you will spend hours debugging the most trivial things and cryptic error messages if you don't double check and isolate everything at every step.

If you can still use the Strapi admin, everything is going well.

The size of our code is still not small enough to be used in Lambda, so we need to trim more. Let's explore `node_modules`.

![Untitled 8.png](Untitled_8.png)

We see `node_modules` is a whopping 561 MB. We also see a lot of fat packages that are definitely only for frontend use, such as those containing "react", "fortawesome", or "bootstrap". We also see that some locale-data, which is just translations, use most space of all.

It would be great if Strapi automagically removed all frontend stuff from `node_modules` when we run the backend on a separate server, but I don't know of any such functionality. We will therefore manually delete some excessive packages with some simple commands we put in a bash script aptly called [`trim-node-modules.sh`](http://trim-node-modules.sh/).

::GistIsland{gist="viktorfa/972a4ea019fdd1f0861059a9299df544"}
::

Install a neat tool called *node-prune* first, which automatically removes files that are certainly unnecessary, such as Readmes etc. Get it done with:

```bash
npm i -g node-prune
chmod +x scripts/trim-node-modules.sh
./scripts/trim-node-modules.sh
```

That should reduce the size of `node_modules` to around 287MB without losing anything we need for the backend.

Finish this step by successfully deploying with:

```bash
sls deploy --verbose
```

![Untitled 9.png](Untitled_9.png)

Stack update finished... 🚀

That's what we want to see. The backend is now available online, and you can check it by visiting the generated endpoint ([https://7s7w7gyekl.execute-api.us-east-1.amazonaws.com/dev/](https://7s7w7gyekl.execute-api.us-east-1.amazonaws.com/dev/) for me). 

![Untitled 10.png](Untitled_10.png)

Our database is not at all suitable for Lambda, as it's an SQLite db where the data is stored in the local filesystem which can reset between Lambda invocations. However, it should work for demonstration purposes.

Check your logs with:

```bash
sls logs --function api --tail
```

![Untitled 11.png](Untitled_11.png)

Update `config/server.js` with the newly generated endpoint.

```jsx
// config/server.js

// ...
let url = "https://7s7w7gyekl.execute-api.us-east-1.amazonaws.com";
// ...
```

Let's build the frontend again with the new endpoint in the config. Don't forget to delete the old build folder and reinstall the frontend packages we deleted previously.

```bash
rm -rf build/
yarn
yarn build
serve build/
```

Visit `http://localhost:5000` and make sure Strapi is working as before.

## Make a serverless database and file storage

So far we have divided Strapi into two components: 1) a static website frontend and 2) a backend running on Lambda accessible through API Gateway. We will add two additional components. The backend also needs 3) a database and 4) a static file storage for images and other files we upload.

All the components should have the serverless properties. Scalable, pay-per-use, and no touch ops. For static file storage, we will use Amazon S3 file storage, which is not only highly appropriate for the task, but Strapi also comes with a plugin for S3. 

The database is more tricky. It's possible to create a DynamoDB connector to Strapi, but that would limit the index flexibility of Strapi, and remove full text search. Let's consider the options.

[Databases for Strapi Serverless](https://www.notion.so/6fefceebc6414fec8b6939e7030d409d)

DynamoDB does not work with Strapi without a connector we would have to create ourselves.

Aurora is a managed relational database offered by Amazon. It is compatible with PostgreSQL or MySQL. It has a "serverless" configuration setting which enables sleep when inactive and auto scaling. The AWS managed databases like Aurora are only available within a Virtual Private Cloud (VPC). Having our Lambda function in the same VPC means it loses internet access without further configuration and costs, so we won't use that option in this tutorial.

We can use an external database such as Mongo hosted with [Mongo Atlas](https://www.mongodb.com/cloud/atlas). It is not serverless, but it is managed and possible to scale by just upgrading a subscription. You can also host your own SQL or Mongo instance either in the Amazon cloud or somewhere else. 

We don't have a perfect database option for all uses cases. If you use Strapi as a CMS or static sites, the database performance is not a priority at all, so we choose something that is easy to set up and has a free offering. This tutorial will show how to use Mongo Atlas.

### Set up Mongo

Just [create an account](https://www.mongodb.com/cloud/atlas/register) and set up a free Mongo cluster in Atlas for the purpose of this tutorial. You must create a database user with a username and password, then get the connection URI and insert it as an environment variable to our Lambda function.

![Untitled 12.png](Untitled_12.png)

Get the connection URI string in Cluster > Connect > Connect your application.

![Untitled 13.png](Untitled_13.png)

Add the connection URI as an environment variable.

```bash
# serverless.yml
provider:
	# ...
	environment:
		MONGODB_URI "mongodb+srv://strapiowner:PASSWORD@cluster0.weldo.mongodb.net/strapi?retryWrites=true&w=majority"
```

We then edit `config/database.js` to tell Strapi to use the Mongo database. 

::GistIsland{gist="viktorfa/3975ee2e67f38e885d02b4e2c4c1097e"}
::

Lastly, install the Strapi connector for Mongo:

```bash
yarn add strapi-connector-mongoose
```

You can now start Strapi with  `sls offline` and check that it works locally by visiting `http://localhost:3000/dev`. While it should work i the cloud as well, it's good to double check by deploying with:

```bash
yarn && ./scripts/trim-node-modules.sh
sls deploy --verbose
```

### Cloudformation of S3

We create a simple S3 bucket in our Cloudformation templates. An advantage of the Serverless framework is the *infrastructure as code* comes included to a large degree, so managing resources like S3 buckets is controlled and checked in your Git repo.

We edit the `provider`, `custom`, `plugins`, and `resources` sections of our `serverless.yml` config.

::GistIsland{gist="viktorfa/76e6ee19dd53e3f1a03db360eabb5263"}
::

Install the Strapi provider for S3 upload and two other plugins:

```bash
yarn add strapi-provider-upload-aws-s3
yarn add -D serverless-apigw-binary
yarn add -D serverless-cloudformation-sub-variables
```

We need to add some config in a new file called `config/plugins.js`. S3 in Lambda works quite automagically, so the only config we need is the bucket name. Note that the BUCKET_NAME environment variable will be "[Object object]" if you run locally with `sls offline`, because we get the bucket name in `serverless.yml` with a Cloudformation *!Ref*. After you deploy, you get the name of your S3 bucket which you can use to test with S3 locally later.

::GistIsland{gist="viktorfa/6d8973dd95998b1325f4f8c981e08bf8"}
::

To create the S3 bucket, deploy with 

```bash
./scripts/trim-node-modules.sh
sls deploy --verbose
```

Once deployed, visit `http://localhost:5000` to visit the admin user interface. Go to Media Library and try to upload a file.

![Untitled 14.png](Untitled_14.png)

![Untitled 15.png](Untitled_15.png)

**File upload and API Gateway**
Uploading files when using Serverless can be a bit of a hassle. All HTTP requests goes through an Amazon service called API Gateway. This gateway processes files in a certain way. 
Uploads are often in a binary format, and we need to tell API Gateway explicitly which content types it should handle as binary files.
In Strapi the content type is `multipart/form-data`, and we configure this with the `serverless-apigw-binary` plugin. DON'T add "*/*" as a content-type, as this will break the CORS configuration of your API.

## Wrapping up

You know have a scalable Strapi instance that is paid on a pay-per-use basis. Unfortunately, we were not able to make the database as serverless as the rest of the application, but for many use, cases, such as when Strapi is a backend for a CMS to a static site, this is of little significance. 

### Multi tenancy and Strapi as headless CMS

Strapi does not support multi tenancy. Meaning if you have a portfolio of websites that use Strapi as a CMS, each website needs its own Strapi instance. This is a major weakness of Strapi in my opinion. Wordpress supports multisite config, and many hosting providers have support for unlimited Wordpress instances on a single subscription, which is possible because Wordpress supports multi tenancy.

Many managed CMSs such as Contentful charge on a per user and per project basis. Meaning you have to pay much more once you want people to cooperate on a project or you have many projects.

Our Serverless Strapi allows scalable multi tenancy with Strapi in the following way: Create a new Strapi application for each project just like we did in this tutorial. Let all projects use the same database cluster, but a different database name and user. You can now create hundreds of Strapi APIs using the same fixed cost database. The other costs are S3 file storage, Lambda invocations, and some bandwidth which is billed on a pure pay-per-use basis.

See the Git repo for this tutorial at [https://github.com/viktorfa/strapi-serverless](https://github.com/viktorfa/strapi-serverless).
