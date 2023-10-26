---
published: true
title: "Ubuntu Server - Instalasi Ubuntu Server 22.04"
tag: "Linux"
date: "June 21 2023"
excerpt: "Pada artikel ini kita akan melakukan instalasi pada sistem operasi ubuntu server 22.04"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Memilih Bahasa

Ketika ubuntu server pertama kali dinyalakan, akan muncul sebuah menu untuk memilih bahasa yang akan digunakan, disini saya akan memilih bahasa `English`.

![image](https://i.ibb.co/kqfD51q/image.png)

## Optional Update

Apabila versi ubuntu server yang kalian pilih sudah terdapat update yang terbaru, maka pada menu selanjutnya akan muncul sebuah pilihan untuk melakukan update ke versi yang terbaru.

Disini saya tidak akan melakukan update nya, maka disini saya memlihih `Continue without updating`.

![image](https://i.ibb.co/BwV53xc/image.png)

## Konfigurasi Keyboard

Pada menu ke 3 atau setelah menu [Optional Update](#optional-update), selanjutnya muncul pemilihan untuk konfigurasi layout keyboard. Disini saya akan memilih standar yang biasa dipakai yaitu

- Layout: `English (US)`
- Variant: `English (US)`

![image](https://i.ibb.co/McqKDgm/image.png)

## Memilih Tipe Instalasi

Selanjutnya, terdapat menu untuk memilih tipe instalasi yang akan digunakan, terdapat 2 macam yaitu:

- Ubuntu Server
- Ubuntu Server (Minimized)

Sesuaikan dengan kebutuhan kalian masing-masing, disini saya akan memilih opsi pertama

![image](https://i.ibb.co/4V1fq37/image.png)

## Konfigurasi Jaringan

Setelah memilih tipe instalasi, selanjutnya memilih konfigurasi jaringan yang akan digunakan pada host ubuntu server nya, sesuaikan dengan konfigurasi jaringan yang digunakan. Pada konfigurasi jaringan ini terdapat 2 pilihan, diantaranya adalah:

![image](https://i.ibb.co/JjJTrmq/image.png)

- [DHCP Client](#dhcp-client)
- [Manual (Static)](#manual-static)

### DHCP Client

Default atau bawaan yang dipilih adalah DHCP IPv4

![image](https://i.ibb.co/gFxpYQt/image.png)

### Manual (Static)

Untuk melakukan konfigurasi static ip address, langkah pertama adalah memilih `IPv4 Method` nya dengan pilihan `Manual`.

Selanjutnya isikan dengan konfigurasi ip address masing-masing, contohnya sebagai berikut ini:

```
Subnet: 192.168.0.0/24
Address: 192.168.0.131
Gateway: 192.168.0.1
Name Servers: 8.8.8.8,8.8.4.4
Search Domain:
```

![image](https://i.ibb.co/j6Vv7J5/image.png)

Setelah itu `Save`

## Konfigruasi Proxy

Setelah melakukan konfigurasi jaringan, menu selanjutnya adalah konfigurasi proxy. Apabila kalian mempunyai proxy dan ingin menggunakan nya, isikan dengan konfigurasi yang kalian punya.

Disini saya tidak akan menggunakan proxy sehingga tidak akan saya isi

![image](https://i.ibb.co/qWRYDyW/image.png)

## Konfigurasi Ubuntu Archive Mirror

Pada konfigurasi ini, isikan dengan URL mirror terdekat dari server kalian. Berhubung saya tinggal di Indonesia dan saya menggunakan ISP Indonesia maka saya isikan dengan

```
http://id.arcive.ubuntu.com/ubuntu
```

![image](https://i.ibb.co/KKwG44X/image.png)

Apabila kalian ingin melihat list ubuntu mirror pada setiap negara, kalian bisa mengunjungi website berikut ini [launchpad.net/ubuntu/+archivemirrors](https://launchpad.net/ubuntu/+archivemirrors)

Untuk melihat nya, kalian cukup hover pada bagian tulisan href `http` atau `rsync` maka akan muncul URL mirror nya

![imgae](https://i.ibb.co/02MPK4B/image.png)

## Konfigurasi Penyimpanan

Pada konfigurasi penyimpanan ini terdapat 2 pilihan, yang pertama adalah konfigurasi bawaan dari ubuntu nya langsung dan yang kedua adalah kustom konfigurasi. Disini saya akan memilih kustom konfigurasi

![image](https://i.ibb.co/FmgwYgj/image.png)

### Boot Partisi

Apabila kalian menggunakan UEFI mode pada sistem kalian, maka membutuhkan boot partisi ini, untuk membuat nya kalian bisa pilih pada bagian `free space` > `Add GPT Partition`

Untuk konfigurasi boot partisi ini saya menggunakan

```
Size: 512M
Format: Leave unformatted
Mount:
```

![image](https://i.ibb.co/c10SdKH/image.png)

### Swap Partisi

Swap Partisi ini simpel nya berfungsi untuk mengalokasikan storage menjadi seperti RAM.

Untuk konfigurasi swap partisi ini saya menggunakan

```
Size: 8129M
Format: swap
Mount:
```

![image](https://i.ibb.co/5514d9s/image.png)

### Root Partisi

Root Partisi ini berfungsi sebagai storage utama pada server sistem operasi kita, atau jika kalian familiar dengan windows, root partisi ini sama halnya seperti `Local Disk (C:)`

Untuk konfigurasi root partisi ini saya menggunakan

> **Catatan**: `Size` kosong disini artinya menggunakan seluruh free space yang ada

```
Size:
Format: ext4
Mount: /
```

![image](https://i.ibb.co/qrh8XVw/image.png)

Setelah semua konfigurasi selesai, kalian bisa melihat summary konfigurasi penyimpanan nya

![image](https://i.ibb.co/80537bc/image.png)

Apabila anda sudah yakin dengan konfigurasi penyimpanan nya, pilih `Done`

Maka akan muncul konfirmasi pemberitahuan, pilih `Continue` apabila yakin

![image](https://i.ibb.co/8bh6SHm/image.png)

## Konfigurasi Profil

Setelah melakukan [Konfigurasi Penyimpanan](#konfigurasi-penyimpanan) selanjutnya adalah melakukan konfigurasi profil, disini terdapat beberapa kolom yang perlu di isi, diantaranya adalah:

```
Your name:
Your server`s name:
Pick a username:
Choose a password:
Confirm your password:
```

![image](https://i.ibb.co/sWSds7m/image.png)

Untuk konfigurasi ini sesuaikan dengan keinginan kalian

## Konfigurasi SSH

Selanjutnya adalah melakukan konfigurasi SSH, konfigurasi SSH disini optional, jika kalian ingin menginstal openssh server langsung ketika instalasi ubuntu server nya, bisa aktifkan konfigurasi ini. Apabila tidak ingin menginstal nya kalian bisa disable konfigurasi ini

![image](https://i.ibb.co/ZW7VQKH/image.png)

## Konfigurasi Snap Package

Ubuntu menawarkan konfigurasi snap package populer yang sering digunakan di lingkungan server. Apabila kalian ingin memilih nya bisa tekan `Space` pada package yang dipilih dan tekan `Enter` untuk melihat detail lebih nya mengenai package yang dipilih

Jika tidak atau sudah memilih package nya, bisa tekan `Done`

![image](https://i.ibb.co/b7XctvW/image.png)

## Selesai

Setelah semua konfigurasi dilakukan, maka sistem operasi ubuntu-server akan di install

![image](https://i.ibb.co/pZMWvZZ/image.png)
