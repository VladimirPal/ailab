#!/usr/bin/env bash

SCRIPT_DIR="$(dirname "$0")"
COMPOSE_FILES="-f \"${SCRIPT_DIR}/../docker/docker-compose.yml\""

docker_container="ailab_postgres"
docker_volume="ailab_pgdata"

reset_database() {
  docker stop "$docker_container"
  docker rm "$docker_container"
  docker volume rm "docker_${docker_volume}"

  eval "docker compose ${COMPOSE_FILES} build $docker_container"
  eval "docker compose ${COMPOSE_FILES} up -d $docker_container"
}

reset_database
echo "Database reset applied successfully."
