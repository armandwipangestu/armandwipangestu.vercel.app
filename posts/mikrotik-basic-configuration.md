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

![Router Identity](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/router_identity.png)

Disini saya akan mengganti identity nya menjadi

```
RO-DEFAULT-CONFIG
```

![Router Identity 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/router_identity2.png)

Untuk melihat apakah identity berhasil berubah, kita bisa melihat dibagian

- title bar

![Router Identity Title Bar](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/router_identity_title_bar.png)

- login winbox

![Login WinBox](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/login_winbox.png)

## Clock

Clock merupakan jam atau waktu saat ini pada Router, untuk mengubah nya kita cukup pergi
ke menu `/System/Clock`

![Clock](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/clock.png)

Disini saya akan mengganti `Time Zone` nya menjadi

```
Asia/Jakarta
```

![Timezone](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/timezone.png)

Untuk melihat apakah clock atau jam berhasil berubah kita bisa menyamakan dengan jam laptop kita

![Clock Time](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/clock_time.png)

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

![Users](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/users.png)

Untuk membuat user baru kita click di tanda `+` lalu isikan dengan format sebagai berikut:

```
Name: nama_kamu
Group: Full
Password: *****
Confirm Password: *****
```

![New User](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/new_user.png)

> **Penjelasan Singkat**:
>
> - `Name`: Digunakan untuk username login ke mikrotik baik menggunakan service winbox, http, ssh dll
> - `Group`: Digunakan untuk membuat user permission, untuk informasi lebih lanjut mengenai group bisa baca [disini](https://help.mikrotik.com/docs/display/ROS/User)
> - `Password`: Digunakan untuk password login

Jika user berhasil dibuat maka akan muncul di tabel `User List`

![User List](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/user_list.png)

Setelah User baru berhasil dibuat selanjutnya kita akan menonaktifkan atau disable default user `admin`, untuk disable default user
kita cukup click di bagian admin lalu click tanda `x`

![User List Disable](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/user_list_disable.png)

Selanjutnya kita akan mencoba login ke dalam router menggunakan user baru, click menu `New Winbox` lalu `Exit`

![New Session](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/new_session.png)

Sekarang pada bagian form login, masukan user baru yang sudah dibuat sebelumnya

![Login With New User](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/login_with_new_user.png)

Untuk melihat apakah kita login menggunakan user mana, kita bisa melihat nya pada bagian titlebar

![Login With New User 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/login_with_new_user2.png)

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

![Service List](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/service_list.png)

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

![DHCP Client](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/dhcp_client.png)

Pada menu `DHCP Client` kita cukup menambahkan DHCP Client baru dengan menekan tanda `+` dan pada bagian `interface`
sesuaikan dengan port yang anda gunakan untuk terhubung ke ISP (biasanya atau default nya adalah `ether1` untuk ke internet)

![DHCP Client Detail](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/dhcp_client_detail.png)

Jika `DHCP Client` berhasil maka akan muncul informasi sebagai berikut:

| Interface | Use Peer DNS | Use Default Route | IP Address                                  | Expires After                      | Status |
| --------- | ------------ | ----------------- | ------------------------------------------- | ---------------------------------- | ------ |
| ether1    | yes          | yes               | 192.168.20.254/24 (Tergantung dari ISP nya) | 00:10:00 (Tergantung dari ISP nya) | bound  |

![Ping Google](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/ping_google.png)

Untuk mengecek apakah sudah terhubung ke internet atau belum kita bisa melakukan ping ke dns public google melalui terminal, dengan cara
click menu `New Terminal` lalu ketikan di dalamnya

```sh
ping 8.8.8.8
```

apabila respon atau output nya reply maka router kita sudah terhubung ke internet

![Ping Domain Google](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/ping_domain_google.png)

atau ping ke domain google

```bash
ping google.com
```

![Ping Domain Google 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/ping_domain_google2.png)

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

![Static Address](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/static_address.png)

Pada menu `Address List` kita akan menambahkan IP Address secara manual mulai dari alamat ip nya dan subnet mask nya,
click icon `+` lalu isikan dengan format sebagai berikut:

```
Address: ip_address_kamu/subnet_mask
Network:
Interface: etherX
```

![New Address](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/new_address.png)

Setelah Address baru ditambahkan maka akan muncul di tabel `Address List`

![Address List](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/address_list.png)

#### Static Route

Selanjutnya kita akan menambahkan route atau ip gateway dengan cara pergi ke menu `/IP/Routes`

![Statuc Route](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/static_route.png)

Pada Menu `Route List` kita akan menambahkan IP Gateway secara manual mulai dari dst address nya dan gateway nya, click icon
`+` lalu isikan dengan format sebagai berikut:

```
Dst. Address: 0.0.0.0/0
Gateway: ip_gateway_kamu
```

![New Route](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/new_route.png)

Apabila status dari gateway nya adalah `reachable` maka gateway berhasil ditambahkan

![Route List](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/route_list.png)

Untuk mengecek nya kamu bisa melakukan ping ke gateway dengan terminal (apabila statusnya reply maka berhasil)

```bash
ping ip_gateway_kamu
```

![Route List With Ping](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/route_list_with_ping.png)

#### Static DNS

Setelah menambahkan IP Gateway, langkah selanjutnya adalah menambahkan IP DNS dengan cara pergi ke menu `/IP/DNS`

![Static DNS](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/static_dns.png)

Pada Menu `DNS Settings` kita akan menambahkan IP DNS secara manual, kita bisa menggunakan IP DNS Public dari google
ataupun dari ISP nya, click icon `+` lalu isikan dengan format sebagai berikut:

```
Servers: ip_dns_kamu
         8.8.8.8
         8.8.4.4
```

![DNS Setting](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/dns_setting.png)

Seharusnya sekarang router sudah terhubung ke internet, untuk mengecek nya kalian bisa ping ke domain google menggunakan
terminal

```bash
ping google.com
```

![Ping With DNS](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/ping_with_dns.png)

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

![PPP](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/ppp.png)

Pada menu `PPP` kita cukup menambahkan `Interface` baru yaitu `PPPoE Client` dengan cara menekan tanda `+`

![PPPoE Client](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/pppoe_client.png)

Pada menu `New Interface/General` masukan dengan format sebagai berikut:

```
Name: nama_interface_pppoe_anda
Interface: etherX (yang mengarah ke ISP)
```

![New Interface](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/new_interface.png)

Pada menu `New Interface/Dial Out` kita akan menambahkan user PPPoE nya dengan format sebagai berikut

```
User: username_pppoe
Password: password_pppoe
Profile: profile_pppoe
Use Peer DNS: yes
```

![New Interface 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/new_interface2.png)

Apabila username dan password benar maka seharusnya sekarang sudah terhubung, untuk mengeceknya kalian bisa melalui status
ataupun traffic nya

![Interface PPPoE](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/interface_pppoe.png)

Setelah PPPoE terhubung maka akan muncul dynamic ip, route, dan dns

![PPPoE Detail](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/pppoe_detail.png)

Seharusnya sekarang sudah dapat terhubung ke internet, untuk mengecek nya kalian bisa
ping ke domain google melalui terminal

```bash
ping google.com
```

![PPPoE Test Ping](${NEXT_PUBLIC_PUBLIC_ASSETS}/mikrotik_basic_configuration/pppoe_test_ping.png)
