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

# TERRAFORM: Apply
tf-apply:
    cd infra/ && just apply
# TERRAFORM: Plan
tf-plan:
    cd infra/ && just plan

# gcloud build into Nardy. And it works!
gcloud-build:
    gcloud --project=rick-and-nardy-demo builds submit --config=cloudbuild.yaml . --substitutions=COMMIT_SHA=manual-build

# Runs the ideas-app locally on port 9002
ideas-app-run:
    cd ideas-app && npm install && npm run dev

# [GC Command] Calls Gemini command to update GH Pages
gemini-reconcile:
    gemini -c -y -p '/ricc:update_gh_pages Do NOT ask questions - work on this task autonomously'

update-gh-pages:
    @just gemini-reconcile

# Deploys the gh-pages folder to GitHub Pages using the GitHub Action
deploy-gh-pages:
    gh workflow run ricc-deploy-gh-pages.yml
