FROM debian:9.5-slim

LABEL "com.github.actions.name"="Deploy Storybook"
LABEL "com.github.actions.description"="Deploy storybook to to Now"
LABEL "com.github.actions.icon"="package"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="http://github.com/eyedea-io/smashing-ui"
LABEL "homepage"="http://github.com/eyedea-io/smashing-ui"
LABEL "maintainer"="Eyedea <hello@eyedea.io>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
