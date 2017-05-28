#!/usr/bin/env bash
set -exu

# Clear dist/ so that we guarantee there are no stale artifacts.
rm -rf ./dist

# npm run lint
npm run tsc
npm run build:umd

echo "Please provide the new version you want upgrade for (patch, minor, major, prepatch, preminor, premajor, prerelease):"
read new_version
npm version $new_version