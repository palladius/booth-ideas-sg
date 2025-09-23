## Demo ideas

Some code ideas:

```markdown
## Travel Planner
Create a Travel Planner to drive around Switzerland highlighting the top places to be in a certain canton, with a Canton selector.
Every suggested location will have 1-5 stars (in emoji), a title and some comments.
Use TailwindCSS to arrange as card with some sample images. To make it look cool, download a few REAL images of swiss locations
from the internet to show them in homepage. The kanton selector will toggle them out or in the visualization, but defaults to EVERYTHING
when you open the index page.

## Italian travel planner region
Create a Travel Planner to drive around Italy. It should choose among the 20 regions (eg Sicily), and provide a map of the best
places to see in it. Please add a nice image of italy as a half-transparent background

## Cycling in Mallorca
An app to plan my bike trips around Mallorca, with ability to track elevation and distance, estimate the total effort.
It should have a login and allow a strava login. Create a basic
```

## Interactions with PR

```
@gemini-cli I see the screenshot.png is missing. Please use MCP Playwright to navigate to the app and take a screenshot and add it to the PR (both as a file, and uploaded in the GH conversation). Once done, and once verified its not an empty/blank image, label the issue with `app-has-screenshot`. I've seen quite a few blank images, not sure why; maybe you're not visiting the right URL? Or not waiting a couple of seconds for the app to properly spin up? Verify the screenshot is actually meaningful to a user.
```

## Interactions with Issue


