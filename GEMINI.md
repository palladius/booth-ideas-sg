## Context

I'm riccardo, and tryintg to understand and adapt this repo for a 🇨🇭☁️⛰️ Cloud Summit coming soon.
I'm braching and copying this repo from my colleague and friend Paul datta.

* Original: https://github.com/pauldatta/booth-ideas-sg/
* My copy: https://github.com/palladius/booth-ideas-sg/

Note I don't want to use PRs against the original, my copy will extend and grew above the original Paul Datta version.

## Repo explaination

Let's make sure a `WHAT_THIS_REPO_DOES.md` exist (if not, lets create it) with:

* what code does
* Specifically what every folder does, if its a multirepo lets break it down into its function
* What each git branch signifies. Whats the role of `main`, `gh-pages`, and so on.

Note: This is only PAST-looking, from the future (riccardo commits), we dont care. Last Paul commit is `993ba1beafa63e98ee50d606da6e9edcae438da0`: this will be our "Rubicon".

## My needs

1. I need to be able to deploy `ideas-app` somewhere. ideally to Firebase studio, or to Cloud Run.
   1. This app needs to have some sort of GITHUB token hidden somewhere.
2. I want to be able to publish github pages, similarly to Paul's https://pauldatta.github.io/booth-ideas-sg/


## Feedback loop

* Do not execute long running servers.
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
