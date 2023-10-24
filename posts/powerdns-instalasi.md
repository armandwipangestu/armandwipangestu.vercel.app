---
title: "PowerDNS - Install PowerDNS di Ubuntu Server"
tag: "SysAdmin"
date: "July 04 2023"
excerpt: "Pada artikel ini saya akan membuat langkah - langkah instalasi PowerDNS pada sistem operasi Ubuntu Server"
cover_image: "/images/posts/PowerDNS - Install PowerDNS di Ubuntu Server.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Mengapa Menggunakan PowerDNS?

PowerDNS menawarkan 2 solusi nameserver:

- The **Authoritative Server** atau **Server Resmi**, yang dimana menggunakan database untuk me-resolve query mengenai domain.
- The **Recursor** atau **Perulangan**, yang dimana membuat konsultasi dengan Authoritative Server lainnya untuk me-resolve query

Nameserver lain menggabungkan kedua fungsi tersebut secara otomatis. PowerDNS menawarkannya secara terpisah, dan memungkinkan perpaduan
dua solusi secara mulus untuk pengaturan modular.

Selain itu, PowerDNS adalah sumber terbuka, berfungsi sama baiknya untuk volume query kecil dan besar, dan menawarkan banyak kemungkinan
untuk solusi backend.

## List Backend PowerDNS

Berikut ini adalah list backend yang tersedia untuk PowerDNS

| Name                  | Native | Primary | Secondary | Producer | Consumer | Autoprimary | DNS Update | DNSSEC | Launch   |
| --------------------- | ------ | ------- | --------- | -------- | -------- | ----------- | ---------- | ------ | -------- |
| BIND                  | Yes    | Yes     | Yes       | No       | No       | Yes         | No         | Yes    | Bind     |
| Generic MySQL/MariaDB | Yes    | Yes     | Yes       | Yes      | Yes      | Yes         | Yes        | Yes    | gmysql   |
| Generic ODBC          | Yes    | Yes     | Yes       | Yes      | Yes      | Yes         | Yes        | Yes    | godbc    |
| Generic PostgreSQL    | Yes    | Yes     | Yes       | Yes      | Yes      | Yes         | Yes        | Yes    | gpgsql   |
| Generic SQLite3       | Yes    | Yes     | Yes       | Yes      | Yes      | Yes         | Yes        | Yes    | gsqlite3 |
| Generic GeoIP         | Yes    | No      | No        | No       | No       | No          | No         | Yes    | geoip    |
| Generic LDAP          | Yes    | Yes     | No        | No       | No       | No          | No         | No     | ldap     |
| Generic LMDB          | Yes    | Yes     | Yes       | Yes      | Yes      | No          | No         | Yes    | lmdb     |
| Generic Lua2          | Yes    | Yes     | No        | No       | No       | No          | No         | Yes    | lua2     |
| Generic Pipe          | Yes    | No      | No        | No       | No       | No          | No         | No     | pipe     |
| Generic Random        | Yes    | No      | No        | No       | No       | No          | No         | No     | random   |
| Generic Remote        | Yes    | Yes\*   | Yes\*     | No       | No       | Yes\*       | No         | Yes\*  | remote   |
| Generic TinyDNS       | Yes    | Yes     | No        | No       | No       | No          | No         | No     | tinydns  |

## Installasi PowerDNS di Ubuntu Server

Ikuti langkah dibawah ini untuk instalassi dan konfigurasi PowerDNS dengan `MySQL` atau `MariaDB` sebagai backend database.
Selain itu langkah-langkah ada tambahan instalasi untuk setup untuk `PowerDNS Admin` sebagai web interface dan API.

### Langkah 1: Install dan Konfigurasi MariaDB Server

- Update dan Upgrade sistem package:

```shell
sudo apt update && sudo apt upgrade
```

![image](https://i.ibb.co/hdpkrLG/image.png)

- Install MariaDB Server dan Client:

```shell
sudo apt install mariadb-server mariadb-client
```

![image](https://i.ibb.co/1fGhZdj/image.png)

- Membuat database untuk powerdns di MariaDB

```shell
sudo mysql -u root -p
```

```sql
CREATE DATABASE `powerdns` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- Membuat akun atau user untuk powerdns kemudian berikan akses ke database `powerdns`

```sql
GRANT ALL PRIVILEGES ON `powerdns`.* TO 'powerdnsuser'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD_HERE';
```

![image](https://i.ibb.co/yY5PqGY/image.png)

### Langkah 2: Install PowerDNS

- Menontaktifkan service `systemd-resolved` karena akan bentrok dengan PowerDNS nantinya

```shell
sudo systemctl disable --now systemd-resolved
```

![image](https://i.ibb.co/pwXjBfX/image.png)

- Menghapus file konfigurasi system service

```shell
sudo rm -rf /etc/resolv.conf
```

- Membuat file `/etc/resolv.conf` baru dengan nameserver atau DNS Google

```shell
sudo echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
```

![image](https://i.ibb.co/VDQGB45/image.png)

- Install package PowerDNS Server dan PowerDNS Database Backend

```shell
sudo apt-get install pdns-server pdns-backend-mysql -y
```

![image](https://i.ibb.co/ZJ45Hpr/image.png)

- Membuat skema database dari bawaan PowerDNS

```shell
sudo mysql -u root -p powerdns < /usr/share/doc/pdns-backend-mysql/schema.mysql.sql
```

![image](https://i.ibb.co/6rX7NGL/image.png)

### Langkah 3: Konfigurasi PowerDNS

Melakukan konfigurasi file lokal PowerDNS agar konek ke dalam Database

- Backup file konfigurasi origin powerdns

```shell
sudo mv /etc/powerdns/pdns.conf /etc/powerdns/pdns.conf.orig
```

- Membuka file konfigurasi untuk mengedit

```shell
sudo vim /etc/powerdns/pdns.conf
```

```
# MySQL Configuration
launch=gmysql
gmysql-host=127.0.0.1
gmysql-port=3306
gmysql-dbname=powerdns
gmysql-user=powerdnsuser
gmysql-password=YOUR_PASSWORD_HERE
gmysql-dnssec=yes

# API
api=yes
api-key=YOUR_API_KEY_HERE

# Webserver
webserver=yes
webserver-address=<loopback/your_second_ip>
webserver-port=8081
webserver-allow-from=127.0.0.1,<your_second_ip>
webserver-password=<YOUR_WEB_SERVER_PASSWORD>
```

![image](https://i.ibb.co/S6d0Lhw/image.png)

- Menonaktifkan service `pdns`

```shell
sudo systemctl stop pdns
```

- Tes koneksi ke database

```shell
sudo pdns_server --daemon=no --guardian=no --loglevel=9
```

> **Catatan**:
>
> Bisa dilihat digambar dibawah ini, bahwa powerdns berhasil melakukan koneksi ke dalam database
>
> ```
> gmysql Connection successful. Connected to database 'powerdns' on '127.0.0.1'.
> ```

![image](https://i.ibb.co/8XJ7JHg/image.png)

- Menjalankan service powerdns

```shell
sudo systemctl start pdns
```

- Mengecek koneksi `pdns` dengan package `ss` atau `Socket Statistics`

```shell
sudo ss -alnp4 | grep pdns
```

> **Catatan**:
>
> Bisa dilihat digambar dibawah ini, bahwa powerdns berhasil bejalan pada protocol tcp dan udp
> dengan state `UNCONN` dan `LISTEN` di port `53` dan `8081`
>
> ```
> udp   UNCONN 0      0            0.0.0.0:53        0.0.0.0:*    users:(("pdns_server",pid=27734,fd=5))
> tcp   LISTEN 0      10         127.0.0.1:8081      0.0.0.0:*    users:(("pdns_server",pid=27734,fd=9))
> tcp   LISTEN 0      128          0.0.0.0:53        0.0.0.0:*    users:(("pdns_server",pid=27734,fd=7))
> ```

![image](https://i.ibb.co/bBzGLGd/image.png)

### Langkah 4: Install PowerDNS Admin Dependencies

PowerDNS Admin membantu me-manage PowerDNS dengan Web Interface. Untuk menginstall dashboard secara lokal, ikuti dibawah ini

- Install Python development package dan dependencies nya

```shell
sudo apt install -y python3-dev git libsasl2-dev libldap2-dev python3-venv libmariadb-dev pkg-config build-essential curl libpq-dev
```

![image](https://i.ibb.co/FqrN4Rh/image.png)

- Install NodeJS

```shell
curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
```

![image](https://i.ibb.co/xfnrd18/image.png)

```shell
sudo apt install -y nodejs
```

![image](https://i.ibb.co/GHQRQjV/image.png)

- Install yarn package manager untuk build asset file

```shell
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn
```

![image](https://i.ibb.co/WtR5Qs3/image.png)

- Masuk sebagai root user

```shell
sudo su
```

- Clone Repository PowerDNS Admin di PATH `/opt/web/powerdns-admin`

```shell
git clone https://github.com/PowerDNS-Admin/PowerDNS-Admin.git /opt/web/powerdns-admin
cd /opt/web/powerdns-admin
```

- Membuat virtualenv

```shell
python3 -mvenv ./venv
```

![image](https://i.ibb.co/Q8yPQjF/image.png)

- Aktifkan virtual environment

```shell
source ./venv/bin/activate
```

![image](https://i.ibb.co/CWT4J2x/image.png)

- Upgrade pip ke versi terbaru

```shell
pip install --upgrade pip
```

![image](https://i.ibb.co/6mNpXqk/image.png)

- Install dependencies atau requirements dari file `requirements.txt`

> **Catatan**:
>
> Jika mengalami `error: xmlsec1 is not installed or not in path.` install dev-lib berikut ini
>
> ```shell
> apt install libxmlsec1 libxmlsec1-dev
> ```

```shell
pip install -r requirements.txt
```

![image](https://i.ibb.co/47p7SSB/image.png)

### Langkah 5: Melakukan konfigurasi dan menjalankan PowerDNS Admin

- Membuat salinan file `development.py` ke `production.py`

```shell
cp configs/development.py configs/production.py
```

![image](https://i.ibb.co/4VFnCmS/image.png)

- Membuka file konfigurasi `production.py`

```shell
vim configs/production.py
```

- Melakukan perubahan file `production.py`

> **Catatan**:
>
> Untuk bagiian `SECRET_KEY` kalian generate sendiri menggunakan perintah dibawah ini
>
> ```shell
> python -c 'import os; print(os.urandom(16))'
> ```
>
> ![image](https://i.ibb.co/1JtT6Pt/image.png)

```python
import os
import urllib.parse
basedir = os.path.abspath(os.path.dirname(__file__))

### BASIC APP CONFIG
SALT = '$2b$12$yLUMTIfl21FKJQpTkRQXCu'
SECRET_KEY = 'YOU_SECRET_KEY'
BIND_ADDRESS = '0.0.0.0'
PORT = 9191
SERVER_EXTERNAL_SSL = None

### DATABASE CONFIG
SQLA_DB_USER = 'powerdnsuser'
SQLA_DB_PASSWORD = 'YOUR_PASSWORD_HERE'
SQLA_DB_HOST = '127.0.0.1'
SQLA_DB_NAME = 'powerdns'
SQLALCHEMY_TRACK_MODIFICATIONS = True

#CAPTCHA Config
CAPTCHA_ENABLE = True
CAPTCHA_LENGTH = 6
CAPTCHA_WIDTH = 160
CAPTCHA_HEIGHT = 60
CAPTCHA_SESSION_KEY = 'captcha_image'

#Server side sessions tracking
#Set to TRUE for CAPTCHA, or enable another stateful session tracking system
SESSION_TYPE = 'sqlalchemy'
```

![image](https://i.ibb.co/DgRRfkK/image.png)

Dikarenakan default config flask menggunakan database `SQLite` maka kita perlu mengubah konfigurasi nya agar menggunakan `MySQL`.
Untuk melakukan nya masih di dalam file yang sama yaitu `production.py` di baris `30 - 49`

```python
### DATABASE - MySQL
## Don't forget to uncomment the import in the top
SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@{}/{}'.format(
     urllib.parse.quote_plus(SQLA_DB_USER),
     urllib.parse.quote_plus(SQLA_DB_PASSWORD),
     SQLA_DB_HOST,
     SQLA_DB_NAME
)

### DATABASE - PostgreSQL
## Don't forget to uncomment the import in the top
#SQLALCHEMY_DATABASE_URI = 'postgres://{}:{}@{}/{}'.format(
#    urllib.parse.quote_plus(SQLA_DB_USER),
#    urllib.parse.quote_plus(SQLA_DB_PASSWORD),
#    SQLA_DB_HOST,
#    SQLA_DB_NAME
#)

### DATABASE - SQLite
#SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'pdns.db')
```

![image](https://i.ibb.co/qjqx3jG/image.png)

- Export konfigurasi production ke dalam variable `FLASK_CONF`

```shell
export FLASK_CONF=../configs/production.py
```

- Export konfigurasi flask ke dalam variable `FLASK_APP`

```shell
export FLASK_APP=powerdnsadmin/__init__.py
```

- Upgrade skema database

```shell
flask db upgrade
```

![image](https://i.ibb.co/1GjTdH4/image.png)

- Install project dependencies menggunakan `yarn`

```shell
yarn install --pure-lockfile
```

![image](https://i.ibb.co/dpkjmrJ/image.png)

- Build assets untuk aplikasi flask

```shell
flask assets build
```

![image](https://i.ibb.co/hYdQcW4/image.png)

- Menjalankan aplikasi flask di `virtual env`

```shell
./run.py
```

![image](https://i.ibb.co/mJs1F1B/image.png)

- Membuka aplikasi yang sudah di running pada port `9191`

> **Catatan**:
>
> Untuk membuka aplikasi nya masukan URL pada web browser dengan format
>
> ```
> http://<ip_address>:9191
> ```

![image](https://i.ibb.co/3M2tkWR/image.png)

> **Catatan**:
>
> Jika mengalami error seperti gambar dibawah ini ketika berada di halaman `register`, maka perlu melakukan downgrade untuk dependency package `pillow`
>
> Error tersebut terjadi karena pada aplikasi flask (PowerDNS Admin) ini menggunakan library `pillow` untuk mengenerate `CAPTCHA`
>
> ![image](https://i.ibb.co/rypFz53/image.png)

- Menghapus package pillow

```shell
pip uninstall pillow
```

![image](https://i.ibb.co/jhV5WHB/image.png)

- Install pillow versi `9.4.0`

```shell
pip install pillow==9.4.0
```

![image](https://i.ibb.co/XDzcgrz/image.png)

- Menjalankan kembali aplikasi flask di `virtual env`

```shell
./run.py
```

![image](https://i.ibb.co/xfLzN1z/image.png)

Sampai proses ini, kita telah berhasil melakukan install PowerDNS sebagai DNS Service, MySQL sebagai backend dari PowerDNS dan PowerDNS Admin sebagai web interface nya.

Untuk langkah selanjutnya kita memerlukan web server seperti Nginx atau Apache agar aplikasi flask dari PowerDNS Admin ini bisa berjalan tanpa standalone

Untuk melakukan hal tersebut ikuti langkah dibawah ini

### Langkah 6: Membuat PowerDNS Admin Service

Setelah sebelumnya kita berhasil menjalankan aplikasi flask PowerDNS Admin dengan standalone (tanpa webserver) selanjutnya kita perlu membuat
service sendiri agar bisa berjalan dengan webserver

- Matikan standalone aplikasi PowerDNS Admin nya

Untuk mematikannya cukup tekan `CTRL + C` pada terminal nya

- Menonaktifkan virtual env

```shell
deactivate
```

![image](https://i.ibb.co/5FtfK8z/image.png)

- Membuat file systemd service untuk PowerDNS Admin

```shell
vim /etc/systemd/system/powerdns-admin.service
```

- Tambahkan konfigurasi berikut ini kedalam file `powerdns-admin.service`

```shell
[Unit]
Description=PowerDNS-Admin
Requires=powerdns-admin.socket
After=network.target

[Service]
User=root
Group=root
PIDFile=/run/powerdns-admin/pid
WorkingDirectory=/opt/web/powerdns-admin
ExecStartPre=/bin/bash -c '$$(mkdir -p /run/powerdns-admin/)'
ExecStart=/opt/web/powerdns-admin/venv/bin/gunicorn --pid /run/powerdns-admin/pid --bind unix:/run/powerdns-admin/socket 'powerdnsadmin:create_app()'
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

![image](https://i.ibb.co/vd1RD1R/image.png)

- Membuat unit file

```shell
systemctl edit --force powerdns-admin.service
```

- Tambahkan konfigurasi berikut

```shell
[Service]
Environment="FLASK_CONF=../configs/production.py"
```

| Membuat Unit File                            | Hasil                                        |
| -------------------------------------------- | -------------------------------------------- |
| ![image](https://i.ibb.co/MNxhGK4/image.png) | ![image](https://i.ibb.co/p2d8hy7/image.png) |

- Membuat socket file

```shell
vim /etc/systemd/system/powerdns-admin.socket
```

- Tambahkan konfigurasi berikut ini kedalam file `powerdns-admin.socket`

```shell
[Unit]
Description=PowerDNS-Admin socket

[Socket]
ListenStream=/run/powerdns-admin/socket

[Install]
WantedBy=sockets.target
```

![image](https://i.ibb.co/5nYqggn/image.png)

- Membuat environment file

```shell
vim /etc/tmpfiles.d/powerdns-admin.conf
```

- Tambahkan konfigurasi berikut ini kedalam file `powerdns-admin.conf`

```shell
d /run/powerdns-admin 0755 pdns pdns -
```

![image](https://i.ibb.co/F7gtz51/image.png)

- Reload daemon

```shell
systemctl daemon-reload
```

- Menjalankan dan mengizinkan service dan socket yang sudah dibuat sebelumnya

```shell
systemctl start powerdns-admin.service powerdns-admin.socket
systemctl enable powerdns-admin.service powerdns-admin.socket
```

![image](https://i.ibb.co/C8SGRZh/image.png)

- Mengecek status service dan socket yang sudah dijalankan

```shell
systemctl status powerdns-admin.service powerdns-admin.socket
```

![image](https://i.ibb.co/KxyhzFy/image.png)

### Langkah 7: Install dan Konfigurasi Web Server Nginx

Disini saya memilih Nginx sebagai web server nya, namun kalian juga bisa disesuaikan dengan keinginan kalian misalkan Apache.

Untuk melakukan konfigurasi web server lainnya kalian bisa membaca dokumentasi resmi dari PowerDNS Admin nya [disini](https://github.com/PowerDNS-Admin/PowerDNS-Admin/tree/master/docs/wiki#web-server-configuration)

- Install Nginx Web Server

```shell
apt install nginx -y
```

![image](https://i.ibb.co/zmpjGzm/image.png)

- Menambahkan konfigurasi Nginx untuk aplikasi PowerDNS Admin

```shell
vim /etc/nginx/conf.d/pdns-admin.conf
```

- Tambahkan konfigurasi berikut kedalam file `pdns-admin.conf`

```shell
server {
  listen *:80;
  server_name                             localhost;
  index                                   index.html index.htm index.php;
  root                                    /opt/web/powerdns-admin;
  access_log                              /var/log/nginx/powerdns-admin.local.access.log combined;
  error_log                               /var/log/nginx/powerdns-admin.local.error.log;
  client_max_body_size                    10m;
  client_body_buffer_size                 128k;
  proxy_redirect                          off;
  proxy_connect_timeout                   90;
  proxy_send_timeout                      90;
  proxy_read_timeout                      90;
  proxy_buffers                           32 4k;
  proxy_buffer_size                       8k;
  proxy_set_header                        Host $host;
  proxy_set_header                        X-Real-IP $remote_addr;
  proxy_set_header                        X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_headers_hash_bucket_size          64;
  location ~ ^/static/  {
    include                               /etc/nginx/mime.types;
    root                                  /opt/web/powerdns-admin/powerdnsadmin;
    location ~*  \.(jpg|jpeg|png|gif)$ {
      expires                             365d;
    }
    location ~* ^.+.(css|js)$ {
      expires                             7d;
    }
  }
  location / {
    proxy_pass                            http://unix:/run/powerdns-admin/socket;
    proxy_read_timeout                    120;
    proxy_connect_timeout                 120;
    proxy_redirect                        off;
  }
}
```

![image](https://i.ibb.co/rdhC5Nz/image.png)

- Mengecek atau melakukan konfirmasi file nginx yang dibuat tidak ada syntax error

```shell
nginx -t
```

![image](https://i.ibb.co/BCqZ0Z1/image.png)

- Mengubah permission folder `/opt/web/powerdns-admin` agar menjadi milik `www-data:www-data`

```shell
chown -R www-data:www-data /opt/web/powerdns-admin
```

![image](https://i.ibb.co/BsGr192/image.png)

- Restart service Nginx

```shell
systemctl restart nginx
```

- Mengecek webserver Nginx berjalan di port `http` atau `80`

```shell
netstat -tunlp | grep nginx
```

> **Catatan**:
>
> Dapat dilihat digambar dibawah inih, bahwa webserver Nginx berjalan di port `80`

![image](https://i.ibb.co/BC9syFg/image.png)

- Membuka aplikasi yang sudah running di port `80`

> **Catatan**:
>
> Untuk membuka aplikasi nya masukan URL pada web browser dengan format
>
> ```
> http://<ip_address>
> ```

![image](https://i.ibb.co/0XDb4YC/image.png)

Apabila muncul nya seperti gambar diatas maka ada konfigurasi yang kurang pada nginx nya, ikuti langkah dibawah ini
agar default page pada port `80` yang dibuka nya adalah aplikasi `PowerDNS Admin`

- Mengubah konfigurasi `nginx.conf`

```shell
vim /etc/nginx/nginx.conf
```

- Berikan komen pada konfigurasi di baris `60`

```shell
...
    #include /etc/nginx/sites-enabled/*;
...
```

![image](https://i.ibb.co/bPTWBdm/image.png)

- Restart kembali service nginx nya, agar konfigurasi yang sudah diubah tadi digunakan

```shell
systemctl restart nginx
```

![image](https://i.ibb.co/vPr0XCt/image.png)

- Buka kembali alamat url `http://<ip_address>` di web browser

![image](https://i.ibb.co/CHfxr7g/image.png)

Sekarang aplikasi Flask PowerDNS Admin sudah berjalan dengan web server nginx di port 80.

Selanjutnya anda dapat melakukan daftar untuk user login di halaman PowerDNS Admin nya

### Langkah 8: Konfigurasi PowerDNS API

Untuk melakukan konfigurasi PowerDNS API, ikuti langkah dibawah ini

- Login kedalam aplikasi PowerDNS Admin menggunakan web browser

> **Catatan**:
>
> Jika kalian pertama kali, buat akun terlebih dahulu.
> Default atau bawaan akun yang pertama kali dibuat akan otomatis role user nya adalah `Administrator`
>
> ![image](https://i.ibb.co/NmGBNNV/image.png)

- Buka tab `API Keys` pada menu sidebar

![image](https://i.ibb.co/x6nXTYm/image.png)

- Klik `Create Key`

![image](https://i.ibb.co/LxftTQt/image.png)

- Pada bagian `Role` pilih `Administrator` dan untuk `Description` isikan `My Key`

![image](https://i.ibb.co/XZNSMPp/image.png)

- Klik `Create API Key`

Setelah memilih role dan mengisikan description untuk API Key selanjutnya tekan `Create API Key`

Apabila terdapat alert konfirmasi, copy `API Key` nya kemudian klik `Confirm`

![image](https://i.ibb.co/TvYDhG3/image.png)

- Mengisikan `PowerDNS API URL`, `PowerDNS API Key`, `PowerDNS Version`

> **Catatan**:
>
> Untuk mengetahui `PowerDNS API URL` dan `PowerDNS Version` kalian bisa lihat di server
>
> - Mengecek PowerDNS API URL:
>   ![image](https://i.ibb.co/LQSN7b4/image.png)
> - Mengecek PowerDNS Version:
>   ![image](https://i.ibb.co/51s9VjJ/image.png)

![image](https://i.ibb.co/TLKdRpk/image.png)

- Mengganti API Key PowerDNS Server agar sesuai dengan PowerDNS Admin

Setelah kalian copy API Key yang sebelumnya dibuat, selanjutnya ubah atau isikan konfigurasi `api-key` pada file `/etc/powerdns/pdns.conf` dengan API Key yang di copy sebelumnya.

Setelah mengubah nya, jangan lupa restart service `pdns` agar perubahan nya tersimpan

```shell
systemctl restart pdns
```

![image](https://i.ibb.co/vqgBhzm/image.png)

Untuk mencoba apakah API nya berjalan kalian bisa menggunakan curl

```shell
curl -v -H 'X-API-Key: YOUR_SECRET_KEY' http://127.0.0.1:8081/api/v1/servers/localhost | jq .
curl -v -H 'X-API-Key: YOUR_SECRET_KEY' http://127.0.0.1:8081/api/v1/servers/localhost/zones | jq .
```

![image](https://i.ibb.co/RTs77Yv/image.png)

## Kesimpulan

Setelah melalui langkah-langkah dalam panduan ini, kalian telah menyiapkan PowerDNS, PowerDNS Web Interface pada Nginx, dan menghubungkan PowerDNS API.
