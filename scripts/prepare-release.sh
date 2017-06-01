#!/usr/bin/env bash
set -exu

# Clear dist/ so that we guarantee there are no stale artifacts.
rm -rf ./dist
rm -rf ./deploy

# npm run lint
npm run tsc
npm run build:umd

# deploy/ serves as a working directory to stage the release.
mkdir deploy
mkdir deploy/dist
mkdir deploy/lib

# Copy all components/ to deploy/
cp -R ./dist/* ./deploy/dist
cp -R ./lib/* ./deploy/lib
find deploy -type d -name 'spec' -exec rm -r {} +
cp package.json ./deploy

cd ./deploy

echo "Please provide the new version you want upgrade for (patch, minor, major, prepatch, preminor, premajor, prerelease):"
read new_version
npm version $new_version