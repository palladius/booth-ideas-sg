#!/bin/bash

APP_DIR=$1
URL=$2

if [ -z "$APP_DIR" ] || [ -z "$URL" ]; then
  echo "Usage: $0 <APP_DIR> <URL>"
  exit 1
fi

echo "Processing app: $APP_DIR"
APP_PATH="random-app-ideas/$APP_DIR"

# Navigate to the app directory
pushd "$APP_PATH" > /dev/null

echo "Taking screenshot..."
node ../../script/screenshot-from-bash.js "$URL" "screenshot.png"

popd > /dev/null

echo "Screenshot process completed for $APP_DIR"