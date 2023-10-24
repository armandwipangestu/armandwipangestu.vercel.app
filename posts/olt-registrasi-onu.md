---
title: "OLT - Registrasi ONU"
tag: "Networking"
date: "January 18 2023"
excerpt: "Pada artikel ini kita akan mencoba melakukan registrasi ONU di OLT"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

> **Catatan**: prompt atau mode atau user exec command
>
> - `host#` = Privileged Exec Command
> - `host(config)#` = Global Configuration Command
> - `host(config-if)#` = Interface Configuration Command
> - `host(gpon-onu-mng)#` = ONU Management Configuration Command

## Masuk Mode Configure Terminal

Langkah pertama untuk melakukan registrasi ONU atau OLT, kita masuk terlebih dahulu kedalam `Global Configuration Mode` dengan cara dibawah ini

> **Catatan**:
>
> Perhatikan tulisan pada prompt OLT nya

```shell
host#conf t
```

### Output

```shell
host(config)#
```

## Melihat List ONU Unconfig

Setelah sebelumnya masuk kedalam mode konfigurasi global, langkah selanjutnya adalah melakukan pengecekan list ONU atau ONT yang belum terdaftar atau belum ter-regist. Untuk mengeceknya gunakan perintah dibawah ini

> **Catatan**:
>
> Perhatikan `OnuIndex` nya berada di `slot number`, `card number`, `pon number` dan `index number` nya berada dimana
>
> ```shell
> gpon-onu_W/X/Y:Z
> ```
>
> - `W` = Mengacu pada nomor slot fisik di OLT
> - `X` = Card number
> - `Y` = Nomor Port atau PON
> - `Z` = Index ONU

```shell
host(config)#show gpon onu uncfg
```

### Output

```shell
OnuIndex                 Sn                  State
---------------------------------------------------------------------
gpon-onu_1/1/1:1         XXXXXXXXXXXX        unknown
gpon-onu_1/1/2:2         XXXXXXXXXXXX        unknown
gpon-onu_1/1/3:3         XXXXXXXXXXXX        unknown
...
```

## Melihat List Index ONU Pada Interface OLT

Setelah kita mengetahui posisi [IndexOnu] nya berada dimana selanjutnya kita perlu mengecek list index onu yang kosong pada interface OLT nya

> **Catatan**:
>
> Sebagai contoh disini saya akan me-regist ONU pada daftar unconfig di posisi `gpon-onu_1/1/1:1`. Maka kita perlu mengecek list index onu pada interface OLT nya di `gpon-olt_1/1/1`
>
> Karena harus sesuai dengan slot number, card number dan pon number nya.

```shell
host(config)#show running-config interface gpon-olt_1/1/1
```

### Output

> **Catatan**:
>
> `N` disini artinya urutan nomer yang sudah terdaftar pada interface OLT. Sebagai contoh nomer 1, 2, 3 sudah terdaftar atau digunakan

```shell
Building configuration...
!
interface gpon-olt_1/1/13
  onu N type F609 sn XXXXXXXXXXXX
  onu N type F609 sn XXXXXXXXXXXX
  onu N type F609 sn XXXXXXXXXXXX
  ...
!
end
```

## Masuk Ke Dalam Interface OLT

Setelah kita melihat urutan index onu pada interface OLT, sekarang kita masuk ke dalam interface nya dengan perintah dibawah ini

```shell
host(config)#interface gpon-olt_1/1/1
```

### Output

```shell
host(config-if)#
```

## Menambahkan Index ONU dan SN ONU Baru

Dikarenakan kita sebelumnya sudah mengetahui urutan index yang sudah terpakai pada perintah [Melihat List Index ONU pada Interface OLT](#melihat-list-index-onu-pada-interface-olt). Maka kita bisa menggunakan format `N+1`.

Sebagai contoh sebelumnya sudah terdaftar urutan `1`, `2`, dan `3` maka kita bisa memasukan urutan onu baru di nomer `4`

> **Catatan**:
>
> untuk `F609` disini merupakan type onu yang digunakan, sesuaikan dengan type onu kalian

```shell
host(config-if)#onu N+1 F609 sn XXXXXXXXXXXX
```

### Output

```shell
.[Successful]
```

## Masuk Ke Dalam Interface ONU

Setelah sebelumnya kita masuk dan mendaftarkan ONU baru di interface OLT, selanjutnya kita lakukan konfigurasi untuk interface arah ONU nya dengan masuk kedalam interface.

```shell
host(config)#interface gpon-onu_1/1/1:N+1
```

### Output

```shell
host(config-if)#
```

## Menambahkan Konfigurasi Ke Dalam Interface ONU

Setelah masuk kedalam interface ONU nya, masukan konfigurasi nya.

> **Catata**:
>
> Sesuaikan dengan konfigurasi yang akan kalian gunakan

```shell
name CLIENT_NAME
tcont 1 profile UP-50M
tcont 2 profile UP-1M
gemport 1 name internet unicast tcont 1 dir both
gemport 1 traffic-limit downstream DOWN-50M
gemport 2 name mgmt unicast tcont 2 dir both
gemport 2 traffic-limit downstream DOWN-1M
switchport mode hybrid vport 1
switchport mode hybrid vport 2
service-port 1 vport 1 user-vlan YYY vlan YYY
service-port 2 vport 2 user-vlan ZZZ vlan ZZZ
pppoe-plus enable vport 2
```

## Masuk Ke Dalam GPON-ONU-MNG ONU

Setelah sebelumnya melakukan konfigurasi arah interface ONU, selanjutnya kita perlu melakukan konfigurasi arah PON ONU Management nya, untuk melakukannya masuk terlebih dahulu kedalam interface nya dengan cara berikut ini.

```shell
host(config)#pon-onu-mng gpon-onu_1/1/1:N+1
```

### Output

```shell
host(gpon-onu-mng)#
```

## Menambahkan Konfigurasi Ke Dalam GPON-ONU-MNG

Setelah masuk kedalam interface PON ONU Management nya, masukan konfigurasi nya.

> **Catata**:
>
> Sesuaikan dengan konfigurasi yang akan kalian gunakan

```shell
service internet gemport 1 vlan YYY
service mgmt gemport 2 vlan ZZZ
wan-ip 1 mode pppoe username XXXXXXXXXXXX password XXXXXXXXXXXX vlan-profile MGMT-ONU host 1
name CLIENT_NAME
vlan port eth_0/1 mode tag vlan YYY
vlan port eth_0/2 mode tag vlan YYY
vlan port eth_0/3 mode tag vlan YYY
vlan port eth_0/4 mode tag vlan YYY
security-mng 211 state enable ingress-type lan protocol web
security-mng 212 state enable mode permit protocol web
```

> **Catatan**: Terakhir jangan lupa membuat PPPoE pada Router Distributor

Apabila PPPoE di Router Distributor sudah ditambahkan dan username password nya sama dengan yang dikonfigurasi di PON ONU Management, maka sekarang ONU berhasil di regist.
