---
published: true
title: "Cisco - Konfigurasi VLAN Access Pada Switch Cisco"
tag: "Networking"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan melakukan konfigurasi VLAN Access pada Switch Cisco"
cover_image: "/images/posts/Cisco - Konfigurasi VLAN Access Pada Switch Cisco.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

### Pendahuluan

`VLAN Access` merupakan konfigurasi VLAN yang terhubung langsung dengan `End Device` (Komputer) sehingga pada `VLAN Access` hanya dapat menampung 1 buah `VLAN ID`.

- Masuk ke mode `previllage exec`

```shell
Switch>enable
```

- Masuk ke mode `global configuration`

```shell
Switch#configure terminal
```

- Membuat VLAN ID `10` dengan nama `ruang-guru`

```shell
Switch(config)#vlan 10
Switch(config-vlan)#name ruang-guru
Switch(config-vlan)#exit
```

- Membuat VLAN ID `20` dengan nama `ruang-meeting`

```shell
Switch(config)#vlan 20
Switch(config-vlan)#name ruang-meeting
Switch(config-vlan)#exit
```

- Mengecek list VLAN yang sudah kita buat

```shell
Switch(config)#do show vlan brief
```

<a href="https://i.ibb.co/HV2CYBw/image.png" target="_blank">
  <img src="https://i.ibb.co/HV2CYBw/image.png" alt="https://i.ibb.co/HV2CYBw/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

| VLAN | Name               | Status | Ports                                                                                                                                                                            |
| ---- | ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | default            | active | Fa0/1, Fa0/2, Fa0/3, Fa0/4 Fa0/5, Fa0/6, Fa0/7, Fa0/8 Fa0/9, Fa0/10, Fa0/11, Fa0/12 Fa0/13, Fa0/14, Fa0/15, Fa0/16 Fa0/17, Fa0/18, Fa0/19, Fa0/20 Fa0/21, Fa0/22, Fa0/23, Fa0/24 |
| 10   | ruang-guru         | active |                                                                                                                                                                                  |
| 20   | ruang-meeting      | active |                                                                                                                                                                                  |
| 1002 | fddi-default       | active |                                                                                                                                                                                  |
| 1003 | token-ring-default | active |                                                                                                                                                                                  |
| 1004 | fddinet-default    | active |                                                                                                                                                                                  |
| 1005 | trnet-default      | active |                                                                                                                                                                                  |

- Memberikan VLAN `10` ke PC0 yang terhubung dengan interface `fa0/1`

```shell
Switch(config)#interface fastEthernet 0/1
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 10
Switch(config-if)#exit
```

- Memberikan VLAN `10` ke PC1 yang terhubung dengan interface `fa0/2`

```shell
Switch(config)#interface fastEthernet 0/2
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 10
Switch(config-if)#exit
```

- Memberikan VLAN `20` ke PC2 yang terhubung dengan interface `fa0/3`

```shell
Switch(config)#interface fastEthernet 0/3
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 20
Switch(config-if)#exit
```

- Memberikan VLAN `20` ke PC3 yang terhubung dengan interface `fa0/4`

```shell
Switch(config)#interface fastEthernet 0/4
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 20
Switch(config-if)#exit
```

- Sekarang kita cek konfigurasi VLAN kita

```shell
Switch(config)#do show vlan brief
```

<a href="https://i.ibb.co/rZCw5RT/image.png" target="_blank">
  <img src="https://i.ibb.co/rZCw5RT/image.png" alt="https://i.ibb.co/rZCw5RT/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

| VLAN | Name               | Status | Ports                                                                                                                  |
| ---- | ------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| 1    | default            | active | Fa0/5, Fa0/6, Fa0/7, Fa0/8 Fa0/9, Fa0/10, Fa0/11, Fa0/12 Fa0/13, Fa0/14, Fa0/15, Fa0/16 Fa0/21, Fa0/22, Fa0/23, Fa0/24 |
| 10   | ruang-guru         | active | Fa0/1, Fa0/2                                                                                                           |
| 20   | ruang-meeting      | active | Fa0/3, Fa0/4                                                                                                           |
| 1002 | fddi-default       | active |                                                                                                                        |
| 1003 | token-ring-default | active |                                                                                                                        |
| 1004 | fddinet-default    | active |                                                                                                                        |
| 1005 | trnet-default      | active |                                                                                                                        |

<a href="https://i.ibb.co/vJM1SBV/image.png" target="_blank">
  <img src="https://i.ibb.co/vJM1SBV/image.png" alt="https://i.ibb.co/vJM1SBV/image.png" class="img-fluid rounded mx-auto d-block" />
</a>
