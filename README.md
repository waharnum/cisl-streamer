Initial exploratory work based on the Readium2 streamer, for the CISL project.

This extends the Readium https://github.com/readium/r2-streamer-js project and serves up some of the webpub-manifest articles created for the https://github.com/cast-org/cisl-demo project.

It's extreme proof-of-concept stage right now.

# Running

1. Use
2. `npm install` for dependencies
3. `node index.js` to run the server
4. Run the CISL demo from the [streamer-experiment](https://github.com/cast-org/cisl-demo/tree/streamerExperiment) branch.
5. The CISL demo will load its texts and library from this server.
6. You can add additional texts to the (currently hand-rolled) `textIndex` variable in `index.js`; the sample ebook may not have a stable URL yet.
