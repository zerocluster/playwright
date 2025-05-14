FROM ghcr.io/zerocluster/node/app

RUN \
    # install dependencies
    NODE_ENV=production npm install-clean \
    \
    # cleanup
    && /usr/bin/env bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup

RUN \
    # install chrome
    npx install-google-chrome chrome-headless-shell \
    \
    # cleanup
    && /usr/bin/env bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup

RUN \
    # install dependencies
    npx install-google-chrome dependencies \
    \
    # cleanup
    && /usr/bin/env bash <(curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh) cleanup
