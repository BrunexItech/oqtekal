#!/usr/bin/env bash
# Restores a backup made by backup.sh. Usage: ./scripts/ops/restore.sh 2026-10-03_0215
# Test this before launch, and again every quarter.
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; source .env.production; set +a
if docker compose version >/dev/null 2>&1; then DC="docker compose"; else DC="docker-compose"; fi
STAMP="${1:?usage: restore.sh <stamp>}"
SRC="${BACKUP_DIR:-/var/backups/oqtekal}"
COMPOSE="$DC -f docker/compose.prod.yml --env-file .env.production"

read -r -p "This replaces the live database and media with backup $STAMP. Type 'restore' to continue: " ok
[ "$ok" = "restore" ] || { echo "Aborted"; exit 1; }

$COMPOSE stop web
$COMPOSE exec -T db pg_restore -U "${POSTGRES_USER:-oqtekal}" -d "${POSTGRES_DB:-oqtekal}" --clean --if-exists < "$SRC/db_$STAMP.dump"
docker run --rm -v oqtekal_media:/media -v "$SRC":/in:ro alpine sh -c "rm -rf /media/* && tar -xzf /in/media_$STAMP.tar.gz -C /media"
$COMPOSE up -d web
echo "✓ Restored $STAMP"
