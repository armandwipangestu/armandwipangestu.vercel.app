---
published: true
title: "Git - Kembali Ke Commit Sebelumnya"
tag: "Git"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan mencoba berpindah ke commit sebelumnya pada git"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

- Mengecek nama hash-commit

```shell
git log --abbrev-commit
```

<a href="https://i.ibb.co/ZS5rYrL/image.png" target="_blank">
  <img src="https://i.ibb.co/ZS5rYrL/image.png" alt="https://i.ibb.co/ZS5rYrL/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Pindah ke commit sebelumnya

```shell
git checkout <nama hash-commit>
```

<a href="https://i.ibb.co/tbXc1Hp/image.png" target="_blank">
  <img src="https://i.ibb.co/tbXc1Hp/image.png" alt="https://i.ibb.co/tbXc1Hp/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

> Misalkan disini nama hash-commit nya adalah `9a3f458`

<a href="https://i.ibb.co/gdDJ16d/image.png" target="_blank">
  <img src="https://i.ibb.co/gdDJ16d/image.png" alt="https://i.ibb.co/gdDJ16d/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

> Setelah itu lakukan perubahan di commit tersebut

<a href="https://i.ibb.co/tcvfchR/image.png" target="_blank">
  <img src="https://i.ibb.co/tcvfchR/image.png" alt="https://i.ibb.co/tcvfchR/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Pull Commit di remote branch

```shell
git pull <remote> <branch>
```

<a href="https://i.ibb.co/NxXNhs5/image.png" target="_blank">
  <img src="https://i.ibb.co/NxXNhs5/image.png" alt="https://i.ibb.co/NxXNhs5/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

> **<i class="fas fa-exclamation-circle"></i>**
> Jika mendapatkan error ketika `git pull` seperti diatas, jalankan:
>
> ```shell
> git config pull.rebase false
> ```
>
> Lalu jalankan kembali
>
> ```shell
> git pull <remote> <branch>
> ```

<a href="https://i.ibb.co/Yp2Z0Zp/Screenshot-2022-02-15-16-19-49-X.png" target="_blank">
  <img src="https://i.ibb.co/Yp2Z0Zp/Screenshot-2022-02-15-16-19-49-X.png" alt="https://i.ibb.co/Yp2Z0Zp/Screenshot-2022-02-15-16-19-49-X.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Setelah itu perbaiki file yang conflict

<a href="https://i.ibb.co/99gh54v/image.png" target="_blank">
  <img src="https://i.ibb.co/99gh54v/image.png" alt="https://i.ibb.co/99gh54v/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Setelah itu lakukan push

```shell
git push -u origin HEAD:<branch>
```

<a href="https://i.ibb.co/xHv3XqL/image.png" target="_blank">
  <img src="https://i.ibb.co/xHv3XqL/image.png" alt="https://i.ibb.co/xHv3XqL/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

> Sekarang jika kita lihat branch atau cabang nya muncul dari commit sebelumnya

<a href="https://i.ibb.co/jD3DGGJ/image.png" target="_blank">
  <img src="https://i.ibb.co/jD3DGGJ/image.png" alt="https://i.ibb.co/jD3DGGJ/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Kembali ke main branch

```shell
git checkout main
```

```shell
git pull
```

<a href="https://i.ibb.co/rfjTc7k/image.png" target="_blank">
  <img src="https://i.ibb.co/rfjTc7k/image.png" alt="https://i.ibb.co/rfjTc7k/image.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Melihat graph commit

```shell
git log --all --decorate --oneline --graph
```

<a href="https://i.ibb.co/LCGhDgj/image.png" target="_blank">
  <img src="https://i.ibb.co/LCGhDgj/image.png" alt="https://i.ibb.co/LCGhDgj/image.png" class="img-fluid rounded mx-auto d-block" />
</a>
