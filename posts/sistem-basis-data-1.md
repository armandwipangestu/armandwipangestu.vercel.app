---
published: false
title: "Sistem Basis Data - 1"
tag: "Programming"
date: "October 6 2023"
excerpt: "Pada artikel kali ini, saya akan membuat series untuk membahas mengenai Sistem Basis Data"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pengaplikasian Basis Data

Basis data ini sudah terlekat kepada banyak sistem, contoh nya seperti dibawah ini

- Enterprise Information
  - Sales: pelanggan, produk, penjualan
  - Accounting: pembayaran, struk, aset
  - Human Resources: informasi pegawai, gaji, pajak
- Manufacturing: manajemen produksi, inventori, pemesanan, rantai pasok
- Banking dan Finance
  - Informasi pelanggan, akun, pinjaman, dan transaksi perbankan
  - Transaksi kartu kredit
  - Finance: jual beli instrumen finansial (contoh: saham dan obligasi; penyimpanan data pasar secara real-time)
- Universities: Registrasi, penilaian
- Penerbangan: pemesanan tiket, penjadwalan
- Telekomunikasi: catatan panggilan, teks, penggunaan data, tagihan bulanan, pulsa
- Layanan berbasis web:
  - Ritel online: lacak pesanan, rekomendasi
  - Iklan online
- Basis data dokumen
- Sistem navigasi: rute jalan, sistem kereta, bis, etc.

## Sistem Basis Data

- **Database Management System** (DBMS) adalah:
  - **Kumpulan data** yang saling terkait satu sama lain.
  - Kumpulan program untuk mengakses data.
  - Sebuah sistem untuk memudahkan dalam **menyimpan dan mengambil informasi** dengan mudah dan efisien.
- Sistem basis data digunakan untuk mengelola kumpulan data yang:
  - Sangat bernilai
  - Ukurannya relatif besar
  - Diakses oleh banyak pengguna dan aplikasi **diwaktu yang sama**
- Sistem basis data adalah merupakan sebuah perangkat lunak yang kompleks yang memiliki tugas untuk mengelola kumpulan data yang besar, dan kompleks.

## Tujuan Sistem Basis Data

Pada awalnya, aplikasi basis data dibangun langsung di atas sistem file, yang mengakibatkan:

- **Redundansi dan inkonsistensi data**: data disimpan dalam berbagai format berkas yang menyebabkan penggandaan informasi dalam berkas yang berbeda.
- **Kesulitan dalam mengakses data**: perlu menulis program baru untuk menjalankan setiap tugas baru.
- **Isolasi data**: berbagai berkas dan format.
- **Masalah integrasi**:
  - Integrity constraints (misalnya, saldo rekening > 0) tersembunyi dalam kode program daripada dinyatakan secara eksplisit.
  - Sulit untuk menambahkan constraints baru atau mengubah yang sudah ada.
- **Atomicity of updates**:
  - Kegagalan dapat meninggalkan basis data dala keadaan tidak konsisten dengan pembaruan parsial yang dilakukan.
  - Contoh: transfer dana dari satu rekening ke rekening lain harus entah selesai atau sama sekali tidak terjadi.
- **Akses bersama oleh beberapa pengguna**:
  - Akses bersama diperlukan untuk kinerja
  - Akses bersama yang tidak terkendali dapat menyebabkan inkonsistensi
  - Contoh: Dua orang membaca saldo (misalnya 100) dan memperbarui dengan menarik uang (misalnya 50 masing-masing) pada saat yang sama
- **Masalah keamanan**: Sulit untuk memberikan akses pengguna ke beberapa, tetapi tidak semua, data

> **Catatan**: Sistem basis data menawarkan solusi untuk semua masalah diatas.
