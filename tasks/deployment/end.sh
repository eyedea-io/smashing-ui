#!/bin/sh

set -eu

build_num=${CIRCLE_BUILD_NUM}
owner=${CIRCLE_PROJECT_USERNAME}
repo=${CIRCLE_PROJECT_REPONAME}
token=${GITHUB_DEPLOYMENTS_TOKEN:?"Missing GITHUB_TOKEN environment variable"}

if ! deployment_id=$(cat deployment); then
  echo "Deployment ID was not found" 1>&2
  exit 3
fi

if ! repository=$(curl -s \
                  -X GET \
                  -H "Authorization: bearer ${token}" \
                  -d "{}" \
                  -H "Content-Type: application/json" \
                  "https://api.github.com/repos/${owner}/${repo}"); then
  echo "Could not fetch repository data" 1>&2
  exit 1
fi

if ! repository_id=$(echo "${repository}" | python -c 'import sys, json; print json.load(sys.stdin)["id"]'); then
  echo "Could not extract repository ID from API response" 1>&2
  exit 3
fi

path_to_repo=$(echo "$CIRCLE_WORKING_DIRECTORY" | sed -e "s:~:$HOME:g")
url="https://${build_num}-${repository_id}-gh.circle-artifacts.com/0${path_to_repo}/storybook-static/index.html"

if ! deployment=$(curl -s \
                  -X POST \
                  -H "Authorization: bearer ${token}" \
                  -d "{\"state\": \"$1\", \"environment\": \"storybook\", \"environment_url\": \"${url}\", \"target_url\": \"${url}\", \"log_url\": \"${url}\"}" \
                  -H "Content-Type: application/json" \
                  "https://api.github.com/repos/${owner}/${repo}/deployments/${deployment_id}/statuses" > res); then
  echo "POSTing deployment status failed, exiting (not failing build)" 1>&2
  exit 1
fi
