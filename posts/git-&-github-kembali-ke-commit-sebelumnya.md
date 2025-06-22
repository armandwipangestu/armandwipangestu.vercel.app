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

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-log-hash-commit.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-log-hash-commit.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-log-hash-commit.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Pindah ke commit sebelumnya

```shell
git checkout <nama hash-commit>
```

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout.png" class="img-fluid rounded mx-auto d-block" />
</a>

> Misalkan disini nama hash-commit nya adalah `9a3f458`

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout-2.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout-2.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout-2.png" class="img-fluid rounded mx-auto d-block" />
</a>

> Setelah itu lakukan perubahan di commit tersebut

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-commit.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-commit.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-commit.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Pull Commit di remote branch

```shell
git pull <remote> <branch>
```

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-pull.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-pull.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-pull.png" class="img-fluid rounded mx-auto d-block" />
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

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-pull-2.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-pull-2.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-pull-2.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Setelah itu perbaiki file yang conflict

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-conflict.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-conflict.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-conflict.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Setelah itu lakukan push

```shell
git push -u origin HEAD:<branch>
```

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-push.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-push.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-push.png" class="img-fluid rounded mx-auto d-block" />
</a>

> Sekarang jika kita lihat branch atau cabang nya muncul dari commit sebelumnya

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-graph.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-graph.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-graph.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Kembali ke main branch

```shell
git checkout main
```

```shell
git pull
```

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout-3.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout-3.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-checkout-3.png" class="img-fluid rounded mx-auto d-block" />
</a>

- Melihat graph commit

```shell
git log --all --decorate --oneline --graph
```

<a href="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-graph-2.png" target="_blank">
  <img src="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-graph-2.png" alt="${NEXT_PUBLIC_PUBLIC_ASSETS}/git-&-github-kembali-ke-commit-sebelumnya/git-graph-2.png" class="img-fluid rounded mx-auto d-block" />
</a>
