#!/usr/bin/env bash

# `npm whoami` errors and dies if you're not logged in,
# so we redirect the stderr output to /dev/null since we don't care.
NPM_USER=$(npm whoami 2> /dev/null)

if [ "${NPM_USER}" == "" ]; then
  echo "You must be logged in to publish. Use 'npm login'."
  exit
fi

set -ex

npm publish deploy