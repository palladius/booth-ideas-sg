# What this repository does

This repository contains the source code for the "Idea to Code" demo application, showcased at the Google Cloud booth during AI Asia 2025. This interactive demo showcases how generative AI can dramatically accelerate the software development lifecycle, taking a simple idea from concept to a functional, deployable prototype in minutes.

For more details, please see the [README.md](README.md).

## Folder Structure

*   `/ideas-app`: A Next.js application that provides the core functionality of the project. It includes a frontend for user interaction, backend logic for processing ideas, and integrations with AI models for code generation. It is configured for deployment on Google Cloud App Hosting.
*   `/infra`: Contains Terraform scripts for managing the infrastructure required by the application. This includes setting up necessary cloud resources like servers, databases, and networking.
*   `/media`: Stores media assets used in the project, such as images and GIFs for documentation and presentations.
*   `/prompts`: Contains templates for prompts used in the idea generation process, such as the Product Requirements Document (`prd.md`).
*   `/script`: Includes shell scripts for automating tasks, such as running demonstrations (`demo.sh`).

## Git Branches

*   `main`: The main development and production branch. All new features are merged into this branch after review.
