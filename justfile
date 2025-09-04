
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

