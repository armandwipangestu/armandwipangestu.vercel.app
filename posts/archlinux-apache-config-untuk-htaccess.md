---
title: "Arch Linux - Mengaktifkan Mod Rewrite Pada Configurasi Apache"
tag: "Linux"
date: "January 24 2023"
excerpt: "Pada artikel ini kita akan melakukan configurasi apache untuk enable .htaccess"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Mod Rewrtie adalah sebuah module yang menggunakan dasar rewriting engine untuk menulis ulang permintaan URL secara cepat, standarnya **mod_rewrite** memetakan URL ke jalur berkas sistem. Namun juga dapat digunakan untuk mengarahkan satu URL ke URL lain.

Contoh penggunaannya adalah ketika kita bekerja pada framework yang membutuhkan sebuah berkas **.htaccess**. Untuk memastikan berkas tersebut dapat bekerja, maka kita juga harus memastikan bahwa perangkat server yang digunakan telah menjalankan layanan **mod_rewrite**. Langkah yang harus dilakukan untuk mengaktifkannya adalah sebagai berikut:

## Konfigurasi berkas **apache**.

- **Ubuntu** -> `/etc/apache2/apache2.conf`
- **Archlinux** -> `/etc/httpd/conf/httpd.conf`

## Tambahkan dukungan **mod_rewrite** dan **.htaccess** pada situs dengan menambahkan

```apache
#Mengijinkan mod_rewrite dan .htaccess
<Directory "/alamat/direktori/anda">
    AllowOverride All
</Directory>
```

## Aktifkan **mod_rewrite**

- **Ubuntu** : `sudo a2enmod rewrite`
- **Archlinux** : Hilangkan tanda komentar pada berkas sebelumnya, pada baris `LoadModule rewrite_module modules/mod_rewrite.so`

## Restart Server **Apache**

- **Ubuntu** : `sudo service apache2 restart`
- **Archlinux** : `sudo systemctl restart httpd`

Setelah langkah di atas selesai dilakukan, kita coba buat berkas `.htaccess` lalu jalankan kembali situs anda.
