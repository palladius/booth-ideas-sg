## Context

I'm riccardo, and tryintg to understand and adapt this repo for a 🇨🇭☁️⛰️ Cloud Summit coming soon.
I'm braching and copying this repo from my colleague and friend Paul datta.

* Original: https://github.com/pauldatta/booth-ideas-sg/
* My copy: https://github.com/palladius/booth-ideas-sg/

Note I don't want to use PRs against the original, my copy will extend and grew above the original Paul Datta version.

## Repo explaination

Look at `docs/WHAT_THIS_REPO_DOES.md` to see what code and branches signify here.

Note: This is only PAST-looking, from the future (riccardo commits), we dont care. Last Paul commit is `993ba1beafa63e98ee50d606da6e9edcae438da0`: this will be our "Rubicon".

## My needs

1. I need to be able to deploy `ideas-app` somewhere. ideally to Firebase studio, or to Cloud Run.
   1. This app needs to have some sort of GITHUB token hidden somewhere.
2. I want to be able to publish github pages, similarly to Paul's https://pauldatta.github.io/booth-ideas-sg/


## Feedback loop

* Do not execute long running servers (`just run`/`npm dev`/..), or long-running processes (`tail -f`). If you have to, prepend a `timeout 30 COMMAND` to ensure you return soon.
* For `gh` pages, for instance, ask the USER to run `just run-ghpages-server-p8000` and check logs in `log/` folder.

## Git flow

* For `git`, keep VERSION and CHANGELOG updated using `gitmoji` standard.
* Ok to commit by yourself, but ASK before pushing.
* Let's just work on `main` for simplicity.

## Github interaction

* When interacting with GitHub, always SIGN yourself (since your name could be mine, or github actions, ..) with a common signature, like "\n\n-- by ♊️ Gemini CLI ⚙️, on behalf of [Riccardo/GitHubActions]" (depending if its called by Riccardo in CLI or by GitHubAction automation).
* Since for security reasons you seem unable to propose file changes under `.github/workflows/blah.yml` , try this instead: Propose a  `.github/workflows/blah.yml.gemini_cli_proposal` so we should be good.
* Do NOT change the `"maxSessionTurns": 50` in `.gemini/settings.json` please! Leave it as it is.

## Customization

1. I want to ask user for a nickname (needed) and an emoji (optional, default to swiss flag or event which is set by me on the day).
2. This will eb a multi-event demo, so i want to be able to track the event_id (emoji, date, name) somewhat. Since this whole process works on github

## Terraform

* My organization restricts public IPs, so my Cloud run instance needs to use IAP.
* Ensure its Enabled for at least ricc@google.com (and maybe more people).
* More docs on using TF with IAP are here: https://cloud.google.com/run/docs/securing/identity-aware-proxy-cloud-run

## Users apps vs Issues

I'm adopting a naming convention that links easily ISSUES to CODE. See with this example:

```bash
ls -al random-apps-ideas/
01--cuckoo-clock-app/ # Issue 1 -> https://github.com/palladius/booth-ideas-sg/issues/1 has the cuckoo-clock-app idea
02--fondue-app/ # Issue 2 -> https://github.com/palladius/booth-ideas-sg/issues/2 has the fondue idea
21--multiflag-app/ # Issue 21 -> https://github.com/palladius/booth-ideas-sg/issues/21 has the multiflag app idea
```

So:
* the code is under `random-apps-ideas/{PADDED_ISSUE_ID}--{APP_NAME}/`
  * and probably you can find a screenshot there under `random-apps-ideas/{PADDED_ISSUE_ID}--{APP_NAME}/screenshot.png`
  * Issue id is padded to 2 digits (2, 42 become 02, 42).
* Apps should have a screenshot under `random-apps-ideas/{PADDED_ISSUE_ID}--{APP_NAME}/screenshot.png`
  * Issue with a screenshot should be labelled `app-has-screenshot`.

### Missing screenshots

Missing screenshots can be found this way: `bin/find-missing-screenshots.sh`

To capture a screenshot of an application, just do this:

1. Ensure the app is running, like `cd path/to/app` and `npm run` or similar.
2. USe MCP Playwright to navigate to the local app, likely https://localhost:3000/ or https://localhost:9002/ (check the app config)
3. Take a screenshot of a reasonable area. Could be a 800x600 centered on top.
4. Once taken the screenshot, ensure it's not BLANK (eg, a white rectangle). If blank, try to add a few seconds delay for it.

## CUJs

I've created some LLM-friendly tests to be carried on mostly via Playwright.
They consist in navigating through an Endpoint and check that certain functionality is available.

* All CUJs are under `docs/CUJs/`.
* All CUJs have a number, so if I say "Execute CUJ 3", you're looking at `docs/CUJs/3-*.md` with at most some '0's padding (03, 003, ..).
  * Maybe the naming can be "cuj03-", but you got the general gist.
