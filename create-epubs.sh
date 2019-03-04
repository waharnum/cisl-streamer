#!/bin/sh

# Creates epubs

pushd epubs/src/serp-junk-food/
zip -r ../../serp-junk-food.epub .
popd

pushd epubs/src/serp-children-protesting/
zip -r ../../serp-children-protesting.epub .
popd
