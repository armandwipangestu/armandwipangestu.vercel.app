---
title: "Monitoring - Instalasi dan Konfigurasi Monitoring Server Menggunakan Grafana dan Prometheus"
tag: "SysAdmin"
date: "August 25 2023"
excerpt: "Pada artikel ini saya akan melakukan instalasi dan konfigurasi untuk monitoring server menggunakan Grafana dan Prometheus"
cover_image: "/images/posts/Monitoring - Grafana dan Prometheus.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada artikel kali ini Saya akan membahas bagaimana cara melakukan monitoring terhadap sebuah server ataupun virtual machine, tools yang
akan digunakan pada artikel kali ini adalah Grafana dan Prometheus.

Apabila kalian baru mengenal dengan Grafana ataupun Prometheus tidak usah bingung, tinggal ikuti saja. Prinsip nya dua tool ini sederhana,
yang dimana digunakan untuk melakukan monitoring.

Perbedaan dari kedua tool tersebut adalah, Prometheus sendiri adalah salah satu timeseries database yang nanti akan mengelola data metric yang
dikeluarkan oleh sebuah exporter. Sedangkan Grafana sendiri dia berfungsi untuk memvisualisasikan data metric, sehingga kurang lebih nanti
tampilan nya bisa menjadi seperti ini.

![Grafana Showcase](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_showcase.png)

Bisa di ibaratkan, masing-masing panel tersebut nantinya dapat kita customize sesuai dengan kebutuhan kita. Seperti apa yang akan kita
monitoring bisa kita tampilkan secara custom, sehingga kita dapat memodifikasi nantinya.

## Persiapan

Pada artikel kali ini, Saya menggunakan sistem operasi Ubuntu Server 22.04

## Instalasi Prometheus

Untuk melakukan instalasi Prometheus, kita perlu mendownload nya terlebih dahulu, Anda dapat mengunjungi website nya melalui tautan berikut ini [prometheus.io/download](https://prometheus.io/download/).

Dikarenakan saya menggunakan sistem operasi Ubuntu, sehingga saya akan mendownload package dengan tulisan `prometheus-2.46.0.linux-amd64.tar.gz`. Apabila kalian menggunakan sistem operasi yang berbeda, maka download sesuai dengan sistem operasi yang digunakan.

### Download Prometheus

Untuk mendownload nya cukup mudah, kalian cukup copy link package tersebut kedalam clipboard kemudian ketikan perintah berikut ini didalam
terminal

```shell
wget https://github.com/prometheus/prometheus/releases/download/v2.46.0/prometheus-2.46.0.linux-amd64.tar.gz
```

![Prometheus Download](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/prometheus_download.png)

### Download Node Exporter

Node Exporter ini akan mengeluarkan atau melakukan export data metric-metric yang berkaitan dengan beberapa komponen yang ada di komputer, contoh
nya adalah seperti:

- Jumlah Core yang ada di sebuah VM
- Besaran Memory
- Kapasitas Disk
- Dsb

Untuk melakukan download node-exporter nya, lakukan cara yang sama yaitu copy link download nya kedalam clipboard kemudian jalankan perintah
ini didalam terminal

```shell
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
```

![Node Exporter Download](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_download.png)

Untuk melihat apakah package nya sudah ter-download atau belum, kalian bisa menggunakan perintah

```shell
ls
```

> **Catatan**:
>
> Dapat dilihat pada gambar dibawah ini, sudah terdapat 2 package yaitu `prometheus-2.46.0.linux-amd64.tar.gz` dan juga `node_exporter-1.6.1.linux-amd64.tar.gz`

![List Package](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/list_package.png)

### Extract Package Prometheus

Untuk melakukan extract pada package prometheus yang sudah di download, kalian bisa menggunakan perintah berikut ini

```shell
tar xvf prometheus-2.46.0.linux-amd64.tar.gz
```

![Extract Prometheus](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/extract_prometheus.png)

Setelah proses extract selesai, maka sekarang akan muncul sebuah directory atau folder dengan nama sesuai package yang di download

![Prometheus Directory](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/prometheus_directory.png)

Selanjutnya kita pindah kedalam directory tersebut dengan perintah

```shell
cd prometheus-2.46.0.linux-amd64
```

### Penjelasan Isi Dari Package Prometheus

![Prometheus Directory](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/prometheus_directory_content.png)

Jika kita lihat isian dari directory prometheus tersebut terdapat beberapa file dan folder, jika diperhatikan terdapat sebuah file yang
berwarna hijau.

File berwarna hijau tersebut menandakan sebuah _executable file_ atau bisa disebut juga sebagai _binary file_ untuk menjalankan prometheus nya.
Sebetulnya kita dapat langsung menjalankan atau mengaksesnya dengan perintah berikut ini `./prometheus --config ...`.

Namun apabila kita tidak jalankan di background proses, kemungkinan nanti apabila terdapat suatu interrupt atau terminasi, maka aplikasi
nya akan tertutup atau berhenti. Sehingga disarankan untuk menjalankan prometheus nya menggunakan _service daemon_ atau kita jalankan
melalui _systemd_ agar dapat berjalan di belakang atau _background process_.

### Membuat User dan Group Prometheus

Sebelum membuat sebuah service daemon dari package prometheus nya, kita akan buat terlebih dahulu user dan group khusus untuk prometheus.
Untuk melakukannya gunakan perintah berikut ini

```shell
sudo groupadd --system prometheus
sudo useradd --system -s /sbin/nologin -g prometheus prometheus
```

### Memindahkan Binary File

Setelah membuat user dan group khusus untuk prometheus, selanjutnya kita akan pindahkan binary file `prometheus` dan `promtool` ini kedalam
`/usr/local/bin` yang dimana PATH tersebut merupakan salah satu lokasi untuk menyimpan binary file atau executable file di sistem operasi
linux. Untuk memindahkan gunakan perintah berikut ini:

```shell
sudo mv prometheus promtool /usr/local/bin
```

Untuk mengecek apakah binary file tersebut sudah berpindah, kalian dapat menggunakan perintah `which` seperti berikut ini:

```shell
which prometheus
```

maka akan muncul keseluruhan PATH dari binary file tersebut

![Which Prometheus](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/which_prometheus.png)

Untuk mengecek versi dari `prometheus`, anda dapat menggunakan perintah berikut ini

```shell
prometheus --version
```

maka akan muncul output seperti tulisan berikut ini

```
prometheus, version 2.46.0 (branch: HEAD, revision: cbb69e51423565ec40f46e74f4ff2dbb3b7fb4f0)
  build user:       root@42454fc0f41e
  build date:       20230725-12:31:24
  go version:       go1.20.6
  platform:         linux/amd64
  tags:             netgo,builtinassets,stringlabels
```

### Membuat Satu Directory Untuk Menyimpan File Konfigurasi

Terdapat 3 bagian yang akan kita pindahkan, yaitu:

- `console_libraries`
- `consoles`
- `prometheus.yml`

Biasanya pada sistem operasi linux, kita menyimpan konfigurasi itu pada directory `/etc`. Sehingga biar tidak bingung maka kita akan buat
directory baru untuk prometheus di `/etc/prometheus`. Untuk membuat nya kalian bisa menggunakan perintah berikut ini:

```shell
sudo mkdir /etc/prometheus
```

Dan kemudian karena promteheus ini merupakan sebuah timeseries database, maka membutuhkan letak penyimpanan atau letak untuk menyimpan
datanya nanti, sebetulnya kita bisa simpan letak penyimpanan data tersebut sama dengan directory konfigurasi prometheus nya.

Namun, disini saya akan memisahkan nya di directory `/var/lib/prometheus`. Untuk membuat nya gunakan perintah berikut ini

```shell
sudo mkdir /var/lib/prometheus
```

Selanjutnya, dikarenakan nanti akan ada proeses read-write data pada directory `/var/lib/prometheus` tersebut, maka pastikan
permission dari directory tersebut dimiliki atau dipegang oleh user dan group yang sudah kita buat sebelumnya, jika tidak diubah
maka akan muncul error karena nantinya kita akan menjalankan prometheus nya menggunakan user prometheus, sedangkan ownership
dari directory tersebut saat ini dimiliki oleh user root. Untuk mengecek permission dari sebuah directory atau file, kalian dapat menggunakan perintah berikut ini:

```shell
stat /var/lib/prometheus
```

maka akan muncul seperti gambar dibawah ini

![Permission Folder Prometheus](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/permission_folder_prometheus.png)

Dapat dilihat bahwa saat ini owner dari user dan group directory tersebut dimiliki oleh `root`, kita akan ubah menjadi dimiliki oleh user dan group `prometheus`. Untuk melakukan perubahan permission directory atau file tersebut kalian bisa menggunakan perintah berikut ini:

```shell
sudo chown -R prometheus:prometheus /var/lib/prometheus
```

Maka sekarang permission user dan group dari directory tersebut dimiliki oleh `prometheus`

![Permission Change Prometheus](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/permission_change_prometheus.png)

Selanjutnya kita pindahkan directory dan file yang sudah saya sebutkan diatas kedalam directory `/etc/prometheus` menggunakan perintah:

```shell
sudo mv console_libraries/ consoles/ prometheus.yml /etc/prometheus/
```

Selanjutnya kita pindah directory ke `/etc/prometheus`

```shell
cd /etc/prometheus
```

Setelah itu buka file konfigurasi `prometheus.yml` menggunakan text editor seperti vim atau nano

```shell
sudo vim prometheus.yml
```

Bawaan dari konfigurasi tersebut adalah seperti berikut ini

```yml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9090"]
```

Ubah konfigurasi tersebut menjadi

```yml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

### Membuat Service Daemon Prometheus

Cara membuat sebuah service daemon di sistem operasi linux, kita perlu membuat sebuah file di lokasi `/etc/systemd/system/prometheus.service`

```shell
sudo vim /etc/systemd/system/prometheus.service
```

Kemudian isikan file service daemon tersebut seperti berikut ini:

```service
[Unit]
Description=Prometheus
Documentation=https://prometheus.io/docs/introduction/overview/
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
--config.file /etc/prometheus/prometheus.yml \
--storage.tsdb.path /var/lib/prometheus/ \
--web.console.templates=/etc/prometheus/consoles \
--web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Setelah membuat file service tersebut, selanjutnya reload daemon agar service yang sudah dibuat tersebut terbaca. Untuk melakukannya
gunakan perintah berikut ini:

```shell
sudo systemctl daemon-reload
```

Selanjutnya cek status dari service prometheus nya, menggunakan perintah

```shell
sudo systemctl status prometheus.service
```

![Status Service Prometheus](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/status_service_prometheus.png)

Maka hasilnya adalah inactive seperti gambar diatas, agar service tersebut menjadi active dan otomatis dijalankan apabila server mengalami
sesuatu hal seperti reboot atau shutdown. Gunakan perintah berikut ini:

```shell
sudo systemctl enable --now prometheus.service
```

![Status Service Prometheus 2](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/status_service_prometheus2.png)

Maka sekarang service tersebut akan active seperti gambar diatas. Secara default atau bawaan, prometheus ini berjalan pada port `9090`, untuk
mengecek apakah prometheus tersebut berjalan pada port tersebut, gunakan berikut ini:

```shell
sudo lsof -n -i | grep prometheus
```

![Prometheus Running Port 9090](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/prometheus_running_port_9090.png)

### Membuka Web Interface Prometheus

Maka sekarang kita dapat mengakses prometheus tersebut menggunakan web browser dengan alamat url

```
http://ip_server:9090
```

![Prometheus Web](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/prometheus_web.png)

Kurang lebih seperti itulah tampilan dari prometheus nya, sehingga nanti kalian bisa melakukan semacam query. Namun, disini bahasanya
adalah menggunakan PromQL

Sebelum kesana kalian bisa arahkan ke menu `Status` > `Targets`

![Menu Status Target Prometheus](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/menu_status_target_prometheus.png)

Pada menu ini di ibaratkan nantinya pada saat kita akan melakukan konfigurasi prometheus nya akan banyak job yang tertera di menu tersebut,
namun by default hanya satu yaitu `Prometheus (1/1 up)` yang dimana sesuai dengan konfigurasi sebelumnya yang berada di file `/etc/prometheus/prometheus.yml`

```yml
- job_name: "prometheus"
  static_configs:
    - targets: ["localhost:9090"]
```

Apabila jika ingin tahu bentuk dari metric itu seperti apa, kalian bisa akses job tersebut di alamat url `http://ip_server:9090/metrics`

![Data Metric](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/data_metric.png)

Kurang lebih bentuk dari metric itu seperti gambar diatas, jadi di ibaratkan dia semacam kayak data yang akan meng-counter. Cuman memang
prometheus sendiri belum bisa memvisualisasikan, sehingga cukup repot jika kita ingin membaca data seperti ini.

Sebagai contoh misalkan ada sebuah metric dengan nama `promhttp_metric_handler_requests_total{code="200"}`, disini jika saya refresh
secara terus menerus, ibaratkan dia akan meng-counter ada beberapa kali akses atau request terhadap metric ini atau fungsi ini. Nah, ini
nanti dapat kita visualisasikan menggunakan `Grafana`.

Atau anda juga dapat menampilkan data dari sebuah metric pada menu `Graph` dengan PromQL `prometheus_build_info`

![Prometheus Graph PromQL](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/prometheus_graph_promql.png)

Walaupun sebetulnya sampai dengan tahapan ini, kita belum bisa melakukan query terhadap metric yang berkaitan dengan komponen-komponen server
seperti CPU, Memory dsb. Karena apa? karena tadi, kita disini baru menjalankan default saja yaitu menjalankan Job Prometheus nya saja.

Nah selanjutnya yang sudah kita bahas sebelumnya terdapat sebuah extension atau package baru yang bernama `node-exporter`. Package tersebut
lah yang nanti berfungsi untuk melakukan expose terhadap metric-metric yang ada di server, contoh nya seperti CPU, Memory dsb. Sehingga
nantinya dapat di pool atau di tarik oleh `Prometheus`.

### Install Node Exporter

Untuk melakukan instalasi extension node exporter caranya sama seperti install prometheus yaitu kita perlu extract terlebih dahulu dengan
perintah berikut ini:

```shell
tar xvf node_exporter-1.6.1.linux-amd64.tar.gz
```

![Extract Node Exporter](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/extract_node_exporter.png)

Selanjutnya kita pindah kedalam directory tersebut dengan perintah

```shell
cd node_exporter-1.6.1.linux-amd64
```

Pada folder ini hanya terdapat satu binary file yaitu `node_exporter`

![Node Exporter Binary](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_binary.png)

Sama seperti `prometheus`, binary file ini dapat kita jalankan langsung dengan `./node_exporter`. Namun, jika melakukan hal tersebut
diibaratkan kita akan sulit memanage proses tersebut.

Sehingga ada baiknya kita buatkan sama seperti `prometheus`, dimana `node_exporter` ini akan dijalankan menggunakan service daemon
(yang dijalankan secara background proses).

### Membuat Service Daemon Node Exporter

Sebelum membuat service daemon nya, kita akan pindahkan binary file tersebut kedalam directory `/usr/local/bin/` dengan perintah berikut ini:

```shell
sudo mv node_exporter /usr/local/bin
```

Sekarang jika kita gunakan perintah `which`, maka akan muncul output full PATH dari binary file `node_exportert` tersebut.

```shell
which node_exporter
```

![Which Node Exporter](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/which_node_exporter.png)

Untuk mengecek versi nya, kalian bisa menggunakan perintah:

```shell
node_exporter --version
```

maka akan muncul tulisan seperti berikut

```
node_exporter, version 1.6.1 (branch: HEAD, revision: 4a1b77600c1873a8233f3ffb55afcedbb63b8d84)
  build user:       root@586879db11e5
  build date:       20230717-12:10:52
  go version:       go1.20.6
  platform:         linux/amd64
  tags:             netgo osusergo static_build
```

Jika sudah, sekarang kita cukup buatkan file service daemon nya dengan cara yang sama seperti membuat service daemon prometheus yaitu
menggunakan perintah:

```shell
sudo vim /etc/systemd/system/node-exporter.service
```

Selanjutnya masukan konfigurasi berikut ini:

```service
[Unit]
Description=Prometheus exporter for machine metrics

[Service]
Restart=always
User=prometheus
Group=prometheus
ExecStart=/usr/local/bin/node_exporter
ExecReload=/bin/kill -HUP $MAINPID
TimeoutStopSec=20s
SendSIGKILL=no

[Install]
WantedBy=multi-user.target
```

Selanjutnya reload service daemon menggunakan perintah berikut ini:

```shell
sudo systemctl daemon-reload
```

Kemudian enable dan jalankan service node-exporter nya

```shell
sudo systemctl enable --now node-exporter.service
```

maka sekarang service daemon node-exporter tersebut sudah running atau berjalan

![Node Exporter Status](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_status.png)

Nah untuk `node_exporter` itu sendiri, dia berjalan pada port `9100`, untuk mengecek nya gunakan perintah berikut ini:

```shell
sudo lsof -n -i | grep node
```

![Node Exporter Port](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_port.png)

### Membuka Web Interface Node Exporter

Untuk membuka nya kalian bisa membuka alamat URL berikut ini di web browser kalian:

```
http://ip_server:9100/metrics
```

![Node Exporter Metric](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_metric.png)

Metric disini berbeda dengan metric yang ada di `Prometheus` sebelumnya. Bisa kita lihat disini terdapat beberapa metric
yang berkaitan dengan node, misalkan seperti komponen CPU, Disk, File System, Memory, Network dan masih banyak lagi.

### Menamnbahkan Job Node Exporter pada Prometheus

Untuk menambahkan nya, buka kembali file konfigurasi prometheus di lokasi `/etc/prometheus/prometheus.yml`

```shell
sudo vim /etc/prometheus/prometheus.yml
```

Kemudian tambahkan konfigurasi berikut ini kedalam file tersebut

```yml
- job_name: "node-exporter"
  static_configs:
    - targets: ["localhost:9100"]
```

sehingga isi keseluruhan dari file konfigurasi tersebut menjadi seperti ini

```yml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
  - job_name: "node-exporter"
    static_configs:
      - targets: ["localhost:9100"]
```

Selanjutnya restart service dari prometheus nya menggunakan perintah berikut ini:

```shell
sudo systemctl restart prometheus.service
```

Maka sekarang jika kita lihat di menu `Status` > `Targets`, sekarang terdapat satu job baru yaitu `node-exporter`

![Node Exporter Job](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_job.png)

Jika sudah seperti itu, maka sekarang kalian dapat melakukan query PromQL terhadap data yang di expose oleh job `node-exporter`

![Node Exporter Query](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_query.png)

Atau kita bisa coba query lain seperti `node_memory_MemTotal_bytes`.

![Node Exporter Query Memory](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_query_memory.png)

Data metric ini menggunakan satuan `bytes` jika ingin konversi menjadi megabytes gunakan query berikut ini `node_memory_MemTotal_bytes/1024/1024`

![Node Exporter Query Memory Konversi](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/node_exporter_query_memory_konversi.png)

Pada contoh diatas, memory yang saya gunakan pada server sebesar `4GB`.

Agar lebih menarik selanjutnya kita akan visualisasikan menggunakan `Grafana`, jadi sebetulnya konfigurasi prometheus nya cukup sederhana
yang penting prometheus nya kita install kemudian kita tambahkan extension node_exporter. Kalian juga bisa menambahkan extension lain seperti
`mysql_exporter` untuk menampilkan metric dari mysql atau misalkan `nginx_exporter` dsb.

## Instalasi Grafana

Untuk melalukan instalasi nya kalian bisa mengunjungi web dokumentasi dari grafana nya melalui tautan berikut ini [grafana.com/docs/grafana/latest/setup-grafana/installation/debian](https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/)

![Grafana Dokumentasi](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_dokumentasi.png)

Pertama kita jalankan perintah berikut ini:

```shell
sudo apt-get install -y apt-transport-https
sudo apt-get install -y software-properties-common wget
sudo wget -q -O /usr/share/keyrings/grafana.key https://apt.grafana.com/gpg.key
```

Kemudian tambahkan repository stable dari grafana dengan perintah berikut ini:

```shell
echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Setelah itu update repository ubuntu dengan perintah berikut ini:

```shell
sudo apt-get update
```

Selanjutnya install package `grafana` dengan perintah berikut ini:

> **Catatan**:
>
> Disini kita akan install grafana versi `oss`, oss adalah opensource-software. Apabila kalian ingin mendownload versi `enterprise`
> maka install dengan nama package `grafana-enterprise`.

```shell
sudo apt install grafana
```

Setelah package grafana tersintall, selanjutnya cek apakah service nya sudah running atau belum menggunakan perintah berikut ini:

```shell
sudo systemctl status grafana-server.service
```

![Grafana Service](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_service.png)

Bisa kalian lihat service `grafana-server` status nya masih `inactive (dead)`. Untuk menjalankan nya gunakan perintah berikut:

```shell
sudo systemctl enable --now grafana-server.service
```

Sekarang service `grafana-server` sudah active, secara default atau bawaan grafana ini berjalan pada port 3000. Untuk mengecek nya gunakan
perintah berikut:

```shell
sudo lsof -n -P -i | grep grafana
```

![Grafana Port](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_port.png)

### Membuka Web Interface Grafana

Untuk membuka web interface dari grafana kalian bisa masukan alamat URL berikut di web browser kalian

```
http://ip_server:3000
```

![Grafana Web](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_web.png)

Login default dari grafana adalah

```
Username: admin
Password: admin
```

Setelah login menggunakan user admin, kalian akan diminta untuk mengganti password default nya, namun kalian juga dapat melakukan `skip`
hal tersebut. Disini saya akan skip saja.

Maka sekarang akan dialihkan ke dashboard grafana

![Grafana Dashboard](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_dashboard.png)

### Menambahkan Data Source

Untuk menambahkan data source, kalian bisa pergi ke menu `Connections` > `Data Source`

![Grafana Data Source](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_data_source.png)

Kemudian klik tombol `Add Data Source`

Sebetulnya data source nya ini banyak, tidak hanya prometheus. Contoh yang bisa digunakan untuk data source adalah `Graphite`, `InfluxDB` dsb

Namnu karena sebelumnya yang kita coba adalah Prometheus sehingga disini kita pilih prometheus sebagai data source nya.

Setelah memilih prometheus sebagai data source, selanjutnya terdapat beberapa konfigurasi yang perlu kalian tambahakan seperti:

- `Name`
- `Prometheus server URL`

Kalian bisa isikan dengan konfigurasi seperti berikut:

```
Name: Prometheus
Prometheus server URL: http://localhost:9090
```

Jika sudah klik tombol `Save & Test` di bagian paling bawah.

Apabila berhasil maka akan muncul sebuah alert dengan background hijau

![Grafana Alert](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_alert.png)

### Membuat Dashboard Baru

Selanjutnya kita kembali ke menu atau halaman Home, secara default pada home tersebut belum ada dashboard apapun. Namun, kita dapat
membuatkan dashboard sederhana dengan cara pergi ke menu `Dasboard` > `New` > `New Dashboard` (jika kalian ingin membuat secara manual)

![Grafana New Dashboard](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_new_dashboard.png)

Setelah itu klik tombol `Add Visualization`

![Grafana Add Visualization](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_add_visualization.png)

Selanjutnya pilih `Prometheus` sebagai data source nya

![Grafana Select Data Source](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_select_data_source.png)

Namun jika kalian memang ingin menambahkan atau membuat dashboard sendiri, kalian harus paham terlebih dahulu mengenai PromQL atau query
terhadap PromQL nya.

Untuk yang paling sederhana disini saya akan tampilkan memory

![Grafana Add Query Memory](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_add_query_memory.png)

Secara default bentuk nya adalah `Time series`, kita bisa ubah bentuk visualization nya pada pojok kanan atas, disini saya akan memilih
`Stat`

![Grafana Stat](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_stat.png)

Kita juga bisa mengubah konfigurasi lain seperti:

- `Panel options` > `Title` > `Total Memory`
- `Standar options` > `Unit` > `Data` > `bytes(SI)`
- `Standar options` > `Decimals` > `1`

Maka sekarang hasil dari chart nya akan seperti berikut

![Grafana Custom](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_custom.png)

Untuk menyimpan nya, klik tombol `Apply` di pojok kanan atas.

Sekarang dashboard baru sudah dibuat

![Grafana Result](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_result.png)

Namun masalah nya jika kita buatkan satu persatu agak ribet, apalagi jika kalian baru mencoba grafana ini. Yang dimana kita perlu paham
juga mengenai PromQL untuk menampilkan data-data seperti ini. Tapi untuk kalian yang mungkin baru coba gk perlu khawatir karena kita akan
coba cari template nya supaya nanti bisa kita bisa import langsung

### Import Dashboard

Untuk melakukan import kalian bisa mengujungi website resmi dari grafana dengan mungujungi tautan berikut ini [grafana.com/grafana/dashboards/1860-node-exporter-full](https://grafana.com/grafana/dashboards/1860-node-exporter-full/)

Setelah dibuka, kalian klik tombol `Copy ID Clipboard`.

![Grafana Copy Id](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_copy_id.png)

Setelah itu kembali ke web grafana nya lalu buka menu `Dashboard` > `Import dashboard` kemudian paste id yang sudah di copy sebelumnya kedalam
form `Import via grafana.com`

![Grafana Import](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_import.png)

![Grafana Import ID](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_import_id.png)

Setelah itu klik tombol `Load`

Selanjutnya sesuaikan dengan yang kalian inginkan seperti:

- `Name`
- `Folder`

Yang pasti pilih data source nya adalah prometheus

![Grafana Import Dashboard](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_import_dashboard.png)

Setelah itu klik tombol `Import`

Maka sekarang tampilan nya akan seperti berikut ini, disini kita bisa pilih juga time frame nya seperti `Last 1 Hour` dsb

![Grafana Import Dashboard Result](../images/posts/assets/monitoring_server_menggunakan_grafana_dan_prometheus/grafana_import_dashboard_result.png)

## Kesimpulan

Mungkin untuk kalian sebagai developer yang memang fokus nya bikin aplikasi, mungkin gk terlalu penting dengan hal-hal seperti ini. Namun,
untuk kalian yang bertugas di area operation seperti sysadmin, devops dsb. Biasanya ini akan sangat terbantu kalo misalkan kita punya
informasi seperti ini.

Tujuannya kalaupun nanti misalkan ada sebuah masalah kita akan lebih mudah menganalisa atau tracing nya itu. Misalkan karena ada aktivitas
apa nih kan bisa kelihatan oh CPU Load nya tinggi, oh memory nya ternyata habis.

Nah untuk komponen-kompenen lainnya silahkan nanti kalian bisa explore sendiri karena cukup banyak. Tapi intinya disini banyak sekali
object yang bisa kita monitoring, tidak hanya CPU, memory, disk, network.

Selanjutnya jika kalian sudah buatkan dashboard seperti ini, apa yang bisa kalian kembangkan? sebetulnya dari sebuah panel atau panel
monitoring kalian nanti bisa tambahkan semacam alert, nah biasanya monitoring tools ini akan memberi tahu kita misalkan kita mengelola
server. Server kita kondisi memory nya sudah 80% yang dimana bisa di ibaratkan perlu di upgrade, nah kita kan tidak mungkin melakukan
monitoring server selama 24 jam, sehingga dengan adanya alert minimal nanti bisa memberi pemberitahuan atau notifikasi dan alert nya juga
bisa beragam, bisa melalui email, telegram dsb.

Prometheus dan Grafana ini tidak hanya untuk perangkat server saja tapi bisa digunakan untuk perangkat-perangkat yang lain, sebagai contoh
misalkan perangkat networking yang banyak basis nya kita menggunakan SNMP. Nah data dari SNMP itu bisa juga kita visualisasikan menggunakan
grafana ini.
