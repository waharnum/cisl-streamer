#!/bin/sh

# Creates epubs

for sourceDirectory in `ls epubs/src`; do
    echo $sourceDirectory
    pushd epubs/src/$sourceDirectory/
    zip -r ../../$sourceDirectory.epub .
    popd
done
