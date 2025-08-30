variable "project_id" {
  description = "The Google Cloud project ID."
  type        = string
}

variable "region" {
  description = "The Google Cloud region to deploy resources in."
  type        = string
  default     = "asia-southeast1"
}

variable "service_name" {
  description = "The name of the Cloud Run service."
  type        = string
  default     = "ideas-app"
}

variable "image_name" {
  description = "The full name of the container image in Artifact Registry (e.g., REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:tag)."
  type        = string
  # This will be a placeholder, as Cloud Build will deploy the actual image.
  default     = "gcr.io/cloudrun/placeholder"
}

variable "github_pat_secret_name" {
  description = "The name of the Secret Manager secret for the GitHub PAT."
  type        = string
  default     = "ideas-app-github-pat"
}

variable "gemini_api_key_secret_name" {
  description = "The name of the Secret Manager secret for the Gemini API Key."
  type        = string
  default     = "ideas-app-gemini-api-key"
}

variable "github_repo_url" {
  description = "The URL of the GitHub repository."
  type        = string
  default     = "https://github.com/pauldatta/booth-ideas-sg/"
}
