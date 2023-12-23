---
published: true
title: "Laravel 8 - #1 - Apa itu Laravel?"
tag: "Programming"
date: "December 19 2023"
excerpt: "Introduction Laravel 8, apa sih Laravel itu? Apa itu Web Application Framework? Siapa pembuat Laravel? Tujuan Laravel dibuat?"
cover_image: "/images/posts/Laravel 8 - Apa itu Laravel.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Apa itu Laravel?

Jika dikutip melalui web resmi nya di [laravel.com](https://laravel.com)

> "Laravel is a web application framework with expressive, elegant syntax."

atau jika diartikan dalam bahasa indonesia adalah

> "Kerangka aplikasi web dengan sintaks yang elegan dan ekspresif"

Pada kutipan tersebut terdapat keyword atau kata kunci yang penting yaitu `web application framework`.

### Apa itu Web Application Framework?

- Sebuah `kerangka` yang di desain untuk mendukung pembangunan aplikasi web.
- Menyediakan standar atau cara untuk membangun aplikasi web.
- Bertujuan untuk mengotomasi hal-hal umum yang biasanya dilakukan saat membangun aplikasi web.
- Contohnya: database library, templating engine, session management, authentication, security, dll.

### Siapa pembuat Laravel?

- Dibuat oleh `Taylor Otwell`.
- Dibuat pada bulan Juni tahun 2011.
- Tujuan laravel dibuat adalah sebagai alternatif framework php selain CodeIgniter.
- Versi terbarunya saat dokumen ini dibuat adalah versi 10.

### Filosofi Laravel

Dikutip dari pembuat laravel yaitu `Taylor Otwell`

> "We believe development must be an enjoyable, creative experience to be truly fulfilling."

atau jika diartikan dalam bahasa indonesia adalah

> "Kita percaya bahwa ketika pengembangan aplikasi atau perangkat lunak itu harus bisa
> dinikmati dan juga merupakan pengalaman yang kreatif yang bisa memberikan kepuasan
> atau kebahagiaan."

### Tujuan Laravel dibuat?

Dikutip dari website resmi nya oleh `Taylor Otwell`

> "Laravel aims to make the development process a pleasing one for the developer
> without sacrificing application functionality. **Happy Developers make the best
> code**."

atau jika diartikan dalam bahasa indonesia adalah

> "Tujuan laravel dibuat itu untuk proses pengembangan bisa dinikmati oleh developer
> nya, tanpa harus mengorbankan fungsionalitas aplikasinya. Sehingga kita ketika
> membuat aplikasi itu harus bisa dinikmati, karena apa? karena jika developer nya
> happy atau bahagia maka kode yang dihasilkan juga pasti yang terbaik."

### Fitur utama pada Laravel

- Menganut paradigma MVC (Model, View dan Controller).
- Templating Engine.
- Artisan Console (fitur yang cukup keren, dimana kita bisa melakukan modifikasi atau konfigurasi terhadap framework nya melalui syntax-syntax CLI).
- Eloquent ORM (Object Relational Mapping), dimana akan mempermudah kita ketika berinteraksi dengan database yang relational, seperti MySQL.
- Authentication & Authorization, dimana memperudah kita ketika ingin membuat fitur login dan registrasi.
- Testing.
- Packaging System.
- Multiple File System
- Task Scheduling.
- Websocket Programming.

### Ekosistem Laravel

![Laravel Ecosystem](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/apa-itu-laravel/laravel-ecosystem.png)

Pada framework laravel ini, memiliki sebuah ekosistem yang dimana jika kita ingin menggunakan layanan apapun atau fitur apapun, laravel ini sudah banyak produk selain laravel itu sendiri. Misalkan, kita ingin membuat sebuah platform yang serverless, sudah ada produk yang namanya `Vapor`. Atau jika ingin mengelola server, sudah ada yang namanya `Forge`. Jika kalian ingin mengelola lokal docker environtment kalian, ada yang namanya `Sail`. Kalo butuh micro-framework ada yang namanya `Lumen`.

Produk-produk tersebut adalah produk yang ada di ecosystem laravel yang akan bekerja dengan baik ketika kita menggunakan laravel untuk aplikasi kita dan kita ingin menggunakan layanan lain.

Jika kalian penasaran website seperti apa saja sih yang sudah dibuat dengan framework laravel, utnuk melihat nya kalian bisa mengunjungi halaman berikut ini [awwwards.com/websites/laravel](https://awwwards.com/websites/laravel)

## Pre-requisite

- PHP Dasar, yaitu bahasa pemrograman nya itu sendiri seperti bagaimana cara menjalankan aplikasi PHP di lokal sistem kalian, bagaimana sintaks php secara programming seperti menulis variabel, tipe data apa saja, bagaimana cara menulis looping, pengkondisian, array, object, bagaimana php bisa terkoneksi kedalam sebuah database mysql.
- Object Oriented Programming PHP, kalian harus tahu bagaimana konsep paradigma OOP tersebut diterapkan pada bahasa pemrograman PHP.
- Konsep MVC, dari sisi konsepnya, sisi definisinya, sampai bagaimana menerapkan MVC sederhana menggunakan bahasa pemrograman PHP yang sudah Object Oriented.

## Requirement atau Tools Pendukung

> **Catatan**:
>
> Untuk PHP, Database dan Webserver kalian bisa install menggunakan software bundle
> seperti `XAMPP`, `LAMP`, `MAMP`, atau `Laragon`.

- PHP versi 7.4 atau 8
- MySQL
- Apache atau Nginx
- Composer Versi 2, sebuah package manager untuk mempermudah menginstall package package php termasuk laravel nya.
- SequelPro, MySQL Workbench, HeidiSQL, Beekeper Studio, untuk aplikasi client database (seperti phpMyAdmin).
- Terminal atau CMD atau PowerShell atau GitBash, karena nantinya kita akan menjalankan perintah composer dan juga artisan.
- Code Editor: Visual Studio Code, PhpStrom, Sublime Text.
- Extension pada VS Code:
  - PHP Intelephense
  - Laravel Artisan
  - Laravel Snippets
  - Laravel Blade Snippets
  - Laravel Blade Spacer
  - Laravel GoTo View
