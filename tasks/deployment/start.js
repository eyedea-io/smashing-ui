#!/usr/bin/env node
const {environment, octokit} = require("./utils")

octokit.repos
  .createDeployment({
    environment,
    owner: process.env.CIRCLE_PROJECT_USERNAME,
    repo: process.env.CIRCLE_PROJECT_REPONAME,
    ref: process.env.CIRCLE_SHA1,
    required_contexts: []
  })
  .then(response => {
    console.log(response.data.id)
  })
  .catch(err => {
    console.log(err)
    console.log(undefined)
  })
