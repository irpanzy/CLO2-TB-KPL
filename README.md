# 📘 Dokumentasi Proyek: Sistem Manajemen Produk & Pengguna

## 📌 Deskripsi Umum

Aplikasi ini adalah sistem manajemen produk dan pengguna berbasis web dengan arsitektur RESTful API. Sistem mendukung fitur CRUD lengkap, upload gambar, serta filtering, pagination, dan limit baik melalui API maupun antarmuka pengguna (views).

## ⚙️ Teknologi yang Digunakan

| Teknologi  | Deskripsi                         |
| ---------- | --------------------------------- |
| Express.js | Framework web backend             |
| Prisma ORM | Mapping data ke PostgreSQL        |
| EJS        | Template engine untuk tampilan    |
| Multer     | Middleware upload gambar          |
| ImageKit   | Penyimpanan gambar berbasis cloud |
| dotenv     | Konfigurasi environment runtime   |
| Validator  | Validasi input produk & user      |

## 🧱 Teknik Konstruksi yang Diterapkan

| Teknologi                   | Implementasi                                     |
| --------------------------- | ------------------------------------------------ |
| Runtime Configuration       | Menggunakan `.env` dan `process.env`             |
| API                         | Endpoint RESTful pada `/api/v1`                  |
| Code Reuse / Library        | Modularisasi controller, middleware, dan service |
| Parameterization / Generics | Fungsi generik validasi dan paginasi             |

## 🔗 Dokumentasi API Endpoint

<h5>📦 Products API</h5>

| Method | URL API              | Description                                           | Body / Params                                                            | By    |
| ------ | -------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ | ----- |
| GET    | /api/v1/products     | Mengambil daftar semua produk                         | -                                                                        | irpan |
| GET    | /api/v1/products     | Mengambil daftar semua produk dengan pagination       | Query Params: `?page={pageNumber}&limit={pageSize}`                      | irpan |
| GET    | /api/v1/products/:id | Ambil produk berdasarkan ID                           | Path Param: `:id`                                                        | irpan |
| GET    | /api/v1/products/    | Mengambil daftar produk berdasarkan kategori tertentu | Query Params: `?category={categoryName}`                                 | irpan |
| POST   | /api/v1/products     | Tambah produk baru                                    | Body (form-data): `{ name, price, category, image }`                     | irpan |
| PUT    | /api/v1/products/:id | Ubah data produk berdasarkan ID                       | Path Param: `:id` + Body (form-data): `{ name, price, category, image }` | irpan |
| DELETE | /api/v1/products/:id | Hapus produk berdasarkan ID                           | Path Param: `:id`                                                        | irpan |

<h5>🧑‍💼 Users API</h5>

| Method | URL API           | Description                                   | Body / Params                                                     | By    |
| ------ | ----------------- | --------------------------------------------- | ----------------------------------------------------------------- | ----- |
| GET    | /api/v1/users     | Mengambil daftar semua user                   | -                                                                 | irpan |
| GET    | /api/v1/users     | Mengambil daftar semua user dengan pagination | Query Params: `?page={pageNumber}&limit={pageSize}`               | irpan |
| GET    | /api/v1/users/:id | Ambil user berdasarkan ID                     | Path Param: `:id`                                                 | irpan |
| POST   | /api/v1/users     | Tambah user baru                              | Body (form-data): `{ name, email, password }`                     | irpan |
| PUT    | /api/v1/users/:id | Ubah data user berdasarkan ID                 | Path Param: `:id` + Body (form-data): `{ name, email, password }` | irpan |
| DELETE | /api/v1/users/:id | Hapus user berdasarkan ID                     | Path Param: `:id`                                                 | irpan |

## 🌐 Dokumentasi View Routes

<h5>📦 Product API</h5>

| Method | URL API                 | Description                                         | By    |
| ------ | ----------------------- | --------------------------------------------------- | ----- |
| GET    | /view/products          | Tampilkan daftar user (dengan pagination dan limit) | irpan |
| GET    | /view/products          | Form tambah produk                                  | irpan |
| GET    | /view/products/:id/edit | Form edit produk berdasarkan ID                     | irpan |

<h5>🧑‍💼 Users API</h5>

| Method | URL API     | Description                                         | By    |
| ------ | ----------- | --------------------------------------------------- | ----- |
| GET    | /view/users | Tampilkan daftar user (dengan pagination dan limit) | irpan |
