const r2Streamer = require("r2-streamer-js/dist/es7-es2016/src");

async function serverStart () {

    const server = new r2Streamer.Server({
      disableDecryption: false, // deactivates the decryption of encrypted resources (Readium LCP).
      disableOPDS: false, // deactivates the HTTP routes for the OPDS "micro services" (browser, converter)
      disableReaders: false, // deactivates the built-in "readers" for ReadiumWebPubManifest (HTTP static host / route).
      disableRemotePubUrl: false, // deactivates the HTTP route for loading a remote publication.
    });

    // First parameter: port number, zero means default (3000),
    // unless specified via the environment variable `PORT` (process.env.PORT).
    // Tip: the NPM package `portfinder` can be used to automatically find an available port number.
    const url = await server.start(3000, false);

    const publicationURLs = server.addPublications(
        [        
        "pubs/pg1695.epub"
        ]);

    console.log(publicationURLs);

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
