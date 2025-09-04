#!/bin/bash
set -e
DEST_DIR="gh-pages/images/random-app-ideas/screenshots"
mkdir -p "$DEST_DIR"
for dir in random-app-ideas/*--*; do
    if [ -f "$dir/screenshot.png" ]; then
        appName=$(basename "$dir" | cut -d'-' -f3-)
        cp "$dir/screenshot.png" "$DEST_DIR/$appName.png"
        echo "Copied screenshot for $appName"
    fi
done
