FROM ghcr.io/zerocluster/node/app

RUN \
    apt-get update \
    \
    # install dependencies
    && NODE_ENV=production npm install-clean \
    \
    && npx install-google-chrome chrome-headless-shell dependencies \
    \
    # cleanup
    && /bin/bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
