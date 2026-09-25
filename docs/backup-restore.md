# Backup and Restore Plan

## Strategy
- **Database**: Automated `mysqldump` with structured rotation.
- **Files**: Scheduled copy/sync of upload directories.
- **Config**: Backup environment variables and Docker configuration (excluding secrets).

## Scripts
- `scripts/backup-mysql.sh`: Create backups.
- `scripts/restore-mysql.sh`: Safe restore script with interactive confirmations.
- `scripts/verify-backup.sh`: Verify integrity of backup files.

## Guidelines
- Never store backups in public web directories.
- Automatically test restores against a testing database.
- Production restore requires manual confirmation and a pre-restore backup.
