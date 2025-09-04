#!/bin/bash

# This script helps you set up your GitHub Personal Access Token (PAT)
# in Google Secret Manager, which is required for the ideas-app.

. "$(dirname "$0")/.env" # Source the .env file

if [ -n "${GITHUB_TOKEN}" ]; then
  echo "--- Ready to create GitHub PAT secret ---"
  echo ""
  echo "Copy and paste the following command into your terminal to create the secret:"
  echo ""
  echo "echo \"${GITHUB_TOKEN}\" | gcloud secrets create ideas-app-github-pat \\"
  echo "  --project=\"${PROJECT_ID}\" \\"
  echo "  --data-file=-"
  echo ""
  echo "--------------------------------------------------"
else
  echo "--- GitHub Personal Access Token (PAT) Setup ---"
  echo ""
  echo "Step 1: Create a GitHub Personal Access Token (PAT)"
  echo "  If you don't have one, create a new PAT with the following scopes:"
  echo "  - repo (all sub-scopes)"
  echo "  - admin:org (read:org, if your repo is in an organization)"
  echo "  - workflow (to update GitHub Actions workflows)"
  echo "  You can create a PAT here: https://github.com/settings/tokens"
  echo "  Make sure to copy your PAT immediately, as you won't be able to see it again."
  echo ""
  echo "Step 2: Store your PAT in a temporary file or directly in infra/.env as GITHUB_TOKEN"
  echo "  Example in infra/.env: GITHUB_TOKEN=\"your_pat_here\""
  echo "  DO NOT commit your .env file to your repository."
  echo ""
  echo "Step 3: Run this script again to get the gcloud command."
  echo ""
  echo "--------------------------------------------------"
fi
