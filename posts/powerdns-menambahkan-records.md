---
published: true
title: "PowerDNS - Menambahkan DNS Records pada DNS Server"
tag: "SysAdmin"
date: "July 12 2023"
excerpt: "Pada artikel ini saya akan menambahkan DNS Records pada DNS Server yang berjalan menggunakan PowerDNS dan backend nya menggunakan MySQL"
cover_image: "/images/posts/PowerDNS - Menambahkan Record.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Apa itu Zone dan Record

![Zone dan Records](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/zone-dan-records.png)

- Zone

  Zone atau zona adalah unit dasar administratif yang mengelompokkan nama domain yang saling terkait. Sebuah zona mencakup satu atau lebih nama domain yang terkait. Setiap zona dijalankan oleh satu atau lebih server DNS dan berisi informasi mengenai catatan DNS untuk nama domain yang termasuk dalam zona tersebut.

- Record

  Record DNS (DNS Record) adalah entitas data di dalam zona yang memberikan informasi spesifik tentang suatu nama domain. Setiap record DNS terdiri dari beberapa bidang, termasuk nama domain yang terkait, tipe record (seperti A, CNAME, MX, dll) dan nilai record yang berisi informasi seperti alamat IP, nama domain lain, atau pengaturan khusus lainnya tergantung pada tipe record tersebut.

## Membuat Zone di PowerDNS

Setelah memahami apa itu zone dan record, langkah selanjutnya adalah membuat zone tersebut di powerdns, untuk membuat nya ikuti langkah berikut ini:

### Melalui PowerDNS Admin

- **Langkah Pertama**: Login kedalam PowerDNS Admin sebagai role admin

![PowerDNS Admin](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-admin.png)

- **Langkah Kedua**: Pergi ke tab menu `Create Zone`

- **Langkah Ketiga**: Isikan `Zone Name` dengan nama domain nya sebagai contoh disini saya mengisikan dengan nama domain nya adalah `devnull.co.id`

- **Langkah Keempat**: Klik tombol atau button dengan tulisan `Create Zone`

Maka sekarang akan berpindah ke halaman `dashboard` dan akan muncul zone baru dengan nama nya adalah `devnull.co.id`

![PowerDNS Dashboard](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-dashboard-zone.png)

### Melalui Command Line Interface atau CLI

Untuk menambahkan zone baru melalui CLI, kalian bisa menggunakan perintah berikut ini

```shell
pdnsutil create-zone <domain.tld>
```

![PowerDNS Create Zone](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-create-zone.png)

Untuk melihat nya kalian bisa mengunjungi PowerDNS Admin di menu `Dashboard` maka akan muncul zone yang sudah dibuat sebelumnya

![PowerDNS Dashboard CLI](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-dashboard-zone-cli.png)

atau bisa menggunakan CLI dengan perintah

```shell
pdnsutil edit-zone <domain.tld>
```

Maka akan masuk ke text editor dengan isian file konfigurasi zone tersebut.

![PowerDNS Dashboard CLI](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdnsutil-edit-zone.png)

## Menambahkan Record A untuk Zone

Setelah sebelumnya membuat zone dengan nama domain `devnull.co.id`, maka sekarang kita bisa menambahkan record untuk zone tersebut. Untuk melakukannya ikuti langkah - langkah dibawah ini.

### Melalui PowerDNS Admin

- **Langkah Pertama**: Pergi ke menu `Dashboard`

- **Langkah Kedua**: Pilih zone mana yang ingin ditambahkan atau diedit record nya, disini saya memilih `devnull.co.id`, setelah itu klik pada nama zone atau domainya, atau kalian juga bisa mengklik button atau tombol pada bagian `Actions` > `Edit Records`. Maka sekarang akan berpindah ke halaman `Zone Records - domain.tld`

- **Langkah Ketiga**: Untuk menambahkan record baru, klik pada bagian tombol `Add Record`, maka sekarang cursor akan berpindah pada kolom di bagian tabel nya. Lalu isikan dengan data yang sesuai dengan kasus kalian.

> **Catatan**: Sebagai contoh disini saya akan menambahkan record dengan name `@`, type `A` yang mengarah ke alamat ip `172.16.0.133`
>
> Pada alamat ip tersebut saya sudah menyiapkan webserver apache yang berjalan di port 80, sehingga nantinya jika saya mengakses nama domain `devnull.co.id` di web browser maka seharusnya akan diarahkan ke server tersebut.

- **Langkah Empat**: Apabila sudah selesai klik tombol `Save` pada bagian `Edit` kemudian klik tombol di bagian atas kanan dengan tulisan `Save Changes`. Maka sekarang seharusnya record baru berhasil ditambahkan.

![PowerDNS New Records](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-new-records.png)

### Melalui Command Line Interface atau CLI

Untuk menambahkan atau mengubah record pada suatu zone melalui CLI, kalian bisa menggunakan perintah berikut ini

```shell
pdnsutil edit-zone <domain.tld>
```

Maka akan masuk ke text editor dengan isian file konfigurasi zone tersebut.

![PowerDNS Dashboard CLI](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdnsutil-edit-zone2.png)

Selanjutnya kalian cukup isikan dengan format

```
<name>      <TTL>      IN       <TYPE>      <DATA>
```

Misalkan disini saya akan menambahkan record untuk webserver saya yang berada di ip `172.16.0.133`, sehingga saya menggunakan format berikut ini

```
devnull.co.id   3600    IN      A       172.16.0.133
```

![PowerDNS New Records CLI](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-new-records-cli.png)

Setelah itu exit dan save pada text editor yang gunakan, maka akan muncul sebuah error dan konfirmasi

> **Catatan**: Apabila error yang muncul mengenai `NS` record, maka abaikan saja dulu, karena kita belum menambahkan record tersebut
>
> Record tersebut salah satu yang wajib ada pada sebuah DNS Record, karena record dengan type `NS` itu artinya adalah domain tersebut
> dikelola oleh nameserver tersebut.

Apabila ada konfirmasi tekan `a`. Kemudian akan muncul lagi sebuah konfirmasi untuk melakukan perubahan data Serial di type SOA, cukup tekan `Y`

> **Catatan**: Serial di type `SOA` wajib berubah apabila kalian mengubah record dns
>
> biasanya isian dari Serial ini mempunyai format `YYYYMMDD0X`
>
> - `Y` = Tahun
> - `M` = Bulan
> - `D` = Hari
> - `0X` = Urutan perubahan
>
> Sehingga apabila pertama kali SOA dibuat maka isian dari serial tersebut adalah `YYYYMMDD01` kemudian jika kalian melakukan perubahan
> maka serial nya akan terupdate menjadi `YYYYMMDD02`

Kemudian untuk menyimpan perubahan tersebut tekan `a` kembali.

![PowerDNS Confirm Changes](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/pdns-confirm-changes.png)

### Mengecek apakah DNS Record A nya berjalan atau tidak

Setelah DNS record ditambahkan, selanjutnya kita akan mencoba mengecek apakah record tersebut berjalan atau tidak.

Untuk melakukannya kalian bisa menggunakan package `dig` dengan perintah berikut ini di komputer kalian

> **Catatan**: Pastikan komputer kalian menggunakan dns dari ip address powerdns kalian, sehingga query nya akan mengambil dari powerdns
>
> ![DNS Configure](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/dns-configure.png)

```shell
dig -t <TYPE> <TARGET>
```

![Dig Result](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/dig-result.png)

Nah, apabila sudah resolve bahwa domain `devnull.co.id` itu diarahkan ke ip address `172.16.0.133`, maka sekarang saya bisa membuka nya di URL web broswer, sehingga akan muncul tampilan dari webserver yang sudah saya siapkan.

![Result Domain](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/result-domain.png)

## Menambahkan Record NS untuk Zone

Untuk menambahkannya sama seperti record A bisa melalui PowerDNS Admin ataupun melalui CLI, namun disini `Type` nya yaitu `NS`. Beriku ini
adalah contoh pengisian record NS untuk zone

```shell
<domain.tld>        86400     IN        NS      <ns1.domain.tld>
<domain.tld>        86400     IN        NS      <ns2.domain.tld>
<ns1.domain.tld>    172800    IN        A       <ip_address_primary_dns>
<ns2.domain.tld>    172800    IN        A       <ip_address_secondary_dns>
```

![Add NS Record](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/add-record-ns.png)
![Confirm NS Record](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/confirm-record-ns.png)

### Mengecek apakah DNS Record NS nya berjalan atau tidak

Untuk mengecek nya kalian bisa menggunakan perintah berikut ini

```shell
dig -t NS <TARGET>
```

![Dig NS Result](${NEXT_PUBLIC_PUBLIC_ASSETS}/pdns_records/dig-ns-result.png)
