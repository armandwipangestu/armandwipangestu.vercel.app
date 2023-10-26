---
published: true
title: "Git - Squash Commit"
tag: "Git"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan melakukan Squash pada Commit di Git"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

### Memilih Commit

> **NOTE**: `n` = Jumlah commit yang mau di squash
>
> Contoh disini yang akan di squash 3 commit terakhir

```shell
git rebase -i HEAD~n
```

<a href="https://user-images.githubusercontent.com/64394320/200328128-6f9719e5-51bd-4072-8578-1f283eabbb95.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/200328128-6f9719e5-51bd-4072-8578-1f283eabbb95.png" alt="git rebase" class="img-fluid rounded mx-auto d-block" />
</a>

### Memilih Commit Yang Mau di Squash

- `pick`: Commit yang dipilih
- `squash`: Menggunakan commit tetapi gabungkan ke commit sebelumnya

<a href="https://user-images.githubusercontent.com/64394320/200328624-4b0ef9d9-b24d-42af-a82a-5f3541202ff0.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/200328624-4b0ef9d9-b24d-42af-a82a-5f3541202ff0.png" alt="Squash" class="img-fluid rounded mx-auto d-block" />
</a>

### Memasukan Pesan Commit Baru Setelah di Squash

<a href="https://user-images.githubusercontent.com/64394320/200331448-2413c7b7-5a7c-46b3-a633-5dc9fee68a12.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/200331448-2413c7b7-5a7c-46b3-a633-5dc9fee68a12.png" alt="Pesan Commit Baru" class="img-fluid rounded mx-auto d-block" />
</a>

<a href="https://user-images.githubusercontent.com/64394320/200331759-a0a46fee-770d-459c-a603-748e2aee1d49.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/200331759-a0a46fee-770d-459c-a603-748e2aee1d49.png" alt="Hasil Squash" class="img-fluid rounded mx-auto d-block" />
</a>

### Menambahkan Configurasi Git

> **NOTE**: Configurasi ini digunakan apabila ketika melakukan push ke remote origin mendapatkan error karena harus pull terlebih dahulu

```shell
git config pull.rebase false
```

```shell
git pull
```

### Push ke remote origin

```shell
git push -u origin <branch>
```

### Hasilnya

Maka sekarang history di commit cuman hanya satu, bukan 3

<a href="https://user-images.githubusercontent.com/64394320/200332957-aee94af0-be18-441b-bc26-3b65b9cda040.png" target="_blank">
    <img src="https://user-images.githubusercontent.com/64394320/200332957-aee94af0-be18-441b-bc26-3b65b9cda040.png" alt="Network Graph" class="img-fluid rounded mx-auto d-block" />
</a>
