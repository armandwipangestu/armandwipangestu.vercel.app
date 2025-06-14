---
published: true
title: "Belajar Kubernetes - Episode 3 - Instalasi Kubernetes Cluster (Master & Worker Node)"
tag: "DevOps"
date: "May 12 2025"
excerpt: "Di episode ini kita akan mulai masuk ke praktik hands-on, melakukan instalasi Kubernetes Cluster menggunakan berbagai cara: Minikube, Kind, K3s, hingga instalasi K8s manual menggunakan kubeadm"
cover_image: "/images/posts/Belajar Kubernetes - Episode 3 - INSTALASI KUBERNETES CLUSTER (MASTER & WORKER NODE).png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**: Untuk kalian yang ingin membaca episode sebelumnya, bisa click gambar thumbnail episode 2 di bawah ini
>
> <a href="belajar-kubernetes-episode-2-mengenal-konsep-dan-arsitektur-kubernetes">
>    <img src="/images/posts/Belajar Kubernetes - Episode 2 - MENGENAL KONSEP DAN ARSITEKTUR KUBERNETES.png" />
> </a>

Setelah di episode sebelumnya kita membahas mengenai konsep dan arsitektur dari Kubernetes, di episode 3 ini kita akan mulai masuk ke tahap praktik, yaitu melakukan **instalasi Kubernetes Cluster** baik Master Node maupun Worker Node. Untuk melakukan instalasi Kubernetes Cluster dengan kebutuhan development atau testing atau pembelajaran, terdapat beberapa cara diantarannya adalah menggunakan tool berikut ini:

1. [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)
2. [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
3. [K3s](https://docs.k3s.io/quick-start)
4. [K8s](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)

Agar kita tidak bingung untuk memilih menggunakan tool yang mana, berikut adalah penjelasan terkait setiap tool-tool tersebut, sehingga nantinya kita bisa memilih mana yang terbaik untuk kebutuhan kita

## Penjelasan dasar dari Minikube, Kind, K3s, dan K8s

Dikarenakan orchestration container terus berkembang, para developer memiliki banyak tool yang dapat digunakan untuk pengembangan atau development Kubernetes di local. Di antara tool-tool ini, Minikube, Kind, K3s, dan K8s menojol sebagai pilihan populer bagi para developer yang ingin menguji, mengembangkan, dan menjalankan aplikasi Kubernetes secara local.

### Minikube

Minikube adalah tool yang diadopsi secara luas yang dirancang untuk menjalankan Kubernetes Cluster pada berbagai sistem operasi, termasuk `macOS`, `Linux`, dan `Windows`. Minikube menyediakan cara yang sederhana bagi para developer untuk menjalankan Kubernetes secara local dan ideal untuk menguji aplikasi dalam lingkungan yang terkendali. Minikube mendukung beberapa hypervisor seperti `VirtualBox`, `VMware`, dan `HyperKit`, membuatnya fleksibel untuk berbagai infrastruktur. Selain itu, minikube menawarkan fitur-fitur seperti kemampuan untuk mengaktifkan atau menonaktifkan komponen Kubernetes tertentu, yang memungkinkan para developer untuk menyesuaikan lingkungan mereka agar sesuai dengan pengaturan production. Fleksibilitas ini sangat penting untuk melakukan debug dan memastikan bahwa aplikasi berperilaku seperti yang diharapkan sebelum deployment.

### Kind

Kind, singkatan dari **Kubernetes in Docker**, adalah opsi lain yang memungkinkan pengguna untuk membuat Kubernetes Cluster menggunakan container Docker sebagai node nya. Pendekatan ini mengikuti prinsip-prinsip containerized, sehinga memungkinkan penyiapan dan pembongkaran cluster dengan cepat. Kind sangat berguna untuk menguji Kubernetes itu sendiri dan biasanya digunakan oleh developer pada CI/CD pipeline. Kemampuannya untuk menjalankan cluster di Docker berarti bahwa developer dapat dengan mudah mereplikasi production environment mereka dengan cara yang ringan, menjadikannya pilihan yang sangat baik untuk workflow integrasi berkelanjutan. Selain itu, Kind mendukung cluster multi-node, yang dapat bermanfaat untuk mensimulasikan skenario yang lebih kompleks yang mungkin dihadapi developer dalam aplikasi dunia nyata.

### K3s

K3s, di sisi lain, adalah distribusi Kubernetes ringan yang dikembangkan oleh [Rancher Labs](https://www.rancher.com/). Distribusi ini bertujuan untuk menyediakan versi Kubernetes yang disederhanakan, sehingga cocok utnuk lingkungan dengan resouce atau sumber daya yang terbatas. K3s sangat bermanfaat untuk `edge computing`, `aplikasi IoT`, dan skenario di mana instalasi Kubernetes yang lengkap tidak dapat dilakukan karena keterbatasan hardware. Dengan ukuran binary yang kurang dari `100 MB`, K3s dirancang untuk berjalan di perangkat berdaya rendah, seperti Raspberry Pi, dan dapat digunakan dengan cepat dan mudah. Selain itu, K3s dilengkapi dengan dukungan bawaan untuk Helm, sehingga memudahkan untuk mengelola aplikasi dan layanan di dalam cluster, dan secara otomatis menangani tugas-tugas umum seperti mengelola certificate dan jaringan, yang secara siginifikan dapat mengurangi biaya operasional bagi pengguna.

### K8s (Kubernetes)

Kubernetes, atau sering disingkat **K8s**, adalah platform orkestrasi container open-source yang digunakan untuk otomatisasi deployment, scaling, dan manajemen aplikasi containerized. Berbeda dengan Minikube, Kind, dan K3s, Kubernetes lebih sering digunakan dalam lingkungan produksi, meskipun bisa juga digunakan dalam development dan testing.

## Perbandingan Fitur Utama: Minikube, Kind, K3s, dan K8s

Ketika membandingkan fitur-fitur utama Minikube, Kind, K3s, dan K8s, sangat penting untuk mempertimbangkan beberapa faktor yang menentukan kegunaan dan kinerja mereka:

### Kebutuhan Sumber Daya

Minikube umumnya membutuhkan lebih banyak sumber daya, karena menjalankan Kubernetes Cluster penuh dalam Virtual Machine (tergantung sistem operasi, jika Minikube berjalan di Linux, maka bisa langsung berjalan di container). Kind, meskipun lebih ringan daripada Minikube, masih membutuhkan resource Docker. K3s dioptimalkan untuk konsumsi resource minimal, sedangkan K8s sendiri diperuntukan untuk lingkungan production dan akan sangat memakan resource dibandingkan dengan tool yang lain.

### Kompleksitas Instalasi

Minikube menawarkan proses instalasi yang sangat mudah, meskipun menyiapkan Hypervisor yang diperlukan dapat memakan waktu. Kind memiliki pengaturan yang lebih sederhana yang hanya membutuhkan Docker. K3s sering kali dapat diinstall hanya dalam beberapa perintah, sedangkan K8s memerlukan instalasi yang cukup kompleks karena setiap komponen harus di install secara manual seperti `kubectl`, `kubeadm`, `CRI`, `CNI`, dan sebagainya.

### Jaringan dan Penyimpanan

Minikube menyediakan tumpukan jaringan dengan fitur lengkap, termasuk dukungan LoadBalancer. Jaringan Kind bergantung pada kemampuan jaringan Docker. K3s menyertakan opsi bawaan untuk jaringan ringan dan manajemen penyimpanan, sedangkan K8s mendukung semua fitur yang ada namun tetap memerlukan setup yang lebih kompleks.

### Ekstensibilitas

Minikube mendukung add-ons yang dapat meningkatkan fungsionalitas dengan mudah. Kind memungkinkan pengguna untuk menyesuaikan cluster melalui berkas konfigurasi seperti `YAML` file, dan K3s kompatibel dengan Kubernetes, memungkinkan penggunaan ekstensi dan API Kubernetes yang ada.

Aspek penting lainnya yang perlu dipertimbangkan adalah skenario kasus penggunaan untuk setiap tool. Minikube sangat bermanfaat bagi para developer yang ingin menguji aplikasi dalam environment yang sangat mirip dengan Kubernetes Cluster production. Hal ini membuatnya ideal bagi mereka yang perlu memvalidasi aplikasi mereka terhadap API Kubernetes secara penuh. Di sisi lain, Kind bersinar di environment CI/CD, di mana spin-up dan tear-down cluster yang cepat sangat penting untuk pengujian otomatis. Kemampuannya untuk membuat cluster dalam Docker container membuatnya menjadi favorit di antara para developer yang ingin mengintegrasikan pengujian Kubernetes ke dalam workflow mereka yang sudah ada.

Selain itu, dukungan komunitas dan dokumentasi seputar tool ini dapat secara signifikan mempengaruhi adopsi mereka. Minikube memiliki komunitas yang kuat dan dokumentasi yang ekstensif, sehingga memudahkan para pendatang baru untuk menemukan resource dan memecahkan masalah. Kind, meskipun masih baru, telah mendapat manfaat dari dukungan komunias Kubernetes, yang memastikan bahwa dokumentasinya terus diperbarui. K3s, yang dikembangkan oleh Rancher Labs, juga memiliki keterlibatan komunitas yang kuat dan menawarkan resource yang komprehensif, terutama bagi mereka yang tertarik untuk menerapkan Kubernetes Cluster yang ringan dalam skenario edge computing atau perangkat IoT.

## Performance Metrics: Tool mana yang paling unggul?

Untuk mengevaluasi kinerja di seluruh Minikube, Kind, dan K3s membutuhkan pemeriksaan berbagai metrics, seperti waktu startup, pemanfaatan resource atau sumber daya, dan stabilitas opersaional.

### Waktu Startup

Kind sering kali menjadi yang tercepat untuk memulai karena langsung menggunakan Docker container. Minikube dapat membutuhkan waktu lebih lama untuk melakukan bootstrap karena overhead untuk memulai virtual machine, sedangkan K3s menawarkan penerapan yang cepat dengan konfigurasi yang lebih sedikit.

### Pemanfaatan Resource

K3s unggul dalam kategori ini, karena dirancang untuk berjalan dalam pengaturan resource terbatas. Minikube cenderung mengonsumsi lebih banyak RAM dan CPU, sementara pendekatan berbasis Docker container dari Kind bisa lebih efisien daripada pendekatan virtual machine yang tradisional.

### Stabilitas Operasional

Keempatnya telah terbukti stabil di berbagai lingkungan atau environment. Namun, K3s menyertakan alternatif `etcd` ringan bawaan (embedded) yang dapat meningkatkan keandalan dan kinerja.

## Use Cases

Kapan memilih Minikube, Kind, K3s, atau K8s? Memahami skenario di mana setiap tool unggul dapat secara siginifikan memengaruhi keputusan dalam memilih tool yang tepat untuk pengembangan Kubernetes secara local.

### Penggunaan Minikube

Paling cocok untuk pengembangan yang mencari pengalaman Kubernetes yang out of the box dengan set fitur lengkap. Sangat ideal untuk mengeksplorasi kemampuan Kubernetes, menguji aplikasi yang kuat, atau ketika bekerja dengan berbagai add-on.

### Penggunaan Kind

Sangat baik untuk lingkungan integrasi berkelanjutan yang mengutamakan kecepatan dan efisiensi. Jenis ini sangat disukai oleh para developer yang perlu menerapkan cluster sesaat dengan cepat untuk tujuan pengujian.

### Penggunaan K3s

Solusi tepat bagi developer yang menargetkan edge computing, perangkat IoT, atau aplikasi dengan sumber daya rendah. Sifatnya yang ringan membuatnya menjadi pilihan yang lebih disukai ketika Kubernetes harus beroperasi dengan mulus pada perangkat keras yang kurang kuat.

### Penggunaan K8s (Kubernetes)

Sangat cocok untuk production environment walaupun bisa juga digunakan untuk development atau testing, dimana semua fitur Kubernetes sudah pasti didukung, namun memerlukan instalasi dan konfigurasi yang lebih kompleks dan memakan resource atau sumber daya lebih dibandingkan dengan tool lainnya.

## Instalasi dan Setup

Setelah mengetahui tool mana yang paling cocok dan dipilih untuk digunakan, selanjutnya kita akan bahas terkait instalasi dan setup untuk setiap tool Kubernetes Cluster tersebut.

### Prerequisites

Namun sebelum memulai melakukan instalasi dan setup, disini kita memerlukan beberapa penyiapan terlebih dahulu, diantaranya adalah:

> **Catatan**: Disini saya sudah menyiapkan Virtual Machine di Proxmox dengan sistem operasi Ubuntu Server 24.04 LTS, sudah melakukan instalasi Docker / Containerd, dan melakukan pointing local domain di Name Server local.

1. Virtual Machine / OS

![Pre-Requisites 1](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-3/pre-requisites-1.png)

2. Docker / Containerd (Container Runtime Interface atau `CRI`)

![Pre-Requisites 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-3/pre-requisites-2.png)

3. Pointing local domain (opsional)

![Pre-Requisites 3](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-3/pre-requisites-3.png)

> **Catatan**: Untuk kalian yang menggunakan sistem operasi yang sama yaitu Ubuntu Server 24.04 LTS dan ingin melakukan instalasi docker, bisa menggunakan perintah berikut ini
>
> 1. Menambahkan GPG Key
>
> ```bash
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
> ```
>
> 2. Menambahkan Repository Docker
>
> ```bash
> echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
> ```
>
> 3. Update Repository & Install Docker Community Edition
>
> ```bash
> sudo apt update && apt-cache policy docker-ce && sudo apt install docker-ce
> ```
>
> 4. Menambahkan current user ke group `docker` agar tidak perlu menggunakan `sudo`
>
> ```bash
> sudo usermod -aG docker ${USER} && su - ${USER}
> ```
>
> 5. Install utility docker
>
> ```bash
> sudo apt update && sudo apt install docker-ce-cli containerd.io docker-compose-plugin docker-compose
> ```

Setelah semua pre-requisites di atas sudah terpenuhi, maka sekarang kita bisa lanjut ke tahap melakukan instalasi tool-tool yang sudah dibahas sebelumnya untuk membuat Kubernetes Cluster.

### Instalasi Minikube

Untuk melakukan instalasi Kubernetes Cluster menggunakan minikube caranya cukup mudah, yaitu kita cukup jalankan perintah-perintah berikut ini:

#### Install Binary Minikube

Langkah pertama untuk melakukan instalasi minikube adalah mendownload dan install binary file nya, untuk melakukannya jalankan perintah berikut ini

```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
```

#### Menjalankan Minikube

Setelah binary nya berhasil di install, selanjutnya adalah menjalankan minikube nya, untuk menjalankannya kalian bisa menggunakan perintah berikut ini

> **Catatan**: Perintah berikut akan membuat Kubernetes Cluster, dan minikube akan mendownload dependency-dependency yang dibutuhkan seperti Kubernetes, CNI (Container Networking Interface) dan sebagainya. Default Kubernetes Cluster yang akan dibuat oleh minikube adalah 1 node, dimana Control Plane (Master Node) dan juga Data Plane (Worker Node) nya akan menjadi satu komponen di 1 node yang sama.
>
> Untuk membuat Kubernetes Cluster lebih dari 1 node di minikube, kalian bisa jalankan perintah berikut ini
>
> ```bash
> minikube start --nodes [total_node] -p [nama_cluster]
> ```
>
> Namun menjalankan Kubernetes Cluster lebih dari 1 node pastinya akan memakan resource atau sumber daya lebih dibandingkan hanya dengan 1 node.
>
> Jika kalian ingin menjalankan Minikube dengan network nya direct langsung ke Host, maka kalian bisa menjalankan minikube nya menggunakan perintah berikut ini
>
> ```bash
> minikube start --vm-drive=none
> ```
>
> Namun perintah di atas perlu melakukan setup manual tambahan terkait dependency-dependency nya seperti `CRI` dan `CNI`, untuk informasi lebih lanjutnya kalian bisa baca issue berikut ini [#33](https://github.com/manusa/actions-setup-minikube/issues/33)

```
minikube start
```

> **Catatan**: Disini karena saya mengalokasikan resource atau sumber daya hardware ke Virtual Machine nya cukup lumayan, jadi saya akan jalankan Kubernetes Cluster dari minikube nya dengan total 3 node, dimana 1 Control Plane (Master Node) dan 2 Data Plane (Worker Node). Dimana saya menjalankannya menggunakan perintah berikut ini
>
> ```bash
> minikube start --nodes 3 -p minikube
> ```

Jika perintah di atas berhasil dijalankan, maka hasil output nya akan muncul seperti ini

```bash
😄  minikube v1.35.0 on Ubuntu 24.04 (kvm/amd64)
✨  Automatically selected the docker driver. Other choices: ssh, none
📌  Using Docker driver with root privileges
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.46 ...
💾  Downloading Kubernetes v1.32.0 preload ...
    > preloaded-images-k8s-v18-v1...:  333.57 MiB / 333.57 MiB  100.00% 1.72 Mi
    > gcr.io/k8s-minikube/kicbase...:  500.31 MiB / 500.31 MiB  100.00% 1.67 Mi
🔥  Creating docker container (CPUs=2, Memory=2200MB) ...
🐳  Preparing Kubernetes v1.32.0 on Docker 27.4.1 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass

👍  Starting "minikube-m02" worker node in "minikube" cluster
🚜  Pulling base image v0.0.46 ...
🔥  Creating docker container (CPUs=2, Memory=2200MB) ...
🌐  Found network options:
    ▪ NO_PROXY=192.168.49.2
🐳  Preparing Kubernetes v1.32.0 on Docker 27.4.1 ...
    ▪ env NO_PROXY=192.168.49.2
🔎  Verifying Kubernetes components...

👍  Starting "minikube-m03" worker node in "minikube" cluster
🚜  Pulling base image v0.0.46 ...
🔥  Creating docker container (CPUs=2, Memory=2200MB) ...
🌐  Found network options:
    ▪ NO_PROXY=192.168.49.2,192.168.49.3
🐳  Preparing Kubernetes v1.32.0 on Docker 27.4.1 ...
    ▪ env NO_PROXY=192.168.49.2
    ▪ env NO_PROXY=192.168.49.2,192.168.49.3
🔎  Verifying Kubernetes components...
💡  kubectl not found. If you need it, try: 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

Setelah Kubernetes Cluster berhasil dibuat, kalian bisa tambahkan alias berikut di file `~/.bashrc` atau `~/.zshrc` untuk mempermudah perintah `kubectl` yang akan berinteraksi ke cluster nya

```bash
alias kubectl="minikube kubectl --"
```

Untuk memastikan apakah Kubernetes Cluster berhasil dibuat, kalian bisa jalankan perintah berikut ini untuk melakukan pengecekan nodes apa saja yang terdaftar di cluster nya

```bash
kubectl get nodes -o wide
```

Jika perintah di atas berhasil dijalankan, maka akan terlihat berapa banyak nodes yang ada di cluster dan terdapat informasi lainnya seperti `STATUS`, `ROLE`, `VERSION`, dan sebagainya seperti ini

```bash
    > kubectl.sha256:  64 B / 64 B [-------------------------] 100.00% ? p/s 0s
    > kubectl:  54.67 MiB / 54.67 MiB [--------------] 100.00% 2.70 MiB p/s 20s
NAME           STATUS   ROLES           AGE     VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
minikube       Ready    control-plane   8m8s    v1.32.0   192.168.49.2   <none>        Ubuntu 22.04.5 LTS   6.8.0-51-generic   docker://27.4.1
minikube-m02   Ready    <none>          7m42s   v1.32.0   192.168.49.3   <none>        Ubuntu 22.04.5 LTS   6.8.0-51-generic   docker://27.4.1
minikube-m03   Ready    <none>          7m29s   v1.32.0   192.168.49.4   <none>        Ubuntu 22.04.5 LTS   6.8.0-51-generic   docker://27.4.1
```

#### Mencoba deploy Nginx di Minikube

Untuk lebih memastikan apakah instalasi Kubernetes Cluster nya berhasil dilakukan, kita bisa coba lakukan deploy aplikasi Nginx default, untuk melakukan deployment nya kalian bisa buat sebuah YAML file menggunakan perintah berikut ini

> **Catatan**: Jika kalian tidak ingin menulis konfigurasi YAML berikut secara manual, kalian bisa gunakan dari github repository yang sudah saya buat
>
> ```bash
> kubectl apply -f https://raw.githubusercontent.com/armandwipangestu/belajar-k8s/refs/heads/main/episode-3/example/nginx-deployment.yml
> ```

```bash
nvim nginx-deployment.yml
```

Lalu isikan konfigurasi nya seperti ini

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

Setelah itu lakukan deployment konfigurasi YAML file tersebut ke dalam Kubernetes Cluster menggunakan perintah berikut ini

```bash
kubectl apply -f nginx-deployment.yml
```

Selanjutnya cek pod dan service apakah sudah berhasil berjalan atau tidak menggunakan perintah berikut ini

```bash
kubectl get pods
kubectl get svc
```

Jika pod dan service berhasil dijalankan, maka output nya akan terlihat seperti ini

```bash
NAME                              READY   STATUS    RESTARTS   AGE
nginx-deployment-96b9d695-546qw   1/1     Running   0          101s

NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP        20m
nginx-service   NodePort    10.106.176.104   <none>        80:30080/TCP   99s
```

Untuk lebih memastikan apakah nginx berhasil dijalankan dan dapat diakses, kalian bisa cek menggunakan perintah berikut ini

> **Catatan**: Sesuaikan alamat ip address dari node dan port service yang digunakan

```bash
curl http://192.168.49.2:30080
```

Jika perintah di atas berhasil dijalankan, maka hasilnya akan terlihat seperti ini

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

### Instalasi Kind

Untuk melakukan instalasi Kubernetes Cluster menggunakan Kind caranya sama seperti minikube dimana cukup mudah, cukup jalankan perintah-perintah berikut ini:

#### Install Binary Kind

Langkah pertama untuk melakukan instalasi Kind adalah mendownload dan install binary file nya, untuk melakukannya jalankan perintah berikut ini

```bash
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.27.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

#### Menjalankan Kind

Setelah binary nya berhasil di install, selanjutnya adalah menjalankan Kind nya, untuk menjalankannya kalian bisa menggunakan perintah berikut ini

> **Catatan**: Perintah berikut akan membuat Kubernetes Cluster, dan Kind akan mendownload dependency-dependency yang dibutuhkan seperti pull kubernetes image, CNI (Container Networking Interface) dan sebagainya. Default Kubernetes Cluster yang akan dibuat oleh Kind adalah 1 node, dimana Control Plane (Master Node) dan juga Data Plane (Worker Node) nya akan menjadi satu komponen di 1 node yang sama.
>
> Untuk membuat Kubernetes Cluster lebih dari 1 node di Kind, kalian bisa define YAML file terlebih dahulu seperti ini
>
> ```yml
> kind: Cluster
> apiVersion: kind.x-k8s.io/v1alpha4
> nodes:
>   - role: control-plane
>   - role: worker
>   - role: worker
> ```
>
> Lalu jalankan perintah berikut ini
>
> ```bash
> kind create cluster --name [nama_cluster] --config [lokasi_file.yml]
> ```
>
> Namun menjalankan Kubernetes Cluster lebih dari 1 node pastinya akan memakan resource atau sumber daya lebih dibandingkan hanya dengan 1 node.

```
kind create cluster
```

> **Catatan**: Disini karena saya mengalokasikan resource atau sumber daya hardware ke Virtual Machine nya cukup lumayan, jadi saya akan jalankan Kubernetes Cluster dari Kind nya dengan total 3 node, dimana 1 Control Plane (Master Node) dan 2 Data Plane (Worker Node). Dimana saya menjalankannya menggunakan perintah berikut ini
>
> ```bash
> kind create cluster --name dev-cluster --config kind-config-cluster.yml
> ```

Jika perintah di atas berhasil dijalankan, maka hasil output nya akan muncul seperti ini

```bash
Creating cluster "dev-cluster" ...
 ✓ Ensuring node image (kindest/node:v1.32.2) 🖼
 ✓ Preparing nodes 📦 📦 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
 ✓ Joining worker nodes 🚜
Set kubectl context to "kind-dev-cluster"
You can now use your cluster with:

kubectl cluster-info --context kind-dev-cluster

Have a nice day! 👋
```

> **Catatan**: Dikarenakan untuk interaksi ke Kubernetes Cluster memerlukan binary `kubectl`, oleh karena itu kita perlu melakukan instalasi manual untuk `kubectl` tersebut.
>
> 1. Download binary kubectl
>
> ```bash
> curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
> ```
>
> 2. Change mode execute dan pindahkan ke binary PATH
>
> ```bash
> chmod +x kubectl && sudo mv kubectl /usr/local/bin
> ```

Untuk memastikan apakah Kubernetes Cluster berhasil dibuat, kalian bisa jalankan perintah berikut ini untuk melakukan pengecekan nodes apa saja yang terdaftar di cluster nya

```bash
kubectl get nodes -o wide
```

Jika perintah di atas berhasil dijalankan, maka akan terlihat berapa banyak nodes yang ada di cluster dan terdapat informasi lainnya seperti `STATUS`, `ROLE`, `VERSION`, dan sebagainya seperti ini

```bash
NAME                        STATUS   ROLES           AGE   VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE                         KERNEL-VERSION     CONTAINER-RUNTIME
dev-cluster-control-plane   Ready    control-plane   49s   v1.32.2   172.18.0.4    <none>        Debian GNU/Linux 12 (bookworm)   6.8.0-51-generic   containerd://2.0.2
dev-cluster-worker          Ready    <none>          41s   v1.32.2   172.18.0.3    <none>        Debian GNU/Linux 12 (bookworm)   6.8.0-51-generic   containerd://2.0.2
dev-cluster-worker2         Ready    <none>          40s   v1.32.2   172.18.0.2    <none>        Debian GNU/Linux 12 (bookworm)   6.8.0-51-generic   containerd://2.0.2
```

#### Mencoba deploy Nginx di Kind

Untuk lebih memastikan apakah instalasi Kubernetes Cluster nya berhasil dilakukan, kita bisa coba lakukan deploy aplikasi Nginx default, untuk melakukan deployment nya kalian bisa buat sebuah YAML file menggunakan perintah berikut ini

> **Catatan**: Jika kalian tidak ingin menulis konfigurasi YAML berikut secara manual, kalian bisa gunakan dari github repository yang sudah saya buat
>
> ```bash
> kubectl apply -f https://raw.githubusercontent.com/armandwipangestu/belajar-k8s/refs/heads/main/episode-3/example/nginx-deployment.yml
> ```

```bash
nvim nginx-deployment.yml
```

Lalu isikan konfigurasi nya seperti ini

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

Setelah itu lakukan deployment konfigurasi YAML file tersebut ke dalam Kubernetes Cluster menggunakan perintah berikut ini

```bash
kubectl apply -f nginx-deployment.yml
```

Selanjutnya cek pod dan service apakah sudah berhasil berjalan atau tidak menggunakan perintah berikut ini

```bash
kubectl get pods
kubectl get svc
```

Jika pod dan service berhasil dijalankan, maka output nya akan terlihat seperti ini

```bash
NAME                              READY   STATUS    RESTARTS   AGE
nginx-deployment-96b9d695-dp2hw   1/1     Running   0          47s

NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.96.0.1       <none>        443/TCP        2m45s
nginx-service   NodePort    10.96.169.192   <none>        80:30080/TCP   50s
```

Untuk lebih memastikan apakah nginx berhasil dijalankan dan dapat diakses, kalian bisa cek menggunakan perintah berikut ini

> **Catatan**: Sesuaikan alamat ip address dari node dan port service yang digunakan

```bash
curl http://172.18.0.4:30080
```

Jika perintah di atas berhasil dijalankan, maka hasilnya akan terlihat seperti ini

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

### Instalasi K3s

Untuk melakukan instalasi Kubernetes Cluster menggunakan K3s cukup jalankan perintah-perintah berikut ini:

#### Fetch dan Execute script installer K3s

Untuk melakukan instalasi K3s kita bisa langsung fetch script installer nya dan langsung execute menggunakan perintah berikut ini:

```bash
curl -sfL https://get.k3s.io | sh -
```

Perintah di atas akan langsung menjalankan script installer k3s secara otomatis, dimana akan melakukan download binary `k3s`, `kubectl`, `crictl`, dan sebagainya. Sehingga jika perintah di atas berhasil dijalankan maka output nya akan terlihat seperti ini.

```bash
[INFO]  Finding release for channel stable
[INFO]  Using v1.32.4+k3s1 as release
[INFO]  Downloading hash https://github.com/k3s-io/k3s/releases/download/v1.32.4+k3s1/sha256sum-amd64.txt
[INFO]  Skipping binary downloaded, installed k3s matches hash
[INFO]  Skipping installation of SELinux RPM
[INFO]  Skipping /usr/local/bin/kubectl symlink to k3s, already exists
[INFO]  Skipping /usr/local/bin/crictl symlink to k3s, already exists
[INFO]  Skipping /usr/local/bin/ctr symlink to k3s, command exists in PATH at /usr/bin/ctr
[INFO]  Creating killall script /usr/local/bin/k3s-killall.sh
[INFO]  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
[INFO]  env: Creating environment file /etc/systemd/system/k3s.service.env
[INFO]  systemd: Creating service file /etc/systemd/system/k3s.service
[INFO]  systemd: Enabling k3s unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s.service → /etc/systemd/system/k3s.service.
[INFO]  No change detected so skipping service start
```

Untuk mengecek apakah K3s berhasil di install, kita bisa jalankan perintah berikut ini

```bash
sudo kubectl get nodes -o wide
```

Maka hasil nya akan terlihat seperti ini

```bash
NAME    STATUS   ROLES                  AGE    VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
k3s-1   Ready    control-plane,master   103s   v1.32.4+k3s1   20.20.20.11   <none>        Ubuntu 24.04.1 LTS   6.8.0-51-generic   containerd://2.0.4-k3s2
```

Default Kubernetes Cluster yang akan dibuat oleh K3s adalah 1 node, dimana Control Plane (Master Node) dan juga Data Plane (Worker Node) nya akan menjadi satu komponen di 1 node yang sama.

Untuk membuat Kubernetes Cluster lebih dari 1 node di K3s, kita bisa lakukan join agent node (atau worker node) ke dalam server node (master node) nya. Untuk melakukan join nya jalankan perintah berikut ini

1. Mendapatkan token dari server node

> **Catatan**: Jalankan perintah berikut ini di server node (master node)

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

2. Daftarkan atau join agent node ke cluster menggunakan perintah berikut ini

> **Catatan**: Jalankan perintah berikut ini di agent node (worker node) yang ingin melakukan join ke dalam cluster. Ganti `[server_node]` dan `[server_token]` sesuai dengan yang digunakan, sebagai contoh
>
> ```bash
> curl -sfL https://get.k3s.io | K3S_URL=https://k3s-1.home.internal:6443 K3S_TOKEN=K10b38a2664587403a2a91c5e62db5e8bd446be0676d83d41faa1625dfb8f4ffd98::server:be12c62352f3e34c487ce809072b87a6 sh -
> ```

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://[server_node]:6443 K3S_TOKEN=[server_token] sh -
```

3. Verifikasi apakah agent node sudah berhasil join di cluster

> **Catatan**: Jalankan perintah `kubectl` berikut ini di server node (master node).

```bash
sudo kubectl get pods -o wide
```

Jika agent node berhasil melakukan join, maka akan terlihat seperti ini output nya

```bash
NAME    STATUS   ROLES                  AGE     VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
k3s-1   Ready    control-plane,master   8m17s   v1.32.4+k3s1   20.20.20.11   <none>        Ubuntu 24.04.1 LTS   6.8.0-51-generic   containerd://2.0.4-k3s2
k3s-4   Ready    <none>                 9s      v1.32.4+k3s1   20.20.20.14   <none>        Ubuntu 24.04.1 LTS   6.8.0-51-generic   containerd://2.0.4-k3s2
```

#### Mencoba deploy Nginx di K3s

Untuk lebih memastikan apakah instalasi Kubernetes Cluster nya berhasil dilakukan, kita bisa coba lakukan deploy aplikasi Nginx default, untuk melakukan deployment nya kalian bisa buat sebuah YAML file menggunakan perintah berikut ini

> **Catatan**: Jika kalian tidak ingin menulis konfigurasi YAML berikut secara manual, kalian bisa gunakan dari github repository yang sudah saya buat
>
> ```bash
> sudo kubectl apply -f https://raw.githubusercontent.com/armandwipangestu/belajar-k8s/refs/heads/main/episode-3/example/nginx-deployment.yml
> ```

```bash
nvim nginx-deployment.yml
```

Lalu isikan konfigurasi nya seperti ini

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

Setelah itu lakukan deployment konfigurasi YAML file tersebut ke dalam Kubernetes Cluster menggunakan perintah berikut ini

```bash
sudo kubectl apply -f nginx-deployment.yml
```

Selanjutnya cek pod dan service apakah sudah berhasil berjalan atau tidak menggunakan perintah berikut ini

```bash
sudo kubectl get pods
sudo kubectl get svc
```

Jika pod dan service berhasil dijalankan, maka output nya akan terlihat seperti ini

```bash
NAME                              READY   STATUS    RESTARTS   AGE
nginx-deployment-96b9d695-9wzxn   1/1     Running   0          116s

NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.43.0.1      <none>        443/TCP        12m
nginx-service   NodePort    10.43.159.48   <none>        80:30080/TCP   2m6s
```

Untuk lebih memastikan apakah nginx berhasil dijalankan dan dapat diakses, kalian bisa cek menggunakan perintah berikut ini

> **Catatan**: Sesuaikan alamat ip address dari node dan port service yang digunakan

```bash
curl http://20.20.20.11:30080
```

Jika perintah di atas berhasil dijalankan, maka hasilnya akan terlihat seperti ini

> **Catatan**: Dikarenakan K3s ini berjalan di network host, maka kita bisa langsung akses IP `20.20.20.11` tersebut langsung di komputer yang satu jaringan seperti laptop saya berikut ini.
>
> ![Nginx K3s](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-3/nginx-k3s.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

### Instalasi K8s

Untuk melakukan instalasi Kubernetes Cluster menggunakan K8s agak sedikit berbeda dari tool-tool sebelumnya, dimana kita perlu melakukan instalasi secara manual mulai dari menambahkan repository, install dependency seperti `kubeadm`, `kubelet`, `kubectl`, `CRI`, dan `CNI`.

#### Menambahkan Repository K8s

Langkah pertama untuk melakukan instalasi Kubernetes Cluster menggunakan K8s adalah menambahkan repository Kubernetes nya terlebih dahulu, untuk menambahkannya kalian bisa jalankan perintah berikut ini

```bash
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo apt update
```

#### Install kubeadm, kubelet, kubectl, dan cni

Setelah repository Kubernetes nya berhasil ditambahkan, selanjutnya adalah lakukan install komponen yang dibutuhkan menggunakan perintah berikut ini

```bash
sudo apt install kubeadm kubelet kubectl kubernetes-cni -y
```

#### Konfigurasi Network

Selanjutnya lakukan konfigurasi network di host OS nya agar Kubernetes Cluster bisa berjalan secara normal, untuk konfigurasi nya adalah kita memerlukan 2 konfigurasi berikut ini:

1. Enable iptables agar bisa memfilter traffic dari bridge (digunakan untuk `NetworkPolicy` dan komunikasi antar `Pod`).
2. Enable forward paket IP antar interface (Routing `Pod` ke internet, dan `Pod` ke `Pod`).

Untuk enable nya jalankan perintah berikut ini

```bash
lsmod | grep br_netfilter
sysctl net.bridge.bridge-nf-call-iptables
sysctl net.ipv4.ip_forward
sudo modprobe overlay
sudo modprobe br_netfilter

sudo cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl --system
sysctl net.bridge.bridge-nf-call-iptables
```

#### Generate Default Config Containerd

Setelah melakukan konfigurasi jaringan, selanjutnya lakukan generate default config untuk containerd, untuk melakukannya jalankan perintah berikut ini

```bash
# backup configuration
sudo mv /etc/containerd/config.toml /etc/containerd/config.toml.bak

# generate default configuration
sudo containerd config default | sudo tee /etc/containerd/config.toml > /dev/null
```

Selanjutnya enable fitur `SystemdCgroup` dari `Containerd` nya menggunakan perintah berikut ini

```bash
cat /etc/containerd/config.toml | grep SystemdCgroup
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
cat /etc/containerd/config.toml | grep SystemdCgroup
```

Setelah itu lakukan restart service containerd menggunakan perintah berikut ini

```bash
sudo systemctl restart containerd
```

#### Init Control Plane

Setelah semua proses di atas dilakukan, selanjutnya kita bisa buat Kubernetes Cluster nya dengan cara inisialisasi Master Node atau Control Plane nya menggunakan perintah `kubeadm` seperti berikut ini

> **Catatan**: Ganti `[ip_master_node]` dengan ip address yang digunakan, contoh nya adalah seperti berikut ini
>
> ```bash
> sudo kubeadm init --control-plane-endpoint "20.20.20.11:6443" --upload-certs --pod-network-cidr=10.244.0.0/16
> ```

```bash
sudo kubeadm init --control-plane-endpoint "[ip_master_node]:6443" --upload-certs --pod-network-cidr=10.244.0.0/16
```

Jika perintah di atas berhasil dijalankan maka seharusnya muncul output seperti ini

```bash
I0512 13:14:15.500217    3037 version.go:261] remote version is much newer: v1.33.0; falling back to: stable-1.32
W0512 13:14:15.780527    3037 version.go:109] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.32.txt": Get "https://cdn.dl.k8s.io/release/stable-1.32.txt": dial tcp 146.75.45.55:443: connect: no route to host
W0512 13:14:15.780549    3037 version.go:110] falling back to the local client version: v1.32.4
[init] Using Kubernetes version: v1.32.4
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action beforehand using 'kubeadm config images pull'
W0512 13:14:15.841813    3037 checks.go:846] detected that the sandbox image "registry.k8s.io/pause:3.8" of the container runtime is inconsistent with that used by kubeadm.It is recommended to use "registry.k8s.io/pause:3.10" as the CRI sandbox image.
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [k8s-1 kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 20.20.20.11]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [k8s-1 localhost] and IPs [20.20.20.11 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [k8s-1 localhost] and IPs [20.20.20.11 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "super-admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests"
[kubelet-check] Waiting for a healthy kubelet at http://127.0.0.1:10248/healthz. This can take up to 4m0s
[kubelet-check] The kubelet is healthy after 501.293317ms
[api-check] Waiting for a healthy API server. This can take up to 4m0s
[api-check] The API server is healthy after 6.000748929s
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[upload-certs] Using certificate key:
43d861fb4825a3ba2477f045569bf8f8f80c41c66c9fee6e245e55b67e29c1cc
[mark-control-plane] Marking the node k8s-1 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node k8s-1 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: ajrbck.gadjppj7nq122dde
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of control-plane nodes running the following command on each as root:

  kubeadm join 20.20.20.11:6443 --token ajrbck.gadjppj7nq122dde \
        --discovery-token-ca-cert-hash sha256:a2cfd158e6346f9ca75589ad98e0fcc76d89f03e89b2b5f84e7fe87a4328fdc9 \
        --control-plane --certificate-key 43d861fb4825a3ba2477f045569bf8f8f80c41c66c9fee6e245e55b67e29c1cc

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 20.20.20.11:6443 --token ajrbck.gadjppj7nq122dde \
        --discovery-token-ca-cert-hash sha256:a2cfd158e6346f9ca75589ad98e0fcc76d89f03e89b2b5f84e7fe87a4328fdc9
```

> **Catatan**: Default Kubernetes Cluster yang akan dibuat oleh K8s adalah 1 node, dimana Control Plane (Master Node) dan juga Data Plane (Worker Node) nya akan menjadi satu komponen di 1 node yang sama.
>
> Untuk membuat Kubernetes Cluster lebih dari 1 node di K8s, kita bisa lakukan join worker node (data plane) ke dalam master node (control plane) nya. Untuk melakukan join nya jalankan perintah berikut ini
>
> ```bash
> sudo kubeadm join [ip_master_node]:6443 --token [token_master_node] --discovery-token-ca-cert-hash sha256:[hash_number]
> ```
>
> Dikarenakan saya menyiapakan 2 buah VM untuk Kubernetes Cluster yang di install menggunakan K8s, maka saya bisa join worker node nya menggunakan perintah berikut ini
>
> ```bash
> sudo kubeadm join 20.20.20.11:6443 --token ajrbck.gadjppj7nq122dde --discovery-token-ca-cert-hash sha256:a2cfd158e6346f9ca75589ad98e0fcc76d89f03e89b2b5f84e7fe87a4328fdc9
> ```
>
> Jika perintah di atas berhasil dijalankan, maka output nya akan terlihat seperti ini
>
> ```bash
> [preflight] Running pre-flight checks
> [preflight] Reading configuration from the "kubeadm-config" ConfigMap in namespace "kube-system"...
> [preflight] Use 'kubeadm init phase upload-config --config your-config.yaml' to re-upload it.
> [kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
> [kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
> [kubelet-start] Starting the kubelet
> [kubelet-check] Waiting for a healthy kubelet at http://127.0.0.1:10248/healthz. This can take up to 4m0s
> [kubelet-check] The kubelet is healthy after 501.725345ms
> [kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap
>
> This node has joined the cluster:
> * Certificate signing request was sent to apiserver and a response was received.
> * The Kubelet was informed of the new secure connection details.
>
> Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
> ```
>
> Pastikan tahapan seperti menambahkan repository, install dependency package, konfigurasi network, dan sebagainya juga sudah dilakukan di node yang akan join ke dalam cluster.

#### Konfigurasi kubectl

Setelah Kubernetes Cluster berhasil dibuat, selanjutnya lakukan konfigurasi `kubectl` agar kita bisa melakukan interkasi ke dalam cluster nya, untuk melakukannya jalankan perintah berikut ini di Master Node (Control Plane)

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Untuk memastikan apakah Kubernetes Cluster berhasil dibuat, kalian bisa cek node yang terdaftar di cluster menggunakan perintah berikut ini

```bash
kubectl get nodes -o wide
```

Jika perintah di atas berhasil dijalankan, maka output nya akan terlihat seperti ini

> **Catatan**: Kalian bisa lihat `STATUS` dari node yang ada di cluster ini adalah `NotReady` itu karena kita belum melakukan setup CNI (Container Networking Interface) nya.

```bash
NAME    STATUS     ROLES           AGE     VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
k8s-1   NotReady   control-plane   7m57s   v1.32.4   20.20.20.11   <none>        Ubuntu 24.04.1 LTS   6.8.0-51-generic   containerd://1.7.25
k8s-4   NotReady   <none>          3m18s   v1.32.4   20.20.20.14   <none>        Ubuntu 24.04.1 LTS   6.8.0-51-generic   containerd://1.7.25
```

#### Install CNI Calico

Setelah berhasil melakukan instalasi dan setup Kubernetes Cluster menggunakan K8s, selanjutnya kita memerlukan instalasi CNI atau Container Networking Interface. Disini saya akan menggunakan Calico sebagai CNI nya, untuk melakukan instalasi nya jalankan perintah berikut ini

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.3/manifests/tigera-operator.yaml
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.3/manifests/calico.yaml
```

Selanjutnya cek apakah pod nya sudah berhasil berjalan atau tidak menggunakan perintah berikut ini

```bash
kubectl get pods -n tigera-operator
kubectl get pods -n kube-system
```

Jika perintah di atas berhasil dijalankan, maka output nya akan terlihat seperti ini

> **Catatan**: Tunggu beberapa menit hingga semua pod nya benar-benar running.

```bash
NAME                               READY   STATUS    RESTARTS   AGE
tigera-operator-789496d6f5-qh7nq   1/1     Running   0          65s

NAME                                      READY   STATUS    RESTARTS      AGE
calico-kube-controllers-79949b87d-9jlfh   1/1     Running   0             8m20s
calico-node-48xls                         1/1     Running   0             8m20s
calico-node-r9pl8                         1/1     Running   0             8m20s
coredns-668d6bf9bc-pz2dm                  1/1     Running   0             33m
coredns-668d6bf9bc-vw2dh                  1/1     Running   0             33m
etcd-k8s-1                                1/1     Running   1 (13m ago)   33m
kube-apiserver-k8s-1                      1/1     Running   1 (13m ago)   33m
kube-controller-manager-k8s-1             1/1     Running   1 (13m ago)   33m
kube-proxy-ff8cd                          1/1     Running   1 (13m ago)   33m
kube-proxy-j25xc                          1/1     Running   1 (13m ago)   28m
kube-scheduler-k8s-1                      1/1     Running   1 (13m ago)   33m
```

Jika CNI berhasil di install, maka sekarang seharusnya jika kita cek ulang `STATUS` node di cluster nya sudah menjadi `Ready` seperti ini

```bash
kubectl get nodes -o wide
```

```bash
NAME    STATUS   ROLES           AGE   VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
k8s-1   Ready    control-plane   31m   v1.32.4   20.20.20.11   <none>        Ubuntu 24.04.1 LTS   6.8.0-59-generic   containerd://1.7.25
k8s-4   Ready    <none>          27m   v1.32.4   20.20.20.14   <none>        Ubuntu 24.04.1 LTS   6.8.0-51-generic   containerd://1.7.25
```

#### Mencoba deploy Nginx di K8s

Untuk lebih memastikan apakah instalasi Kubernetes Cluster nya berhasil dilakukan, kita bisa coba lakukan deploy aplikasi Nginx default, untuk melakukan deployment nya kalian bisa buat sebuah YAML file menggunakan perintah berikut ini

> **Catatan**: Jika kalian tidak ingin menulis konfigurasi YAML berikut secara manual, kalian bisa gunakan dari github repository yang sudah saya buat
>
> ```bash
> kubectl apply -f https://raw.githubusercontent.com/armandwipangestu/belajar-k8s/refs/heads/main/episode-3/example/nginx-deployment.yml
> ```

```bash
nvim nginx-deployment.yml
```

Lalu isikan konfigurasi nya seperti ini

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

Setelah itu lakukan deployment konfigurasi YAML file tersebut ke dalam Kubernetes Cluster menggunakan perintah berikut ini

```bash
kubectl apply -f nginx-deployment.yml
```

Selanjutnya cek pod dan service apakah sudah berhasil berjalan atau tidak menggunakan perintah berikut ini

```bash
kubectl get pods
kubectl get svc
```

Jika pod dan service berhasil dijalankan, maka output nya akan terlihat seperti ini

```bash
NAME                              READY   STATUS    RESTARTS   AGE
nginx-deployment-96b9d695-bqcpz   1/1     Running   0          21m

NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP        34m
nginx-service   NodePort    10.107.141.163   <none>        80:30080/TCP   21m
```

Untuk lebih memastikan apakah nginx berhasil dijalankan dan dapat diakses, kalian bisa cek menggunakan perintah berikut ini

> **Catatan**: Sesuaikan alamat ip address dari node dan port service yang digunakan

```bash
curl http://20.20.20.11:30080
```

Jika perintah di atas berhasil dijalankan, maka hasilnya akan terlihat seperti ini

> **Catatan**: Dikarenakan K8s ini berjalan di network host, maka kita bisa langsung akses IP `20.20.20.11` tersebut langsung di komputer yang satu jaringan seperti laptop saya berikut ini.
>
> ![Nginx K8s](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-3/nginx-k8s.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

## Penutup

Setelah mengenal berbagai tool seperti `Minikube`, `Kind`, `K3s`, dan `K8s`, sekarang kita tahu bahwa setiap tool tersebut memiliki keunggulan dan skenario penggunaannya masing-masing, baik untuk keperluan development lokal, CI/CD, hingga production yang ringan.

Dengan memahami tool-tool ini, kita bisa lebih bijak memilih mana yang sesuai dengan kebutuhan dan resource yang tersedia.

Bagaimana seru bukan episode 3 kali ini? Kita sudah praktik langsung menyiapkan Kubernetes Cluster, kemudian mengenal berbagai tool yang bisa digunakan, bahkan hingga mencoba deployment Nginx default sampai bisa diakses. Di episode 4 nanti, kita akan coba bahas mengenai salah satu Kubernetes Objects yaitu `Node`. So, pastikan tetap jaga semangat belajar nya.

> **Catatan**: Untuk kalian yang ingin lanjut membaca, bisa click gambar thumbnail episode 4 di bawah ini
>
> <a href="belajar-kubernetes-episode-4-pengenalan-dan-penjelasan-object-node">
>    <img src="/images/posts/Belajar Kubernetes - Episode 4 - PENGENALAN DAN PENJELASAN OBJECT NODE.png" />
> </a>