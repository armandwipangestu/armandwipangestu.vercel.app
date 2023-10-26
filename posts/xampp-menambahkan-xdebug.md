---
published: true
title: "XAMPP - Menambahkan Xdebug"
tag: "Programming"
date: "January 25 2023"
excerpt: "Pada artikel ini kita akan mencoba menambahkan Xdebug pada configurasi Apache di XAMPP"
cover_image: "/images/posts/XAMPP - Install Xdebug.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Download Xdebug

Untuk PHP Version 8.1 kalian bisa download Xdebug di link berikut [ini](https://xdebug.org/files/php_xdebug-3.2.0-8.1-vs16-x86_64.dll) atau kunjungi
link website resmi nya yaitu [xdebug.org/download](https://xdebug.org/download)

## Memindahkan Xdebug Kedalam Extension PHP

Selanjutnya setelah di download kalian pindahkan file `php_xdebug-3.2.0-8.1-vs16-x86_64.dll` tersebut ke dalam folder `C:\xampp\php\ext`

## Menambahkan Extension Xdebug kedalam Configurasi PHP

Buka configurasi `php.ini` pada XAMPP dan tambahkan configurasi berikut di akhir file

```apache
[XDebug]
zend_extension = "c:\xampp\php\ext\php_xdebug-3.2.0-8.1-vs16-x86_64.dll"
xdebug.remote_autostart = 1
xdebug.profiler_append = 0
xdebug.profiler_enable = 0
xdebug.profiler_enable_trigger = 0
xdebug.profiler_output_dir = "c:\xampp\tmp"
;xdebug.profiler_output_name = "cachegrind.out.%t-%s"
xdebug.remote_enable = 1
xdebug.remote_handler = "dbgp"
xdebug.remote_host = "127.0.0.1"
xdebug.remote_log = "c:\xampp\tmp\xdebug.txt"
xdebug.remote_port = 9000
xdebug.trace_output_dir = "c:\xampp\tmp"
;36000 = 10h
xdebug.remote_cookie_expire_time = 36000
```

Selanjut nya kalian tinggal restart service apache nya pada aplikasi XAMPP

## Hasil

Untuk melakukan melihat perbedaan hasil nya kalian tinggal lakukan `var_dump`. Contohnya sebagai berikut:

```php
<?php

$dummy_data = [
    "key1" => "testing1",
    "key2" => "testing2"
];

var_dump($dummy_data);
die;

?>
```

| Tanpa Xdebug                                                                                                    | Menggunakan Xdebug                                                                                              |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/64394320/214496002-9a039ed6-5a72-47d5-92d5-db1774ff043c.png) | ![image](https://user-images.githubusercontent.com/64394320/214495849-2cda1718-4b8f-4e36-9825-276dab0ea22d.png) |
