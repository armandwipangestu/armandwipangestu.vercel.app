---
published: true
title: "Git & GitHub - Menambahkan SSH Key"
tag: "Git"
date: "January 17 2023"
excerpt: "Pada artikel ini kita akan mencoba menambahkan SSH Key untuk GitHub, SSH Key ini berfungsi agar kita bisa mengkoneksikan git (local) dengan github (remote)"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

- Generating Public Key SSH

```shell
ssh-keygen -t rsa -b 4096 -C "your@email.com"
```

- Get PID

```shell
eval $(ssh-agent -s)
```

- Add Authentication Agent

```shell
ssh-add ~/.ssh/id_rsa
```

- Copy Public Key and Paste to GitHub Account

```shell
cat .ssh/id_rsa.pub
```
