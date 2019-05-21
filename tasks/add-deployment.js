#!/usr/bin/env node
const Octokit = require("@octokit/rest")
const octokit = new Octokit({auth: process.env.GH_AUTH_TOKEN})

const buildLink = (repoID, buildNum, pathToRepo) => {
  return `https://${buildNum}-${repoID}-gh.circle-artifacts.com/0${pathToRepo}/storybook-static/index.html`
}

;(async () => {
  const repo = await octokit.repos.get({
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME
  })

  const link = buildLink(
    repo.data.id,
    process.env.CIRCLE_BUILD_NUM,
    process.env.CIRCLE_WORKING_DIRECTORY.replace("~", process.env.HOME)
  )

  console.log("Link:", link)

  octokit.repos.createDeploymentStatus({
    environment: "staging",
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    deployment_id: process.env.CIRCLE_BUILD_NUM,
    description: "Storybook",
    log_url: link
  })

  // await octokit.issues.createComment({
  //   owner: process.env.CIRCLE_PROJECT_USERNAME,
  //   repo: process.env.CIRCLE_PROJECT_REPONAME,
  //   issue_number: process.env.CIRCLE_PULL_REQUEST.split("/").pop(),
  //   body: `Link to: [Storybook](${link})`
  // })
})()
