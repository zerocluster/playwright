FROM ghcr.io/zerocluster/node/app

RUN \
    apt-get update && apt-get install -y ttf-mscorefonts-installer google-chrome-stable \
    \
    # install dependencies
    && NODE_ENV=production npm install-clean \
    \
    # cleanup
    && /bin/bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
