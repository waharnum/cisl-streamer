#!/bin/sh

# Creates epubs
# TODO: convert this to a Grunt task using https://github.com/twolfson/grunt-zip

for sourceDirectory in `ls epubs/src`; do
    echo $sourceDirectory
    pushd epubs/src/$sourceDirectory/
    zip -r ../../$sourceDirectory.epub .
    popd
done
