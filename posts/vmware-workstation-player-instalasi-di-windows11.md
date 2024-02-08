---
published: true
title: "VMware Workstation Player - Instalasi di Windows 11"
tag: "SysAdmin"
date: "February 8 2024"
excerpt: "Pada artikel kali ini kita akan mencoba menginstall VMware Workstation Player pada sistem operasi Windows 11"
cover_image: "/images/posts/VMware Workstation Player - Instalasi di Windows 11.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

VMware Workstation Player sebelumnya dikenal dengan nama VMware Player, software tersebut adalah produk virtualisasi tingkat desktop yang dikembangkan oleh perusahaan teknologi yang bernama VMware. VMware Workstation Player memungkinkan pengguna untuk membuat dan menjalankan mesin virtual di komputer pribadi mereka.

Misalkan jika anda sekarang menggunakan sistem operasi Windows dan ingin mencoba sistem operasi lain seperti Linux, maka anda bisa mencoba nya terlebih dahulu secara virtual melalui software ini. Mengapa perlu menggunakan virtual?

### Keuntungan Penggunaan Virtual Machine

Menggunakan VMware Workstation Player membawa sejumlah keuntungan yang signifikan bagi pengguna yang ingin menjalankan sistem operasi tambahan didalam lingkungan yang terisolasi. Berikut adalah beberapa alasan mengapa penggunaan virtual machine menjadi pilihan yang lebih bijak:

- **Isolasi Lingkungan**: Dengan menggunakan VMware Workstation Player, Anda dapat membuat virtual machine yang beroperasi secara terpisah dari sistem operasi utama (host) Anda. Ini berarti Anda dapat menjalankan sistem operasi tambahan, seperti Linux pada Windows 11, tanpa mempengaruhi atau merusak konfigurasi sistem operasi utama Anda.

- **Pengujian Tanpa Resiko**: Jika Anda ingin mencoba sistem operasi baru atau menguji perangkat lunak tanpa mengubah konfigurasi utama komputer Anda, mesin virtual adalah solusi ideal. VMware Workstation Player memungkinkan Anda untuk menginstal dan menguji sistem operasi tanpa resiko kerusakan permanen pada hardware atau data utama.

- **Kompabilitas dan Fleksibilitas**: Dengan virtualisasi, Anda dapat menciptakan berbagai virtual machine yang menjalankan sistem operasi yang berbeda. Ini memberi Anda fleksibilitas untuk menguji perangkat lunak pada berbagai platform tanpa harus memiliki beberapa komputer fisik.

- **Snapshot dan Revert**: Pada beberapa produk virtual machine lainnya memungkinkan pengguna untuk membuat snapshot virtual machine. Snapshot tersebut berfungsi seperti "foto" dari virtual machine pada titik waktu tertentu, sehingga memungkinkan Anda kembali ke keadaan virtual machine tersebut jika terjadi kesalahan konfigurasi atau perubahan yang tidak diinginkan.

- **Optimalisasi Sumber Daya (Resource)**: Virtual machine dapat dioptimalkan untuk menggunakan sumber daya hardware yang ada pada komputer (host) Anda. Dengan demikian, Anda dapat menyesuaikan alokasi RAM, ruang penyimpanan (disk), dan sumber daya lainnya sesuai dengan kebutuhan sistem operasi yang dijalankan di dalam virtual machine.

Dengan keuntungan-keuntungan tersebut, VMware Workstation Player menjadi pilihan yang efektif bagi pengguna yang ingin menjalankan sistem operasi tambahan namun secara virtual, menggabungkan fleksibilitas tanpa mengorbankan stabilitas dan keamanan. Selanjutnya, kita akan membahas langkah-langkah instalasi VMware Workstation Player pada sistem operasi Windows 11.

## Download VMware Workstation Player

Sebelum melakukan instalasi, kita perlu mendownload software nya terlebih dahulu. Untuk melakukannya cukup mudah yaitu kalian bisa mengunjungi situs resmi dari VMware nya disini [wwww.vmware.com/products/workstation-player/workstation-player-evaluation.html](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)

![VMware Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-web.png)

## Instalasi VMware Workstation Player

Setelah sebelumnya Anda berhasil mendownload software VMware nya, langkah selanjutnya adalah melakukan instalasi VMware nya. Untuk instalasi nya cukup mudah, Anda cukup pergi ke lokasi dimana software tersebut disimpan (saat proses mendownload). Disini saya menyimpan nya di folder `D:/Downloads/VM/VMware-player-full-17.0.0-20800274.exe`

![VMware Software](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-software.png)

### Setup Wizard

Selanjutnya Anda cukup double click pada file tersebut maka akan muncul sebuah pop up atau wizard dari `VMware Workstation Player Setup`

![VMware Wizard](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-wizard.png)

### License Aggrement

Selanjutnya click pada tombol dengan tulisan `Next`. Setelah itu kita konfirmasi mengenai `End-User License Aggrement` dan click tulisan `Next` lagi.

![VMware License Aggrement](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-license-aggrement.png)

### Install Hypervisor

Sekarang seharusnya akan muncul menu untuk instalasi `Windows Hypervisor Platform (WHP)` secara otomatis. Agar VMware Workstation Player berfungsi dengan baik. Anda harus menginstal atau mengaktifkan fitur tersebut.

![VMware Install Hypervisor](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-install-hypervisor.png)

### Custom Setup

Setelah menu `WHP` tersebut, selanjutnya terdapat `Custom Setup` seperti `Enhanced Keyboard Driver` dan `VMware Workstation console tools into system PATH`. Disini saya akan mengaktifkan kedua fitur tersebut.

> **Catatan**: Tips
>
> Pada menu ini juga kalian bisa melakukan custom PATH atau lokasi directory instalasi dari VMware Workstation Player nya. Disini saya akan biarkan secara default di install pada lokasi `C:\Program Files (x86)\VMware\Vmware Player\`

![VMware Custom Setup](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-custom-setup.png)

### User Experience Settings

Selanjutnya terdapat menu `User Experience Settings`, pada menu tersebut terdapat beberapa konfigurasi seperti mengecek update dari VMware ketika program pertama kali dijalankan dan mengirim data untuk meningkatkan program. Disini saya tidak akan mengaktifkan kedua fitur tersebut.

![VMware User Experience Settings](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-user-experience-settings.png)

### Shortcuts

Selanjutnya terdapat menu `Shortcuts`, disini saya akan menceklis fitur `Desktop` dan `Start Menu Programs Folder`.

![VMware Shortcuts](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-shortcuts.png)

### Ready to Install

Setelah semua konfigurasi diatas selesai, maka VMware Workstation Player sudah siap di install. Cukup click tombol dengan tulisan `Install`.

![VMware Ready To Install](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-ready-to-install.png)

![VMware Installing](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-installing.png)

### Complete Setup

Maka proses instalasi akan berjalan. Setelah proses instalasi selesai, selanjutnya click tombol dengan tulisan `Finish` kemudian restart komputer Anda.

![VMware Complete Setup](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-complete-setup.png)

### Run VM

Pada tahap ini seharusnya Anda sudah berhasil menginstall VMware Workstation Player

![VMware Run VM](${NEXT_PUBLIC_PUBLIC_ASSETS}/vmware-workstation-player-windows11/vmware-run-vm.png)
