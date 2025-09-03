# Deployment Guide

This guide provides instructions for deploying the `ideas-app` and publishing to GitHub Pages.

## Deploying the `ideas-app`

The `ideas-app` is configured for deployment to [Firebase App Hosting](https://firebase.google.com/docs/app-hosting). Here's a summary of the steps to deploy the application:

1.  **Create a Firebase project:** If you don't have one already, create a new project in the [Firebase console](https://console.firebase.google.com/).
2.  **Set up Firebase App Hosting:** Enable App Hosting in your Firebase project and connect it to your GitHub repository.
3.  **Configure the GitHub App:**
    *   Create a new GitHub App and give it the necessary permissions (read/write access to code, issues, and pull requests).
    *   Generate a private key for the app and add it as a secret to your repository with the name `APP_PRIVATE_KEY`.
    *   Add the App ID as a variable to your repository with the name `APP_ID`.
4.  **Configure the workflow:** The `.github/workflows/gemini-cli.yml` workflow is already set up to use the GitHub App for authentication. You may need to adjust the workflow to match your specific Firebase project configuration.
5.  **Trigger the workflow:** Create a new issue in your repository to trigger the workflow and deploy the application.

### How the `GITHUB_TOKEN` is Managed

The application uses a short-lived `GITHUB_TOKEN` that is generated on-the-fly for each workflow run using a GitHub App. This is a secure way to authenticate with the GitHub API. The credentials for the GitHub App (App ID and private key) are stored in your repository's secrets and variables.

## Publishing to GitHub Pages

The original repository has a GitHub Pages site at [https://pauldatta.github.io/booth-ideas-sg/](https://pauldatta.github.io/booth-ideas-sg/). There are two common ways to publish to GitHub Pages:

1.  **Using a `gh-pages` branch:** You can create a `gh-pages` branch in your repository and push the static files for your site to that branch. GitHub will automatically build and deploy the site from that branch.
2.  **Using a custom workflow:** You can create a custom GitHub Actions workflow to build your site and deploy it to GitHub Pages. This gives you more control over the build and deployment process.

Since there is no `gh-pages` branch in this repository, it's likely that the GitHub Pages site is being built and deployed using a custom workflow. You should check your repository settings to see how GitHub Pages is configured.

The content for the GitHub Pages site is likely located in the `ideas-app/docs` directory. You can use a static site generator like [Jekyll](https://jekyllrb.com/) or [Hugo](https://gohugo.io/) to build a site from these files.
