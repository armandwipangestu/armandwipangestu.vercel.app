---
published: true
title: "Domain - Pointing ke VPS"
tag: "SysAdmin"
date: "July 21 2023"
excerpt: "Pada artikel ini saya akan melakukan konfigurasi domain dari registrar agar mengarah ke VPS"
cover_image: "/images/posts/Domain - Pointing ke VPS.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Untuk menggunakan nama domain khusus dengan VPS, kalian harus membuat beberapa perubahan DNS terlebih dahulu. Pada artikel kali ini, Saya akan menunjukkan bagaimana cara mengarahkan atau pointing nama domain ke Virtual Private Server atau VPS menggunakan 2 metode:

- Mengubah A record di zona DNS saat ini
- Menyiapkan zona DNS baru dengan server nama khusus

## Prasyarat

Untuk melakukan konfigurasi berikut, kalian harus menyiapkan beberapa point berikut ini:

- IP Public
- Domain dari Registrar

## Metode 1 Pointing Domain ke VPS melalui A record

Metode berikut ini adalah solusi yang cukup mudah. Ini akan melibatkan perubahan record A kalian saat ini di zona DNS otoritatif. Ini berarti bahwa peralihan catatan harus dilakukan di zona DNS tempat nameserver kalian saat ini menunjuk.

Jika kalian memilih opsi ini, file zona DNS kalian dengan semua entri lain yang ada (CNAME, MX, NS dan data lainnya) akan tetap berada di penyedia saat ini. Pendekatannya mungkin lebih mudah bagi pemula atau mereka yang tidak ingin mengubah lokasi zona DNS mereka.

Jika kalian tidak yakin ke mana arah domain kalian saat ini, kalian dapat menggunakan alat pencarian atau DNS lookup seperti perintah `dig` untuk menemukan NS record. Menjalankan perintah berikut melalui terminal akan sangat membantu:

```shell
dig -t NS +short <domain.tld>
```

![nslookup](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/nslookup.png)

Sekarang setelah kalian mengetahui ke mana domain kalian diarahkan, buka konfigurasi DNS record di registrar domain kalian. Misalkan disini saya menggunakan niagahoster

![DNS Record](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/dns_record.png)

### Menambahkan DNS Record

Terdapat dua pendekatan dari untuk dipilih:

- Menggunakan dua `A` record - satu untuk domain itu sendiri dan satu untuk `www` subdomain.
- Menggunakan `A` record untuk domain itu sendiri dan `CNAME` record untuk `www` subdomain.

Kedua opsi diatas akan memberikan kalian hasil yang sama. Yang membedakan dari kedua opsi diatas adalah, yang satu menangani subdomain `www` menggunakan ip address dan yang satu menangani subdomain `www` menggunakan alias atau redirect.

#### Opsi 1 Menggunakan Dua A Record

| Name            | TTL   | Type | Address       |
| --------------- | ----- | ---- | ------------- |
| example.com     | 14400 | A    | 153.92.211.25 |
| www.example.com | 14400 | A    | 153.92.211.25 |

#### Opsi 2 Menggunakan A Record dan CNAME

| Name            | TTL   | Type  | Address       |
| --------------- | ----- | ----- | ------------- |
| example.com     | 14400 | A     | 153.92.211.25 |
| www.example.com | 14400 | CNAME | example.com   |

Misalkan disini saya memilih menggunakan dua A record

![Two A Record](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/two_a_record.png)

### Melakukan Pencarian DNS

> **Catatan**: Perlu diingat bahwa propagation atau propagasi DNS dapat memakan waktu hingga 24 jam atau lebih.
> Sehingga kalian mungkin harus menunggu setidaknya beberapa jam sebelum semuanya mulai berfungsi.

Setelah melakukan pointing domain ke VPS kalian, saatnya untuk memeriksa apakah record yang baru ditambahkan sebelumnya sudah benar. Untuk melakukan nya gunakan perintah berikut ini:

```shell
dig -t A +short <domain.tld>
```

![nslookup2](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/nslookup2.png)

Jika output atau hasil dari perintah diatas menunjukkan IP Address VPS kalian sebagai record A, semuanya telah dilakukan dengan benar! Bagian yang tersisa sedang menunggu DNS untuk disebarkan sepenuhnya ke seluruh dunia. Untuk mempercepat proses, kalian bisa melakukan flush dns.

> **Catatan**: Apabila pada VPS terdapat sebuah webserver, kalian bisa langsung mengunjungi domain kalian di URL browser dan akan muncul halaman dari webserver nya.
>
> Misalkan disini saya mempunyai webserver nginx yang berjalan pada port 81
>
> ![netstat nginx](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/netstat_nginx.png)
>
> ![netstat page](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/nginx_page.png)

## Metode 2 Pointing Domain ke VPS melalui Custom Nameservers

Pointing domain ke VPS melalui custom nameservers sedikit lebih rumit, karena kalian perlu menyiapkan DNS zone di VPS nya. Metode ini akan mengalihkan lokasi DNS zone kalian ke VPS, yang berarti bahwa semua perubahan terkait DNS di masa mendatang harus dilakukan melalui zone yang baru dibuat.

### Membuat Custom Nameservers

Untuk melakukannya, pertama - tama isikan custom nameservers di bagian `Child Nameservers` melalui registrar domain kalian. Masing - masing custom nameservers tersebut di arahkan atau di pointing ke IP Public VPS.

![Child Nameservers](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/child_ns.png)

### Menyiapkan DNS Zone di VPS

> **Catatan**: Disini saya menggunakan PowerDNS sebagai service dns server nya, jika kalian ingin melakukan hal yang sama kalian bisa membaca artikel berikut [PowerDNS Instalasi](/blog/powerdns-instalasi) dan [PowerDNS Master dan Slave](/blog/powerdns-master-dan-slave). Apabila kalian menggunakan service dns server yang lain seperti BIND, tinggal sesuaikan saja.

Untuk menyiapkan DNS Zone di VPS jika kalian menggunakan PowerDNS, terdapat beberapa langkah sebagai berikut ini:

- Binding IP Public VPS ke service PowerDNS

Binding ip public disini berfungsi agar service PowerDNS bisa diakses dari luar. Untuk melakukan nya cukup mudah, yaitu buka file konfigurasi PowerDNS di PATH `/etc/powerdns/pdns.conf`. Tambahkan IP Public pada bagian berikut ini:

> **Catatan**: Lakukan binding ip public berikut pada semua server apabila kalian mempunyai 2 atau lebih nameserver

```conf
local-address=127.0.0.1,<ip_local>,<ip_public>
```

- Membuat zone baru

Sebelum menambahkan record, kita perlu membuat zone terlebih dahulu dengan cara

```shell
pdnsutil create-zone <domain.tld>
```

![pdnsutil create-zone](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/pdns_create_zone.png)

- Menambahkan record untuk zone

Untuk menambahkan record pada zone yang sebelumnya dibuat, gunakan perintah berikut ini:

```shell
pdnsutil edit-zone <domain.tld>
```

Kemudian tambahkan record seperti berikut ini

```
<domain.tld>        3600    IN      SOA     ns1.domain.tld contact.domain.tld YYYYMMDD01 10800 3600 604800 3600
<domain.tld>        3600    IN      A       <ip_public>
<domain.tld>        3600    IN      NS      ns1.domain.tld
<domain.tld>        3600    IN      NS      ns2.domain.tld
ns1.<domain.tld>    3600    IN      A       <ip_public_ns1>
ns2.<domain.tld>    3600    IN      A       <ip_public_ns2>
www.<domain.tld>    3600    IN      A       <ip_public>
```

![pdns record](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/pdns_record.png)

Setelah itu berikan AXFR notify ke slave

```shell
pdns_control notify <domain.tld>
```

![pdns_control notify](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/axfr_notify.png)

- Restart Service PowerDNS

Setelah semua hal diatas dilakukan, selanjutnya lakukan restart service powerdns agar binding ip public nya berjalan dengan perintah berikut:

> **Catatan**: Lakukan restart service berikut ini pada semua server

```shell
systemctl restart pdns
```

Untuk memastikan bahwa powerdns berjalan pada ip public, kalian bisa melihat nya menggunakan perintah berikut ini:

```shell
netstat -tunlp | grep pdns_server
```

![netstat pdns_server](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/netstat_pdns_server.png)

### Mengubah Nameservers

Setelah DNS Zone disiapkan di VPS, selanjutnya kita arahkan nameservers pada domain registrar agar mengarah ke VPS. Untuk melakukannya buka konfigurasi domain di registrar, kemudian pilih `Update Nameservers` dan isikan sebagai berikut

| Nameservers 1  | Nameserver 2   |
| -------------- | -------------- |
| ns1.domain.tld | ns2.domain.tld |

![nameservers](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/nameservers.png)

> **Catatan**: Perlu diingat bahwa propagasi DNS dapat memakan waktu hingga 24 jam, jadi kalian harus menunggu setidaknya satu atau dua jam sebelum semuanya beroprasi penuh. Untuk mempercepat, kalian bisa melakukan flush DNS kembali.

Setelah DNS selesai melakukan propagasi, kalian dapat memeriksa record NS nya kembali menggunakan perintah dig.

```shell
dig -t NS +short <domain.tld>
```

Maka sekarang output nya akan mengarah ke nameserver kalian, bukan lagi menggarah ke nameserver registrar

![nslookup3](${NEXT_PUBLIC_PUBLIC_ASSETS}/domain_pointing_ke_vps/nslookup3.png)
