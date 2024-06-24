#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")

# openssl dhparam -out ssl/dhparam.pem 4096
# Fast version:
openssl dhparam -dsaparam -out "${SCRIPT_DIR}/dhparam.pem" 4096
