FROM ghcr.io/zerocluster/node

RUN \
    apt-get update && apt-get install -y ttf-mscorefonts-installer google-chrome-stable \
    \
    # install deps
    && npm i --omit=dev \
    \
    # cleanup
    && /bin/bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
