---
published: true
title: "Codeigniter - Hosting di cPanel"
tag: "Programming"
date: "March 21 2023"
excerpt: "Pada artikel ini kita akan melakukan hosting program codeigniter di cPanel"
cover_image: "/images/posts/Codeigniter - Hosting di cPanel.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Membuat dan Manage Git Repository

Pada tutorial kali ini, saya akan mencontohkan kode atau program dari codeigniter nya berada di Repository GitHub.
Sehingga jika ada perubahan pada program kita cukup melakukan `fetch` dan `pull` pada cPanel kita untuk menerapkan perubahan nya ke dalam
server hosting kita.

Untuk memulainya, kalian cukup pergi ke menu `Git Version Control` pada cPanel, untuk memudahkan pencarian menu tersebut kalian
bisa menggunakan fitur Search.

![image](https://user-images.githubusercontent.com/64394320/226560778-837211a4-4d93-4776-8047-93d03a60ba09.png)

Setelah kalian berada di menu tersebut, selanjutnya click tombol `Create` di sebelah kanan untuk melakukan `Cloning` Repository-nya.

![image](https://user-images.githubusercontent.com/64394320/226562041-a038e309-ed74-4926-bede-9a1113aa2a3d.png)

Pada menu `Create Repository` ada beberapa yang perlu kalian isikan, antara lain:

![image](https://user-images.githubusercontent.com/64394320/226563778-c4493605-ac88-4261-b21f-7802973b005b.png)

- URL Repository

Disini kita cukup menambahkan `URL Repository` dengan format:

```
https://github.com/user/repo
```

- Repository PATH

Untuk bagian ini kita sesuaikan dengan folder repository nya mau di simpan dimana, saya menggunakan:

```
/home/user_cpanel/public_html/repo
```

- Repository Name

Untuk bagian ini akan otomatis di-isikan sesuai dengan nama Repository nya

```
repo
```

## Membuat Subdomain

Pada tutorial kali ini, kita akan melakukan pointing pada repository ke dalam subdomain.
Sehingga nantinya program codeigniter nya dapat kita akses menggunakan subdomain

Untuk menambahkan subdomain baru, kalian cukup pergi ke menu `Domains`

![image](https://user-images.githubusercontent.com/64394320/226564542-0f5e2d12-63a4-437f-a896-33248166ae91.png)

Setelah berada di menu tersebut, selanjutnya click tombol `Create a New Domain`

![image](https://user-images.githubusercontent.com/64394320/226564888-4d89bb7e-7e5f-45fc-b588-4fa47d4f3efa.png)

Pada menu `Domains` ada beberapa yang perlu kalian isikan, antara lain:

![image](https://user-images.githubusercontent.com/64394320/226583785-7661af21-08c0-4295-8345-6f365d5f8f96.png)

- Domain

Disini kita cukup isikan dengan format

```
sub.domain.com
```

- Document Root (File System Location)

Bagian ini kita isikan dengan PATH folder repository yang sudah kita clone sebelumnya

> PATH yang saya gunakan sebelumnya:
>
> ```
> /home/user_cpanel/public_html/repo
> ```

## Configurasi Database

Setelah sebelumnya kita melakukan pointing subdomain dengan folder repository yang kita gunakan, selanjutnya kita
akan melakukan konfigurasi pada database nya

### Membuat Database

Untuk melakukannya, pergi ke menu `MySQL Database`

![image](https://user-images.githubusercontent.com/64394320/226584916-5f0a07c2-ec3c-4b29-99c9-1843cc5f3925.png)

Pada menu `MySQL Database` kita buat Database baru

> Sesuaikan dengan nama Database yang akan digunakan

![image](https://user-images.githubusercontent.com/64394320/226585175-9dba352c-53af-46a0-b82f-3dc69764dfb9.png)

Setelah nama kalian sudah buat, cukup tekan tombol `Create Database`

### User Database

Disini saya biasanya membuat setiap database memiliki user database nya masing-masing, oleh karena itu
untuk melakukannya, scroll ke bawah dari menu `MySQL Database` lalu isikan kolom pada bagian `MySQL Users Add New User`

![image](https://user-images.githubusercontent.com/64394320/226586239-a89de9c7-9b84-4ced-b084-c30423c1e2d9.png)

### Hak Akses Database

Setelah kalian membuat `User Database`, selanjutnya kita perlu memberikan akses kepada user yang sudah dibuat ke database yang kita inginkan.

Untuk melakukannya kalian cukup scroll ke bawah dari menu `MySQL Users Add New User` lalu pilih user mana dan database mana
pada bagian `Add User To Database`

![image](https://user-images.githubusercontent.com/64394320/226586677-37a0d35c-58a4-4aa0-aa3d-7f5eb0e7be88.png)

### Import Database pada phpMyAdmin

Apabila kalian memiliki export-an SQL atau Database projek kalian, langkah selanjutnya maka harus melakukan import database
menggunakan `phpMyAdmin`.

Untuk melakukannya kalian cukup pergi ke menu `phpMyAdmin`

![image](https://user-images.githubusercontent.com/64394320/226587499-95f00254-31ea-4f8e-b9b5-9785c1334c73.png)

Pada bagian sidebar dari phpMyAdmin, kalian pilih database yang sudah dibuat sebelumnya

![image](https://user-images.githubusercontent.com/64394320/226587879-73b31448-0c70-4815-83b0-b8a673ce03ce.png)

Selanjutnya pergi ke menu `import` dan pilih file dengan ekstensi `.sql` yang sudah anda siapkan

![image](https://user-images.githubusercontent.com/64394320/226588107-5667d1ce-2076-4341-bd79-5e7fb40103ca.png)

## Configurasi Codeigniter

Setelah melakukan setup repository, subdomain, dan database. Langkah selanjutnya yang perlu anda lakukan adalah
melakukan configurasi pada codeigniter nya karena pasti ada perbedaan antara configurasi di local dan
configurasi di development/production.

Salah satu contohnya disini saya mengubah konfigurasi pada file

`/application/config/database.php`

Untuk melakukannya, kalian pergi ke menu `File Manager`

![image](https://user-images.githubusercontent.com/64394320/226589240-003571e3-2f97-46cd-ac25-d965b7cec66c.png)

Setelah itu pergi ke folder repository yang sudah anda clone tadi.

Setelah berada di folder yang anda inginkan, untuk melakukan perubahan anda cukup click kanan pada file yang ingin anda ubah
dan pilih edit

![image](https://user-images.githubusercontent.com/64394320/226589730-6853a26d-2f7b-4715-95cb-03c19232841f.png)

> Apabila ada pop up konfirmasi, click pada bagian edit
> ![image](https://user-images.githubusercontent.com/64394320/226589855-ac1fc90e-da0a-41c9-b4e3-8bc73e8a4bb7.png)

Selanjutnya anda tinggal ubah konfigurasi yang anda inginkan, disini saya akan melakukan konfigurasi untuk

- Host Database
- User Database
- Password Database
- Nama Database

![image](https://user-images.githubusercontent.com/64394320/226590230-5c8d3eac-3f0a-4eb2-bddb-a22580bd482d.png)

Setelah melakukan perubahan, selanjutnya click tombol `Save Changes`

## Hasil

Untuk melihat hasil dari konfigurasi yang sudah dilakukan, pergi ke menu `Domains` lalu click pada bagian nama subdomain yang sudah dibuat sebelumnya

![image](https://user-images.githubusercontent.com/64394320/226590966-2c5bba4d-873c-4e63-86e9-9e955d26495b.png)

Maka sekarang aplikasi codeigniter anda sudah online :)

![image](https://user-images.githubusercontent.com/64394320/226591400-10a0e773-d1b2-4c42-bbd1-262bf8592488.png)
