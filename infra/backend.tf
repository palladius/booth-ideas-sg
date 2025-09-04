terraform {
  backend "gcs" {
    #bucket = "terraform-config-projects" # Paul version
    bucket = "rick-and-nardy-demo-tf2" # Ricc version
    prefix = "ideas-app/terraform.tfstate"
  }
}
