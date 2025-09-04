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
4. Clicking on a label associated to a card (eg "Health") should select/show only the cards with such label.
5. Clicking on a different event (eg "singapore") should show different cards.
6. Searching for a keyword (eg "auto") should select 0+ cards which contain that keyword. Please, choose a word which is in at least ONE card!

# Reporting back your findings

* Open an issue if you're not already working in the issue.
  * The issue should have the "CUJ" label and be visible here: https://github.com/palladius/booth-ideas-sg/issues?q=state%3Aopen%20label%3A%22CUJ%22
* Produce a checklist of the things that you checked, and in the end a big H2 "SUCCESS" or "ERROR" with some green/red emojis.
* Explain verbosely the errors you found and suggest how to fix them.
  * PRs are well accepted!
