---
published: false
title: "Ubuntu - Instalasi dan Konfigurasi LEMP Stack"
tag: "Linux"
date: "August 30 2023"
excerpt: "Pada artikel ini saya akan melakukan instalasi dan konfigurasi LEMP atau Linux, Nginx, MariaDB, dan PHP pada sistem operasi Ubuntu Server 22.04"
cover_image: "/images/posts/Ubuntu - Instalasi dan Konfigurasi LEMP Stack.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

`LEMP` Stack adalah sekelompok perangkat lunak atau software yang dapat digunakan untuk melayani halaman web dinamis dan aplikasi web yang
ditulis menggunakan PHP. Ini adalah akronim yang menggambarkan sistem operasi Linux, dengan webserver Nginx (diucapkan seperti "**Engine-X**").
Data backend disimpan dalam database MySQL dan pemrosesan dinamis ditangani oleh PHP.

Artikel ini menunjukkan cara menginstal LEMP Stack di Server Ubuntu Server 22.04. Sistem operasi Ubuntu menangani bagian tumpukan Linux.
Kami akan menjelaskan cara mengaktifkan dan menjalankan komponen lainnya.

## Instalasi Nginx Web Server

Untuk menampilkan halaman web kepada pengunjung situs, Anda akan menggunakan Nginx, webserver berkinerja tinggi. Anda akan menggunakan
packet manager `APT` untuk menginstal software tersebut.

Untuk menginstal nya, Anda dapat menggunakan perintah berikut ini:

```shell
sudo apt install nginx -y
```

![Nginx Instal](../images/posts/assets/ubuntu_install_lemp_stack/nginx_install.png)

Untuk melihat tampilan bawaan dari Nginx, Anda dapat pergi ke web browser kemudian isikan URL nya dengan format `http://ip_server_anda`

![Nginx Default](../images/posts/assets/ubuntu_install_lemp_stack/nginx_default.png)

Jika anda melihat halaman tersebut, artinya anda berhasil menginstal Nginx atau webserver.

## Instalasi MySQL Database

Sekarang anda mempunyai webserver dan sudah berjalan, anda perlu menginstal database sistem untuk menyimpan dan mengatur data di situs anda.
MySQL adalah database yang populer untuk me-manage system menggunakan lingkungan PHP.

Untuk menginstal nya, Anda dapat menggunakan perintah berikut ini:

```shell
sudo apt install mysql-server -y
```

![MySQL Instal](../images/posts/assets/ubuntu_install_lemp_stack/mysql_install.png)

Setelah proses instalasi selesai, sangat disarankan untuk menjalankan script security dari bawaan instalasi MySQL. Script ini akan menghapus
beberapa pengaturan bawaan yang tidak aman dan mengunci akses ke sistem database Anda. Untuk menjalankan nya anda bisa menggunakan perintah
berikut ini:

```shell

```
