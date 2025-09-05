# lists targets
list:
    just -l

# runs the gemini tool in Semi-YOLO mode
gemini:
    gemini -c --approval-mode auto_edit

# Runs GH Pages locally, for test.
run-ghpages-server-p8000:
    echo 'Starting localhost server on port 8000..'
    cd gh-pages/ && ./start-gh-pages-server.sh

# Creates screenshots for Cuckoo app.
test-screenshot:
    time ./bin/create-screenshot.sh random-app-ideas/cuckoo-clock-app

# Creates screenshots for Fondue app.
test-screenshot-fondue:
    time ./bin/create-screenshot.sh random-app-ideas/fondue-app/

# Finds folders with missing screenshots
find-missing-screenshots:
    ./bin/find-missing-screenshots.sh

# Reconciles apps between local folders and JSON
reconcile-apps:
    ./bin/reconcile-apps.sh

# TERRAFORM: Apply
tf-apply:
    cd infra/ && just apply
# TERRAFORM: Plan
tf-plan:
    cd infra/ && just plan

# gcloud build into Nardy. And it works!
gcloud-build:
    #!/bin/bash
    set -euo pipefail
    gcloud config set project rick-and-nardy-demo
    gcloud --project=rick-and-nardy-demo builds submit --config=cloudbuild.yaml . --substitutions=COMMIT_SHA=manual-build

# Runs the ideas-app locally on port 9002
ideas-app-run:
    #!/bin/bash
    set -euo pipefail
    mkdir -p log
    set -a; source .env; set +a
    (cd ideas-app && npm install && npm run dev) >> log/ideas-app.log 2>&1 &
    echo "IdeasApp started in the background. Tailing log/ideas-app.log..."
    tail -f log/ideas-app.log

# [GC Command] Calls Gemini command to update GH Pages
gemini-reconcile-gh-pages:
    gemini -c -y -p '/ricc:update_gh_pages Do NOT ask questions - work on this task autonomously'

gemini-execute-cuj CUJ_ID:
    # --allowed-tools="ShellTool(git status)"
    gemini -c -y -p '/cuj:execute-single CUJ_ID={{CUJ_ID}}'

# Deploys the gh-pages folder to GitHub Pages using the GitHub Action
deploy-gh-pages:
    gh workflow run ricc-deploy-gh-pages.yml
