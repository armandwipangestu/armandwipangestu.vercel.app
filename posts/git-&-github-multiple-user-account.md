---
title: "Git & GitHub - Multiple User Account"
tag: "Git"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan melakukan configurasi agar Git & GitHub dapat multiple user akun"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Generate SSH Keys

Untuk membuat atau mengenerate SSH Keys jalankan command berikut:

```shell
ssh-keygen -t rsa -C "youremail@yourdomain.com"
```

Setelah itu akan muncul prompt pertanyaan:

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa):
```

Prompt tersebut menanyakan PATH file key-nya akan disimpan dimana dan dengan nama apa. Disini saya akan mengisikan `/home/user/.ssh/id_rsa_tutorial` sehingga seperti ini:

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/id_rsa_tutorial
```

Setelah prompt tersebut muncul prompt kembali yang menanyakan passphrase, passphrase ini digunakan untuk melakukan verifikasi password / passphrase ketika nanti melakukan push ke repository GitHub. Passphrase ini optional (dapat dikosongkan) jika tidak di isi maka tidak akan verifikasi password / passphrase ketika nanti melakukan push ke repository GitHub

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/id_rsa_tutorial
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Output membuat SSH Keys

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/id_rsa_tutorial
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/user/.ssh/id_rsa_tutorial
Your public key has been saved in /home/user/.ssh/id_rsa_tutorial.pub
The key fingerprint is:
SHA256:jhvGj38vdcioKKq5eIcT7ptu51u22fZKX0x2YJaSV4s youremail@yourdomain.com
The keys randomart image is:
+---[RSA 3072]----+
|              .  |
|           . + . |
|          o E .  |
|           = .   |
|        S  oo..  |
|  .  . o  .++..  |
| . o  B.o. .o.   |
|..*.++.Xo.o.     |
|=B*Boo=o=+oo.    |
+----[SHA256]-----+
```

Lakukan kembali command ini, untuk membuat SSH Keys yang akan digunakan di akun ke dua atau akun lainnya

> **Catatan**:
>
> Pastikan nama file SSH Keys nya berbeda dengan nama yang sebelumnya, jika sama maka akan di timpa

```shell
ssh-keygen -t rsa -C "youremail2@yourdomain2.com"
```

Sekarang kita mempunyai 2 SSH Keys berbeda yang sudah dibuat:

```shell
~/.ssh/id_rsa_tutorial
~/.ssh/id_rsa_turorial2
```

<a href="https://i.ibb.co/R0xyV5T/Screenshot-2022-01-11-12-14-21-X.png" target="_blank">
   <img src="https://i.ibb.co/R0xyV5T/Screenshot-2022-01-11-12-14-21-X.png" class="img-fluid rounded mx-auto d-block" />
</a>

## Menambahkan SSH Keys baru ke akun GitHub yang dipakai

Kita sudah mempunyai SSH Public Key, selanjutnya kita harus menambahkan Public Key ke dalam akun GitHub agar GitHub akun mempercayai key yang telah kita buat. Menggunakan ini nantinya tidak membutuhkan mengetik username dan password setiap kali melakukan git push.

Copy public key nya dengan command:

```shell
cat ~/.ssh/id_rsa_tutorial.pub
```

dan login kedalam GitHub yang ingin ditambahkan:

1. Pergi ke `Settings`
2. Pilih `SSH and GPG Keys` di menu bagian kiri.
3. Klik dibagian `New SSH Keys`, isikan judul yang sesuai, dan paste public yang sudah di copy tadi di bawahnya
4. Klik `Add key` - dan selesai!

<a href="https://i.ibb.co/X2mfrPK/image.png" target="_blank">
   <img src="https://i.ibb.co/X2mfrPK/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

> **Catatan**:
>
> Lakukan hal yang sama untuk public key yang kedua `~/.ssh/id_rsa_tutorial2.pub` (copy dan daftarkan kedalam akun github)

<a href="https://i.ibb.co/rFDw5Kk/image.png" target="_blank">
   <img src="https://i.ibb.co/rFDw5Kk/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

## Mendaftarkan SSH Keys baru dengan ssh-agent

Untuk menggunakan keys, kita harus mendaftarkannya telebih dahulu menggunakan `ssh-agent` di mesin kita. Pastikan `ssh-agent` telah berjalan menggunakan perintah:

```shell
eval $(ssh-agent -s)
```

Tambahkan keys ke dalam `ssh-agent` seperti ini:

```shell
ssh-add ~/.ssh/id_rsa_tutorial
ssh-add ~/.ssh/id_rsa_tutorial2
```

<a href="https://i.ibb.co/09znr31/image.png" target="_blank">
   <img src="https://i.ibb.co/09znr31/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

Untuk mengecek apakah `keys` nya sudah terdaftar di `ssh-agent` menggunakan command

```shell
ssh-add -l
```

<a href="https://i.ibb.co/68VRdMF/image.png" target="_blank">
   <img src="https://i.ibb.co/68VRdMF/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

Dan untuk menghapus `keys` yang terdaftar di `ssh-agent` menggunakan command:

```shell
ssh-add -D
```

<a href="https://i.ibb.co/Q9MJpJ2/image.png" target="_blank">
   <img src="https://i.ibb.co/Q9MJpJ2/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

</b>

Selanjutnya adalah membuat `ssh-agent` menggunakan SSH Keys untuk SSH Host yang berbeda.

Bagian ini adalah bagian yang penting dan kita mempunyai dua tindakan yang sama yang berbeda (<b>This is the crucial part, and we have two different approaches</b>)

Untuk melakukannya kita menggunakan File Configuration SSH (<a href="#membuat-file-configurasi-ssh"><b>Step 4</b></a>) dan hanya satu yang aktif SSH Key pada `ssh-agent` di waktu yang sama

## Membuat File Configurasi SSH

Disini kita benar - benar menambahkan aturan Configurasi SSH untuk host yang berbeda, menyatakan file identitas mana yang digunakan untuk domain mana.

File Configurasi SSH berada di `~/.ssh/config`. Ubah jika ada atau jika tidak ada kita dapat membuatnya.

```shell
cd ~/.ssh
touch config  # Membuat file jika tidak ada
nvim config   # Membuka file dengan text editor neovim, gunakan text editor yang biasa kalian gunakan
```

Membuat entri configurasi untuk akun GitHub yang sama dengan yang di bawah ini pada file `~/.ssh/config` kalian:

```shell
# Tutorial 1
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_tutorial

# Tutorial 2
Host github.com-tutorial2
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_tutorial2
```

<b>`tutorial2`</b> adalah username github yang akan digunakan nantinya

<b>`github.com-tutorial2`</b> adalah notasi yang akan digunakan untuk membedakan pada multiple Git akun. Kalian juga dapat menggunakan notasi lain, seperti <b>`tutorial2.github.com`</b> Pastikan kalian konsisten dengan nama notasi hostname yang kalian gunakan. Ini berhubungan ketika kalian melakukan clone repository atau ketika kalian set untuk remote origin pada sebuah local repository.

Configurasi diatas befungsi pada `ssh-agent` untuk:

- Menggunakan <b>`id_rsa_tutorial`</b> sebagai kunci untuk apapun Git URL menggunakan `@github.com`
- Menggunakan <b>`id_rsa_tutorial2`</b> sebagai kunci untuk apapun Git URL menggunakan `@github.com-tutorial2`

## Troubleshooting GitHub Authority Commit
