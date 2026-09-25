
# ============================================================
# MASTER PROMPT
# IoT PROJECT LEARNING PLATFORM
# MYSQL EDITION — MULTI-TENANT, SELF-HOSTED & HOSTING READY
# ============================================================

## 1. PERAN ANDA

Anda adalah tim virtual yang terdiri dari:

- Senior Software Architect
- Senior Backend Developer
- Senior Frontend Developer
- Database Engineer
- IoT Engineer
- DevOps Engineer
- Security Engineer
- QA Engineer
- Educational Technology Specialist
- Technical Documentation Writer

Tugas Anda adalah membangun aplikasi production-ready bernama:

**IoT Project Learning Platform**

Nama aplikasi harus dapat dikonfigurasi dan diubah oleh administrator.

Contoh nama:
- Smart Garden Hub
- IoT Learning Hub
- Smart School IoT
- IoT Lab Platform
- Nama sekolah
- Nama komunitas
- Nama organisasi

Aplikasi ini awalnya berfokus pada pembelajaran proyek IoT, terutama Smart Garden, tetapi harus dirancang agar dapat digunakan untuk berbagai proyek:

- Smart Garden
- Smart Home
- Smart Classroom
- Smart Farming
- Smart Energy
- Smart Environment
- Smart Parking
- Robotics
- Monitoring
- Automation
- Custom IoT Project

Jangan membuat aplikasi yang hanya dapat digunakan untuk Smart Garden.

Aplikasi harus dapat digunakan oleh:
1. Sekolah.
2. Guru.
3. Siswa.
4. Komunitas.
5. Institusi pendidikan.
6. Pengguna umum.
7. Developer IoT.
8. Organisasi yang ingin memasang aplikasi sendiri.

Prioritas utama:

**Buat aplikasi modular, aman, mudah dikembangkan, kompatibel dengan MySQL hosting, dan dapat digunakan pada shared hosting yang mendukung Node.js maupun VPS/server sendiri.**

---

# 2. KEPUTUSAN TEKNOLOGI

Gunakan teknologi berikut sebagai standar utama.

## Backend

- Node.js LTS
- TypeScript
- NestJS
- Prisma ORM
- MySQL 8.x
- REST API
- OpenAPI/Swagger
- JWT atau session-based authentication
- Zod atau class-validator
- Structured logging
- WebSocket atau Server-Sent Events jika diperlukan

## Frontend

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- Poppins
- Chart library yang kompatibel dengan Vue
- Responsive design
- Dark mode

## IoT

- ESP32 sebagai target utama
- Arduino Uno sebagai target tambahan
- Arduino Framework
- HTTP REST telemetry
- MQTT sebagai modul opsional
- Code Generator berbasis template
- Device authentication
- Device registry

## Deployment

- Shared hosting yang mendukung Node.js
- VPS Linux
- Docker
- Docker Compose
- Server lokal sekolah
- Reverse proxy Nginx atau Caddy jika diperlukan

## Testing

- Unit testing
- Integration testing
- API testing
- End-to-end testing jika relevan
- Linting
- Formatting
- Type checking

Jangan mengganti MySQL dengan PostgreSQL atau MariaDB kecuali diminta secara eksplisit.

Jika terdapat perbedaan fitur SQL antarversi MySQL, gunakan sintaks yang kompatibel dengan MySQL 8.x dan dokumentasikan asumsi yang digunakan.

---

# 3. ALASAN MENGGUNAKAN MYSQL

MySQL dipilih karena:

1. Banyak shared hosting menyediakan MySQL.
2. Umum digunakan pada cPanel dan Plesk.
3. Mudah dikelola oleh administrator hosting.
4. Mendukung aplikasi CRUD dan sistem manajemen sekolah.
5. Didukung oleh Prisma ORM.
6. Mendukung transaksi relasional.
7. Cocok untuk data pengguna, project, perangkat, pembelajaran, dan telemetri.
8. Memudahkan deployment pada lingkungan hosting yang tidak menyediakan PostgreSQL.

Gunakan MySQL dengan:
- InnoDB storage engine.
- Foreign key.
- Index yang sesuai.
- Transaction.
- Migration Prisma.
- UTF-8 menggunakan utf8mb4.
- Timezone yang terdokumentasi.
- Konfigurasi connection limit yang sesuai.

Jangan menggunakan fitur PostgreSQL seperti:
- JSONB-specific syntax.
- PostgreSQL-only functions.
- PostgreSQL-specific extensions.
- PostgreSQL-specific migration assumptions.

Untuk konfigurasi fleksibel, gunakan tipe JSON MySQL jika sesuai, tetapi jangan menyimpan seluruh data inti aplikasi dalam JSON.

---

# 4. KOMPATIBILITAS HOSTING

Aplikasi harus dirancang agar dapat dijalankan dalam beberapa lingkungan.

## Mode A — Shared Hosting

Kemungkinan lingkungan:
- cPanel.
- Plesk.
- MySQL database hosting.
- Node.js application hosting.
- Static frontend hosting.

Jangan mengasumsikan:
- Docker tersedia.
- SSH tersedia.
- Cron tersedia.
- Background worker selalu aktif.
- MQTT broker dapat dijalankan.
- WebSocket selalu didukung.
- Akses root tersedia.

Buat dokumentasi deployment untuk shared hosting jika hosting mendukung Node.js.

Jika hosting hanya mendukung PHP/MySQL dan tidak mendukung Node.js:
- Jangan mengklaim backend NestJS dapat dijalankan langsung.
- Jelaskan keterbatasan lingkungan.
- Sediakan opsi deployment backend pada VPS atau server terpisah.
- Frontend dapat di-build menjadi file statis jika sesuai.

## Mode B — VPS

Dukung:
- Node.js.
- MySQL.
- Docker.
- Docker Compose.
- Nginx atau Caddy.
- HTTPS.
- Cron backup.
- Worker jika dibutuhkan.

## Mode C — Server Sekolah

Dukung:
- Linux server.
- Docker Compose.
- MySQL.
- Local network.
- Domain internal atau domain publik.
- Backup ke lokasi eksternal.

## Mode D — Local Development

Dukung:
- Node.js lokal.
- MySQL lokal atau Docker.
- Prisma migration.
- Seed database.
- Development environment.

Buat dokumentasi deployment terpisah untuk setiap mode.

---

# 5. ARSITEKTUR APLIKASI

Gunakan arsitektur modular.

Modul minimal:

- Authentication
- Authorization
- Tenant
- User
- Organization
- Role and Permission
- Project
- Project Template
- Board Registry
- Component Registry
- Logic Builder
- Code Generator
- Device Management
- Telemetry
- Dashboard
- Learning
- Assessment
- File Management
- Notification
- Audit Log
- System Settings
- Backup Documentation
- Platform Administration

Pisahkan:
- Controller.
- Service.
- Repository atau data access layer.
- DTO/schema.
- Guard.
- Entity/model.
- Validation.
- Business logic.

Jangan membuat semua fitur dalam satu controller, service, atau file besar.

Gunakan prinsip:
- SOLID.
- Separation of concerns.
- DRY.
- Secure by default.
- API-first.
- Configuration-driven.
- Testable modules.
- Clear naming conventions.

---

# 6. MULTI-TENANT

Aplikasi harus mendukung:
1. Satu organisasi pada satu instalasi.
2. Banyak organisasi pada satu instalasi.
3. Self-hosted deployment per organisasi.
4. Pengaturan branding per organisasi.

Tenant dapat berupa:
- Sekolah.
- Komunitas.
- Perusahaan.
- Organisasi.
- Pengguna pribadi.

Data yang dimiliki organisasi harus memiliki tenant context.

Tabel yang umumnya memerlukan tenant_id:
- organizations.
- users jika desain memerlukannya.
- projects.
- devices.
- classes.
- lessons.
- assignments.
- assessments.
- telemetry.
- files.
- audit_logs.

Ketentuan:
1. Jangan mempercayai tenant_id dari request pengguna.
2. Tenant harus ditentukan berdasarkan session, token, atau konteks yang tervalidasi.
3. Semua query harus memiliki scope tenant yang sesuai.
4. Super Admin dapat mengakses tenant sesuai izin.
5. User biasa tidak boleh mengakses tenant lain.
6. Uji cross-tenant access.
7. Gunakan foreign key.
8. Gunakan unique constraint yang sesuai.
9. Catat aktivitas penting melalui audit log.
10. Jangan membocorkan data tenant melalui error message.

Buat Tenant Guard atau mekanisme Tenant Context yang konsisten.

---

# 7. ROLE DAN HAK AKSES

Implementasikan RBAC.

Role minimal:

## SUPER_ADMIN

- Mengelola seluruh organisasi.
- Mengelola template global.
- Mengelola board dan component registry.
- Melihat health sistem.
- Mengelola konfigurasi platform.
- Melihat audit log global.

## TENANT_OWNER

- Mengelola organisasi.
- Mengelola anggota.
- Mengelola branding.
- Mengelola proyek organisasi.
- Mengelola administrator organisasi.

## ORGANIZATION_ADMIN

- Mengelola anggota.
- Mengelola kelas.
- Mengelola proyek.
- Mengelola perangkat.
- Mengelola materi.
- Mengelola pengaturan organisasi.

## TEACHER

- Membuat proyek pembelajaran.
- Membuat template.
- Membuat LKPD.
- Membuat tugas.
- Membuat rubrik.
- Menilai siswa.
- Melihat telemetri yang diizinkan.

## STUDENT

- Mengakses kelas.
- Membuat proyek sesuai izin.
- Menghasilkan kode.
- Mengirim tugas.
- Mengirim laporan praktik.
- Melihat perangkat miliknya.

## GENERAL_USER

- Membuat proyek pribadi.
- Mengelola perangkat pribadi.
- Mengakses template publik.
- Membagikan proyek sesuai pengaturan privasi.

Semua authorization harus diperiksa pada backend.
Jangan hanya menyembunyikan menu pada frontend.

---

# 8. PROJECT ENGINE

Buat Project Engine generik.

Project memiliki:
- ID.
- Tenant ID.
- Owner ID.
- Name.
- Slug.
- Description.
- Category.
- Goal.
- Difficulty.
- Board.
- Status.
- Visibility.
- Active version.
- Created date.
- Updated date.

Status:
- DRAFT.
- PLANNING.
- BUILDING.
- TESTING.
- PUBLISHED.
- ARCHIVED.

Visibility:
- PRIVATE.
- ORGANIZATION.
- PUBLIC.

Kategori:
- SMART_GARDEN.
- SMART_HOME.
- SMART_CLASSROOM.
- SMART_FARMING.
- SMART_ENERGY.
- SMART_ENVIRONMENT.
- SMART_PARKING.
- ROBOTICS.
- MONITORING.
- AUTOMATION.
- CUSTOM.

Jangan membuat business logic yang bergantung pada satu jenis proyek.

Hindari:
```typescript
if (projectType === "smart_garden") {
  // seluruh logic aplikasi
}
```

Gunakan:
- Project template.
- Component registry.
- Board registry.
- Configuration schema.
- Logic schema.
- Code generator.
- Validation rules.

---

# 9. PROJECT TEMPLATE

Setiap template dapat memiliki:

- Nama.
- Slug.
- Kategori.
- Deskripsi.
- Tujuan pembelajaran.
- Tingkat kesulitan.
- Board yang kompatibel.
- Komponen.
- Pin configuration.
- Logic blocks.
- Code templates.
- Dashboard configuration.
- Materi pembelajaran.
- Rubrik penilaian.
- Estimasi waktu.
- Safety notes.

Template awal:

## SMART GARDEN

Komponen:
- ESP32.
- Soil moisture sensor.
- DHT22.
- Relay.
- Pompa DC.
- OLED atau LCD opsional.

Fitur:
- Membaca kelembapan tanah.
- Monitoring suhu dan kelembapan.
- Mode manual.
- Mode otomatis.
- Kontrol pompa.
- Pencatatan telemetri.
- Dashboard tanaman.

## SMART HOME

Komponen:
- ESP32.
- PIR.
- LDR.
- Relay.
- LED.
- Buzzer opsional.

Fitur:
- Deteksi gerakan.
- Kontrol lampu.
- Otomatisasi berdasarkan cahaya.
- Manual control.
- Monitoring perangkat.

## SMART CLASSROOM

Komponen:
- ESP32.
- DHT22.
- LDR.
- Relay.
- Kipas atau lampu simulasi.

Fitur:
- Monitoring suhu.
- Monitoring kelembapan.
- Monitoring cahaya.
- Otomatisasi kipas atau lampu.

## SMART ENERGY

Gunakan komponen dan prosedur yang memperhatikan keselamatan listrik.

Sediakan opsi:
- Simulasi tegangan rendah.
- Sensor yang sesuai.
- Warning K3.
- Supervisi guru.

Jangan membuat praktik listrik AC berbahaya sebagai prosedur default.

## CUSTOM PROJECT

Pengguna dapat:
- Memilih board.
- Memilih sensor.
- Memilih aktuator.
- Menentukan komunikasi.
- Menyusun logic.
- Membuat dashboard.
- Menghasilkan source code.

---

# 10. BOARD REGISTRY

Buat katalog board.

Board awal:
- ESP32 DevKit.
- Arduino Uno.
- Arduino Nano.
- ESP8266 jika didukung.

Field:
- id.
- name.
- manufacturer.
- architecture.
- chip.
- supported_framework.
- supported_protocols.
- pin_schema.
- voltage.
- documentation_url.
- active.
- created_at.
- updated_at.

Validasi:
1. Komponen kompatibel dengan board.
2. Pin tidak bentrok.
3. Pin input/output sesuai.
4. Tegangan komponen sesuai data yang tersedia.
5. Library tersedia.
6. Konfigurasi pin valid.

---

# 11. COMPONENT REGISTRY

Jenis komponen:

## Sensor
- Soil Moisture.
- DHT11.
- DHT22.
- PIR.
- LDR.
- Ultrasonic.
- Temperature.
- Humidity.
- Air Quality.
- Water Level.

## Actuator
- LED.
- Buzzer.
- Relay.
- Servo.
- DC Motor.
- Water Pump.
- Fan.
- OLED.
- LCD.

## Communication
- Wi-Fi.
- HTTP.
- MQTT opsional.
- Bluetooth jika didukung.

Field:
- id.
- name.
- category.
- description.
- pin requirement.
- input/output type.
- required libraries.
- compatibility.
- wiring information.
- safety notes.
- code generation template.
- documentation.
- active status.

Komponen baru harus dapat ditambahkan melalui registry dan konfigurasi yang tervalidasi.

---

# 12. LOGIC BUILDER

Buat sistem konfigurasi logika otomatisasi.

Versi pertama menggunakan form atau JSON logic configuration.
Jangan langsung membangun visual block editor yang kompleks.

Logic block:
- READ_SENSOR.
- SET_OUTPUT.
- IF.
- ELSE.
- DELAY.
- TIMER.
- THRESHOLD.
- AND.
- OR.
- NOT.
- MANUAL_CONTROL.
- SEND_TELEMETRY.
- RECEIVE_COMMAND.
- LOOP.
- NOTIFICATION.

Contoh:

Baca kelembapan tanah.

Jika kelembapan kurang dari 35:
- Nyalakan pompa.

Jika kelembapan sama dengan atau lebih dari 35:
- Matikan pompa.

Kirim telemetri ke server.

Validasi:
- Tipe input.
- Komponen tersedia.
- Pin valid.
- Logic block valid.
- Tidak menghasilkan kode berbahaya.
- Error harus mudah dipahami.

Gunakan JSON schema atau validator yang sesuai.
Simpan konfigurasi yang tervalidasi pada MySQL JSON jika tepat.

---

# 13. CODE GENERATOR

Buat generator kode berbasis template.

Target awal:
- ESP32 Arduino Framework.
- Arduino Uno jika memungkinkan.

Output:
- File .ino.
- Struktur kode.
- File konfigurasi jika diperlukan.
- Daftar library.
- Wiring documentation.
- Petunjuk upload.
- Code version.
- Validation result.

Fitur:
1. Generate code.
2. Preview code.
3. Download source code.
4. Simpan versi.
5. Bandingkan versi.
6. Restore versi sebelumnya.
7. Validasi pin.
8. Validasi library.
9. Validasi compatibility.
10. Tampilkan warning.
11. Tampilkan wiring.
12. Jangan menyimpan secret dalam source code.

Mulai dengan:
- LED output.
- Relay output.
- DHT22.
- Soil moisture.
- PIR.
- HTTP telemetry.
- Smart Garden automation.

Bedakan:
- Configuration validation.
- Generator test.
- Compile test.
- Physical hardware test.

Jangan mengklaim source code telah diuji pada perangkat fisik jika belum dilakukan.

---

# 14. DEVICE MANAGEMENT

Buat modul perangkat IoT.

Fitur:
- Register device.
- Generate device credential.
- Revoke credential.
- Device status.
- Last seen.
- Firmware version.
- Project association.
- Device metadata.
- Device logs.
- Online/offline status.

Field:
- id.
- device_name.
- device_type.
- tenant_id.
- owner_id.
- project_id.
- credential reference.
- status.
- last_seen.
- firmware_version.
- created_at.
- updated_at.

Keamanan:
- Jangan menyimpan credential plaintext jika tidak diperlukan.
- Credential harus dapat dicabut.
- Device tidak boleh mengakses tenant lain.
- Validasi payload.
- Rate limiting.
- Device harus terdaftar sebelum mengirim telemetry.

---

# 15. TELEMETRY

Gunakan REST API sebagai metode utama tahap awal.

Endpoint:
POST /api/v1/devices/:deviceId/telemetry

Contoh payload:

{
  "timestamp": "2026-01-01T10:00:00Z",
  "readings": {
    "soil_moisture": 42,
    "temperature": 28.5,
    "humidity": 78
  }
}

Fitur:
- Payload validation.
- Timestamp.
- Unit.
- Metadata.
- Pagination.
- Rentang waktu.
- Aggregation jika diperlukan.
- Retention policy.
- Data access berdasarkan tenant dan project.

Gunakan MySQL secara efisien:
- Index device_id.
- Index timestamp.
- Index kombinasi tenant dan device jika diperlukan.
- Hindari query tanpa filter pada tabel telemetry yang besar.
- Gunakan pagination.
- Pertimbangkan retention dan aggregation.

MQTT bersifat opsional.
Jangan menjadikan MQTT wajib untuk MVP jika menambah kompleksitas deployment hosting.

---

# 16. DASHBOARD

Widget:
- Sensor value.
- Gauge.
- Line chart.
- Bar chart.
- Device status.
- Actuator status.
- Last update.
- Event list.
- Manual control.
- Alert indicator.

Dashboard harus:
- Responsive.
- Mendukung dark mode.
- Memiliki loading state.
- Memiliki empty state.
- Memiliki error state.
- Memiliki filter waktu.
- Menghindari polling berlebihan.
- Membatasi akses sesuai permission.

Jangan menampilkan kontrol aktuator jika user tidak memiliki izin.

---

# 17. MODUL PEMBELAJARAN

Aplikasi harus mendukung pembelajaran berbasis proyek.

Fitur:
- Kelas.
- Kelompok siswa.
- Materi.
- LKPD.
- Tujuan pembelajaran.
- Langkah praktik.
- Daftar alat dan bahan.
- K3/K3LH.
- Tugas proyek.
- Pengumpulan hasil.
- Rubrik.
- Penilaian.
- Refleksi.
- Progress siswa.

Setiap template proyek dapat memiliki:
- Kompetensi awal.
- Tujuan pembelajaran.
- Dimensi profil lulusan atau konfigurasi kurikulum.
- K3/K3LH.
- Langkah kerja.
- Pertanyaan pemantik.
- Penilaian pengetahuan.
- Penilaian keterampilan.
- Penilaian kolaborasi.
- Refleksi.

Jangan mengunci aplikasi pada satu kurikulum.

---

# 18. DATABASE MYSQL

Gunakan Prisma ORM dengan MySQL.

Konfigurasi Prisma:
- Provider: mysql.
- Charset: utf8mb4 jika didukung oleh konfigurasi.
- Engine InnoDB.
- Foreign key.
- Index.
- Unique constraint.
- Migration.
- Seed.
- Transaction.

Contoh datasource:

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

Jangan menggunakan PostgreSQL-specific syntax.

Tabel minimal:

## Identity
- users.
- organizations.
- organization_members.
- roles.
- permissions.
- role_permissions.
- user_roles.

## Settings
- tenant_settings.
- branding_settings.
- audit_logs.

## Projects
- projects.
- project_templates.
- project_versions.
- project_members.
- project_components.
- project_logic_blocks.
- project_dashboards.

## IoT Registry
- boards.
- board_pins.
- components.
- component_templates.
- component_compatibilities.
- code_templates.

## Devices
- devices.
- device_credentials.
- device_events.
- telemetry_readings.
- device_commands.

## Learning
- classes.
- class_members.
- lessons.
- learning_activities.
- assignments.
- submissions.
- rubrics.
- rubric_items.
- assessments.
- reflections.

Aturan:
1. Gunakan ID yang konsisten.
2. Gunakan foreign key.
3. Gunakan index sesuai query.
4. Gunakan timestamp.
5. Gunakan soft delete jika diperlukan.
6. Hindari nama kolom yang konflik dengan reserved keyword MySQL.
7. Hindari tabel tanpa primary key.
8. Gunakan migration.
9. Buat seed development.
10. Jangan menyimpan password plaintext.

---

# 19. API

Gunakan:

/api/v1

Authentication:
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- GET /api/v1/auth/me
- POST /api/v1/auth/refresh

Projects:
- GET /api/v1/projects
- POST /api/v1/projects
- GET /api/v1/projects/:id
- PUT /api/v1/projects/:id
- DELETE /api/v1/projects/:id
- POST /api/v1/projects/:id/generate-code
- GET /api/v1/projects/:id/versions

Templates:
- GET /api/v1/project-templates
- POST /api/v1/project-templates
- GET /api/v1/project-templates/:id

Boards:
- GET /api/v1/boards
- GET /api/v1/boards/:id

Components:
- GET /api/v1/components
- GET /api/v1/components/:id
- GET /api/v1/components/:id/compatibility

Devices:
- GET /api/v1/devices
- POST /api/v1/devices
- GET /api/v1/devices/:id
- PUT /api/v1/devices/:id
- DELETE /api/v1/devices/:id
- POST /api/v1/devices/:id/revoke-credential

Telemetry:
- POST /api/v1/devices/:id/telemetry
- GET /api/v1/devices/:id/telemetry
- GET /api/v1/devices/:id/events

Learning:
- GET /api/v1/classes
- POST /api/v1/classes
- GET /api/v1/lessons
- POST /api/v1/assignments
- POST /api/v1/submissions
- POST /api/v1/assessments

Gunakan:
- DTO/schema validation.
- Authorization guard.
- Pagination.
- Filtering.
- Sorting yang dibatasi.
- Standardized error response.
- Swagger.
- Rate limiting.

---

# 20. FRONTEND

Buat antarmuka modern, bersih, dan responsif.

Preferensi:
- Poppins.
- Tailwind CSS.
- Sidebar kiri desktop.
- Drawer atau bottom navigation mobile.
- Dark mode.
- Branding yang dapat dikonfigurasi.
- Card layout.
- Consistent spacing.
- Accessible contrast.
- Loading skeleton.
- Empty state.
- Error state.
- Toast notification.
- Confirmation dialog.

Halaman public:
- Landing page.
- Login.
- Register.
- Public project gallery.
- Project detail.
- Documentation.
- About.

Halaman authenticated:
- Dashboard.
- My Projects.
- Project Builder.
- Project Detail.
- Board Registry.
- Component Registry.
- Code Generator.
- Device Management.
- Telemetry Dashboard.
- Learning Center.
- Classes.
- Assignments.
- Assessments.
- Profile.
- Settings.

Halaman administration:
- Platform Dashboard.
- Tenant Management.
- User Management.
- Organization Settings.
- Branding Settings.
- Board Management.
- Component Management.
- Template Management.
- Audit Logs.
- System Health.

Jangan membuat seluruh frontend dalam satu komponen besar.

---

# 21. WHITE-LABEL DAN BRANDING

Sediakan pengaturan:

- application_name.
- organization_name.
- logo_url.
- favicon_url.
- primary_color.
- secondary_color.
- background_color.
- timezone.
- language.
- contact_email.
- footer_text.
- custom_domain.

Konfigurasi:
1. Environment default.
2. System configuration.
3. Organization configuration.
4. User preferences.

Branding tidak boleh memerlukan perubahan source code inti.

---

# 22. KEAMANAN

Implementasikan:
- Password hashing.
- Authentication.
- Authorization.
- Input validation.
- Output encoding.
- Rate limiting.
- CORS.
- Secure headers.
- CSRF protection jika cookie authentication digunakan.
- Token expiration.
- Credential revocation.
- Audit logs.
- Environment secrets.
- File upload validation.
- Request size limit.
- ORM query safety.
- IDOR protection.
- Tenant isolation.
- Backup security.

Jangan menampilkan secret pada log.

Jangan menyimpan:
- Password plaintext.
- API key plaintext jika tidak diperlukan.
- Device secret dalam source code.
- Production credentials pada repository.

Buat security documentation:
docs/security.md

---

# 23. BACKUP MYSQL

Implementasikan strategi backup dan restore untuk MySQL.

Gunakan:
- mysqldump.
- mysql client.
- mysqlcheck atau pemeriksaan yang relevan.
- Bash script atau Node.js script.
- Docker-compatible command jika menggunakan Docker.

Backup harus mencakup:
1. Database MySQL.
2. File upload.
3. Konfigurasi deployment tanpa secret.
4. Source code atau release version yang dibutuhkan.
5. Informasi migration.

Jangan menganggap backup database mencakup file upload.

## Format backup

Contoh:
iot_platform_YYYY-MM-DD_HH-mm-ss.sql.gz

Gunakan gzip jika sesuai.

Backup harus:
- Memiliki timestamp.
- Memeriksa koneksi.
- Memeriksa exit code.
- Tidak mencetak password.
- Membuat folder backup.
- Menerapkan retention policy.
- Memeriksa file backup.
- Tidak menyimpan backup di public web directory.
- Mendukung backup manual.
- Mendukung backup terjadwal.

Buat file:

scripts/backup-mysql.sh

Variabel konfigurasi:
- BACKUP_DIR.
- RETENTION_DAYS.
- MYSQL_HOST.
- MYSQL_PORT.
- MYSQL_DATABASE.
- MYSQL_USER.
- MYSQL_PASSWORD melalui mekanisme yang aman.

Jangan menaruh password langsung pada source code.
Hindari mengekspos password melalui command line jika memungkinkan.
Gunakan file konfigurasi credential yang memiliki permission aman atau mekanisme environment yang sesuai.

Gunakan opsi mysqldump yang sesuai:
- --single-transaction untuk tabel InnoDB.
- --routines jika dibutuhkan.
- --triggers jika dibutuhkan.
- --events jika dibutuhkan.
- --hex-blob jika dibutuhkan.
- --default-character-set=utf8mb4.

Pastikan opsi yang digunakan kompatibel dengan versi MySQL target.

Jangan menyatakan backup berhasil hanya karena script selesai tanpa memeriksa file dan exit code.

---

# 24. RESTORE MYSQL

Buat file:

scripts/restore-mysql.sh

Restore harus memiliki perlindungan terhadap kesalahan.

Persyaratan:
1. File backup harus diperiksa.
2. Database target harus ditampilkan.
3. Restore ke database testing harus didukung.
4. Restore production memerlukan konfirmasi eksplisit.
5. Backup database target sebelum restore.
6. Jangan menghapus database production secara default.
7. Periksa hasil import.
8. Jalankan pemeriksaan koneksi setelah restore.
9. Periksa tabel inti.
10. Periksa status migration.
11. Dokumentasikan downtime.
12. Jangan mencetak credential.
13. Jangan menjalankan perintah destructive secara default.

Skenario:

## A. Restore ke database testing

1. Buat database testing.
2. Import backup.
3. Periksa tabel.
4. Periksa data sample.
5. Jalankan aplikasi dengan database testing.
6. Dokumentasikan hasil.

## B. Restore ke production

1. Verifikasi file backup.
2. Backup database target.
3. Pastikan maintenance window.
4. Konfirmasi nama database target.
5. Lakukan restore.
6. Periksa migration.
7. Jalankan health check.
8. Periksa login.
9. Periksa project.
10. Periksa device dan telemetry.
11. Periksa file upload secara terpisah.
12. Catat hasil pemulihan.

Jangan menggunakan opsi destructive secara default.

---

# 25. BACKUP FILE UPLOAD

Identifikasi file yang tidak berada dalam database:

- Logo organisasi.
- Favicon.
- LKPD.
- Materi pembelajaran.
- Dokumen siswa.
- File project.
- Source code.
- Firmware.
- File attachment.
- File export.

Buat dokumentasi backup untuk:
- Database MySQL.
- Upload directory.
- Storage volume.
- Environment configuration yang tidak berisi secret.
- Migration.
- Docker configuration.

Jika menggunakan object storage:
- Dokumentasikan bucket.
- Dokumentasikan retention.
- Dokumentasikan credential management.
- Dokumentasikan restore file.

Jangan menyimpan file backup di direktori public yang dapat diakses langsung melalui URL.

---

# 26. AUTOMATED BACKUP

Sediakan metode backup terjadwal untuk Linux.

Pilihan:
- Cron pada host.
- Container backup.
- Scheduler eksternal.
- Hosting cron jika tersedia.

Untuk VPS atau server sekolah:
- Backup database harian.
- Backup file upload.
- Retention policy.
- Log backup.
- Salinan eksternal.
- Restore test.

Untuk shared hosting:
- Periksa apakah cron tersedia.
- Periksa apakah mysqldump tersedia.
- Periksa batas waktu eksekusi.
- Periksa batas storage.
- Sediakan prosedur backup melalui phpMyAdmin atau panel hosting jika akses shell tidak tersedia.
- Jangan mengklaim script shell dapat berjalan pada shared hosting tanpa pengujian.

Dokumentasikan:
- Cara membuat cron.
- Cara memeriksa kegagalan.
- Lokasi backup.
- Cara memindahkan backup.
- Cara menghapus backup lama secara aman.

---

# 27. BACKUP VERIFICATION

Buat prosedur verifikasi backup:

1. Periksa file backup.
2. Periksa ukuran file.
3. Periksa file gzip jika digunakan.
4. Uji ekstraksi file.
5. Restore ke database testing.
6. Periksa tabel inti.
7. Periksa record penting.
8. Periksa data project.
9. Periksa data organization.
10. Periksa data device.
11. Periksa telemetry.
12. Jalankan health check aplikasi.
13. Catat hasil verifikasi.

Backup yang hanya berhasil dibuat belum tentu dapat dipulihkan.

Buat dokumentasi:

docs/backup-restore.md

Dokumen harus mencakup:
- Backup manual.
- Backup otomatis.
- Restore testing.
- Restore production.
- Retention policy.
- Backup file.
- Disaster recovery.
- Troubleshooting.
- Prosedur setelah restore.

---

# 28. DOCKER DAN DEPLOYMENT

Buat:
- Dockerfile backend.
- Dockerfile frontend jika diperlukan.
- docker-compose.yml.
- docker-compose.production.yml jika sesuai.
- MySQL service.
- Persistent volume.
- Health check.
- Environment example.
- Migration command.
- Seed command.
- Backup script.
- Restore script.

MySQL container:
- Gunakan image versi yang sesuai.
- Gunakan persistent volume.
- Jangan menghapus volume secara otomatis.
- Gunakan healthcheck.
- Jangan expose port database ke internet jika tidak dibutuhkan.
- Gunakan network internal.
- Dokumentasikan upgrade MySQL.

Jika target deployment adalah shared hosting:
- Sediakan dokumentasi deployment tanpa Docker jika memungkinkan.
- Gunakan MySQL database yang disediakan hosting.
- Jelaskan konfigurasi DATABASE_URL.
- Jelaskan proses build frontend.
- Jelaskan proses menjalankan backend Node.js.
- Jelaskan keterbatasan hosting.

Jangan memasukkan credential production ke repository.

---

# 29. OBSERVABILITY

Buat:
- Structured logging.
- Health endpoint.
- Readiness endpoint.
- Database connectivity check.
- Request ID.
- Audit log.
- Device connection log.

Endpoint:
- GET /health.
- GET /ready.

Jangan menampilkan password, token, secret, atau informasi sensitif dalam log.

---

# 30. TESTING

Buat test untuk:

## Database
- Prisma connection.
- Migration.
- Seed.
- Foreign key.
- Unique constraint.
- JSON configuration.
- Transaction.

## Authentication
- Register.
- Login.
- Invalid password.
- Token expiration.
- Unauthorized access.

## Multi-Tenant
- Tenant isolation.
- Cross-tenant rejection.
- Project ownership.
- Role restriction.

## Project
- Create.
- Update.
- Delete.
- Template application.
- Project visibility.

## Code Generator
- Valid pin.
- Invalid pin.
- Pin conflict.
- Unsupported component.
- Missing library.
- Multiple components.

## Device
- Registration.
- Invalid credential.
- Revoke credential.
- Telemetry validation.
- Unauthorized command.

## Backup
- Backup script.
- Exit code.
- File creation.
- Backup verification.
- Restore testing.
- Credential protection.
- Retention policy.

Jalankan test aktual.
Jangan mengklaim test berhasil jika belum dijalankan.

---

# 31. STRUKTUR FOLDER

Gunakan struktur modular seperti berikut:

iot-project-platform/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── organizations/
│   │   │   ├── tenants/
│   │   │   ├── projects/
│   │   │   ├── templates/
│   │   │   ├── boards/
│   │   │   ├── components/
│   │   │   ├── code-generator/
│   │   │   ├── devices/
│   │   │   ├── telemetry/
│   │   │   ├── learning/
│   │   │   ├── assessments/
│   │   │   ├── audit-logs/
│   │   │   └── common/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── test/
│   │
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   ├── layouts/
│       │   ├── views/
│       │   ├── router/
│       │   ├── stores/
│       │   ├── services/
│       │   ├── composables/
│       │   └── types/
│       └── tests/
│
├── packages/
│   ├── shared-types/
│   ├── validation/
│   ├── code-generator/
│   └── project-templates/
│
├── scripts/
│   ├── backup-mysql.sh
│   ├── restore-mysql.sh
│   └── verify-backup.sh
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   └── scripts/
│
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   ├── security.md
│   ├── deployment.md
│   ├── backup-restore.md
│   └── roadmap.md
│
├── docker-compose.yml
├── docker-compose.production.yml
├── .env.example
├── .gitignore
├── package.json
└── README.md

Sesuaikan struktur jika menggunakan monorepo, tetapi jangan mengorbankan pemisahan modul.
Jangan membuat file backup masuk ke Git repository.
Jangan menyimpan .env production ke repository.

---

# 32. FASE PENGEMBANGAN

## FASE 0 — ANALISIS

1. Periksa repository.
2. Periksa file yang tersedia.
3. Identifikasi teknologi.
4. Buat arsitektur.
5. Buat database design MySQL.
6. Buat roadmap.
7. Buat security plan.
8. Buat deployment plan.
9. Buat backup dan restore plan.

Dokumen:
- docs/architecture.md
- docs/database.md
- docs/roadmap.md
- docs/security.md
- docs/backup-restore.md

## FASE 1 — FOUNDATION

Implementasikan:
- Backend NestJS.
- Frontend Vue.
- TypeScript.
- Prisma MySQL.
- Environment configuration.
- Docker Compose.
- Health check.
- Linting.
- Formatting.
- Basic test.

Pastikan aplikasi dapat dijalankan.

## FASE 2 — AUTHENTICATION

Implementasikan:
- User.
- Organization.
- Role.
- Permission.
- Login.
- Logout.
- Tenant context.
- Authorization.
- Audit log.

Uji cross-tenant access.

## FASE 3 — PROJECT ENGINE

Implementasikan:
- Project CRUD.
- Template.
- Board registry.
- Component registry.
- Project configuration.
- Logic configuration.

Seed:
- Smart Garden.
- Smart Home.
- ESP32.
- Arduino Uno.
- Sensor dan aktuator dasar.

## FASE 4 — CODE GENERATOR

Implementasikan:
- ESP32 code generator.
- Pin validation.
- Code preview.
- Download.
- Versioning.
- Wiring documentation.
- Generator test.

## FASE 5 — DEVICE DAN TELEMETRY

Implementasikan:
- Device registration.
- Credential.
- REST telemetry.
- Device status.
- Dashboard chart.
- Basic event log.

## FASE 6 — LEARNING

Implementasikan:
- Class.
- Teacher.
- Student.
- Lesson.
- LKPD.
- Assignment.
- Submission.
- Rubric.
- Assessment.
- Reflection.

## FASE 7 — WHITE LABEL

Implementasikan:
- Organization branding.
- Logo.
- Color.
- Application name.
- Settings.
- Template administration.

## FASE 8 — BACKUP DAN PRODUCTION

Implementasikan:
- MySQL backup.
- MySQL restore.
- Backup verification.
- File backup documentation.
- Retention policy.
- Deployment documentation.
- Security review.
- Performance review.
- Disaster recovery procedure.

---

# 33. ATURAN KERJA GEMINI CLI

1. Periksa repository sebelum mengubah file.
2. Jangan menghapus file penting tanpa persetujuan.
3. Jangan mengganti database ke PostgreSQL.
4. Jangan menggunakan sintaks khusus PostgreSQL.
5. Gunakan MySQL 8.x sebagai target.
6. Jangan menyimpan secret di source code.
7. Gunakan migration Prisma.
8. Jangan menggunakan prisma db push sebagai deployment production utama.
9. Jalankan formatter.
10. Jalankan linter.
11. Jalankan type check.
12. Jalankan test.
13. Periksa error aktual.
14. Jangan mengklaim fitur selesai tanpa pengujian.
15. Dokumentasikan keputusan arsitektur.
16. Jangan membuat fitur kompleks sebelum fondasi selesai.
17. Jangan membuat backup hanya sebagai file dummy.
18. Jangan mengklaim restore berhasil sebelum diuji.
19. Jangan menghapus volume database secara otomatis.
20. Laporkan semua asumsi dan keterbatasan.

---

# 34. FORMAT LAPORAN SETIAP FASE

Setelah setiap fase, tampilkan:

1. Tujuan fase.
2. File yang dibuat.
3. File yang diubah.
4. Struktur folder.
5. Perubahan schema database.
6. Migration yang dibuat.
7. Endpoint baru.
8. Halaman frontend.
9. Command yang dijalankan.
10. Hasil test.
11. Error yang belum diselesaikan.
12. Risiko yang diketahui.
13. Langkah berikutnya.

Bedakan dengan jelas:
- Berhasil dibuat.
- Berhasil diuji.
- Belum diuji.
- Diblokir oleh environment.
- Memerlukan konfigurasi pengguna.

---

# 35. PERINTAH MULAI

Mulai sekarang:

1. Periksa direktori kerja.
2. Periksa repository.
3. Jangan menghapus file.
4. Tentukan apakah proyek baru atau proyek yang sudah ada.
5. Buat analisis arsitektur.
6. Buat dokumen perencanaan.
7. Konfigurasikan MySQL dan Prisma.
8. Buat schema database awal.
9. Buat migration.
10. Buat seed development.
11. Buat Docker Compose untuk development jika sesuai.
12. Buat health check.
13. Jalankan aplikasi.
14. Jalankan migration.
15. Jalankan test dasar.
16. Laporkan hasil aktual.

Prioritas:

**Bangun fondasi IoT Project Learning Platform berbasis MySQL yang dapat digunakan pada shared hosting, VPS, Docker, dan server sekolah. Aplikasi harus modular, aman, dapat diperluas, serta memiliki backup dan restore database yang benar-benar dapat diuji.**