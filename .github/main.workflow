workflow "Deploy" {
  on = "push"
  resolves = ["Deploy Storybook"]
}

action "Deploy Storybook" {
  uses = "./actions/deploy-storybook"
  env = {
    MY_NAME = "John"
  }
  args = "\"Hello world, I'm $MY_NAME!\""
}
