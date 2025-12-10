---
published: true
title: "Belajar Kubernetes - Episode 5 - Pengenalan dan Penjelasan Object Pod"
tag: "DevOps"
date: "September 21 2025"
excerpt: "Di episode ini kita akan coba bahas salah satu object yang ada di Kubernetes yaitu Pod. Kita akan mempelajari lebih dalam terkait apa itu Pod dalam konteks Kubernetes"
cover_image: "/images/posts/Belajar Kubernetes - Episode 5 - PENGENALAN DAN PENJELASAN OBJECT POD.png"
author_name: "Arman Dwi Pangestu"
author_title: "Cloud & Software Engineer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**: Untuk kalian yang ingin membaca episode sebelumnya, bisa click gambar thumbnail episode 4 di bawah ini
>
> <a href="belajar-kubernetes-episode-4-pengenalan-dan-penjelasan-object-node">
>    <img src="/images/posts/Belajar Kubernetes - Episode 4 - PENGENALAN DAN PENJELASAN OBJECT NODE.png" />
> </a>

Di episode sebelumnya kita sudah mengetahui lebih dalam terkait object Node dalam konteks Kubernetes. Selanjutnya di episode 5 kali ini, kita akan coba bahas lebih dalam terkait salah satu object yang ada di Kubernetes yaitu **Pod**.

> **Catatan**: Disini saya akan menggunakan Kubernetes Cluster yang di install melalui K3s.

## Pod

Mungkin kalian akan baru mengetahui istilah **Pod** ini, apabila kalian yang sebelumnya sudah mengerti dan terbiasa menggunakan Docker hanya tau istilah seperti Image dan Container. Nah sekarang ada lagi istilah baru di Kubernetes yaitu namanya **Pod**, mungkin kalian akan bertanya apasih itu **Pod**?

Pod ini adalah unit terkecil yang bisa kita deploy ke dalam Kubernetes Cluster. Nah kalau di Docker, jika kita ingin melakukan deployment aplikasi kita itu maka dari Image nya ke Docker, nah Image tersebut akan dijalankan menjadi sebuah container. Nah hal tersebut berbeda ketika kita ingin melakukan deployment aplikasi ke dalam Kubernetes Cluster.

Saat kita menjalankan aplikasi kita di dalam Kubernetes Cluster, maka aplikasi tersebut akan berjalan dalam **Pod**. Pertanyaan nya kenapa tidak container? kenapa terdapat istilah baru yaitu **Pod**? Itu dikarenakan dalam Kubernetes, suatu Pod itu bisa berisi satu atau lebih container (multi container dan berbagi resource seperti CPU, RAM, Network, dan sebagainya).

Jika kalian biasa menjalankan aplikasi di Docker itu kan satu aplikasi satu Container, nah berbeda jika di Kubernetes, dimana dia mempunyai kemampuan atau fitur ketika men-deploy satu aplikasi, aplikasi tersebut dibungkus ke dalam **Pod**, nah di dalam Pod tersebut kita bisa memasukkan lebih dari satu Container ya walaupun kenyataannya mungkin kalian bakalan jarang men-deploy satu Pod isinya beberapa container, karena biasanya satu Pod itu satu Container, tapi mungkin nanti ada use case atau kebutuhan tertentu yang mengharuskan dalam satu Pod terdapat beberapa Container di dalamnya seperti `Proxy`, `Exporter`, atau `Sidecar`.

Intinya secara sederhana Pod itu adalah aplikasi yang kita running di dalam Kubernetes Cluster. Jadi kalau aplikasi kita mau di running di dalam Kubernetes Cluster maka dia akan di running di dalam bentuk Pod.

### Arsitektur Pod

Agar lebih terbayang mungkin kalian bisa lihat arsitektur dari object **Pod** di bawah ini

![Architecture Pod](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-5/architecture-pod.png)

Berdasarkan gambar arsitektur di atas, misalkan kita mempunyai 2 Worker Node / Data Plane di dalam Kubernetes Cluster, nah pada saat kita deploy aplikasi nya dia akan di running di dalam Node, contohnya:

- Di Node pertama ini kita menjalankan 2 Pod dan di Node kedua itu kita menjalankan 1 Pod, nah pada saat menjalankan aplikasi tersebut mungkin di dalam Pod 1 terdapat 2 Container yang berjalan dan di Pod 2 hanya terdapat 1 Container yang berjalan

- Kemudian di Node kedua menjalankan Pod 3, dimana menjalankan 2 Container juga.

Nah jadi istilah Pod adalah seperti itu, sehingga jika sebelumnya kita menjalankan Docker itu 1 aplikasi 1 Container, nah jika di Kubernetes ini dalam 1 Pod bisa lebih dari 1 Container atau bahkan 2, 3, hingga tak terbatas, tergantung kebutuhan.

### 1 Pod Tersebar / Parsial di Multiple Node?

Mungkin kalian akan bertanya apakah bisa di Kubernetes melakukan deployment Pod, tetapi Pod tersebut di jalankan di multiple Node secara bersamaan atau tersebar atau istilah nya adalah parsial? Nah hal tersebut tidak bisa dilakukan di dalam Kubernetes, agar lebih terbayang kalian bisa lihat gambar di bawah ini.

![Architecture Pod Parsial](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-5/architecture-pod-parsial.png)

Sehingga akan sudah pasti bahwa 1 Pod itu hanya dijalankan di 1 Node, jadi tidak ada istilah sebagian atau setengah Pod dijalankan di berbagai Node (seperti runtime nya ada di Node 1 dan di Node 2), agar lebih terbayang, misalkan contohnya adalah kalian masih ada sisa `Memory 1GB` di Node 1, kemudian di Node 2 ada sisa `Memory 5GB`, nah setelah itu kalian mau deploy Pod yang dimana membutuhkan sebesar `Memory 6GB` terus ingin di deploy di kedua Node tersebut, nah hal tersebut tidak bisa dilakukan.

Sehingga kalau bisa nanti pada saat bikin Pod itu jangan terlalu kecil spesifikasi hardware nya kalau bisa mungkin lumayan agak besar biar nanti kalau misalnya ada kebutuhan seperti itu kalian masih bisa mengoptimalkan penggunaan Pod nya di dalam si Node tersebut.

### Kenapa Butuh Pod? Kenapa Tidak Langsung Container?

Setelah kalian memahami objects Pod di dalam Kubernetes Cluster, mungkin kalian akan bertanya, kenapa membutuhkan Pod? kenapa tidak langsung saja menjalankan atau menggunakan Container? Nah ini problemnya. Kalau misalkan kita langsung menggunakan Container, nah jawabannya adalah si Kubernetes tersebut dia tidak menggunakan spesifik harus pakai `Container Runtime A` atau `Container Runtime B`. Jadi terdapat satu abstraction layer nya tersendiri yang dimana disini dia pakai istilah `Pod`. Sehingga di dalam Pod nya itu nanti bisa menggunakan Container Runtime yang berbeda-beda sesuai yang kita pilih atau gunakan, contohnya adalah seperti `Containerd`, `CRI-O`, `Docker Engine`, dan sebagainya.

Sehingga jika si Kubernetes tersebut langsung menggunakan Container, maka nantinya kita hanya bisa menggunakan satu spesifik Container Runtime misalkan `Docker Engine` saja. Hal tersebut dilakukan karena Kubernetes sendiri menggunakan standarisasi **CRI** (`Container Runtime Interface`), sehingga jika kedepannya ada yang lebih populer dari `Docker Engine` misalkan dan mendukung standarisasi **CRI**, maka hal tersebut akan bisa dilakukan dengan mudah.

> **Fun Fact**: Dulu Kubernetes hanya menggunakan `Docker` sebagai Container Manager atau Runtime nya, namun `Docker` itu platform yang lengkap dan bukan runtime murni, sedangkan Kubernetes hanya membutuhkan runtime saja dan Docker tidak mendukung CRI-compatible, dimana membutuhkan adaptor khusus seperti `dockershim`.
>
> Oleh karena itu diperkenalkanlah **CRI** (Container Runtime Interface) sebagai standarisasi runtime, **CRI** dibuat agar Kubernetes bisa interoperable atau agnostic terhadap banyak container runtime.

### Alasan Menjalankan Multi Container Dalam 1 Pod

Mungkin kalian akan bertanya juga, apa alasan khusus menjalankan multi container di dalam 1 Pod? nah karena Pod bisa menjalankan lebih dari 1 Container, maka ini akan sangat cocok jika misalkan ada kebutuhan pada saat ingin menjalankan aplikasi di mana aplikasi tersebut depend atau ketergantungan ke aplikasi lain. Kemudian misalkan mau scalling aplikasi tersebut, kita butuh scalling aplikasi tersebut beserta aplikasi ketergantungan lainnya. Nah hal tersebut akan sangat cocok di deploy dalam 1 Pod, sehingga nanti jika butuh scalling ke 2 atau 3 Pod, maka aplikasi di dalam nya akan ikut ke scalling karena berada dalam 1 Pod.

Atau contoh lainnya adalah pada saat deploy aplikasi terdapat agent monitoring aplikasi tersebut atau proxy nya, nah hal tersebut juga cocok di jalankan dalam 1 Pod.

### Melihat Daftar Pod

Setelah mengetahui penjelasan yang cukup dalam terkait object **Pod** di dalam Kubernetes Cluster, kita akan langsung mencoba bagaimana cara melihat Pod yang ada di dalam Kubernetes Cluster kita. Nah caranya sebetulnya mirip seperti melihat **Node** di episode 4 sebelumnya, yaitu bisa menggunakan perintah berikut ini

```bash
sudo kubectl get pod
```

> **Catatan**: Jika kalian sebelumnya melakukan deployment aplikasi Nginx ke dalam Kubernetes Cluster di episode 3 sebelumnya, maka akan muncul output seperti saya di bawah ini, namun jika kalian belum melakukan deployment aplikasi apapun, maka akan muncul output seperti ini `No resources found in default namespace.`

Jika perintah di atas dijalankan, maka output nya akan terlihat seperti ini

```bash
NAME                              READY   STATUS    RESTARTS      AGE
nginx-deployment-96b9d695-9wzxn   1/1     Running   4 (93m ago)   43d
```

### Melihat Detail Pod

Sama halnya seperti melihat detail **Node** di episode 4 sebelumnya, kita bisa melihat lebih jelas lagi terkait informasi **Pod**, nah untuk melihatnya kalian bisa jalankan perintah berikut ini

> **Catatan**: Ganti `<nama_pod>` menggunakan nama yang terdaftar di Kubernetes Cluster, dalam contoh kasus ini, saya ingin melakukan pengecekan untuk Pod dengan nama `nginx-deployment-96b9d695-9wzxn` maka perintah nya adalah
>
> ```bash
> sudo kubectl describe pod nginx-deployment-96b9d695-9wzxn
> ```

```bash
sudo kubectl descrribe pod <nama_pod>
```

Jika perintah di atas berhasil dijalankan, maka akan terlihat output seperti ini

> **Catatan**: Informasi yang akan muncul banyak sekali, kalian bisa baca-baca lebih detail nya. Contohnya terdapat informasi seperti
>
> - Nama Pod
> - Namespace
> - Priority
> - Service Account
> - Node (berjalan di node mana)
> - Start Time
> - Labels
> - Annotations
> - Status
> - IP
> - Dan sebagainya
>
> Untuk informasi terkait Namespace nanti akan kita coba bahas lebih dalam di episode mengenai object `Namespace`.

```bash
Name:             nginx-deployment-96b9d695-9wzxn
Namespace:        default
Priority:         0
Service Account:  default
Node:             k3s-4/20.20.20.14
Start Time:       Tue, 24 Jun 2025 16:25:25 +0000
Labels:           app=nginx
                  pod-template-hash=96b9d695
Annotations:      <none>
Status:           Running
IP:               10.42.1.12
IPs:
  IP:           10.42.1.12
Controlled By:  ReplicaSet/nginx-deployment-96b9d695
Containers:
  nginx:
    Container ID:   containerd://668f3969bc6a845f57865e79c784c870d4e37d630b00a7d06e7f75ebf623c1ea
    Image:          nginx:latest
    Image ID:       docker.io/library/nginx@sha256:6784fb0834aa7dbbe12e3d7471e69c290df3e6ba810dc38b34ae33d3c1c05f7d
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Tue, 24 Jun 2025 16:25:27 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6b5ck (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-6b5ck:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  2m13s  default-scheduler  Successfully assigned default/nginx-deployment-96b9d695-9wzxn to k3s-4
  Normal  Pulling    2m13s  kubelet            Pulling image "nginx:latest"
  Normal  Pulled     2m11s  kubelet            Successfully pulled image "nginx:latest" in 2.237s (2.237s including waiting). Image size: 72406859 bytes.
  Normal  Created    2m11s  kubelet            Created container: nginx
  Normal  Started    2m11s  kubelet            Started container nginx
```

### Membuat Pod

Seperti yang sudah dijelaskan di [Episode 2 - Mengenal Konsep dan Arsitektur Kubernetes#Alur Kerja Sederhana Kubernetes](belajar-kubernetes-episode-2-mengenal-konsep-dan-arsitektur-kubernetes#alur-kerja-sederhana-kubernetes), pada saat kita ingin membuat Pod atau object apapun di dalama Kubernetes Cluster kita akan buat dalam sebuah konfigurasi file, nah konfigurasi file tersebut nantinya akan kita submit melalui Kubernetes API Server, setelah itu API Server nya akan membuatkan resource dari konfigurasi file yang di submit.

Sebetulnya untuk membuat Pod itu terdapat beberapa cara, namun cara yang paling biasa digunakan adalah kita akan buat 1 config dalam bentuk YAML (bisa juga dalam bentuk JSON, namun biasanya kebanyakan menggunakan format YAML), sebagai contoh kalian bisa lihat contoh file YAML template Pod nya yaitu seperti ini

> **Catatan**: Kalian bisa lihat juga di repository yang sudah saya buat disini https://github.com/armandwipangestu/belajar-k8s/blob/main/templates/pod.yml

```yml
apiVersion: v1
kind: Pod
metadata:
  name: pod-name
spec:
  containers:
    - name: container-name
      image: image-name
      ports:
        - containerPort: 80
```

Berikut adalah penjelasan bagian-bagian dari konfigurasi di atas:

- `apiVersion` menentukan versi API Kubernetes yang digunakan untuk object tersebut.
- `kind` menunjukkan tipe resource yang akan dibuat, dalam hal ini adalah `Pod`.
- `metadata` berisi informasi metadata seperti nama Pod.
- `spec` mendefinisikan spesifikasi Pod, termasuk daftar container yang akan dijalankan di dalam Pod tersebut.

Setiap container di dalam Pod didefinisikan pada bagian `containers`, di mana kita bisa menentukan `nama container`, `image` yang digunakan, `port` yang digunakan, `environment variable`, `volume mount`, dan konfigurasi lainnya.

Jika ingin membuat Pod dengan lebih dari satu container (multi-container Pod), cukup tambahkan definisi container baru di dalam array `containers`, seperti contoh berikut:

> **Catatan**: Multi-container Pod biasanya digunakan untuk kasus di mana beberapa container perlu berjalan bersama-sama dan saling berkomunikasi secara langsung, misalnya untuk sidecar pattern (`logging`, `proxy`, `monitoring agent`, dsb).

```yml
apiVersion: v1
kind: Pod
metadata:
  name: pod-name
spec:
  containers:
    - name: container-name1
      image: image-name1
      ports:
        - containerPort: 80
    - name: container-name2
      image: image-name2
      ports:
        - containerPort: 443
```

#### Menjalankan Pod

Setelah mengetahui bagaimana cara membuat Pod, selanjutnya kita akan coba menjalankan Pod dengan container image dari Nginx, untuk membuat nya kalian bisa coba buat file `nginx.yml` seperti berikut ini

> **Catatan**: Kalian bisa gunakan YAML dari repository yang sudah saya buat disini https://github.com/armandwipangestu/belajar-k8s/blob/main/episode-5/nginx.yml
>
> Alasan disini saya memilih contoh menjalankan dari image `Nginx` adalah karena image tersebut kecil dan cocok untuk proses belajar, sehingga tidak perlu menunggu lama download image dan sebagainya.

```yml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx
      ports:
        - containerPort: 80
```

Setelah berhasil membuat konfigurasi YAML file di atas, selanjutnya kita akan lakukan submit file konfigurasi tersebut ke dalam Kubernetes Cluster dengan cara menjalankan perintah berikut ini

> **Catatan**: Ganti `<nama_file>.yml` dengan nama file yang sudah dibuat sebelumnya, sebagai contoh disini saya akan submit konfigurasi dari nama file `nginx.yml` sehingga perintah nya menjadi seperti ini
>
> ```bash
> sudo kubectl create -f nginx.yml
> ```

```bash
sudo kubectl create -f <nama_file>.yml
```

Jika perintah di atas berhasil dijalankan maka akan muncul output seperti ini

```bash
pod/nginx created
```

Untuk melihat atau memastikan bahwa Pod tersebut berhasil dijalankan, kalian bisa jalankan beberapa perintah berikut ini

> **Catatan**: Jika ingin lebih detail informasi nya, kalian bisa jalankan perintah berikut ini
>
> ```bash
> sudo kubectl get pod -o wide
> ```
>
> Output nya akan terlihat seperti ini
>
> ```bash
> NAME                              READY   STATUS    RESTARTS       AGE     IP           NODE    NOMINATED NODE   READINESS GATES
> nginx                             1/1     Running   0              5m41s   10.42.1.15   k3s-4   <none>           <none>
> nginx-deployment-96b9d695-8lml5   1/1     Running   1 (123m ago)   16d     10.42.1.13   k3s-4   <none>           <none>
> ```
>
> Atau jika ingin lebih detail spesifik salah satu pod seperti ini
>
> ```bash
> sudo kubectl describe pod <nama_pod>
> ```
>
> Output nya akan terlihat seperti ini
>
> ```bash
> Name:             nginx
> Namespace:        default
> Priority:         0
> Service Account:  default
> Node:             k3s-4/20.20.20.14
> Start Time:       Fri, 11 Jul 2025 14:10:49 +0000
> Labels:           <none>
> Annotations:      <none>
> Status:           Running
> IP:               10.42.1.15
> IPs:
>   IP:  10.42.1.15
> Containers:
>   nginx:
>     Container ID:   containerd://12754ece1a837e881b0852a9c3f1841193afe08dc3e9fe24f8b79872faa700d2
>     Image:          nginx
>     Image ID:       docker.io/library/nginx@sha256:93230cd54060f497430c7a120e2347894846a81b6a5dd2110f7362c5423b4abc
>     Port:           80/TCP
>     Host Port:      0/TCP
>     State:          Running
>       Started:      Fri, 11 Jul 2025 14:10:51 +0000
>     Ready:          True
>     Restart Count:  0
>     Environment:    <none>
>     Mounts:
>       /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-f5pcn (ro)
> Conditions:
>   Type                        Status
>   PodReadyToStartContainers   True
>   Initialized                 True
>   Ready                       True
>   ContainersReady             True
>   PodScheduled                True
> Volumes:
>   kube-api-access-f5pcn:
>     Type:                    Projected (a volume that contains injected data from multiple sources)
>     TokenExpirationSeconds:  3607
>     ConfigMapName:           kube-root-ca.crt
>     ConfigMapOptional:       <nil>
>     DownwardAPI:             true
> QoS Class:                   BestEffort
> Node-Selectors:              <none>
> Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
>                              node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
> Events:
>   Type    Reason     Age   From               Message
>   ----    ------     ----  ----               -------
>   Normal  Scheduled  110s  default-scheduler  Successfully assigned default/nginx to k3s-4
>   Normal  Pulling    110s  kubelet            Pulling image "nginx"
>   Normal  Pulled     108s  kubelet            Successfully pulled image "nginx" in 2.079s (2.079s including waiting). Image size: 72225394 bytes.
>   Normal  Created    108s  kubelet            Created container: nginx
>   Normal  Started    108s  kubelet            Started container nginx
> ```

```bash
sudo kubectl get pod
```

Maka hasilnya kurang lebih akan muncul seperti ini

```bash
NAME                              READY   STATUS    RESTARTS       AGE
nginx                             1/1     Running   0              95s
nginx-deployment-96b9d695-8lml5   1/1     Running   1 (119m ago)   16d
```

#### Mengakses Pod

Setelah kita berhasil menjalankan Pod, terkadang kita ingin melakukan test dengan cara mengkases Pod nya apakah benar-benar berjalan atau tidak, nah untuk melakukannya kita bisa buat `port-forward` atau `port mapping` dari Host ke dalam object Pod nya dengan cara menjalankan perintah berikut ini:

> **Catatan**: Ganti `<nama_pod>`, `<port_host>`, dan `<port_pod>` sesuai dengan Pod dan port yang digunakan, sebagai contoh karena kita menjalankan Pod dengan nama `nginx` dan aplikasi atau container tersebut menjalankan aplikasi di port `80` maka kita bisa buat seperti ini
>
> ```bash
> sudo kubectl port-forward nginx 8888:80
> ```
>
> Atau jika ingin binding ke semua network bisa gunakan perintah berikut ini
>
> ```bash
> sudo kubectl port-forward --address 0.0.0.0 nginx 8888:80
> ```
>
> Pada kasus sebenarnya seperti di production kita tidak akan melakukan cara seperti ini untuk expose aplikasi kita, ini hanya untuk testing di development saja.

```bash
sudo kubectl port-forward <nama_pod> <port_host>:<port_pod>
```

Jika perintah di atas berhasil dijalankan akan muncul output seperti ini

```bash
Forwarding from 0.0.0.0:8888 -> 80
Handling connection for 8888
Handling connection for 8888
Handling connection for 8888
```

Kita coba akses di browser port `8888` tersebut maka akan muncul halaman default Nginx nya seperti ini

> **Catatan**: Saya sudah melakukan pointing domain terkait VM-VM di home server saya, jadi saya bisa akses menggunakan nama domain seperti `k3s-1.home.internal`, jika kalian tidak melakukannya kalian bisa akses dengan cara menggunakan `IP Address` dari Node nya pada search bar browser atau `localhost` langsung pada perintah curl jika mengakses di shell Node nya langsung.

![Pod Port Forward](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-5/pod-port-forward.png)

Atau akses dengan command curl seperti ini

```bash
curl http://k3s-1.home.internal:8888
```

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

Pada episode 5 ini, kita telah membahas secara mendalam mengenai object **Pod** di Kubernetes, mulai dari pengertian, arsitektur, alasan penggunaan Pod, hingga praktik membuat dan menjalankan Pod di cluster. Kita juga sudah melihat bagaimana cara melihat daftar Pod, detail informasi Pod, serta melakukan port-forward untuk testing aplikasi di dalam Pod.

Dengan memahami konsep Pod, kita jadi tahu bahwa Pod adalah unit terkecil yang bisa dideploy di Kubernetes, dan bagaimana Pod dapat berisi satu atau lebih container yang saling berbagi resource. Pengetahuan ini sangat penting sebagai fondasi sebelum mempelajari object-object Kubernetes lainnya yang lebih kompleks.

Semoga penjelasan di episode ini bisa membantu kalian memahami peran dan fungsi Pod dalam arsitektur Kubernetes. Jangan ragu untuk mencoba langsung di cluster masing-masing agar semakin paham.

Bagaimana, makin jelas kan tentang Pod di Kubernetes? Di episode 6 berikutnya, kita akan membahas object Kubernetes lainnya yang tidak kalah penting yaitu **Label**. Jadi, pastikan tetap semangat belajar dan nantikan episode selanjutnya!
