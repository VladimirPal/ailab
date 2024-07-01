#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$0")"
PROFILE="production"
ACTION=$1

if [ -n "$2" ]; then
  PROFILE=$2
fi

COMPOSE_FILES="-f \"${SCRIPT_DIR}/docker-compose.yml\""

case "$PROFILE" in
  production)
    COMPOSE_FILES="${COMPOSE_FILES} -f \"${SCRIPT_DIR}/docker-compose.production.yml\""
    ;;
  development)
    COMPOSE_FILES="${COMPOSE_FILES} -f \"${SCRIPT_DIR}/docker-compose.development.yml\""
    ;;
  database)
    COMPOSE_FILES="${COMPOSE_FILES} -f \"${SCRIPT_DIR}/docker-compose.database.yml\""
    ;;
  *)
    echo "Invalid profile: $PROFILE"
    echo "Valid profiles are: production, development, database"
    exit 1
    ;;
esac

case "$ACTION" in
  stop)
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" stop"
    ;;
  down)
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" down"
    ;;
  up)
    "${SCRIPT_DIR}/build-db.sh"
    "${SCRIPT_DIR}/build-base.sh"
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" build"
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" up -d"
    ;;
  restart)
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" stop"

    "${SCRIPT_DIR}/build-db.sh"
    "${SCRIPT_DIR}/build-base.sh"
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" build"
    eval "docker compose ${COMPOSE_FILES} --profile \"$PROFILE\" up -d"
    ;;
  *)
    echo "Usage: $0 {stop|down|up} [profile]"
    exit 1
    ;;
esac

docker ps
