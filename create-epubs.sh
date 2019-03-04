#!/bin/sh

# Creates epubs

for sourceDirectory in serp-children-protesting serp-junk-food serp-paper-or-plastic; do
    echo $sourceDirectory
    pushd epubs/src/$sourceDirectory/
    zip -r ../../$sourceDirectory.epub .
    popd
done
