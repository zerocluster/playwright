FROM zerocluster/node

HEALTHCHECK NONE

RUN \
    apt -y install google-chrome-stable \
    \
    # install deps
    && npm i --omit=dev \
    \
    # cleanup node build environment
    && curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh | /bin/bash -s -- cleanup
