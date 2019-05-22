#!/usr/bin/env node
const {environment, octokit, getTargetUrl} = require("./utils")
const deploymentId = parseInt(process.argv.slice(2)[0], 10)

;(async () => {
  if (!deploymentId) return
  const targetUrl = await getTargetUrl()

  await octokit.repos.createDeploymentStatus({
    deployment_id: deploymentId,
    environment,
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    environment_url: targetUrl,
    target_url: targetUrl,
    log_url: targetUrl,
    state: "success"
  })
})()
