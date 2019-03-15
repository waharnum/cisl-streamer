// Declare dependencies
/* global module */

var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {

    "use strict";

    // Dynamically generates a config for the grunt-zip task
    var baseEpubSourceDirectory = "epubs" + path.sep + "src";
    var baseEpubDirectory = "epubs";
    var epubSourceDirs = fs.readdirSync(baseEpubSourceDirectory);
    var zipStruct = {};
    epubSourceDirs.forEach(function (epubSourceDir) {
        zipStruct[epubSourceDir] = {
            cwd: baseEpubSourceDirectory + path.sep + epubSourceDir,
            dest: baseEpubDirectory + path.sep + epubSourceDir + ".epub",
            src: baseEpubSourceDirectory + path.sep + epubSourceDir + path.sep + "**"
        };
    });

    // Project configuration.
    grunt.initConfig({
        zip: zipStruct
    });

    // Load the plugin(s):
    grunt.loadNpmTasks("grunt-zip");

    // Custom tasks:

    grunt.registerTask("createEpubs", ["zip"]);
};
