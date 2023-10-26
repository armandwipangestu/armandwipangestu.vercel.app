---
published: true
title: "Email - Protokol Email Yang Wajib Diketahui"
tag: "SysAdmin"
date: "August 15 2023"
excerpt: "Pada artikel ini kita akan membahas protokol email apa saja yang wajib diketahui"
cover_image: "/images/posts/Email - Protokol Email Yang Wajib Diketahui.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Sebelum kita melakukan setup seperti instalasi dan konfigursai sesuatu hal, dalam hal ini adalah mail server. Alangkah baiknya kita mengetahui
terlebih dahulu cara kerja, kegunaan, kelebihan dan kekurangan disetiap protokol yang akan digunakan.

Dalam hal ini terdapat beberapa protokol yang sering digunakan di mail server, yaitu:

- SMTP
- POP3
- IMAP

## SMTP

SMTP atau `Simple Mail Transfer Protocol` merupakan protokol email yang digunakan untuk mengirim sebuah email. Protokol ini memiliki satu set perintah yang meng-autentikasi dan mengarahkan transfer email.

Untuk mempermudah mengingat apa yang dilakukan SMTP, lihat saja pada akronim atau singkatannya.

| S       | M    | T   | P      |
| ------- | ---- | --- | ------ |
| Sending | Mail | To  | People |

Sebagai contoh jika Anda mengirimkan sebuah email menggunakan email client, seperti microsoft outlook dan ketika Anda menekan tombol kirim, email akan melakukan perjalanan atau terkirim dari komputer Anda ke mail server menggunakan protokol SMTP ini. Maka dari itu mail server ini juga dapat disebut atau merupakan sebuah SMTP Server.

![Send Email](${NEXT_PUBLIC_PUBLIC_ASSETS}/protokol_email/sending_email.png)

Sebagai contoh jika Anda menggunakan gmail untuk SMTP Server nya maka address yang harus di isi adalah `smtp.gmail.com` dan SMTP Server akan mengirimkan pesan ke penerima atau tujuan menggunakan SMTP

![Mail Work](${NEXT_PUBLIC_PUBLIC_ASSETS}/protokol_email/mail_work.png)

Kemudian email akan bertahan di mail server penerima hingga user login menggunakan email dan men-download email menggunakan POP3 atau IMAP, atau mereka juga dapat melihat email secara langsung di server menggunakan webmail.

Untuk jenis protokol jaringan yang digunakan SMTP ini adalah TCP.

Kesimpulannya adalah pada dasarnya SMTP ini seperti mailman atau pengatar pos. Mailman membawa email dari mailbox Anda di rumah kemudian menemukan jalur yang tepat dan mengirimkan ke destinasi mailbox.

## POP3 dan IMAP

2 protokol tersebut merupakan protokol yang digunakan untuk menerima sebuah email dari mail server, sebagai contoh jika Anda menggunakan email client seperti microsoft outlook, Anda harus melakukan konfigurasi outlook menggunakan POP3 atau IMAP untuk menerima sebuah email pada komputer Anda.

Anda juga dapat menggunakan protokol ini pada tablet atau smartphone untuk menerima email. Anda dapat menggunakan salah satu dari protokol tersebut. Pilihannya ada di tangan Anda.

Namun terdapat pertanyaan, "_Protokol mana yang harus Saya gunakan? apakah salah satunya lebih baik dari yang lain?_"

### POP3

POP3 merupakan akronim atau singkatan dari `Post Office Protocol 3`. POP3 adalah protokol yang simpel dari kedua hal tersebut (POP3 dan IMAP) karena POP3 akan melakukan download email ke dalam device atau perangkat Anda dari sebuah mail server.

Dan hal tersebut hanya akan mendownload apa yang ada di folder inbox, yang dimana itu adalah email Anda dan itu cukup bagus bukan? karena tidak akan mendownload folder lain atau konten lain. Jadi tidak akan mendownload folder seperti `Sent`, `Items`, `Drafts`, `Deleted Email` Anda.

Karena hanya mendownload apa yang ada di folder inbox maka dari itu POP3 tidak akan melakukan segala jenis sinkronisasi.

Sebagai contoh:

> **Catatan**:
>
> Disini login akun email yang sama namun berbeda device atau perangkat

| User1                                                                 | User2                                                                 |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![User1](${NEXT_PUBLIC_PUBLIC_ASSETS}/protokol_email/mail_user_1.png) | ![User2](${NEXT_PUBLIC_PUBLIC_ASSETS}/protokol_email/mail_user_2.png) |

Secara default atau bawaan ketika menggunakan POP3, email akan dihapus di sisi mail server ketika terdownload pada sebuah device atau perangkat, sehingga _tidak ada copy_ email atau tersimpan di sisi server.

Maka apa yang akan terjadi? ketika terdapat sebuah email baru ke mail server, jika device atau perangkat di User1 mengecek email terlebih dahulu (dari pada User2) maka User1 akan menerima emailnya. Namun pada device atau perangkat lainnya tidak akan menerima email karena sudah di download (tidak ada copy) email disisi server.

Namun kebanyakan email client, terdapat sebuah konfigurasi untuk mengaktifkan copy di sisi server sehingga setiap device atau perangkat dapat menerima email.

### IMAP

IMAP merupakan akronim atau singkatan dari `Internet Message Access Protocol`. IMAP juga sama halnya dengan POP3 yaitu protokol yang berfungsi untuk menerima email namun IMAP sedikit berbeda dengan POP3.

IMAP menginzinkan Anda melihat email dari server untuk multiple device atau perangkat dan email tersebut disimpan di server dan juga disimpan di _local cache_ untuk copy email di semua device atau perangkat. Tentu dengan sinkronisasi semua folder Anda dan semua hal didalamnya.

Sebagai contoh:

> **Catatan**:
>
> Disini login akun email yang sama namun berbeda device atau perangkat

| User1                                                                 | User2                                                                      |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![User1](${NEXT_PUBLIC_PUBLIC_ASSETS}/protokol_email/mail_user_1.png) | ![User2](${NEXT_PUBLIC_PUBLIC_ASSETS}/protokol_email/mail_user_2_imap.png) |

Jadi ketika Anda membuka email di komputer, tablet, dan smartphone maka email tersebut akan persis sama karena semua nya tersinkronisasi.

Sebagai contoh jika Anda menghapus email di User1 maka pada User2 juga akan ikut terhapus emailnya.

Atau contoh lain, jika Anda menghapus email di User2 maka pada mail server dan User1 akan ikut terhapus juga.

Dan ketika terdapat email baru di mail server, karena semua device atau perangkat sinkron ke mail server maka email baru tersebut akan muncul di semua device atau perangkat.

Atau contoh lain jika membuat custom folder di User1 dengan nama folder `Job`. Dikarenakan Anda menggunakan IMAP, maka folder dan semua konten tersebut akan bertambah dan sinkron di device atau perangkat lain juga. Jadi setiap komputer, tablet, dan smartphone yang Anda miliki akan mempunyai email yang persis sama dan folder struktur dan lainnya. Jadi itulah bagaimana cara IMAP bekerja.

## Perbandingan Antara POP3 dan IMAP

Terdapat beberapa perbandingan antara protokol POP3 dan IMAP, berikut adalah beberapa perbandinngannya:

### POP3

- Folder struktur berbeda antara 2 email client karena POP3 hanya mendownload konten yang ada di folder inbox.
- Tidak adanya atau tidak melakukan sinkronisasi folder, itulah mengapa email dan folder struktur berbeda.

### IMAP

- Namun di IMAP semua nya sama, email dan struktur folder sinkron semua dengan semua device atau perangkat yang Anda miliki.

## Kelebihan dan Kekurangan

Pertanyaannya adalah, "_protokol mana yang harus Saya gunakan?"_

Jawabannya adalah _semua hal tersebut tergantung pada situsasi dan kebutuhan Anda_.

### Kelebihan dan Kekurangan POP3

| Kelebihan                                                                                                                                                                                                                | Kekurangan                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bagus jika hanya ingin menerima email dari satu device atau perangkat.                                                                                                                                                   | Ketika email dihapus di sisi server dan di download kedalam device atau perangkat, Anda harus menyiapkan rencana untuk melakukan backup email jika sesuatu hal yang buruk terjadi pada device atau perangkat Anda seperti crash atau hilang. |
| Anda dapat melihat email bahkan jika tidak mempunyai koneksi internet, karena POP3 melakukan download email sehingga koneksi internet dibutuhkan hanya ketika ingin menerima email baru atau mengirim sebuah email baru. | Device atau perangkat lebih rentan terhadap virus karena email di download sepenuhnya.                                                                                                                                                       |
| Hemat storage di sisi server, karena email di delete dan di download kedalam device atau perangkat sehingga beban penyimpanan di simpan di sisi client.                                                                  |                                                                                                                                                                                                                                              |

### Kelebihan dan Kekurangan IMAP

| Kelebihan                                                                                                                                                                  | Kekurangan                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bagus jika ingin menerima email lebih daru satu device atau perangkat.                                                                                                     | Email tidak dapat dilihat tanpa koneksi internet (karena IMAP hanya cache local copy email di device atau perangkat Anda, alih-alih mendownload nya). Namun terkadang beberapa email client memberikan opsi untuk mengaktifkan IMAP mendownload email ke device atau perangkat alih-alih hanya menyimpannya di cache. |
| Semua email disimpan di sisi server.                                                                                                                                       |                                                                                                                                                                                                                                                                                                                       |
| Ketika Anda membuka email menggunakan email client atau webmail, Anda dapat melihat semua email termasuk `Items`, `Drafts`, `Deleted Items`, dan semua custom folder Anda. |                                                                                                                                                                                                                                                                                                                       |
| Semua email dan folder tersinkronisasi.                                                                                                                                    |                                                                                                                                                                                                                                                                                                                       |

## Kesimpulan

Setelah Anda mengetahui cara kerja, kelebihan, dan kekurangan pada setiap protokol email diatas. Maka pada tahap melakukan setup seperti instalasi dan konfigurasi
seharusnya akan mempermudah proses tersebut dan ketika ingin menggunakan antara protokol POP3 atau IMAP disisi client maka Anda sudah dapat menyesuaikannya dengan kondisi dan kebutuhannya.
