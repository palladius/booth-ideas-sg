provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = "ideas-app-repo"
  #repository_id = "${var.service_name}-repo"
  description   = "Docker repository for ${var.service_name}"
  format        = "DOCKER"
}

# Get the project number
data "google_project" "project" {}

# --- Secrets Manager ---
data "google_secret_manager_secret_version" "github_pat" {
  project = var.project_id
  secret  = var.github_pat_secret_name
}

data "google_secret_manager_secret_version" "gemini_api_key" {
  project = var.project_id
  secret  = var.gemini_api_key_secret_name
}

# --- API Services ---
# Enable the Cloud Build API
resource "google_project_service" "cloudbuild_api" {
  project            = var.project_id
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "iap_api" {
  project            = var.project_id
  service            = "iap.googleapis.com"
  disable_on_destroy = false
}

# --- IAM for Cloud Build Service Account ---
resource "google_project_iam_member" "cloudbuild_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
  depends_on = [google_project_service.cloudbuild_api]
}

resource "google_project_iam_member" "cloudbuild_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
  depends_on = [google_project_service.cloudbuild_api]
}

# --- IAM for Cloud Run Service Account to access secrets ---
resource "google_secret_manager_secret_iam_member" "github_pat_accessor" {
  project   = var.project_id
  secret_id = data.google_secret_manager_secret_version.github_pat.secret
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

resource "google_secret_manager_secret_iam_member" "gemini_api_key_accessor" {
  project   = var.project_id
  secret_id = data.google_secret_manager_secret_version.gemini_api_key.secret
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}


resource "google_cloud_run_v2_service" "default" {
  provider = google-beta
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  launch_stage = "BETA"
  iap_enabled = true

  template {
    containers {
      image = var.image_name
      ports {
        container_port = 3000
      }
      env {
        name  = "NEXT_PUBLIC_GITHUB_REPO_URL"
        value = var.github_repo_url
      }
      env {
        name = "GITHUB_PAT"
        value_source {
          secret_key_ref {
            secret  = var.github_pat_secret_name
            version = "latest"
          }
        }
      }
      env {
        name = "GEMINI_API_KEY"
        value_source {
          secret_key_ref {
            secret  = var.gemini_api_key_secret_name
            version = "latest"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    type            = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
  deletion_protection = false
}

data "google_iam_policy" "policy" {
  binding {
    role = "roles/run.invoker"
    members = [
      "serviceAccount:service-${data.google_project.project.number}@gcp-sa-iap.iam.gserviceaccount.com",
    ]
  }
}

resource "google_cloud_run_v2_service_iam_policy" "policy" {
  project = google_cloud_run_v2_service.default.project
  location = google_cloud_run_v2_service.default.location
  name = google_cloud_run_v2_service.default.name
  policy_data = data.google_iam_policy.policy.policy_data
}

resource "google_iap_web_cloud_run_service_iam_member" "googlers" {
  for_each = toset(var.iap_googlers)
  provider = google-beta
  project = google_cloud_run_v2_service.default.project
  location = google_cloud_run_v2_service.default.location
  cloud_run_service_name = google_cloud_run_v2_service.default.name
  role    = "roles/iap.httpsResourceAccessor"
  member  = "user:${each.key}@google.com"
}
