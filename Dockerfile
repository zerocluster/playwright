FROM ghcr.io/zerocluster/node

LABEL org.opencontainers.image.source="https://github.com/zerocluster/playwright"

RUN \
    apt update && apt install -y ttf-mscorefonts-installer google-chrome-stable \
    \
    # install deps
    && npm i --omit=dev \
    \
    # cleanup
    && curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh | /bin/bash -s -- cleanup
