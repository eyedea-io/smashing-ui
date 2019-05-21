workflow "Deploy Storybook" {
  resolves = [
    "Install",
    "Lint",
    "Build packages",
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
