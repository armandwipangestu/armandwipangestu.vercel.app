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

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-language.png)

## Optional Update

Apabila versi ubuntu server yang kalian pilih sudah terdapat update yang terbaru, maka pada menu selanjutnya akan muncul sebuah pilihan untuk melakukan update ke versi yang terbaru.

Disini saya tidak akan melakukan update nya, maka disini saya memlihih `Continue without updating`.

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-update-option.png)

## Konfigurasi Keyboard

Pada menu ke 3 atau setelah menu [Optional Update](#optional-update), selanjutnya muncul pemilihan untuk konfigurasi layout keyboard. Disini saya akan memilih standar yang biasa dipakai yaitu

- Layout: `English (US)`
- Variant: `English (US)`

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-keyboard-option.png)

## Memilih Tipe Instalasi

Selanjutnya, terdapat menu untuk memilih tipe instalasi yang akan digunakan, terdapat 2 macam yaitu:

- Ubuntu Server
- Ubuntu Server (Minimized)

Sesuaikan dengan kebutuhan kalian masing-masing, disini saya akan memilih opsi pertama

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-type.png)

## Konfigurasi Jaringan

Setelah memilih tipe instalasi, selanjutnya memilih konfigurasi jaringan yang akan digunakan pada host ubuntu server nya, sesuaikan dengan konfigurasi jaringan yang digunakan. Pada konfigurasi jaringan ini terdapat 2 pilihan, diantaranya adalah:

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-network.png)

- [DHCP Client](#dhcp-client)
- [Manual (Static)](#manual-static)

### DHCP Client

Default atau bawaan yang dipilih adalah DHCP IPv4

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-network-2.png)

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

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-network-3.png)

Setelah itu `Save`

## Konfigruasi Proxy

Setelah melakukan konfigurasi jaringan, menu selanjutnya adalah konfigurasi proxy. Apabila kalian mempunyai proxy dan ingin menggunakan nya, isikan dengan konfigurasi yang kalian punya.

Disini saya tidak akan menggunakan proxy sehingga tidak akan saya isi

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-proxy.png)

## Konfigurasi Ubuntu Archive Mirror

Pada konfigurasi ini, isikan dengan URL mirror terdekat dari server kalian. Berhubung saya tinggal di Indonesia dan saya menggunakan ISP Indonesia maka saya isikan dengan

```
http://id.arcive.ubuntu.com/ubuntu
```

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-mirror.png)

Apabila kalian ingin melihat list ubuntu mirror pada setiap negara, kalian bisa mengunjungi website berikut ini [launchpad.net/ubuntu/+archivemirrors](https://launchpad.net/ubuntu/+archivemirrors)

Untuk melihat nya, kalian cukup hover pada bagian tulisan href `http` atau `rsync` maka akan muncul URL mirror nya

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-mirror-2.png)

## Konfigurasi Penyimpanan

Pada konfigurasi penyimpanan ini terdapat 2 pilihan, yang pertama adalah konfigurasi bawaan dari ubuntu nya langsung dan yang kedua adalah kustom konfigurasi. Disini saya akan memilih kustom konfigurasi

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-storage.png)

### Boot Partisi

Apabila kalian menggunakan UEFI mode pada sistem kalian, maka membutuhkan boot partisi ini, untuk membuat nya kalian bisa pilih pada bagian `free space` > `Add GPT Partition`

Untuk konfigurasi boot partisi ini saya menggunakan

```
Size: 512M
Format: Leave unformatted
Mount:
```

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-storage-partition.png)

### Swap Partisi

Swap Partisi ini simpel nya berfungsi untuk mengalokasikan storage menjadi seperti RAM.

Untuk konfigurasi swap partisi ini saya menggunakan

```
Size: 8129M
Format: swap
Mount:
```

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-storage-partition-2.png)

### Root Partisi

Root Partisi ini berfungsi sebagai storage utama pada server sistem operasi kita, atau jika kalian familiar dengan windows, root partisi ini sama halnya seperti `Local Disk (C:)`

Untuk konfigurasi root partisi ini saya menggunakan

> **Catatan**: `Size` kosong disini artinya menggunakan seluruh free space yang ada

```
Size:
Format: ext4
Mount: /
```

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-storage-partition-3.png)

Setelah semua konfigurasi selesai, kalian bisa melihat summary konfigurasi penyimpanan nya

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-storage-partition-summary.png)

Apabila anda sudah yakin dengan konfigurasi penyimpanan nya, pilih `Done`

Maka akan muncul konfirmasi pemberitahuan, pilih `Continue` apabila yakin

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-confirmation.png)

## Konfigurasi Profil

Setelah melakukan [Konfigurasi Penyimpanan](#konfigurasi-penyimpanan) selanjutnya adalah melakukan konfigurasi profil, disini terdapat beberapa kolom yang perlu di isi, diantaranya adalah:

```
Your name:
Your server`s name:
Pick a username:
Choose a password:
Confirm your password:
```

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-profile-setup.png)

Untuk konfigurasi ini sesuaikan dengan keinginan kalian

## Konfigurasi SSH

Selanjutnya adalah melakukan konfigurasi SSH, konfigurasi SSH disini optional, jika kalian ingin menginstal openssh server langsung ketika instalasi ubuntu server nya, bisa aktifkan konfigurasi ini. Apabila tidak ingin menginstal nya kalian bisa disable konfigurasi ini

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-ssh-setup.png)

## Konfigurasi Snap Package

Ubuntu menawarkan konfigurasi snap package populer yang sering digunakan di lingkungan server. Apabila kalian ingin memilih nya bisa tekan `Space` pada package yang dipilih dan tekan `Enter` untuk melihat detail lebih nya mengenai package yang dipilih

Jika tidak atau sudah memilih package nya, bisa tekan `Done`

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-snap.png)

## Selesai

Setelah semua konfigurasi dilakukan, maka sistem operasi ubuntu-server akan di install

![image](${NEXT_PUBLIC_PUBLIC_ASSETS}/ubuntu-server-instalasi-ubuntu-server/ubuntu-installation-system.png)
