---
published: false
title: "Ubiquiti - PowerBeam M5 400 Sebagai Client (Station Mode)"
tag: "Networking"
date: "April 23 2023"
excerpt: "Pada artikel ini kita akan melakukan konfigurasi pada perangkat antena wireless dari merek Ubiquiti yaitu PowerBeam M5 400 dengan mode station"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

[PowerBeam M5 400](https://store.ui.com/collections/operator-airmax-devices/powerbeam) adalah salah satu produk dari perusahaan teknologi Ubiquiti. Sesuai dengan namannya perangkat ini memancarkan dan menerima sinyal di frekuensi `5 GHz`, yang dimulai dari frekuensi `4920` sampai dengan `6100`.

Alat ini biasa digunakan oleh ISP (Internet Service Provider) sebagai pemancar (AP) atau sebagai penerima (Client). Alat ini juga kadang di jadikan sebagai Point to Point antar BTS atau tower untuk menyambungkan data atau internet dari satu titik ke titik lain, selain sebagai alat transmisi data, produk Ubiquiti khususnya PowerBeam M5 4500 memiliki berbagai macam fitur untuk memudahkan administrator jaringan dalam perawatan atau maintenance.

## Konfigurasi Dasar

Untuk konfigurasi dasar, kita harus login terlebih dahulu ke alat PowerBeam M5 400. Caranya cukup mudah yaitu kita harus tahu terlebih dahulu IP Address default dari perangkat PowerBeam M5 400.

> Apabila perangkat nya masih baru (belum pernah di setting) atau bekas di reset maka IP Address default nya adalah `192.168.1.20`

![image](https://user-images.githubusercontent.com/64394320/233798948-90cad210-5d43-481a-8fd5-824ec175da8e.png)

Setelah kita mengetahui IP Address perangkat nya, selanjutnya kita hubungkan kabel LAN dari Laptop atau PC ke PoE pada label atau port `LAN`

> **Catatan**: Pastikan PoE pada label atau port `POE` terhubung ke perangkat PowerBeam M5 400.

![image](https://user-images.githubusercontent.com/64394320/233799095-25203d9b-c6c4-4ab1-bb99-53741f559c5d.png)

Setelah semua nya terhubung, langkah selanjutnya adalah melakukan konfigurasi IP Address pada Laptop atau PC agar satu segment dengan PowerBeam nya.

Dikarenakan IP Address pada perangkat PowerBeam M5 400 adalah IP kelas C dan segment nya adalah 1. Maka pada Laptop atau PC juga kita harus menyamakan agar bisa terhubung

> - IP Address: `192.168.1.xxx`
> - Netmask: `255.255.255.0`

Sebagai contoh disini saya menggunakan IP Address `192.168.1.100`

![image](https://user-images.githubusercontent.com/64394320/233799361-664d6fcf-3fb3-4cfa-b69d-c8172cc6946d.png)

## Membuka Web Konfigurasi PowerBeam

Setelah sebelumnya IP Address Laptop atau PC dengan PowerBeam satu segment, selanjutnya kita lakukan pengecekan apakah IP Address PowerBeam
dapat di PING dari Laptop atau PC. Untuk melakukan nya caranya cukup mudah cukup tekan shortcut `CTRL + R` lalu ketikan `ping 192.168.1.20`

![image](https://user-images.githubusercontent.com/64394320/233799643-51f6b9ea-c05f-4f24-b44d-e08ee2662c8f.png)

Apabila `reply` maka kita cukup menuliskan IP Address `192.168.1.20` pada kolom URL di Web Browser, kemudian tekan Enter. Maka akan muncul tampilan seperti gambar di bawah ini.

![image](https://user-images.githubusercontent.com/64394320/233799758-795ea7ed-5c54-45fd-8aaa-34ea81cb6653.png)

Setelah tampilan login terbuka, silahkan isikan kolom yang ada sebagai berikut:

- Username: `ubnt`
- Password: `ubnt`
- Country: (Sesuaikan dengan pilihan masing - masing)
- Language: `English`

Setelah semua telah di isi, maka tampilan awal akan terlihat kurang lebih seperti gambar dibawah ini

![image](https://user-images.githubusercontent.com/64394320/233799973-d8aeea4b-79c2-4445-b947-f2a1bfa4b468.png)

## Konfigurasi Menu Wireless

Setelah berhasil memnbuka Web Konfigurasi dari PowerBeam, langkah selanjutnya adalah masuk ke menu Wireless

![image](https://user-images.githubusercontent.com/64394320/233800054-5c56e42f-8b01-4b57-a830-1b71dd2f5354.png)

Pada menu wireless ini terdapat beberapa yang harus kita setting, antara lain

- Wireless Mode
- WDS (Transparent Bridge Mode)
- SSID
- Country Code
- Channel Width
- Frequency Scan List, MHz
- Antena
- Output Power
- Data Rate Module
- Max TX Rate, Mbps
- Wireless Security

### Wireless Mode

Dikarenakan kita akan melakukan konfigurasi sebagai `client` maka pada bagian `Wireless Mode` kita gunakan mode `Station`

![image](https://user-images.githubusercontent.com/64394320/233800307-fada1ae4-c3c6-43ab-855a-68982f6fba3b.png)

### WDS (Transparent Bridge Mode)

Konfigurasi WDS (Wireless Distribution System) dalam mode Transparent Bridge pada PowerBeam adalah cara untuk menghubungkan dua atau lebih jaringan nirkabel secara transparan, sehingga tampak seperti satu jaringan yang sama. Dalam mode bridge, PowerBeam dapat menghubungkan jaringan nirkabel dengan jaringan kabel, dan mengaktifkan perangkat untuk beroperasi sebagai jembatan transparan untuk menghubungkan jaringan yang berbeda.

Dalam mode Transparent Bridge, setiap paket data yang diterima oleh perangkat akan diteruskan ke jaringan tujuan tanpa melakukan perubahan atau modifikasi pada paket data itu sendiri. Hal ini berarti bahwa setiap perangkat di jaringan yang terhubung ke PowerBeam dapat berkomunikasi dengan perangkat di jaringan lain secara transparan, tanpa perlu melakukan konfigurasi yang rumit atau menggunakan alamat IP yang berbeda.

Dengan menggunakan mode WDS pada PowerBeam, Anda dapat menghubungkan beberapa jaringan nirkabel tanpa menggunakan kabel fisik, sehingga mengurangi biaya dan kompleksitas infrastruktur. Mode bridge juga memungkinkan Anda untuk memperluas jangkauan jaringan nirkabel tanpa perlu menambahkan titik akses tambahan.

Oleh karena itu kita `Enable` fitur ini

![image](https://user-images.githubusercontent.com/64394320/233800441-1c186ac7-985c-4e09-8562-077cbe3ee59d.png)

### SSID

Pada menu inilah kita akan memilih jaringan nirkabel mana yang ingin dihubungkan ke station kita atau singkat nya kita memilih AP nya.

Apabila kita menekan tombol `Select` maka akan muncul list jaringan nirkabel yang tersedia. Apabila jaringan nirkabel yang ingin kita
hubungkan tidak muncul, maka yang harus dilakukan adalah melakukan pointing agar mengarah satu sama lain pada perangkat Wireless nya baik itu Station maupun AP nya.

![image](https://user-images.githubusercontent.com/64394320/233800730-53d32651-0eae-4001-a03a-08961eee3f70.png)

Apabila list jaringan nirkabel yang kita tuju tersedia, maka kita cuku melakukan klik pada bagian bulat di samping `MAC Address` lalu tekan `Lock to AP` atau `Select`.

### Country Code

Konfigurasi `Country Code` adalah pengaturan untuk menentukan wilayah atau negara di mana perangkat akan digunakan. Setiap negara memiliki aturan dan regulasi yang berbeda terkait penggunaan frekuensi nirkabel dan daya transmiter, dan pengaturan `Country Code` pada perangkat nirkabel seperti PowerBeam M5 400 diperlukan untuk memastikan bahwa perangkat beroperasi sesuai dengan aturan tersebut.

Dalam mode station, PowerBeam M5 400 digunakan untuk menghubungkan perangkat atau jaringan nirkabel ke jaringan nirkabel utama. Pengaturan `Country Code` pada perangkat ini menentukan batasan dan aturan penggunaan frekuensi nirkabel yang dapat digunakan oleh perangkat tersebut di negara atau wilayah tertentu.

Misalnya, negara atau wilayah tertentu mungkin memiliki batasan daya transmiter yang lebih rendah atau frekuensi nirkabel yang tidak tersedia untuk digunakan, sehingga PowerBeam M5 400 harus dikonfigurasi sesuai dengan batasan dan aturan tersebut.

Jika pengguna tidak mengatur `Country Code` yang sesuai, maka PowerBeam M5 400 dapat menyebabkan interferensi dan masalah lain dengan jaringan nirkabel lain di sekitar perangkat, dan pengguna dapat melanggar aturan dan regulasi nirkabel yang berlaku di wilayah atau negara tertentu. Oleh karena itu, penting untuk memastikan bahwa `Country Code` diatur dengan benar pada PowerBeam M5 400 untuk memastikan operasi yang stabil dan legal dari perangkat tersebut.

### Channel Width

### Frequency Scan List, MHz

### Antena

### Output Power

### Data Rate Module

### Max TX Rate, Mbps

### Wireless Security
