---
published: true
title: "Laravel 8 - #2 - Instalasi dan Konfigurasi"
tag: "Programming"
date: "December 20 2023"
excerpt: "Bagaimana cara instalasi dan konfigurasi Laravel pada sistem operasi Windows, macOS dan Linux?"
cover_image: "/images/posts/Laravel 8 - Instalasi dan Konfigurasi.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Instalasi dan Konfigurasi Laravel

Sebelum install pastikan PHP dan Composer sudah tersintal pada sistem operasi anda. Untuk mengecek nya anda bisa membuka terminal kemudian ketikan perintah berikut ini:

### Mengecek PHP

```bash
php -v
```

Apabila perintah diatas berhasil dijalankan maka akan muncul sebuah output tulisan seperti berikut ini:

```bash
PHP 8.0.29 (cli) (built: Jun  7 2023 21:22:06) ( ZTS Visual C++ 2019 x64 )
Copyright (c) The PHP Group
Zend Engine v4.0.29, Copyright (c) Zend Technologies
    with Xdebug v3.3.0alpha3, Copyright (c) 2002-2023, by Derick Rethans
```

### Mengecek Composer

> **Catatan**:
>
> Jika composer belum kalian install, kalian bisa pergi ke website resmi nya disini [getcomposer.org/download/](https://getcomposer.org/download/)

```bash
composer -V
```

Apabila perintah diatas berhasil dijalankan maka akan muncul sebuah output tulisan seperti berikut ini:

```bash
Composer version 2.5.8 2023-06-09 17:13:21
```

### macOS

#### macOS: Install Laravel Melalui Composer

Untuk menginstall Laravel melalui composer, kalian bisa jalankan perintah berikut ini:

> **Catatan**:
>
> Perintah berikut ini artinya adalah, composer buatkan project dari username package dan repository berikut di folder tertentu.
>
> ```bash
> composer create-project user/repo folder-target
> ```

```bash
composer create-project laravel/laravel coba-laravel
```

setelah project laravel tersintal, untuk menjalankan project nya kalian bisa gunakan perintah berikut ini:

> **Catatan**:
>
> Jalankan perintah berikut ini didalam folder laravel nya, pastikan working directory terminal anda sudah berada di laravel project nya.

```bash
php artisan serve
```

Apabila perintah diatas berhasil dijalankan, maka project laravel akan berjalan di local server dengan port 8000

```
localhost:8000
```

atau ip loopback

```
127.0.0.1:8000
```

#### macOS: Install Laravel Menggunakan Laravel Installer

Perbedaan laravel installer dengan composer, disini jika kita butuh untuk mendownload laravel nya maka tidak akan mendownload semuanya sehingga proses nya akan lebih cepat. Untuk menginstall laravel installer nya jalankan perintah berikut ini:

```bash
composer global require laravel/installer
```

Setelah installer nya terinstal, selanjutnya untuk membuat project laravel menggunakan installer nya jalankan perintah berikut ini:

> **Catatan**:
>
> Jika perintah `laravel` not found, maka anda perlu menambahkan PATH hasil dari instalasi package composer ke dalam profile atau environment anda. Seperti berikut ini
>
> ```bash
> echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' > ~/.bash_profile
> ```
>
> Setelah itu reload session BASH nya agar meload konfigurasi bash profile terbaru dengan perintah
>
> ```bash
> source ~/.bash_profile
> ```

```bash
laravel new coba-laravel
```

Setelah project laravel tersintal, untuk menjalankan project nya kalian bisa gunakan perintah berikut ini:

> **Catatan**:
>
> Jalankan perintah berikut ini didalam folder laravel nya, pastikan working directory terminal anda sudah berada di laravel project nya.

```bash
php artisan serve
```

Apabila perintah diatas berhasil dijalankan, maka project laravel akan berjalan di local server dengan port 8000

```
localhost:8000
```

atau ip loopback

```
127.0.0.1:8000
```

#### macOS: Install Laravel Menggunakan Valet

Valet adalah sebuah laravel development environment untuk sistem operasi macOS minimalis. Pada valet ini nantinya project laravel kita akan otomatis mempunyai local domain dengan nama top level domain nya adalah `*.test`. Valet ini berjalan menggunakan Web Server Nginx dan DnsMasq

Sesuai dengan namanya, valet ini seperti kita valet parkir di dunia nyata yang dimana ketika kita parkir maka kendaraan kita diberikan ke petugas untuk mencari tempat parkir. Valet ini juga sama, yang dimana nanti nya kita bisa tentukan mau parkir dimana, otomatis layanan ini yang akan mengatur aplikasi kita akan disimpan dimana sehingga cukup panggil dengan nama `*.test`

Untuk meginstall Valet nya, kalian bisa jalankan perintah berikut ini

```bash
composer global require laravel/valet
```

Setelah package `laravel/valet` terisntall, jalankan perintah berikut ini untuk menginstall valet nya

```bash
valet install
```

Setelah terinstall, untuk mengecek nya kalian bisa melakukan ping ke nama domain apapun `*.test` di terminal kalian menggunakan perintah berikut ini:

```bash
ping foobar.test
```

Jika valet terinstall maka anda akan mendapatkan respon dari ip loopback `127.0.0.1`

Setelah mengecek apakah valet terinstall, selanjutnya kita perlu menentukan folder mana yang akan dijadikan tempat parkir nya. Misal disini saya ilustrasikan kita akan menyimpan semua project laravel di PATH `~/Documents/Applications/*`, sehingga nantinya jika terdapat folder atau project laravel di PATH tersebut kita langsung bisa mengakses nya melalui domain `nama-folder.test`

Untuk membuat folder PATH tersebut menjadi tempat parkir nya, jalankan perintah berikut ini:

```bash
valet park
```

Jika perintah diatas dijalankan, maka akan muncul output tulisan seperti berikuti ini:

```bash
This directory has been added to Valet's paths.
```

Sekarang untuk menjalankan project laravel yang sebelumnya di install yaitu `coba-laravel`, kita tidak perlu lagi menggunakan perintah `php artisan serve`. Namun kita bisa langsung mengetikan nama domain nya di url browser dengan format `nama-folder.test` atau dalam kasus ini adalah `coba-laravel.test`.

Sehingga jika kalian menginstall project laravel baru di PATH `~/Documents/Applications` maka kalian bisa langsung mengakses nya di url browser dengan nama domain `*.test` (tanpa perlu perintah `php artisan serve` lagi).

### Windows

#### Windows: Install Laravel Melalui Composer

Untuk menginstall Laravel melalui composer, kalian bisa jalankan perintah berikut ini:

> **Catatan**:
>
> Perintah berikut ini artinya adalah, composer buatkan project dari username package dan repository berikut di folder tertentu.
>
> ```bash
> composer create-project user/repo folder-target
> ```

```bash
composer create-project laravel/laravel coba-laravel
```

setelah project laravel tersintal, untuk menjalankan project nya kalian bisa gunakan perintah berikut ini:

> **Catatan**:
>
> Jalankan perintah berikut ini didalam folder laravel nya, pastikan working directory terminal anda sudah berada di laravel project nya.

```bash
php artisan serve
```

Apabila perintah diatas berhasil dijalankan, maka project laravel akan berjalan di local server dengan port 8000

```
localhost:8000
```

atau ip loopback

```
127.0.0.1:8000
```

#### Windows: Install Laravel Melalui Laravel Installer

Perbedaan laravel installer dengan composer, disini jika kita butuh untuk mendownload laravel nya maka tidak akan mendownload semuanya sehingga proses nya akan lebih cepat. Untuk menginstall laravel installer nya jalankan perintah berikut ini:

```bash
composer global require laravel/installer
```

Setelah installer nya terinstal, selanjutnya untuk membuat project laravel menggunakan installer nya jalankan perintah berikut ini:

> **Catatan**:
>
> Jika perintah `laravel` not found, maka anda perlu menambahkan PATH hasil dari instalasi package composer ke dalam profile atau environment anda. Seperti berikut ini
>
> ![Composer Env](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/instalasi-dan-konfigurasi/composer-env.png)
>
> Setelah itu reload session terminal anda dengan cara melalukan re-open aplikasi terminal nya

```bash
laravel new coba-laravel
```

Setelah project laravel tersintal, untuk menjalankan project nya kalian bisa gunakan perintah berikut ini:

> **Catatan**:
>
> Jalankan perintah berikut ini didalam folder laravel nya, pastikan working directory terminal anda sudah berada di laravel project nya.

```bash
php artisan serve
```

Apabila perintah diatas berhasil dijalankan, maka project laravel akan berjalan di local server dengan port 8000

```
localhost:8000
```

atau ip loopback

```
127.0.0.1:8000
```

#### Windows: Install Laravel Menggunakan Valet

> **Catatan**:
>
> Layanan valet ini hanya ada pada sistem operasi macOS, sehingga kita disini menggunakan alternative atau versi porting orang yang membuat layanan valet tersebut agar dapat berjalan di sistem operasi Windows. Kalian bisa melihat versi porting windows nya pada halaman berikut ini [packagist.org/packages/cretueusebiu/valet-windows](https://packagist.org/packages/cretueusebiu/valet-windows)

Valet adalah sebuah laravel development environment untuk sistem operasi macOS minimalis. Pada valet ini nantinya project laravel kita akan otomatis mempunyai local domain dengan nama top level domain nya adalah `*.test`. Valet ini berjalan menggunakan Web Server Nginx dan Acrylic DNS

Sesuai dengan namanya, valet ini seperti kita valet parkir di dunia nyata yang dimana ketika kita parkir maka kendaraan kita diberikan ke petugas untuk mencari tempat parkir. Valet ini juga sama, yang dimana nanti nya kita bisa tentukan mau parkir dimana, otomatis layanan ini yang akan mengatur aplikasi kita akan disimpan dimana sehingga cukup panggil dengan nama `*.test`

Untuk meginstall Valet nya, kalian bisa jalankan perintah berikut ini

```bash
composer global require cretueusebiu/valet-windows
```

Setelah package `cretueusebiu/valet-windows` terisntall, jalankan perintah berikut ini untuk menginstall valet nya

```bash
valet install
```

Setelah valet terisntall, kalian perlu mengubah DNS Server windows kalian agar mengarah ke local DNS dari Acrylic DNS

DNS untuk IPv4

![DNS IPv4](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/instalasi-dan-konfigurasi/dns-ipv4.png)

DNS untuk IPv6

![DNS IPv6](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/instalasi-dan-konfigurasi/dns-ipv6.png)

> **Catatan**:
>
> Berhubung valet ini berjalan di web server nginx port `80`, maka pastikan tidak ada service yang berjalan di port tersebut agar tidak bentrok. Misalkan jika anda menginstall bundle software seperti XAMPP atau Laragon, maka pastikan webserver nya ubah atau ganti port nya agar tidak berjalan di port `80` (misalkan di ubah agar berjalan di port `8080`).
>
> Contoh konfigurasi apache XAMPP agar berjalan di port 8080 pada file `C:\xampp\apache\conf\httpd.conf`
>
> ```apache
> Listen 8080
> ServerName localhost:8080
> ```
>
> Contoh konfigurasi apache Laragon agar berjalan di port 8080 pada file `C:\laragon\bin\apache\httpd-2.4.54-win64-VS16\conf\httpd.conf`
>
> ```apache
> Listen 8080
> ServerName localhost:8080
> ```

Setelah terinstall, untuk mengecek nya kalian bisa melakukan ping ke nama domain apapun `*.test` di terminal kalian menggunakan perintah berikut ini:

```bash
ping foobar.test
```

Jika valet terinstall maka anda akan mendapatkan respon dari ip loopback `127.0.0.1`

Setelah mengecek apakah valet terinstall, selanjutnya kita perlu menentukan folder mana yang akan dijadikan tempat parkir nya. Misal disini saya ilustrasikan kita akan menyimpan semua project laravel di PATH `D:\Applications/*`, sehingga nantinya jika terdapat folder atau project laravel di PATH tersebut kita langsung bisa mengakses nya melalui domain `nama-folder.test`

Untuk membuat folder PATH tersebut menjadi tempat parkir nya, jalankan perintah berikut ini:

```bash
valet park
```

Jika perintah diatas dijalankan, maka akan muncul output tulisan seperti berikuti ini:

```bash
This directory has been added to Valet's paths.
```

Sekarang untuk menjalankan project laravel yang sebelumnya di install yaitu `coba-laravel`, kita tidak perlu lagi menggunakan perintah `php artisan serve`. Namun kita bisa langsung mengetikan nama domain nya di url browser dengan format `nama-folder.test` atau dalam kasus ini adalah `coba-laravel.test`.

Sehingga jika kalian menginstall project laravel baru di PATH `~/Documents/Applications` maka kalian bisa langsung mengakses nya di url browser dengan nama domain `*.test` (tanpa perlu perintah `php artisan serve` lagi).

### Linux
