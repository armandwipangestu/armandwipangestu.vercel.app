---
published: true
title: "Belajar Kubernetes - Episode 2 - Mengenal Konsep dan Arsitektur Kubernetes"
tag: "DevOps"
date: "May 04 2025"
excerpt: "Di episode ini kita akan mengenal konsep dan arsitektur yang ada pada Kubernetes Cluster, mulai dari Control Plane (Master Node) dan Data Plane (Worker Node)"
cover_image: "/images/posts/Belajar Kubernetes - Episode 2 - MENGENAL KONSEP DAN ARSITEKTUR KUBERNETES.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**: Untuk kalian yang ingin membaca episode sebelumnya, bisa click gambar thumbnail episode 1 di bawah ini
>
> <a href="belajar-kubernetes-episode-1-mengenal-sejarah-deployment-aplikasi-dan-kubernetes">
>    <img src="/images/posts/Belajar Kubernetes - Episode 1 - MENGENAL SEJARAH DEPLOYMENT APLIKASI & KUBERNETES.png" />
> </a>

Di episode 1 sebelumnya, kita sudah membahas cukup panjang terkait evolusi dari infrastruktur, arsitektur, deployment aplikasi, hingga munculnya teknologi bernama Kubernetes. Nah di episode 2 kali ini, kita akan mulai masuk membahas Kubernetes secara lebih dalam. Di episode ini kita akan membahas tentang arsitektur internal Kubernetes, mengenal apa saja komponen penting di dalamnya, dan bagaimana mereka saling berinteraksi.

Mengapa kita harus memahami arsitektur Kubernetes ini? Sebelum mulai menggunakan Kubernetes untuk menjalankan aplikasi, kita perlu paham terlebih dahulu bagaimana sistem tersebut bisa bekerja. Dengan memahami arsitekturnya, kita akan lebih mudah dalam beberapa hal berikut ini:

- Mempercepat dalam mempelajari konsep atau cara kerja Kubernetes
- Melakukan troubleshooting saat ada error
- Memahami bagaimana aplikasi dijalankan dan dikelola
- Menyusun strategi deployment dan scaling yang optimal

## Arsitektur Kubernetes Secara Umum

> **Catatan**: Kalian tidak perlu pusing dan bingung terlebih dahulu untuk memahami gambar arsitektur Kubernetes di bawah ini. Tenang saja, tidak perlu merasa ter-intimidasi dengan banyaknya istilah-istilah di gambar tersebut. Kita akan coba jelaskan satu persatu.

![Arsitektur Kubernetes](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-2/arsitektur-kubernetes.png)

Kubernetes bekerja dalam cluster, yang terdiri dari beberapa node. Dalam arsitektur ini ada dua peran besar, yaitu:

1. Control Plane (Master Node)
2. Data Plane (Worker Node)

### Control Plane (Master Node)

Node ini adalah yang menjadi pusat kendali dari Kubernetes cluster, sehingga semua interaksi ke Kubernetes cluster akan melalui node ini. Terdapat beberapa komponen yang ada di dalam Master Node, diantaranya adalah sebagai berikut:

#### API Server

Komponen ini adalah sebagai gerbang utama atau titik masuk utama semua perintah yang dikirim ke Kubernetes cluster, interkasi ke dalam Kubernetes cluster melalui API Server bisa melalui berbagai macam cara, diantaranya adalah:

- kubectl (CLI)
- API
- Dashboard

Komponen ini menyediakan endpoint REST API untuk mengatur komunikasi antar komponennya.

#### etcd

Komponen ini digunakan sebagai penyimpanan data atau database dari konfigurasi Kubernetes cluster, penyimpanan data yang digunakan oleh etcd adalah menggunakan `key-value` store yang konsisten dan highly-available. Semua informasi seperti status dan konfigurasi disimpan di sini (misalnya seperti daftar `Pod`, `Service`, dan sebagainya.)

#### Scheduler

Komponen ini adalah yang menentukan di node mana pod (container) akan dijalankan, scheduler ini akan menentukan berdasarkan aturan-aturan yang telah ditetapkan seperti berdasarkan `Resource`, `Policy`, `Namespace`, dan sebagainya.

#### Controller Manager

Komponen ini bertugas untuk melakukan kontrol terhadap seluruh Kubernetes cluster, terutama yang Worker Node. Sebagai contoh kita mempunyai lebih dari satu Worker Node, nah itu tidak mungkin akan berjalan sendiri-sendiri, oleh karena itu perlu komponen yang mengatur atau mengelola nya, nah komponen controller manager inilah yang melakukan hal tersebut. Komponen ini mengelola beberapa controller, diantaranya adalah `Node Controller`, `ReplicaSet Controller`, dan sebagainya.

#### Cloud Controller Manager (Opsional)

Sama hal nya seperti komponen Controller Manager, namun komponen ini khusus untuk node yang di deploy pada Cloud Provider seperti `AWS`, `GCP`, dan `Azure` yang dimana menyediakan Cloud Provider API. Sehingga kita bisa hubungkan antara Kubernetes cluster yang ada di on-premise dengan yang ada di Cloud Provider.

### Data Plane (Worker Node)

Node ini adalah tempat dimana aplikasi kita dijalankan, aplikasi tersebut dalam bentuk pod (container) yang kita deploy ke dalam Kubernetes cluster. Terdapat beberapa komponen yang ada di dalam Worker Node, diantaranya adalah sebagai berikut:

#### Kubelet

Komponen ini berfungsi sebagai agent yang berjalan di setiap node, dimana tugas nya adalah menjalankan perintah yang dikirim dari komponen API server yang ada di Master Node. Sehingga komponen ini yang menjadi jembatan antara Master Node dan setiap Worker Node nya yang ada di Kubernetes Cluster.

#### Kube-proxy

Komponen ini adalah yang mengatur seputar aturan jaringan di setiap node nya, dimana tugas nya adalah seperti melakukan load balancing, port forward, firewall, dan sebagainya terhadap pod.

#### Container Runtime

Komponen ini adalah engine yang digunakan untuk menjalankan container, Kubernetes sendiri mendukung banyak jenis container runtime, seperti `Docker` / `Containerd`, `CRI-O`, dan sebagainya. Kubernetes hanya mengelola container melalui `Container Runtime Interface` (CRI).

#### Pod

Komponen ini adalah komponen terkecil yang ada di Kubernetes, komponen ini bisa berisi satu atau lebih container yang saling berbagi `IP Address` dan `Storage`.

#### K8s Objects (Opsional)

Terdapat objects-objects atau komponen lain yang bersifat opsional (bukan core concept) dari Kubernetes cluster, contohnya adalah seperti `Namespace`, `Deployment`, `Cronjob`, `Secret`, `Ingress`, `Service`, dan sebagainya.

## Alur Kerja Sederhana Kubernetes

Setelah mengetahui konsep dan arsitektur Kubernetes di atas, kalian pasti bingung bagaimana developer melakukan deployment ke Kubernetes cluster bukan? Dimana banyak sekali komponen di dalamnya, oleh karena itu, agar lebih terbayang bagaimana alur kerja sederhana deployment ke Kubernetes cluster adalah sebagai berikut:

1. Developer membuat file dalam format YAML.
2. Developer mendefinisikan Kubernetes Objects yang digunakan untuk deployment nya pada YAML file tersebut.
3. Developer mengirimkan konfigurasi YAML file tersebut ke `API Server`, misalnya melalui `kubectl` dengan perintah seperti:

```shell
kubectl apply -f deployment.yaml
```

4. `API Server` mencatat ke komponen `etcd` dan meneruskan perintah ke komponen `Scheduler`.
5. `Scheduler` menentukan Worker Node terbaik untuk menjalankan `Pod`.
6. `Kubelet` di Worker Node yang dipilih akan menerima perintah dan menjalankan `Pod` melalui `Container Runtime`.
7. `Kube-proxy` akan mengatur seputar networking agar `Pod` tersebut bisa diakses dari luar (biasanya melalui objects `Service`).

## Penutup

Kubernetes adalah sistem yang cukup kompleks, tapi jika kita pecah menjadi komponen-komponen kecil, kita bisa memahaminya dengan lebih mudah. Memahami arsitektur ini adalah pondasi yang sangat penting sebelum masuk ke konsep lanjutan seperti `Service`, `Deployment`, `Ingress`, `ReplicaSet`, dan sebagainya.

Bagaimana episode 2 kali ini, apakah sudah mulai pusing memahami arsitektur Kubernetes 😅? It's oke untuk pertama kali melihat dan mencoba memahami arsitektur dari Kubernetes cluster memang cukup membingungkan, namun percayalah dengan seiring nya waktu dan banyak nya latihan akan membuat kerumitan tersebut menjadi hal yang **kecil** atau mudah.

Nah agar kita bisa hands-on praktek langsung membuat Kubernetes cluster, di episode 3 selanjutnya, kita akan bahas terkait instalasi Kubernetes cluster, baik itu Control Plane (Master Node) dan Data Plane (Worker Node). Pastikan Tools software atau hardware yang sudah dijelaskan di episode 0 sudah disiapkan, sehingga kita bisa langsung melakukan instalasi Kubernetes cluster nya.

> **Catatan**: Untuk kalian yang ingin lanjut membaca, bisa click gambar thumbnail episode 3 di bawah ini
>
> <a href="belajar-kubernetes-episode-3-instalasi-kubernetes-cluster-master-dan-worker-node">
>    <img src="/images/posts/Belajar Kubernetes - Episode 3 - INSTALASI KUBERNETES CLUSTER (MASTER & WORKER NODE).png" />
> </a>
