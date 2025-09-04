#!/bin/bash

# This script helps you set up your Gemini API Key
# in Google Secret Manager, which is required for the ideas-app.

. "$(dirname "$0")/.env" # Source the .env file

if [ -n "${GEMINI_API_KEY}" ]; then
  echo "--- Ready to create Gemini API Key secret ---"
  echo ""
  echo "Copy and paste the following command into your terminal to create the secret:"
  echo ""
  echo "gcloud secrets create ideas-app-gemini-api-key \
  --project=\"${PROJECT_ID}\" \
  --data-file=-" \
  "<<< \"${GEMINI_API_KEY}\""
  echo ""
  echo "--------------------------------------------------"
else
  echo "--- Gemini API Key Setup ---"
  echo ""
  echo "Step 1: Obtain your Gemini API Key."
  echo "  You can get one from Google AI Studio or Google Cloud Console."
  echo ""
  echo "Step 2: Store your Gemini API Key in infra/.env as GEMINI_API_KEY"
  echo "  Example in infra/.env: GEMINI_API_KEY=\"your_gemini_api_key_here\""
  echo "  DO NOT commit your .env file to your repository."
  echo ""
  echo "Step 3: Run this script again to get the gcloud command."
  echo ""
  echo "--------------------------------------------------"
fi
