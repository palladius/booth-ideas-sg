#!/bin/bash

# This script checks a JSON file for issue IDs, titles, and screenshots.
# It filters out entries that do not have a screenshot.
#
# Usage:
# ./bin/check-issue-id-and-screenshots.sh path/to/your/file.json

set -euo pipefail

JSON_FILE="${1:-gh-pages/palladius.json}"

if [[ -z "$JSON_FILE" ]]; then
  echo "Usage: $0 <path/to/json/file>"
  exit 1
fi

if [[ ! -f "$JSON_FILE" ]]; then
  echo "Error: File not found at '$JSON_FILE'"
  exit 1
fi

echo "Checking for entries with screenshots in '$JSON_FILE'..."
echo "---"

jq '.ideas[] | select(.screenshot != null) | {number: .number, title: .title, screenshot: .screenshot}' "$JSON_FILE"
