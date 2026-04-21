#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
SKILLS_DIR="$CODEX_HOME_DIR/skills"
TARGET="$SKILLS_DIR/xsai-skill"
SOURCE="$ROOT_DIR/skills/xsai-skill"

mkdir -p "$SKILLS_DIR"

if [ -L "$TARGET" ]; then
  LINK_TARGET="$(readlink "$TARGET")"
  RESOLVED_TARGET="$(cd "$(dirname "$TARGET")" && cd "$(dirname "$LINK_TARGET")" && pwd)/$(basename "$LINK_TARGET")"
  if [ "$RESOLVED_TARGET" = "$SOURCE" ]; then
    rm "$TARGET"
  else
    echo "Target exists and points elsewhere: $TARGET" >&2
    exit 1
  fi
elif [ -e "$TARGET" ]; then
  echo "Target exists and is not a symlink: $TARGET" >&2
  exit 1
fi

ln -s "$SOURCE" "$TARGET"
echo "Installed by symlink: $TARGET"
