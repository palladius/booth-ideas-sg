# Product Requirements Document: Multiflag Emoji App

## 1. Overview & Vision

*   **Concept:** A simple web app to find and copy country flag emojis, filterable by continent.
*   **Goal:** To provide a quick and easy way to find and copy country flag emojis.
*   **Target Audience:** Anyone who needs to use country flag emojis.

## 2. Core Functionality & Features

- [ ] Display a list of all country flag emojis.
- [ ] Provide buttons to filter the list of emojis by continent (Europe, Asia, Africa, North America, South America, Oceania).
- [ ] Clicking on a flag emoji copies it to the clipboard.
- [ ] A search bar to filter emojis by country name.

## 3. Technical Implementation Constraints

The AI developer MUST adhere to the following constraints to ensure the project is self-contained and suitable for static hosting:

*   **Technology Stack:** Use only vanilla HTML, CSS, and JavaScript. Do not use any frontend frameworks or libraries (like React, Vue, jQuery, etc.).
*   **File Structure:** The entire application must be contained within three separate files: `index.html`, `style.css`, and `script.js`.
*   **Self-Contained:** The `index.html` file must correctly link the other two files. No external dependencies (like CDNs) should be used.
*   **Styling:** All styling must be in the `style.css` file. The design should be clean, modern, and responsive.
*   **Functionality:** All interactive logic must be in the `script.js` file, which will directly manipulate the DOM.
*   **Completeness:** The code must be a fully functional prototype of the core features listed above.
