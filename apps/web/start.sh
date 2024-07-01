#!/usr/bin/env bash

source "$(dirname "$0")/.env.deploy.defaults"

if [ -f "$(dirname "$0")/.env.deploy" ]; then
  source "$(dirname "$0")/.env.deploy"
fi

if [ -z "$DEV_SERVER_PORT" ]; then
  echo "Error: DEV_SERVER_PORT is not set in .env.deploy" >&2
  exit 1
fi

GREEN="\033[32m"
RESET="\033[0m"

if [ "$USE_SSL" = "true" ]; then
  PROTOCOL="https"
else
  PROTOCOL="http"
fi

echo -e "${GREEN}${PROTOCOL}://ailab.internal:$DEV_SERVER_PORT${RESET}\n" ;

webpack serve \
  --mode development \
  --env development \
  --color \
  --config webpack-configs/webpack.config.development.js ;
