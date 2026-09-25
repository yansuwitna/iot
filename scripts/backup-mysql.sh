#!/bin/bash
set -e

BACKUP_DIR="${BACKUP_DIR:-/var/backups/iot_mysql}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
MYSQL_HOST="${MYSQL_HOST:-localhost}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_DATABASE="${MYSQL_DATABASE:-iot_platform}"
MYSQL_USER="${MYSQL_USER:-iot_user}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-iot_password}"

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/iot_platform_$TIMESTAMP.sql.gz"

echo "Starting backup for $MYSQL_DATABASE..."

mysqldump -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  --hex-blob \
  --default-character-set=utf8mb4 \
  "$MYSQL_DATABASE" | gzip > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Backup successful: $BACKUP_FILE"
else
  echo "Backup failed" >&2
  exit 1
fi

echo "Cleaning up backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +$RETENTION_DAYS -exec rm -f {} \;
echo "Cleanup done."
