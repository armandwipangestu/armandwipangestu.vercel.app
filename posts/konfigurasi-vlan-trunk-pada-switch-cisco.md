---
title: "Cisco - Konfigurasi VLAN Trunk Pada Switch Cisco"
tag: "Networking"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan melakukan konfigurasi VLAN Trunk pada Switch Cisco"
cover_image: "/images/posts/Cisco - Konfigurasi VLAN Trunk Pada Switch Cisco.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

### Pendahuluan

Pada materi VLAN ACCESS dijelaskan bahwa perangkat akan terhubung jika masih dalam 1 vlan id , dan
juga pada 1 interface switch hanya dapat menampung 1 vlan saja. VLAN Trunk digunakan untuk
membawa banyak vlan pada 1 interface switch. Jika pada VLAN ACCESS sebagian besar digunakan untuk
menghubungkan end device (komputer), VLAN TRUNK digunakan untuk menghubungkan vlan antar
switch atau antar router.

- Membuat `VLAN` pada masing - masing switch

> Switch 1

```shell
Switch-1>enable
Switch-1#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch-1(config)#vlan 10
Switch-1(config-vlan)#name ruang-guru
Switch-1(config-vlan)#exit
Switch-1(config)#vlan 20
Switch-1(config-vlan)#name ruang-meeting
Switch-1(config-vlan)#exit
Switch-1(config)#
```

> Switch 2

```shell
Switch-2>enable
Switch-2#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch-2(config)#vlan 10
Switch-2(config-vlan)#name ruang-guru
Switch-2(config-vlan)#exit
Switch-2(config)#vlan 20
Switch-2(config-vlan)#name ruang-meeting
Switch-2(config-vlan)#exit
Switch-2(config)#
```

- Konfigurasi `VLAN Access` pada interface yang mengarah ke end device (komputer)

> Switch 1

| Perangkat | Terhubung ke interface switch | VLAN ID |
| --------- | ----------------------------- | ------- |
| PC0       | FastEthernet0/2               | 10      |
| PC1       | FastEthernet0/3               | 20      |

```shell
Switch-1(config)#interface fastEthernet 0/2
Switch-1(config-if)#switchport mode access
Switch-1(config-if)#switchport access vlan 10
Switch-1(config-if)#exit
Switch-1(config)#interface fastEthernet 0/3
Switch-1(config-if)#switchport mode access
Switch-1(config-if)#switchport access vlan 20
Switch-1(config-if)#exit
Switch-1(config)#
```

> Switch 2

| Perangkat | Terhubung ke interface switch | VLAN ID |
| --------- | ----------------------------- | ------- |
| PC2       | FastEthernet0/2               | 10      |
| PC3       | FastEthernet0/3               | 20      |

```shell
Switch-2(config)#interface fastEthernet0/2
Switch-2(config-if)#switchport mode access
Switch-2(config-if)#switchport access vlan 10
Switch-2(config-if)#exit
Switch-2(config)#interface fastEthernet0/3
Switch-2(config-if)#switchport mode access
Switch-2(config-if)#switchport access vlan 20
Switch-2(config-if)#exit
Switch-2(config)#
```

- Menghubungkan VLAN pada kedua switch, konfigurasi VLAN TRUNK pada interface yang menghubungkan Switch-1 dan Switch-2

> Switch 1

```shell
Switch-1(config)#interface fastEthernet 0/1
Switch-1(config-if)#switchport mode trunk

Switch-1(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to up

Switch-1(config-if)#switchport trunk allowed vlan 10,20
Switch-1(config-if)#exit
Switch-1(config)#
```

> Switch 2

```shell
Switch-2(config)#interface fastEthernet 0/1
Switch-2(config-if)#switchport mode trunk

Switch-2(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/1, changed state to up

Switch-2(config-if)#switchport trunk allowed vlan 10,20
Switch-2(config-if)#exit
```
