---
published: true
title: "Belajar Kubernetes - Episode 1 - Mengenal Sejarah Deployment Aplikasi dan Kubernetes"
tag: "DevOps"
date: "April 26 2025"
excerpt: "Di episode ini kita akan mengenal sejarah deployment aplikasi mulai dari infrastruktur, lalu perpindahan dari VM ke Container, deployment monolith ke microservice, hingga ke sejarah Kubernetes"
cover_image: "/images/posts/Belajar Kubernetes - Episode 1 - MENGENAL SEJARAH DEPLOYMENT APLIKASI & KUBERNETES.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**: Untuk kalian yang ingin membaca episode sebelumnya, bisa click gambar thumbnail episode 0 di bawah ini
>
> <a href="belajar-kubernetes-episode-0-pre-requisites-skill-sebelum-belajar-kubernetes">
>    <img src="/images/posts/Belajar Kubernetes - Episode 0 - PRE-REQUISITES SKILL SEBELUM BELAJAR KUBERNETES.png" />
> </a>

Setelah di episode 0 sebelumnya kita mempersipakan skill apa saja yang harus dimiliki sebelum belajar Kubernetes, pada episode kali ini kita akan membahas mengenai sejarah atau history deployment aplikasi dan juga sejarah dari Kubernetes itu sendiri. Alasan mengapa penting mengenal sejarah deployment aplikasi dan juga sejarah Kubernetes adalah agar kita mengerti kenapa teknologi Kubernetes tersebut itu ada.

## Evolusi Model Infrastruktur

![Architecture & Deployment Models 1](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-1/architecture-&-deployment-models-1.png)

Kalian bisa lihat gambar evolusi infrastruktur di atas, terdapat beberapa tahapan yaitu mulai dari On-Premise / Self Hosting, lalu masuk ke era Colocation Server, hingga masuk ke era saat ini yaitu Cloud Computing. Agar lebih jelas berikut adalah penjelasan masing-masing evolusi infrastruktur gambar di atas.

### On Premise atau Self Hosting

Pada era awal, semua perusahaan menyimpan dan menjalankan aplikasinya di server milik sendiri atau biasa di sebut on-premise. Dimana mereka harus membeli terlebih dahulu hardware nya, dipasang di ruang server sendiri, lalu dirawat dan dimaintenance secara mandiri, dan hingga ke skalakan atau expand secara manual. Proses tersebut jelas banyak sekali kekurangan dan kendalanya seperti:

1. Biaya besar

Dimana perusahaan atau individu harus menyiapkan dana yang besar di awal agar dapat membeli physical server, hal tersebut akan sangat sulit jika perusahaan atau individu memiliki uang yang terbatas atau bisnis nya yang masih merintis.

2. Risiko tinggi

Akan sangat sulit sekali melakukan maintenance atau yang mengelola jika tidak ada orang yang mengerti, dan pastinya hal tersebut akan berdampak ke hiring banyak orang di segala bidang pekerjaan. Contohnya seperti orang yang mengerti instalasi hardware termasuk kabel jaringan, besaran konsumsi listrik, suhu ruangan harus terjaga, dan masih banyak lagi.

3. Skalabilitas terbatas

Jika kalian sudah membaca penjelasan awal lalu dari point 1 dan point 2, pasti sudah terbayang bukan bagaimana sulitnya untuk melakukan skalabilitas, misalkan katakanlah ternyata perusahaan yang tadinya merintis sudah cukup baik hanya dengan 1 server, lalu beberapa tahun kedepan ternyata bisnis nya berkembang, maka otomatis workload atau beban kerja ke server juga akan tambah banyak, nah mau tidak mau kita harus melakukan expand misal katakanlah menambah server lagi. Hal tersebut kalian harus mengulang lagi dari awal seperti membeli hardware nya terlebih dahulu, lalu melakukan instalasi, hingga melakukan maintenance kembali.

Intinya model infrastruktur On-Premise / Self Hosting ini adalah kita harus me-manage semuanya serba sendiri, mulai dari level lokasi, hardware, hingga ke software.

> **Catatan**: Walaupun mungkin terlihat jadul dan kaku, jenis model infrastruktur ini masih relevan hingga saat ini. Alasannya kenapa? karena beberapa perusahaan biasanya ingin menjaga agar data internal mereka aman, dan sebagainya.

### Colocation

Setelah mengetahui betapa rumit nya jenis infrastruktur On-Premise / Self Hosting, terbitlah Colocation Server. Colocation ini intinya adalah melakukan abstraksi di beberapa layer pada model On-Premise / Self Hosting. Di colocation server ini, kita masih tetap perlu membeli / memiliki hardware servernya sendiri, namun kita tidak perlu lagi memusingkan bagaimana menyiapkan dan mengelola ruangan tempat servernya diinstall, sehingga bisa dibilang kita ikut atau numpang servernya ditaruh di datacenter penyedia layanan colocation. Sehingga dari segi ruangan (listrik, suhu ruangan, dsb nya) dan jaringan lebih baik, namun dari segi scalling dan manage software di dalamnya tetap butuh waktu dan usaha manual.

### Cloud Computing

Selanjutnya masuk ke era Cloud Computing, dimana model infrastruktur ini banyak sekali melakukan abstraksi pada layer-layer sebelumnya baik itu di On-Premise ataupun Colocation. Sejarah awal cloud computing ini bisa menjadi ramai adalah pada tahun 2006 Amazon Web Service (AWS) membuka jasa dimana software atau aplikasi kita bisa di hosting atau disimpan di perangkat server milik mereka, dan itu secara kualitas sudah pasti dijamin, seperti nyala uptime dijamin 99,9% dan sebagai nya. Selanjutnya di susul oleh cloud provider lain yang menyediakan jasa serupa, seperti Google dengan Google Cloud Platform (GCP) nya dan juga Microsoft dengan Microsoft Azure nya.

Di model infrastruktur cloud computing ini terdapat 3 bagian utama atau service yang disediakan, yaitu:

1. Infrastructure as a Service (IaaS)

Pada service ini, provider melakukan abstraksi mulai dari lokasi, hardware, jaringan, storage, hingga ke level virtualisasi. Sehingga kita sebagai pengguna cukup fokus pada mengelola sistem operasi hingga ke level aplikasi nya. Beberapa nama service ini di cloud provider adalah seperti `AWS EC2`, `Google Compute Engine`, dan sebagainya.

2. Platform as a Service (PaaS)

Setelah mengetahui `IaaS`, selanjutnya masuk ke PaaS. Intinya service ini melakukan abstraksi dari service `IaaS` seperti Operating System (OS) dan bahkan ke level Runtime atau bahasa program nya. Sehingga kita sebagai pengguna cukup fokus ke pembuatan aplikasi dan mengelola data aplikasi nya, sebagai contoh misalkan kalian membuat aplikasi menggunakan Golang atau NodeJS atau PHP dan sebagainya, nah itu kalian cukup fokus pada pembuatan aplikasi nya saja, dari segi setup OS, Runtime dan sebagainya sudah di manage sama cloud provider. Biasanya aplikasi nya nanti berbentuk container atau sandbox, contoh beberapa nama service ini di cloud provider adalah seperti `Google Cloud Run`, `Google App Engine`, `AWS Lambda`, `AWS Fargate`, dan sebagainya.

> **Catatan**: Platform as a Service atau disingkat PaaS ini juga biasa di sebut sebagai Serverless, penyebutan Serverless tersebut juga bukan tanpa dasar, melainkan sangat mendukung dari jenis service yang ditawarkan nya, dimana kita tidak perlu lagi manage servernya bahkan hingga ke level sistem operasi dan "**Serverless**" itu bukan berarti tidak ada server, tapi pengelolaan server disembunyikan dari penggunanya.
>
> Biasanya service ini jenis pembayarannya adalah `Pay as You Go`, dimana kita cukup membayar berdasarkan penggunaan nya saja.
>
> Sebagai contoh adalah kita mempunyai aplikasi Web App atau RESTful API dan di deploy di PaaS di Google Cloud seperti Google Cloud Run. Nah perhitungan pembayarannya adalah based on traffic yang mengakses ke Web App atau RESTful API nya, sehingga jika tidak ada yang mengakses maka service tersebut tidak akan digunakan karena container nya bisa di scalling hingga ke 0.

3. Software as a Service (SaaS)

Sama halnya seperti `PaaS` yang melakukan abstraksi dari service `IaaS`. Service `SaaS` ini intinya melakukan abstraksi dari service `PaaS`, sehingga fully manage oleh provider atau penyedia jasa nya. Mungkin dari kita sendiri belum sadar bahwa kita sebetulnya sering menggunakan jasa `SaaS` ini, karena contoh dari service ini adalah seperti `Gmail`, `Outlook`, `YouTube`, dan sebagainya. Dimana kita sebagai pengguna tidak perlu lagi menyiapkan infrastruktur server, sistem operasi, data, bahkan hingga ke level pembuatan aplikasi nya.

## Evolusi Model Arsitektur dan Deployment Aplikasi

Setelah memahami evolusi model infrastruktur, dari On-Premise ke Colocation hingga Cloud Computing, kini kita lanjut ke evolusi model arsitektur aplikasi. Supaya lebih kebayang, perhatikan gambar berikut:

### Arsitektur

![Architecture & Deployment Models 3](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-1/architecture-&-deployment-models-3.png)

Pada gambar di atas, terlihat dua jenis arsitektur aplikasi, yaitu **Monolith Architecture** dan **Microservices Architecture**. Berikut penjelasannya:

#### Monolith Architecture

Di masa lalu, aplikasi dikembangkan dan dideploy dalam satu paket besar. Semua komponen mulai dari User Interface (UI), Authentication, Database, API, Business Logic, hingga Access Data Layer menjadi satu kesatuan. Arsitektur ini punya beberapa kelebihan dan kekurangan:

1. Mudah dideploy

Karena semua komponen jadi satu, kita tidak perlu memikirkan koneksi antar bagian aplikasi.

2. Sulit diatur saat aplikasi membesar

Semakin kompleks aplikasinya, semakin sulit mengelolanya. Mengubah logic di satu fitur bisa berdampak ke fitur lain. Selain itu, jika banyak developer yang bekerja di satu project, risiko conflict dan error juga meningkat.

3. Single Point of Failure

Bila satu fitur mengalami error, bisa saja menyebabkan seluruh aplikasi down akibat efek domino.

#### Microservices Architecture

Untuk mengatasi tantangan di arsitektur monolith, lahirlah konsep Microservices Architecture. Di sini, aplikasi dipecah menjadi layanan-layanan kecil berdasarkan fungsinya masing-masing. Misalnya, service authentication memiliki database sendiri, dikembangkan oleh tim tersendiri, dan bisa dideploy secara mandiri tanpa tergantung service lain.

Namun, microservices juga menghadirkan tantangan baru:

1. Koordinasi antar service

Dikarenakan sekarang aplikasi dideploy secara terpisah antar service, maka akan sangat menyulitkan bagi kita untuk mengatur bagaimana koordinasi atau komunikasi antar service nya.

2. Manage deployment setiap service

Selain kita akan menjadi sulit mengatur bagaimana koordinasi atau komunikasi antar service nya, kita juga akan sangat kesulitan me-manage deployment setiap service nya. Karena pasti akan banyak sekali service-service yang perlu kita deploy dan tentunya itu perlu kita manage.

Meski begitu, ada kelebihan besar dari microservices:

1. Aplikasi akan menjadi mudah diatur

Karena setiap service terpisah, perubahan di satu layanan tidak memengaruhi layanan lain. Bahkan tiap service bisa menggunakan bahasa pemrograman atau framework yang berbeda.

2. Aplikasi menjadi single responsibility

Hal ini akan sangat membantu sekali jika developer yang membangun aplikasi tersebut sudah banyak, dengan menggunakan arsitektur microservice ini, setiap developer tidak perlu lagi membaca atau memahami semua keseluruhan kode yang ada di aplikasi. Jadi developer bisa fokus pada pengembangan di service tertentu, lalu jika terdapat error juga kita tidak perlu lagi memusingkan siapa yang mengurus nya, karena sudah di bagi per team sesuai dengan pekerjaan service nya.

3. Aplikasi tidak menjadi single point of failure

Berbeda dengan arsitektur monolith, aplikasi yang dikembangkan menggunakan arsitektur microservice ini tidak mempunyai kekurangan single point of failure. Contohnya adalah ketika service payment mati, hal tersebut tidak akan membuat keseluruhan aplikasi mati, melainkan hanya service payment nya saja yang mati, sehingga service-service lain contohnya seperti authentication akan tetap berjalan normal.

> **Catatan**: Pemilihan arsitektur tidak bisa hanya mengikuti tren. Setiap pendekatan punya kelebihan dan kekurangannya masing-masing. Pilihlah arsitektur berdasarkan kebutuhan aplikasi, ukuran tim, dan kompleksitas sistem yang ingin dikembangkan.

### Deployment

Selain evolusi dari segi arsitektur, terdapat evolusi juga dari segi deployment nya, mungkin ini akan sedikit mundur ke pembahasan evolusi model infrastruktur, namun jangan khawatir pembahasan ini masih relevan dengan evolusi arsitektur.

![Architecture & Deployment Models 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-1/architecture-&-deployment-models-2.png)

Kalian bisa lihat gambar di atas, terdapat 2 jenis deployment aplikasi, yaitu On-Premise atau Self Hosting + Colocation dan satu lagi adalah Cloud Computing. Agar lebih jelas berikut adalah penjelasan masing-masing evolusi deployment aplikasi gambar di atas.

#### On Premise atau Self Hosting dan Colocation

Dulu aplikasi itu dideploy dengan beberapa cara, diantaranya adalah:

1. Shared Hosting

Deployment aplikasi ini dimana aplikasi akan disimpan dengan cara berbagi resource atau komputasi dengan beberapa user, jika kalian familiar salah satu contohnya adalah cPanel. Dimana setiap aplikasi berbagi sumber daya dengan aplikasi atau user lain untuk melayani traffic dari client.

2. Virtualized & Containerized

![Architecture & Deployment Models 4](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-1/architecture-&-deployment-models-4.png)

Berbeda dengan shared hosting, deployment aplikasi menggunakan Virtualized ini lebih ekslusif karena biasanya hanya satu user satu mesin, sehingga tidak ada lagi berbagi resource atau komputasi dengan user lain, jika kalian familiar salah satu contohnya adalah Virtual Private Server (VPS). Sehingga aplikasi yang di deploy menggunakan Virtualized ini dapat melayani traffic dari client lebih dari shared hosting, karena sudah tidak lagi berbagi resource atau komputasi dengan aplikasi lain.

Walaupun deployment menggunakan virtualisasi ini lebih eksklusif, tetap saja ada kelemahannya, dimana akan sangat merepotkan untuk scalling aplikasi nya, dimana kita perlu membuat virtual machine nya, setup OS nya hingga ke setup aplikasi nya, walaupun sebetulnya kita bisa mengatasi masalah tersebut dengan salah satu contohnya adalah membuat VM template, namun tetap saja dari segi booting akan sangat lama.

Oleh karena itu, munculah solusi lain yaitu Containerized, dimana containerized ini mengabstraksi layer Operating System (OS) yang ada di Virtual Machine, sehingga untuk melakukan scalling aplikasi akan sangat mudah dan dari segi booting juga akan sangat lebih cepat. Deployment berbasis container inilah yang menjadi fondasi Kubernetes.

#### Cloud Computing Deployment

Sama hal nya yang sudah dijelaskan sebelumnya di evolusi infrastruktur, terdapat 3 jenis service utama yang disediakan oleh cloud provider yaitu `IaaS`, `PaaS`, dan `SaaS`. Intinya cloud computing tersebut melakukan abstraksi dari setiap layer-layer nya berdasarkan jenis service nya, sehingga kita tidak perlu lagi me-manage nya secara manual. Walaupun sebetulnya teknologi dibalik service-service tersebut adalah hal yang sama seperti Virtual Machine dan Containerized.

> **Catatan**: Sama halnya dengan pemilihan arsitektur, pemilihan pada jenis deployment ini juga tergantung dengan kebutuhan dan keadaan pada saat mengembangkan aplikasi nya. Sehingga tidak ada satu solusi yang pasti dan yang lainnya salah, karena masing-masing jenis deployment mempunyai pros dan cons nya tersendiri.

### Masalah Baru: Mengelola Banyak Container

Nah dikarenakan kita akan mempelajari Kubernetes, maka pemilihan arsitektur dan deployment kita pasti akan condong ke microservice dan juga container. Namun hal tersebut tentu akan sangat merepotkan untuk kita mengelola banyak nya container, sebagai contoh misalkan suatu feature memiliki replica 3, maka kita harus membuat 3 container yang sama untuk feature tersebut, dan itu bayangkan baru 1 feature, bagaimana dengan keseluruhan feature yang ada di aplikasi nya? Selain itu terdapat beberapa contoh masalah lainnya, seperti:

1. Setiap service butuh container nya tersendiri (isolated)
2. Setiap container kita harus mengetahui mana yang jalan, crash, overload, dan sebagainya
3. Bagaimana scalling container nya
4. Bagaimana melakukan health check container nya
5. Bagaimana jika terdapat kegagalan deployment dan melakukan rollback dan sebagainya

Oleh karena itu, munculah solusi baru yaitu teknologi container orchestration, salah satu teknologi yang ingin memecahkan masalah tersebut adalah Kubernetes.

## Sejarah Kubernetes

Dari dulu Google sudah menjalankan ratusan juta container per minggu menggunakan sistem internal mereka yang berama `Borg`, lalu teknologi tersebut dikembangkan lagi dan berganti nama menjadi `Omega`, nah teknologi tersebut lah yang melakukan manage seperti automation scalling dan deployment container di Google. Lalu pada tahun 2014, Google membuat ulang sistem container orchestrator tersebut namun dengan versi open-source berdasarkan pengalaman dari internal nya tersebut, dan teknologi tersebut diberi nama `Kubernetes`.

### Fun Fact

- Nama `Kubernetes` berasal dari bahasa Yunani yang berarti "**Nahkoda Kapal**" atau "**Juru Mudi**" atau "**Pilot**"
- Simbol logonya adalah roda kapal dengan 7 sisi, karena 7 engineer awalnya.
- Kubernetes sekarang dikelola oleh **Cloud Native Computing Foundation (CNCF)** dan jadi proyek open source paling populer di dunia infrastruktur cloud.

## Penutup

Kubernetes lahir karena dari perjalanan evolusi yang panjang baik itu dari infrastruktur, arsitektur, hingga ke deployment aplikasi. Kubernetes juga lahir karena kompleksitas nya microservice dan container yang butuh sistem manajemen otomatis, teknologi Kubernetes sendiri bukan solusi yang pertama, tapi saat ini adalah solusi paling banyak diadopsi.

Seru bukan episode 1 kali ini? Kita sudah membahas evolusi dari awal hingga lahirnya Kubernetes 😅. Pastikan semangat kalian masih tetap ada, karena di episode 2 selanjutnya kita akan mulai terjun membahas mengenai Konsep dan Arsitektur Kubernetes nya. So pastikan tetap semangat 😁.

> **Catatan**: Untuk kalian yang ingin lanjut membaca, bisa click gambar thumbnail episode 2 di bawah ini
>
> <a href="belajar-kubernetes-episode-2-mengenal-konsep-dan-arsitektur-kubernetes">
>    <img src="/images/posts/Belajar Kubernetes - Episode 2 - MENGENAL KONSEP DAN ARSITEKTUR KUBERNETES.png" />
> </a>
