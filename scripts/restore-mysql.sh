#!/bin/bash
set -e

BACKUP_FILE=$1
MYSQL_HOST="${MYSQL_HOST:-localhost}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_DATABASE="${MYSQL_DATABASE:-iot_platform}"
MYSQL_USER="${MYSQL_USER:-iot_user}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-iot_password}"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup_file.sql.gz>"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found."
  exit 1
fi

echo "WARNING: You are about to restore $BACKUP_FILE into database '$MYSQL_DATABASE'."
read -p "Are you sure? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Restore cancelled."
  exit 1
fi

echo "Restoring database..."
gunzip -c "$BACKUP_FILE" | mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"

if [ $? -eq 0 ]; then
  echo "Restore successful."
else
  echo "Restore failed." >&2
  exit 1
fi
