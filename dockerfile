FROM ghcr.io/zerocluster/node/app

RUN \
    --mount=type=secret,id=NPM_TOKEN_GITHUB,env=NPM_TOKEN_GITHUB \
    \
    # install dependencies
    NODE_ENV=production npm install-clean \
    \
    # cleanup
    && script=$(curl -fsSL "https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh") \
    && bash <(echo "$script") cleanup

RUN \
    # install chrome
    npx install-google-chrome chrome-headless-shell \
    \
    # cleanup
    && script=$(curl -fsSL "https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh") \
    && bash <(echo "$script") cleanup

RUN \
    # install dependencies
    npx install-google-chrome dependencies \
    \
    # cleanup
    && script=$(curl -fsSL "https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh") \
    && bash <(echo "$script") cleanup
