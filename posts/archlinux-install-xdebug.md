---
published: true
title: "Arch Linux - Install Xdebug"
tag: "Linux"
date: "March 01 2023"
excerpt: "Pada artikel ini kita akan melakukan instalasi Xdebug untuk PHP dan berjalan di web server Apache"
cover_image: "/images/posts/Arch Linux - Install Xdebug.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Install Package Xdebug

```bash
sudo pacman -S xdebug
```

## Menambahkan Extension Xdebug di file konfigurasi PHP

PATH Konfigurasi `php.ini` berada di `/etc/php/php.ini`

> Tambahkan konfigurasi berikut di baris paling bawah

```apache
[XDebug]
;zend_extension=/usr/lib/php81/modules/xdebug.so
zend_extension = /usr/lib/php81/modules/xdebug.so
xdebug.remote_autostart = 1
xdebug.profiler_append = 0
xdebug.profiler_enable = 0
xdebug.profiler_enable_trigger = 0
xdebug.remote_enable = 1
xdebug.remote_handler = "dbgp"
xdebug.remote_host = "127.0.0.1"
xdebug.remote_port = 9003
;36000 = 10h
xdebug.remote_cookie_expire_time = 36000
xdebug.profiler_output_dir = "/var/tmp/"
;xdebug.profiler_output_name = "cachegrind.out.%t-%s"
xdebug.remote_log = "/var/log/"
xdebug.trace_output_dir = "/var/tmp/"
xdebug.display_errors = on
xdebug.display_startup_errors = on
```

Perhatikan pada konfigurasi `zend_extension = ...`, sesuaikan dengan PATH xdebug kalian

## Restart Service Apache

Setelah menambahkan konfigurasi pada `php.ini`. Kita membutuhkan restart service apache nya agar konfigurasi
yang sudah kita tambahkan tadi ke load

```bash
sudo systemctl restart httpd
```

## Hasilnya

| Tanpa Xdebug                                                                                                    | Menggunakan Xdebug                                                                                              |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/64394320/222043478-88cdf696-1ab7-4162-8765-c72f058d37c0.png) | ![image](https://user-images.githubusercontent.com/64394320/222043591-7f9af463-1e03-4a0b-9557-0c619add6911.png) |
