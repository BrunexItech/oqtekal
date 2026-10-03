#!/usr/bin/env bash
# Deploys the latest main branch on the VPS.
#   ./scripts/ops/deploy.sh
# Steps: pull → build image → swap container (migrations run on start) → health check.
# On a failed health check the previous image is restored automatically.
set -euo pipefail
cd "$(dirname "$0")/../.."

COMPOSE="docker compose -f docker/compose.prod.yml --env-file .env.production"
HEALTH_URL="http://127.0.0.1:8091/next/health"

echo "→ Pulling latest code"
git fetch --quiet origin main
git reset --hard origin/main

echo "→ Tagging current image for rollback"
docker image inspect oqtekal-web:latest >/dev/null 2>&1 && docker tag oqtekal-web:latest oqtekal-web:previous || true

echo "→ Building"
$COMPOSE build

echo "→ Starting new version"
$COMPOSE up -d --no-deps web

echo "→ Health check"
for i in $(seq 1 30); do
  if curl -fsS "$HEALTH_URL" >/dev/null; then
    echo "✓ Deployed $(git rev-parse --short HEAD)"
    docker image prune -f >/dev/null
    exit 0
  fi
  sleep 2
done

echo "✗ Health check failed — rolling back"
if docker image inspect oqtekal-web:previous >/dev/null 2>&1; then
  docker tag oqtekal-web:previous oqtekal-web:latest
  $COMPOSE up -d --no-deps web
fi
exit 1
