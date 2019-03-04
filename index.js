const r2Streamer = require("r2-streamer-js/dist/es7-es2016/src");
const express = require("express");
const serveStatic = require("serve-static");

async function serverStart () {

    const server = new r2Streamer.Server({
      disableDecryption: false, // deactivates the decryption of encrypted resources (Readium LCP).
      disableOPDS: false, // deactivates the HTTP routes for the OPDS "micro services" (browser, converter)
      disableReaders: false, // deactivates the built-in "readers" for ReadiumWebPubManifest (HTTP static host / route).
      disableRemotePubUrl: false, // deactivates the HTTP route for loading a remote publication.
    });

    const webpubs = serveStatic("webpubs", {
        dotfiles: "ignore",
        etag: true,
        fallthrough: false,
        immutable: true,
        index: false,
        maxAge: "1d",
        redirect: false,
        setHeaders: function(res, path) {
            server.setResponseCORS(res);
        }
    });

    server.expressUse("/webpub", webpubs);

    server.expressGet(["/webpubindex.json"], function (req, res) {

      // Optionally, to add permissive CORS headers to the HTTP response
      server.setResponseCORS(res);

      res.setHeader("Content-Type", "application/json");

      var webpubDirectory = "webpub";
      var explodedPubDirectory = "pub";

      var textIndex = {
          "chesterton-thursday": {
              id: "ZWJvb2tzL3BnMTY5NS5lcHVi",
              image: "default.jpg",
              alt: "",
              title: "The Man Who Was Thursday",
              type: "Ebook",
              pubDirectory: explodedPubDirectory
          },
          "serp-junk-food-epub": {
              id: "ZXB1YnMvc2VycC1qdW5rLWZvb2QuZXB1Yg%3D%3D",
              image: "EPUB/images/junkfood1.jpg",
              alt: "Photo of gummy worms",
              title: "Junk food: Should schools sell it?",
              type: "Article",
              pubDirectory: explodedPubDirectory
          },
          "cast-lexington": {
            id: "cast-lexington",
            image: "images/etching_source.jpg",
            alt: "Lines of British soldiers advance and shoot as American colonists run away",
            title: "What Really Happened at the Battle of Lexington?",
            type: "Documents",
            pubDirectory: webpubDirectory
          },
          "serp-children-protesting": {
            id: "serp-children-protesting",
            image: "images/childprotesting1.jpg",
            alt: "Photo of a group of protesters, some of whom are children.",
            title: "Children protesting: duty or danger?",
            type: "Article",
            pubDirectory: webpubDirectory
          },
          "serp-eating-meat": {
            id: "serp-eating-meat",
            image: "images/meat2-pointnshoot-photography.jpg",
            alt: "Photo of cheeseburger and fries",
            title: "Should people continue to eat meat?",
            type: "Article",
            pubDirectory: webpubDirectory
        },
          "serp-junk-food": {
            id: "serp-junk-food",
            image: "images/junkfood1.jpg",
            alt: "Photo of gummy worms",
            title: "Junk food: Should schools sell it?",
            type: "Article",
            pubDirectory: webpubDirectory
          },
          "serp-paper-or-plastic": {
             id: "serp-paper-or-plastic",
             image: "images/plastic-bags-duncan-hull.jpg",
             alt: "Photo of plastic bags in front of and on a fence",
             title: "Should Our Use of Paper or Plastic Be an Individual Choice or Be Regulated By the Government?",
             type: "Article",
             pubDirectory: webpubDirectory
          }
      };

      res.status(200).send(JSON.stringify(textIndex));
    });

    // First parameter: port number, zero means default (3000),
    // unless specified via the environment variable `PORT` (process.env.PORT).
    // Tip: the NPM package `portfinder` can be used to automatically find an available port number.
    const url = await server.start(3000, false);

    const publicationURLs = server.addPublications(
        [
        "epubs/serp-junk-food.epub",
        "epubs/serp-children-protesting.epub",
        "epubs/serp-paper-or-plastic.epub",
        ]);

    console.log(publicationURLs);

    const opds2 = server.publicationsOPDS();

    // Second constructor parameter: if true, HTTPS instead of HTTP, using a randomly-generated self-signed certificate.
    // Also validates encrypted HTTP header during request-request cycles, so should only be used in runtime
    // contexts where the client side has access to the private encryption key (i.e. Electron app, see r2-navigator-js)
    console.log(server.isSecured()); // false


    // http://127.0.0.1:3000
    // Note that ports 80 and 443 (HTTPS) are always implicit (ommitted).
    console.log(url);

    // `serverInfo.urlScheme` ("http")
    // `serverInfo.urlHost` ("127.0.0.1")
    // `serverInfo.urlPort` (3000)
    console.log(server.serverInfo());

    // Calls `uncachePublications()` (see below)
    // server.stop();

    // console.log(server.isStarted()); // false
};

serverStart();
