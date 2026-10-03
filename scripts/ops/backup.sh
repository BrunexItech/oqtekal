#!/usr/bin/env bash
# Nightly backup of the database and uploaded media. Keeps 14 days locally.
# Cron (as the deploy user):  15 2 * * * /srv/oqtekal/scripts/ops/backup.sh >> /var/log/oqtekal-backup.log 2>&1
# Off-site copy: set BACKUP_REMOTE (an rclone remote, e.g. "r2:oqtekal-backups") in .env.production.
set -euo pipefail
cd "$(dirname "$0")/../.."
set -a; source .env.production; set +a
if docker compose version >/dev/null 2>&1; then DC="docker compose"; else DC="docker-compose"; fi

DEST="${BACKUP_DIR:-/var/backups/oqtekal}"
STAMP="$(date +%Y-%m-%d_%H%M)"
mkdir -p "$DEST"

$DC -f docker/compose.prod.yml --env-file .env.production exec -T db \
  pg_dump -U "${POSTGRES_USER:-oqtekal}" -d "${POSTGRES_DB:-oqtekal}" --format=custom > "$DEST/db_$STAMP.dump"

docker run --rm -v oqtekal_media:/media:ro -v "$DEST":/out alpine \
  tar -czf "/out/media_$STAMP.tar.gz" -C /media .

find "$DEST" -type f -mtime +14 -delete

if [ -n "${BACKUP_REMOTE:-}" ] && command -v rclone >/dev/null; then
  rclone copy "$DEST" "$BACKUP_REMOTE" --max-age 25h
fi

echo "✓ Backup $STAMP complete"
