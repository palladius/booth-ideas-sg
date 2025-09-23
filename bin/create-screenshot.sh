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
#echo "Taking screenshot..."
#node ../../script/screenshot-from-bash.js "$URL" "screenshot.png"

popd > /dev/null

echo "Screenshot process completed for $APP_DIR"