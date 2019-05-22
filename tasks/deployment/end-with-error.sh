#!/bin/sh

set -eu

owner=${CIRCLE_PROJECT_USERNAME}
repo=${CIRCLE_PROJECT_REPONAME}
token=${GITHUB_DEPLOYMENTS_TOKEN:?"Missing GITHUB_TOKEN environment variable"}

if ! deployment_id=$(cat deployment); then
  echo "Deployment ID was not found" 1>&2
  exit 3
fi

if ! deployment=$(curl -s \
                  -X POST \
                  -H "Authorization: bearer ${token}" \
                  -d "{\"state\": \"error\", \"environment\": \"storybook\"}" \
                  -H "Content-Type: application/json" \
                  "https://api.github.com/repos/${owner}/${repo}/deployments/${deployment_id}/statuses" > res); then
  echo "POSTing deployment status failed, exiting (not failing build)" 1>&2
  exit 1
fi
