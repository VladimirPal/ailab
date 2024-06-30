#!/usr/bin/env bash

if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found"
  exit 1
fi

SCRIPT_DIR="$(dirname "$0")"
TEMPLATE_FILE="${SCRIPT_DIR}/migrations/templates/migration-template.js"
MIGRATION_NAME=""
RUN_CREATE=false
RUN_UP=false
USE_TEST_DB=false
USE_DOCKER=false
docker_container="ailab_api_app_dev"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -c|--create)
      RUN_CREATE=true
      if [[ -n "$2" ]]; then
        MIGRATION_NAME="$2"
        shift 2
      else
        echo "Error: Migration name is required when using -c or --create" >&2
        exit 1
      fi
      ;;
    -u|--up)
      RUN_UP=true
      shift
      ;;
    --test-db)
      USE_TEST_DB=true
      shift
      ;;
    --docker)
      USE_DOCKER=true
      shift
      ;;
    *)
      echo "Usage: $0 [-c|--create migration_name] [-u|--up] [--test-db] [--docker]" >&2
      exit 1
      ;;
  esac
done

if ! $RUN_CREATE && ! $RUN_UP && ! $USE_TEST_DB; then
  echo "Error: No arguments provided. Please specify an operation to perform." >&2
  echo "Usage: $0 [-c|--create migration name] [-u|--up] [--test-db] [--docker]" >&2
  exit 1
fi

if $USE_TEST_DB; then
  if [[ -z "${TEST_DATABASE_URL}" ]]; then
    echo "TEST_DATABASE_URL environment variable is not set" >&2
    exit 1
  fi

  export DATABASE_URL=$TEST_DATABASE_URL
fi

if $RUN_CREATE; then
  echo "Creating migration: $MIGRATION_NAME"
  if $USE_DOCKER; then
    docker exec -it $docker_container npm run pg-migrate --workspace=apps/api -- --create $MIGRATION_NAME
  else
    node-pg-migrate create "$MIGRATION_NAME" --template-file-name "$TEMPLATE_FILE"
  fi
fi

if $RUN_UP; then
  echo "Running migrations up"
  if $USE_DOCKER; then
    if $USE_TEST_DB; then
      docker exec -it $docker_container npm run pg-migrate --workspace=apps/api -- --up --test-db
    else
      docker exec -it $docker_container npm run pg-migrate --workspace=apps/api -- --up
    fi
  else
    node-pg-migrate up
  fi
fi
