## CUJ 01: GitHub pages should be in good standing


This is the page which I show my customers during demos, so it's important it's in good standing.

This can be easily tested:

# Pages in PROD and DEV

* PROD page (published on GH): https://palladius.github.io/booth-ideas-sg/ this is the most important page
* DEV page (Local): `just run-ghpages-server-p8000` and open https://localhost:8000/ .


# Testing the UI

Use Playwright (in MCP or script mode) to navigate through the web page URL and:

1. Assert there's a title '🇨🇭 MultiEvent Idea Gallery'
2. Assert there's a multi-event selector with ast least Zurich and Singapore.
3. Homepage needs to show a few cards, 3 or more.
   1. Every card has a nice title, label (eg "Technology"), an image
   2. It should have a link to an issue.
   3. All links should work
   4. No images should be "broken".
