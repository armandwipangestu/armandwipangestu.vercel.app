---
published: true
title: "VMware Workstation Player - Membuat Virtual Machine (VM)"
tag: "SysAdmin"
date: "February 17 2024"
excerpt: "Pada artikel kali ini kita akan mencoba membuat sebuah Virtual Machine dengan sistem operasi Linux dengan distro nya adalah Debian pada VMware Workstation Player"
cover_image: "/images/posts/VMware Workstation Player - Membuat Virtual Machine.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Setelah pada pembahasan sebelumnya kita membahas bagaimana cara menginstall VMware Workstation Player pada sistem operasi Windows 11, pada artikel kali ini kita akan membahas bagaimana cara membuat Virtual Machine pada VMware Workstation Player. Disini saya akan menggunakan sistem operasi Linux untuk Virtual Machine nya dengan distro nya adalah Debian.

Jika kalian ingin mengikuti artikel ini pastikan kalian juga sudah men-download atau menyiapkan ISO File untuk sistem operasi yang akan di install pada Virtual Machine nya.

## Download ISO File Linux Debian

Untuk membuat sebuah VM kita membutuhkan yang namanya ISO File, oleh karena itu kita perlu mendownload nya terlebih dahulu di website resmi Debian nya dengan cara mengunjungi nya disini [www.debian.org/distrib/](https://www.debian.org/distrib/)

![Debian Distrib](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/debian-distrib.png)

Pada halaman tersebut terdapat 2 macam instalasi image:

- `small installation image`
- `complete installation image`

Perbedaan dari kedua image tersebut terletak pada package atau isian yang sudah pre-install. Sehingga sesuaikan dengan kebutuhan kalian, disini saya memilih yang `complete installation image` karena isian nya sudah lengkap dan juga tidak perlu membutuhkan koneksi internet untuk proses instalasi nya.

![Complete Installation Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/complete-installation-image.png)

Setelah memilih `complete installation image` selanjutnya pilih metode download yang akan digunakan, disini saya akan menggunakan `HTTP`.

![Download Using HTTP](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/download-using-http.png)

Selanjutnya pilih versi yang `stable` release.

![Stable Release](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/stable-release.png)

Setelah itu pilih tipe arsitektur yang akan digunakan, disini saya akan memilih `amd64`.

![Arsitektur amd64](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/arsitektur-amd64.png)

Selanjutnya download file dengan tulisan `debian-12.1.0-amd64-netinst.iso`.

![Debian Netinst ISO](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/debian-netinst-iso.png)

Kemudian pilih folder untuk hasil download ISO File tersebut. Disini saya memilih menyimpannya di lokasi `D:\Downloads\ISO File\OS`.

![PATH Download](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/path-download.png)

## Membuat VM Linux Debian

Setelah mempunyai ISO File nya, proses selanjutnya adalah membuat VM Linux Debian di aplikasi atau software VMware Workstation Player.

Untuk membuatnya, kalian buka software tersebut.

![VMware App](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/vmware-app.png)

Pada menu utama VMware Workstation Player, click pada tulisan `Create a New Virtual Machine`.

![Create a New Virtual Machine](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/create-a-new-virtual-machine.png)

### Pemilihan ISO File dan Operating System

Kemudian pilih atau arahkan `Installer disc image file (iso)` nya dengan ISO File yang sudah di download sebelumnya dengan cara click `Browse...`.

![Installer Disc Image ISO](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/installer-disc-image-iso.png)

Selanjutnya, arahkan ke folder penyimpanan ISO File Debian yang sudah di download, kemudian click atau pilih ISO File nya.

![Select Debian ISO File](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/select-debian-iso-file.png)

![Next Menu](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/next-menu.png)

Setelah itu click tombol `Next >` dan pilih `Guest operating system` nya dengan versi `Other Linux 5.x kernel 64-bit` atau kalian bisa pilih versi `Debian 11.x 64-bit`.

![Select Guest Operating System](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/select-guest-operating-system.png)

### Pengisian Nama VM, Lokasi Penyimpanan VM, dan Ukuran Penyimpanan VM

Isikan nama VM nya sesuai dengan kegunaannya, misalkan disini saya akan membuat VM untuk konfigurasi webserver, maka akan saya beri nama dengan `Debian 12 - Webserver`.

![Virtual Machine Name](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/virtual-machine-name.png)

Kemudian setelah pemilihan nama VM, kalian juga dapat memilih lokasi penyimpanan VM yang akan dibuat dengan cara click pada bagian `Browse...` lalu sesuaikan dengan keinginan kalian.

Setelah pemilihan nama VM dan lokasi penyimpanan, langkah selantjutnya adalah memberikan size atau ukuran untuk penyimpanan VM nya, disini saya akan memberikan sebesar `20 GB` dan `Split virtual disk into multiple files`.

![Specify Disk Capacity](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/specify-disk-capacity.png)

### Ringkasan atau Rangkuman Spesifikasi VM

Terakhir terdapat menu summary atau ringkasan mengenai konfigurasi VM yang sudah dibuat.

![Summary VM](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/summary-vm.png)

Disini saya akan mengubah ukuran RAM atau `Memory` untuk VM nya menjadi sebesar `1 GB` dan `Network Adapter` nya akan saya arahkan atau menggunakan `NAT` atau `VMnet8`.

Untuk melakukan perubahan konfigurasi click pada tulisan `Customize Hardware`.

![Customize Hardware](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/customize-hardware.png)

![Network Adapter](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/network-adapter.png)

atau

![Network Adapter 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/network-adapter-2.png)

Setelah mengubah konfigurasi VM nya, selanjutnya click pada tulisan `Finish` untuk menyelesaikan pembuatan VM nya.

![Finish Create VM](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/finish-create-vm.png)

Maka seharusnya sekarang terdapat VM dengan tulisan `Debian 12 - Webserver`.

![List VM](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/membuat-virtual-machine/list-vm.png)
