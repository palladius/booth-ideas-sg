# CUJ01: Click Submit on App Should Create a GitHub Issue

## Context: How it Works and Why It's Important

The `ideas-app` is designed to streamline the process of transforming raw product concepts into actionable development tasks. When a user describes an idea and submits it through the application's interface, a server action is triggered. This action performs several critical steps:

1.  **Idea Processing**: The submitted idea, along with optional emoji and nickname, is processed.
2.  **PRD Generation**: An AI model generates a comprehensive Product Requirements Document (PRD) based on the user's input.
3.  **GitHub Issue Creation**: The generated PRD, along with relevant metadata, is then used to automatically create a new GitHub issue in a pre-configured repository. This issue serves as the starting point for the development workflow, ensuring that every new idea is formally tracked and assigned.

This functionality is crucial for:
*   **Idea Tracking**: Centralizing all product ideas in a version-controlled system.
*   **Workflow Initiation**: Automatically kicking off the development process for new concepts.
*   **Accountability**: Providing a clear record of who submitted an idea (via nickname) and its initial context.
*   **Transparency**: Making the development pipeline visible to all stakeholders.

The GitHub issue title will follow the format: `[AppIdea] <Project Title> -- by <Nickname (if provided)>`. The issue body will contain the full PRD, including the submitted emoji and nickname.

## Reproduction Steps

To test that clicking the submit button successfully creates a GitHub issue:

1.  **Ensure Environment Variables are Set**:
    *   Verify that `GITHUB_PAT` (your GitHub Personal Access Token with `repo` scope) and `NEXT_PUBLIC_GITHUB_REPO_URL` (the URL of the GitHub repository where issues should be created, e.g., `https://github.com/your-org/your-repo`) are correctly set as environment variables in your shell.
    *   You can check them by running:
        ```bash
        echo $GITHUB_PAT
        echo $NEXT_PUBLIC_GITHUB_REPO_URL
        ```
    *   If not set, export them:
        ```bash
        export GITHUB_PAT="YOUR_PAT_HERE"
        export NEXT_PUBLIC_GITHUB_REPO_URL="https://github.com/YOUR_ORG/YOUR_REPO"
        ```

2.  **Start the `ideas-app` Locally**:
    *   Open your terminal in the project root directory (`/Users/ricc/git/booth-ideas-sg/`).
    *   Run the application using `just`:
        ```bash
        just ideas-app-run
        ```
    *   Wait for the server to start. You should see output indicating the app is running, typically on `http://localhost:9002/`.

3.  **Navigate to the Application**:
    *   Open a web browser and go to `http://localhost:9002/`.

4.  **Fill in the Form**:
    *   In the "Describe Your Product Concept" textarea, provide a detailed product idea (e.g., "A mobile application that uses AI to generate personalized meal plans based on user dietary preferences, available ingredients, and fitness goals.").
    *   Optionally, fill in the "Emoji" field (e.g., `💡`).
    *   Fill in the "Nickname" field (e.g., `Riccardo`).

5.  **Submit the Form**:
    *   Click the "Build Your Prototype" button.

6.  **Observe UI Logs**:
    *   Watch the real-time log messages that appear in the UI below the form. These messages will indicate the progress of the server actions (e.g., "Starting idea processing...", "Creating GitHub issue...", "GitHub issue created: #X").

7.  **Verify GitHub Issue Creation**:
    *   Navigate to the GitHub repository specified in your `NEXT_PUBLIC_GITHUB_REPO_URL` environment variable (e.g., `https://github.com/YOUR_ORG/YOUR_REPO/issues`).
    *   Confirm that a new issue has been created with:
        *   A title matching the format `[AppIdea] <Your Project Title> -- by <Your Nickname>`.
        *   A body containing the full PRD, including the emoji and nickname you provided in the form.

If all steps are successful, the functionality is working as expected.
