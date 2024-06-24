#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$0")"

echo "🏠 PWD: $(pwd)"

npm run pg-migrate -- --up

NODE_ENV=development \
NODE_EXTRA_CA_CERTS="${SCRIPT_DIR}/../../devScripts/ssl/certs/ca.crt" \
NODE_OPTIONS="-r ${SCRIPT_DIR}/preload.js" \
nodemon app.mjs
