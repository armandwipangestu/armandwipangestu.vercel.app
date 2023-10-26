---
published: true
title: "PowerDNS - Authoritative Server Sebagai Recursor Untuk Client dan Melayani Public Domains"
tag: "SysAdmin"
date: "August 01 2023"
excerpt: "Pada artikel ini saya akan melakukan konfigurasi DNS Server (PowerDNS) Authoritative Server agar berfungsi sebagai recursor untuk client dan sekaligus melayani public domains"
cover_image: "/images/posts/PowerDNS - Authoritative As Recursor for Clients and serving public domains.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**:
>
> Simpel nya pada konfigurasi di artikel ini adalah kita mengubah port PowerDNS Server (Authoritative Server) agar berjalan di port 5300.
> Kemudian menambahkan DNS Recursor (Untuk melayani public domains) dan berjalan di port 5301 dan
> dnsdist sebagai server depan yang berjalan di port 53.
>
> Sehingga nantinya dnsdist ini yang akan meneruskan query dari user ke DNS Recursor
> setelah di DNS Recursor kita akan cek apakah query yang di minta sama dengan salah satu private zone, jika iya teruskan ke
> Authoritative Server, namun jika bukan teruskan ke Recursor Public atau Upstream seperti Google (8.8.8.8) dan Cloudflare (1.1.1.1)
>
> Perlu di ingat juga, dikarenakan pada pembahasan sebelumnya saya sudah melakukan konfigurasi master dan slave, maka pada artikel kali ini juga saya masih menggunakan konfigurasi yang sama yaitu Master dan Slave.

Pada skenario kali ini saya menggunakan package atau service dengan versi:

- `dnsdist 1.6.1`
- `PowerDNS Authoritative Server 4.5.3`
- `PowerDNS Recursor 4.6.0`

Dan masing-masing package atau service tersebut berjalan pada port yang berbeda, yaitu:

| Service atau Package   | Port |
| ---------------------- | ---- |
| dnsdist                | 53   |
| PowerDNS Authoritative | 5300 |
| PowerDNS Recursor      | 5301 |

## Installasi Package

Sebelum melakukan konfigurasi yang akan kita mulai, kita perlu melakukan instalasi terhadap package-package yang akan digunakan, berikut adalah perintah atau command untuk melakukan instalasi package tersebut menggunakan distro linux Ubuntu

> **Catatan**:
>
> Artikel ini merupakan lanjutan dari seri mengenai PowerDNS dan juga DNS, sehingga alangkah baiknya kalian membaca terlebih dahulu mengenai artikel-artikel berikut
>
> - [PowerDNS - Install PowerDNS di Ubuntu Server](powerdns-instalasi)
> - [DNS - Apa itu DNS? Pengertian, Fungsi dan Cara Kerja](dns-cara-kerja-dan-jenis-jenis-record)
> - [PowerDNS - Menambahkan DNS Records pada DNS Server](powerdns-menambahkan-records)
> - [PowerDNS - Konfigurasi Master dan Slave](powerdns-master-dan-slave)
> - [Domain - Pointing Ke VPS](domain-pointing-ke-vps)

```shell
sudo apt install pdns-server pdns-recursor dnsdist
```

## Backup Konfigurasi

> **Catatan**:
>
> Lakukan backup konfigurasi berikut di kedua server, baik itu di primary/master dan juga di secondary/slave

Seperti sebelumnya, alangkah baiknya kita melakukan backup konfigurasi terlebih dahulu sebelum melakukan perubahan. Sehingga jika nantinya kita ingin kembali ke konfigurasi sebelumnya kita cukup mengganti konfigurasi dengan backup an nya.

```shell
sudo mv /etc/powerdns/pdns.conf /etc/powerdns/pdns.conf.bak
```

> **Catatan**:
>
> Apabila kalian mempunyai konfigurasi mengenai pdns-recursor dan dnsdist, kalian bisa melakukan backup dengan perintah berikut ini
>
> ```shell
> sudo mv /etc/powerdns/recursor.conf /etc/powerdns/recursor.conf.bak && sudo mv /etc/dnsdist/dnsdist.conf /etc/dnsdist/dnsdist.conf.bak
> ```

## Melakukan Konfigurasi di Server Primary atau Master

Langkah pertama disini kita akan melakukan konfigurasi terhadap PowerDNS Server nya terlebih dahulu dengan cara membuat file konfigurasi nya

### PowerDNS Server Master

```shell
sudo vim /etc/powerdns/pdns.conf
```

Setelah itu, masukan konfigurasi berikut ini:

> **Catatan**:
>
> Perhatikan beberapa konfigurasi dibawah ini, kalian harus menyesuaikannya dengan konfigurasi server kalian
> `gmysql-host`, `gmysql-port`, `gmysql-dbname`, `gmysql-user`, `gmysql-password`, `local-address`, `api-key`, `webserver-address`, `webserver-allow-from`, `webserver-password`, `allow-axfr-ips`, `allow-notify-from`, `also-notify`

```conf
launch=gmysql
gmysql-host=<YOUR_DATABASE_IP>
gmysql-port=<YOUR_DATABASE_PORT>
gmysql-dbname=<YOUR_DATABASE_NAME>
gmysql-user=<YOUR_DATABASE_USERNAME>
gmysql-password=<YOUR_DATABASE_PASSWORD>
gmysql-dnssec=no

local-address=127.0.0.1,<YOUR_IP_PRIVATE>,<YOUR_IP_PUBLIC>
local-port=5300

api=yes
api-key=<YOUR_SECRET_KEY>

webserver=yes
webserver-address=0.0.0.0
webserver-port=8081
webserver-allow-from=127.0.0.1, <YOUR_IP_PRIVATE_NETWORK/MASK>, <YOUR_IP_PUBLIC_NETWORK/MASK>
webserver-password=<YOUR_WEB_SERVER_PASSWORD>
webserver-loglevel=none

primary=yes
secondary=no
allow-axfr-ips=127.0.0.1, <YOUR_IP_PRIVATE>, <YOUR_IP_SLAVE>
allow-notify-from=127.0.0.1, <YOUR_IP_PRIVATE>, <YOUR_IP_SLAVE>
also-notify=<YOUR_IP_SLAVE>:5300
only-notify=
secondary-do-renotify=yes
disable-axfr=no
xfr-cycle-interval=60

daemon=yes
guardian=yes
default-soa-content=ns1.domain.com admin.ns1.domain.com 0 3600 600 1209600 3600
log-dns-details=yes
log-dns-queries=yes
loglevel=5
setgid=pdns
setuid=pdns
distributor-threads=4
receiver-threads=3
signing-threads=4
```

### PowerDNS Recursor Master

Setelah melakukan konfigurasi PowerDNS Server, langkah selanjutnya adalah melakukan konfigurasi PowerDNS Recursor

```shell
sudo vim /etc/powerdns/recursor.conf
```

Setelah itu, masukan konfigurasi berikut ini:

> **Catatan**:
>
> Perhatikan beberapa konfigurasi dibawah ini, kalian harus menyesuaikannya dengan konfigurasi server kalian
> `allow-from`, `forward-zones`, `local-address`, `api-key`, `webserver-address`, `webserver-allow-from`, `webserver-password`, `api-key`

```conf
allow-from=127.0.0.0/8, <YOUR_IP_PRIVATE_NETWORK/MASK>, <YOUR_IP_PUBLIC_NETWORK/MASK>
config-dir=/etc/powerdns

serve-rfc1918=yes
forward-zones=<YOUR_PRIVATE_ZONE_1>.=127.0.0.1:5300;<YOUR_IP_PRIVATE>:5300;<YOUR_IP_PUBLIC>:5300
forward-zones+=<YOUR_PRIVATE_ZONE_1>.=127.0.0.1:5300;<YOUR_IP_PRIVATE>:5300;<YOUR_IP_PUBLIC>:5300
forward-zones-recurse=.=8.8.8.8;8.8.4.4
any-to-tcp=yes

hint-file=/usr/share/dns/root.hints
include-dir=/etc/powerdns/recursor.d

local-address=127.0.0.1, <YOUR_IP_PRIVATE>, <YOUR_IP_PUBLIC>
local-port=5301

log-common-errors=yes
log-timestamp=yes
loglevel=6

lua-config-file=/etc/powerdns/recursor.lua
public-suffix-list-file=/usr/share/publicsuffix/public_suffix_list.dat
quiet=no
security-poll-suffix=

webserver=yes
webserver-address=0.0.0.0
webserver-allow-from=127.0.0.1, <YOUR_IP_PRIVATE/MASK>, <YOUR_IP_PUBLIC/MASK>
webserver-password=<YOUR_WEB_SERVER_PASSWORD>
webserver-port=8082

setgid=pdns
setuid=pdns

api-key=<YOUR_SECRET_KEY>
```

### dnsdist Master

Setelah melakukan konfigurasi PowerDNS Server dan PowerDNS Recursor, selanjutnya kita lakukan konfigurasi dnsdist sebagai service utama yang akan di hit ketika query dns dijalankan ke server kita. Karena dnsdist disini berjalan di port `53`.

```shell
sudo vim /etc/dnsdist/dnsdist.conf
```

Setelah itu, masukan konfigurasi berikut ini:

> **Catatan**:
>
> Perhatikan beberapa konfigurasi dibawah ini, kalian harus menyesuaikannya dengan konfigurasi server kalian
> `addLocal()`, `recursive_ips:addMask()`, `makeRule({})`, `webserver()`

```lua
setLocal('127.0.0.1:53')
addLocal('<YOUR_IP_PRIVATE>:53')
addLocal('<YOUR_IP_PUBLIC>:53')
-- Allow all IPs access
setACL({
    '0.0.0.0/0', '::/0'
})

newServer({
    address='127.0.0.1:5300',
    name='Authoritative',
    pool='auth',
})

newServer({
    address='127.0.0.1:5301',
    name='Recursor',
    pool='recursor',
})

recursive_ips = newNMG()
recursive_ips:addMask('127.0.0.0/8') -- These network masks are the ones from allow-recursion in the Authoritative Server
recursive_ips:addMask('<YOUR_IP_PRIVATE_NETWORK/MASK>')
recursive_ips:addMask('<YOUR_IP_PUBLIC_NETWORK/MASK>')

all_ips = newNMG()
all_ips:addMask('0.0.0.0/0')

addAction(
        AndRule({
                OrRule({
                        QTypeRule(DNSQType.SOA),
                        QTypeRule(DNSQType.NS),
                        QTypeRule(DNSQType.AXFR),
                        QTypeRule(DNSQType.IXFR)
                }),
                makeRule({
                        "127.0.0.1",
                        "<YOUR_IP_PRIVATE>",
                        "<YOUR_IP_PUBLIC>",
                        "<YOUR_IP_SLAVE>",
                })
        }),
        PoolAction("auth")
)

addAction(NetmaskGroupRule(recursive_ips), PoolAction('recursor'))
addAction(NetmaskGroupRule(all_ips), PoolAction('auth'))

pc = newPacketCache(2000000, {maxTTL=86400, minTTL=0, temporaryFailureTTL=60, staleTTL=60, dontAge=true})
getPool("auth"):setCache(pc)

pc1 = newPacketCache(2000000, {maxTTL=86400, minTTL=0, temporaryFailureTTL=60, staleTTL=60, dontAge=false})
getPool("recursor"):setCache(pc)

webserver(
    "<YOUR_IP_PRIVATE>:8083",
    "<YOUR_WEBSERVER_USERNAME>",
    "<YOUR_WEBSERVER_PASSWORD>",
    {},
    "<YOUR_IP_PRIVATE_NETWORK/MASK>"
)
```

> **Catatan**:
>
> ```lua
> addAction(NetmaskGroupRule(recursive_ips), PoolAction('recursor'))
> addAction(NetmaskGroupRule(all_ips), PoolAction('auth'))
> ```
>
> Konfigurasi tersebut artinya adalah hanya menginzinkan list ip address recursive yang akan diberi pelayanan recursor public
> sehingga selain dari ip address tersebut akan di arahkan ke pool auth (Authoritative Server) sehingga jika orang lain
> atau network selain dari kita menggunakan DNS Server yang kita buat, dia tidak akan resolve ketika query public domain
> karena akan di belokan ke Authoritative Server

### Restart Service PowerDNS Server PowerDNS Recursor dan dnsdist

Setelah semua konfigurasi tersimpan selanjutnya lakukan restart service agar konfigurasi tersebut digunakan, untuk melakukan restart service gunakan perintah berikut ini:

```shell
sudo systemctl restart pdns pdns-recursor dnsdist
```

## Melakukan Konfigurasi di Server Secondary atau Slave

Setelah sebelumnya melakukan konfigursai di sisi Primary/Master, selanjutnya disini kita akan melakukan konfigurasi di sisi Secondary/Slave. Untuk langkah pertama sama seperti ketika konfigurasi Primary/Master yaitu melakukan perubahan terhadap PowerDNS Server nya terlebih dahulu dengan cara membuat file konfigurasi nya.

> **Catatan**:
>
> Lakukan backup file konfigurasi terlebih dahulu

### PowerDNS Server Slave

```shell
sudo vim /etc/powerdns/pdns.conf
```

Setelah itu, masukan konfigurasi berikut ini:

> **Catatan**:
>
> Perhatikan beberapa konfigurasi dibawah ini, kalian harus menyesuaikan dengan konfigurasi server kalian
> `gmysql-host`, `gmysql-port`, `gmysql-dbname`, `gmysql-user`, `gmysql-password`, `local-address`,
> `api-key`, `webserver-allow-from`, `webserver-password`, `allow-dnsupdate-from`, `allow-notify-from`,
> `trusted-notification-proxy`, `default-soa-content`

```conf
launch=gmysql
gmysql-host=<YOUR_DATABASE_IP>
gmysql-port=<YOUR_DATABASE_PORT>
gmysql-dbname=<YOUR_DATABASE_NAME>
gmysql-user=<YOUR_DATABASE_USERNAME>
gmysql-password=<YOUR_DATABASE_PASSWORD>
gmysql-dnssec=no

local-address=127.0.0.1,<YOUR_IP_PRIVATE>,<YOUR_IP_PUBLIC>
local-port=5300

api=yes
api-key=<YOUR_SECRET_KEY>

webserver=yes
webserver-address=0.0.0.0
webserver-port=8081
webserver-allow-from=127.0.0.1, <YOUR_IP_PRIVATE_NETWORK/MASK>, <YOUR_IP_PUBLIC_NETWORK/MASK>
webserver-password=<YOUR_WEB_SERVER_PASSWORD>
webserver-loglevel=none

secondary=yes
autosecondary=yes
primary=no
allow-dnsupdate-from=<YOUR_IP_MASTER>
allow-notify-from=<YOUR_IP_MASTER>
trusted-notification-proxy=127.0.0.1, <YOUR_IP_PRIVATE>
disable-axfr=yes
xfr-cycle-interval=60
only-notify=

daemon=yes
guardian=yes
default-soa-content=ns1.domain.com admin.ns1.domain.com 0 3600 600 1209600 3600
log-dns-details=yes
log-dns-queries=yes
loglevel=5
setgid=pdns
setuid=pdns
distributor-threads=4
receiver-threads=3
signing-threads=4
```

### PowerDNS Recursor Slave

Setelah melakukan konfigurasi PowerDNS Server, langkah selanjutnya adalah melakukan konfigurasi PowerDNS Recursor

```shell
sudo vim /etc/powerdns/recursor.conf
```

Setelah itu, masukan konfigurasi berikut ini:

> **Catatan**:
>
> Perhatikan beberapa konfigurasi dibawah ini, kalian harus menyesuaikan dengan konfigurasi server kalian
> `allow-from`, `forward-zones`, `local-address`, `webserver-allow-from`, `webserver-password`, `api-key`

```conf
allow-from=127.0.0.0/8, <YOUR_IP_PRIVATE_NETWORK/MASK>, <YOUR_IP_PUBLIC_NETWORK/MASK>
config-dir=/etc/powerdns

serve-rfc1918=yes
forward-zones=<YOUR_PRIVATE_ZONE_1>.=127.0.0.1:5300;<YOUR_IP_PRIVATE>:5300;<YOUR_IP_PUBLIC>:5300
forward-zones+=<YOUR_PRIVATE_ZONE_1>.=127.0.0.1:5300;<YOUR_IP_PRIVATE>:5300;<YOUR_IP_PUBLIC>:5300
forward-zones-recurse=.=8.8.8.8;8.8.4.4
any-to-tcp=yes

hint-file=/usr/share/dns/root.hints
include-dir=/etc/powerdns/recursor.d

local-address=127.0.0.1, <YOUR_IP_PRIVATE>, <YOUR_IP_PUBLIC>
local-port=5301

log-common-errors=yes
log-timestamp=yes
loglevel=6

lua-config-file=/etc/powerdns/recursor.lua
public-suffix-list-file=/usr/share/publicsuffix/public_suffix_list.dat
quiet=no
security-poll-suffix=

webserver=yes
webserver-address=0.0.0.0
webserver-allow-from=127.0.0.1, <YOUR_IP_PRIVATE/MASK>, <YOUR_IP_PUBLIC/MASK>
webserver-password=<YOUR_WEB_SERVER_PASSWORD>
webserver-port=8082

setgid=pdns
setuid=pdns

api-key=<YOUR_SECRET_KEY>
```

### dnsdist Slave

Setelah melakukan konfigurasi PowerDNS Server dan PowerDNS Recursor, selanjutnya kita lakukan konfigurasi dnsdist sebagai service utama yang akan di hit ketika query dns dijalankan ke server kita. Karena dnsdist disini berjalan di port 53.

```shell
sudo vim /etc/dnsdist/dnsdist.conf
```

Setelah itu, masukan konfigurasi berikut ini:

> **Catatan**:
>
> Perhatikan beberapa konfigurasi dibawah ini, kalian harus menyesuaikannya dengan konfigurasi server kalian
> `addLocal()`, `recursive_ips:addMask()`, `makeRule({})`, `webserver()`

```lua
setLocal('127.0.0.1:53')
addLocal('<YOUR_IP_PRIVATE>:53')
addLocal('<YOUR_IP_PUBLIC>:53')
-- Allow all IPs access
setACL({
        '0.0.0.0/0', '::/0'
})

newServer({
        address='127.0.0.1:5300',
        name='Authoritative',
        pool='auth',
})

newServer({
        address='127.0.0.1:5301',
        name='Recursor',
        pool='recursor',
})

recursive_ips = newNMG()
recursive_ips:addMask('127.0.0.0/8') -- These network masks are the ones from allow-recursion in the Authoritative Server
recursive_ips:addMask('<YOUR_IP_PRIVATE_NETWORK/MASK>')
recursive_ips:addMask('<YOUR_IP_PUBLIC_NETWORK/MASK>')

all_ips = newNMG()
all_ips:addMask('0.0.0.0/0')

addAction(
        AndRule({
                OpcodeRule(DNSOpcode.Notify),
                NotRule(makeRule("<YOUR_IP_MASTER>"))
        }),
        RCodeAction(DNSRCode.REFUSED)
)

addAction(NetmaskGroupRule(recursive_ips), PoolAction('recursor'))
addAction(NetmaskGroupRule(all_ips), PoolAction('auth'))

pc = newPacketCache(2000000, {maxTTL=86400, minTTL=0, temporaryFailureTTL=60, staleTTL=60, dontAge=true})
getPool("auth"):setCache(pc)

pc1 = newPacketCache(2000000, {maxTTL=86400, minTTL=0, temporaryFailureTTL=60, staleTTL=60, dontAge=false})
getPool("recursor"):setCache(pc)

webserver(
    "<YOUR_IP_PRIVATE>:8083",
    "<YOUR_WEBSERVER_USERNAME>",
    "<YOUR_WEBSERVER_PASSWORD>",
    {},
    "<YOUR_IP_PRIVATE_NETWORK/MASK>"
)
```

### Restart Service PowerDNS Server PowerDNS Recursor dan dnsdist

Setelah semua konfigurasi tersimpan selanjutnya lakukan restart service agar konfigurasi tersebut digunakan, untuk melakukan restart service gunakan perintah berikut ini:

```shell
sudo systemctl restart pdns pdns-recursor dnsdist
```

## Kesimpulan

Setelah konfigurasi diatas diterapkan, maka saat ini dns server anda dapat melayani public domain hanya untuk list ip address yang di sesuaikan pada dnsdist, dan apabila terdapat konfigurasi private zone maka akan diarahkan ke Authoritative Server melalui PowerDNS Recursor.
Selain dari list ip address yang disesuaikan dnsdist maka akan diarahkan langsung ke Authoritative Server, sehingga apabila ada orang lain
yang menggunakan DNS server kita, maka tidak akan resolve.
