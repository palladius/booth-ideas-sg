#!/bin/bash
set -euo pipefail

# Check for jq
if ! command -v jq &> /dev/null
then
    echo "Error: jq is not installed. Please install it to run this script."
    exit 1
fi

JSON_FILE="gh-pages/palladius.json"
LOCAL_APPS_DIR="random-app-ideas"

# Temporary files for storing app data
JSON_APPS_TMP=$(mktemp)
LOCAL_APPS_TMP=$(mktemp)

# Ensure temporary files are removed on exit
trap "rm -f $JSON_APPS_TMP $LOCAL_APPS_TMP" EXIT

# --- 1. Get apps from JSON ---
jq -r '.ideas[] | select(.appName != null) | "\(.appName)\t\(.number)"' "$JSON_FILE" > "$JSON_APPS_TMP"

# --- 2. Get apps from local folders ---
for dir in "${LOCAL_APPS_DIR}"/*/;
    do
    dir_name=$(basename "$dir")
    if [[ "$dir_name" =~ ^([0-9]+)--(.+)$ ]]
        then
        issue_id="${BASH_REMATCH[1]}"
        app_name="${BASH_REMATCH[2]}"
        echo -e "${app_name}\t${issue_id}" >> "$LOCAL_APPS_TMP"
    fi
done

# --- 3. Categorize and output ---

echo "## 📊 App Reconciliation Report"
echo ""

# Category 1: Apps correctly in both places
echo "### ✅ Apps in both local folders and JSON"
echo ""
found_in_both=false
while IFS=$'\t' read -r local_app_name local_issue_id
    do
    # Check if this local app exists in the JSON apps
    if grep -q -E "^${local_app_name}\t" "$JSON_APPS_TMP"
        then
        # Verify the issue ID matches and the folder exists
        json_entry=$(grep -E "^${local_app_name}\t" "$JSON_APPS_TMP")
        json_issue_id=$(echo "$json_entry" | cut -f2)
        expected_local_path="${LOCAL_APPS_DIR}/${json_issue_id}--${local_app_name}"
        if [ -d "$expected_local_path" ]
            then
            echo "- \\\`${local_app_name}\\\` (Issue ID: ${json_issue_id})"
            found_in_both=true
        fi
    fi
done < "$LOCAL_APPS_TMP"
if ! $found_in_both
    then
    echo "  _No apps found in both categories._"
fi
echo ""

# Category 2: Apps in local folder but not in the JSON
echo "### ⚠️ Apps in local folders but NOT in JSON"
echo ""
found_only_local=false
while IFS=$'\t' read -r local_app_name local_issue_id
    do
    if ! grep -q -E "^${local_app_name}\t" "$JSON_APPS_TMP"
        then
        echo "- \\\`${local_app_name}\\\` (Local path: ${LOCAL_APPS_DIR}/${local_issue_id}--${local_app_name})"
        found_only_local=true
    fi
done < "$LOCAL_APPS_TMP"
if ! $found_only_local
    then
    echo "  _No apps found only in local folders._"
fi
echo ""

# Category 3: Apps in JSON which have no local folder or pointing to non-existing local folder
echo "### ❌ Apps in JSON but NO corresponding local folder"
echo ""
found_only_json=false
while IFS=$'\t' read -r json_app_name json_issue_id
    do
    expected_local_path="${LOCAL_APPS_DIR}/${json_issue_id}--${json_app_name}"
    if [ ! -d "$expected_local_path" ]
        then
        echo "- \\\`${json_app_name}\\\` (Expected local path: ${expected_local_path})"
        found_only_json=true
    fi
done < "$JSON_APPS_TMP"
if ! $found_only_json
    then
    echo "  _No apps found only in JSON._"
fi
echo ""
