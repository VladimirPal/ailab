#!/usr/bin/env bash

APPLY_UPGRADE=false
APPLY_INTERACTIVE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -u|--upgrade)
      APPLY_UPGRADE=true
      shift
    ;;
    -i|--interactive)
      APPLY_INTERACTIVE=true
      shift
      ;;
    *)
      echo "Usage: $0 [-u|--upgrade] [-i|--interactive]" >&2
      exit 1
      ;;
  esac
done

args=(--workspaces --root --mergeConfig --color --format "group,ownerChanged,repo,time" --reject "eslint")

if [ "$APPLY_UPGRADE" = true ]; then
  args+=("--upgrade")
fi

if [ "$APPLY_INTERACTIVE" = true ]; then
  args+=("--interactive")
fi

ncu "${args[@]}"
