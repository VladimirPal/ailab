#!/usr/bin/env bash

echo "🏠 PWD: $(pwd)"
SCRIPT_DIR="$(dirname "$0")"

NODE_ENV=test node --require "${SCRIPT_DIR}/preload.js" \
  "${SCRIPT_DIR}/seeds/01-test-data.mjs"
