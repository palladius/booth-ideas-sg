# lists targets
list:
    just -l

# runs the gemini tool in Semi-YOLO mode
[group('gemini')]
gemini:
    gemini -c --approval-mode auto_edit

# Runs GH Pages locally, for test.
[group('3-ghpages')]
run-ghpages-server-p8000:
    echo 'Starting localhost server on port 8000..'
    cd gh-pages/ && ./start-gh-pages-server.sh

# Creates screenshots for Cuckoo app.
[group('screenshots')]
screenshot-create-for-app1:
    time ./bin/create-screenshot.sh random-app-ideas/cuckoo-clock-app

# Creates screenshots for Fondue app.
[group('screenshots')]
screenshot-create-for-app2:
    time ./bin/create-screenshot.sh random-app-ideas/fondue-app/

# Finds folders with missing screenshots
[group('screenshots')]
[group('reconciliation')]
find-missing-screenshots:
    ./bin/find-missing-screenshots.sh

# (deterministic) Reconciles apps between local folders and JSON
[group('reconciliation')]
reconcile-apps:
    ./bin/reconcile-apps.sh

# TERRAFORM: Apply
[group('infra')]
tf-apply:
    cd infra/ && just apply
# TERRAFORM: Plan
[group('infra')]
tf-plan:
    cd infra/ && just plan

# gcloud build into Nardy. And it works!
[group('2-firebaseapp')]
gcloud-build:
    #!/bin/bash
    set -euo pipefail
    gcloud config set project rick-and-nardy-demo
    gcloud --project=rick-and-nardy-demo builds submit --config=cloudbuild.yaml . --substitutions=COMMIT_SHA=manual-build



# Runs the ideas-app locally on port 9002
[group('2-firebaseapp')]
ideas-app-run:
    #!/bin/bash
    # TODO move to subdir
    set -euo pipefail
    mkdir -p log
    set -a; source .env; set +a
    (cd ideas-app && npm install && npm run dev) >> log/ideas-app.log 2>&1 &
    echo "IdeasApp started in the background. Tailing log/ideas-app.log..."
    tail -f log/ideas-app.log

# [GC Command] Calls Gemini command to update GH Pages
[group('gemini')]
[group('reconciliation')]
[group('3-ghpages')]
gemini-reconcile-gh-pages:
    gemini -c -y -p '/ricc:update_gh_pages Do NOT ask questions - work on this task autonomously'

# [GC Command] Executes a single CUJ by its ID (find them in docs/CUJs/)
[group('gemini')]
gemini-execute-cuj CUJ_ID:
    # --allowed-tools="ShellTool(git status)"
    gemini -c -y -p '/cuj:execute-single CUJ_ID={{CUJ_ID}}'

# Deploys the gh-pages folder to GitHub Pages using the GitHub Action
[group('3-ghpages')]
deploy-gh-pages:
    gh workflow run ricc-deploy-gh-pages.yml

[group('gemini')]
gemini-archeologist-restore-palladius:
    gemini -c -y -p '/ricc:git_recover_history FILE_NAME=gh-pages/palladius.json We lost great apps there with their screenshot too.'


# Adding MCP via CLI - wow!
[group('gemini')]
gemini-add-playwright-mcp:
    gemini mcp add playwright npx @playwright/mcp@latest
    #gemini mcp add --transport sse ricc-rails8-turbo-chat-sse https://rails8-turbo-chat-dev-272932496670.europe-west10.run.app/mcp/sse
    cat .gemini/settings.json
