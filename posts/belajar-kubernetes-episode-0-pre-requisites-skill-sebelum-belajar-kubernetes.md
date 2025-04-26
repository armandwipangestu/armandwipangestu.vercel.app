---
published: true
title: "Belajar Kubernetes - Episode 0 - Pre-Requisites Skill Sebelum Belajar Kubernetes"
tag: "DevOps"
date: "April 25 2025"
excerpt: "Pada artikel ini kita akan mempelajari teknologi container orchestration yaitu Kubernetes, namun sebelum itu, skill apa saja sih yang perlu kita kuasai sebelum mempelajari Kubernetes?"
cover_image: "/images/posts/Belajar Kubernetes - Episode 0 - PRE-REQUISITES SKILL SEBELUM BELAJAR KUBERNETES.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Sebelum memulai masuk ke dunia Kubernetes, ada beberapa skill dasar yang perlu kita kuasai agar tidak bingung di tengah jalan. Mengapa kita perlu mempelajari dasar nya terlebih dahulu? Alasannya adalah Kubernetes bukanlah alat yang mudah dipahami jika belum familiar dengan konsep-konsep dasar seperti Docker, Linux, atau Jaringan. Dengan membekali diri dengan skill dasar, kita akan lebih cepat mengerti cara kerja Kubernetes secara menyeluruh.

Belajar Kubernetes bukan hanya untuk seseorang yang bekerja sebagai DevOps. Bahkan developer backend pun sekarang perlu mengetahui konsep container dan orchestration ini. Tapi pastikan sudah familiar dengan deploy aplikasi, dasar cloud, dan container.

## Skill yang Wajib Dimiliki

Terdapat beberapa skill yang wajib dimiliki oleh kita yang ingin mempelejari teknologi atau tools Kubernetes ini, berikut adalah beberapa list skill nya:

### Dasar Linux & CLI

Kita harus bisa mengoperasikan perintah-perintah dasar Linux di lingkungan CLI (Command Line Interface), perintah-perintah dasar Linux ini akan sangat membantu sekali pada saat kita menginstall, mengkonfigurasikan, dan mengoperasikan Kubernetes. Sebagai contoh beberapa perintah dasar nya adalah:

1. Navigasi folder: `cd`, `ls`, `pwd`
2. Permission file: `chmod`, `chown`
3. Basic script: `bash`, `sh`
4. Tools CLI: `curl`, `grep`, `awk`

### Computer Networking Dasar

Selain perintah-perintah dasar Linux dan lingkungan berbasis CLI, kita juga harus bisa dan memahami cara kerja jaringan di komputer, skill tersebut akan sangat membantu pada saat kita melakukan konfigurasi seputar subnetting, firewall, proxy, forwarding, load balancing, dan sebagainya. Sebagai contoh beberapa konsep jaringan komputer yang harus kita pahami adalah:

1. IP Address: `Class`, `Subnetting`
2. Port: `Well-Known Port`, `Registered Port`, `Dynamic / Ephemeral Port`
3. DNS: `Record`, `Zone`
4. Load Balancer: `Upstream`, `Roundrobin`, `Least Connection`
5. Proxy: `Reverse Proxy`
6. Protocol: `SSH`, `HTTP/s`, `TCP`, `UDP`
7. Routing: `Static`, `Dynamic`
8. Firewall: `NAT`

### Docker atau Containerization

Setelah memiliki skill dasar linux dan juga komputer jaringan, kita juga harus bisa mengoperasikan aplikasi yang berjalan di atas lingkungan container, salah satu yang populer adalah Docker, walaupun banyak sekali alternative selain Docker misalkan seperti Podman, namun secara konsep tidak beda jauh. Skill pengoperasian containerization ini juga akan menjadi skill fundamental yang akan sangat membantu sekali ketika akan terjun ke dunia orchestration seperti Kubernetes, karena Kubernetes sendiri adalah tools yang mengabstraksi kerumitan menghandle banyak nya container. Sebagai contoh beberapa skill pengoperasian containerization yang harus kita bisa adalah:

1. Image: `Build`, `Dockerfile`, `Pull`, `Push`, `Registry`, `Run`
2. Volume: `Temporary`, `Persistent`
3. Network: `CIDR`, `Port Mapping`, `Binding`
4. Compose: `Multi Container`

### YAML Syntax

YAML Syntax erat kaitannya dengan Docker Compose, dan Kubernetes sendiri juga menggunakan format YAML file untuk pengoperasiannya, oleh karena itu kita harus bisa dan familiar dengan format penulisan YAML, seperti `Indentasi Tab`, `Struktur Key dan Value`.

### Opsional Cloud atau Virtualisasi

Skill ini bisa dibilang opsional dan akan menjadi nilai tambah jika kalian sudah pernah atau terbiasa mengoperasikan di lingkungan Cloud / Virtualisasi, karena beberapa skill dasar yang sudah disebutkan di atas dan kubernetes sendiri itu kebanyakan kita bisa mempelajari nya tanpa Cloud / Virtualisasi. Sebagai contoh beberapa skill cloud / virtualisasi yang akan sangat membantu atau menjadi nilai tambah adalah:

1. Cloud Platform: `AWS`, `GCP`, `Azure`
2. Cloud Service: `IaaS`, `PaaS/FaaS`, `SaaS`, `IAM`, `Network / VPC`, `Firewall`, `Instance Group`
3. Virtualisasi: `VMware`, `Proxmox`, `VirtualBox`

## Tools Software atau Hardware yang Perlu Disiapkan

Setelah mengetahui skill-skill dasar yang wajib dimiliki sebelum belajar Kubernetes, selanjutnya adalah membahas terkait Tools Software / Hardware yang perlu disiapkan sebelum belajar Kubernetes. Berikut adalah beberapa list Tools Software / Hardware nya:

| No  | Tool                      | Type     | Level    | Keterangan                                                                                                                                                          |
| --- | ------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | Laptop / Mini PC / PC     | Hardware | Wajib    | Untuk menjalankan Kubernetes Cluster, kalian juga bisa menggunakan VM di Cloud Platform                                                                             |
| 2.  | Hypervisor / Virtualisasi | Software | Opsional | Untuk yang ingin menjalankan Kubernetes Cluster secara isolasi atau terpisah dengan lingkungan Main OS, bisa menggunakan `VMware`, `Proxmox`, `VirtualBox`, dsb nya |
| 3.  | Container Runtime         | Software | Wajib    | Untuk menjalankan Kubernetes Container, bisa menggunakan `Docker` atau `Containerd`, `CRI-O`, dsb nya                                                               |
| 4.  | Text Editor               | Software | Wajib    | Untuk membuat, mengedit konfigurasi Kubernetes Cluster melalui YAML file                                                                                            |
| 5.  | kubectl                   | Software | Wajib    | Untuk interaksi ke dalam Kubernetes Cluster melalui API Server                                                                                                      |
| 6.  | Kubernetes Cluster        | Software | Wajib    | Untuk menjalankan Kubernetes Cluster, bisa menggunakan `Kubernetes`, `minikube`, `k3s`, dsb nya                                                                     |

## Penutup

Untuk episode 0 pada series belajar kubernetes kali ini mungkin cukup sampai disini pembahasannya, pada episode selanjutnya kita akan membahas topik yang tidak kalah seru yaitu mengenal sejarah deployment aplikasi dan juga sejarah Kubernetes mengapa tercpita. Oleh karena itu pastikan kalian tetap terus semangat untuk mempelajari Kubernetes di series ini karena perjalanannya masih panjang 😁

> **Catatan**: Pastikan semua skill dan tools di atas sudah kalian miliki dan siapkan. Jika belum, boleh sambil disiapkan pelan-pelan.

Untuk kalian yang ingin lanjut membaca, bisa click gambar thumbnail episode 1 di bawah ini

<a href="belajar-kubernetes-episode-1-mengenal-sejarah-deployment-aplikasi-dan-kubernetes">
    <img src="/images/posts/Belajar Kubernetes - Episode 1 - MENGENAL SEJARAH DEPLOYMENT APLIKASI & KUBERNETES.png" />
</a>
