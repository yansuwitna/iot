#!/bin/bash
set -e

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup_file.sql.gz>"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found."
  exit 1
fi

echo "Verifying backup file integrity for $BACKUP_FILE..."

# Check if gzip can test the file without errors
if gzip -t "$BACKUP_FILE"; then
  echo "GZIP integrity check passed."
else
  echo "Error: GZIP integrity check failed. The backup file is corrupted." >&2
  exit 1
fi

# Try extracting head to see if it looks like a valid mysqldump
if gunzip -c "$BACKUP_FILE" | head -n 20 | grep -q "MySQL dump"; then
  echo "MySQL dump header check passed."
else
  echo "Error: File does not appear to be a valid mysqldump." >&2
  exit 1
fi

# Try extracting tail to see if dump completed successfully
if gunzip -c "$BACKUP_FILE" | tail -n 20 | grep -q "Dump completed"; then
  echo "MySQL dump completion footer check passed."
else
  echo "Warning: File does not contain 'Dump completed' footer. It might be incomplete." >&2
  # Not exiting with 1 here, as older mysqldump versions or specific flags might omit it,
  # but it's a good warning.
fi

echo "Backup verification completed successfully."
