#!/usr/bin/env bash

EXTRA_BUILD_PARAMS=""

while :; do
  case $1 in
    -f|--force)
      EXTRA_BUILD_PARAMS+="--no-cache "
    ;;
    *) break
  esac
  shift
done

docker build \
  -t ailab/db \
  -f docker/Dockerfile-db . ;
