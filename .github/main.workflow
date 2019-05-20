workflow "Build" {
  on = "push"
  resolves = ["Yarn: Lint", "Yarn: build:esm", "Yarn: build:cjs"]
}

action "Yarn: Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Yarn: build:cjs" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Yarn: Install"]
  args = "build:cjs"
}

action "Yarn: Lint" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Yarn: Install"]
  args = "lint"
}

action "Yarn: build:esm" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Yarn: Install"]
  args = "build:esm"
}
