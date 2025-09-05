#!/bin/bash

if [ "$DEBUG" = "true" ]; then
    # Debug mode with emojis
    for app_dir in random-app-ideas/*/; do
        folder_name=$(basename "${app_dir}")
        if [ ! -f "${app_dir}screenshot.png" ]; then
            echo "❌ ${folder_name}: MISSING"
        else
            echo "✅ ${folder_name}: FOUND"
        fi
    done
else
    # Normal mode with concise output and hint
    for app_dir in random-app-ideas/*/; do
        folder_name=$(basename "${app_dir}")
        if [ ! -f "${app_dir}screenshot.png" ]; then
            echo "${folder_name}: MISSING"
        else
            echo "${folder_name}: FOUND"
        fi
    done
    echo "# set DEBUG=true to see more"
fi
