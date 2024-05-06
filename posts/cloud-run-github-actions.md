---
published: true
title: "Cloud Run - Implementasi DevOps CI/CD Pipeline Menggunakan GitHub Actions"
tag: "DevOps"
date: "May 06 2024"
excerpt: "Pada artikel ini kita akan melakukan deployment simpel app Express.js menggunakan Cloud Run dan meng-implementasikan CI/CD Pipeline menggunakan GitHub Actions"
cover_image: "/images/posts/Cloud Run - Implementasi DevOps CI CD Pipeline Menggunakan GitHub Actions.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

> **Catatan**: Alangkah baiknya jika kalian ingin mengikuti artikel ini, kalian setidaknya sudah mengerti teori atau pernah mencoba dari masing-masing teknologi yang akan digunakan di artikel ini, seperti:
>
> - `GitHub`
> - `GitHub Actions`
> - `Google Cloud Platform`
> - `Cloud Run`
> - `Identity Access Management (IAM)`
> - `Docker`
> - `Node.js`
> - `Linux`
>
> Tujuannya adalah agar mempermudah pemahaman alur dan implementasi dari artikel ini

Saat ini saya sedang mengikuti program Studi Independent Kampus Merdeka dengan program Bangkit Academy 2024 Batch 1, pada program tersebut saya mengambil learning path Cloud Computing yang dimana bertanggung jawab untuk membuat backend dan mengelola deployment di Google Cloud Platform.

Oleh karena itu saya melakukan eksplorasi mandiri atau otodidak agar mempermudah pekerjaan saya di Capstone Project nanti dengan cara meng-implementasikan DevOps CI/CD Pipeline menggunakan GitHub Actions dan Cloud Run, hasil dari eksplorasi tersebut terciptalah artikel ini 😁.

Saya mencoba merancang arsitektur diagram atau topologi dari resource dan cara kerja yang akan dipakai adalah seperti animasi GIF dibawah ini

![Containerized App](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/containerized-app.gif)

### Alur Kerja

Kalian bisa lihat dari animasi GIF diatas, seharusnya alur kerja nya adalah seperti ini

> **Catatan**: Trigger dari GitHub Actions disini bisa terjadi bukan hanya karena ada `push` ke `main` branch saja, tetapi jika melakukan `pull request` dan kemudian di `merge` ke `main` branch, maka akan ikut ke-trigger. Sehingga intinya adalah ketika ada perubahan di branch tertentu, maka job dari GitHub Actions nya akan ke trigger.
>
> `SHA` disini adalah unique id dari git ketika melakukan commit atau biasa dikenal juga sebagai `hash`
>
> `Cloud Run` deployment service secara default adalah private atau `Require authentication` user menggunakan Cloud IAM, jadi pastikan jika kalian ingin membuat nya public ubah ke `Allow unauthenticated invocations`

1. Back-End Developer mendevelop aplikasi Express.js kemudian melakukan `push` ke repository GitHub pada branch `main`
2. GitHub Actions men-trigger job untuk melakukan build docker image dengan tag berdasarkan `SHA` dari commit nya dan menyimpan nya ke `Artifact Registry` karena terdapat perubahan kode di branch `main`
3. Setelah GitHub Actions melakukan build docker image dan menyimpan nya ke artifact registry, selanjutnya GitHub Actions melakukan deployment pada `Cloud Run` menggunakan docker image dari artifact registry dengan tag latest atau terakhir yang di simpan (disini latest nya berdasarkan `SHA`)
4. Deployment service sudah ready atau siap digunakan, disini Front-End Developer bisa langsung melakukan hit atau konsumsi RESTful API nya karena Cloud Run secara default memiliki domain.

## Persiapan

Untuk mencapai tujuan dari semua yang sudah dijelaskan diatas, kita memerlukan persiapan yang lumayan cukup kompleks untuk kalian yang baru pertama kali atau masih awam seperti saya di bidang Cloud Computing dan DevOps. Agar lebih simpel mungkin akan saya list apa saja yang harus di persiapkan, berikut adalah list nya:

1. GitHub CLI (Untuk membuat repository melalui terminal, jika kalian tidak terbiasa, gunakan saja yang versi web)
2. Cloud CLI (Untuk melakukan remote project dan sebagainya melalui terminal, jika kalian tidak terbiasa, gunakan saja yang versi web atau Cloud Console)
3. Simpel Aplikasi Express.js dengan 1 endpoint di root (`/`) untuk menampilkan response pada method GET (aplikasi ini juga dibungkus menggunakan Dockerfile karena Cloud Run deployment harus menggunakan docker)
4. GitHub Actions workflows (Kumpulan job yang akan dijalankan ketika trigger nya aktif)
5. Google Cloud Resources
   - Service Account (Untuk permission atau autentikasi GitHub Actions ke Google Cloud Platform)
   - Artifact Registry (Untuk menyimpan atau store docker image yang di build)

### Membuat GitHub Repository

Untuk membuat sebuah GitHub Repository kalian bisa buat sendiri melalui web nya atau disini karena saya sudah menggunakan `GitHub CLI` jadi saya bisa jalankan langsung di terminal saya dengan perintah seperti berikut ini:

```bash
gh repo create example-cloud-run-github-actions --public
```

![GH Create Repository](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/gh-create-repo.png)

### Membuat Simpel Aplikasi Express.js

Setelah GitHub Repository nya dibuat, sekarang kita buat simpel aplikasi Express.js yang dimana mempunyai 1 buah endpoint di root (`/`) untuk menampilkan response pada method GET. Untuk membuat nya ikuti langkah-langkah berikut ini:

#### Membuat folder

```bash
mkdir example-cloud-run-github-actions
```

#### Pindah ke dalam folder

```bash
cd example-cloud-run-github-actions
```

#### Inisialisasi folder sebagai repository git

```bash
git init
```

#### Menambahkan remote origin repository github sebagai tempat host nya

> **Catatan**: Kalian bisa sesuaikan dengan akun `username` kalian dan `repository` yang kalian buat sebelumnya
>
> Disini saya menggunakan SSH sebagai authentication github nya, jika kalian menggunakan HTTPS gunakan format berikut ini
>
> ```bash
> git remote add origin https://github.com/<username>/<repository>.git
> ```

```bash
git remote add origin git@github.com:<username>/<repository>.git
```

![Git Init](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/git-init.png)

#### Inisialisasi folder sebagai package Node.js

Dikarenakan disini kita akan membuat aplikasi menggunakan Node.js, maka kita perlu melakukan inisialisasi folder atau project nya sebagai package. Untuk melakukan nya jalankan perintah berikut ini:

```bash
npm init -y
```

#### Menambahkan Custom Script Command Node.js

Setelah melakukan inisalisasi project, maka Node.js akan men-generate file dengan nama `package.json`. Pada file ini kita bisa tambahkan custom script command untuk menjalankan aplikasi Express.js nantinya. Untuk melakukannya tambahkan command berikut ini didalam object `script`

```json
"scripts": {
    "start": "node ./index.js"
}
```

Sehingga isian dari file `package.json` nya menjadi seperti ini

```json
{
  "name": "example-cloud-run-github-actions",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node ./index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

#### Menginstall package Express.js

Selanjutnya kita install package Express.js nya menggunakan perintah berikut ini

```bash
npm install express
```

![NPM Install](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/npm-install.png)

#### Membuat Aplikasi

Setelah package express terinstall, sekarang kita sudah siap membuat simpel aplikasi nya. Untuk membuat nya buat sebuah file dengan nama `index.js` di lokasi root folder nya kemudian isikan dengan kode seperti berikut ini

```js
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Hello World!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
```

![Express Simple App](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/express-simpel-app.png)

#### Mencoba Aplikasi via Local

Setelah aplikasi nya berhasil dibuat, sekarang kita coba jalankan di local menggunakan perintah berikut ini

```bash
npm run start
```

Maka sekarang jika kita coba buka alamat `localhost:5000` akan menampilkan response json seperti ini

```json
{
  "status": "success",
  "message": "Hello World!"
}
```

![App Running](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/app-running.png)

#### Membuat File Dockerfile

Setelah aplikasi nya berjalan dengan baik dan lancar, sekarang kita siapkan konfigurasi docker nya di file `Dockerfile` agar aplikasi kita bisa berjalan di deployment container. Untuk membuat nya kalian cukup buat file baru di root folder dengan nama `Dockerfile` kemudian isikan konfigurasi seperti berikut ini

```Dockerfile
FROM node:21.7.3-alpine3.18

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
```

![Dockerfile](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/dockerfile.png)

#### Membuat File Gitignore

Setelah semua proses selesai dan akan mencoba push ke GitHub Repository, alangkah baiknya kalian melakukan check terlebih dahulu apakah terdapat file atau folder yang seharusnya tidak ikut di upload seperti `node_modules`.

Karena pada dasarnya isian dari folder tersebut adalah dependency package dari aplikasi yang kita bangun dan isian tersebut bisa di install kembali di host atau komputer lain menggunakan perintah `npm install` oleh karena itu kita bisa melakukan `gitignore` agar folder tersebut tidak ikut di upload

> **Catatan**: Jika kalian liat dari konfigurasi Dockerfile terdapat perintah seperti berikut ini
>
> ```Dockerfile
> RUN npm install
> ```
>
> Itu artinya container yang akan menjalankan aplikasi kita akan menginstall semua dependency dari aplikasi kita.

Untuk melakukan `gitignore` caranya cukup mudah, kalian cukup buat sebuah file baru dengan nama `.gitignore` di root folder nya kemudian isikan list-list file atau folder nya seperti berikut ini

```gitignore
node_modules
```

#### Push Local Repository ke Remote Repository

Sebelum melakukan push, kita jalankan add dan commit terlebih dahulu perubahan yang sudah kita terapkan pertama kali ini, untuk melakukannya jalankan perintah berikut ini

```bash
git add .
```

```bash
git commit -m "init: setup"
```

Setelah semuanya sudah siap, sekarang kita bisa lakukan push ke remote repository dengan perintah berikut ini:

```bash
git push -u origin main
```

![Git Push](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/git-push.png)

Maka sekarang repository nya sudah tersimpan di GitHub

![GitHub Repo](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-repo.png)

### Setup Google Cloud Resources

Setelah aplikasi berjalan dan tersimpan di github, sekarang kita move on terlebih dahulu, kita akan pindah ke konfigurasi di sisi cloud nya.

#### Membuat Google Cloud Project

Ketika kita ber-urusan dengan Google Cloud, maka hukumnya wajib untuk kita mempunyai sebuah project, untuk membuat project nya kalian bisa jalankan perintah berikut ini melalui `Cloud CLI` atau `Google Cloud Shell` di web interface nya

> **Catatan**: Ubah dan sesuaikan `project-id` dan `display-name` dengan konfigurasi yang kalian inginkan
>
> `project-id` bersifat unique, jika terkena error kemungkinan `project-id` nya sudah ada yang menggunakannya oleh karena itu direkomendasikan gunakan kombinasi huruf dan angka.

```bash
gcloud projects create [PROJECT-ID] --name [DISPLAY-NAME]
```

Setelah project dibuat, sekarang set project tersebut sebagai current project menggunakan perintah berikut ini

```bash
gcloud config set project [PROJECT-ID]
```

![Gcloud Create Project](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/gcloud-create-project.png)

#### Enable Service Cloud Run dan Artifact Registry

Dikarenakan kita akan menggunakan service `Cloud Run` dan `Artifact Registry` maka kita perlu mengizinkan akses ke service tersebut di project kita, untuk melakukannya jalankan perintah berikut ini

> **Catatan**: Pastikan billing account nya sudah di link ke project nya agar bisa menjalankan service nya

```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

![Gcloud Enable Services](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/gcloud-enable-services.png)

#### Membuat Repositories Artifact Registry

Aplikasi kita akan berjalan di environment container, oleh karena itu kita perlu membuat penampungan hasil dari build docker image atau container nya. Kita bisa gunakan service Artifact Registry ini sebagai repository nya, untuk membuat nya caranya cukup mudah kalian bisa jalankan perintah berikut ini

> **Catatan**: Kalian bisa sesuaikan nama repository `[REPO-NAME]` yang akan kalian gunakan dan `[LOCATION]` dari server nya
>
> ```bash
> gcloud artifacts repositories create [REPO-NAME] --repository-format=docker --location=[LOCATION]
> ```
>
> Disini saya akan gunakan nama repository nya adalah `image-registry` dan lokasi nya di `asia-southeast2` (Jakarta)

```bash
gcloud artifacts repositories create image-registry --repository-format=docker --location=asia-southeast2
```

![Gcloud Artifacts](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/gcloud-artifacts.png)

#### Membuat Service Account Untuk Authentication GitHub Actions

Pada tahap proses CI/CD berjalan GitHub Actions memerlukan authentication agar bisa menyimpan docker image dan mendeploy di Google Cloud Platform, oleh karena itu kita perlu membuat sebuah Service Account khusus untuk GitHub Actions tersebut. Caranya cukup mudah kalian bisa ikuti langkah berikut ini:

- Mendapatkan Google Cloud Project ID

```bash
export PROJECT_ID=$(gcloud config get-value project)
```

- Membuat Service Account

```bash
gcloud iam service-accounts create github-actions --description="This service account is for authenticate GitHub Actions DevOps CI/CD Pipeline" --display-name="GitHub Actions"
```

- Menambahkan IAM Policy Binding ke Service Account agar bisa mengakses service

> **Catatan**: Disini kita akan memberikan 3 hak akses ke Service Account `github-actions` agar bisa menggunakan Cloud Run dan Artifact Registry. Berikut adalah list hak akses nya:
>
> - `Artifact Registry Administrator`
> - `Cloud Run Admin`
> - `Service Account User`
>
> Pastikan kalian mengerti apa yang dilakukan disini, karena hal sensitif seperti policy di cloud ini cukup berbahaya dan direkomendasikan oleh Google nya langsung agar memberikan least privilege access

```bash
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com --role=roles/artifactregistry.admin

gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com --role=roles/run.admin

gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com --role=roles/iam.serviceAccountUser
```

#### Membuat JSON Key dari Service Account

Setelah Service Account dibuat dan diberikan hak akses ke service, sekarang kita akan buat sebuah JSON Key untuk authentication GitHub Actions nya, untuk membuat nya cukup mudah kalian bisa jalankan perintah berikut ini:

```bash
gcloud iam service-accounts keys create github-actions-service-account.json --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
```

Maka sekarang seharusnya sudah ter-generate JSON Key nya, untuk melihatnya kalian bisa gunakan perintah berikut ini

> **Catatan**: Pastikan isian dari JSON Key ini aman, karena dengan key inilah GitHub Actions bisa berinteraksi ke Google Cloud Resource nya
>
> Lakukan copy isian dari JSON Key ini karena akan kita paste pada GitHub Actions Secrets

```bash
cat github-actions-service-account.json
```

![Gcloud Create Key Service Account](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/gcloud-create-key-service-account.png)

### Setup GitHub Actions

Setelah Google Cloud Resources nya sudah siap, sekarang kita bisa mulai ke tahap terakhir yaitu menyiapkan konfigurasi GitHub Actions nya

#### Setup Actions Secrets

Jika kalian masih ingat, bahwa JSON Key yang sebelumnya dibuat akan digunakan sebagai authentication antara GitHub Actions ke Google Cloud Platform nya. Oleh karena itu, maka harus secure atau aman bukan? Nah, agar key nya aman kita bisa simpan di `Repository secrets` ini.

Untuk melakukannya caranya cukup mudah, kalian bisa ikuti cara berikut ini

1. Pergi ke repository GitHub
2. Masuk ke tab `Settings`
3. Scroll ke bawah, kemudian pada pilih section `Security` > `Secrets and Variables` > `Actions`
4. Selanjutnya click tombol `New repository secret`

![GitHub Repository Secret](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-repository-secret.png)

Selanjutnya isikan nama secret nya dengan `GCLOUD_SERVICE_ACCOUNT_KEY` dan pada bagian secret nya kalian paste isian dari file `github-actions-service-account.json` sebelumnya. Sehingga hasilnya akan tampak seperti ini

![GitHub New Secret](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-new-secret.png)

Kemudian click `Add secret`

Maka sekarang terdapat secret baru dengan nama `GCLOUD_SERVICE_ACCOUNT_KEY`

![GitHub Repository Secret Added](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-repository-secret-added.png)

#### Setup GitHub Actions Workflow

Untuk membuat sebuah job pada GitHub Actions kita perlu membuat konfigurasi workflow yang disimpan di file `.github/workflows/<WORKFLOW-NAME>.yml` pada repository kita.

Nah, untuk mendefinisikan dan men-setup agar workflow nya bisa terhubung ke Google Cloud Platform bagaimana? akan kah sangat sulit? Jawabannya tidak, karena Google sendiri menyiapkan template dan script nya agar mempermudah pekerjaan kita.

Untuk melihat nya kalian bisa pergi ke tab `Actions` kemudian pada kolom pencarian masukan keyword `Cloud Run`, maka akan muncul workflow yang dibuat oleh `Google Cloud` seperti gambar dibawah ini

![GitHub Actions Workflow](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-actions-workflow.png)

Selanjutnya kita bisa pilih `Build and Deploy to Cloud Run` > `Configure`

Maka sekarang seharusnya akan diarahkan ke template workflow nya seperti gambar dibawah ini

![GitHub Actions Template Workflow](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-actions-template-workflow.png)

Isian dari template workflow nya adalah seperti berikut ini

> **Catatan**: Pastikan kalian membaca dokumentasi dari masing-masing action nya dan mengerti apa isian dari konfigurasi berikut ini, dan pastikan gunakan versi `google-github-actions` terbaru dan sesuaikan dengan versinya agar bisa berjalan dengan lancar. Versi yang saya maksud disini adalah
>
> - `google-github-actions/auth@v0`
> - `google-github-actions/deploy-cloudrun@v0`

```yml
# This workflow build and push a Docker container to Google Artifact Registry and deploy it on Cloud Run when a commit is pushed to the "main" branch
#
# Overview:
#
# 1. Authenticate to Google Cloud
# 2. Authenticate Docker to Artifact Registry
# 3. Build a docker container
# 4. Publish it to Google Artifact Registry
# 5. Deploy it to Cloud Run
#
# To configure this workflow:
#
# 1. Ensure the required Google Cloud APIs are enabled:
#
#    Cloud Run            run.googleapis.com
#    Artifact Registry    artifactregistry.googleapis.com
#
# 2. Create and configure Workload Identity Federation for GitHub (https://github.com/google-github-actions/auth#setting-up-workload-identity-federation)
#
# 3. Ensure the required IAM permissions are granted
#
#    Cloud Run
#      roles/run.admin
#      roles/iam.serviceAccountUser     (to act as the Cloud Run runtime service account)
#
#    Artifact Registry
#      roles/artifactregistry.admin     (project or repository level)
#
#    NOTE: You should always follow the principle of least privilege when assigning IAM roles
#
# 4. Create GitHub secrets for WIF_PROVIDER and WIF_SERVICE_ACCOUNT
#
# 5. Change the values for the GAR_LOCATION, SERVICE and REGION environment variables (below).
#
# NOTE: To use Google Container Registry instead, replace ${{ env.GAR_LOCATION }}-docker.pkg.dev with gcr.io
#
# For more support on how to run this workflow, please visit https://github.com/marketplace/actions/deploy-to-cloud-run
#
# Further reading:
#   Cloud Run IAM permissions                 - https://cloud.google.com/run/docs/deploying
#   Artifact Registry IAM permissions         - https://cloud.google.com/artifact-registry/docs/access-control#roles
#   Container Registry vs Artifact Registry   - https://cloud.google.com/blog/products/application-development/understanding-artifact-registry-vs-container-registry
#   Principle of least privilege              - https://cloud.google.com/blog/products/identity-security/dont-get-pwned-practicing-the-principle-of-least-privilege

name: Build and Deploy to Cloud Run

on:
  push:
    branches: ["main"]

env:
  PROJECT_ID: YOUR_PROJECT_ID # TODO: update Google Cloud project id
  GAR_LOCATION: YOUR_GAR_LOCATION # TODO: update Artifact Registry location
  SERVICE: YOUR_SERVICE_NAME # TODO: update Cloud Run service name
  REGION: YOUR_SERVICE_REGION # TODO: update Cloud Run service region

jobs:
  deploy:
    # Add 'id-token' with the intended permissions for workload identity federation
    permissions:
      contents: "read"
      id-token: "write"

    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Google Auth
        id: auth
        uses: "google-github-actions/auth@v0"
        with:
          token_format: "access_token"
          workload_identity_provider: "${{ secrets.WIF_PROVIDER }}" # e.g. - projects/123456789/locations/global/workloadIdentityPools/my-pool/providers/my-provider
          service_account: "${{ secrets.WIF_SERVICE_ACCOUNT }}" # e.g. - my-service-account@my-project.iam.gserviceaccount.com

      # NOTE: Alternative option - authentication via credentials json
      # - name: Google Auth
      #   id: auth
      #   uses: 'google-github-actions/auth@v0'
      #   with:
      #     credentials_json: '${{ secrets.GCP_CREDENTIALS }}''

      # BEGIN - Docker auth and build (NOTE: If you already have a container image, these Docker steps can be omitted)

      # Authenticate Docker to Google Cloud Artifact Registry
      - name: Docker Auth
        id: docker-auth
        uses: "docker/login-action@v1"
        with:
          username: "oauth2accesstoken"
          password: "${{ steps.auth.outputs.access_token }}"
          registry: "${{ env.GAR_LOCATION }}-docker.pkg.dev"

      - name: Build and Push Container
        run: |-
          docker build -t "${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.SERVICE }}:${{ github.sha }}" ./
          docker push "${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.SERVICE }}:${{ github.sha }}"

      # END - Docker auth and build

      - name: Deploy to Cloud Run
        id: deploy
        uses: google-github-actions/deploy-cloudrun@v0
        with:
          service: ${{ env.SERVICE }}
          region: ${{ env.REGION }}
          # NOTE: If using a pre-built image, update the image name here
          image: ${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.SERVICE }}:${{ github.sha }}

      # If required, use the Cloud Run url output in later steps
      - name: Show Output
        run: echo ${{ steps.deploy.outputs.url }}
```

Agar lebih mudah dibaca saya menggunakan konfigurasi seperti ini

> **Catatan**: Perhatikan `environments` dan `secrets` variable yang digunakan
>
> - `${{ env.PROJECT_ID }}`
> - `${{ env.GAR_LOCATION }}`
> - `${{ env.GAR_REPOSITORY_NAME }}`
> - `${{ env.SERVICE }}`
> - `${{ env.REGION }}`
> - `${{ secrets.GCLOUD_SERVICE_ACCOUNT_KEY }}`
>
> Sesuaikan dengan konfigurasi yang gunakan dan inginkan

```yml
name: Build and Deploy to Cloud Run

on:
  push:
    branches: ["main"]

env:
  PROJECT_ID: latihan-devops # TODO: update Google Cloud project id
  GAR_LOCATION: asia-southeast2 # TODO: update Artifact Registry location
  GAR_REPOSITORY_NAME: image-registry # TODO: update Artifact Registry Repository name
  SERVICE: example-cloud-run-github-actions # TODO: update Cloud Run service name
  REGION: asia-southeast2 # TODO: update Cloud Run service region

jobs:
  deploy:
    permissions:
      contents: "read"
      id-token: "write"

    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Google Auth
        id: auth
        uses: "google-github-actions/auth@v2"
        with:
          credentials_json: "${{ secrets.GCLOUD_SERVICE_ACCOUNT_KEY }}"

      - name: Configure Docker to use gcloud
        run: |-
          gcloud auth configure-docker ${{ env.GAR_LOCATION }}-docker.pkg.dev --quiet

      - name: Build and Push Container
        run: |-
          docker build -t "${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.GAR_REPOSITORY_NAME }}/${{ env.SERVICE }}:${{ github.sha }}" ./
          docker push "${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.GAR_REPOSITORY_NAME }}/${{ env.SERVICE }}:${{ github.sha }}"

      - name: Deploy to Cloud Run
        id: deploy
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: ${{ env.SERVICE }}
          region: ${{ env.REGION }}
          image: ${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.GAR_REPOSITORY_NAME }}/${{ env.SERVICE }}:${{ github.sha }}

      - name: Show Output
        run: echo ${{ steps.deploy.outputs.url }}
```

Jika merasa sudah yakin konfigurasi workflow nya, click `Commit changes` untuk menyimpan perubahan dan menambahkan file workflow nya kedalam repository kita.

![GitHub Commit Changes](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-commit-changes.png)

Pada pop-up detail nya, kita pilih `Commit directly to the main branch`

> **Catatan**: Pada saat click `Commit changes` maka GitHub Actions nya akan langsung jalan karena trigger main branch nya sudah langsung bekerja pada saat kita menambahkan file workflow nya

![GitHub Commit Changes Detail](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-commit-changes-detail.png)

#### Melihat GitHub Actions Berjalan

Untuk melihat workflow nya berhasil atau tidak, kalian bisa pergi ke tab `Actions` kemudian pilih workflow `Build and Deploy to Cloud Run` > `Create google-cloudrun-docker.yml` > `deploy`

![GitHub Actions](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-actions.gif)

Jika berhasil maka akan muncul icon checklist seperti gambar dibawah ini

![GitHub Actions Success](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-actions-success.png)

### Mengecek Deployment

Jika semua proses sebelumnya berjalan lancar, maka seharusnya deployment aplikasi Express.js kita sudah berhasil dilakukan secara otomatis oleh GitHub Actions ke Google Cloud Platform.

Bahkan sekarang jika kita mencoba melakukan perubahan kode di main branch dan melakukan push ke repository, maka akan GitHub Actions akan langsung men-trigger dan melakukan build docker image kemudian mendeploy dan menerapkan perubahan tersebut nya ke Cloud Run.

Sebelum kita coba testing melakukan perubahan, kita akan lihat dulu apakah docker image nya berhasil disimpan ke Artifact Registry dan apakah aplikasi Express.js kita sudah berhasil di hosting di Cloud Run

#### Mengecek Docker Image di Artifact Registry

Disini saya akan menggunakan Google Cloud Console untuk melakukan pengecekan nya agar lebih enak, untuk melihat nya kalian bisa pergi ke resource `Artifact Registry`

![Artifact Registry Repository](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/artifact-registry-repository.png)

Bisa kalian lihat gambar diatas, terdapat repository dengan nama `image-registry` yang lokasi nya di `asia-southeast2` (Jakarta)

Jika kalian click repository atau folder tersebut, maka akan muncul sebuah service dengan nama `example-cloud-run-github-actions`

![Artifact Registry Service](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/artifact-registry-service.png)

Jika kalian mencoba click pada bagian service nya, maka akan muncul sebuah docker image dengan nama tag dari `SHA` commit github

![Artifact Registry Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/artifact-registry-image.png)

Sehingga nantinya jika kalian melakukan perubahan pada main branch dan GitHub Actions melakukan build dan deploy docker image baru maka akan seperti ini hasilnya pada Artifact Registry

```
image-registry
└── example-cloud-run-github-actions
   ├── 205de6978615602f82c8f1155ceb9eb99b54bfd2 # Old Build
   ├── f1155ceb9eb99b54bfd2205de6978615602f82c8 # New Build
   └── ... # Next Build
```

#### Mengecek Deployment Cloud Run

Setelah melakukan pengecekan Docker Image di Artifact Registry, sekarang kita lakukan pengecekan di deployment Cloud Run, untuk melihat nya kalian bisa pergi ke resource `Cloud Run`

![Cloud Run Service](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/cloud-run-service.png)

Bisa kalian lihat gambar diatas, terdapat service dengan nama `example-cloud-run-github-actions` yang lokasi deployment nya di `asia-southeast2` (Jakarta).

Namun, perlu di ingat bahwa default deployment nya adalah `Required authentication` sehingga hanya user tertentu yang bisa melihat deployment nya, oleh karena itu kita coba ubah agar menjadi `Allow unauthenticated invocations`.

#### Mengubah Authentication Deployment Cloud Run

Untuk mengubah nya caranya cukup mudah, kalian click pada `Nama Service` > `Security` > `Authentication` > `Allow unauthenticated invocations` > `Save`

![Cloud Run Security](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/cloud-run-security.png)

#### Melihat Deployment Cloud Run Melalui URL

Setelah mengubah security nya menjadi `Allow unauthenticated invocations` sekarang kita bisa mengecek deployment nya melalui alamat URL dari bawaan Cloud Run nya

> **Catatan**: Seperti yang sudah dibahas jauh diatas, bahwa Cloud Run secara default mempunyai nama domain pada deployment nya

![Cloud Run URL](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/cloud-run-url.png)

Kalian bisa buka alamat URL tersebut, maka akan muncul response yang sama persis ketika menjalankannya di local. Keren bukan?

![Cloud Run Deployment](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/cloud-run-deployment.png)

## Test Automation Deployment CI/CD Pipeline

Untuk mengetest apakah automation deployment CI/CD nya bekerja atau tidak, kita bisa coba melakukan perubahan kecil misal mengganti message dari response nya. Sebelum itu kita lakukan `fetch` & `pull` terlebih dahulu di repository local agar sejajar dengan yang di github

### Fetch dan Pull Perubahan Remote ke Local

```bash
git fetch && git pull
```

![Git Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/git-update.png)

### Melakukan Sedikit Perubahan Pada Aplikasi

Sekarang kita coba ubah file `index.js` nya seperti berikut ini

```js
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Hello World from Cloud Run GitHub Actions!",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
```

### Update Perubahan ke Main Branch

Selanjutnya kita lakukan `add` dan `commit` perubahan tersebut

```bash
git add .
```

```bash
git commit -m "feat(endpoint): update message"
```

Setelah semuanya sudah siap, sekarang kita bisa lakukan push ke remote repository dengan perintah berikut ini:

> **Catatan**: Pada saat melakukan push, maka trigger GitHub Actions nya akan langsung active dan melakukan build docker image dengan base kode yang terbaru dan melakukan deployment ke Cloud Run menggunakan image tersebut

```bash
git push
```

![GitHub Actions Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-actions-update.gif)

Maka sekarang seharusnya terdapat 2 workflow yang sudah berhasil dijalankan

![GitHub Actions Workflow Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/github-actions-workflow-update.png)

### Artifact Registry Image Update

Jika kita coba lihat docker image pada Artifact Registry juga akan muncul image dengan tag baru seperti gambar dibawah ini

![Artifact Registry Image Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/artifact-registry-image-update.png)

### Cloud Run Deployment Update

Jika kita coba melakukan refresh pada URL deployment Cloud Run, maka response dari aplikasi nya akan terupdate seperti gambar dibawah ini

![Cloud Run Deployment Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/cloud-run-deployment-update.png)

## Penutup

Akhirnya selesai juga perjalan yang sangat panjang ini 🚀 (cape ngetik karena memakan waktu 4 jam lebih dan belum termasuk pembuatan thumbnail blog nya 😭). Tapi puas karena sudah berhasil mengimplementasikan DevOps CI/CD Pipeline menggunakan GitHub Actions sehingga untuk urusan deployment sudah tidak perlu lagi dipusingkan. Keren bukan? 😁

> **Catatan**: Sedikit tambahan, jika kalian ingin melakukan improve deployment seperti pemisahan environment `dev`, `staging`, dan `production`. Kalian bisa melakukan hal-hal berikut ini:
>
> - Passing argument `env` sesuai dengan environment nya ketika melakukan build docker image di workflow GitHub Actions
> - Pemisahan Workflow file sesuai dengan branch nya (misalkan terdapat branch `dev`, `staging`, dan `production`) maka setiap workflow nya akan active ke-trigger ketika terdapat perubahan di masing-masing branch nya.
> - Pemisahan Service (Artifact Registry dan Cloud Run Deployment) sesuai dengan `env` nya
>
> Beikut contoh arsitektur diagram atau topologi dengan pemisahan `env` > ![Containerized App Env](${NEXT_PUBLIC_PUBLIC_ASSETS}/cloud-run-github-actions/containerized-app-env.gif)
>
> Jangan lupa simpan credentials yang sensitive (seperti database `user`, `password`, `db_name` dsb) di `secrets` agar tetap aman 👍

Semoga kalian yang mengikuti artikel ini mendapatkan hal yang bermanfaat, sampai jumpa di artikel selanjutnya 🔥
