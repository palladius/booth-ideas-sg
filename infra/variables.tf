variable "project_id" {
  description = "The Google Cloud project ID."
  type        = string
}

variable "region" {
  description = "The Google Cloud region to deploy resources in."
  type        = string
  default     = "europe-west1"
}

variable "service_name" {
  description = "The name of the Cloud Run service."
  type        = string
  #default     = "ideas-app-original"
  default     = "ideas-app"
}

variable "image_name" {
  description = "The full name of the container image in Artifact Registry (e.g., REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:tag). If not provided, Cloud Build will deploy the actual image."
  type        = string
  default     = null
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
  default     = "https://github.com/palladius/booth-ideas-sg/"
}

variable "iap_googlers" {
  description = "A list of Google employees (by username) to grant IAP access."
  type        = list(string)
  default     = []
}
