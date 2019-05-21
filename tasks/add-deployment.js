#!/usr/bin/env node
const Octokit = require("@octokit/rest")
const octokit = new Octokit({auth: process.env.GH_AUTH_TOKEN})

const buildTargetUrl = (repoID, buildNum, pathToRepo) => {
  return `https://${buildNum}-${repoID}-gh.circle-artifacts.com/0${pathToRepo}/storybook-static/index.html`
}

;(async () => {
  const repo = await octokit.repos.get({
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME
  })

  const targetUrl = buildTargetUrl(
    repo.data.id,
    process.env.CIRCLE_BUILD_NUM,
    process.env.CIRCLE_WORKING_DIRECTORY.replace("~", process.env.HOME)
  )

  try {
    const deployment = await octokit.repos.createDeployment({
      environment: "qa",
      owner: process.env.CIRCLE_PROJECT_USERNAME,
      repo: process.env.CIRCLE_PROJECT_REPONAME,
      ref: process.env.CIRCLE_BRANCH
    })

    await octokit.repos.createDeploymentStatus({
      deployment_id: deployment.data.id,
      environment: "staging",
      owner: process.env.CIRCLE_PROJECT_USERNAME,
      repo: process.env.CIRCLE_PROJECT_REPONAME,
      target_url: targetUrl,
      description: "Deployment has completed",
      state: "success"
    })
  } catch (err) {
    const json = JSON.stringify(err)
    var fs = require("fs")
    fs.writeFile("test.json", json, "utf8", () => [])
  }
})()
