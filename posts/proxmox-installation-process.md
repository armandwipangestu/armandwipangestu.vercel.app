---
title: "Proxmox - #1 Installation Process"
tag: "SysAdmin"
date: "June 26 2023"
excerpt: "Pada artikel ini kita akan melakukan instalasi Proxmox VE"
cover_image: "/images/posts/Proxmox - Installation Process.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

> **Peringatan**: Langkah - langkah pada artikel ini mengambil dari channel youtube [Learn Linux TV](https://www.youtube.com/@LearnLinuxTV) dari playlist [Proxmox Full Course](https://www.youtube.com/watch?v=LCjuiIswXGs&list=PLT98CRl2KxKHnlbYhtABg6cF50bYa8Ulo&pp=iAQB)

## Bahan - bahan

Untuk melakukan instalasi `Proxmox VE` kita membutuhkan beberapa bahan diantaranya adalah

- ISO File
- Flashdisk atau penyimpanan

Untuk mendapatkan ISO File `Proxmox VE` anda bisa mengunjungi web resmi proxmox kemudian mendownload image atau ISO File nya.

[https://www.proxmox.com/en/downloads/category/iso-images-pve](https://www.proxmox.com/en/downloads/category/iso-images-pve)
![image](https://i.ibb.co/KbqbkkK/image.png)

Setelah ISO File terdownload, selanjutnya burn ISO File tersebut kedalam flashdisk atau penyimpanan lainnya. Untuk melakukan burning tersebut anda bisa menggunakan [ventoy](https://www.ventoy.net/en/index.html), [balenaetcher](https://etcher.balena.io/), [rufus](https://rufus.ie/en/), dsb.

## Booting kedalam Proxmox VE

Setelah mempersiapkan bahan - bahan untuk instalasi nya, selanjutnya adalah melakukan booting kedalam proxmox nya. Untuk melakukannya anda cukup restart atau nyalakan komputer anda kemudian masuk ke dalam `Boot Menu` dengan menekan `key` ketika proses booting (`key` disini tergantung dengan komputer yang anda gunakan).

Setelah masuk kedalam `Boot Menu` langkah selanjutnya adalah memilih boot nya, disini pilih boot berdasarkan Flashdisk atau penyimpanan yang sudah kita burn dengan ISO File Proxmox VE nya

![image](https://i.ibb.co/W54WvB1/image.png)

Setelah memilih boot berdasarkan Flashdisk atau penyimpanan yang terdapat Proxmox VE nya, maka tampilan selanjutnya adalah seperti gambar dibawah ini

![image](https://i.ibb.co/NpzWp2W/image.png)

Selanjutnya untuk melakukan instalasi proxmox nya, disini pilih menu `Install Proxmox VE`

## Instalasi Proxmox VE

Setelah kita mempersiapkan bahan - bahan dan booting kedalam Proxmox VE langkah selanjutnya adalah melakukan instalasi proxmox nya.

### End User License Agreement

Pada halaman pertama ketika instalasi proxmox, maka akan muncul sebuah `End User License Agreement (EULA)`

![image](https://i.ibb.co/5ccD6fN/image.png)

### Memilih Penyimpanan untuk Instalasi Proxmox VE

Pada menu kali ini, disini kita perlu memilih target penyimpanan untuk sistem operasi Proxmox VE nya. Sesuaikan dengan yang kalian inginkan, disini kita bebas ingin menginstall di SSD atau HDD (jika SSD lebih baik karena lebih cepat).

![image](https://i.ibb.co/719K9DM/image.png)

Namun, sebelum masuk ke langkah selanjutnya. Disini kita dapat melakukan konfigurasi pada `Filesystem` yang akan digunakan sistem operasi Proxmox VE nya.

Untuk melakukan konfigurasi tersebut, kalian cukup klik pada tulisan `Options`. Maka akan muncul sebuah pop up `Harddisk options`

![image](https://i.ibb.co/9Zhj1wg/image.png)

Default atau bawaan `Filesystem` yang digunakan adalah `ext4`. Namun kalian bisa mengganti nya dengan selera yang kalian inginkan, berikut adalah penjelasan mengenai masing - masing filesystem yang tersedia pada Proxmox VE.

![image](https://i.ibb.co/jZ3zVYt/image.png)

#### Filesystem

- ZFS

ZFS adalah pilihan yang baik, jika kalian mempunyai spesifikasi hardware yang tinggi atau mempunyai banyak memori. Secara umum anda mungkin tidak ingin mengaktifkan ZFS jika anda memiliki sedikit memori, namun jika anda mempunyai hardware yang cukup bagus, itu sebenarnya sesuatu yang patut dipertimbangkan.

Pada filesystem ZFS disini, memiliki fitur yang menjadi nilai tambah yang bagus seperti:

    - Peningkatan keandalan
    - Integritas sistem file yang lebih baik
    - Lebih banyak fitur snapshot
    - dan seterusnya

Sebagian besar 50% dari RAM anda akan disisihkan untuk arc dan anda dapat menggangap arc tersebut sebagai cache, yang pasti akan membantu kinerja anda tetapi dengan mengorbankan penggunaan lebih banyak memori untuk sebagian besar anda.

Saya mungkin menginginkan sekitar 1GB memori untuk ZFS untuk setiap 1TB penyimpanan, tetapi sejujurnya saya rasa tidak dapat merekomendasikan ZFS untuk siapa pun yang memiliki RAM kurang dari 32GB.

Itu hanya rekomendasi pribadi bukan sesuatu yang akan anda temukan di dokumentasi proxmox

- BTRFS

Pada filesystem, terdapat pilihan atau opsi BTRFS. Namun pada tutorial kali ini tidak akan membahas opsi tersebut

### Lokasi dan Zona Waktu

![image](https://i.ibb.co/pLrQt0Q/image.png)

Setelah melakukan konfigurasi penyimpanan, selanjutnya adalah melakukan konfigurasi `Lokasi dan Zona Waktu` yang akan digunakan. Sangat penting bagi anda untuk mengatur ini dengan benar, proxmox sangat bergantung pada waktu untuk menyinkronkan semuanya.

Jadi anda perlu memastikan bahwa pemilihan zona waktu yang tepat disini.

Anda dapat memilih `Lokasi dan Zona Waktu` dengan konfigurasi sebagai berikut

- Country: `Indonesia`
- Time Zone: `Asia/Jakarta`
- Keyboard Layout: `U.S. English`

### Administration Password dan Alamat Email

![image](https://i.ibb.co/5BPYcQ1/image.png)

#### Password

Pada konfigurasi ini, kita perlu mengisikan dan mengingat password untuk login kedalam Proxmox.

#### Email

Disini saya merekomendasikan untuk mengisikan dengan email yang valid apabila anda mempertimbangkan untuk mensupport pengembangan proxmox nantinya

### Konfigurasi Jaringan

![image](https://i.ibb.co/Wth0Nqj/image.png)

Pada konfigurasi ini, anda akan melakukan konfigurasi default jaringan yang anda gunakan untuk proxmox.

#### Management Interface

Pada bagian `Management Interface` terdapat list atau daftar Network Card yang digunakan. Pilih dengan konfigurasi yang ingin anda gunakan

![image](https://i.ibb.co/g3cRZRM/image.png)

#### Hostname

![image](https://i.ibb.co/dfJTnsX/image.png)

Pada konfigurasi ini, anda perlu mengisikan dengan hostname proxmox yang ingin digunakan. Disini saya mengisikan dengan `pve1`.

Perlu di ingat bahwa pemilihan nama hostname disini sangat penting apabila nantinya kita akan melakukan konfigurasi `clustering` pada proxmox kita. Nama hostname disini berfungsi untuk memastikan dan membedakan host dari yang lain ketika melakukan konfigurasi `clustering`.

#### IP Address, Gateway, DNS Server

![image](https://i.ibb.co/my4SNHq/image.png)

Di konfigurasi ini kita perlu mengisikan IP Address, Default Gateway dan DNS Server untuk management interface nya. Sesuaikan dengan konfigurasi jaringan yang anda gunakan

> **Catatan**: Untuk melihat ip address yang kosong, anda dapat melihat konfigurasi pada router atau perangkat yang memberi ip address. Kemudian lihat pada dhcp-pool, anda dapat memilih ip address yang kosong yang tidak masuk ke dalam pool atau range dhcp nya
> atau anda juga dapat menggunakan tool seperti nmap untuk melihat ip address yang kosong dengan perintah
>
> ```
> nmap -sP -PR <segment_ip.*>
> ```
>
> ![image](https://i.ibb.co/W6XbSfF/image.png)
>
> ![image](https://i.ibb.co/j4n15nm/image.png)
> Pada gambar diatas, dapat kita lihat bahwa ip network nya menggunakan /24 yang dimana dapat menampung 254 host, anda cukup memilih ip address yang kosong pada network /24 nya.
>
> ![image](https://i.ibb.co/NFssTny/image.png)
> Misalkan disini terdapat ip address `.184` dan `.186` maka anda dapat menggunakan `.185`

### Summary atau Ringkasan

![image](https://i.ibb.co/dPTnwZY/image.png)

Setelah semua konfigurasi dilakukan, langkah terakhir adalah melihat summary atau ringkasan dari semua konfigurasi yang kita lakukan untuk memastikan bahwa semua konfigurasi yang dilakukan benar.

Setelah anda memastikan bahwa semua konfigurasi yang dilakukan benar, klik `Install`, maka proses instalasi akan berjalan.

![image](https://i.ibb.co/hMBCkhb/image.png)

### Selesai

Apabila instalasi proxmox selesai, maka akan muncul seperti gambar dibawah ini.

![image](https://i.ibb.co/c8bzJxg/image.png)
![image](https://i.ibb.co/yd8MtCC/image.png)

### Membuka Web User Interface Proxmox

Untuk membuka `Web UI (User Interface) Proxmox` anda dapat menggunakan browser kemudian ketikan pada alamat url nya dengan format

```
https://<ip_address_proxmox>:8006
```

![image](https://i.ibb.co/FD8KChS/image.png)

Pada form input login, anda dapat mengisikan dengan username dan password yang sama pada server proxmox nya.

> **Catatan**: Apabila muncul sebuah alert atau peringatan bahwa `No valid subscription` itu normal,
> karena proxmox adalah open source. Tapi anda juga dapat melakukan pembayaran untuk subscription,
> yang dimana memiliki sejumlah service untuk enterprise repository untuk memberikan package khusus
> untuk enterprise deployment.
>
> Namun jika anda tidak menginginkan subscription nya, anda dapat menghiraukan peringatan tersebut dengan cara
> menekan tombol oke atau close.
> ![image](https://i.ibb.co/KbXC7GW/image.png)

![image](https://i.ibb.co/YpP4xCm/image.png)
