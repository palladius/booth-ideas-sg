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
npm run preview -- --port 3000 &
APP_PID=$!
echo "App started with PID: $APP_PID"

echo "Waiting for app to be ready..."
for i in {1..10}; do
  if curl -s http://localhost:3000 > /dev/null; then
    echo "App is ready!"
    break
  fi
  sleep 1
done

if ! curl -s http://localhost:3000 > /dev/null; then
  echo "App failed to start!"
  kill $APP_PID
  exit 1
fi

sleep 2 # Give the app some extra time to render

echo "Taking screenshot..."
# Assuming screenshot.js is in the root of the project
node ../../script/screenshot-from-bash.js "$SCREENSHOT_WIDTH" "$SCREENSHOT_HEIGHT"


echo "Killing app process (PID: $APP_PID)..."
kill $APP_PID

popd > /dev/null

echo "Screenshot process completed for $APP_PATH"
