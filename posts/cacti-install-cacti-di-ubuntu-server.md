---
title: "Cacti - Instalasi dan Konfigurasi Monitoring Traffic Menggunakan Cacti di Ubuntu Server"
tag: "SysAdmin"
date: "August 30 2023"
excerpt: "Pada artikel ini saya akan melakukan instalasi dan konfigurasi cacti pada sistem operasi Ubuntu Server 22.04"
cover_image: "/images/posts/Cacti - Install Cacti di Ubuntu.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Cacti adalah salah satu perangkat lunak atau software untuk pemantauan atau monitoring traffic jaringan yang cukup populer dan sering digunakan oleh system administrator untuk memantau dan mengelola kinerja jaringan.

Dengan menggunakan cacti, Anda dapat dengan mudah mengumpulkan data statistik yang relevan dan menghasilkan grafik yang informatif, memungkinkan Anda untuk mengambil keputusan yang lebih baik terkait dengan infrastruktur jaringan Anda.

Dalam artikel ini, Saya akan membahas langkah-langkah instalasi cacti pada Ubuntu Server 22.04

## Persiapan

Untuk melakukan instalasi cacti, Anda perlu menyiapkan sistem operasi nya terlebih dahulu, disini Saya menggunakan sistem operasi Ubuntu Server 22.04. Anda bisa memilih menggunakan distro lain dari turunan debian, misalnya debian itu sendiri.

### Update Repository dan Upgrade Package

Untuk melakukan update repository dan upgrade package, jalankan perintah berikut ini:

```shell
sudo apt update && sudo apt upgrade -y
```

![Ubuntu Update dan Upgrade](../images/posts/assets/ubuntu_install_cacti/ubuntu_update_upgrade.png)

### Mengatur Jam atau Timezone

Penting sekali mengatur jam agar sesuai dengan jam realtime, karena hal tersebut akan berpengaruh ke tanggal dan jam yang akan muncul di cacti

Untuk mengatur jam atau timezone ke indonesia, jalankan perintah berikut ini:

```shell
sudo timedatectl set-timezone Asia/Jakarta
```

Untuk melihat dan memastikan bahwa jam atau timezone sudah berubah, jalankan perintah berikut ini:

```shell
date
```

atau

```shell
timedatectl
```

![Ubuntu Timezone](../images/posts/assets/ubuntu_install_cacti/ubuntu_timezone.png)

### Install Package Pendukung Cacti

Untuk menginstall cacti server, kita perlu paket atau package pendukung atau dependencies yang perlu di install, untuk menginstall nya jalankan perintah berikut ini:

```shell
sudo apt install snmp php-snmp rrdtool librrds-perl unzip curl git gnupg2 -y
```

![Dependency Cacti](../images/posts/assets/ubuntu_install_cacti/dependency_cacti.png)

### Install LAMP Stack

Cacti berjalan pada Webserver, Database dan PHP, jadi kita perlu menginstall LAMP Stack (Linux, Apache, MariaDB, PHP). Untuk menginstall nya jalankan perintah berikut ini:

```shell
sudo apt install apache2 mariadb-server php php-mysql libapache2-mod-php php-xml php-ldap php-mbstring php-gd php-gmp php-intl -y
```

![Ubuntu LAMP Stack](../images/posts/assets/ubuntu_install_cacti/ubuntu_lamp_stack.png)

#### Konfigurasi PHP

Setelah LAMP Stack terinstal, langkah selanjutnya adalah melakukan konfigurasi PHP disisi webserver apache nya, untuk mengubah konfigurasi apache nya jalankan perintah berikut ini:

```shell
sudo vim /etc/php/8.1/apache2/php.ini
```

Cari konfigurasi berikut ini:

```ini
...
max_execution_time = 30
...
memory_limit = 128M
...
;date.timezone =
```

Menjadi seperti berikut

```ini
...
max_execution_time = 60
...
memory_limit = 512M
...
date.timezone = Asia/Jakarta
```

Setelah konfigurasi diatas disimpan, selanjutnya kita perlu mengubah konfigurasi PHP disisi CLI nya, untuk mengubah nya jalankan perintah berikut ini:

```shell
sudo vim /etc/php/8.1/cli/php.ini
```

Lakukan hal yang sama seperti konfigurasi PHP disisi webserver apache, cari konfigurasi berikut ini:

```ini
...
max_execution_time = 30
...
memory_limit = -1
...
;date.timezone =
```

Menjadi seperti berikut

```ini
max_execution_time = 60
...
memory_limit = 512M
...
date.timezone = Asia/Jakarta
```

Setelah konfigurasi selesai, lakukan restart service apache untuk menerapkan konfigurasi terbaru, untuk me-restart service nya jalankah perintah berikut ini:

```shell
sudo systemctl restart apache2
```

Untuk memastikan apakah service apache nya berjalan atau running, gunakan perintah berikut ini:

```shell
sudo systemctl status apache2
```

![Apache Service](../images/posts/assets/ubuntu_install_cacti/apache_service.png)

#### Konfigurasi MariaDB

Cacti menggunakan MariaDB sebagai database nya, oleh karena itu kita perlu melakukan konfigurasi mariadb nya agar cacti dapat berjalan lebih baik, untuk melakukan konfigurasi nya, gunakan perintah berikut ini:

```shell
sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
```

Cari konfigurasi berikut ini:

```cnf
collation-server            = utf8mb4_general_ci
...
#innodb_buffer_pool_size    = 8G
```

Menjadi seperti berikut

> **Catatan**: Jika konfigurasi berikut tidak ada, cukup tambahkan saja konfigurasi nya

```cnf
collation-server            = utf8mb4_unicode_ci
max_heap_table_size         = 128M
tmp_table_size              = 64M
join_buffer_size            = 1M
...
innodb_file_format          = Barracuda
innodb_large_prefix         = 1
innodb_buffer_pool_size     = 1G
innodb_flush_log_at_timeout = 3
innodb_read_io_threads      = 32
innodb_write_io_threads     = 16
innodb_io_capacity          = 5000
innodb_io_capacity_max      = 10000
innodb_doublewrite          = OFF
sort_buffer_size            = 1M
```

![MariaDB Konfigurasi](../images/posts/assets/ubuntu_install_cacti/mariadb_konfigurasi.png)

Setelah konfigurasi tersimpan, selanjutnya restart service mariadb menggunakan perintah berikut ini

```shell
sudo systemctl restart mariadb
```

Untuk memastikan apakah service nya sudah berjalan atau belum, gunakan perintah berikut ini:

```shell
sudo systemctl restart mariadb
```

![MariaDB Service](../images/posts/assets/ubuntu_install_cacti/mariadb_service.png)

#### Membuat Database dan User Untuk Cacti

Untuk membuat database dan user untuk cacti, kita perlu login terlebih dahulu ke dalam MariaDB, untuk login nya gunakan perintah berikut ini

```shell
sudo mysql
```

Jika berhasil maka format prompt atau PS1 nya akan menjadi seperti berikut:

```sql
MariaDB [(none)] >
```

![MariaDB Login](../images/posts/assets/ubuntu_install_cacti/mariadb_login.png)

Setelah berhasil login ke dalam database, jalankan perintah berikut ini untuk membuat database dan user cacti:

```sql
CREATE DATABASE cacti;
```

> **Catatan**: `'cacti'@'localhost'` dan `'password'` bisa disesuaikan dengan yang anda inginkan, namun wajib kalian ingat nantinya, karena akan digunakan pada konfigurasi cacti.

```sql
GRANT ALL PRIVILEGES ON `cacti`.* TO 'cacti'@'localhost' IDENTIFIED BY 'password';
```

![MariaDB Cacti](../images/posts/assets/ubuntu_install_cacti/mariadb_cacti.png)

Selanjutnya kita flush privileges, lalu keluar dari database

```sql
FLUSH PRIVILEGES;
exit;
```

#### Import Timezone Data Ke Database

Untuk melakukan import timezone data ke dalam database, gunakan perintah berikut ini:

```shell
sudo mysql mysql < /usr/share/mysql/mysql_test_data_timezone.sql
```

Setelah itu berikan cacti user untuk akses database timezone

```shell
sudo mysql
```

```sql
GRANT SELECT ON `mysql`.time_zone_name TO 'cacti'@'localhost';
FLUSH PRIVILEGES;
exit;
```

![MariaDB Timezone](../images/posts/assets/ubuntu_install_cacti/mariadb_timezone.png)

## Install Cacti

Cacti versi terbaru bisa di download melalui situs resmi nya disini [www.cacti.net/info/downloads](https://www.cacti.net/info/downloads)

untuk mendownload versi terbaru nya, jalankan perintah berikut ini:

> **Catatan**: `cacti-latest.tar.gz` disesuaikan dengan versi yang didapat dari situs resmi nya, misalkan `cacti-1.2.25.tar.gz`

```shell
wget https://www.cacti.net/downloads/cacti-latest.tar.gz --no-check-certificate
```

![Download Cacti](../images/posts/assets/ubuntu_install_cacti/download_cacti.png)

### Extract Package Cacti

Setelah cacti berhasil di download, kita perlu melakukan extract menggunakan tar, untuk meng-extract jalankah perintah berikut ini:

> **Catatan**: Sesuaikan dengan nama versi kalian

```shell
tar -zxvf cacti-latest.tar.gz
```

![Extract Cacti](../images/posts/assets/ubuntu_install_cacti/extract_cacti.png)

### Setup Skema dan Koneksi Database Cacti

Setelah cacti berhasil di extract, langkah selanjutnya adalah membuat folder di lokasi atau PATH `/var/www/html` untuk membuatnya jalankan perintah berikut ini:

```shell
sudo mkdir /var/www/html/cacti
```

Setelah folder diatas berhasil dibuat, selanjutnya copy atau salin isian folder cacti yang sudah di extract ke folder `/var/www/html/cacti` menggunakan perintah berikut ini:

```shell
sudo cp -R cacti-latest/* /var/www/html/cacti
```

Selanjutnya import skema database cacti kedalam mariadb menggunakan perintah berikut ini:

```shell
sudo mysql cacti < /var/www/html/cacti/cacti.sql
```

![Setup Cacti](../images/posts/assets/ubuntu_install_cacti/setup_cacti.png)

Setelah melakukan import skema database, sekarang edit file konfigurasi cacti untuk koneksi ke dalam database, menggunakan perintah berikut ini:

```shell
sudo vim /var/www/html/cacti/include/config.php
```

> **Catatan**: Sesuaikan nama database, user dan password yang telah di setup sebelumnya (saat membuat database dan user) di MariaDB

```php
...
$database_type     = 'mysql';
$database_default  = 'cacti';
$database_hostname = 'localhost';
$database_username = 'cacti';
$database_password = 'password';
$database_port     = '3306';
...
```

### Setup Log Untuk cacti

Setelah konfigurasi database selesai dilakukan, langkah selanjutnya adalah membuat log file untuk menampung log dari aplikasi cacti, sehingga ketika terdapat error, kita bisa membaca nya melalui log file tersebut untuk mencari penyebabnya. Untuk membuatnya jalankan perintah berikut ini:

```shell
sudo touch /var/www/html/cacti/log/cacti.log
```

### Setup Permission dan Ownership Folder Cacti

Setelah file log tersebut dibuat, langkah selanjutnya adalah melakukan perubahan permission dan ownership untuk folder cacti ke webserver

```shell
sudo chown -R www-data:www-data /var/www/html/cacti && sudo chmod -R 775 /var/www/html/cacti
```

![Permission Cacti](../images/posts/assets/ubuntu_install_cacti/permission_cacti.png)

### Setup Cron Scheduler Cacti Poller

Selanjutnya, buat sebuah cron scheduler untuk cacti poller

```shell
sudo vim /etc/cron.d/cacti
```

> **Catatan**: Cron scheduler dibawah ini akan menjalankan cacti poller setiap 5 menit sekali

```cron
*/5 * * * * www-data php /var/www/html/cacti/poller.php > /dev/null 2>&1
```

## Mengakses dan Setup Cacti

Setelah konfigurasi di sisi server selesai, selanjutnya kita akan melakukan instalasi cacti melalui web browser dengan cara mengakses webserver nya, kalian bisa masukan pada bagian URL di web browser dengan format `http://<ip_address_server>/cacti`

> **Catatan**: Default user dan password login cacti adalah
>
> - Username: `admin`
> - Password: `admin`

![Login Cacti](../images/posts/assets/ubuntu_install_cacti/login_cacti.png)

### Ganti Default Password

Setelah pertama kali masuk, akan langsung di tawarkan untuk mengganti password default, maka disini anda bisa mengganti nya dengan yang anda inginkan

![Password Cacti](../images/posts/assets/ubuntu_install_cacti/password_cacti.png)

### License Agreement

Click tombol **Save**, maka akan dialihkan atau dipindahkan ke halaman license agreement seperti dibawah ini

![License Cacti](../images/posts/assets/ubuntu_install_cacti/license_cacti.png)

Ceklis `Accept GPL License Agreement` dan click tombol **Begin** untuk pergi ke menu Pre-Installation Checks

### Pre Installation Checks

Jika kalian mengikuti konfigurasi diatas hasilnya akan hijau semua.

![Pre-Installation Cacti](../images/posts/assets/ubuntu_install_cacti/pre-installation_cacti.png)

### Installation Type

Click tombol **Next** untuk pergi ke menu Installation Type

![Installation Type Cacti](../images/posts/assets/ubuntu_install_cacti/installation_type_cacti.png)

### Directory Permission Checks

Click tombol **Next** untuk pengecekan hak akses folder

![Directory Permission Checks Cacti](../images/posts/assets/ubuntu_install_cacti/directory_permission_checks_cacti.png)

### Critical Binary Locations and Versions

Click tombol **Next** untuk pengecekan dependencies

![Critical Binary Locations and Versions Cacti](../images/posts/assets/ubuntu_install_cacti/critical_binary_locations_and_versions_cacti.png)

### Input Validation Whitelist Protection

Click tombol **Next** akan muncul peringatan yang berkaitan dengan security

![Input Validation Whitelist Protection Cacti](../images/posts/assets/ubuntu_install_cacti/input_validation_whitelist_protection_cacti.png)

### Default Profile

Click tombol **Next** akan muncul konfigurasi default seperti cron interval dan automation network, disini Saya non-aktifkan fitur automation network nya

![Default Profile Cacti](../images/posts/assets/ubuntu_install_cacti/default_profile_cacti.png)

### Template Setup

Click tombol **Next** akan muncul template setup yang bisa di install, disini saya pilih semua

![Template Setup Cacti](../images/posts/assets/ubuntu_install_cacti/template_setup_cacti.png)

### Server Collation

Click tombol **Next** untuk pengecekan status database

![Server Collation Cacti](../images/posts/assets/ubuntu_install_cacti/server_collation_cacti.png)

### Confirm Installation

Click tombol **Next** untuk melakukan konfirmasi instalasi

![Confirm Installation Cacti](../images/posts/assets/ubuntu_install_cacti/confirm_installation_cacti.png)

### Installing Cacti Server

Click tombol **Next** untuk memulai penginstalan cacti, tunggu hingga proses instalasi selesai

![Installing Cacti Server](../images/posts/assets/ubuntu_install_cacti/installing_cacti_server.png)

Click tombol **Get Started** untuk masuk ke halaman admin cacti

![Get Started](../images/posts/assets/ubuntu_install_cacti/get_started.png)

### Dashboard Cacti

Tampilan cacti awal atau dashboard untuk admin

![Dashboard Admin](../images/posts/assets/ubuntu_install_cacti/dashboard_admin.png)

Sampai disini proses instalasi cacti sudah selesai, namun disini saya akan menambahkan tutorial atau langkah-langkah mengganti poller dari `cmd.php` menjadi `spine`

## Install Poller Spine Untuk Cacti

Spine adalah pengganti poller berkecepatan tinggi untuk `cmd.php`. Ini hampir 100% kompatibel dengan prosesor `cmd.php` lama dan memberikan banyak fleksibilitas, kecepatan dan konkurensi dibandingkan dengan `cmd.php`.

Spine dapat mengurangi waktu berkumpulnya perangkat Anda. Jika Server Cacti Anda memiliki banyak perangkat untuk dipantau dan terkadang Anda menemukan batas waktu poller di cacti.log Anda. Memasang dan menggunakan `spine` adalah jawaban yang baik untuk mengatasi masalah ini. Sederhana dan bermanfaat.

> **Catatan**: Anda dapat dengan mudah menginstal nya dengan perintah
>
> ```shell
> sudo apt install cacti-spine
> ```
>
> tetapi Anda tidak akan mendapatkan versi terbaru dari spine. Jadi, disini Saya akan menggunakan versi stabil terbaru dari situs cacti dan meng-compile nya sendiri.

### Download Spine

Untuk mendownload nya anda bisa pergi ke situs resmi dari cacti disini [www.cacti.net/info/downloads](https://www.cacti.net/info/downloads). Pada halaman tersebut terdapat tombol download untuk spine, Anda hanya perlu melakukan copy link address nya

![Download Spine](../images/posts/assets/ubuntu_install_cacti/download_spine.png)

Setelah anda copy link address nya, jalankan perintah berikut:

> **Catatan**: Ganti `latest` dengan versi terbaru atau terakhir

```shell
wget https://files.cacti.net/spine/cacti-spine-latest.tar.gz --no-check-certificate
```

Maka sekarang akan muncul file bernama `cacti-spine-latest.tar.gz`

![Wget Spine](../images/posts/assets/ubuntu_install_cacti/wget_spine.png)

### Install Dependencies Software Untuk Compile Spine

Untuk menginstal dependencies software nya, jalankan perintah berikut:

```shell
sudo apt install build-essential autoconf automake dos2unix gzip help2man m4 make wget libtool libsnmp-dev libmariadb-dev libmariadb-dev -y
```

![Install Dependencies Spine](../images/posts/assets/ubuntu_install_cacti/install_dependencies_spine.png)

### Extract dan Install Spine

Extract spine ke directory saat ini dan masuk kedalam directory spine mengggunakan perintah berikut ini:

```shell
tar -zxvf cacti-spine-latest.tar.gz
```

![Extract Spine](../images/posts/assets/ubuntu_install_cacti/extract_spine.png)

```shell
cd cacti-spine-latest/
```

![Move Directory Spine](../images/posts/assets/ubuntu_install_cacti/move_directory_spine.png)

Perintah berikut ini mengasumsikan lokasi default instalation untuk cacti di `/usr/local/spine`. Jika Anda memilih untuk menggunakan prefix lain, pastikan Anda memperbarui perintah sesuai dengan kebutuhan untuk PATH yang baru.

Jalankan proses bootstrap untuk membuat script konfigurasi secara otomatis.

```shell
sudo ./bootstrap
```

![Bootstrap Spine](../images/posts/assets/ubuntu_install_cacti/bootstrap_spine.png)

Jalankan proses `configure` untuk mendeteksi apa yang tersedia di sistem

```shell
sudo ./configure
```

![Configure Spine](../images/posts/assets/ubuntu_install_cacti/configure_spine.png)

Build dan install spine

```shell
sudo make
sudo make install
```

![Build dan Install Spine](../images/posts/assets/ubuntu_install_cacti/build_dan_install_spine.png)

Pastikan `spine` berjalan dengan baik dengan mengecek nya menggunakan perintah berikut ini:

> **Catatan**: Jangan khawatir dengan pesan error `FATAL: Unable to read configuration file! (Spine init)`. Ini muncul karena Saya tidak menyertakan file konfigurasi ke perintah. Pada langkah ini hanya ingin tes spine saja yang bisa dijalankan

```shell
/usr/local/spine/bin/spine -R -S -V 3
```

![Test Spine](../images/posts/assets/ubuntu_install_cacti/test_spine.png)

### Konfigurasi Spine

Buat file konfigurasi spine dan edit koneksi ke database kemudian simpan

```shell
sudo cp /usr/local/spine/etc/spine.conf.dist /usr/local/spine/etc/spine.conf
```

```shell
sudo vim /usr/local/spine/etc/spine.conf
```

![Config Spine](../images/posts/assets/ubuntu_install_cacti/config_spine.png)

```conf
DB_Host       localhost
DB_Database   cacti
DB_User       cactiuser # masukan username database anda
DB_Pass       yourpassword # masukan passsword database anda
DB_Port       3306
#DB_UseSSL    0
#DB_SSL_Key
#DB_SSL_Cert
#DB_SSL_CA
Cacti_Log     /var/www/html/cacti/log/cacti.log # uncomment baris berikut
```

### Perbarui Konfigurasi Web Cacti

Login kedalam cacti, kemudian pergi ke menu `Configuration` > `Settings`

![Settings Cacti](../images/posts/assets/ubuntu_install_cacti/settings_cacti.png)

Perbarui pengaturan PATH cacti pada bagian binary dan file konfigurasi `spine`

```
Spine Binary File Location: /usr/local/spine/bin/spine
Spine Config File Path: /usr/local/spine/etc/spine.conf
```

![PATH Spine](../images/posts/assets/ubuntu_install_cacti/path_spine.png)

Perbarui Cacti `Poller` pada bagian `Poller Type` ubah dari `cmd.php` menjadi `spine`

![Poller Type](../images/posts/assets/ubuntu_install_cacti/poller_type.png)

Untuk memastikan `spine` berjalan dengan baik, Buka menu `Log` dan periksa method poller nya. Maka seharusnya akan berubah yang sebelumnya dari `cmd.php` menjadi `spine`.

![Log Poller](../images/posts/assets/ubuntu_install_cacti/log_poller.png)
