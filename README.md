# OpenJob API

REST API backend untuk platform job board **OpenJob**, dibangun dengan **Node.js**, **Express 5**, **PostgreSQL**, dan **ES Modules**.

API ini menyediakan fitur autentikasi JWT, manajemen user, perusahaan, kategori, lowongan kerja, lamaran (applications), dan bookmark.

---

## Struktur Project

```
openjob-api/
├── src/
│   ├── app.js                 # Entry point aplikasi
│   ├── controllers/           # Business logic & handler route
│   ├── database/
│   │   ├── pool.js            # Koneksi PostgreSQL (runtime)
│   │   └── reset.js           # Reset schema database (migrate:fresh)
│   ├── middleware/
│   │   ├── auth.js            # Verifikasi JWT
│   │   ├── validate.js        # Validasi body dengan Joi
│   │   ├── errorHandler.js    # Global error handler
│   │   └── notFound.js        # Handler route tidak ditemukan
│   ├── migrations/            # File migration database
│   ├── routes/                # Definisi endpoint
│   ├── utils/                 # Helper (AppError, nanoid)
│   └── validations/           # Schema Joi per resource
├── .env.example               # Template environment variables
├── package.json
└── README.md
```

---

## Prasyarat

Pastikan sudah terinstall di mesin lokal:

- **Node.js** v18 atau lebih baru (disarankan v20+)
- **npm** v9+
- **PostgreSQL** v14 atau lebih baru

Cek versi:

```bash
node -v
npm -v
psql --version
```

---

## Setup Project

### 1. Clone repository

```bash
git clone <url-repository>
cd openjob-api
```

### 2. Install dependencies

```bash
npm install
```

---

## Konfigurasi Environment

### 1. Buat file `.env`

Salin dari template:

```bash
cp .env.example .env
```

### 2. Isi variabel environment

```env
# Port server (default: 5000 jika tidak diset)
PORT=3000

# Koneksi PostgreSQL
PGUSER=postgres
PGPASSWORD=password_anda
PGDATABASE=openjob
PGHOST=localhost
PGPORT=5432
DATABASE_URL=postgres://postgres:password_anda@localhost:5432/openjob

# Secret key JWT (ganti dengan string random yang kuat)
ACCESS_TOKEN_KEY=your_access_secret_key
REFRESH_TOKEN_KEY=your_refresh_secret_key
```

### Penjelasan Variabel

| Variabel            | Wajib  | Deskripsi                                             |
| ------------------- | ------ | ----------------------------------------------------- |
| `PORT`              | Tidak  | Port server. Default `5000`                           |
| `DATABASE_URL`      | **Ya** | Connection string PostgreSQL. Dipakai app & migration |
| `PGUSER`            | **Ya** | Username PostgreSQL. Dipakai script `reset.js`        |
| `PGPASSWORD`        | **Ya** | Password PostgreSQL                                   |
| `PGDATABASE`        | **Ya** | Nama database                                         |
| `PGHOST`            | **Ya** | Host PostgreSQL (biasanya `localhost`)                |
| `PGPORT`            | **Ya** | Port PostgreSQL (biasanya `5432`)                     |
| `ACCESS_TOKEN_KEY`  | **Ya** | Secret key untuk access token (expires 3 jam)         |
| `REFRESH_TOKEN_KEY` | **Ya** | Secret key untuk refresh token (expires 7 hari)       |

> **Penting:** Jangan commit file `.env` ke Git. File ini sudah masuk `.gitignore`.

---

## Setup Database

### 1. Pastikan PostgreSQL berjalan

```bash
# macOS (Homebrew)
brew services start postgresql

# Linux (systemd)
sudo systemctl start postgresql
```

### 2. Buat database

Masuk ke PostgreSQL:

```bash
psql -U postgres
```

Buat database:

```sql
CREATE DATABASE openjob;
\q
```

Ganti `openjob` sesuai nilai `PGDATABASE` di file `.env`.

### 3. Verifikasi koneksi

Pastikan `DATABASE_URL` di `.env` mengarah ke database yang benar.

---

## Migration

Project menggunakan **[node-pg-migrate](https://github.com/salsita/node-pg-migrate)** dengan file migration ES Modules di `src/migrations/`.

### Urutan migration

| File                                            | Tabel             |
| ----------------------------------------------- | ----------------- |
| `1775996596800_create-users-table.js`           | `users`           |
| `1775996596801_create-authentications-table.js` | `authentications` |
| `1775996596802_create-companies-table.js`       | `companies`       |
| `1775996596803_create-categories-table.js`      | `categories`      |
| `1775996596804_create-jobs-table.js`            | `jobs`            |
| `1775996596805_create-aplications-table.js`     | `applications`    |
| `1775996596806_create-bookmarks-table.js`       | `bookmarks`       |

### Menjalankan migration

Pastikan environment variable sudah ter-load (file `.env` ada di root project).

```bash
# Jalankan semua migration (up)
npm run migrate:up

# Rollback migration terakhir (down)
npm run migrate:down

# Buat file migration baru
npm run migrate:create -- nama_migration_anda
```

### Reset database (fresh migration)

**PERINGATAN:** Perintah ini akan **menghapus semua data** di schema `public`.

```bash
npm run migrate:fresh
```

Perintah ini menjalankan:

1. `src/database/reset.js` — drop & recreate schema `public`
2. `npm run migrate:up` — jalankan ulang semua migration

---

## Menjalankan Project

### Development (dengan auto-reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

Server akan berjalan di:

```
http://localhost:<PORT>
```

Contoh: jika `PORT=3000` → `http://localhost:3000`

### Cek server

```bash
curl http://localhost:3000/
```

Response:

```json
{ "message": "Hello World!" }
```

---

## Daftar Endpoint

> 🔓 = Public &nbsp;|&nbsp; 🔒 = Butuh Bearer Token

### Root

| Method | Endpoint | Auth | Deskripsi    |
| ------ | -------- | ---- | ------------ |
| GET    | `/`      | 🔓   | Health check |

### Users

| Method | Endpoint     | Auth | Deskripsi          |
| ------ | ------------ | ---- | ------------------ |
| POST   | `/users`     | 🔓   | Register user baru |
| GET    | `/users/:id` | 🔓   | Detail user by ID  |

### Authentications

| Method | Endpoint           | Auth | Deskripsi                    |
| ------ | ------------------ | ---- | ---------------------------- |
| POST   | `/authentications` | 🔓   | Login                        |
| PUT    | `/authentications` | 🔓   | Refresh access token         |
| DELETE | `/authentications` | 🔓   | Logout (hapus refresh token) |

### Companies

| Method | Endpoint         | Auth | Deskripsi          |
| ------ | ---------------- | ---- | ------------------ |
| GET    | `/companies`     | 🔓   | List semua company |
| GET    | `/companies/:id` | 🔓   | Detail company     |
| POST   | `/companies`     | 🔒   | Tambah company     |
| PUT    | `/companies/:id` | 🔒   | Update company     |
| DELETE | `/companies/:id` | 🔒   | Hapus company      |

### Categories

| Method | Endpoint          | Auth | Deskripsi           |
| ------ | ----------------- | ---- | ------------------- |
| GET    | `/categories`     | 🔓   | List semua kategori |
| GET    | `/categories/:id` | 🔓   | Detail kategori     |
| POST   | `/categories`     | 🔒   | Tambah kategori     |
| PUT    | `/categories/:id` | 🔒   | Update kategori     |
| DELETE | `/categories/:id` | 🔒   | Hapus kategori      |

### Jobs

| Method | Endpoint                     | Auth | Deskripsi                                        |
| ------ | ---------------------------- | ---- | ------------------------------------------------ |
| GET    | `/jobs`                      | 🔓   | List jobs (filter: `?title=` & `?company-name=`) |
| GET    | `/jobs/:id`                  | 🔓   | Detail job                                       |
| GET    | `/jobs/company/:companyId`   | 🔓   | Jobs by company                                  |
| GET    | `/jobs/category/:categoryId` | 🔓   | Jobs by category                                 |
| POST   | `/jobs`                      | 🔒   | Tambah job                                       |
| PUT    | `/jobs/:id`                  | 🔒   | Update job                                       |
| DELETE | `/jobs/:id`                  | 🔒   | Hapus job                                        |
| GET    | `/jobs/:jobId/bookmark/:id`  | 🔒   | Detail bookmark job                              |
| POST   | `/jobs/:jobId/bookmark`      | 🔒   | Bookmark job                                     |
| DELETE | `/jobs/:jobId/bookmark`      | 🔒   | Hapus bookmark job                               |

### Applications

| Method | Endpoint                     | Auth | Deskripsi                 |
| ------ | ---------------------------- | ---- | ------------------------- |
| GET    | `/applications`              | 🔒   | List semua applications   |
| GET    | `/applications/:id`          | 🔒   | Detail application        |
| GET    | `/applications/user/:userId` | 🔒   | Applications by user      |
| GET    | `/applications/job/:jobId`   | 🔒   | Applications by job       |
| POST   | `/applications`              | 🔒   | Lamar pekerjaan           |
| PUT    | `/applications/:id`          | 🔒   | Update status application |
| DELETE | `/applications/:id`          | 🔒   | Hapus application         |

### Bookmarks

| Method | Endpoint                  | Auth | Deskripsi            |
| ------ | ------------------------- | ---- | -------------------- |
| GET    | `/bookmarks`              | 🔒   | List semua bookmarks |
| GET    | `/bookmarks/user/:userId` | 🔒   | Bookmarks by user    |

### Profile

| Method | Endpoint                | Auth | Deskripsi           |
| ------ | ----------------------- | ---- | ------------------- |
| GET    | `/profile`              | 🔒   | Profil user login   |
| GET    | `/profile/applications` | 🔒   | Lamaran user login  |
| GET    | `/profile/bookmarks`    | 🔒   | Bookmark user login |

---

## Format Response

### Sukses

```json
{
  "status": "success",
  "message": "Pesan opsional",
  "data": {}
}
```

### Gagal (validasi / bisnis)

```json
{
  "status": "failed",
  "message": "Deskripsi error"
}
```

### Error server

```json
{
  "status": "error",
  "message": "Terjadi kegagalan pada server"
}
```

### HTTP Status Code

| Code  | Kondisi                             |
| ----- | ----------------------------------- |
| `200` | Sukses                              |
| `201` | Resource berhasil dibuat            |
| `400` | Input tidak valid / data duplikat   |
| `401` | Token tidak ada / tidak valid       |
| `404` | Resource atau route tidak ditemukan |
| `500` | Error server                        |

---

## Scripts NPM

| Script                   | Perintah                     | Deskripsi                   |
| ------------------------ | ---------------------------- | --------------------------- |
| `npm start`              | `node src/app.js`            | Jalankan server production  |
| `npm run dev`            | `nodemon src/app.js`         | Jalankan server development |
| `npm run migrate:up`     | `node-pg-migrate ... up`     | Jalankan migration          |
| `npm run migrate:down`   | `node-pg-migrate ... down`   | Rollback migration          |
| `npm run migrate:create` | `node-pg-migrate ... create` | Buat file migration baru    |
| `npm run migrate:fresh`  | reset + migrate up           | Reset DB & migrate ulang    |

---

## Troubleshooting

### `Error: connect ECONNREFUSED` saat start/migrate

- Pastikan PostgreSQL service sedang berjalan
- Cek `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` di `.env`
- Pastikan database sudah dibuat

### Migration gagal: `database does not exist`

```sql
CREATE DATABASE openjob;
```

Sesuaikan nama database dengan `PGDATABASE` di `.env`.

### Migration gagal: `relation already exists`

Database sudah pernah di-migrate. Pilih salah satu:

```bash
# Rollback lalu migrate ulang
npm run migrate:down
npm run migrate:up

# ATAU reset total (hapus semua data)
npm run migrate:fresh
```

### `Token tidak valid` / `401 Unauthorized`

- Pastikan header: `Authorization: Bearer <accessToken>`
- Access token expired (3 jam) → refresh dengan `PUT /authentications`
- Pastikan `ACCESS_TOKEN_KEY` tidak berubah setelah token dibuat

### `Cannot find module` / error ESM

Project ini menggunakan **ES Modules** (`"type": "module"`). Pastikan:

- Import selalu menyertakan ekstensi `.js`
- Tidak menggunakan `require()` / `module.exports`

### Port sudah dipakai

Ubah `PORT` di `.env` atau hentikan proses yang menggunakan port tersebut:

```bash
lsof -ti:3000 | xargs kill -9
```

---

## Quick Start (Ringkas)

```bash
# 1. Install
npm install

# 2. Setup env
cp .env.example .env
# Edit .env sesuai konfigurasi lokal

# 3. Buat database di PostgreSQL
createdb -U postgres openjob

# 4. Migration
npm run migrate:up

# 5. Jalankan
npm run dev
```

Server siap di `http://localhost:3000` 🚀
