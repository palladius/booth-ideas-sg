# Changelog

## [1.0.16] - 2025-09-05

### Fixed
- 🛠️ Reconciled app data: created missing app directories and updated `gh-pages/palladius.json` with new app entries.

## [1.0.15] - 2025-09-05

### Fixed
- 🏛️ Recovered `gh-pages/palladius.json` to restore "fondue app" and remove unwanted "7.x pages".

## [1.0.14] - 2025-09-05

### Added
- 🔍 Added `just reconcile-apps` command and script to compare local apps with JSON data.

## [1.0.13] - 2025-09-05

### Added
- ✨ Added `just find-missing-screenshots` command and script to identify apps missing screenshots.

## [1.0.12] - 2025-09-04

### Fixed
- 🐛 Restored `justfile` and re-applied GitHub issue title format.

## [1.0.11] - 2025-09-04

### Changed
- 📝 Updated GitHub issue title format to "[AppIdea] TITLE OF ISSUE -- by NICKNAME".

## [1.0.10] - 2025-09-04

### Added
- ✨ Added emoji and nickname to GitHub issue creation for PRDs.

## [1.0.9] - 2025-09-04

### Added
- 🚀 Triggered a manual Cloud Build to deploy the `ideas-app`.

## [1.0.8] - 2025-09-04

### Security
- 🔒 Enabled IAP for the Cloud Run service.
- 🔒 Added `ricc@google.com` and `strebel@google.com` to the IAP.

## [1.0.7] - 2025-09-04

### Added
- 🚀 Deployed the `ideas-app` to Cloud Run using Terraform.

## [1.0.6] - 2025-09-04

### Added
- Screenshot for fondue-app.

## [1.0.5] - 2025-09-03

### Changed
- Updated `WHAT_THIS_REPO_DOES.md` with detailed explanations of code, folder structure, and Git branches (main and gh-pages).

## [1.0.4] - 2025-09-03

### Changed
- Disabled legacy Gemini workflows by moving them to a `.disabled` directory.

## [1.0.3] - 2025-09-03

### Fixed
- Corrected multi-day timeline rendering.
- Restored `palladius.json` to the correct version.

## [1.0.2] - 2025-09-03

### Fixed
- Restored `palladius.json` to the correct version.
- Fixed CSS for the multi-day timeline.

## [1.0.1] - 2025-09-03

### Added
- Color-coded timeline dots to indicate past, present, and future events.