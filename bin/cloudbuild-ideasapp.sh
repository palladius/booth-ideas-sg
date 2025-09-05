#!/bin/bash

set -euo pipefail

APP_VERSION=$(cat ideas-app/package.json | jq -r .version)

gcloud config set project rick-and-nardy-demo
#gcloud --project=rick-and-nardy-demo builds submit --config=cloudbuild.yaml . --substitutions=COMMIT_SHA=manual-build
gcloud --project=rick-and-nardy-demo builds submit --config=cloudbuild.yaml . --substitutions="COMMIT_SHA=$APP_VERSION"
