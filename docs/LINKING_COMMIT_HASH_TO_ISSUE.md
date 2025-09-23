# How to Link a Commit Hash to a GitHub Issue

This document outlines the process of finding the corresponding GitHub issue for an application in the `random-app-ideas` directory when the issue number is missing from the directory name.

## 1. Find the Commit History

First, find the commit history for the specific application directory to identify the initial commit.

```bash
git log -- 'random-app-ideas/<app-name>'
```

For example, for the `colorful-dark-green-calendar-app`:

```bash
git log -- 'random-app-ideas/colorful-dark-green-calendar-app'
```

This will give you a list of commits. The first commit in the log is the one that introduced the app.

## 2. Find the Pull Request

Next, find the pull request (PR) associated with that commit. While `gh pr list --commit <commit-hash>` might seem intuitive, it's not a valid command. Instead, you can often find the PR by searching for a branch with a similar name to the app.

```bash
gh pr list --head "<branch-name>" --state all
```

For the `colorful-dark-green-calendar-app`, the branch was `colorful-dark-green-calendar`:

```bash
gh pr list --head "colorful-dark-green-calendar" --state all
```

This will return the PR number.

## 3. Find the Linked Issue

Once you have the PR number, you can inspect it to find the linked issue. The `--json linkedIssues` flag is not a valid field for `gh pr view`. Instead, you can view the PR's body and comments to find the issue number.

```bash
gh pr view <pr-number> --comments
```

If the issue number is mentioned in the PR body or comments (e.g., "closes #42" or "related to #42"), you've found it.

## 4. If No Issue is Found

If you can't find an issue number after inspecting the PR, you'll need to create a new one.

```bash
gh issue create --title "<App Name>" --body "This issue was created automatically to track the app."
```

This will create a new issue and give you the issue number.

## 5. Rename the Directory

Finally, rename the app directory to include the issue number.

```bash
git mv 'random-app-ideas/<app-name>' 'random-app-ideas/<issue-number>--<app-name>'
```

For example:

```bash
git mv 'random-app-ideas/colorful-dark-green-calendar-app' 'random-app-ideas/94--colorful-dark-green-calendar-app'
```

After renaming, commit and push the changes.
