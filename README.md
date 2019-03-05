Initial exploratory work based on the Readium2 streamer, for the CISL project.

This extends the Readium https://github.com/readium/r2-streamer-js project and serves up some of the webpub-manifest articles created for the https://github.com/cast-org/cisl-demo project.

It's extreme proof-of-concept stage right now.

# Running

1. Use
2. `npm install` for dependencies
3. `./create-epubs.sh` to generate sample epubs from the source files in `epubs/src`
4. `node index.js` to run the server
5. Run the CISL demo from the [streamer-experiment](https://github.com/cast-org/cisl-demo/tree/streamerExperiment) branch.
6. The CISL demo will load its texts and library from this server.
