---
published: true
title: "Git & GitHub - Menambahkan SSH Key"
tag: "Git"
date: "October 31 2023"
excerpt: "GitHub saat ini wajib menggunakan SSH Public atau Private keypair untuk melakukan autentikasi dari local (git) ke remote (github), oleh karena itu pada artikel kali ini saya akan membahas bagaimana cara generate SSH key nya."
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada artikel kali ini saya akan mencontohkan pada sistem operasi Windows dan Linux.

## Linux

Pada artikel ini dibuat saya menggunakan linux distribusi archlinux, namun jangan khawatir karena untuk mengenerate SSH key pada distribusi lain juga akan kurang lebih sama.

### Generating SSH Key

Untuk melakukan generate SSH key, kalian bisa jalankan perintah berikut ini:

> **Catatan**: Ganti `your@email.com` dengan email valid akun github kalian

```shell
ssh-keygen -t rsa -b 4096 -C "your@email.com"
```

Setelah perintah diatas dijalankan, maka akan muncul sebuah prompt untuk menyimpan lokasi hasil generate SSH key, default atau bawaan lokasi penyimpanan nya tersimpan di `~/.ssh/id_rsa` atau `/home/user/.ssh/id_rsa`, disini saya akan biarkan secara default saja. Sehingga cukup tekan enter atau kosongkan

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (/home/devnull/.ssh/id_rsa):
```

Selanjutnya akan muncul sebuah prompt untuk memasukan `passphrase` atau kata sandi, passphrase disini berfungsi untuk melakukan autentikasi tambahan, misalkan ketika kita akan melakukan `git fetch`, `git pull` atau `git push` maka anda harus memasukan passphrase nya (jika anda memasukan passphrase nya disini). Disini saya akan kosongkan saja, sehingga cukup tekan enter

```shell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Maka sekarang akan muncul informasi bahwa SSH key berhasil dibuat

> **Catatan**: Hasil dari SSH key yang di generate akan muncul 2 buat key, yang pertama adalah private key dengan nama file `id_rsa` dan yang kedua adalah public key dengan nama file `id_rsa.pub`. Nah yang akan kita export atau kita simpan kedalam GitHub adalah yang public key.

```shell
Your identification has been saved in /home/devnull/.ssh/id_rsa
Your public key has been saved in /home/devnull/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:o/0cxLhJ8s279vgg2hrBtXkmfFzmmvfrfOFjkyU6imn your@email.com
The key's randomart image is:
+---[RSA 4096]----+
|                 |
|                 |
|                 |
|          o E .  |
|      . S. + = o |
|  .  + oo.o . X  |
|. .+o.+  * . * o |
|.*.o++= . o + +..|
|=.o+B*.o..  .+++o|
+----[SHA256]-----+
```

### Enable SSH Agent

SSH Agent disini berfungsi untuk mengatur variabel-variabel lingkungan yang diperlukan oleh SSH Agent, sehingga kalian dapat menggunakan SSH key kalian dengan lebih mudah tanpa harus memasukan kata sandi atau passphrase setiap kali kalian terhubung ke server yang memerlukan autentikasi SSH.

> **Catatan**: Simpel nya disini SSH Agent akan menyimpan passphrase, sehingga kalian cukup memasukan passphrase ketika pertama kali saja. Apabila terdapat autentikasi yang berhubungan dengan SSH key kembali, kalian tidak perlu mengisikan passphrase kembali.

```shell
eval $(ssh-agent -s)
```

Hasil dari perintah diatas akan muncul sebuah output mengenai PID

```shell
Agent pid 9613
```

### Menambahkan private key untuk masuk kedalam SSH Agent

Setelah sebelumnya kita mengaktifkan SSH Agent, selanjutnya kita perlu masukan list private key yang akan dimasukan kedalam SSH Agent nya

```shell
ssh-add ~/.ssh/id_rsa
```

Hasil dari perintah diatas akan muncul sebuah output bahwa idetify tersebut sudah ditambahkan

```shell
Identity added: /home/devnull/.ssh/id_rsa (your@email.com)
```

### Copy Public Key dan Paste ke Github Account

Setelah private key kita tambahkan kedalam SSH Agent, selanjutnya kita copy paste public key untuk disimpan di GitHub, untuk melakukannya kalian bisa tampilkan isi dari public key nya menggunakan perintah berikut ini:

```shell
cat ~/.ssh/id_rsa.pub
```

Setelah public key muncul, kalian select dan copy kemudian pergi ke GitHub, kemudian pergi ke menu `Settings` > `SSH and GPG Keys` > `New SSH Key`. Untuk pada kolom title, kalian isikan sesuai dengan yang kalian inginkan (misalkan disini saya akan memberikan title `SSH Key ArchLinux`), kemudian paste kan public key yang sudah di copy sebelumnya.

![GitHub Add SSH Key](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/github-add-ssh-key.png)

Selanjutnya cukup tekan tombol `Add SSH Key`. Maka sekarang akan muncul list SSH key yang sudah ditambahkan

![List SSH Key](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/list-key.png)

### Mencoba menggunakan SSH key

Untuk mencoba nya kalian bisa menggunakan perintah `git fetch`, `git pull` atau `git push`. Disini saya akan mencoba melakukan commit dan push pada repository
