#!/usr/bin/env bash

EXTRA_BUILD_PARAMS=()

while :; do
  case $1 in
    -f|--force)
      EXTRA_BUILD_PARAMS+=(--no-cache)
    ;;
    *) break
  esac
  shift
done

./docker/cp-workspace-dep.js ;

docker build \
  "${EXTRA_BUILD_PARAMS[@]}" \
  -t ailab/base \
  -f docker/Dockerfile-base . ;

rm -vrf workspaces_deps_copy
