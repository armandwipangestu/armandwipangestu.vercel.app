---
published: true
title: "Git & GitHub - Menambahkan SSH Key"
tag: "Git"
date: "October 31 2023"
excerpt: "GitHub saat ini wajib menggunakan SSH Public atau Private keypair untuk melakukan autentikasi dari local (git) ke remote (github), oleh karena itu pada artikel kali ini saya akan membahas bagaimana cara generate SSH key nya."
cover_image: "/images/posts/Git Github - SSH key.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada artikel kali ini saya akan mencontohkan pada sistem operasi Windows dan Linux.

## Persyaratan

Sebelum anda melakukan Generate SSH Key, pastika anda sudah menginstall software atau package-package pendukung, seperti:

- Git
- OpenSSH

### Git

> **Catatan**: Pastikan pada langkah instalasi mengenai pemilihan `SSH executable` nya di ceklis

Kalian bisa mendownload software git pada situs resmi nya disini [git-scm.com/downloads](https://git-scm.com/downloads)

### OpenSSH

Terdapat 3 cara untuk install OpenSSH pada sistem operasi Windows

- Download dan Menjalankan Git untuk Windows Installer

1. Setelah mendownload dan meingstall software git sebelumnya, pada tahap instalasi terdapat pemilihan `SSH executable` pastikan di ceklis
2. Setelah instalasi selesai, sekarang buka `Git Bash` melalui start menu. Setelah terminal terbuka, jalankan perintah beriku ini untuk mengecek apakah OpenSSH sudah terinstall atau belum

```shell
ssh -V
```

Maka akan muncul output tulisan mengenai versi dari OpenSSH nya.

![Git Bash SSH Version](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/git-bash-ssh-version.png)

- Download Git menggunakan winget untuk Windows Installer

1. Cek winget apakah sudah terinstall atau belum dengan cara membuka terminal `PowerShell` kemudian ketikan perintah berikut ini:

```pwsh
winget -v
```

2. Untuk menginstall Git for Windows menggunakan winget, jalankan perintah berikut ini:

```pwsh
winget install --id Git.Git -e --source winget
```

3. Setelah instalasi selesai, sekarang buka `Git Bash` melalui start menu. Setelah terminal terbuka, jalankan perintah beriku ini untuk mengecek apakah OpenSSH sudah terinstall atau belum

```shell
ssh -V
```

Maka akan muncul output tulisan mengenai versi dari OpenSSH nya.

- Install OpenSSH Windows Version

Untuk menginstal OpenSSH versi Windows, ikuti instruksi dalam panduan [Get Started with OpenSSH for Windows guide](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse) di Microsoft Docs. Setelah OpenSSH diinstal, Anda perlu mengkonfigurasi Git untuk menggunakan OpenSSH.

Di PowerShell, periksa apakah OpenSSH telah berhasil diinstal dengan menjalankan perintah berikut:

```pwsh
ssh -V
```

Maka akan muncul output tulisan mengenai versi dari OpenSSH nya.

Untuk menemukan dimana SSH disintal, jalankan perintah berikut ini:

```pwsh
Get-Command ssh
```

maka hasilnya akan seperti ini:

```pwsh
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     ssh.exe                                            8.6.0.1    C:\Windows\System32\OpenSSH\ssh.exe
```

Untuk mengonfigurasi Git agar menggunakan OpenSSH versi Windows, perbarui perintah SSH dengan git config, seperti:

```pwsh
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

## Windows

Pada artikel ini dibuat saya menggunakan Windows 11, namun apabila kalian menggunakan windows 10 tidak usah khawatir karena untuk mengenerate SSH key nya kurang lebih sama.

### Generating SSH Key

Untuk melakukan generate SSH key, kalian bisa jalankan perintah berikut ini pada terminal seperti `CMD`, `Git Bash` atau `Powershell`:

> **Catatan**: Ganti `your@email.com` dengan email valid akun github kalian

```shell
ssh-keygen -t rsa -b 4096 -C "your@email.com"
```

Setelah perintah diatas dijalankan, maka akan muncul sebuah prompt untuk menyimpan lokasi hasil generate SSH key, default atau bawaan lokasi penyimpanan nya tersimpan di `~/.ssh/id_rsa` atau `C:\Users\user/.ssh/id_rsa`, disini saya akan biarkan secara default saja. Sehingga cukup tekan enter atau kosongkan

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\user/.ssh/id_rsa):
```

Selanjutnya akan muncul sebuah prompt untuk memasukan `passphrase` atau kata sandi, passphrase disini berfungsi untuk melakukan autentikasi tambahan, misalkan ketika kita akan melakukan `git fetch`, `git pull` atau `git push` maka anda harus memasukan passphrase nya (jika anda memasukan passphrase nya disini). Disini saya akan kosongkan saja, sehingga cukup tekan enter

```shell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

Maka sekarang akan muncul informasi bahwa SSH key berhasil dibuat

> **Catatan**: Hasil dari SSH key yang di generate akan muncul 2 buat key, yang pertama adalah private key dengan nama file `id_rsa` dan yang kedua adalah public key dengan nama file `id_rsa.pub`. Nah yang akan kita export atau kita simpan kedalam GitHub adalah yang public key.

```shell
Your identification has been saved in C:\Users\user/.ssh/id_rsa
Your public key has been saved in C:\Users\user/.ssh/id_rsa.pub
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

![SSH Keygen Windows](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/ssh-keygen-windows.png)

### Enable SSH Agent

Untuk mengizinkan git menggunakan SSH key, SSH Agent harus berjalan di perangkat. Metode untuk memulai SSH Agent bergantung pada cara OpenSSH diinstal.

#### Git for Windows users (including Winget Based Git installations)

Pada terminal git bash, cek apakah SSH Agent berjalan atau tidak menggunakan perintah `ps`. Jika `ssh-agent` telah berjalan, maka akan muncul output seperti berikut ini:

```shell
361       1     361      11876  ?         197609 11:56:04 /usr/bin/ssh-agent
```

Untuk menjalankan SSH Agent, jalankan perintah berikut ini:

```shell
eval $(ssh-agent)
```

#### Windows OpenSSH users

Pada terminal PowerShell, cek apakah SSH Agent nya berjalan atau tidak menggunakan perintah `Get-Service`:

```pswh
Get-Service ssh-agent
```

Jika service tidak berjalan maka akan muncul output seperti berikut ini:

```pwsh
Status   Name               DisplayName
------   ----               -----------
Stopped  ssh-agent          OpenSSH Authentication Agent
```

Untuk menjalankan SSH Agent, gunakan perintah berikut ini:

```pwsh
Start-Service ssh-agent
```

Untuk konfigurasi SSH Agent agar memulai setiap kali perangkat dimulai, gunakan perintah `Set-Service`, berikut ini:

```pwsh
Set-Service -Name sshd -StartupType 'Automatic'
```

### Menambahkan Private Key Kedalam SSH Agent

Setelah sebelumnya kita mengaktifkan SSH Agent, selanjutnya kita perlu masukan list private key yang akan dimasukan kedalam SSH Agent nya dengan perintah berikut:

```shell
ssh-add ~/.ssh/id_rsa
```

Hasil dari perintah diatas akan muncul sebuah output bahwa idetify tersebut sudah ditambahkan

```shell
Identity added: /c/Users/user/.ssh/id_rsa (your@email.com)
```

### Copy Public Key dan Paste ke Github Account

Setelah private key kita tambahkan kedalam SSH Agent, selanjutnya kita copy paste public key untuk disimpan di GitHub, untuk melakukannya kalian bisa tampilkan isi dari public key nya menggunakan perintah `cat` pada terminal git bash, seperti berikut ini:

```shell
cat ~/.ssh/id_rsa.pub
```

![Git Bash Public Key](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/git-bash-public-key.png)

Setelah public key muncul, kalian select dan copy kemudian pergi ke GitHub, kemudian pergi ke menu `Settings` > `SSH and GPG Keys` > `New SSH Key`. Untuk pada kolom title, kalian isikan sesuai dengan yang kalian inginkan (misalkan disini saya akan memberikan title `SSH Key Windows 11`), kemudian paste kan public key yang sudah di copy sebelumnya.

![GitHub Add SSH Key Windwos](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/github-add-ssh-key-windows.png)

Selanjutnya cukup tekan tombol `Add SSH Key`. Maka sekarang akan muncul list SSH key yang sudah ditambahkan

![List Key Windows](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/list-key-windows.png)

### Mencoba Menggunakan SSH Key

Untuk mencoba nya kalian bisa menggunakan perintah `git fetch`, `git pull` atau `git push`. Disini saya akan mencoba melakukan commit dan push pada repository

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

![Test SSH Key](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/test-ssh-key.png)

Maka sekarang pada bagian list SSH key nya, key yang digunakan akan menjadi berwarna hijau dan akan ada keterangan kapan terakhir digunakan

![Update List SSH Key](${NEXT_PUBLIC_PUBLIC_ASSETS}/git-dan-github-menambahkan-ssh-key/update-list-key.png)

## Penutup

Saya rasa cukup mudah bukan untuk menambahkah SSH Key pada git (local) dan github (remote).
