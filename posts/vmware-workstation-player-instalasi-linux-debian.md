---
published: true
title: "VMware Workstation Player - Instalasi Linux Debian"
tag: "SysAdmin"
date: "February 17 2024"
excerpt: "Pada artikel kali ini kita akan mencoba melakukan instalasi Linux Debian pada Virtual Machine yang sudah dibuat pada pembahasan sebelumnya."
cover_image: "/images/posts/VMware Workstation Player - Instalasi Linux Debian.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan sebelumnya kita sudah berhasil mencoba membuat sebuah Virtual Machine (VM) dengan sistem operasi Linux Debian. Pada artikel kali ini kita akan melanjutkan proses tersebut yaitu melakukan instalasi pada sistem operasi virtual machine nya.

## Instalasi Linux Debian

Untuk memulai instalasi Linux Debian nya, disini kita perlu menghidupkan terlebih dahulu Virtual Machine (VM) nya. Untuk menghidupkannya caranya cukup mudah yaitu tinggal click tulisan `Play virtual machine`.

![Play Virtual Machine](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/play-virtual-machine.png)

Maka sekarang seharusnya muncul tampilan `Debian GNU/Linux installer menu (BIOS mode)`.

![Installer Menu](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/installer-menu.png)

Pada menu tersebut, kita pilih `Graphical install`.

### Select a language

Pada tahap ini kita perlu memilih bahasa yang akan digunakan selama proses instalasi berjalan. Pemilihan bahasa pada bagian ini juga akan digunakan sebagai bahasa bawaan (default) ketika sistem nya berhasil di install.

Disini saya akan pilih `English`

![Select a language](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/select-a-language.png)

### Select your location

Pada tahap ini kita perlu memilih lokasi yang akan digunakan sebagai zona waktu (time zone). Time zone ini contohnya bisa membantu memilih system locale. Biasanya lokasi ini dipilih berdasarkan negara yang kalian tinggali.

Dikarenakan pada list nya tidak ada negara `Indonesia` maka disini kita pilih `Other > Asia > Indonesi`

![Select your location](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/select-your-location.png)

### Configure locales

Pada proses ini Linux Debian mengacu pada penentuan pengaturan regional dan bahasa sistem. Saat kalian memilih opsi configure locales, kalian diberikan pilihan untuk menentukan pengaturan regional yang sesuai dengan preferensi kalian. Salah satu pilihan yang umum digunakan dan tersedia adalah `United States - en_US.UTF-8`.

Pilihan tersebut menetapkan lokalisasi ke wilayah Amerika Serikat dengan pengaturan bahasa Inggris (en) dan karakter set UTF-8. Kalian memilih konfigurasi ini jika ingin menggunakan bahasa Inggris dalam sistem operasi nya dengan dukungan UTF-8 untuk mendukung karakter internasional dan simbol khusus.

Memilih configure locales yang tepat penting untuk memastikan kesesuaian sistem dengan preferensi bahasa dan regional user, serta memastikan dukungan karakter yang memadai untuk aplikasi dan layanan yang akan dijalankan di sistem operasi Debian.

Disini saya akan pilih `United States - en_US.UTF-8` saja karena umum digunakan dan saya rasa juga agak cukup aneh jika melihat error log atau apapun itu dalam bahasa Indonesia.

![Configure locales](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-locales.png)

### Configure the keyboard

Pada langkah selanjutnya setelah configure locales, kalian akan dihadapkan pada menu `Configure the Keyboard`. Disini, kalian akan diminta untuk menentukan layout atau tata letak keyboard yang sesuai dengan preferensi kalian. Pemilihan tata letak keyboard ini penting karena akan memastikan konsistensi dalam pengetikan karakter dan simbol. Kalian dapat memilih dari berbagai tata letak keyboard, termasuk yang sesuai dengan bahasa dan preferensi regional nya. Sebagai contoh, untuk tata letak keyboard Amerika Serikat, kalian mungkin memilih `American English` atau `English (US)`. Pilihan tata letak keyboard yang benar akan memastikan bahwa dapat berinteraksi dengan sistem secara efisien sesuai dengan konfigurasi keyboard yang dipilih.

Dikarenakan kebanyakan menggunakan tata letak keyboard standar amerika. Disini saya akan pilih `American English` saja untuk konfigurasi keyboard yang akan digunakan.

![Configure the keyboard](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-keyboard.png)

### Configure the network

Pada tahap ini kalian akan diminta untuk memasukan nama hostname yang akan digunakna oleh sistem. Hostname adalah sebuah kalimat yang menjadikan ciri atau identitas dari sistem kita pada sebuah network atau jaringan.

Jika kalian tidak tahu hostname ini harus di isi dengan apa, kalian bisa coba konsultasikan pada network administrator. Namun, jika kalian sedang melakukan setup untuk home network, kalian bisa membuatnya disini.

Disini saya akan gunakan nama `debian` saja.

![Configure the network](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-network.png)

Pada menu selanjutnya kita perlu mengisikan nama domain yang akan digunakan pada sistem kita. Nama domain adalah bagian dari alamat internet kalian di hostname yang tepat. Namun, biasanya konfigurasi nama domain ini dilakukan setelah proses instalasi selesai. Sehingga akan saya kosongkan saja.

![Configure the network 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-network-2.png)

### Set up users and passwords

Pada tahap ini kalian akan diminta untuk mengisikan beberapa informasi seperti:

- Root password
- Full name for the new user
- Username for your account
- Password for the new user

Kalian bisa diisikan sesuai dengan preferensi yang kalian inginkan.

#### Root password

![Set up users and passwords root password](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/set-up-users-and-passwords-root-password.png)

#### Full name for the new user

![Set up users and passwords full name for the new user](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/set-up-users-and-passwords-full-name-for-the-new-user.png)

#### Username for your account

![Set up users and passwords username for your account](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/set-up-users-and-passwords-username-for-your-account.png)

#### Choose a password for the new user

![Set up users and passwords choose a password](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/set-up-users-and-passwords-choose-a-password.png)

### Configure the clock

Setelah melakukan setup root password dan user yang akan digunakan pada sistem. Selanjutnya kita diminta untuk melakukan konfigurasi waktu yang akan digunakan pada sistem.

Disini saya akan memilih `Western (Sumatra, Jakarta, Java, West and Central Kalimantan)`.

![Configure the clock](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-clock.png)

### Partition disks

Pada tahap ini kita bisa memilih partisi yang akan digunakan pada penyimpanan sistem operasi kita. Dikarenakan Virtual Machine ini diperuntukan yang cukup simpel dan tidak ada perilaku khusus, maka saya akan pilih `Guided - use entire disk`.

> **Catatan**:
>
> Namun jika kalian ingin melakukan custom partisi kalian bisa pilih `Manual` atau lainnya.

![Partition Disks](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/partition-disks.png)

![Partition Disks 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/partition-disks-2.png)

Selanjutnya terdapat skema yang akan digunakan seperti

- Gabungkan semua file pada satu partisi (rekomended untuk user baru)
- Pisahkan partisi untuk `/home`
- Pisahkan partisi untuk `/home`, `/var`, dan `/tmp`

Disini saya akan pilih `Gabungkan semua file pada satu partisi` saja.

![Partition Disks 3](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/partition-disks-3.png)

Setelah memilih skema partisi, sekarang terdapat overview atau summary atau ringkasan dari partisi yang akan digunakan pada sistem. Jika sudah yakin kita pilih `Finish partitioning and write changes to disk`.

![Partition Disks 4](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/partition-disks-4.png)

Maka sekarang seharusnya akan muncul peringatan kedua sebagai tanda apakah yakin ingin menerapkan partisi ini untuk sistem yang akan digunakan. Jika kalian tidak yakin atau ada yang ingin diubah kalian bisa lakukan disini karena jika sudah yakin dan continue maka penerapan partisi yang akan dilakukan tidak dapat dibatalkan atau dikembalikan.

Disini karena saya sudah yakin maka pilih `Yes`.

![Partition Disks 5](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/partition-disks-5.png)

Maka seharusnya sekarang proses instalasi akan berjalan

![Install the base system](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/install-the-base-system.png)

### Configure the package manager

Pada tahap ini kita diminta untuk mengatur pengaturan repository package. Repository package adalah sumber yang menyediakan package-package yang diperlukan untuk mendownload dan menginstall software pada sistem. Repository ini adalah kumpulan server yang menyimpan package software Debian. Pengaturan ini terutama melibatkan konfigurasi APT (Advanced Package Tool), tool package manager yang akan digunakan untuk mengelola download, instalasi, dan pembaharuan package.

Jika kalian mempunyai media (DVD atau USB drive) yang berisi package-package Debian. Kalian bisa melakukan scanning media tersebut disini, sehingga nantinya package-package yang dibutuhkan selama proses instalasi bisa didownload dan diinstall secara offline.

Dikarenakan disini saya tidak mempunyai media nya, maka disini saya pilih `No`.

![Configure the package manager](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-package-manager.png)

Selanjutnya disini kita perlu memilih archive mirror dari berbagai negara. Saya sarankan untuk memilih negara sendiri atau negara terdekat agar proses download nya lebih cepat.

![Configure the package manager 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-package-manager-2.png)

![Configure the package manager 3](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-package-manager-3.png)

Setelah memilih archive mirror, selanjutnya terdapat pilihan untuk menggunakan HTTP Proxy atau tidak. Dikarenakan disini saya tidak akan menggunakannya maka akan saya kosongkan saja.

![Configure the package manager 4](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-package-manager-4.png)

![Configure the package manager 5](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configure-the-package-manager-5.png)

### Configuring popularity contest

Pada tahap ini Debian dirancang untuk mengumpulkan informasi anonim tentang package-package yang diinstall pada sistem, seperti package mana yang paling banyak digunakan oleh user Debian di seluruh dunia. Informasi ini kemudian dapat membantu pengembang Debian untuk memahami seberapa banyak package-package tersebut digunakan dan memberikan prioritas pada pemiliharaan dan pengembangan yang lebih aktif.

Jika kalian mengaktifkan popularity-contest ini maka sistem kalian akan secara priodik mengirimkan laporan statistik anonim tentang package-package yang diinstall ke server Debian. Informasi ini membantu pengembang Debian untuk memahami tingkat penggunaan dan popularitas package-package tertentu di seluruh komunitas pengguna Debian. Data ini dapat digunakan untuk memberikan prioritas pada pemiliharaan dan pengembangan package-package yang paling banyak digunakan.

Penting untuk dicatat bahwa partisipasi dalam popularity-contest bersifat sukarela dan dapat dinonaktifkan jika pengguna tidak ingin berkontribusi pada proyek ini. Kontribusi ini bertujuan untuk meningkatkan pemahaman komunitas tentang package-package Debian yang peling banyak digunakan dan membantu pengembang dalam pengambilan keputusan terkait pemeliharaan dan pengembangan package-package tersebut.

Disini saya akan aktifkan saja konfigurasi popularity-contest nya

![Configuring popularity contest](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/configuring-popularity-contest.png)

### Software Selection

Pada tahap ini hanya package-package system inti (core) yang akan diinstall. Namun, kalian bisa menambahkan package-package yang mungkin ingin kalian gunakan kedepannya. Jika terdapat package yang ingin diinstall kalian bisa check pada list package yang tersedia.

Disini saya hanya memilih package:

- SSH Server
- Standard system utilities

![Software selection](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/software-selection.png)

### Install the GRUB boot loader

Dikarenakan ini adalah satu-satunya sistem operasi yang ada pada Virtual Machine, maka kita perlu menginstall GRUB boot loader nya pada primary drive (UEFI partition/boot record).

![Install the GRUB boot loader](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/install-the-grub-boot-loader.png)

![Install the GRUB boot loader 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/install-the-grub-boot-loader-2.png)

![Install the GRUB boot loader 3](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/install-the-grub-boot-loader-3.png)

### Finish the installation

Pada tahap ini proses instalasi sudah selesai, sekarang kita bisa reboot Virtual Machine nya agar booting atau masuk kedalam sistem operasi yang sudah di install.

![Finish the installation](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/finish-the-installation.png)

![Finish the installation 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/finish-the-installation-2.png)

Setelah reboot berhasil maka akan masuk kedalam menu GRUB

![GNU GRUB](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/gnu-grub.png)

Selanjutnya kita bisa melakukan login menggunakan user `root` untuk menginstall package `sudo`.

![Root Login](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/root-login.png)

Untuk menginstall package `sudo` kita bisa jalankan perintah berikut ini

```shell
apt install sudo
```

## Remote VM Debian Menggunakan SSH

Disini saya akan melakukan remote VM Debian yang sudah diinstall menggunakan SSH melalui terminal `PowerShell` agar lebih enak mengoperasikannya. Jika kalian tidak menggunakan PowerShell, kalian juga bisa menggunakan remote software lain seperti `PuTTY`, `Termius`, dll.

Sebelum melakukan remote kita izinkan terlebih dahulu agar SSH nya bisa login menggunakan user root. Untuk melakukannya kita bisa buka konfigurasi SSH nya menggunakan text editor `vi` atau `nano`.

```shell
vi /etc/ssh/sshd_config
```

Kemudian hapus komentar `#` pada konfigurasi berikut ini dan ganti `prohibit-password` menjadi `yes`.

```sshd
PermitRootLogin yes
```

Setelah konfigurasi tersimpan, lakukan restart service menggunakan perintah berikut ini

```shell
systemctl restart sshd
```

Maka sekarang seharusnya VM nya bisa di remote menggunakan SSH dengan user root.

![Remote VM Debian Menggunakan SSH](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/remote-vm-debian-menggunakan-ssh.png)

## Menambahkan Group Sudo Pada User

Saat ini user yang kita punya belum masuk kedalam group `sudo`, sehingga tidak bisa melakukan perintah atau command yang membutuhkan privillege yang lebih tinggi. Untuk mengecek apakah user nya sudah masuk kedalam group `sudo` atau belum kita bisa cek menggunakan perintah berikut ini.

```shell
groups <username>
```

![Check User Groups](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/check-user-groups.png)

Untuk menambahkan user kedalam group, kita bisa jalankan perintah berikut ini

> **Catatan**: Tips
>
> Option atau flag atau argument `-a` disini artinya adalah `append` dan option `-G` disini artinya adalah `group`
>
> ```shell
> usermod -aG <group> <username>
> ```

```shell
usermod -aG sudo <username>
```

Maka seharusnya sekarang user nya sudah masuk kedalam group sudo seperti gambar dibawah ini

![Add User to Sudo Groups](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/add-user-to-sudo-groups.png)

Sekarang jika kita mencoba login menggunakan user tersebut maka seharusnya sudah bisa menggunakan perintah `sudo` untuk kebutuhan privillege atau akses yang lebih tinggi.

Perlu dibiasakan juga agar kalian selalu gunakan user dengan privillege rendah atau user biasa atau user yang sesuai dengan privillege yang dibutuhkan nya jika memang tidak membutuhkan sesuatu hak akses yang lebih tinggi, karena sudah bisa dihandle atau ditangani dengan `sudo`.

![Test Sudo](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player/instalasi-linux-debian/test-sudo.png)
