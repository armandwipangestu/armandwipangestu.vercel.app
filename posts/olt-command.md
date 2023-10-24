---
title: "OLT - List Perintah atau Command pada OLT"
tag: "Networking"
date: "January 18 2023"
excerpt: "Artikel yang berisi kumpulan perintah atau command untuk perangkat OLT"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Cek ONT Uptime dan History

Pada perangkat OLT kita bisa mengecek status detail dari perangkat ONU atau ONT, perintah berikut ini menghasilkan sebuah output mengenai detail perangkat diantaranya terdapat status `uptime` atau total nyala perangkat.

- Command

```shell
show gpon onu detail-info gpon-onu_1/1/1:1
```

- Output

```shell
ONU interface:         gpon-onu_1/1/1:1
  Name:                Client
  Type:                F609
  State:               ready
  Admin state:         enable
  Phase state:         working
  Authentication mode: sn
  SN Bind:             enable with SN check
  Serial number:       XXXXXXXXXX
  Password:
  Device ID:
  Description:         ONU-1:1
  Vport mode:          gemport
  DBA Mode:            Hybrid
  ONU Status:          enable
  OMCI BW Profile:     enable
  Line Profile:        N/A
  Service Profile:     N/A
  Alarm Profile:       N/A
  Performance Profile: N/A
  ONU Distance:        3703m
  Online Duration:     34h 45m 21s
  FEC:                 none
  1PPS+ToD:            disable
------------------------------------------
       Authpass Time          OfflineTime             Cause
   1   2022-09-05 14:04:42    0000-00-00 00:00:00
   2   0000-00-00 00:00:00    0000-00-00 00:00:00
   3   0000-00-00 00:00:00    0000-00-00 00:00:00
   4   0000-00-00 00:00:00    0000-00-00 00:00:00
   5   0000-00-00 00:00:00    0000-00-00 00:00:00
   6   0000-00-00 00:00:00    0000-00-00 00:00:00
   7   0000-00-00 00:00:00    0000-00-00 00:00:00
   8   0000-00-00 00:00:00    0000-00-00 00:00:00
   9   0000-00-00 00:00:00    0000-00-00 00:00:00
  10   0000-00-00 00:00:00    0000-00-00 00:00:00
```

## Cek Detail Config di Interface ke arah ONT

Untuk mengecek status konfigurasi interface ke arah ONU atau ONT, dapat menggunakan perintah dibawah ini

- Command

```shell
show running-config interface gpon-onu_1/1/1:1
```

- Output

```shell
Building configuration...
!
interface gpon-onu_1/1/1:1
  name Client
  tcont 1 profile UPTO-75M
  tcont 2 profile UP-1M
  gemport 1 name internet unicast tcont 1 dir both
  gemport 1 traffic-limit downstream UPTO-75M
  gemport 2 name mgmt unicast tcont 2 dir both
  switchport mode hybrid vport 2
  switchport mode hybrid vport 1
  service-port 1 vport 1 user-vlan xxx vlan xxx
  service-port 2 vport 2 user-vlan yyy vlan yyy
  pppoe-plus enable vport 2
!
end
```

## Cek Signal Fiber Optic

Untuk mengecek redaman atau sinyal fiber optic dari sebuah ONU atau ONT kita bisa mengecek nya menggunakan perintah dibawah ini

- Command

```shell
show pon power attenuation gpon-onu_1/1/1:1
```

- Output

```shell
           OLT                  ONU              Attenuation
--------------------------------------------------------------------------
 up      Rx :-20.241(dbm)      Tx:2.423(dbm)        22.664(dB)

 down    Tx :5.369(dbm)        Rx:-16.676(dbm)      22.045(dB)
```

## Menampilkan MAC Perangkat Yang Terhubung ke ONU

Tentunya kita membutuhkan pengecekan MAC Address yang terhubung ke perangkat ONU atau ONT kita, kita bisa melihat MAC Address yang terhubung tersebut mengggunakan perintah dibawah ini. Untuk mengecek vendor perangkat yang digunakan, kalian bisa menggunakan website berikut ini [macvendors.com](https://macvendors.com/)

![image](https://i.ibb.co/2PkrY21/image.png)

- Command

```shell
show mac gpon onu gpon-onu_1/1/1:1
```

- Output

```shell
Total mac address : 1

Mac address      Vlan   Type      Port                         Vc
------------------------------------------------------------------------
8cdc.0294.a5cd   88     Dynamic   gpon-onu_1/1/1:1          vport 2
```

## Cara Mengecek WAN IP Address ONU

Untuk melihat status IP Address untuk arah `WAN` (Wide Area Network) dari sebuah ONU atau ONT, gunakan perintah berikut ini

- Command

```shell
show gpon remote-onu wan-ip gpon-onu_1/1/1:1
```

- Ouput

```shell
WAN id:         1
Mode:           PPPoE
Authentication: auto
User name:      XXXXXXXXXX
Password:       XXXXXXXXXX
Status:         connected
Ping response:  enable
Traceroute response: disable
VLAN tag mode:  tag
CVLAN:          88
CVLAN priority: 0
SVLAN:          0
Current IP:     172.16.202.74
Current mask:   255.255.255.255
Current gateway:172.16.202.1
Current primary DNS: 8.8.8.8
Current secondary DNS: 8.8.4.4
Domain name:
Host name:      omci_ipv4_pppoe_1
MAC address:    xxxx.xxxx.xxxx
IP host id:     1
```

## Menampilkan Semua State OLT

Pada OLT kita bisa mengecek state atau keadaan seluruh perangkat ONU atau ONT, perintah dibawah ini akan mengecek semua PON.

Sebagai contoh dibawah ini OLT mempunyai 2 PON, maka output total nya akan menghasilkan 2 PON, yaitu `gpon-onu_1/1/1` dan `gpon-onu_1/1/2`

- Command

```shell
show gpon onu state
```

- Output

```shell
OnuIndex               Admin State  OMCC State   O7 State     Phase State
----------------------------------------------------------------------------
gpon-onu_1/1/1:1       enable       enable       operation    working
gpon-onu_1/1/1:2       enable       enable       operation    working
gpon-onu_1/1/1:3       enable       disable      unknown      LOS
gpon-onu_1/1/1:5       enable       enable       operation    working
gpon-onu_1/1/1:6       enable       enable       operation    working
gpon-onu_1/1/1:7       enable       enable       operation    working
gpon-onu_1/1/1:8       enable       disable      unknown      DyingGasp
gpon-onu_1/1/1:9       enable       disable      unknown      DyingGasp
gpon-onu_1/1/1:10      enable       disable      unknown      LOS
gpon-onu_1/1/1:12      enable       enable       operation    working
gpon-onu_1/1/1:13      enable       enable       operation    working
gpon-onu_1/1/1:14      enable       enable       operation    working
gpon-onu_1/1/2:1       enable       disable      unknown      DyingGasp
gpon-onu_1/1/2:2       enable       disable      unknown      DyingGasp
gpon-onu_1/1/2:3       enable       enable       operation    working
gpon-onu_1/1/2:4       enable       enable       operation    working
gpon-onu_1/1/2:6       enable       enable       operation    working
gpon-onu_1/1/2:7       enable       disable      unknown      LOS
gpon-onu_1/1/2:8       enable       enable       operation    working
gpon-onu_1/1/2:14      enable       enable       operation    working
gpon-onu_1/1/2:15      enable       disable      unknown      LOS
gpon-onu_1/1/2:18      enable       disable      unknown      DyingGasp
gpon-onu_1/1/2:20      enable       disable      unknown      DyingGasp
gpon-onu_1/1/2:21      enable       disable      unknown      LOS
gpon-onu_1/1/2:22      enable       disable      unknown      DyingGasp
gpon-onu_1/1/2:23      enable       enable       operation    working
gpon-onu_1/1/2:26      enable       enable       operation    working
gpon-onu_1/1/2:27      enable       enable       operation    working
```

## Menampilkan State Satu OLT

Apabila pada perintah sebelumnya mengecek state atau keadaan seluruh PON, maka pada perintah kali ini kita bisa men-target kan PON mana yang ingin di cek, untuk melakukannya kalian bisa menggunakan perintah dibawah ini.

- Command

```shell
show gpon onu state gpon-olt_1/1/1
```

- Output

```shell
OnuIndex               Admin State  OMCC State   O7 State     Phase State
----------------------------------------------------------------------------
gpon-onu_1/1/1:1       enable       enable       operation    working
gpon-onu_1/1/1:2       enable       enable       operation    working
gpon-onu_1/1/1:3       enable       disable      unknown      LOS
gpon-onu_1/1/1:5       enable       enable       operation    working
gpon-onu_1/1/1:6       enable       enable       operation    working
gpon-onu_1/1/1:7       enable       enable       operation    working
gpon-onu_1/1/1:8       enable       disable      unknown      DyingGasp
gpon-onu_1/1/1:9       enable       disable      unknown      DyingGasp
gpon-onu_1/1/1:10      enable       disable      unknown      LOS
gpon-onu_1/1/1:12      enable       enable       operation    working
gpon-onu_1/1/1:13      enable       enable       operation    working
gpon-onu_1/1/1:14      enable       enable       operation    working
```

## Menampilkan Signal RX (Download) Satu OLT

Apabila pada perintah sebelumnya yaitu [Cek Signal Fiber Optic](#cek-signal-fiber-optic) hanya mengecek signal berdasarkan index ONU atau ONT nya, maka kita juga bisa mengecek signal fiber optic dalam satu OLT atau PON.

Namun disini kita akan mengecek signal berdasarkan RX nya.

- Command

```shell
show pon power onu-rx gpon-olt_1/1/1
```

- Output

```shell
Onu                 Rx power
------------------------------------
gpon-onu_1/1/1:1    -16.676(dbm)
gpon-onu_1/1/1:2    -24.948(dbm)
gpon-onu_1/1/1:3    N/A
gpon-onu_1/1/1:5    -26.198(dbm)
gpon-onu_1/1/1:6    -26.576(dbm)
gpon-onu_1/1/1:7    -17.424(dbm)
gpon-onu_1/1/1:8    N/A
gpon-onu_1/1/1:9    N/A
gpon-onu_1/1/1:10   N/A
gpon-onu_1/1/1:12   -23.098(dbm)
gpon-onu_1/1/1:13   -20.810(dbm)
gpon-onu_1/1/1:14   -17.826(dbm)
```

## Menampilkan Signal TX (Upload) Satu OLT

Sama pada perintah sebelumnya yaitu [Menampilkan Signal RX (Download) Satu OLT](#menampilkan-signal-rx-download-satu-olt), bedanya disini kita mengecek signal berdasarkan TX nya.

- Command

```shell
show pon power onu-tx gpon-olt_1/1/1
```

- Output

```shell
Onu                 Tx power
------------------------------------
gpon-onu_1/1/1:1    2.445(dbm)
gpon-onu_1/1/1:2    2.771(dbm)
gpon-onu_1/1/1:3    N/A
gpon-onu_1/1/1:5    2.329(dbm)
gpon-onu_1/1/1:6    2.990(dbm)
gpon-onu_1/1/1:7    2.119(dbm)
gpon-onu_1/1/1:8    N/A
gpon-onu_1/1/1:9    N/A
gpon-onu_1/1/1:10   N/A
gpon-onu_1/1/1:12   2.268(dbm)
gpon-onu_1/1/1:13   2.136(dbm)
gpon-onu_1/1/1:14   2.404(dbm)
```

## Menampilkan Status Interface xgei (10G)

Interface `xgei` merupakan interface yang dapat menampung speed atau kecepatan sebesar `10G`, maka pada umumnya interface ini biasanya dijadikan sebuah backbone atau sumber internet dari OLT.

Untuk mengecek status interface xgei tersebut, kalian bisa menggunakan perintah ini

- Command

```shell
show interface xgei_1/4/2
```

- Output

```shell
xgei_1/4/2 is up,  line protocol is up
  Description is BACKBONE-XXX-via-XXX
  Keepalive set:10 sec
  The port negotiation is disable
  The port is optical
  Duplex full
  scramble payload-enable
```

## Menampilkan Informasi Interface Ethernet (LAN)

Apabila pada perintah sebelumya, yaitu [Cara Mengecek WAN IP Address ONU](#cara-mengecek-wan-ip-address-onu) mengecek status interface arah `WAN`. Maka pada perintah kali ini kita bisa mengecek status interface ethernet untuk arah `LAN`

Untuk mengecek status interface ethernet arah `LAN` kalian bisa menggunakan perintah dibawah ini

- Command

```shell
show gpon remote-onu interface eth gpon-onu_1/1/1:1
```

- Output

```shell
Interface:     eth_0/1
Speed status:  auto
Operate status:disable
Admin status:  unlock
Arc:           0
Arc-interval   0
Expect-type:   0
Speed config:  auto
Eth-loop:      disable
Max-frame:     1632
Pause-time:    0
Wiring :       dce
BridgeOrIP:    either
PPPOE-filter:  disable
Power-control: disable

Interface:     eth_0/2
Speed status:  full-100
Operate status:enable
Admin status:  unlock
Arc:           0
Arc-interval   0
Expect-type:   0
Speed config:  auto
Eth-loop:      disable
Max-frame:     1632
Pause-time:    0
Wiring :       dce
BridgeOrIP:    either
```

## Masuk ke mode PON Management

Pada Operating System GPON OLT ini, terdapat beberapa mode diantaranya adalah PON Management. Untuk masuk kedalam mode tersebut kalian bisa menggunakan perintah dibawah ini.

> **Catatan**:
>
> Untuk masuk kedalam mode PON Management, mempunyai format berikut ini
>
> ```shell
> pon-onnu-mng gpon-onu_W/X/Y:Z
> ```
>
> - `W` = Mengacu pada nomor slot fisik di OLT
> - `X` = Card number
> - `Y` = Nomor Port atau PON
> - `Z` = Index ONU

- Command

```shell
pon-onu-mng gpon-onu_1/1/7:2
```

- Output

```shell
host(gpon-onu-mng)#
```

## Menampilkan Informasi PON Management

Untuk mengecek konfigurasi arah PON Management, kalian bisa menggunakan perintah dibawah ini.

- Command

```shell
host(gpon-onu-mng)#show onu running config gpon-onu_1/1/7:2
```

- Output

> **Catatan**:
>
> - `security-mng 211 state enable ingress-type lan protocol web` = berfungsi untuk mengizinkan membuka gateway onu di web dengan koneksi melalui port eth
>
> - `security-mng 211 state enable mode permit protocol web` = berfungsi untuk mengizinkan remote gateway onu di web denga ip host nya

```shell
pon-onu-mng gpon-onu_1/1/7:2
  service internet gemport 1 vlan xxx
  service mgmt gemport 2 vlan 88
  service hotspot gemport 6 vlan xxx-yyy,xxx
  wan-ip 1 mode pppoe username XXXXXXXXXXXX password XXXXXXXXX vlan-profile MGMT-ONU host 1
  name XXXXXXX
  vlan port eth_0/1 mode tag vlan xxx
  vlan port eth_0/2 mode tag vlan xxx
  vlan port eth_0/3 mode tag vlan xxx
  vlan port eth_0/4 mode tag vlan xxx
  vlan port wifi_0/1 mode tag vlan xxx
  security-mng 211 state enable ingress-type lan protocol web
  security-mng 212 state enable mode permit protocol web
  ssid auth wep wifi_0/1 open-system
  ssid ctrl wifi_0/1 name XXXX
!
```

## Menghapus VLAN pada Port Ethernet

Untuk menghapus konfigurasi `VLAN` pada port Ethernet kita harus masuk terlebih dahulu ke dalam mode [PON Management](#masuk-ke-mode-pon-management), setelah masuk kita bisa menggunakan perintah dibawah ini untuk menghapus konfigurasi `VLAN`

- Command

```shell
host(gpon-onu-mng)#no vlan port eth_0/1 mode
```

- Output (Before)

```shell
pon-onu-mng gpon-onu_1/1/7:2
  service internet gemport 1 vlan xxx
  service mgmt gemport 2 vlan 88
  service hotspot gemport 6 vlan xxx-yyy,xxx
  wan-ip 1 mode pppoe username XXXXXXXXXXXX password XXXXXXXXX vlan-profile MGMT-ONU host 1
  name XXXXXXX
  vlan port eth_0/1 mode tag vlan xxx
  ...
  ...
  ...
  ...
  security-mng 211 state enable ingress-type lan protocol web
  security-mng 212 state enable mode permit protocol web
  ssid auth wep wifi_0/1 open-system
  ssid ctrl wifi_0/1 name XXXX
!
```

- Output (After)

```shell
pon-onu-mng gpon-onu_1/1/7:2
  service internet gemport 1 vlan xxx
  service mgmt gemport 2 vlan 88
  service hotspot gemport 6 vlan xxx-yyy,xxx
  wan-ip 1 mode pppoe username XXXXXXXXXXXX password XXXXXXXXX vlan-profile MGMT-ONU host 1
  name XXXXXXX
  ...
  ...
  ...
  ...
  security-mng 211 state enable ingress-type lan protocol web
  security-mng 212 state enable mode permit protocol web
  ssid auth wep wifi_0/1 open-system
  ssid ctrl wifi_0/1 name XXXX
!
```

## Menambahkan VLAN dengan mode trunk pada port Ethernet

Untuk menambahakn `VLAN` dengan mode `Trunk` pada port Ethernet, kita bisa menggunakan perintah dibawah ini

- Command

```shell
vlan port eth_0/1 mode trunk
```

- Output

```shell
pon-onu-mng gpon-onu_1/1/7:2
  service internet gemport 1 vlan xxx
  service mgmt gemport 2 vlan 88
  service hotspot gemport 6 vlan xxx-yyy,xxx
  wan-ip 1 mode pppoe username XXXXXXXXXXXX password XXXXXXXXX vlan-profile MGMT-ONU host 1
  name XXXXXXX
  vlan port eth_0/1 mode trunk
  ...
  ...
  ...
  ...
  security-mng 211 state enable ingress-type lan protocol web
  security-mng 212 state enable mode permit protocol web
  ssid auth wep wifi_0/1 open-system
  ssid ctrl wifi_0/1 name XXXX
!
```

## Menambahkan VLAN pada Interface Ethernet

Apabila pada perintah sebelumnya yaitu [Menambahkan VLAN dengan mode Trunk pada port Ethernet](#menambahkan-vlan-dengan-mode-trunk-pada-port-ethernet), pada perintah kali ini kita dapat menambahkan identitas VLAN atau `VLAN ID` nya

- Command

> **Catatan**:
>
> - `xxx` = start vlan
> - `yyy` = end vlan

```shell
vlan port eth_0/1 vlan xxx-yyy
```

- Output

```shell
pon-onu-mng gpon-onu_1/1/7:2
  service internet gemport 1 vlan xxx
  service mgmt gemport 2 vlan 88
  service hotspot gemport 6 vlan xxx-yyy,xxx
  wan-ip 1 mode pppoe username XXXXXXXXXXXX password XXXXXXXXX vlan-profile MGMT-ONU host 1
  name XXXXXXX
  vlan port eth_0/1 mode trunk
  ...
  ...
  ...
  ...
  vlan port eth_0/1 vlan xxx-yyy
  security-mng 211 state enable ingress-type lan protocol web
  security-mng 212 state enable mode permit protocol web
  ssid auth wep wifi_0/1 open-system
  ssid ctrl wifi_0/1 name XXXX
!
```
