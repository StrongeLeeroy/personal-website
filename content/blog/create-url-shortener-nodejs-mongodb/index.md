---
title: Create a URL Shortener with Node.js and MongoDB
date: 2019-05-14
author: Gorka Hernández Estomba
featured: true
image: ./featured-image.png
category:
  - Node.js
  - Beginner Series
tags:
  - API
  - Array Methods
  - backend
  - developer
  - ECMAScript 2015
  - ECMAScript 6
  - endpoint
  - ES2015
  - ES6
  - express
  - express.js
  - expressjs
  - FreeCodeCamp
  - GET
  - JavaScript
  - MongoDB
  - mongoose
  - mongoose.js
  - mongoosejs
  - Node.js
  - nodejs
  - node
  - npm
  - regex
  - regexp
  - solution
  - solutions
  - ternary
---

> URL shorteners are very useful. Remembering long and tedious URL addresses, or sharing 100 character URLs with your peers is not what we would call, convenient. That's why we have services such as the *Google URL Shortener*, *Bitly* or *TinyURL*.

We are going to replicate the functionality that these pages offer to some extent. We'll start off by creating an API using Node.js and the Express framework, and will integrate with a MongoDB instance to store information making use of Mongoose.

The functionality is quite straightforward, we must implement two endpoints in our application:

- **/new/URL\_TO\_SHORTEN:** Creates a new short URL for the provided long URL.
- **/SHORT_URL:** Will redirect to the long version of the provided short URL.

Instead of babbling around, let's set up the project and install all of our dependencies.

## A quick note
We are going to use a project structure that is almost identical to the one used for the Request Header Parser Microservice, so feel free to go ahead and check it out if you want to follow along. You can also check out how to use ES6 in Node.js with Babel, as it covers a very similar set-up.

Once you have a working directory, run npm init as usual, and install the following packages:

```shell
npm install --save babel-core babel-register babel-preset-es2015 express mongoose
```

If you are not familiar with the Babel packages, I recommend that you take a look at this post first. On the other hand, if you're not familiar with Mongoose, take a look at this other article.

Once everything is set up, create your entry index.js file:

```javascript
require('babel-register');

const app = require('./src/app').app,
      PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
	console.log('URL shortener microservice listening on port', PORT);
});
```

And create the main app file in the src directory. I'll setup a basic express app:

```js
import express from 'express';

export const app = express();
```
---

## App architecture
Out app will work as follows: we'll define two endpoints as mentioned above. The `/new/LONG_URL` endpoint will take in a URL, and create a MongoDB entry with a short code that we will assign for reference. It should be smart enough to know if the URL is valid, or if that particular URL has already been made short.

We're going to keep it simple, the code is going to be a number that we'll increment as we add more URLs to the database. Here's an example:

Calling /new/https://www.google.com should insert the following document:

```json
{
  "original": "https://www.google.com",
  "shortCode": 0
}
```

And return this message:

```
Url successfully shortened: http://www.example.com/0
```

Calling that same endpoint again should not insert any documents and return the following message:

```json
{
  "error": "URL already exists in the database.",
  "url": "http://www.example.com/0"
}
```

Using an invalid URL such as `/new/thisisnotaurl` should return an error:

```json
{
  "error": "Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)"
}
```

Another valid URL will increment the code by one in the inserted document:

```json
{
  "original": "https://www.twitter.com",
  "shortCode": 1
}
```

The other endpoint, will simply take a number and redirect to the original URL. E.g.: navigating to: /1 should redirect your browser to https://www.twitter.com. If the provided code does not exists in the database, we'll return an error.

---

## Mongoose Schema
We're going to be using Mongoose to simplify communication with MongoDB. We only need to create one schema, as we are only going to be storing original URL - shortened URL pairs in our URL shortener as shown in the examples above.

Open up app.js, and let's get dirty:

```js
import express from 'express';
import mongoose from 'mongoose'; // Import mongoose

export const app = express();

// Use NodeJS promises instead of built in ones
// We only do this because the promise library
// in mongoose is now deprecated.
mongoose.Promise = global.Promise;

// Connect to your MongoDB instance and chosen collection
mongoose.connect('mongodb://localhost:27017/urlShortener');

// Set up the urlEntry schema
var urlSchema = mongoose.Schema({
  original: String,
  shortCode: { type: Number, index: true }
});

// I create an index here so it's faster to search by shortCode
urlEntrySchema.index({ shortCode: 1 });

// Now, I create the model:
var UrlEntry = mongoose.model('UrlEntry', urlEntrySchema);
```

That's it for the mongoose set up, on to the endpoints themselves now.

## Endpoint: /new
As seen in previous posts, you can user path parameters to send data through to the endpoint handler doing something like this:

```js
app.get('/new/:longUrl', (req, res) => {
  // longUrl is accessible here:
  console.log(req.params.longUrl);
});
```

The problem here, is that URLs contain slash characters within, and the path parsing in Express is going to get confused if we pass in stuff like this:

```
/new/http://www.awebsite.com/blog/post-name-here
```

Why? Because we are not going to hit /new/:longUrl. There is more than one path parameter there:

**/new**
- /http:
- /
- /www.awebsite.com
- /blog
- /post-name/here

So, what do we do? It's simple enough, instead of fixed, named path parameters, we'll use a wildcard like so:

```js
app.get('/new/*', (req, res) => {
  // Whatever follows /new is accessible at req.params[0]
  console.log(req.params[0]);
});
```

Having this knowledge, we can now implement our endpoint with the following logic:

```js
import ...

// Mongoose stuff

app.get('/new/*', (req, res) => {
  let url = req.params[0];
  if (isValidUrl(url)) {  // We'll write this function shortly
    // We check for duplicates here, if the URL has already been
    // shortened, we return the existing entry, otherwise, we create a new
    // entry and return it.
  } else {
    res.status(500).json({ error: 'Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)' });
  }
});
```

## Helper function: isValidUrl()
The isValidUrl function used above will look like so:

```js
function isValidUrl(url) {
  // Must comply to this format () means optional:
  // http(s)://(www.)domain.ext(/)(whatever follows)
  let regEx = /^https?://(S+.)?(S+.)(S+)S*/;
  return regEx.test(url);
}
```

It's a pretty simple method, it simply tests for a not-too-strict URL format and returns true or false based on the test. You can learn more about regular expressions here.

Feel free to add it to the app.js file itself, or define it in an external file and import it.

We now need to check for duplicates, we can do so using an external function that takes advantage of the Mongoose model we created, it will take in the long URL and return false if the URL does not already exists in the database, or the short code if it does:

```js
function isDuplicate(url) {
  return UrlEntry
    .findOne({ original: url })
    .then(doc => {
      return doc ? doc.shortCode : false;
    });
}
```

This function returns something that looks like a Promise. We can asynchronously perform this query and wait for the result in the endpoint defined above:

```js
import ...

// Mongoose stuff

app.get('/new/*', (req, res) => {
  let url = req.params[0];
  if (isValidUrl(url)) {
    isDuplicate(url).then(shortCode => {
      if (shortCode) {
        res.status(200).json({
          error: 'URL already exists in the database.'
          url: `http://www.example.com/${shortCode}`
        });
      } else {
        // If it's not a duplicate, we insert a new document here.
      }
    });
  } else {
    res.status(500).json({ error: 'Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)' });
  }
});

function isValidUrl(url) { /* ... */ }
function isDuplicate(url) { /* ... */ }
```

We no need to insert a new document in the database. This is a two step process, we need to generate a new code for the entry before saving anything, and it must not be repeated.

The flow is as follows:

1. Look for the entry with the highest code in the database.
2. Add 1 to it.
3. Save the new entry with the incremented code.

To make it a bit less confusing, we'll write two functions:

- `getShortCode()`: Will return a new code for us to use.
- `insertNew(url)`: will call getShortCode within and insert a new document for the given URL.

Here we go for `getShortCode`:

```js
function getShortCode() {
  return UrlEntry
    .find()  // We search without criteria
    .sort({ shortCode: -1 }) // We sort by shortCode DESCENDING
    .limit(1)  // We only return the FIRST
    .select({ _id: 0, shortCode: 1 }) // We only return the shortCode field
    .then(docs => {
      // If a document is found, we return it's shortCode plus one,
      // otherwise, we return 0, as it means there are no documents,
      // and this is the first
      return docs.length === 1 ? docs[0].shortCode + 1 : 0;
    });
}
```

Basically, we did an empty find() so every document is matched, and then ordered them so that the highest shortCode is first, and limit it so we only get that one.

Moving onto insertNew:

```js
function insertNew(url) {
  // We get a new code from getShortCode first
  // It returns a promise as it's an asynchronous action
  return getShortCode().then(newCode => {
    // We create a new UrlEntry using the mongoose model
    let newUrl = new UrlEntry({ original: url, shortCode: newCode });
    // We return the promise generated by save()
    return newUrl.save();
  });
}
```

We can now finally add this final piece to our endpoint:

```js
import ...

// Mongoose stuff

app.get('/new/*', (req, res) => {
  let url = req.params[0];
  if (isValidUrl(url)) {
    isDuplicate(url).then(shortCode => {
      if (shortCode) {
        res.status(200).json({
          error: 'URL already exists in the database.'
          url: `http://www.example.com/${shortCode}`
        });
      } else {
        insertNew(url).then(insertedDocument => {  // save() gives us the inserted document to use
          if (!insertedDocument) {
            res.status(500).json({ error: 'Unknown error' }); // Something failed for some reason.
          } else {
            res.status(200).send(`URL successfully shortened: http://www.example.com/${insertedDocument.shortCode}`); // We return the shortened URL
          }
        });
      }
    });
  } else {
    res.status(500).json({ error: 'Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)' });
  }
});

function isValidUrl(url) { /* ... */ }
function isDuplicate(url) { /* ... */ }
function getShortCode(url) { /* ... */ }
function insertNew(url) { /* ... */ }
```

Our endpoint is complete. It can now shorten URLs and will check for invalid or duplicate values. We now need an additional endpoint that will take in a shortCode and redirect the user to the original URL.

---

## Endpoint: Redirection

This one is easier than the previous. We are going to make use of the redirect() method provided by Express.  First though, we need to check if the provided shortCode is valid (is it a number?) and if there is an entry in the database with said code:

```js
import ...

// Mongoose stuff

app.get('/:shortCode', (req, res) -> {
  let shortCode = parseInt(req.params.shortCode); // We parse the input code
  if (isNaN) { // It's not a number :(
    res.status(500).json({ error: 'Invalid URL shortCode. It must be a number.' })
  } else {
    UrlEntry.findOne({ shortCode }).then(doc => {
      if (!doc) { // It does not exist as there is no result
        res.status(404).json({ error: 'Page not found' });
      } else { // It exists, we use redirect on the response with the original URL as argument
        res.redirect(doc.original);
      }
    });
  }
});

app.get('/new/*', (req, res) => { /* ... */ });

// Additional functions go here...
```

And there we go. This should set you up for success, there is a little issue though, we have hardcoded the domain for the shortened URL that we are returning. Let's create a new function so that our URL shortener returns a more dynamic result based on the domain that it lives in:

```js
function createFullUrl(req, shortCode) {
  return `${req.protocol}://${req.hostname}:${getPort()}/${shortCode}`;
}

function getPort() {
  return process.env.PORT || 8000;
}
```

This method takes in the request object and a shortCode, and returns a URL in the following format: http://www.example.com/1000

## The URL shortener
Let's put all of this together and add some import/export goodness to it.

I'm only going to tidy up out URL shortener microservice and move most functions to external files that I'll then import into our endpoints. I'm also going to move the Mongoose schema logic out of the main file. Here's the end result:

```js
require('babel-register');

const app = require('./src/app').app,
      PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
  console.log('URL shortener microservice listening on port', PORT);
});
```
```js
import express from 'express';
import mongoose from 'mongoose';

import { UrlEntry } from './urlEntry';
import { createFullUrl, isValidUrl } from './url-utils';
import { getShortCode, isDuplicate, insertNew } from './mongo-utils';

mongoose.Promise = global.Promise;

export const app = express();
mongoose.connect('mongodb://localhost:27017/urlShortener');

app.get('/:shortCode', (req, res) => {
  let shortCode = parseInt(req.params.shortCode);
  if (isNaN(shortCode)) {
    res.status(200).json({ error: 'Invalid URL shortCode. It must be a number.' })
  } else {
    UrlEntry.findOne({ shortCode }).then(doc => {
      if (!doc) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        res.redirect(doc.original);
      }
    });
  }
});

app.get('/new/*', (req, res) => {
  let url = req.params[0];
  if (isValidUrl(url)) {
    isDuplicate(url).then(exists => {
      if (exists) {
        res.status(500).json({ error: 'URL already exists in the database.', shortCode: exists });
      } else {
        insertNew(url).then(inserted => {
          res.status(200).json({ message: 'Url successfully shortened', url: createFullUrl(req, inserted.shortCode) });
        });
      }
    });
  } else {
    res.status(500).json({ error: 'Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)'});
  }
});
```

```js
export function isValidUrl(url) {
  // Must comply to this format () means optional:
  // http(s)://(www.)domain.ext(/)(whatever follows)
  let regEx = /^https?://(S+.)?(S+.)(S+)S*/;
  return regEx.test(url);
}

export function createFullUrl(req, url) {
  return `${req.protocol}://${req.hostname}:${getPort()}/${url}`;
}

function getPort() {
  return process.env.PORT || 8000;
}
```

```js
import { UrlEntry } from './urlEntry';

export function getShortCode() {
  return UrlEntry
    .find()
    .sort({ shortCode: -1 })
    .limit(1)
    .select({ _id: 0, shortCode: 1 })
    .then(docs => {
      return docs.length === 1 ? docs[0].shortCode + 1 : 0;
    });
}

export function isDuplicate(url) {
  return UrlEntry
    .findOne({ original: url})
    .then(doc => doc ? doc.shortCode : false );
}

export function insertNew(url) {
  return getShortCode().then(newCode => {
    let newUrl = new UrlEntry({ original: url, shortCode: newCode });
    return newUrl.save();
  });
}
```

```js
import mongoose from 'mongoose';

var urlEntrySchema = mongoose.Schema({
  original: String,
  shortCode: { type: Number, index: true }
});
urlEntrySchema.index({ shortCode: 1 });
urlEntrySchema.set('autoIndex', false);

export var UrlEntry = mongoose.model('UrlEntry', urlEntrySchema);
```

Your **URL shortener** is ready to go and start shortening stuff. You can now take this project a step further and implement a proper front end for it. Then, deploy it so the whole internet can use it!

Do get in touch and let me know of your queries or concerns. Stay tuned.