#!/bin/bash

# this script has initialization need to adapt from Paul Datta demo

set -euo pipefail

SCRIPT_DIR="$(dirname "$0")"

. "$SCRIPT_DIR/.env"

echo "☁️ PROJECT_ID: $PROJECT_ID"
echo "☁️ CLOUD_REGION: $CLOUD_REGION"

gcloud config set project "$PROJECT_ID"

gsutil mb -l "$CLOUD_REGION" "gs://${PROJECT_ID}-tf2" ||
    gsutil versioning set on "gs://${PROJECT_ID}-tf2" ||
        echo "Probably bucket exists or gsutil is broken"


echo "Remember to do: gcloud auth application-default login"
