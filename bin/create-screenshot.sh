#!/bin/bash

APP_PATH=$1
SCREENSHOT_WIDTH=${2:-1024}
SCREENSHOT_HEIGHT=${3:-768}

if [ -z "$APP_PATH" ]; then
  echo "Usage: $0 <APP_PATH> [SCREENSHOT_WIDTH] [SCREENSHOT_HEIGHT] # WxH are optional"
  exit 1
fi

echo "Processing app: $APP_PATH"

# Navigate to the app directory
pushd "$APP_PATH" > /dev/null

echo "Running npm install..."
npm install

echo "Running npm build..."
npm run build

echo "Starting app in background..."
npm start &
APP_PID=$!
echo "App started with PID: $APP_PID"

sleep 10 # Give the app some time to start

echo "Taking screenshot..."
# Assuming screenshot.js is in the root of the project
node /Users/ricc/git/booth-ideas-sg/script/screenshot-from-bash.js "$SCREENSHOT_WIDTH" "$SCREENSHOT_HEIGHT"


echo "Killing app process (PID: $APP_PID)..."
kill $APP_PID

popd > /dev/null

echo "Screenshot process completed for $APP_PATH"
