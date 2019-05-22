const Octokit = require("@octokit/rest")
const octokit = new Octokit({
  auth: process.env.GITHUB_DEPLOYMENTS_TOKEN,
  previews: ["ant-man"]
})

module.exports.octokit = octokit

module.exports.environment =
  {
    production: "production",
    master: "staging"
  }[process.env.CIRCLE_BRANCH] || "qa"

module.exports.getTargetUrl = async () => {
  const repo = await octokit.repos.get({
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME
  })
  const repoId = repo.data.id
  const buildNum = process.env.CIRCLE_BUILD_NUM
  const pathToRepo = process.env.CIRCLE_WORKING_DIRECTORY.replace(
    "~",
    process.env.HOME
  )
  return `https://${buildNum}-${repoId}-gh.circle-artifacts.com/0${pathToRepo}/storybook-static/index.html`
}
