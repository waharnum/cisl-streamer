#!/bin/sh

# Creates epubs

for sourceDirectory in serp-children-protesting serp-junk-food; do
    echo $sourceDirectory
    pushd epubs/src/$sourceDirectory/
    zip -r ../../$sourceDirectory.epub .
    popd
done
