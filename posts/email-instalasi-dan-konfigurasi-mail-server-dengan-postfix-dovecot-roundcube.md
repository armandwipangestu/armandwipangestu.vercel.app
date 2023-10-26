---
published: true
title: "Email - Instalasi dan Konfigurasi Mail Server dengan Postfix, Dovecot dan Roundcube"
tag: "SysAdmin"
date: "August 23 2023"
excerpt: "Pada artikel ini saya akan melakukan instalasi dan konfigurasi untuk mail server menggunakan Postfix, Dovecot dan Roundcube"
cover_image: "/images/posts/Email - Instalasi dan Konfigurasi Mail Server dengan Postfix Dovecot dan Roundcube.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Postfix adalah sebuah service untuk Mail Transfer Agent (MTA) untuk me-routing atau mengarahkan dan mengirim surat elektronik (email), Postfix menggunakan protocol SMTP (Simple Mail Transfer Protocol). Dovecot meruapakan sebuah service untuk Mail Delivery Agent (MDA), Dovecot
menggunakan protocol IMAP dan POP3. Sedangkan Roundcube adalah sebuah service untuk Mail User Agent (MUA).

Kedua open-souce aplikasi tersebut (Postfix dan Dovecot) dapat berjalan dengan baik dengan Roundcube, sebuah email client yang terkenal
karena penggunaan Ajax yang cerdas. Dalam artikel kali ini, saya akan menginstal dan melakukan konfigurasi untuk Postfix, Dovecot dan Roundcube di Sistem Operasi Ubuntu 22.04. Artikel ini menggunakan nama domain `example.com`, ip public `112.16.21.20` dan nama server `mail.example.com`

## Persyaratan

Sebelum melakukan eksekusi, terdapat beberapa hal yang perlu disiapkan, diantaranya adalah:

- DNS Record

Untuk persiapan ini, kita harus membuat beberapa DNS record diantaranya adalah

> **Catatan**:
>
> Perhatikan value `IP Public` dan `nama domain`, sesuaikan dengan konfigurasi kalian. Apabila kalian tidak dapat menambahkan
> reverse zone (seperti `ip_public.in-addr.arpa`), maka kalian harus meminta ke ISP (Internet Service Provider) yang kalian gunakan untuk menambahkannya
>
> **Optional**:
>
> Anda dapat menambahkan record subdomain untuk masing-masing service seperti `smtp.example.com`, `pop.example.com`, `imap.example.com`
>
> | Zone        | Name | Type  | TTL  | Value            |
> | ----------- | ---- | ----- | ---- | ---------------- |
> | eaxmple.com | smtp | CNAME | 3600 | mail.example.com |
> |             | pop  | CNAME | 3600 | mail.example.com |
> |             | imap | CNAME | 3600 | mail.example.com |
>
> atau
>
> | Zone        | Name | Type | TTL  | Value        |
> | ----------- | ---- | ---- | ---- | ------------ |
> | eaxmple.com | smtp | A    | 3600 | 112.16.21.20 |
> |             | pop  | A    | 3600 | 112.16.21.20 |
> |             | imap | A    | 3600 | 112.16.21.20 |

![DNS Record](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/dns_record.png)

## Install dan Konfigurasi Postfix

Untuk melakukan install Postfix, kalian bisa menjalankan perintah berikut ini

```bash
sudo apt install -y postfix
```

maka akan muncul Postfix Configuration seperti gambar dibawah ini, tekan `TAB` dan `ENTER` untuk melanjutkan

![Postfix Screen Configurtion](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/postfix_configuration_screen.webp)

Pada menu selanjutnya, pilih `Internet Site` kemudian tekan `TAB` dan `ENTER`

![Postfix Screen Configurtion 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/postfix_configuration_screen_2.webp)

Selanjutnya masukan nama email sistem, yang merupakan nama domain anda. Misalnya, nama servernya adalah `email.example.com`, jadi masukan `example.com` di sini.

![Postfix Screen Configurtion 3](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/postfix_configuration_screen_3.webp)

langkah selanjutnya adalah melakukan backup konfigurasi postfix di PATH `/etc/postfix/main.cf` dengan cara

```shell
sudo mv /etc/postfix/main.cf /etc/postfix/main.cf.orig
```

selanjutnya buat konfigurasi baru

```shell
sudo vim /etc/postfix/main.cf
```

kemudian isikan konfigurasi dibawah ini

> **Catatan**:
>
> Ganti `example.com` dengan domain anda dan pastikan value dari `smtpd_tls_cert_file` dan `smtpd_tls_key_file` diarahkan ke SSL anda

```conf
smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
biff = no

append_dot_mydomain = no

readme_directory = no

compatibility_level = 3.6

# TLS parameters
smtp_use_tls=yes
smtp_tls_security_level=may
smtp_tls_CApath=/etc/ssl/certs
smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache

smtpd_use_tls=yes
smtpd_tls_security_level=may
smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
smtpd_tls_cert_file=/etc/letsencrypt/live/example.com/fullchain.pem
smtpd_tls_key_file=/etc/letsencrypt/live/example.com/privkey.pem
smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination

smtpd_sasl_auth_enable = yes
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth

virtual_transport = lmtp:unix:private/dovecot-lmtp
virtual_mailbox_domains = /etc/postfix/virtual_mailbox_domains

myhostname = mail.example.com
myorigin = /etc/mailname
mydestination = $myhostname, mail.example.com, localhost.example.com, localhost
relayhost =
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all
inet_protocols = all
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
```

## Membuat Virtual Mail Box Domains

- Pada file konfigurasi `main.cf` diatas, terdapat value dari `virtual_mailbox_domains` untuk menginstruksikan postfix untuk mencari
  domain email di file `/etc/postfix/virtual_mailbox_domains`. Maka buat file tersebut dengan cara

```shell
sudo vim /etc/postfix/virtual_mailbox_domains
```

- Isikan konfigurasi berikut ke dalam file tersebut dan ganti `example.com` dengan nama domain anda

```conf
example.com
```

- Gunakan perintah `postmap` untuk mengubah `/etc/postfix/virtual_mailbox_domains` ke format yang dapat dikenali oleh Postfix.
  Jalankan perintah ini setiap Anda mengedit file, misalnya setelah menambahkan lebih banyak nama domain ke file tersebut.

```shell
sudo postmap /etc/postfix/virtual_mailbox_domains
```

- Ubah konfigurasi file `/etc/postfix/master.cf` untuk enable SMTP Service

```shell
sudo vim /etc/postfix/master.cf
```

- Cari entri dibawah ini

```conf
...
#submission inet n       -       y       -       -       smtpd
...
```

- Hapus symbol `#` atau comment-nan pada awal baris, sehingga menjadi

```conf
...
submission inet n       -       y       -       -       smtpd
...
```

## Install dan Konfigurasi Dovecot

- Untuk melakukan install Dovecot dan semua dependency package nya agar bisa menjalankan **imap**, **pop3**, dan **lmtp** service, kalian bisa menjalankan perintah berikut ini

```shell
sudo apt install -y dovecot-core dovecot-imapd dovecot-pop3d dovecot-lmtpd
```

- edit file konfigurasi `/etc/dovecot/conf.d/10-mail.conf` untuk menginstruksikan Dovecot pada direktori untuk mencari email.

```shell
sudo vim /etc/dovecot/conf.d/10-mail.conf
```

- Cari entri dibawah ini

```conf
...
mail_location = mbox:~/mail:INBOX=/var/mail/%u
...
```

- ubah menjadi

```conf
...
mail_location = maildir:/var/mail/vhosts/%d/%n
...
```

Simpan dan tutup file. `%d` mewakili nama domain, dan `%n` mewakili nama pengguna atau user. Ini berarti Anda harus membuat subdirektori
di `/var/mail/vhost` untuk setiap domain yang menerima email dari server anda.

- Membuat sub-direktori dan ganti **example.com** dengan nama domain anda

> **Catatan**
>
> Ulangi perintah dibawah ini untuk setiap nama domain lain yang ingin anda terima emailnya di server anda.
> Misalkan jika ingin menerima email untuk domain **example.net** jalankan perintah berikut ini
>
> ```shell
> sudo mkdir -p /var/mail/vhosts/example.net
> ```

```shell
sudo mkdir -p /var/mail/vhosts/example.com
```

- Membuat Vmail user dan group untuk keperluan service dovecot

Membuat **vmail** group

```shell
sudo groupadd -g 5000 vmail
```

Membuat **vmail** user kemudian masukan ke dalam **vmail** group

```shell
sudo useradd -r -g vmail -u 5000 vmail -d /var/mail/vhosts -c "virtual mail user"
```

Ganti ownership folder `/var/mail/vhosts` agar menjadi milik **vmail** user dan group

```shell
sudo chown -R vmail:vmail /var/mail/vhosts/
```

- Ubah konfigurasi dovecot pada file `10-master.conf`

```shell
sudo vim /etc/dovecot/conf.d/10-master.conf
```

- Temukan entri dibawah ini

```conf
...
inet_listener imaps {
  #port = 993
  #ssl = yes
}
...
```

Hapus tanda `#` sebelum entri port dan ssl, seperti yang ditunjukan dibawah ini, untuk memungkinkan dovecot menggunakan port 993 dan
SSL untuk secure IMAP.

```conf
...
inet_listener imaps {
  port = 993
  ssl = yes
}
...
```

- Kemudian temukan juga entri dibawah ini

```conf
...
inet_listener pop3s {
  #port = 995
  #ssl = yes
}
...
```

Hapus tanda `#` sebelum port dan ssl

```conf
...
inet_listener pop3s {
  port = 995
  ssl = yes
}
...
```

- Enable **lmtp** service, temukan entri dibawah ini

```conf
...
service lmtp {
  unix_listener lmtp {
    #mode = 0666
  }

  # Create inet listener only if you can't use the above UNIX socket
  #inet_listener lmtp {
    # Avoid making LMTP visible for the entire internet
    #address =
    #port =
  #}
}
...
```

- Ubah menjadi seperti berikut ini

```conf
...
service lmtp {
  unix_listener /var/spool/postfix/private/dovecot-lmtp {
    mode = 0600
    user = postfix
    group = postfix
  }
}
...
```

- Temukan entri dovecot authentication socket

```conf
...
# Postfix smtp-auth
#unix_listener /var/spool/postfix/private/auth {
#  mode = 0666
#}
...
```

- Ubah menjadi seperti berikut ini

```conf
...
#Postfix smtp-auth
unix_listener /var/spool/postfix/private/auth {
  mode = 0666
  user = postfix
  group = postfix
}
...
```

- Simpan dan tutup file

- Konfigurasi dovecot untuk menggunakan secure authentication. Ubah konfigurasi dovecot pada file `10-auth.conf`

```shell
sudo vim /etc/dovecot/conf.d/10-auth.conf
```

- Temukan entri dibawah ini

```conf
# disable_plaintext_auth = yes
```

Uncomment atau hapus tanda `#`

```conf
disable_plaintext_auth = yes
```

- Temukan entri dibawah ini

```conf
auth_mechanisms = plain
```

Ubah mekanisme authentication dari **plain** menjadi **plain login**

```conf
auth_mechanisms = plain login
```

- Disable dovecot default authentication behavior yang mengharuskan pengguna memiliki akun sistem untuk menggunakan layanan email. Cari entri dibawah ini

```conf
!include auth-system.conf.ext
```

berikan komentar atau simbol `#` di awal baris

```conf
#!include auth-system.conf.ext
```

- cari juga entri dibawah ini

```conf
#!include auth-passwdfile.conf.ext
```

hapus simbol `#` di awal baris untuk enable Dovecot menggunakan password file

```conf
!include auth-passwdfile.conf.ext
```

- Simpan dan tutup file.

- Mengubah dovecot password file **auth-passwdfile.conf.ext**

```shell
sudo vim /etc/dovecot/conf.d/auth-passwdfile.conf.ext
```

Isi dalam file kurang lebih mirip seperti dibawah ini

```conf
passdb {
  driver = passwd-file
  args = scheme=CRYPT username_format=%u /etc/dovecot/users
}

userdb {
  driver = passwd-file
  args = username_format=%u /etc/dovecot/users
}
```

Ubah isian file tersebut, seperti berikut ini

```conf
passdb {
    driver = passwd-file
    args = scheme=PLAIN username_format=%u /etc/dovecot/dovecot-users
}

userdb {
    driver = static
    args = uid=vmail gid=vmail home=/var/mail/vhosts/%d/%n
}
```

Simpan dan tutup file

- Membuat **/etc/dovecot/dovecot-users** password file. File ini adalah plain text database untuk menampung email user di server anda.

```shell
sudo vim /etc/dovecot/dovecot-users
```

Tambahkan user yang ingin anda gunakan untuk email service dengan mengikuti format seperti dibawah ini. Ganti **EXAMPLE_PASSWORD** dengan
kata sandi yang kuat. Dan juga, ganti **example.com** dengan nama domain anda.

```conf
admin@example.com:{plain}EXAMPLE_PASSWORD
info@example.com:{plain}EXAMPLE_PASSWORD
billing@example.com:{plain}EXAMPLE_PASSWORD
```

Simpan dan tutup file

- Konfigurasi Dovecot user untuk menggunakan SSL certificate. Buka file `/etc/dovecot/conf.d/10-ssl.conf`

```shell
sudo vim /etc/dovecot/conf.d/10-ssl.conf
```

temukan entri berikut

```conf
ssl = yes
```

ubah value dari ssl dari `yes` menjadi `required`

```conf
ssl = required
```

Temukan dua entri berikut ini

```conf
#ssl_cert = </etc/dovecot/dovecot.pem
#ssl_key = </etc/dovecot/private/dovecot.pem
```

ubah kedua entri diatas dan pastikan mengarah ke SSL certificate untuk domain anda. Misalnya, jika Anda menggunakan sertifikat Let's Encrypt,
entri Anda akan serupa dengan yang ditunjukan dibawah ini. Ganti `example.com`` dengan nama domain anda.

```conf
ssl_cert = </etc/letsencrypt/live/example.com/fullchain.pem
ssl_key = </etc/letsencrypt/live/example.com/privkey.pem
```

Simpan dan tutup file

Restart service postfix dan dovecot agar menggunakan konfigurasi terbaru

```shell
sudo systemctl restart postfix dovecot
```

## Install dan Konfigurasi Roundcube

Untuk dapat mengakses Postfix dan Dovecot server, kita perlu sebuah mail client. Contohnya disini menggunakan roundcube

```shell
sudo apt install -y roundcube
```

Tekan `ENTER` untuk konfigurasi database untuk menggunakan roundcube

![Roundcube](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/roundcube.webp)

Pada menu selanjutnya, masukan MySQL password untuk menggunakan roundcube

![Roundcube 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/roundcube2.webp)

Tekan `TAB` dan `ENTER`

Ulangi dengan password yang sama kemudian tekan `TAB` dan `ENTER` untuk melanjutkan.

Buat konfigurasi nginx untuk virtual host roundcube

```shell
sudo vim /etc/nginx/conf.d/mail.example.com.conf
```

Isikan konfigurasi seperti dibawah ini, sesuaikan dengan nama domain anda

```conf
server {
  listen 80;
  listen [::]:80;
  server_name mail.example.com;
  root /var/www/roundcube/;
  index index.php index.html index.htm;

  error_log /var/log/nginx/roundcube.error;
  access_log /var/log/nginx/roundcube.access;

  location / {
    try_files $uri $uri/ /index.php;
  }

  location ~ \.php$ {
   try_files $uri =404;
    fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
  }

  location ~ /.well-known/acme-challenge {
    allow all;
  }
 location ~ ^/(README|INSTALL|LICENSE|CHANGELOG|UPGRADING)$ {
    deny all;
  }
  location ~ ^/(bin|SQL)/ {
    deny all;
  }
 # A long browser cache lifetime can speed up repeat visits to your page
  location ~* \.(jpg|jpeg|gif|png|webp|svg|woff|woff2|ttf|css|js|ico|xml)$ {
       access_log        off;
       log_not_found     off;
       expires           360d;
  }
}
```

Simpan dan tutup file, kemudian test Nginx konfigurasi.

```shell
sudo nginx -t
```

Jika test berhasil, restart service nginx untuk menerapkan konfigurasi terbaru

```shell
sudo systemctl reload nginx
```

Sekarang anda dapat membuka Roundcube dengan web-base di URL `http://mail.example.com`

## Mengaktifkan HTTPS

Sangat disarankan agar anda menggunakan TLS untuk enkripsi email web anda. Kita dapat mengaktifkan HTTPS dengan memasang sertifikat
TLS gratis yang dikeluarkan dari Let's Encrypt. Jalankan perintah berikut untuk menginstall Let's Encrypt

```shell
sudo apt install certbot -y
```

Jika menggunakan nginx, anda juga perlu menginstall cerbot nginx plugin

```shell
sudo apt install python3-certbot-nginx -y
```

Selanjutnya, jalankan perintah berikut ini untuk mendapatkan dan menginstal sertifikat TLS

```shell
sudo certbot --nginx --agree-tos --redirect --hsts --staple-ocsp --email admin@example.comf -d mail.example.com
```

Jika menggunakan apache, install certbot apache plugin

```shell
sudo apt install python3-certbot-apache -y
```

Dan jalankan perintah berikut ini untuk mendapatkan dan menginstal sertifikat TLS

```shell
sudo certbot --apache --agree-tos --redirect --hsts --staple-ocsp --email admin@example.comf -d mail.example.com
```

## Test Email Service

Untuk login email server menggunakan Roundcube, masukan URL pada web browser anda seperti berikut

```
https://mail.example.com
```

Anda dapat melihat tampilan yang sama seperti ini. Masukan username dan password yang telah di definisikan pada file `/etc/dovecot/dovecot-users`

![Roundcube](${NEXT_PUBLIC_PUBLIC_ASSETS}/email_postifx_dovecot_dan_roundcube/roundcube.png)
