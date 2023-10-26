---
published: true
title: "Cisco - Cara Membuat VLAN Pada Interface Router Cisco"
tag: "Networking"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan mencoba membuat VLAN pada interface router cisco"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

- Masuk ke dalam mode `previllage exec`

```shell
Router>enable
```

- Masuk ke dalam mode `global configuration`

```shell
Router#configure terminal
```

- Aktifkan Port Router yang dipakai

```shell
Router(config)#interface gigabitEthernet 0/0/0
Router(config-if)#no shutdown
Router(config-if)#exit
```

- Membuat `sub interface` dari interface utama

> **NOTE**: Untuk membuat `sub interface` ketikan perintah:
>
> ```shell
> Router(config)#interface <interface_utama>.<vlanid>
> ```

Disini saya akan membuat VLAN dengan ID nya adalah `10`

```shell
Router(config)#interface gigabitEthernet 0/0/0.10
```

- Ubah sub interface menjadi mode `trunk`

```shell
Router(config-subif)#encapsulation dot1Q 10
```

- Berikan ip gateway beserta subnet mask nya untuk sub interface

```shell
Router(config-subif)#ip address 192.168.10.1 255.255.255.0
Router(config-subif)#exit
```

- Melihat atau mengecek konfigurasi VLAN pada router cisco

```shell
Router(config)#do show ip interface brief
```

> Hasilnya

| Interface               | IP-Address   | OK? | Method | Status | Protocol |
| ----------------------- | ------------ | --- | ------ | ------ | -------- |
| GigabitEthernet0/0/0    | unassigned   | YES | unset  | up     | up       |
| GigabitEthernet0/0/0.10 | 192.168.10.1 | YES | manual | up     | up       |

> **Tambahan**: Untuk membuat VLAN baru lakukan hal yang sama, disini saya akan menambahkan VLAN baru dengan ID nya adalah `20`

- Membuat `sub interface` dari interface utama

```shell
Router(config)#interface gigabitEthernet 0/0/0.20
```

- Ubah sub interface menjadi mode `trunk`

```shell
Router(config-subif)#encapsulation dot1Q 20
```

- Berikan ip gateway beserta subnet mask nya untuk sub interface

```shell
Router(config-subif)#ip address 192.168.20.1 255.255.255.0
Router(config-subif)#exit
```

- Melihat atau mengecek konfigurasi VLAN pada router cisco

```shell
Router(config)#do show ip interface brief
```

> Hasilnya

| Interface               | IP-Address   | OK? | Method | Status | Protocol |
| ----------------------- | ------------ | --- | ------ | ------ | -------- |
| GigabitEthernet0/0/0    | unassigned   | YES | unset  | up     | up       |
| GigabitEthernet0/0/0.20 | 192.168.20.1 | YES | manual | up     | up       |
