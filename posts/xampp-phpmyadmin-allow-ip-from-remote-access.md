---
title: "XAMPP - Phpmyadmin Allow Ip From Remote Access"
tag: "Setup"
date: "Februrary 13 2023"
excerpt: "Pada artikel ini kita akan melakukan configurasi phpmyadmin agar dapat diakses melalui ip address"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Ubah Configrasi Apache

Untuk memberi izin phpmyadmin dapat di akses melalui IP Address kita perlu merubah konfigurasi Apache di file `C:\xampp\apache\conf\extra\httpd-xampp.conf`

Ubah code berikut:

```apache
Alias /phpmyadmin "C:/xampp/phpMyAdmin/"
<Directory "C:/xampp/phpMyAdmin">
    AllowOverride AuthConfig
    Require local
    ErrorDocument 403 /error/XAMPP_FORBIDDEN.html.var
</Directory>
```

Menjadi:

```apache
Alias /phpmyadmin "C:/xampp/phpMyAdmin/"
<Directory "C:/xampp/phpMyAdmin">
    AllowOverride AuthConfig
    Require all granted
    ErrorDocument 403 /error/XAMPP_FORBIDDEN.html.var
</Directory>
```
