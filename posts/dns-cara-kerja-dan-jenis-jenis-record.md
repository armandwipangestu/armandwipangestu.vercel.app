---
published: true
title: "DNS - Apa itu DNS? Pengertian, Fungsi dan Cara Kerja"
tag: "SysAdmin"
date: "July 11 2023"
excerpt: "Pada artikel ini kita akan membahas apa itu DNS, bagaimana cara kerja DNS dan jenis - jenis record pada DNS"
cover_image: "/images/posts/DNS - Jenis Jenis DNS Record.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Apa Itu DNS

Apa itu DNS? Singkatnya, DNS adalah sebuah sistem yang mengubah URL website atau domain menjadi dalam bentuk IP Address. Dengan DNS,
Anda tek perlu mengetikkan IP Address ketika ingin mengunjungi sebuah website.

DNS adalah sebuah sistem yang menghubungkan `Uniform Resource Locator` atau URL dengan Internet Protocol Address atau IP Address. Kepanjangan dari DNS adalah `Domain Name System`.

Dalam sejarah domain tercatat, awalnya Anda pelu mengetikkan IP Address untuk mengakses sebuah website. Cara ini cukup merepotkan. Sebab, ini artinya, Anda perlu punya daftar lengkap IP Address website yang dikunjungi dan memasukkannya secara manual.

DNS adalah sistem yang meringkas pekerjaan ini untuk Anda. Kini, anda tinggal mengingat nama domain dan memasukkannya kedalam address bar. DNS kemudian akan menerjemahkan domain tersebut ke dalam IP Address yang komputer pahami.

Misalkan, Anda ingin meakses Google. Alih-alih menulis `172.217.194.139` ke dalam address bar, Anda tinggal memasukkanya alamat `google.com`.

Itulah tadi penjelasan tentang pengertian DNS. Lalu, apa fungsi DNS sehingga sistem ini sangat dibutuhkan?

## Fungsi DNS

Penjelasan apa itu DNS di atas sudah bisa membuat Anda menebak bagaimana DNS berfungsi, bukan? Singkatnya, terdapat tiga fungsi dan cara kerja DNS:

- Meminta informasi IP Address sebuah website berdasarkan nama domain.
- Meminta informasi URL sebuah website berdasarkan IP Address yang dimasukkan.
- Mencar server yang tepat untuk mengirimkan email.

Itulah ketiga fungsi DNS yang bekerja secara otomatis ketika anda sedang mengakses internet.

Nah, sebelum masuk ke penjelasan cara kerja DNS, anda perlu bertanya kenapa harus menggunakan DNS?

## Kelebihan DNS

Berikut ini adalah beberapa manfaat penggunaan DNS dalam aktivitas berinternet:

- **Lebih Mudah Untuk Berinternet**: Dibanding mengingat deretan angka IP Address, tentu akan lebih nyaman dan mudah untuk mengingat nama website. Hadirnya DNS telah berhasil menjembatani komunikasi antara pengguna internet dengan komputer. Apalagi jika Anda juga membutuhkan DDNS. DDNS adalah metode untuk memperbarui IP Address secara otomatis di layanan DNS Anda.

- **Lebih Konsisten dalam Penggunaan**: Anda bisa menggunakan nama DNS yang sama meskipun ada perubahan pada IP Address yang digunakan. Dengan demikian, akses pengunjung ke salah satu website tetap bisa dilakukan meskipun telah terjadi penggantian IP Address.

- **Lebih Mudah Dikonfigurasi**: Saat terjadi kendala pada IP Address yang digunakan, Anda bisa mengganti dengan IP yang berbeda dengan mudah. Cukup dengan melakukan update data pencocokan DNS dan IP Address. Ini tentu akan terkait dengan penggunaan DNS Server yang akan dijelaskan lebih lanjut pada Cara Kerja DNS.

- **Lebih Aman**: Ketika menggunakan sistem DNS, semua aktivitas transfer data online akan melalui server DNS yang terjaga keamanannya. Sistem tersebut akan mencegah upaya peretasan yang coba dilakukan oleh pihak tidak bertanggung jawab. Jadi, website akan lebih aman. Ingin lebih aman? Gunakan `DNSSEC`.

- **Lebih Cepat**: Sistem DNS memungkinkan penggunaan DNS Server yang mampu melayani permintaan data lebih cepat. Dengan banyaknya website yang muncul, kecepatan mengakses informasi dari sebuah website menjadi penting.

## Bagian Bagian Domain

Prinsip dasar cara kerja DNS adalah mencocokan nama komponen URL dengan komponen IP Address. Setiap URL dan IP Address memiliki bagian-bagian yang saling menjelaskan satu dengan yang lain. DNS server adalah bagian penting dari proses tersebut.

Ibaratnya, seperti mencari buku di perpustakaan berdasarkan kode yang menjelaskan letak buku teresbut. Kode buku perpustakaan disebut Dewey Decimal System (DDS) yang terdiri dari kode topik buku, kode nama belakang penulis, dan kode tahun buku diterbitkan.

Prinsip di atas mirip dengan DNS. Namun, bagian dari buku diganti menjadi bagian-bagian URL yang tersusun dalam hierarki DNS. Setiap bagiannya menjelaskan bagian domain.

Perbedaan, kode perpustakaan mulai dari depan. Sedangkan, kode pada DNS diurutkan dari belakang. Berikut penjelasan lengkapnya:

![Bagian-Bagian Domain](../images/posts/assets/dns/bagian-bagian-domain.png)

- **Root-Level Domain**: Merupakan bagian tertinggi dari hierarki DNS. Biasanya ia berwujud titik (.) di bagian paling belakang sebuah domain.

Untuk mengecek nya anda bisa menggunakan tool `dig` dengan perintah

```shell
dig -t A <nama_domain.tld>
```

![Root Domain](../images/posts/assets/dns/root-domain.png)

- **Top-Level Domain**: Adalah ekstensi yang berada di bagian depan root-level domain. Terdapat dua jenis `TLD` yang umumnya dipakai. Keduanya, yaitu Generic-Top-Level Domain (`GTLD`) dan Country Code Top Level Domain (`CCLTD`).

  GTLD biasanya menjelaskan sifat institusi dari pemilik web. Katakanlah, website untuk tujuan komersial biasanya memiliki ekstensi `.com` lalu `.edu` untuk institusi pendidikan dan `.gov` untuk lembaga pemerintahan.

  Di sisi lain, CCLTD merupakan ekstensi yang menjelaskan asal negara dari pemilik situs. Misalnya, akhiran `.id` untuk website Indonesia lalu `.au` untuk Australia dan `.uk` untuk Inggris dan sebagainya.

- **Second Level Domain**: Ialah nama lain untuk domain itu sendiri. Ia sering digunakan sebagai identitas institusi atau branding. Dalam kasus URL `www.example.com` yang dimaksud SLD adalah `example`.

- **Third-Level Domain atau Subdomain**: Merupakan bagian dari domain utama yang berdiri sendiri. Apabila domain diibaratkan sebagai rumah, subdomain adalah salah satu ruang khusus di rumah itu sendiri.

- **Hostname**: Atau bisa disebu juga dengan scheme. Ini merupakan bagian yang mengawali sebuah URL. Bagian ini menunjukkan sebuah fungsi dari sebuah website atau halamannya. Contoh paling banyak digunakan, yaitu HTTPS atau Hypertext Transfer Protocol Secure.

Setelah memperlajari pengertian DNS dan Bagian-bagian dari DNS, saatnya mengetahui cara kerja DNS.

## Cara Kerja DNS

![How DNS Work](../images/posts/assets/dns/dns-work.png)

DNS bekerja dalam beberapa tahapan.

- **Langkah Pertama**: Komputer membuka alamat url `domain.com`

- **Langkah Kedua**: Root-Level Domain membaca kemudian mengembalikan nya untuk menanyakan kepada Top-Level Domain dengan ekstensi `.com`.

- **Langkah Ketiga**: Komputer menanyakan domain.com ke Top-Level Domain atau TLD.

- **Langkah Keempat**: Top-Level Domain membaca kemudian mengembalikan nya untuk menanyakan kepada Authoritative Server dari Second-Level domain yaitu `domain`

- **Langkah Kelima**: Komputer menanyakan domain.com ke Authoritative Server.

- **Langkah Keenam**: Authoritative Server mempunyai record dari domain.com yaitu alamat ip address `172.16.0.xxx` dan memberikannya kepada komputer.

> **Catatan**:
>
> Tahapan diatas merupakan tahapan singkat pada DNS Server, apabila untuk kompleks atau lebih lengkapnya terdapat beberapa tahapan lain seperti DNS `Recursion` dll.

## DNS Query

DNS Query merupakan istilah teknis untuk meminta informasi soal IP Address. Tahapan ini dimulai ketika anda mengetikan URL ke Address Bar.

DNS Server adalah yang bertanggung jawab untuk mencari informasi di filehosts. Jika informasi yang dicari tidak ditemukan, server akan berusaha mencari kepingan informasi atau rekam informasi yang pernah tercatat di sistem (cache).

Dalam tahapan awal ini sendiri, terdapat tiga jenis DNS Query. Ketiganya adalah `recursive query`, `iterative query` dan `non-recursive query`. Di bawah ini, Anda bisa temukan pengertiannya.

### Recursive Query

User memberikan hostname yang mana kemudian DNS Resolver harus memberikan jawaban. Ada dua kemungkinan jawaban yang diberikan. Pertama, DNS akan menyediakan informasi relevan setelah mencari di **Root Server** atau **Authoritative Name Server**. Kedua, browser akan menampilkan pesan error karena informasi tak bisa ditemukan.

### Iterative Query

User memasukan hostname. DNS Resolver akan mencari cache yang relevan di memori. Jika tidak berhasil, DNS Resolver akan mencari informasi di **Root Server** dan **Authoritative Name Server** yang paling dekat dan relevan dengan DNS Zone.

### Non Recursive Query

Ini merupakan proses pencarian informasi yang tercepat. Tipe ini tidak memerlukan pencarian di Root Server atau Authoritative Name Server karena data yang dicari tersimpan dalam cache.

## DNS Recursor atau DNS Recursive Resolver

DNS recursor merupakan tahapan pertama pencarian informasi. Ketika user memasukkan URL dan tidak menemukan hasil yang valid di cache, sistem akan mencari informasi dalam cache penyedia internet atau Internet Server Provider (ISP).

## Root Name Server

Katakanlah informasi yang Anda cari tak bisa ditemukan di ISP. Maka kemudian, sistem akan mencari informasi yang Anda butuhkan ke root name server.

Root Name Server merupakan semacam database yang menjawab pertanyaan soal nama domain dan IP Address. Server ini tidak memiliki jawaban tepat untuk informasi yang dicari.

Akan tetapi, server ini bisa meneruskan permintaan informasi ke pihak yang lebih mengetahui. Di dunia ini, terdapat 13 root server yang bekerja. Root Server tersebut diurutkan secara alfabetis dari A sampai M.

Root Server semacam ini dikelola organisasi seperti Internet Systems Consortium, Verisign, ICANN, The Univerisity Of Maryland, and The U.S Army Research Lab.

## TLD Name Server

Dari root name server, sistem akan membaca jenis informasi yang dicari dari top-level domain. Setiap TLD seperti `.com`, `.org`, `.edu`, `.id`, `.au` dan sebagainya memiliki server yang spesifik.

Dengan membaca informasi ini, sistem bisa meneruskan pencarian informasi ke server yang benar-benar memiliki data yang dicari.

## Authoritative Name Server

Setelah menemukan server yang diinginkan, sampailan kita pada Authoritative Name Server. Jenis server satu ini memiiki semua informasi lengkap soal situs web yang dituju.

Ketika informasi yang diminta sesuai dengan hasilnya, maka browser akan menampilkan situs web atau halaman yang Anda minta di awal. Tentu saja hasil pencarian ini memiliki masa waktu tertentu.

Proses pencarian ini akan diulang untuk memastikan informasi yang ditampilkan tetap up-to-date. Namun, tentu saja, beberapa informasi ini disimpan dalam bentuk cache di device untuk berjaga-jaga agar proses query berjalan cepat.

## Macam Macam DNS Record

Informasi yang diminta user dalam sistem DNS disebut DNS Record. Ada beberapa jenis informasi yang bisa diminta dalam sistem DNS. Berikut adalah 10 DNS Record yang paling sering dijumpai:

### A Record atau A Type

A Record atau Address Record, berfungsi untuk menyimpan informasi soal hostname, time to live (TTL) dan IPv4 Address.

![A Type](../images/posts/assets/dns/a-type.png)

Disini saya akan melakukan query dns untuk domain `armandwipangestu.co.id` dengan type `A`. Dan hasil dari query tersebut mengembalikan sebuah alamat ip yaitu `172.16.0.133`

```shell
dig -t A <domain.tld>
```

![Dig A](../images/posts/assets/dns/dig-a.png)

### AAAA Record atau AAAA Type

Sama halnya dengan record A namun pada record ini yang di simpan adalah informasi dari IPv6 Address.

![AAA Type](../images/posts/assets/dns/aaa-type.png)

Disini saya akan melakukan query dns untuk domain `armandwipangestu.co.id` dengan type `AAAA`. Dan hasil dari query tersebut mengembalikan sebuah alamat ip yaitu `::ffff:172.16.0.133`

```shell
dig -t AAAA <domain.tld>
```

![Dig AAA](../images/posts/assets/dns/dig-aaaa.png)

### MX Record atau MX Type

MX atau Mail Exchange merupakan record yang berfungsi untuk menyimpan SMTP (Simple Mail Transfer Protocol) Server yang bertanggung jawab untuk menerima email yang ditunjukan ke suatu domain. MX Record ini menunjukkan alamat IP atau nama host server email yang harus dituju saat mengirim email ke domain tertentu.

![MX Type](../images/posts/assets/dns/mx-type.png)

Disini saya akan melakukan query dns untuk domain `armandwipangestu.co.id` dengan type `MX`. Dan hasil dari query tersebut mengembalikan sebuah alamat domain yaitu `mail.armandwipangestu.co.id`

```shell
dig -t MX <domain.tld>
```

![Dig MX](../images/posts/assets/dns/dig-mx.png)

### CNAME Record atau CNAME Type

CNAME (Canonical Name) Record ini digunakan untuk alias dari domain ataupun subdomain ke sebuah IP Address. Lewat fungsi satu ini, anda tak perlu memperbarui DNS Record.

![CNAME Type](../images/posts/assets/dns/cname-type.png)

Disini saya akan melakukan query dns untuk domain `www.armandwipangestu.co.id` dengan type `CNAME`. Dan hasil dari query tersebut mengembalikan sebuah alamat domain yaitu `armandwipangestu.co.id`

```shell
dig -t CNAME <subdomain.domain.tld>
```

![Dig CNAME](../images/posts/assets/dns/dig-cname.png)

### NS Record atau NS Type

NS (Name Server) merujuk pada subdomain di Authoritative Server. Record ini berfungsi sebagai informasi yang mengelola zona domain yang dituju.

![NS Type](../images/posts/assets/dns/ns-type.png)

Disini saya akan melakukan query dns untuk domain `armandwipangestu.co.id` dengan type `NS`. Dan hasil dari query tersebut mengembalikan sebuah alamat domain yaitu `ns1.armandwipangestu.co.id`

```shell
dig -t NS <domain.tld>
```

![Dig NS](../images/posts/assets/dns/dig-ns.png)

### PTR Record atau PTR Type

PTR (Pointer) memberikan izin pada DNS Resolver untuk menyediakan informasi soal IP Address dan menampilkan hostname (reverse DNS lookup).

Pada record ini format penulisan ip address dibalik kemudian ditambahkan text `in-addr.arpa`. Misalkan alamat ip address nya adalah `172.16.0.133` maka penulisan pada PTR record ini menjadi `133.0.16.172.in-addr.arpa`. Namun untuk penulisan zone nya disini cukup memasukan network dari address nya. Apabila ip address nya adalah `172.16.0.133/24` maka penulisan zone nya disini adalah `0.16.172.in-addr.arpa`.

![PTR Type](../images/posts/assets/dns/ptr-type.png)

Disini saya akan melakukan query dns untuk ip address `172.16.0.133` dengan type `PTR`. Dan hasil dari query tersebut mengembalikan sebuah alamat domain yaitu `armandwipangestu.co.id`

```shell
dig -x <ip_address>
```

![Dig PTR](../images/posts/assets/dns/dig-ptr.png)

### SOA Record atau SOA Type

SOA (Start of Authority) record adalah jenis catatan DNS yang mengidentifikasikan otoritas utama (authority) atas zona DNS tertentu. Setiap zona DNS. seperti domain tunggal, memiliki SOA record yang menunjukkan server DNS yang berwenang untuk zona tersebut.

SOA record berisi informasi penting yang mengontrol zona DNS, diantaranya:

- **NS (Name Server)**: Menunjukkan nama server DNS utama yang bertanggung jawab atas zona DNS tersebut.

- **Email Address atau Contact**: Menunjukkan alamat email atau contact administrator zona DNS

- **Serial Number**: Menunjukkan nomor versi zona DNS. Ketika ada perubahan pada zona DNS, nomor versi ini harus ditingkatkan untuk memberi tahu server lain tentang perubahan tersebut.

- **Refresh**: Menunjukkan berapa kali zona DNS harus diperbarui (direfresh) dalam hitungan detik.

- **Retry**: Menunjukkan berapa kali server DNS harus mencoba mengulang (retry) refresh jika ada kegagalan.

- **Expire**: Menunjukkan berapa lama zona DNS dianggap valid sebelum perlu direfresh kembali (expire) dalam hitungan detik.

- **TTL**: Time to Live menunjukkan berapa lama waktu minimum yang digunakan oleh server lain untuk menyimpan salinan dari catatan DNS dalam hitungan detik.

SOA record sering ditempatkan di atas file zona DNS dan menjadi catatan pertama dalam zona tersebut. Setiap kali ada perubahan pada zona DNS, seperti penambahan atau penghapusan catatan DNS, nomor seri SOA record harus ditingkatkan untuk memastikan bahwa perubahan tersebut dapat disebarluaskan ke server DNS lainnya.

> **Catatan**:
>
> SOA record adalah salah satu komponen penting dalam manajemen zona DNS. Record ini mengontrol otoritas utama atas zona DNS dan memperngaruhi bagaimana server DNS lainnya berinteraksi dengan zona tersebut.

![SOA Type](../images/posts/assets/dns/soa-type.png)

Disini saya akan melakukan query dns untuk domain `armnandwipangestu.co.id` dengan type `SOA`. Dan hasil dari query tersebut mengembalikan sebuah alamat domain yaitu `ns1.armandwipangestu.co.id`.

```shell
dig -t SOA <domain.tld>
```

![Dig SOA](../images/posts/assets/dns/dig-soa.png)

## Penutup

Melalui artikel ini, Anda jadi tahu apa itu DNS. Intinya, DNS adalah sistem yang memudahkan Anda dalam melakukan browsing di internet. Anda tidak pelu mengingat alamat website dalam angka. Anda cukup menuliskan nama domain yang ingin anda buka dan DNS akan menerjemahkannya ke alamat IP tujuan Anda.

Di artikel ini, Anda juga belajar apa saja fungsi DNS dan bagian-bagian di dalamnya. Tak kalah penting, Anda jadi paham bagaimana sistem DNS dan DNS server bekerja mendukung akses internet. Semua proses di atas bisa berjalan dalam waktu sepersekian milidetik. Ajaib, bukan?
