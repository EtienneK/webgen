#!/usr/bin/env bash

set -e

if [[ $# -eq 0 ]] ; then
    echo Usage: $0 PROJECT_NAME
    exit 1
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

set_package_json () {
    jq "$1" package.json > _package.json
    mv _package.json package.json
}

npm create -y hono@latest $1 -- --template=nodejs --install --pm=npm

cd $1

rm src/index.ts
cp -rT $SCRIPT_DIR/files .

set_package_json '.scripts.dev="NODE_ENV=development tsx watch src/server.ts"'
set_package_json '.scripts.start="NODE_ENV=production node dist/server.js"'

# Common packages
npm install --save \
    config \
    zod \
    htmx.org \
    @picocss/pico

npm install --save-dev \
    @types/config \
    typed-htmx \
    @types/node@latest

# Testing
npm install --save-dev vitest

set_package_json '.scripts.test="NODE_ENV=test vitest run"'
set_package_json '.scripts."test:watch"="NODE_ENV=test vitest watch"'

jq '.exclude+=["**/*.test.ts", "**/*.test.tsx", "tests"]' tsconfig.json > _tsconfig.json
mv _tsconfig.json tsconfig.json

# Linting
npm install --save-dev neostandard eslint

set_package_json '.scripts.lint="eslint"'
set_package_json '.scripts."lint:fix"="eslint --fix"'

# NPM tasks
npm run lint:fix
npm run test
npm run build

# Git
git init

git add .
git commit -m "Initial commit"

# Done
echo
echo
echo ===== DONE =====
echo
