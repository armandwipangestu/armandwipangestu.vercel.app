---
published: true
title: "Terraform - Otomatisasi Deployment Infrastructure Menggunakan Terraform"
tag: "Cloud"
date: "April 01 2024"
excerpt: "Pada pembahasan kali ini saya akan mencoba menggunakan Terraform untuk mendeploy infrastructure pada Google Cloud Platform (GCP)"
cover_image: "/images/posts/Terraform - Otomatisasi Deployment Infrastructure Menggunakan Terraform.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Apa itu Terraform? Terraform adalah tools yang menawarkan Infrastructure as Code (`IaC`). Dengan menggunakan Terraform ini kita bisa membuat infrastructure menjadi lebih safely, dan predictable create, change, dan improve infrastructure.

## Set up Terraform dan Cloud Shell

Konfigurasi Cloud Shell environment kalian untuk menggunakan Terraform.

### Install Terraform

Terraform sudah terintegrasi secara bawaan pada Cloud Shell, untuk memastikan versi berapa yang di install ikuti langkah berikut ini.

1. Pada Cloud Console UI, click `Activate Cloud Shell` (menu ini berada di pojok kanan atas dengan icon terminal).
2. Jika terdapat prompt, click `Konfirmasi`
3. Setelah masuk kedalam Cloud Shell, jalankan perintah berikut ini:

```bash
terraform --version
```

Maka akan muncul output kurang lebih seperti ini:

```bash
Terraform v1.3.3
```

4. Buat folder untuk konfigurasi Terraform dengan perintah berikut ini:

```bash
mkdir tfinfra
```

5. Pada Cloud Shell, click `Open editor` untuk membuka code editor yang terintegrasi dengan Cloud Shell.

6. Pada panel sebelah kiri dari kode editor, expand the `tfinfra` folder.

### Initialize Terraform

Terraform menggunakan sebuah plugin-based arsitektur untuk men-support numerous infrastructure dan service provider yang tersedia. Setiap "provider" tersebut mempunyai encapsulated binary distributed terpisah dari Terraform itu sendiri. Initialize Terraform untuk menggunakan Google sebagai provider.

1. Buat sebuah file baru di dalam folder `tfinfra` dengan cara click kanan di folder nya dan pilih `New File`
2. Berikan nama untuk file baru tersebut dengan `provider.tf`, kemudian buka file nya.
3. Tuliskan kode berikut ini kedalam file `provider.tf`.

```tf
provider "google" {}
```

4. Untuk menyimpan `provider.tf`, click `File` > `Save`.
5. Untuk melakukan initialize Terraform, jalankan perintah berikut ini:

```bash
cd tfinfra
terraform init
```

Maka akan muncul output kurang lebih seperti ini:

```bash
Initializing the backend...

Initializing provider plugins...
- Finding latest version of hashicorp/google...
- Installing hashicorp/google v5.22.0...
- Installed hashicorp/google v5.22.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

Sekarang kalian sudah siap untuk bekerja dengan Terraform di Cloud Shell.

## Membuat Network Dengan Nama mynetwork dan Resources

Buat sebuah auto mode network dengan nama `mynetwork` beserta dengan aturan firewall nya dan dua buah Compute Engine (VM) instances dengan nama (`mynet_us_vm` dan `mynet_eu_vm`).

### Konfigurasi mynetwork

Buat sebuah konfigurasi baru, dan definisikan konfigurasi `mynetwork`.

1. Buat sebuah file baru di dalam folder `tfinfra` dengan cara click kanan di folder nya dan pilih `New File`
2. Berikan nama untuk file baru tersebut dengan `mynetwork.tf`, kemudian buka file nya.
3. Tuliskan kode berikut ini kedalam file `mynetwork.tf`.

> **Catatan**: Template konfigurasi
>
> ```tf
> # Create the mynetwork network
> resource [RESOURCE_TYPE] "mynetwork" {
> name = [RESOURCE_NAME]
> # RESOURCE properties go here
> }
> ```
>
> Gunakan base template adalah sesuatu yang bagus untuk starting point untuk setiap Google Cloud resource. Field `name` mengizinkan kalian untuk memberikan nama pada resource, dan field `type` mengizinkan kalian untuk men-spesifikasikan Google Cloud resource yang ingin kalian buat. Kalian juga bisa mendefinisikan `properties`, tapi ini optional untuk beberapa resources.

4. Pada file `mynetwork.tf`, ganti `[RESOURCE_TYPE]` dengan `"google_compute_network"`

> **Catatan**: `google_cloud_network` adalah sebuah resource VPC network. Resource ini tersedia di [Google Cloud provider documentation](https://www.terraform.io/docs/providers/google/index.html). Untuk mempelajari lebih lanjut mengenai resource ini secara spesifik kalian bisa baca disini [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_network).

5. Pada file `mynetwork.tf`, ganti `[RESOURCE_NAME]` dengan `"mynetwork"`
6. Dan tambahkan property ini di file `mynetwork.tf`

```tf
auto_create_subnetworks = "true"
```

Dengan mendefinisikan property auto mode network otomatis diatas, maka akan membuat sebuah subnetwork pada masing-masing region nya.

7. Verifikasi file `mynetwork.tf` hasilnya seperti ini

```tf
resource "google_compute_network" "mynetwork" {
    name = "mynetwork"
    auto_create_subnetworks = "true"
}
```

8. Untuk menyimpan `mynetwork.tf`, click `File` > `Save`.

### Konfigurasi Aturan Firewall

Definisikan sebuah aturan firewall untuk mengizinkan traffic `HTTP`, `SSH`, `RDP`, dan `ICMP` pada network `mynetwork`.

1. Tambahkan kode berikut ini di baris paling bawah pada file `mynetwork.tf`

> **Catatan**: `google_compute_firewall` adalah resource untuk aturan firewall. Untuk mempelajari resource ini dengan lebih spesifik kalian bisa baca disini [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_firewall).
>
> Karena aturan firewall ini bergantung pada network ini, maka mendefinisikan konfigurasi `google_compute_network.mynetwork.self_link` reference untuk men-instruksikan Terraform untuk menyelesaikan resource ini dalam urutan yang ketergantungan. Pada kasus ini, sebuah network akan dibuat terlebih dahulu sebelum aturan firewall nya.

```tf
resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
    name = "mynetwork-allow-http-ssh-rdp-icmp"
    network = google_compute_network.mynetwork.self_link

    allow {
        protocol = "tcp"
        ports = ["22", "80", "3389"]
    }

    allow {
        protocol = "icmp"
    }
    source_ranges = ["0.0.0.0/0"]
}
```

2. Verifikasi file `mynetwork.tf` hasilnya seperti ini

```tf
resource "google_compute_network" "mynetwork" {
    name = "mynetwork"
    auto_create_subnetworks = "true"
}

resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
    name = "mynetwork-allow-http-ssh-rdp-icmp"
    network = google_compute_network.mynetwork.self_link

    allow {
        protocol = "tcp"
        ports = ["22", "80", "3389"]
    }

    allow {
        protocol = "icmp"
    }
    source_ranges = ["0.0.0.0/0"]
}
```

3. Untuk menyimpan `mynetwork.tf`, click `File` > `Save`.

### Konfigurasi Compute Engine (VM) instance

Definisikan VM instance dengan membuat sebuah VM instance `module`. Sebuah module akan menjadi konfigurasi yang reusable di dalam sebuah folder. Kalian bisa gunakan module untuk kedua VM yang akan dibuat kali ini.

1. Buat sebuah folder baru di dalam `tfinfra`, click kanan pada folder `tfinfra`, kemudian click `File` > `New Folder`.
2. Berikan nama untuk subfolder tersebut dengan `instance`.
3. Selanjutnya buat sebuah file baru di subfolder tersebut dengan nama `main.tf`

Maka seharusnya sekarang struktur folder nya akan seperti ini

```bash
 tfinfra
├──  instance
│  └──  main.tf
├──  mynetwork.tf
└──  provider.tf
```

4. Tambahkan kode berikut ini kedalam file `main.tf`

> **Catatan**: `google_compute_instance` adalah sebuah resource compute engine (VM). Untuk mempelajari resource ini dengan lebih spesifik kalian bisa baca disini [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_instance).
>
> Dikarenakan kita akan menggunakan module ini untuk membuat dua VM, kalian definisikan nama instance nya sebagai sebuah input variable. Dengan ini maka mengizinkan untuk control nama dari VM yang akan dibuat dari variable `mynetwork.tf` nantinya ketika dipanggil. Untuk mempelajari mengenai input variable kalian bisa baca disini [Terraform: Define Input Variables Guide](https://learn.hashicorp.com/terraform/getting-started/variables).
>
> ```tf
> name = "${var.instance_name}"
> zone = "${var.instance_zone}"
> machine_type = "${var.instance_type}"
> ```
>
> VM ini akan menggunakan sistem operasi Debian 11, oleh karena itu pada konfigurasi `boot_disk` image yang digunakan adalah `debian-cloud/debian-11`
>
> ```tf
>  boot_disk {
>    initialize_params {
>      image = "debian-cloud/debian-11"
>      }
>  }
> ```
>
> Pada bagian network interface untuk VM yang akan dibuat, kita akan gunakan input variable juga. Dan untuk empty atau blank konfigurasi pada `access_config` maka akan menghasilkan ephemeral external IP address (Dynamic IP Public). Jika kalian ingin membuat sebuah VM instance hanya menggunakan internal IP address (IP Local), maka hapus konfigurasi `access_config`. Untuk mempelajari lebih lanjut, lihat disini [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_instance).

```tf
resource "google_compute_instance" "vm_instance" {
    name = "${var.instance_name}"
    zone = "${var.instance_zone}"
    machine_type = "${var.instance_type}"
    boot_disk {
        initialize_params {
            image = "debian-cloud/debian-11"
        }
    }
    network_interface {
        network = "${var.instance_network}"
        access_config {
            # This property defines the network interface by providing the network name as an input
            # variable and the access configuration. Leaving the access configuration empty results
            # in an ephemeral external IP address (required in this lab). To create instances with
            # only an internal IP address, remove the `access_config` section.
            # Allocate a one-to-one NAT IP to the instance
        }
    }
}
```

5. Buat sebuah file baru lagi didalam folder `instance` dengan nama `variables.tf`

Maka seharusnya sekarang struktur folder nya akan seperti ini

```bash
 tfinfra
├──  instance
│  ├──  main.tf
│  └──  variables.tf
├──  mynetwork.tf
└──  provider.tf
```

6. Tambahkan kode berikut ini kedalam file `variables.tf`

> **Catatan**: Dengan memberikan `instance_type` default value, maka kalian membuat variable nya menjadi optional. Sedangkan variable `instacnce_name`, `instance_zone`, dan `instance_network` adalah required, dan kalian akan definisikan variable tersebut pada file `mynetwork.tf`.

```tf
variable "instance_name" {}
variable "instance_zone" {}
variable "instance_type" {
    default = "e2-micro"
}
variable "instance_network" {}
```

7. Tambahkan kode berikut ini di baris paling bawah kedalam file `mynetwork.tf` untuk membuat sebuah VM instances

```tf
# Create the mynet-us-vm instance
module "mynet-us-vm" {
    source = "./instance"
    instance_name = "mynet-us-vm"
    instance_zone = "us-central1-a"
    instance_network = google_compute_network.mynetwork.self_link
}

# Create the mynet-eu-vm instance
module "mynet-eu-vm" {
    source = "./instance"
    instance_name = "mynet-eu-vm"
    instance_zone = "europe-west1-a"
    instance_network = google_compute_network.mynetwork.self_link
}
```

Resource ini memanfaatkan module dari folder `instance` dan memberikan `instance_name`, `instance_zone`, dan `instance_network` sebagai input. Karena instance ini bergantun pada jaringan VPC, kalian gunakan reference `google_compute_network.mynetwork.self_link` untuk men-instruksikan Terraform menyelesaikan resource ini dalam urutan dependency. Dalam hal ini, network akan dibuat terlebih dahulu sebelum instance nya.

> **Catatan**: Benefit menuliskan sbeuah Terraform module adalah kode akan bisa di reused pada berbagai macam konfigurasi. Dari pada menulis module kalian sendiri, kalian juga bisa memanfaatkan module yang ada di [Terraform Module registry](https://registry.terraform.io/browse?provider=google&verified=true)

8. Verifikasi file `mynetwork.tf` hasilnya seperti ini

```tf
resource "google_compute_network" "mynetwork" {
    name = "mynetwork"
    auto_create_subnetworks = "true"
}

resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
    name = "mynetwork-allow-http-ssh-rdp-icmp"
    network = google_compute_network.mynetwork.self_link

    allow {
        protocol = "tcp"
        ports = ["22", "80", "3389"]
    }

    allow {
        protocol = "icmp"
    }
    source_ranges = ["0.0.0.0/0"]
}

# Create the mynet-us-vm instance
module "mynet-us-vm" {
    source = "./instance"
    instance_name = "mynet-us-vm"
    instance_zone = "us-central1-a"
    instance_network = google_compute_network.mynetwork.self_link
}

# Create the mynet-eu-vm instance
module "mynet-eu-vm" {
    source = "./instance"
    instance_name = "mynet-eu-vm"
    instance_zone = "europe-west1-a"
    instance_network = google_compute_network.mynetwork.self_link
}
```

### Membuat mynetwork dan resource

Setelah konfigurasi semua selesai sekarang waktunya menerapkan konfigurasi nya

1. Untuk re-write Terraform konfigurasi file menjadi cannonical format dan style, jalankan perintah berikut ini.

```bash
terraform fmt
```

Hasilnya kurang lebih akan seperti ini:

```bash
mynetwork.tf
provider.tf
```

> **Catatan**: Jika kalian mendapatkan error, lihat lagi langkah sebelumnya untuk memastikan bahwa konfigurasi kalian sesuai. Jika kalian tidak bisa troubleshoot masalah konfigurasi nya, kalian bisa lihat di repository saya berikut ini [github.com/armandwipangestu/example-terraform-infra](https://github.com/armandwipangestu/example-terraform-infra)

2. Initialize Terraform, jalankan perintah berikut ini:

```bash
terraform init
```

Hasilnya kurang lebih akan seperti ini:

```bash
Initializing the backend...
Initializing modules...
- mynet-eu-vm in instance
- mynet-us-vm in instance

Initializing provider plugins...
- Reusing previous version of hashicorp/google from the dependency lock file
- Using previously-installed hashicorp/google v5.22.0

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

3. Untuk membuat execute plan, jalankan perintah berikut ini:

```bash
terraform plan
```

Hasilnya kurang lebih seperti ini:

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_compute_firewall.mynetwork-allow-http-ssh-rdp-icmp will be created
  + resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
      + creation_timestamp = (known after apply)
      + destination_ranges = (known after apply)
      + direction          = (known after apply)
      + enable_logging     = (known after apply)
      + id                 = (known after apply)
      + name               = "mynetwork-allow-http-ssh-rdp-icmp"
      + network            = (known after apply)
      + priority           = 1000
      + project            = "qwiklabs-gcp-02-3b9f810276c7"
      + self_link          = (known after apply)
      + source_ranges      = [
          + "0.0.0.0/0",
        ]

      + allow {
          + ports    = [
              + "22",
              + "80",
              + "3389",
            ]
          + protocol = "tcp"
        }
      + allow {
          + ports    = []
          + protocol = "icmp"
        }
    }

  # google_compute_network.mynetwork will be created
  + resource "google_compute_network" "mynetwork" {
      + auto_create_subnetworks                   = true
      + delete_default_routes_on_create           = false
      + gateway_ipv4                              = (known after apply)
      + id                                        = (known after apply)
      + internal_ipv6_range                       = (known after apply)
      + mtu                                       = (known after apply)
      + name                                      = "mynetwork"
      + network_firewall_policy_enforcement_order = "AFTER_CLASSIC_FIREWALL"
      + numeric_id                                = (known after apply)
      + project                                   = "qwiklabs-gcp-02-3b9f810276c7"
      + routing_mode                              = (known after apply)
      + self_link                                 = (known after apply)
    }

  # module.mynet-eu-vm.google_compute_instance.vm_instance will be created
  + resource "google_compute_instance" "vm_instance" {
      + can_ip_forward       = false
      + cpu_platform         = (known after apply)
      + current_status       = (known after apply)
      + deletion_protection  = false
      + effective_labels     = (known after apply)
      + guest_accelerator    = (known after apply)
      + id                   = (known after apply)
      + instance_id          = (known after apply)
      + label_fingerprint    = (known after apply)
      + machine_type         = "e2-micro"
      + metadata_fingerprint = (known after apply)
      + min_cpu_platform     = (known after apply)
      + name                 = "mynet-eu-vm"
      + project              = "qwiklabs-gcp-02-3b9f810276c7"
      + self_link            = (known after apply)
      + tags_fingerprint     = (known after apply)
      + terraform_labels     = (known after apply)
      + zone                 = "europe-west1-d"

      + boot_disk {
          + auto_delete                = true
          + device_name                = (known after apply)
          + disk_encryption_key_sha256 = (known after apply)
          + kms_key_self_link          = (known after apply)
          + mode                       = "READ_WRITE"
          + source                     = (known after apply)

          + initialize_params {
              + image                  = "debian-cloud/debian-11"
              + labels                 = (known after apply)
              + provisioned_iops       = (known after apply)
              + provisioned_throughput = (known after apply)
              + size                   = (known after apply)
              + type                   = (known after apply)
            }
        }

      + network_interface {
          + internal_ipv6_prefix_length = (known after apply)
          + ipv6_access_type            = (known after apply)
          + ipv6_address                = (known after apply)
          + name                        = (known after apply)
          + network                     = (known after apply)
          + network_ip                  = (known after apply)
          + stack_type                  = (known after apply)
          + subnetwork                  = (known after apply)
          + subnetwork_project          = (known after apply)

          + access_config {
              + nat_ip       = (known after apply)
              + network_tier = (known after apply)
            }
        }
    }

  # module.mynet-us-vm.google_compute_instance.vm_instance will be created
  + resource "google_compute_instance" "vm_instance" {
      + can_ip_forward       = false
      + cpu_platform         = (known after apply)
      + current_status       = (known after apply)
      + deletion_protection  = false
      + effective_labels     = (known after apply)
      + guest_accelerator    = (known after apply)
      + id                   = (known after apply)
      + instance_id          = (known after apply)
      + label_fingerprint    = (known after apply)
      + machine_type         = "e2-micro"
      + metadata_fingerprint = (known after apply)
      + min_cpu_platform     = (known after apply)
      + name                 = "mynet-us-vm"
      + project              = "qwiklabs-gcp-02-3b9f810276c7"
      + self_link            = (known after apply)
      + tags_fingerprint     = (known after apply)
      + terraform_labels     = (known after apply)
      + zone                 = "us-west1-c"

      + boot_disk {
          + auto_delete                = true
          + device_name                = (known after apply)
          + disk_encryption_key_sha256 = (known after apply)
          + kms_key_self_link          = (known after apply)
          + mode                       = "READ_WRITE"
          + source                     = (known after apply)

          + initialize_params {
              + image                  = "debian-cloud/debian-11"
              + labels                 = (known after apply)
              + provisioned_iops       = (known after apply)
              + provisioned_throughput = (known after apply)
              + size                   = (known after apply)
              + type                   = (known after apply)
            }
        }

      + network_interface {
          + internal_ipv6_prefix_length = (known after apply)
          + ipv6_access_type            = (known after apply)
          + ipv6_address                = (known after apply)
          + name                        = (known after apply)
          + network                     = (known after apply)
          + network_ip                  = (known after apply)
          + stack_type                  = (known after apply)
          + subnetwork                  = (known after apply)
          + subnetwork_project          = (known after apply)

          + access_config {
              + nat_ip       = (known after apply)
              + network_tier = (known after apply)
            }
        }
    }

Plan: 4 to add, 0 to change, 0 to destroy.

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

Terraform menentukan kebutuhan 4 resource akan di tambahkan:

| Name                              | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| mynetwork                         | VPC network                                     |
| mynetwork-allow-http-ssh-rdp-icmp | Firewall rule to allow HTTP, SSH, RDP, and ICMP |
| mynet-us-vm                       | VM instance in `us-central1-a`                  |
| mynet-eu-vm                       | VM instance in `europe-west1-a`                 |

4. Untuk apply perubahan yang diinginkan, jalankan perintah berikut ini:

```bash
terraform apply
```

5. Konfirmasi aksi dari planned tersebut dengan mengetik `yes` dan tekan `ENTER`

Hasilnya kurang lebih seperti ini:

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_compute_firewall.mynetwork-allow-http-ssh-rdp-icmp will be created
  + resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
      + creation_timestamp = (known after apply)
      + destination_ranges = (known after apply)
      + direction          = (known after apply)
      + enable_logging     = (known after apply)
      + id                 = (known after apply)
      + name               = "mynetwork-allow-http-ssh-rdp-icmp"
      + network            = (known after apply)
      + priority           = 1000
      + project            = "qwiklabs-gcp-02-3b9f810276c7"
      + self_link          = (known after apply)
      + source_ranges      = [
          + "0.0.0.0/0",
        ]

      + allow {
          + ports    = [
              + "22",
              + "80",
              + "3389",
            ]
          + protocol = "tcp"
        }
      + allow {
          + ports    = []
          + protocol = "icmp"
        }
    }

  # google_compute_network.mynetwork will be created
  + resource "google_compute_network" "mynetwork" {
      + auto_create_subnetworks                   = true
      + delete_default_routes_on_create           = false
      + gateway_ipv4                              = (known after apply)
      + id                                        = (known after apply)
      + internal_ipv6_range                       = (known after apply)
      + mtu                                       = (known after apply)
      + name                                      = "mynetwork"
      + network_firewall_policy_enforcement_order = "AFTER_CLASSIC_FIREWALL"
      + numeric_id                                = (known after apply)
      + project                                   = "qwiklabs-gcp-02-3b9f810276c7"
      + routing_mode                              = (known after apply)
      + self_link                                 = (known after apply)
    }

  # module.mynet-eu-vm.google_compute_instance.vm_instance will be created
  + resource "google_compute_instance" "vm_instance" {
      + can_ip_forward       = false
      + cpu_platform         = (known after apply)
      + current_status       = (known after apply)
      + deletion_protection  = false
      + effective_labels     = (known after apply)
      + guest_accelerator    = (known after apply)
      + id                   = (known after apply)
      + instance_id          = (known after apply)
      + label_fingerprint    = (known after apply)
      + machine_type         = "e2-micro"
      + metadata_fingerprint = (known after apply)
      + min_cpu_platform     = (known after apply)
      + name                 = "mynet-eu-vm"
      + project              = "qwiklabs-gcp-02-3b9f810276c7"
      + self_link            = (known after apply)
      + tags_fingerprint     = (known after apply)
      + terraform_labels     = (known after apply)
      + zone                 = "europe-west1-d"

      + boot_disk {
          + auto_delete                = true
          + device_name                = (known after apply)
          + disk_encryption_key_sha256 = (known after apply)
          + kms_key_self_link          = (known after apply)
          + mode                       = "READ_WRITE"
          + source                     = (known after apply)

          + initialize_params {
              + image                  = "debian-cloud/debian-11"
              + labels                 = (known after apply)
              + provisioned_iops       = (known after apply)
              + provisioned_throughput = (known after apply)
              + size                   = (known after apply)
              + type                   = (known after apply)
            }
        }

      + network_interface {
          + internal_ipv6_prefix_length = (known after apply)
          + ipv6_access_type            = (known after apply)
          + ipv6_address                = (known after apply)
          + name                        = (known after apply)
          + network                     = (known after apply)
          + network_ip                  = (known after apply)
          + stack_type                  = (known after apply)
          + subnetwork                  = (known after apply)
          + subnetwork_project          = (known after apply)

          + access_config {
              + nat_ip       = (known after apply)
              + network_tier = (known after apply)
            }
        }
    }

  # module.mynet-us-vm.google_compute_instance.vm_instance will be created
  + resource "google_compute_instance" "vm_instance" {
      + can_ip_forward       = false
      + cpu_platform         = (known after apply)
      + current_status       = (known after apply)
      + deletion_protection  = false
      + effective_labels     = (known after apply)
      + guest_accelerator    = (known after apply)
      + id                   = (known after apply)
      + instance_id          = (known after apply)
      + label_fingerprint    = (known after apply)
      + machine_type         = "e2-micro"
      + metadata_fingerprint = (known after apply)
      + min_cpu_platform     = (known after apply)
      + name                 = "mynet-us-vm"
      + project              = "qwiklabs-gcp-02-3b9f810276c7"
      + self_link            = (known after apply)
      + tags_fingerprint     = (known after apply)
      + terraform_labels     = (known after apply)
      + zone                 = "us-west1-c"

      + boot_disk {
          + auto_delete                = true
          + device_name                = (known after apply)
          + disk_encryption_key_sha256 = (known after apply)
          + kms_key_self_link          = (known after apply)
          + mode                       = "READ_WRITE"
          + source                     = (known after apply)

          + initialize_params {
              + image                  = "debian-cloud/debian-11"
              + labels                 = (known after apply)
              + provisioned_iops       = (known after apply)
              + provisioned_throughput = (known after apply)
              + size                   = (known after apply)
              + type                   = (known after apply)
            }
        }

      + network_interface {
          + internal_ipv6_prefix_length = (known after apply)
          + ipv6_access_type            = (known after apply)
          + ipv6_address                = (known after apply)
          + name                        = (known after apply)
          + network                     = (known after apply)
          + network_ip                  = (known after apply)
          + stack_type                  = (known after apply)
          + subnetwork                  = (known after apply)
          + subnetwork_project          = (known after apply)

          + access_config {
              + nat_ip       = (known after apply)
              + network_tier = (known after apply)
            }
        }
    }

Plan: 4 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

google_compute_network.mynetwork: Creating...
google_compute_network.mynetwork: Still creating... [10s elapsed]
google_compute_network.mynetwork: Still creating... [20s elapsed]
google_compute_network.mynetwork: Still creating... [30s elapsed]
google_compute_network.mynetwork: Still creating... [40s elapsed]
google_compute_network.mynetwork: Still creating... [50s elapsed]
google_compute_network.mynetwork: Creation complete after 54s [id=projects/qwiklabs-gcp-02-3b9f810276c7/global/networks/mynetwork]
module.mynet-eu-vm.google_compute_instance.vm_instance: Creating...
module.mynet-us-vm.google_compute_instance.vm_instance: Creating...
google_compute_firewall.mynetwork-allow-http-ssh-rdp-icmp: Creating...
module.mynet-us-vm.google_compute_instance.vm_instance: Still creating... [10s elapsed]
module.mynet-eu-vm.google_compute_instance.vm_instance: Still creating... [10s elapsed]
google_compute_firewall.mynetwork-allow-http-ssh-rdp-icmp: Still creating... [10s elapsed]
google_compute_firewall.mynetwork-allow-http-ssh-rdp-icmp: Creation complete after 12s [id=projects/qwiklabs-gcp-02-3b9f810276c7/global/firewalls/mynetwork-allow-http-ssh-rdp-icmp]
module.mynet-us-vm.google_compute_instance.vm_instance: Creation complete after 19s [id=projects/qwiklabs-gcp-02-3b9f810276c7/zones/us-west1-c/instances/mynet-us-vm]
module.mynet-eu-vm.google_compute_instance.vm_instance: Still creating... [20s elapsed]
module.mynet-eu-vm.google_compute_instance.vm_instance: Creation complete after 24s [id=projects/qwiklabs-gcp-02-3b9f810276c7/zones/europe-west1-d/instances/mynet-eu-vm]

Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
```

## Verifikasi deployment kalian

Pada Cloud Console, verifikasi resource yang sudah kalian buat menggunakan Terraform.

### Verifikasi network kalian di Cloud Console

1. Pada Cloud Console UI, pergi ke `Navigation Menu` > `VPC network` > `VPC networks`.
2. Kalian bisa lihat VPC network dengan nama `mynetwork` beserta dengan subnetwork nya di setiap region.
3. Lihat aturan firewall yang sudah dibuat di `Navigation Menu` > `VPC network` > `Firewall`
4. Kalian bisa lihat aturan firewall dengan nama `mynetwork-allow-http-ssh-rdp-icmp` pada network `mynetwork`.

### Verifikasi VM instances di Cloud Console

1. Pada Cloud Console UI, pergi ke `Navigation Menu` > `Compute Engine` > `VM instances`
2. Kalian bisa lihat terdapat dua buah instances dengan nama `mynet-us-vm` dan `mynet-eu-vm`.
3. Copy internal IP address `mynet-eu-vm` untuk kita lakukan test koneksi menggunakan `ping` di instance `mynet-us-vm` untuk mengecek apakah firewall nya berajalan dengan baik atau tidak.
4. Pada bagian `mynet-us-vm`, click `SSH` untuk me-remote nya.
5. Test konektivitas ke `mynet-eu-vm` menggunakan internal IP address

> **Catatan**: Ini seharusnya akan bekerja dengan baik karena kedua VM tersebut masih dalam satu network, dan aturan firewall yang sudah dibuat mengizinkan ICMP traffic!

```bash
ping -c 3 <Enter mynet-eu-vm's internal IP here>
```

## Penutup

Selamat, kalian sudah membuat Terraform konfigurasi dengan sebuah module untuk mengotomatisasi deployment infrastruktur di Google Cloud.
Saat konfigurasi kalian berubah, Terraform dapat membuat plan eksekusi tambahan, yang memungkinkan kalian membangun keseluruhan konfigurasi langkah demi langkah.

Module instane memungkinkan kalian menggunakan kembali konfigurasi resource yang sama untuk beberapa resource dengan menyediakan property sebagai input variable.
Kalian bisa memanfaatkan konfigurasi dan module yang kalian buat sebagai starting point di masa yang akan datang.
