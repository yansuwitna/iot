# Deployment Documentation

## 1. Persyaratan Sistem
- Node.js LTS (v18+)
- MySQL 8.x
- Nginx / Caddy (Sebagai Reverse Proxy)
- PM2 atau Docker (untuk manajemen proses)

## 2. Shared Hosting Deployment (cPanel / Plesk)
Platform ini dapat di-_deploy_ di shared hosting dengan dukungan Node.js Application:
1. Buat database MySQL dari control panel dan import credential ke `.env`.
2. Build Vue frontend secara lokal (`npm run build:client`) lalu unggah folder `client/dist` ke server.
3. Build NestJS backend (`npm run build`), lalu unggah hasil kompilasi `dist/` ke server.
4. Set Node.js App startup file ke `dist/main.js`.
5. Pastikan Environment variables (seperti `JWT_SECRET`, `DATABASE_URL`) diatur melalui panel cPanel Node.js.

## 3. VPS / Dedicated Server (Docker Compose)
1. *Clone* repositori ke server VPS.
2. Salin `.env.example` ke `.env` dan atur parameter.
3. Jalankan `docker compose up -d` (Gunakan versi production compose yang menyertakan nodejs backend container).
4. Konfigurasikan Reverse Proxy (Nginx) untuk mengarahkan port 80/443 ke port Node.js lokal (3000).

## 4. Disaster Recovery (Prosedur Pemulihan)
1. Matikan traffic ke web server (aktifkan *Maintenance Page* di Nginx).
2. Jalankan `scripts/restore-mysql.sh <file_backup>` untuk merestorasi database.
3. Validasi migrasi dengan menjalankan `npx prisma db pull` dan `npx prisma migrate status`.
4. Hidupkan ulang aplikasi backend.
