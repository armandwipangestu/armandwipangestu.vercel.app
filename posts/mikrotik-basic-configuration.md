---
published: true
title: "Mikrotik - Basic Configuration"
tag: "Networking"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan mencoba basic configuration pada Router Mikrotik"
cover_image: "/images/posts/Mikrotik - Basic Configuration.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Router Identity

Router Identity merupakan nama identitas dari Router atau bisa disebut juga sebagai `Router Alias`
pada bagian ini kita akan mengubah value dari Router Identity nya yang dimana berfungsi sebagai berikut:

- Untuk menandai bahwa Router ini milik kita
- Meminimalisir salah konfigurasi (karena mungkin saja jika `Router Identity` tidak dirubah kita salah login kedalam router)

Untuk mengubah nya kita cukup pergi ke menu `/System/Identity`

<a href="https://user-images.githubusercontent.com/64394320/166403747-ac2c3936-f476-4938-8ba8-8d09fd6e4d10.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166403747-ac2c3936-f476-4938-8ba8-8d09fd6e4d10.png" alt="System/Identity" class="img-fluid rounded mx-auto d-block" />
</a>

Disini saya akan mengganti identity nya menjadi

```
RO-DEFAULT-CONFIG
```

<a href="https://user-images.githubusercontent.com/64394320/166404851-98a5c905-d16e-4e70-bd00-deb7d493b76d.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166404851-98a5c905-d16e-4e70-bd00-deb7d493b76d.png" alt="Identity Name" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk melihat apakah identity berhasil berubah, kita bisa melihat dibagian

- title bar

<a href="https://user-images.githubusercontent.com/64394320/166405248-c020d807-03ac-4e28-a84d-5f63835899a8.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166405248-c020d807-03ac-4e28-a84d-5f63835899a8.png" alt="Title Bar" class="img-fluid rounded mx-auto d-block" />
</a>

- login winbox

<a href="https://user-images.githubusercontent.com/64394320/166405384-cef1ea35-b5d6-4bc7-bdc9-ed20c9fb950d.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166405384-cef1ea35-b5d6-4bc7-bdc9-ed20c9fb950d.png" alt="Login WinBox" class="img-fluid rounded mx-auto d-block" />
</a>

## Clock

Clock merupakan jam atau waktu saat ini pada Router, untuk mengubah nya kita cukup pergi
ke menu `/System/Clock`

<a href="https://user-images.githubusercontent.com/64394320/166405853-b730d2aa-1a03-4ebd-b65a-71c3001a48e5.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166405853-b730d2aa-1a03-4ebd-b65a-71c3001a48e5.png" alt="System/Clock" class="img-fluid rounded mx-auto d-block" />
</a>

Disini saya akan mengganti `Time Zone` nya menjadi

```
Asia/Jakarta
```

<a href="https://user-images.githubusercontent.com/64394320/166406068-c00d3d15-2d89-45c9-999d-9aa9222cd3fd.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166406068-c00d3d15-2d89-45c9-999d-9aa9222cd3fd.png" alt="Time Zone" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk melihat apakah clock atau jam berhasil berubah kita bisa menyamakan dengan jam laptop kita

<a href="https://user-images.githubusercontent.com/64394320/166406227-243e1849-255b-403a-877e-23cef1d19599.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166406227-243e1849-255b-403a-877e-23cef1d19599.png" alt="Clock" class="img-fluid rounded mx-auto d-block" />
</a>

## Security

Disini kita akan mem-proteksi router dari sisi keamanan (walaupun ini hanya dasar nya saja)

### User Authentication

Kenapa kita perlu mengubah `User Authentication` mikrotik? karena default login user mikortik adalah:

> **NOTE**: _Password blank atau kosong_
>
> ```
> Username: admin
> ```
>
> ```
> Password:
> ```

User login tersebut adalah default yang dimana siapa pun dapat mengetahui nya baik yang mempunyai perangkat mikrotik,
orang yang membaca dokumentasi mikrotik dll. Oleh karena itu kita perlu mengubah nya agar meminimalisir orang yang tidak berkepentingan dapat
masuk ke router kita

> **Tambahan**: Biasanya jika router kita sudah terhubung ke internet dan menggunakan IP Public dari ISP, router kita dapat
> langsung diserang menggunakan metode bruteforce baik di service winbox, http, ataupun ssh. Apabila kita tidak mengubah default user nya
> maka akan mudah sekali hacker atau orang yang tidak berkepentingan masuk ke router kita menggunakan metode bruteforce

Untuk mengubah default login user mikrotik kita cukup pergi ke bagian menu `/System/Users`

<a href="https://user-images.githubusercontent.com/64394320/166408181-c712b188-9efe-4d48-930f-ae0938be4fa2.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166408181-c712b188-9efe-4d48-930f-ae0938be4fa2.png" alt="System/Users" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk membuat user baru kita click di tanda `+` lalu isikan dengan format sebagai berikut:

```
Name: nama_kamu
Group: Full
Password: *****
Confirm Password: *****
```

<a href="https://user-images.githubusercontent.com/64394320/166408550-c029aebb-92ea-4fb3-a029-70febb3d9250.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166408550-c029aebb-92ea-4fb3-a029-70febb3d9250.png" alt="New User" class="img-fluid rounded mx-auto d-block" />
</a>

> **Penjelasan Singkat**:
>
> - `Name`: Digunakan untuk username login ke mikrotik baik menggunakan service winbox, http, ssh dll
> - `Group`: Digunakan untuk membuat user permission, untuk informasi lebih lanjut mengenai group bisa baca [disini](https://help.mikrotik.com/docs/display/ROS/User)
> - `Password`: Digunakan untuk password login

Jika user berhasil dibuat maka akan muncul di tabel `User List`

<a href="https://user-images.githubusercontent.com/64394320/166409126-078de5b5-b06a-4bf0-b3d2-1853f8e9070e.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166409126-078de5b5-b06a-4bf0-b3d2-1853f8e9070e.png" alt="User List" class="img-fluid rounded mx-auto d-block" />
</a>

Setelah User baru berhasil dibuat selanjutnya kita akan menonaktifkan atau disable default user `admin`, untuk disable default user
kita cukup click di bagian admin lalu click tanda `x`

<a href="https://user-images.githubusercontent.com/64394320/166409305-c55be8ad-37b2-43ef-87dc-c99930efedba.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166409305-c55be8ad-37b2-43ef-87dc-c99930efedba.png" alt="Disable User" class="img-fluid rounded mx-auto d-block" />
</a>

Selanjutnya kita akan mencoba login ke dalam router menggunakan user baru, click menu `New Winbox` lalu `Exit`

<a href="https://user-images.githubusercontent.com/64394320/166409496-30858412-d835-4a2d-b1c7-0b07211be6d7.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166409496-30858412-d835-4a2d-b1c7-0b07211be6d7.png" alt="New WinBox" class="img-fluid rounded mx-auto d-block" />
</a>

Sekarang pada bagian form login, masukan user baru yang sudah dibuat sebelumnya

<a href="https://user-images.githubusercontent.com/64394320/166409648-a2dd20a4-14a0-4885-a5c7-d16e46454010.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166409648-a2dd20a4-14a0-4885-a5c7-d16e46454010.png" alt="Form Login" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk melihat apakah kita login menggunakan user mana, kita bisa melihat nya pada bagian titlebar

<a href="https://user-images.githubusercontent.com/64394320/166409738-37ae88f8-09ab-4288-a856-c6ff45c2feca.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166409738-37ae88f8-09ab-4288-a856-c6ff45c2feca.png" alt="User Login" class="img-fluid rounded mx-auto d-block" />
</a>

### IP Services

IP Service disini berfungsi untuk mengatur `port - port` yang aktif pada perangkat router, alangkah lebih baiknya kita menonaktifkan
service port yang tidak diperlukan dan mengganti default port agar meminimalisir orang yang tidak berkepentingan masuk kedalam router kita.
Karena untuk masuk atau me-remote router mikrotik tidak hanya melalu winbox, oleh karena itu pentingnya kita melihat celah keamanan lain.

Disini saya akan menonaktifkan service port yang tidak diperlukan dan mengganti default service port yang akan digunakan:

| Name    | Port | Status  | Keterangan                                                               |
| ------- | ---- | ------- | ------------------------------------------------------------------------ |
| api     | 8728 | Disable | Tidak akan digunakan                                                     |
| api-ssl | 8729 | Disable | Tidak akan digunakan                                                     |
| ftp     | 21   | Disable | Tidak akan digunakan                                                     |
| ssh     | 8022 | Enable  | Default Port: 22 (Enable karena digunakan untuk remote melalui SSH)      |
| telnet  | 23   | Disable | Tidak akan digunakan                                                     |
| winbox  | 9292 | Enable  | Default Port: 8292 (Enable karena digunakan untuk remote melalui WinBox) |
| www     | 8000 | Enable  | Default Port: 80 (Enable karena digunakan untuk remote melalui WebFig)   |
| www-ssl | 443  | Disable | Tidak akan digunakan                                                     |

<a href="https://user-images.githubusercontent.com/64394320/166418704-424efdef-3302-4d7a-a295-1eb61e4e84b0.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166418704-424efdef-3302-4d7a-a295-1eb61e4e84b0.png" alt="IP Services" class="img-fluid rounded mx-auto d-block" />
</a>

## Membuat Jaringan WAN

Pada tahap ini kita akan membuat router dapat terhubung ke internet, untuk router dapat terhubung ke internet kita membutuhkan yang namanya ISP
(Internet Service Provider). Setelah kamu berlangganan ke salah satu ISP biasanya kamu akan diberikan layanan internet yang media nya bermacam-macam,
seperti:

- LAN / Ethernet
- FTTH (Fiber To The Home)
- Wireless
- Dll

Pada salah satu media yang diberikan kamu akan diberikan informasi berupa:

- IP Address (Public / Private)
- IP Gateway
- IP DNS
- Dll

atau

> Jika menggunakan PPPoE layanan nya

- Username PPPoE
- Password PPPoE

Setelah kamu mengetahui informasi diatas, kita bisa menerapkan atau meng-aplikasikan ke perangkat router kita.

### DHCP Client

DHCP Client merupakan sebuah fitur untuk menerima informasi IP Address, IP Gateway, IP DNS, dll secara otomatis. Apabila
anda berlangganan pada suatu ISP dan ISP tersebut memberikan layanan nya melalui DHCP Server, maka akan sangat cocok untuk menggunakan
fitur ini.

Untuk membuat DHCP Client nya kita cukup pergi ke menu `/IP/DHCP Client`

<a href="https://user-images.githubusercontent.com/64394320/166421182-ab46d6ce-8df8-443e-ba01-304af06ccbc9.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166421182-ab46d6ce-8df8-443e-ba01-304af06ccbc9.png" alt="IP/DHCP Client" class="img-fluid rounded mx-auto d-block" />
</a>

Pada menu `DHCP Client` kita cukup menambahkan DHCP Client baru dengan menekan tanda `+` dan pada bagian `interface`
sesuaikan dengan port yang anda gunakan untuk terhubung ke ISP (biasanya atau default nya adalah `ether1` untuk ke internet)

<a href="https://user-images.githubusercontent.com/64394320/166421481-ef85b5cd-305c-4003-a277-d21bb145081d.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166421481-ef85b5cd-305c-4003-a277-d21bb145081d.png" alt="DHCP Client" class="img-fluid rounded mx-auto d-block" />
</a>

Jika `DHCP Client` berhasil maka akan muncul informasi sebagai berikut:

| Interface | Use Peer DNS | Use Default Route | IP Address                                  | Expires After                      | Status |
| --------- | ------------ | ----------------- | ------------------------------------------- | ---------------------------------- | ------ |
| ether1    | yes          | yes               | 192.168.20.254/24 (Tergantung dari ISP nya) | 00:10:00 (Tergantung dari ISP nya) | bound  |

<a href="https://user-images.githubusercontent.com/64394320/166424236-60b45e63-7b00-4188-b01d-08edb7ff1684.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166424236-60b45e63-7b00-4188-b01d-08edb7ff1684.png" alt="DHCP Information" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk mengecek apakah sudah terhubung ke internet atau belum kita bisa melakukan ping ke dns public google melalui terminal, dengan cara
click menu `New Terminal` lalu ketikan di dalamnya

```sh
ping 8.8.8.8
```

apabila respon atau output nya reply maka router kita sudah terhubung ke internet

<a href="https://user-images.githubusercontent.com/64394320/166426375-7780527f-5b77-4932-96e4-a2309a6d084f.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166426375-7780527f-5b77-4932-96e4-a2309a6d084f.png" alt="ping dns google" class="img-fluid rounded mx-auto d-block" />
</a>

atau ping ke domain google

```bash
ping google.com
```

<a href="https://user-images.githubusercontent.com/64394320/166427017-6fbcf08a-60a1-4b5e-aba0-0fd23fcac7b5.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166427017-6fbcf08a-60a1-4b5e-aba0-0fd23fcac7b5.png" alt="Ping google.com" class="img-fluid rounded mx-auto d-block" />
</a>

### Static IP

Bertolak belakang dengan DHCP Client yang serba otomatis, Static IP adalah IP yang kita masukan secara manual
baik itu dari IP Address, IP Gateway, IP Route, Dll. Apabila anda berlangganan ke suatu ISP dan layanan tersebut
diberikan melalui static ip maka anda harus memasukkannya secara manual pada perangkat yang akan anda gunakan.

Untuk menggunakan Static IP kita harus mengetahui beberapa hal, antara lain:

- IP Address
- IP Gateway
- IP DNS

#### Static Address

Apabila kalian sudah mengetahui ke 3 tersebut, langkah pertama kita akan menambahkan IP Address nya dengan
cara pergi ke menu `/IP/Address/`

<a href="https://user-images.githubusercontent.com/64394320/166430697-bcdf99a0-edcb-47dd-800d-0eea051cb26b.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166430697-bcdf99a0-edcb-47dd-800d-0eea051cb26b.png" alt="IP/Address" class="img-fluid rounded mx-auto d-block" />
</a>

Pada menu `Address List` kita akan menambahkan IP Address secara manual mulai dari alamat ip nya dan subnet mask nya,
click icon `+` lalu isikan dengan format sebagai berikut:

```
Address: ip_address_kamu/subnet_mask
Network:
Interface: etherX
```

<a href="https://user-images.githubusercontent.com/64394320/166431407-d81d2f56-388b-424f-b9c9-9ae7313e933b.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166431407-d81d2f56-388b-424f-b9c9-9ae7313e933b.png" alt="New Address" class="img-fluid rounded mx-auto d-block" />
</a>

Setelah Address baru ditambahkan maka akan muncul di tabel `Address List`

<a href="https://user-images.githubusercontent.com/64394320/166431479-35436686-b473-4df5-9a20-8423fce8a21f.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166431479-35436686-b473-4df5-9a20-8423fce8a21f.png" alt="Address List" class="img-fluid rounded mx-auto d-block" />
</a>

#### Static Route

Selanjutnya kita akan menambahkan route atau ip gateway dengan cara pergi ke menu `/IP/Routes`

<a href="https://user-images.githubusercontent.com/64394320/166431957-b6a2aaa9-085d-441c-9568-3232776fe1f6.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166431957-b6a2aaa9-085d-441c-9568-3232776fe1f6.png" alt="IP/Routes" class="img-fluid rounded mx-auto d-block" />
</a>

Pada Menu `Route List` kita akan menambahkan IP Gateway secara manual mulai dari dst address nya dan gateway nya, click icon
`+` lalu isikan dengan format sebagai berikut:

```
Dst. Address: 0.0.0.0/0
Gateway: ip_gateway_kamu
```

<a href="https://user-images.githubusercontent.com/64394320/166432200-26bb23e4-76bd-43e5-8336-2c31c76c252c.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166432200-26bb23e4-76bd-43e5-8336-2c31c76c252c.png" alt="New Route" class="img-fluid rounded mx-auto d-block" />
</a>

Apabila status dari gateway nya adalah `reachable` maka gateway berhasil ditambahkan

<a href="https://user-images.githubusercontent.com/64394320/166432803-7a53cc25-f8cc-429b-a1a2-7b01745ef0ba.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166432803-7a53cc25-f8cc-429b-a1a2-7b01745ef0ba.png" alt="Route List" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk mengecek nya kamu bisa melakukan ping ke gateway dengan terminal (apabila statusnya reply maka berhasil)

```bash
ping ip_gateway_kamu
```

<a href="https://user-images.githubusercontent.com/64394320/166433106-7d1207c7-3df4-46f7-89a9-594a97802eec.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166433106-7d1207c7-3df4-46f7-89a9-594a97802eec.png" alt="ping gateway" class="img-fluid rounded mx-auto d-block" />
</a>

#### Static DNS

Setelah menambahkan IP Gateway, langkah selanjutnya adalah menambahkan IP DNS dengan cara pergi ke menu `/IP/DNS`

<a href="https://user-images.githubusercontent.com/64394320/166433453-c47480d3-a51e-409d-8235-a3e7e0d63a2d.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166433453-c47480d3-a51e-409d-8235-a3e7e0d63a2d.png" alt="IP/DNS" class="img-fluid rounded mx-auto d-block" />
</a>

Pada Menu `DNS Settings` kita akan menambahkan IP DNS secara manual, kita bisa menggunakan IP DNS Public dari google
ataupun dari ISP nya, click icon `+` lalu isikan dengan format sebagai berikut:

```
Servers: ip_dns_kamu
         8.8.8.8
         8.8.4.4
```

<a href="https://user-images.githubusercontent.com/64394320/166433824-6376e940-0ad9-44cd-86bd-d05c435113e3.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166433824-6376e940-0ad9-44cd-86bd-d05c435113e3.png" alt="DNS Settings" class="img-fluid rounded mx-auto d-block" />
</a>

Seharusnya sekarang router sudah terhubung ke internet, untuk mengecek nya kalian bisa ping ke domain google menggunakan
terminal

```bash
ping google.com
```

<a href="https://user-images.githubusercontent.com/64394320/166434133-e3364ec4-132b-493e-b48c-95a53069ded6.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166434133-e3364ec4-132b-493e-b48c-95a53069ded6.png" alt="ping google.com" class="img-fluid rounded mx-auto d-block" />
</a>

### PPPoE Client

Point-to-Point Protocol over Ethernet (PPPoE) merupakan protokol jaringan yang memfasilitasi
komunikasi antara jaringan akhir (network endpoints). Apabila anda berlangganan ke suatu ISP dan layanan
tersebut menggunakan PPPoE maka anda harus menambahkan PPPoE account pada perangkat anda

> **NOTE**: Biasanya PPPoE ini disimpan atau digunakan pada modem seperti GPON ONT atau ONU, namun pada mikrotik
> juga kita bisa menggunakannya

Untuk menambahkan akun PPPoE Client kita harus mengetahui beberapa hal, antara lain:

- Username PPPoE
- Password PPPoE

Apabila kalian sudah mengetahui kedua hal tersebut, langkah pertama kita akan langsung menambahkan
PPPoE Client pada router kita dengan cara pergi ke menu `/PPP/`

<a href="https://user-images.githubusercontent.com/64394320/166439273-9bf81132-0142-4da4-8443-ff22288d4781.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166439273-9bf81132-0142-4da4-8443-ff22288d4781.png" alt="PPP" class="img-fluid rounded mx-auto d-block" />
</a>

Pada menu `PPP` kita cukup menambahkan `Interface` baru yaitu `PPPoE Client` dengan cara menekan tanda `+`

<a href="https://user-images.githubusercontent.com/64394320/166439664-7ed7d649-5bd8-4db4-b07a-bee2104744dc.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166439664-7ed7d649-5bd8-4db4-b07a-bee2104744dc.png" alt="New Interface/PPPoE Client" class="img-fluid rounded mx-auto d-block" />
</a>

Pada menu `New Interface/General` masukan dengan format sebagai berikut:

```
Name: nama_interface_pppoe_anda
Interface: etherX (yang mengarah ke ISP)
```

<a href="https://user-images.githubusercontent.com/64394320/166440534-f80c5684-5933-46f1-a725-57216c762da9.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166440534-f80c5684-5933-46f1-a725-57216c762da9.png" alt="New Interface/General" class="img-fluid rounded mx-auto d-block" />
</a>

Pada menu `New Interface/Dial Out` kita akan menambahkan user PPPoE nya dengan format sebagai berikut

```
User: username_pppoe
Password: password_pppoe
Profile: profile_pppoe
Use Peer DNS: yes
```

<a href="https://user-images.githubusercontent.com/64394320/166440690-ce255439-b7b3-4945-8888-86be11924d55.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166440690-ce255439-b7b3-4945-8888-86be11924d55.png" alt="New Interface/Dial Out" class="img-fluid rounded mx-auto d-block" />
</a>

Apabila username dan password benar maka seharusnya sekarang sudah terhubung, untuk mengeceknya kalian bisa melalui status
ataupun traffic nya

<a href="https://user-images.githubusercontent.com/64394320/166440890-d86f2212-aa82-4d00-a00f-35ca44351533.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166440890-d86f2212-aa82-4d00-a00f-35ca44351533.png" alt="PPPoE Status" class="img-fluid rounded mx-auto d-block" />
</a>

Setelah PPPoE terhubung maka akan muncul dynamic ip, route, dan dns

<a href="https://user-images.githubusercontent.com/64394320/166443450-c6ed0760-cded-49bb-9e41-e53026039e45.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166443450-c6ed0760-cded-49bb-9e41-e53026039e45.png" alt="PPPoE Dynamic" class="img-fluid rounded mx-auto d-block" />
</a>

Seharusnya sekarang sudah dapat terhubung ke internet, untuk mengecek nya kalian bisa
ping ke domain google melalui terminal

```bash
ping google.com
```

<a href="https://user-images.githubusercontent.com/64394320/166447336-cb2c4495-6e00-42c5-9bb4-1fcce9a4fb9a.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/166447336-cb2c4495-6e00-42c5-9bb4-1fcce9a4fb9a.png" alt="ping google.com" class="img-fluid rounded mx-auto d-block" />
</a>
