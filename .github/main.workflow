workflow "Deploy Storybook" {
  resolves = [
    "Install",
    "Lint",
    "Deploy",
  ]
  on = "push"
}

action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Lint" {
  uses = "nuxt/actions-yarn@master"
  args = "lint"
  needs = ["Install"]
}

action "Build packages" {
  uses = "nuxt/actions-yarn@master"
  args = "build"
  needs = ["Install"]
}

action "Build Storybook" {
  uses = "nuxt/actions-yarn@master"
  args = "build-storybook"
  needs = ["Build packages"]
}

action "Deploy" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Build Storybook"]
}
