
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

test-screenshot:
    ./bin/create-screenshot.sh random-app-ideas/cuckoo-clock-app
