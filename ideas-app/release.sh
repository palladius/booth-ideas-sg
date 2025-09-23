#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
# Load environment variables from .env file if it exists
if [ -f ".env" ]; then
  echo "Loading environment variables from .env file..."
  set -o allexport
  source .env
  set +o allexport
fi

# The repository you want to push the code to.
DEST_REPO_URL="https://github.com/palladius/booth-ideas-sg.git"
# A temporary directory to clone the destination repo into.
CLONE_DIR="/tmp/vibe-game-demo-clone"
# The subfolder within the destination repo to place the source code.
TARGET_SUBFOLDER="ideas-app"
# The commit message for the release.
COMMIT_MESSAGE="Release: Update $TARGET_SUBFOLDER from source repo on $(date +'%Y-%m-%d %H:%M:%S')"

# --- Pre-flight Check ---
if [ -z "$GITHUB_PAT" ]; then
  echo "Error: The GITHUB_PAT environment variable is not set or .env file not found."
  echo "Please ensure your GitHub Personal Access Token is in the .env file as GITHUB_PAT."
  exit 1
fi

# Construct the authenticated URL
AUTH_DEST_REPO_URL="https://palladius:$GITHUB_PAT@github.com/palladius/booth-ideas-sg.git"

# --- Script Logic ---

echo "Starting release process..."

# 1. Clone or update the destination repository.
if [ -d "$CLONE_DIR" ]; then
  echo "Destination repository clone found at $CLONE_DIR. Updating..."
  # Use a subshell to avoid changing the main script's directory
  (cd "$CLONE_DIR" && git remote set-url origin "$AUTH_DEST_REPO_URL" && git fetch origin && git reset --hard origin/main)
else
  echo "Cloning destination repository into $CLONE_DIR..."
  git clone "$AUTH_DEST_REPO_URL" "$CLONE_DIR"
fi

echo "Destination repository is up-to-date."

# 2. Prepare the target directory.
TARGET_DIR="$CLONE_DIR/$TARGET_SUBFOLDER"
echo "Cleaning and preparing the target directory: $TARGET_DIR"
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"

# 3. Package the source code from THIS repo and deploy it.
# We use 'git archive' to create a clean tarball of the current commit (HEAD),
# which automatically respects .gitignore. We then pipe it to 'tar' to extract
# it directly into the target subfolder in the destination repo.
echo "Packaging source code from current directory and deploying to $TARGET_DIR..."
git archive HEAD | tar -x -C "$TARGET_DIR"

# 4. Commit and push the changes to the destination repository.
echo "Changing to clone directory to commit and push..."
cd "$CLONE_DIR"

echo "Checking for changes to commit..."

# Use 'git status --porcelain' to see if there are any changes.
if [ -n "$(git status --porcelain)" ]; then
  echo "Changes detected. Committing and pushing to the destination repository..."

  # Set local git config to ensure the correct author is used for the commit.
  echo "Setting local git user for the commit..."
  git config --local user.name "Riccardo Carlesso"
  git config --local user.email "ricc+thx2nigelcheong@google.com"

  git add "$TARGET_SUBFOLDER"
  git commit -m "$COMMIT_MESSAGE"
  git push

  echo "Successfully pushed the release to $DEST_REPO_URL."
else
  echo "No changes detected. The destination repository is already up-to-date."
fi

echo "Release process finished."
