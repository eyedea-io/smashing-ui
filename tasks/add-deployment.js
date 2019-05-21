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

  const deployment = await octokit.repos.createDeployment({
    environment: "staging",
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    ref: process.env.CIRCLE_SHA1
  })

  octokit.repos.createDeploymentStatus({
    deployment_id: deployment.data.id,
    environment: "staging",
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    log_url: link,
    state: "success"
  })

  // await octokit.issues.createComment({
  //   owner: process.env.CIRCLE_PROJECT_USERNAME,
  //   repo: process.env.CIRCLE_PROJECT_REPONAME,
  //   issue_number: process.env.CIRCLE_PULL_REQUEST.split("/").pop(),
  //   body: `Link to: [Storybook](${link})`
  // })
})()
