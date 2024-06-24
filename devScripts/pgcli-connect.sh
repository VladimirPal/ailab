#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$0")"

env_file="${SCRIPT_DIR}/../apps/api/.env"
docker_container="ailab_postgres"

if [ ! -f "$env_file" ]; then
  echo "Environment file $env_file not found!"
  exit 2
fi

set -a
# shellcheck disable=SC1090
source "${env_file}"
set +a

# Check if --local-client flag is provided
local_client=false
if [[ " $* " == *" --local-client "* ]]; then
  local_client=true
fi

if [[ " $* " == *" --test-db "* ]]; then
  if [ -z "$TEST_DATABASE_URL" ]; then
    echo "TEST_DATABASE_URL not set in the environment file."
    exit 3
  fi
  database_url="$TEST_DATABASE_URL"
else
  if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL not set in the environment file."
    exit 3
  fi
  database_url="$DATABASE_URL"
fi

# Run pgcli in Docker container or locally based on the flag
if [ "$local_client" = true ]; then
  pgcli "$database_url"
else
  docker exec -it "$docker_container" /opt/venv/bin/pgcli "$database_url"
fi
