---
published: true
title: "Belajar Kubernetes - Episode 4 - Pengenalan dan Penjelasan Object Node"
tag: "DevOps"
date: "May 23 2025"
excerpt: "Di episode ini kita akan coba bahas salah satu object yang ada di Kubernetes yaitu Node. Kita akan mempelajari lebih dalam terkait apa itu Node dalam konteks Kubernetes"
cover_image: "/images/posts/Belajar Kubernetes - Episode 4 - PENGENALAN DAN PENJELASAN OBJECT NODE.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**: Untuk kalian yang ingin membaca episode sebelumnya, bisa click gambar thumbnail episode 3 di bawah ini
>
> <a href="belajar-kubernetes-episode-3-instalasi-kubernetes-cluster-master-dan-worker-node">
>    <img src="/images/posts/Belajar Kubernetes - Episode 3 - INSTALASI KUBERNETES CLUSTER (MASTER & WORKER NODE).png" />
> </a>

Sebelumnya kita sudah mengetahui jenis-jenis tool untuk instalasi Kubernetes Cluster di local mulai dari Minikube, Kind, K3s, K8s, serta tahapan cara instalasi masing-masing tool tersebut. Selanjutnya di episode ke 4 kali ini, kita akan coba bahas lebih dalam terkait salah satu object yang ada di Kubernetes yaitu **Node**.

> **Catatan**: Disini saya akan menggunakan Kubernetes Cluster yang di install melalui K3s.

## Node

> **Catatan**: Terdapat beberapa istilah terkait object Node di Kubernetes dari masa ke masa
>
> | Istilah Lama         | Istilah Baru / Sekarang |
> | -------------------- | ----------------------- |
> | Master Node          | Control Plane           |
> | Minion / Worker Node | Node (Data Plane)       |
>
> Sehingga jika kalian menemukan berbagai macam istilah-istilah di atas seperti di dokumentasi, blog, dan sebagainya, nah maka penyebutan tersebut bisa saja menggunakan istilah versi lama.

Node adalah worker machine di Kubernetes. Simpel nya, Node ini adalah yang bekerja, yang menjalankan aplikasi, dan juga pokok intinya aplikasi kita mau dijalankan dimana itu sebenarnya semua ada di dalam Node (Data Plane). Jadi Master (Control Plane) itu dia tugasnya hanya melakukan manage (orchestration) dari Nodes-Nodes yang ada di Kubernetes.

Mungkin kalian akan bertanya, Node ini sebetulnya bentuknya itu seperti apa sih? Nah sebetulnya Node ini bentuknya adalah VM-VM (Virtual Machine) juga ujung-ujungnya, jadi kalau misalkan kita menggunakan layanan cloud computing itu ya nanti kita akan running satu buah VM di cloudnya, setelah itu kita daftarkan / registrasi / masukkan VM tersebut ke dalam Kubernetes Cluster sebagai role Node (Data Plane) atau kalau misalkan kita mempunyai server sendiri di data center baik itu on-premise atau colocation, bisa saja dia bukan berupa VM melainkan berupa mesin fisik langsung (biasa disebut **Bare Metal**) gitu di suatu rak server, jadi tanpa layer tambahan hypervisor Kubernetes nya.

![Architecture & Deployment Models](${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-4/architecture-&-deployment-models.png)

### 3 Aplikasi yang Sudah Pasti Ada di Object Node

Nah di dalam Node tersebut sudah pasti akan ada aplikasi berikut di setiap Node nya, yaitu `kubelet`, `kubeproxy` dan juga `container runtime` nya.

<img 
  src="${NEXT_PUBLIC_PUBLIC_ASSETS}/belajar-kubernetes-eps-4/kubernetes-object-node.png" 
  alt="Kubernetes Object Node"
  style="max-width:100%;height:auto;"
/>

> **Catatan**: Untuk kalian yang ingin lebih tau terkait fungsi 3 aplikasi utama yang sudah pasti ada di object Node ini, seperti `kubelet`, `kubeproxy`, dan `container runtime`, kalian bisa baca di episode 2 berikut ini [Belajar Kubernetes - Episode 2 - Mengenal Konsep dan Arsitektur Kuberntes #data-plane-worker-node](belajar-kubernetes-episode-2-mengenal-konsep-dan-arsitektur-kubernetes#data-plane-worker-node)

`kubelet`, `kubeproxy`, dan `container runtime` adalah 3 aplikasi utama yang pasti akan ada di object Node. Jadi walaupun kita memasukkan ratusan Node misalkan atau bahkan sampai ribuan Node, maka di setiap Node-Node tersebut itu akan selalu ada tiga aplikasi ini.

Nantinya, saat kita ingin men-deploy aplikasi di Kubernetes Cluster, kita tidak perlu lagi menentukan aplikasi tersebut akan dijalankan di Node yang mana. Berapapun jumlah Node yang ada, Kubernetes akan mengatur penempatan aplikasi secara otomatis. Setelah sebuah Node bergabung (register) ke dalam Cluster, kita bisa menganggap seluruh Node tersebut sebagai satu kesatuan sumber daya / resource, sehingga proses deployment menjadi lebih mudah dan fleksibel tanpa harus memikirkan detail lokasi Node secara spesifik.

Jika kita ingin menjalankan beberapa aplikasi yang sama secara bersamaan dalam komputer tersebut, kita bisa dengan gampang melakukan scaling aplikasinya, jadi kita sudah tidak perlu tahu mikirin lagi ada berapa jumlah Node di dalam Kubernetes nya.

Nah dengan seiringnya waktu pastinya resource server akan terbatas, seperti RAM nya kurang, Storage nya kurang, CPU nya kurang, dan sebagainya. Nah itu semua akan dihandle oleh pihak atau divisi bagian infrastruktur atau juga bagian DevOps nya.

### Melihat Daftar Node

Setelah mengetahui apa itu Node dan 3 aplikasi utama yang pasti ada di dalam setiap Node, kita akan langsung mencoba bagaimana cara melihat daftar atau list Node yang ada di Kubernetes Cluster. Untuk melihatnya kalian bisa menggunakan perintah kubectl berikut ini

> **Catatan**: Kalian bisa juga menjalankan perintah berikut dengan lebih singkat atau beberapa versi seperti
>
> ```bash
> sudo kubectl get no
> sudo kubectl get no -o wide
> sudo kubectl get node
> sudo kubectl get nodes
> ```
>
> Semua perintah di atas akan valid dan berhasil dijalankan

```bash
sudo kubectl get nodes -o wide
```

Maka hasilnya akan terlihat seperti ini

```bash
NAME    STATUS   ROLES                  AGE   VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
k3s-1   Ready    control-plane,master   32d   v1.32.4+k3s1   20.20.20.11   <none>        Ubuntu 24.04.1 LTS   6.8.0-60-generic   containerd://2.0.4-k3s2
k3s-4   Ready    <none>                 32d   v1.32.4+k3s1   20.20.20.14   <none>        Ubuntu 24.04.1 LTS   6.8.0-60-generic   containerd://2.0.4-k3s2
```

Hasil dari pengecekan Node di Kubernetes Cluster saya di atas, terdapat 2 Node yang terdaftar di cluster tersebut, dimana 1 berperan sebagai master (Control Plane), dan satunya lagi sebagai Node (Data Plane).

### Melihat Detail Node

Jika kalian ingin melihat lebih jelas terkait informasi di salah satu Node yang terdaftar di atas, kalian bisa lakukan pengecekannya menggunakan perintah berikut ini

> **Catatan**: Ganti `<nama_node>` menggunakan nama yang terdaftar di Kubernetes Cluster, dalam contoh kasus ini, saya ingin melakukan pengecekan untuk Node dengan nama `k3s-4` maka perintah nya adalah
>
> ```bash
> sudo kubectl describe node k3s-4
> ```

```bash
sudo kubectl describe node <nama_node>
```

Jika perintah di atas berhasil dijalankan, maka akan terlihat output seperti ini

> **Catatan**: Informasi yang akan muncul banyak sekali, kalian bisa baca-baca lebih detail nya. Contohnya terdapat informasi seperti
>
> - Nama Node
> - Roles nya sebagai apa
> - Labels
> - Annotations
> - Memory
> - Disk
> - IP Address
> - Hostname
> - CPU
> - Operating System
> - Dan sebagainya
>
> Untuk informasi terkait Label dan Annotation nanti akan kita coba bahas lebih dalam di episode mengenai object `Label` dan `Annotation`.

```bash
Name:               k3s-4
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/instance-type=k3s
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=k3s-4
                    kubernetes.io/os=linux
                    node.kubernetes.io/instance-type=k3s
Annotations:        alpha.kubernetes.io/provided-node-ip: 20.20.20.14
                    flannel.alpha.coreos.com/backend-data: {"VNI":1,"VtepMAC":"fa:a1:5d:2e:04:c3"}
                    flannel.alpha.coreos.com/backend-type: vxlan
                    flannel.alpha.coreos.com/kube-subnet-manager: true
                    flannel.alpha.coreos.com/public-ip: 20.20.20.14
                    k3s.io/hostname: k3s-4
                    k3s.io/internal-ip: 20.20.20.14
                    k3s.io/node-args: ["agent"]
                    k3s.io/node-config-hash: 3KNQLTBXA74TAVRJ7E44VDXDEPIWPHOZBIOTNHQ5V2AGNS2LEHJA====
                    k3s.io/node-env: {"K3S_TOKEN":"********","K3S_URL":"https://k3s-1.home.internal:6443"}
                    node.alpha.kubernetes.io/ttl: 0
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Mon, 12 May 2025 12:26:54 +0000
Taints:             <none>
Unschedulable:      false
Lease:
  HolderIdentity:  k3s-4
  AcquireTime:     <unset>
  RenewTime:       Sat, 14 Jun 2025 08:10:40 +0000
Conditions:
  Type             Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
  ----             ------  -----------------                 ------------------                ------                       -------
  MemoryPressure   False   Sat, 14 Jun 2025 08:08:00 +0000   Fri, 23 May 2025 16:26:51 +0000   KubeletHasSufficientMemory   kubelet has sufficient memory available
  DiskPressure     False   Sat, 14 Jun 2025 08:08:00 +0000   Fri, 23 May 2025 16:26:51 +0000   KubeletHasNoDiskPressure     kubelet has no disk pressure
  PIDPressure      False   Sat, 14 Jun 2025 08:08:00 +0000   Fri, 23 May 2025 16:26:51 +0000   KubeletHasSufficientPID      kubelet has sufficient PID available
  Ready            True    Sat, 14 Jun 2025 08:08:00 +0000   Fri, 23 May 2025 16:26:51 +0000   KubeletReady                 kubelet is posting ready status
Addresses:
  InternalIP:  20.20.20.14
  Hostname:    k3s-4
Capacity:
  cpu:                1
  ephemeral-storage:  19221248Ki
  hugepages-2Mi:      0
  memory:             984664Ki
  pods:               110
Allocatable:
  cpu:                1
  ephemeral-storage:  18698430040
  hugepages-2Mi:      0
  memory:             984664Ki
  pods:               110
System Info:
  Machine ID:                 66757c96469b49babccd2de1522a71b6
  System UUID:                0f93b646-89e0-4562-909c-631149480756
  Boot ID:                    a9a0c304-7c2b-46bc-b736-21a540c93c54
  Kernel Version:             6.8.0-60-generic
  OS Image:                   Ubuntu 24.04.1 LTS
  Operating System:           linux
  Architecture:               amd64
  Container Runtime Version:  containerd://2.0.4-k3s2
  Kubelet Version:            v1.32.4+k3s1
  Kube-Proxy Version:         v1.32.4+k3s1
PodCIDR:                      10.42.1.0/24
PodCIDRs:                     10.42.1.0/24
ProviderID:                   k3s://k3s-4
Non-terminated Pods:          (2 in total)
  Namespace                   Name                               CPU Requests  CPU Limits  Memory Requests  Memory Limits  Age
  ---------                   ----                               ------------  ----------  ---------------  -------------  ---
  default                     nginx-deployment-96b9d695-9wzxn    0 (0%)        0 (0%)      0 (0%)           0 (0%)         32d
  kube-system                 svclb-traefik-06f3ce18-cw6kn       0 (0%)        0 (0%)      0 (0%)           0 (0%)         32d
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests  Limits
  --------           --------  ------
  cpu                0 (0%)    0 (0%)
  memory             0 (0%)    0 (0%)
  ephemeral-storage  0 (0%)    0 (0%)
  hugepages-2Mi      0 (0%)    0 (0%)
Events:
  Type     Reason                   Age   From             Message
  ----     ------                   ----  ----             -------
  Normal   Starting                 39m   kube-proxy
  Normal   RegisteredNode           39m   node-controller  Node k3s-4 event: Registered Node k3s-4 in Controller
  Normal   Starting                 39m   kubelet          Starting kubelet.
  Normal   NodeAllocatableEnforced  39m   kubelet          Updated Node Allocatable limit across pods
  Normal   NodeHasSufficientMemory  39m   kubelet          Node k3s-4 status is now: NodeHasSufficientMemory
  Normal   NodeHasNoDiskPressure    39m   kubelet          Node k3s-4 status is now: NodeHasNoDiskPressure
  Normal   NodeHasSufficientPID     39m   kubelet          Node k3s-4 status is now: NodeHasSufficientPID
  Warning  Rebooted                 39m   kubelet          Node k3s-4 has been rebooted, boot id: a9a0c304-7c2b-46bc-b736-21a540c93c54
```

## Penutup

Pada episode 4 ini, kita telah membahas secara spesifik mengenai object Node di Kubernetes, mulai dari pengertian, peran, hingga aplikasi utama yang selalu ada di setiap Node seperti `kubelet`, `kubeproxy`, dan `container runtime`. Kita juga sudah melihat bagaimana cara mengecek daftar Node serta detail informasi yang ada di dalamnya.

Dengan memahami konsep Node, kita jadi tahu bagaimana Kubernetes mengelola resource dan menjalankan aplikasi secara otomatis tanpa harus memikirkan detail penempatan secara manual. Pengetahuan ini sangat penting sebagai dasar sebelum mempelajari object-object Kubernetes lainnya yang lebih kompleks.

Semoga penjelasan di episode ini bisa membantu kalian memahami peran Node dalam arsitektur Kubernetes. Jangan ragu untuk bereksperimen langsung di cluster masing-masing agar semakin paham.

Bagaimana, makin paham kan tentang Node di Kubernetes? Di episode berikutnya, kita akan membahas object Kubernetes lainnya yang tidak kalah penting yaitu `Pod`. Jadi, pastikan tetap semangat belajar nya.
