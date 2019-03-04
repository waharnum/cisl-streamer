#!/bin/sh

# Creates epubs

for sourceDirectory in serp-children-protesting serp-junk-food serp-paper-or-plastic serp-eating-meat; do
    echo $sourceDirectory
    pushd epubs/src/$sourceDirectory/
    zip -r ../../$sourceDirectory.epub .
    popd
done
