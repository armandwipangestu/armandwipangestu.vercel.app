---
published: true
title: "GitHub Actions - Membangun CI Pipeline Aplikasi React.js"
tag: "DevOps"
date: "December 10 2025"
excerpt: "CI Pipeline ini nantinya akan menjalankan beberapa jobs workflow seperti PR Build Check, Automatic tag & release dengan semantic versioning, dan melakukan Build dan Push Container Image ke GitHub Container Registry (GHCR)"
cover_image: "/images/posts/GitHub Actions - Membangun CI Pipeline Aplikasi React.js.png"
author_name: "Arman Dwi Pangestu"
author_title: "Cloud & Software Engineer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

![Concepts](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/concepts.png)

Pada blog kali ini, kita akan coba membangun CI Pipeline menggunakan GitHub Actions untuk aplikasi yang dibuat menggunakan teknologi React.js, dimana tujuan akhirnya adalah menjalankan automation mulai dari:

1. Build & Test Pull Request Check
2. Automatic tagging & release menggunakan semantic versioning berdasarkan rule conventional commit
3. Melakukan Build & Push Container Image ke GitHub Container Registry (GHCR)
4. Integrasi GitHub Repository dengan Discord menggunakan WebHook

Namun sebelum mencoba membuat kita akan bahas dulu pengertian-pengertian dari masing-masing yang akan kita bangun:

### Apa itu CI/CD Pipeline?

![CI/CD](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/cicd.png)

CI/CD Pipeline singkata dari `Continuous Integration` (CI) dan `Continuous Delivery/Deployment` (CD) adalah sebuah proses automation yang melancarkan pengembangan software dari perubahan kode ke deployment. Proses ini mengotomatiskan langkah-langkah build, test, dan deployment, memungkinkan developer untuk melakukan release perubahan kode secara lebih sering, andal, dan aman. Pipeline ini berjalan secara otomatis setiap kali kode diperbarui di central repository, dan terus berlanjut melalui berbagai tahap hingga kode tersebut aktif di lingkungan production. Proses akan berhenti dan memberi tahu tim jika ada tahap yang gagal ataupun berhasil.

### Apa itu Semantic Versioning, Conventional Commit, dan Git Flow (SDLC)?

> **Catatan**: Untuk referensi bacaan terkait pembahasan Semantic Versioning, Conventional Commit, dan Git Flow (SDLC), saya sudah sempat posting di [LinkedIn](https://www.linkedin.com/posts/arman-dwi-pangestu_semantic-versioning-activity-7378059606385872896-irY7?utm_source=share&utm_medium=member_desktop&rcm=ACoAADeJB-cB9GRephoFBeP7OutbHGvUqKsO13k) dan melakukan implementasi di [GitLab Repository](https://gitlab.com/armandwipangestu/learn-semantic-versioning).

#### Semantic Versioning

Semantic versioning atau disingkat SemVer adalah standar penomoran versi software yang didefinisikan pada semver.org. Tujuannya adalah untuk menghindari dependency hell dan memastikan kompabilitas antar-versi dapat dipahami secara konsisten oleh developer maupun pengguna.

Semantic Versioning ditulisa menggunakan format seperti ini:

```md
MAJOR.MINOR.PATCH
```

Terdapat 3 komponen utama pada semantic versioning

![Semver Component](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/semver-component.png)

- MAJOR

Adalah komponen paling awal, dimana angka ini akan naik ketika terdapat perubahan yang tidak backward compatible atau biasa disebut dengan breaking change. Contohnya kenaikan versi dari `v1.5.7` ke `v2.0.0`.

- MINOR

Adalah komponen yang berada di pertengahan, dimana angka ini akan naik ketika terdapat penambahan fitur baru yang masih backward compatible. Contohnya kenaikan versi dari `v1.5.7` ke `v1.6.0`.

- PATCH

Adalah komponen paling akhir, dimana angka ini akan naik ketika terdapat perbaikan bug atau perubahan kecil yang masih backward compatible seperti `fix`, `hotfix`, dan sebagainya. Contohnya adalah kenaikan versi dari `v1.5.7` ke `v1.5.8`.

#### Conventional Commit

Selain standarisasi penomoran version, semantic versioning juga erat kaitannya dengan standarisasi commit. Karena berdasarkan commit message inilah yang akan mendeteksi level mana yang harus di bump atau dinaikkan versi nya, apakah itu `MAJOR`, `MINOR`, atau `PATCH`.

Biasanya commit convention ini mengacu pada pengembangan di repository yang terkenal seperti `angular`, dimana terdapat beberapa jenis aturan commit message seperti:

- `BREAKING CHANGE`

Aturan commit message ini akan menaikan atau bump version untuk level `MAJOR`, dimana biasanya letak dari commit message ini berada di bagian footer atau di paling bawah commit message. Contoh commit message nya adalah seperti

> **Catatan**: Format penulisan atau aturan dari `BREAKING CHANGE` ini sifatnya agnostic, sehingga bisa menempel di commit message apa saja, asalkan terdapat keyword `BREAKING CHANGE` dan biasanya terletak di footer commit.

```bash
# Format penulisan
feat(<feature_name>): <commit_message>

BREAKING CHANGE: <breaking_change_message>
```

```bash
# Contoh penggunaan: 1
feat(api-version): change endpoint to api version v2

BREAKING CHANGE: THIS FEATURE NOT BACKWARD COMPATIBILITY
```

```bash
# Contoh penggunaan: 2
hotfix(api-response): fix wrong response format on user detail endpoint

BREAKING CHANGE: response structure has been changed, `fullName` field is removed
and replaced with `firstName` and `lastName`. This change breaks existing clients.
```

- `feat()`

Aturan commit message ini akan menaikkan atau bump version untuk level `MINOR`, dimana biasanya terdapat kata awalan `feat()`. Contoh commit message nya adalah seperti

```bash
# Format penulisan
feat(<feature_name>): <commit_message>
```

```bash
# Contoh penggunaan
feat(hooks): add map update (mutation) hook
```

- `fix()` atau `hotfix()`

Aturan commit message ini akan menaikkan atau bump version untuk level `PATCH`, dimana biasanya terdapat kata awalan `fix()` atau `hotfix()`. Contoh commit message nya adalah seperti

```bash
# Format penulisan: 1
fix(<bug_name>): <commit_message>

# Format penulisan: 2
hotfix(<bug_name>): <commit_message>
```

```bash
# Contoh penggunaan: 1
fix(login-validation): resolve incorrect email format validation on login form

# Contoh penggunaan: 2
hotfix(api-timeout): fix API timeout error on fetch user profile endpoint
```

#### Git Flow (SDLC)

![Git Flow Concepts](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/git-flow-concepts.png)

Semantic Versioning sering digunakan bersamaan dengan Git Flow, sebuah model branching pada Git yang membantu menjaga konsistensi versi software sesuai dengan tahapan dalam software development life cycle (SDLC).

Dalam Git Flow, terdapat beberapa penamaan branch yang umum digunakan dan biasanya mencerminkan environment pengembangannya, diantaranya adalah sebagai berikut:

- `dev` atau `development`

Digunakan oleh developer atau QA sebelum tahap User Acceptance Testing (UAT). Pada tahap ini, release version umumnya diberi label `beta`, misalnya `v1.5.7-beta.N` (dimana `N` adalah jumlah iterasi merge request dari feature atau bug fix yang di merge ke branch ini).

- `staging`

Digunakan ketika feature atau bug fix yang sudah loloss di tahap development dianggap stabil, dan siap untuk menjalani User Acceptance Testing (UAT). Pada tahap ini, release version biasanya diberi label `rc` atau singkatan dari `Release Candidate`, misalnya `v1.5.7-rc.N` (dimana `N` adalah jumlah iterasi merge request dari branch `dev` atau `development` yang di merge ke branch ini).

- `main`

Digunakan ketika feature atau bug fix sudah lolos tahap UAT, dijamin stabilitas nya, dan akan di release ke production atau digunakan oleh user. Pada tahap ini, release version tidak memiliki label tambahan apapun sebagai tanda bahwa versi tabil nya, misalnya `v1.5.7`.

### Apa itu GitHub Container Registry (GHCR)?

GitHub Container Registry atau disingkat GHCR adalah sebuah tempat penyimpanan untuk container image, dimana jika kalian terbiasa menggunakan docker dan sering menggunakan image dari [Docker Hub](https://hub.docker.com), nah hal tersebut sebetulnya sama, namun bedanya kita simpan di package repository github. Sehingga nanti container image nya mempunyai penamaan dalam format seperti ini

```bash
ghcr.io/<username>/<repository>:<tag>
```

### Apa itu Environments, Secrets, dan Variables?

#### Environments

Environments di GitHub Repository adalah sebuah nama tempat yang me-representasikan sebuah deployments. Environments ini biasanya digunakan untuk pemisahan value untuk secrets dan variables yang digunakan.

Sebagai contoh, apabila deployment memiliki 2 environment seperti `staging` dan `main` (production). Kedua deployment tersebut pastinya menggunakan nama key secrets dan variables yang sama, namun yang membedakannya adalah value dari secrets dan variables tersebut.

Sebagai contoh berikut adalah secrets dan variables antara `staging` dan `main`:

- Staging

```bash
# Secrets (Server Side)
DATABASE_CONNECTION_URL=postgresql://foo:bar@db-stag.svc.cluster.internal:5432/db_stag

# Variables (Client Side)
NEXT_PUBLIC_BASE_URL=https://nextjs-stag.svc.cluster.internal:3000
```

- Main

```bash
# Secrets (Server Side)
DATABASE_CONNECTION_URL=postgresql://fizz:buzz@db-prod.svc.cluster.internal:5432/db_prod

# Variables (Client Side)
NEXT_PUBLIC_BASE_URL=https://nextjs-prod.svc.cluster.internal:3000
```

#### Secrets

Secrets di GitHub repository adalah sebuah key value variable yang digunakan untuk menyimpan informasi data sensitive, contohnya adalah seperti informasi seputar `token`, `credentials database`, `service account`, `jwt secret`, `iam`, dan sebagainya. Secrets ini nantinya akan di sensor apabila value nya muncul di log pada saat ci/cd pipeline di github actions berjalan. Misalkan terdapat secrets dengan key dan value seperti ini

```bash
JWT_ACCESS_TOKEN_SECRET='05f39d815bbe8e198c0c55f0323a4ed5'
JWT_REFRESH_TOKEN_SECRET='d723ebbbe45cafcb3936fd56a0bf86da'
```

Nah maka pada saat suatu jobs di workflow github actions menggunakan secrets tersebut, maka yang akan muncul di log adalah

```bash
JWT_ACCESS_TOKEN_SECRET='****'
JWT_REFRESH_TOKEN_SECRET='****'
```

> **Catatan**: Secrets ini biasa digunakan untuk menyimpan variables-variables yang sifat nya Server Side atau Runtime.

Value dari secrets ini tidak bisa kita lihat kembali apabila sudah berhasil dibuat, jadi pastikan untuk menyimpan value nya dengan baik dan benar.

#### Variables

Berbeda dengan secrets, variables adalah sebuah key value variable yang digunakan untuk menyimpan informasi data yang tidak sensitive, contohnya adalah seperti informasi seputar `base url` suatu aplikasi, `mode` environment deployment aplikasi, dan sebagainya. Value dari variables ini nantinya tidak akan di sensor apabila value nya muncul di log pada saat ci/cd pipeline di github actions berjalan. Contoh dari penggunaan key value variables ini adalah seperti berikut ini

```bash
NEXT_PUBLIC_APP_NAME=My Super App
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

> **Catatan**: Variables ini biasa digunakan untuk menyimpan variables-variables yang sifat nya Client Side atau Build time.

Value dari variables ini bisa kita lihat kembali apabila sudah berhasil dibuat.

## Persiapan

Setelah mengetahui penjelasan dari masing-masing pengertian dari pendahuluan di atas, sekarang kita bisa langsung coba membangun CI Pipeline nya. Untuk langkah pertama kita bisa siapkan dulu beberapa kebutuhannya di bawah ini:

### Membuat GitHub Repository

Langkah pertama kita perlu membuat github repository nya terlebih dahulu, untuk membuat nya kalian bisa pergi ke `GitHub` > kemudian click icon `+` > dan pilih `New repository`, setelah itu isikan nama repository nya `react-ci-pipeline` dan biarkan semua nya default (tidak ada `README default`, `.gitignore`, `license`, dan sebagainya).

> **Catatan**: Alternative lebih cepat kalian bisa menggunakan `gh` (GitHub CLI) dengan menjalankan command seperti berikut ini
>
> ```bash
> gh repo create react-ci-pipeline --public
> ```
>
> ![GH Create Repository](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/gh-create-repository.png)

![GitHub Create Repository](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-create-repository.png)

### Membuat Project React Vite TypeScript

Setelah github repository berhasil dibuat, langkah selanjutnya adalah membuat project react vite typescript nya menggunakan perintah berikut ini

```bash
npm create vite@7.1.1 react-ci-pipeline -- --template react-ts
```

![NPM Create Vite React](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/npm-create-vite-react.png)

#### Install Dependency Package

Selanjutnya lakukan instalasi dependency package dan coba jalankan aplikasi nya menggunakan perintah berikut ini

```bash
cd react-ci-pipeline
npm install
npm run dev
```

![NPM Install](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/npm-install.png)

Setelah aplikasi berhasil dijalankan, kita bisa coba akses di web browser dengan alamat url `http://localhost:5173`, maka akan muncul tampilan nya seperti berikut ini

![Vite Default Page](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/vite-default-page.png)

#### Push ke GitHub Repository

Setelah project berhasil react vite typescript nya berhasil dijalankan, langkah selanjutnya adalah kita lakukan push ke GitHub Repository yang sebelumnya sudah dibuat, untuk melakukannya kalian bisa jalankan perintah berikut ini

> **Catatan**: Jika kalian menggunakan authentication SSH Key, kalian bisa ubah nama format nama remote origin nya seperti berikut ini
>
> ```bash
> git remote add origin git@github.com:<username>/react-ci-pipeline.git
> ```

```bash
# Initialize Git
git init

# Add Remote Origin
git remote add https://github.com/<username>/react-ci-pipeline.git

# Add & Commit Changes
git add .
git commit -m "feat(setup): init"

# ubah jika default branch bukan main
git branch -M main

# Push ke Remote Origin
git push -u origin main
```

Apabila proses push berhasil dilakukan, maka sekarang tampilan github repository nya akan terlihat seperti gambar berikut ini

![Git Push](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/git-push.png)

#### Membuat Branch staging

Selanjutnya kita perlu membuat branch `staging`, dimana branch ini akan dijadikan sebagai versi `rc` atau `Release Candidate` nantinya dan branch ini juga yang akan digunakan sebagai base code nantinya (dimana setiap feature, hotfix, dan sebagainya akan diambil dari branch `staging`), sedangkan branch `main` dijadikan sebagai versi stable. Untuk membuat nya jalankan perintah berikut ini

```bash
# checkout branch staging berdasarkan branch main
git checkout -b staging

# push ke remote origin
git push -u origin staging
```

![Git Push Staging](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/git-push-staging.png)

### Generate Personal Access Token (PAT) GitHub

Langkah selanjutnya kita perlu melakukan generate Personal Access Token atau disingkat PAT, token ini nantinya akan digunakan untuk melakukan authentication ke GitHub Container Registry pada proses CI Pipeline. Untuk generate nya kalian bisa pergi ke menu `Settings` > `Developer Settings` > `Personal access tokens` > `Tokens (classic)` > `Generate new token` > `Generate new token (classic)`

![GitHub Developer Settings](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-developer-settings.png)

![Generate PATE](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/generate-pat.png)

Kemudian isikan konfigurasi berikut ini

> **Catatan**: Sesuaikan `Note`, dan `Expiration` yang ingin digunakan

```bash
Note: GITHUB_ACTIONS
Expiration: No expiration
Scopes: [repo, write:packages, delete:packages]
```

![GitHub New PAT](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-new-pat.png)

Setelah itu click button `Generate token` dan simpan token nya baik-baik karena akan kita gunakan pada saat menambahkan secrets, karena tidak bisa dilihat kembali value nya.

![GitHub Token PAT](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-token-pat.png)

### Membuat Environments dan Secrets Repository

Apabila proses Generate Personal Access Token berhasil dilakukan, langkah selanjutnya kita bisa bbuat environment dan secret untuk repository nya. Untuk melakukannya kalian bisa pergi ke repository `react-ci-pipeline` yang sebelumnya dibuat > `Settings` > `Environments` > `New environment`

![GitHub Create Env](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-create-env.png)

Selanjutnya buat 2 nama environments yaitu `staging` dan `main`, sehingga hasil nya akan menjadi seperti berikut ini

> **Catatan**: Penamaan environments `staging` dan `main` adalah representasi dari nama branch yang digunakan. Kalian bebas menggunakan nama apapun, namun agar mempermudah memahami deployments berdasarkan nama, kita bisa gunakan nama branch yang digunakan saja.

![GitHub Created Env](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-created-env.png)

#### Menambahkan Secrets

Selanjutnya kita bisa tambahkan 2 secrets yaitu `GH_USERNAME` dan `GH_TOKEN`. Kedua secrets tersebut akan kita gunakan untuk authentication ke ghcr pada saat ci pipeline nya berjalan.

Untuk menambahkannya, kalian bisa click nama environments nya, misalkan untuk yang `main` terlebih dahulu. Setelah itu click button `Add environment secret`

![GitHub Add Env Secret](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-add-env-secret.png)

Selanjutnya tambahkan 2 secret berikut ini

> **Catatan**: ganti value `GH_USERNAME` dengan username github account yang digunakan dan `GH_TOKEN` dengan hasil generate Personal Access Token yang dibuat sebelumnya.

```bash
Name: GH_USERNAME
Value: <your_github_username>

Name: GH_TOKEN
Value: <your_personal_access_token>
```

Maka sekarang akan tampil 2 secrets seperti gambar di bawah ini

![GitHub Added Secrets](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-added-secrets.png)

Lakukan hal yang sama untuk environment `staging`. Maka sekarang akan muncul informasi bahwa 2 environment tersebut mempunyai 2 secrets seperti ini

![GitHub Env Info](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-env-info.png)

### Membuat Discord Server, Channel, dan Integrasi WebHook

Setelah persiapan pembuatan environments dan secrets berhasil dilakukan, langkah selanjutnya adalah menyiapkan discord server, channel, dan integrasi github repository menggunakan webhook.

#### Membuat Discord Server

Untuk membuat discord server kalian bisa click icon `+ Add a Server` > `Create My Own` > `For me and my friends` dan isikan namanya.

![Discord Create Server](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-create-server.png)

#### Membuat Channel

Setelah discord server berhasil dibuat, selanjutnya buat channel baru dengan konfigurasi seperti berikut ini

```bash
Channel Type: Text
Channel Name: cicd-pipeline
```

![Discord Create Channel](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-create-channel.png)

#### Integrasi Channel WebHook

Selanjutnya click `icon Gear Edit Channel` > `Integrations` > `Create Webhook`

![Discord Create Webhook](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-create-webhook.png)

Kemudian beri nama `github-actions`

![Discord Webhook](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-webhook.png)

Dan click button `Copy Webhook URL`. Selanjutnya pergi ke repository `react-ci-pipeline` > `Settings` > `Webhooks` > `Add webhook`

![GitHub Add Webhook](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-add-webhook.png)

Kemudian isikan konfigurasi berikut ini

> **Catatan**: Sesuaikan `Payload URL` dengan `Webhook URL` yang sebelumnya di copy dan tambahkan diakhiran url nya `/github`.

```bash
Payload URL: <your_discord_webhook_url>/github
Content type: application/json
Secret: empty
SSL verification: Enable SSL verification
Which events would you like to trigger this webhook?: Send me everything.
Active: true
```

![GitHub Webhook Configuration](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-webhook-configuration.png)

Dan click button `Add webhook`

## Implementasi

Setelah semua persiapan di atas berhasil dilakukan, sekarang saatnya kita mengimplementasikan CI Pipeline untuk aplikasi React.js Vite TypeScript yang sudah kita push ke GitHub Repository sebelumnya.

### Membuat Dockerfile dan Konfigurasi Nginx

Langkah pertama untuk mengimplementasikannya adalah kita perlu membuat Dockerfile, dimana file tersebut akan berisi perintah-perintah yang dijalankan pada saat proses build container image nya.

Untuk membuatnya kita perlu checkout dulu ke branch baru dengan nama `feat/ci` dari branch `staging`. Untuk melakukannya jalankan perintah berikut ini

```bash
git checkout -b feat/ci
```

Setelah itu buat file baru dengan nama `Dockerfile` dan `nginx.conf` di root folder project nya dan isikan konfigurasi seperti ini

```Dockerfile
# ---- 1. Build Stage ----
FROM node:25.2-alpine AS builder

# Set wokring directory
WORKDIR /app

# Copy package.json & lock file (if exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build Vite project
RUN npm run build

# ---- 2. Production Stage ----
FROM nginx:1.29.3-alpine

# Delete default nginx static page
RUN rm -rf /usr/share/nginx/html/*

# Copy SPA fallback nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy from build previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

```c
server {
    listen 80;
    root /usr/share/nginx/html;

    # Serve static files directly
    location / {
        try_files $uri /index.html;
    }

    # Optional: caching static assets (recommended)
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)& {
        try_files $uri =404;
        expires 7d;
        access_log off;
    }
}
```

![Create Dockerfile](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/create-dockerfile.png)

> **Catatan**: Untuk melakukan test build container dan apakah berjalan dengan baik atau tidak, kita bisa coba di local dengan jalankan perintah berikut ini
>
> ```bash
> docker build -f Dockerfile -t react-ci-pipeline:test .
> docker run --rm -p 5174:80 react-ci-pipeline:test
> ```
>
> Kemudian akses di url `http://localhost:5174`

Apabila pembuatan file `Dockerfile` dan `nginx.conf` selesai dilakukan, langkah selanjutnya kita add file dan commit

```bash
git add .
git commit -m "feat(ci): add Dockerfile & nginx configuration"
```

### Membuat Konfigurasi Semantic Versioning

Selanjutnya adalah kita perlu membuat konfigurasi terkait semantic versioning, dimana konfigurasi ini akan berisi nama branch yang digunakan, suffix name release, tag format, commit convention (aturan commit), changelog, dan sebagainya.

Untuk membuatnya kalian buat file baru dengan nama `.releaserc.yml` di root folder project nya, kemudian isikan konfigurasi berikut ini

> **Catatan**: Ganti `<your_username>` dengan username github account yang digunakan

```yml
branches:
  - name: main
  - name: staging
    prerelease: rc

tagFormat: v${version}

plugins:
  - - "@semantic-release/commit-analyzer"
    - preset: conventionalcommits
      releaseRules:
        # MAJOR changes
        - breaking: true
          release: major

        # MINOR changes
        - type: feat
          release: minor

        # PATCH changes
        - type: fix
          release: patch
        - type: hotfix
          release: patch
        - type: perf
          release: patch
        - type: refactor
          release: patch

        # NO release
        - type: docs
          release: false
        - type: style
          release: false
        - type: test
          release: false
        - type: ci
          release: false
      parserOpts:
        noteKeywords:
          - BREAKING CHANGE

  - "@semantic-release/release-notes-generator"

  - - "@semantic-release/changelog"
    - changelogFile: CHANGELOG.md

  - - "@semantic-release/git"
    - assets:
        - CHANGELOG.md
        - package.json
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"

  - - "@semantic-release/github"
    - successComment: |
        🎉 This PR is included in version **${nextRelease.version}** 🎉

        🔗 **View Release:** [${nextRelease.gitTag}](https://github.com/<your_username>/react-ci-pipeline/releases/tag/${nextRelease.gitTag})

        🤖 *"Kill all humans"* - Your [semantic-release](https://github.com/semantic-release/semantic-release) bot 🚀
      failComment: |
        ❌ **Release Failed**

        Semantic-release failed to create release for this commit.

        **Error:** ${error.message}

        Please check the log CI for more information and fix the problem.
      labels:
        - released

  - - "@semantic-release/exec"
    - successCmd: 'echo "${nextRelease.version}" > version.txt'
```

![Releaserc YML](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/releaserc-yml.png)

#### Penjelasan Konfigurasi Semantic Versioning

Berikut adalah penjelasan dari masing-masing konfigurasi di atas

```yml
branches:
  - name: main
  - name: staging
    prerelease: rc
```

Adalah konfigurasi terkait branch yang digunakan, dimana list branch tersebut yang akan men-trigger plugin `@semantic-release/commit-analyzer`, dan untuk branch `staging` akan di tandai sebagai `prerelease` dimana terdapat nama akhiran atau suffix `rc` sebagai tanda bahwa versi di branch tersebut adalah `Release Candidate`.

```yml
tagFormat: v${version}
```

Adalah konfigurasi terkait formatting nama untuk tag yang digunakan, sebagai contoh hasil di tag nya adalah seperti ini `v1.3.9`.

```yml
- - "@semantic-release/commit-analyzer"
  - preset: conventionalcommits
    releaseRules:
      # MAJOR changes
      - breaking: true
        release: major

      # MINOR changes
      - type: feat
        release: minor

      # PATCH changes
      - type: fix
        release: patch
      - type: hotfix
        release: patch
      - type: perf
        release: patch
      - type: refactor
        release: patch

      # NO release
      - type: docs
        release: false
      - type: style
        release: false
      - type: test
        release: false
      - type: ci
        release: false
    parserOpts:
      noteKeywords:
        - BREAKING CHANGE
```

Adalah konfigurasi terkait aturan commit yang sudah dibahas sebelumnya di [Conventional Commit](#conventional-commit), dimana terdapat 4 aturan secara garis besar, yaitu:

1. `BREAKING CHANGE` -> bump / naikkan major version
2. `feat` -> bump / naikkan minor version
3. `fix`, `hotfix`, dan sebagainya -> bump / naikkan patch version
4. `docs`, `style`, dan sebagainya -> skip no release trigger (tidak melakukan bump / naikkan version apapun)

```yml
- - "@semantic-release/changelog"
  - changelogFile: CHANGELOG.md

- - "@semantic-release/git"
  - assets:
      - CHANGELOG.md
      - package.json
    message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
```

Adalah konfigurasi terkait penulisan catatan commit ke release note dan file CHANGELOG.md, dengan custom commit message.

```yml
- - "@semantic-release/github"
  - successComment: |
      🎉 This PR is included in version **${nextRelease.version}** 🎉

      🔗 **View Release:** [${nextRelease.gitTag}](https://github.com/<your_username>/react-ci-pipeline/releases/tag/${nextRelease.gitTag})

      🤖 *"Kill all humans"* - Your [semantic-release](https://github.com/semantic-release/semantic-release) bot 🚀
    failComment: |
      ❌ **Release Failed**

      Semantic-release failed to create release for this commit.

      **Error:** ${error.message}

      Please check the log CI for more information and fix the problem.
    labels:
      - released
```

Adalah konfigurasi terkait penulisan comment dan labeling pada saat pipeline berhasil atau gagal dijalankan, nantinya terdapat auto comment dan labeling di pull request yang kita buat.

```yml
- - "@semantic-release/exec"
  - successCmd: 'echo "${nextRelease.version}" > version.txt'
```

Adalah konfigurasi terkait stdout hasil dari bump version dari semantic version ke file `version.txt` yang dimana nanti file tersebut akan digunakan sebagai artifacts untuk kebutuhan re-tag container image.

Apabila pembuatan file `.releaserc.yml` selesai dilakukan, langkah selanjutnya kita add file dan commit

```bash
git add .
git commit -m "feat(ci): add semantic versioning configuration"
```

### Membuat Konfigurasi Workflow Build dan Test PR Check

Selanjutnya kita masuk ke tahap membuat konfigurasi workflow yang akan dijalankan oleh github actions. Workflow yang akan kita buat pertama adalah terkait Build dan Test PR Check, dimana jobs-jobs di dalamnya akan ke trigger apabila ada Pull Request ke branch `staging` dan branch `main`.

Untuk membuatnya kalian bisa buat file baru dengan nama `pr-build.yml` di root folder `.github/workflows` project nya, kemudian isikan konfigurasi berikut ini

```yml
name: PR Build & Test

on:
  pull_request:
    branches:
      - staging
      - main
    types:
      - opened
      - synchronize
      - reopened

jobs:
  build-and-test:
    name: Build and Test
    runs-on: ubuntu-latest
    environment: ${{ github.base_ref }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "25"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      # - name: Run tests
      #   run: npm test

      - name: Build app (for validation)
        run: npm run build

      - name: Install semantic-release globally
        run: |
          npm install -g \
            semantic-release \
            @semantic-release/changelog \
            @semantic-release/git \
            @semantic-release/exec \
            @semantic-release/github \
            conventional-changelog-conventionalcommits

      - name: Test semantic-release (dry-run)
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN  }}
          DEBUG: "semantic-release:*"
        run: npx semantic-release --dry-run --branches=${{ github.head_ref }}
```

![PR Build](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/pr-build.png)

#### Penjelasan Konfigurasi Workflow Build dan Test PR Check

Berikut adalah penjelasan dari masing-masing konfigurasi di atas

```yml
name: PR Build & Test

on:
  pull_request:
    branches:
      - staging
      - main
    types:
      - opened
      - synchronize
      - reopened
```

Adalah nama workflow yang digunakan dan rule atau aturan dari trigger pipeline nya. Dimana rule trigger nya berdasarkan apabila ada open pull request ke branch `staging` ataupun `main`.

```yml
jobs:
  build-and-test:
    name: Build and Test
    runs-on: ubuntu-latest
    environment: ${{ github.base_ref }}
```

Adalah konfigurasi terkait jobs dengan nama `build-and-test`, dimana environment nya menggunakan nama berdasarkan branch `staging` atau `main`, sehingga nantinya jobs ini bisa menggunakan value-value secrets dan variables dari environment yang digunakan.

```yml
steps:
  - name: Checkout repository
    uses: actions/checkout@v4

  - name: Use Node.js
    uses: actions/setup-node@v4
    with:
      node-version: "25"
      cache: "npm"

  - name: Install dependencies
    run: npm ci

  - name: Run lint
    run: npm run lint

  # - name: Run tests
  #   run: npm test

  - name: Build app (for validation)
    run: npm run build

  - name: Install semantic-release globally
    run: |
      npm install -g \
        semantic-release \
        @semantic-release/changelog \
        @semantic-release/git \
        @semantic-release/exec \
        @semantic-release/github \
        conventional-changelog-conventionalcommits

  - name: Test semantic-release (dry-run)
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN  }}
      DEBUG: "semantic-release:*"
    run: npx semantic-release --dry-run --branches=${{ github.head_ref }}
```

Adalah konfigurasi terkait penggunaan nodejs versi 25, melakukan instalasi depedency library, melakukan proses pengecekan lint menggunakan `eslint`, mencoba melakukan build application untuk pengecekan tidak ada error, dan terakhir menjalankan semantic-release dengan mode dry-run atau simulasi.

> **Catatan**: Optional, apabila aplikasi kalian nantinya ada unit testing kalian bisa un-comment steps untuk menjalankan unit testing nya. Selain dari step-step di atas itu apabila terdapat step tambahan kalian bisa tambahkan juga, jadi sesuaikan dengan workflow pipeline yang dibutuhkan.

### Membuat Konfigurasi Workflow Release

Setelah berhasil membuat konfigurasi workflow untuk Build dan Test PR Check, langkah selanjutnya adalah membuat konfigurasi untuk Release. Dimana workflow Release ini akan ke trigger apabila Pull Request ke branch `staging` dan branch `main` itu di Merge / di-izinkan.

Untuk membuatnya kalian bisa buat file baru dengan nama `release.yml` di dalam folder `.github/workflows`, kemudian isikan konfigurasi seperti berikut ini

```yml
name: Release & Deploy

on:
  push:
    branches:
      - staging
      - main

env:
  IMAGE_NAME: ghcr.io/armandwipangestu/react-ci-pipeline

jobs:
  # ------------------------------------------------------
  # JOB 1 - BUILD DOCKER IMAGE USING COMMIT SHA (HASH)
  # ------------------------------------------------------
  build-docker-sha:
    name: Build Docker Image Using Commit SHA
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    environment: ${{ github.ref_name }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Extract commit SHA
        id: sha
        run: echo "SHORT_SHA=$(git rev-parse --short HEAD)" >> $GITHUB_ENV

      - name: Log in to GitHub Container Registry
        run: echo "${{ secrets.GH_TOKEN }}" | docker login ghcr.io -u "${{ secrets.GH_USERNAME }}" --password-stdin

      - name: Build Docker Image with SHA tag
        run: |
          docker build \
            -f Dockerfile \
            -t $IMAGE_NAME:${{ env.SHORT_SHA }} .

      - name: Push Docker Image (SHA tag)
        run: docker push $IMAGE_NAME:${{ env.SHORT_SHA }}

      - name: Save SHA to file
        run: echo "${SHORT_SHA}" > sha.txt

      - name: Upload SHA artifact
        uses: actions/upload-artifact@v4
        with:
          name: built-sha
          path: sha.txt

  # ------------------------------------------------------
  # JOB 2 - SEMANTIC RELEASE
  # ------------------------------------------------------
  release-and-tagging-version:
    name: Release and Tagging Version
    runs-on: ubuntu-latest
    needs: build-docker-sha
    permissions:
      contents: write
      issues: write
      pull-requests: write
    environment: ${{ github.ref_name }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js for Semantic Release
        uses: actions/setup-node@v4
        with:
          node-version: "25"

      - name: Install semantic-release globally
        run: |
          npm install -g \
            semantic-release \
            @semantic-release/changelog \
            @semantic-release/git \
            @semantic-release/exec \
            @semantic-release/github \
            conventional-changelog-conventionalcommits

      - name: Run semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release

      - name: Upload version.txt artifact
        uses: actions/upload-artifact@v4
        with:
          name: release-version
          path: version.txt

  # ------------------------------------------------------
  # JOB 3 - RETAG IMAGE: SHA -> VERSION -> LATEST
  # ------------------------------------------------------
  retag-and-push:
    name: Retag and Push Docker Image
    runs-on: ubuntu-latest
    needs:
      - build-docker-sha
      - release-and-tagging-version
    permissions:
      contents: write
      issues: write
      pull-requests: write
    environment: ${{ github.ref_name }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Download version.txt artifact
        uses: actions/download-artifact@v4
        with:
          name: release-version

      - name: Set VERSION env
        run: echo "VERSION=$(cat version.txt)" >> $GITHUB_ENV

      - name: Download sha.txt artifact
        uses: actions/download-artifact@v4
        with:
          name: built-sha

      - name: Set SHORT_SHA env
        run: echo "SHORT_SHA=$(cat sha.txt)" >> $GITHUB_ENV

      - name: Log in to GitHub Container Registry
        run: echo "${{ secrets.GH_TOKEN }}" | docker login ghcr.io -u "${{ secrets.GH_USERNAME }}" --password-stdin

      - name: Pull SHA image
        run: docker pull $IMAGE_NAME:${{ env.SHORT_SHA }}

      - name: Retag SHA -> Version
        run: docker tag $IMAGE_NAME:${{ env.SHORT_SHA }} $IMAGE_NAME:${{ env.VERSION }}

      - name: Push Version Tag
        run: docker push $IMAGE_NAME:${{ env.VERSION }}

      - name: Retag latest (only on main)
        if: github.ref_name == 'main'
        run: |
          docker tag $IMAGE_NAME:${{ env.VERSION }} $IMAGE_NAME:latest
          docker push $IMAGE_NAME:latest
```

![Release](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/release.png)

#### Penjelasan Konfigurasi Workflow Release

Berikut adalah penjelasan dari masing-masing konfigurasi di atas

```yml
name: Release & Deploy

on:
  push:
    branches:
      - staging
      - main

env:
  IMAGE_NAME: ghcr.io/armandwipangestu/react-ci-pipeline
```

Adalah nama workflow yang digunakan dan rule atau aturan dari trigger pipeline nya. Dimana rule trigger nya berdasarkan apabila ada event/hook push ke branch `staging` ataupun `main`, kemudian ada definisi environment variable dengan key `IMAGE_NAME` dimana value nya adalah format nama ghcr yang akan digunakan oleh container image.

```yml
jobs:
  # ------------------------------------------------------
  # JOB 1 - BUILD DOCKER IMAGE USING COMMIT SHA (HASH)
  # ------------------------------------------------------
  build-docker-sha:
    name: Build Docker Image Using Commit SHA
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    environment: ${{ github.ref_name }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Extract commit SHA
        id: sha
        run: echo "SHORT_SHA=$(git rev-parse --short HEAD)" >> $GITHUB_ENV

      - name: Log in to GitHub Container Registry
        run: echo "${{ secrets.GH_TOKEN }}" | docker login ghcr.io -u "${{ secrets.GH_USERNAME }}" --password-stdin

      - name: Build Docker Image with SHA tag
        run: |
          docker build \
            -f Dockerfile \
            -t $IMAGE_NAME:${{ env.SHORT_SHA }} .

      - name: Push Docker Image (SHA tag)
        run: docker push $IMAGE_NAME:${{ env.SHORT_SHA }}

      - name: Save SHA to file
        run: echo "${SHORT_SHA}" > sha.txt

      - name: Upload SHA artifact
        uses: actions/upload-artifact@v4
        with:
          name: built-sha
          path: sha.txt
```

Jobs di atas adalah konfigurasi terkait jobs dengan nama `build-docker-sha`, environment nya menggunakan nama berdasarkan branch `staging` atau `main`, sehingga nantinya jobs ini bisa menggunakan value-value secrets dan variables dari environment yang digunakan.

Kemudian steps-steps nya adalah:

1. Mendapatkan 5 digit random string commit SHA
2. Authentication docker ke ghcr
3. Build docker image dengan tag berdasarkan 5 unique commit SHA
4. Kemudian melakukan push container image ke ghcr dan terakhir stdout 5 digit random string ke file `sha.txt` dan di upload menjadi artifact yang nanti akan digunakan oleh job re-tag.

```yml
# ------------------------------------------------------
# JOB 2 - SEMANTIC RELEASE
# ------------------------------------------------------
release-and-tagging-version:
  name: Release and Tagging Version
  runs-on: ubuntu-latest
  needs: build-docker-sha
  permissions:
    contents: write
    issues: write
    pull-requests: write
  environment: ${{ github.ref_name }}

  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup Node.js for Semantic Release
      uses: actions/setup-node@v4
      with:
        node-version: "25"

    - name: Install semantic-release globally
      run: |
        npm install -g \
          semantic-release \
          @semantic-release/changelog \
          @semantic-release/git \
          @semantic-release/exec \
          @semantic-release/github \
          conventional-changelog-conventionalcommits

    - name: Run semantic-release
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: npx semantic-release

    - name: Upload version.txt artifact
      uses: actions/upload-artifact@v4
      with:
        name: release-version
        path: version.txt
```

Jobs di atas adalah konfigurasi terkait jobs dengan nama `release-and-tagging-version`, environment nya menggunakan nama berdasarkan branch `staging` atau `main`, sehingga nantinya jobs ini bisa menggunakan value-value secrets dan variables dari environment yang digunakan.

Kemudian steps-steps nya adalah:

1. Melakukan setup nodejs versi 25
2. Melakukan instalasi library-library semantic-release
3. Menjalankan semantic release yang menggunakan konfigurasi dari file `.releaserc.yml`, dan terakhir hasil dari stdout bump version ke file `version.txt.` di upload ke artifact yang nanti akan digunakan oleh jobs ret-tag.

```yml
# ------------------------------------------------------
# JOB 3 - RETAG IMAGE: SHA -> VERSION -> LATEST
# ------------------------------------------------------
retag-and-push:
  name: Retag and Push Docker Image
  runs-on: ubuntu-latest
  needs:
    - build-docker-sha
    - release-and-tagging-version
  permissions:
    contents: write
    issues: write
    pull-requests: write
  environment: ${{ github.ref_name }}

  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Download version.txt artifact
      uses: actions/download-artifact@v4
      with:
        name: release-version

    - name: Set VERSION env
      run: echo "VERSION=$(cat version.txt)" >> $GITHUB_ENV

    - name: Download sha.txt artifact
      uses: actions/download-artifact@v4
      with:
        name: built-sha

    - name: Set SHORT_SHA env
      run: echo "SHORT_SHA=$(cat sha.txt)" >> $GITHUB_ENV

    - name: Log in to GitHub Container Registry
      run: echo "${{ secrets.GH_TOKEN }}" | docker login ghcr.io -u "${{ secrets.GH_USERNAME }}" --password-stdin

    - name: Pull SHA image
      run: docker pull $IMAGE_NAME:${{ env.SHORT_SHA }}

    - name: Retag SHA -> Version
      run: docker tag $IMAGE_NAME:${{ env.SHORT_SHA }} $IMAGE_NAME:${{ env.VERSION }}

    - name: Push Version Tag
      run: docker push $IMAGE_NAME:${{ env.VERSION }}

    - name: Retag latest (only on main)
      if: github.ref_name == 'main'
      run: |
        docker tag $IMAGE_NAME:${{ env.VERSION }} $IMAGE_NAME:latest
        docker push $IMAGE_NAME:latest
```

Jobs di atas adalah konfigurasi terkait jobs dengan nama `retag-and-push`, environment nya menggunakan nama berdasarkan branch `staging` atau `main`, sehingga nantinya jobs ini bisa menggunakan value-value secrets dan variables dari environment yang digunakan.

Kemudian steps-steps nya adalah:

1. Melakukan download artifacts `version.txt` dan `sha.txt`
2. Setelah itu melakukan authentication docker login ke ghcr
3. Melakukan pull container image dari ghcr berdasarkan tag 5 digit random string SHA dari artifact `sha.txt`
4. Terakhir melakukan re-tag container image dengan semantic versioning dari artifact `version.txt` dan melakukan push ke ghcr berdasarkan tag semantic versioning.

> **Catatan**: Apabila pipeline `release.yml` di atas berjalan di branch `main`, maka ada step terakhir tambahan yaitu melakukan tag `latest` dari container image nya.

Apabila pembuatan file workflow `pr-build.yml` dan `release.yml` selesai dilakukan, langkah selanjutnya kita add file, commit, dan push ke remote origin untuk branch feat/ci

```bash
git add .
git commit -m "feat(ci): add pr-build & release pipeline configuration"
git push -u origin feat/ci
```

![Git Push Feat CI](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/git-push-feat-ci.png)

> **Catatan**: Jika proses konfigurasi webhook github repository ke discord benar, maka seharusnya ketika melakukan push branch `feat/ci` ke remote origin, akan mengirim events/actions ke channel discord nya seperti ini.
>
> ![Discord Webhook First Actions](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-webhook-first-actions.png)

### Test Automation CI Pipeline

Untuk mengetest apakah automation CI Pipeline nya bekerja atau tidak, kita bisa coba melakukan Open Pull Request dari source branch `feat/ci` ke destination branch `staging` dan setelah itu coba melakukan Open Pull Request dari branch `staging` ke destination branch `main`.

#### Open Pull Request Branch feat/ci ke staging

Selanjutnya kita akan coba jalankan CI Pipeline nya, untuk mencoba nya kita bisa lakukan Open Pull Request di GitHub Repository dengan pergi ke repository `react-ci-pipeline` > `Pull requests` > `New pull request`

![GitHub Open PR](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-open-pr.png)

Kemudian pilih

```bash
Source / compare branch: feat/ci
Destination / base branch: staging
```

Dan click button `Create pull request`

![GitHub Create PR](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-create-pr.png)

Untuk title kalian bisa isikan `feat(ci): add ci pipeline configuration` dan click button `Create pull request`

![GitHub Create PR 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-create-pr-2.png)

Dikarekan kita melakukan pull request ke branch `staging`, dan terdapat konfigurasi `pr-build.yml`, maka seharusnya sekarang terdapat pengecekan pipeline sebelum bisa melakukan merge request, sehingga kita bisa memastikan bahwa kode yang di pull request aman dari bug dan bisa di build atau tidak.

![GitHub PR Build Check](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-pr-build-check.png)

Tunggu proses pengecekan pipeline tersebut, apabila status nya sudah `All checks have passed` kita bisa click button `Merge pull request` > `Confirm merge`.

![GitHub All Checks Have Passed](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-all-checks-have-passed.png)

Setelah merge request di izinkan, maka sekarang seharusnya workflow `release.yml` akan ke trigger, untuk melihat nya kalian bisa pergi ke menu `Actions` > `pilih workflow run yang berjalan`

![GitHub All Checks Have Passed](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-actions-workflow-runs.png)

Maka akan terlihat 3 jobs yang sudah di definisikan dari file `release.yml` sebelumnya seperti ini

![GitHub Actions Summary](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-actions-summary.png)

Untuk mengecek logs dari setiap jobs tersebut, kalian bisa click untuk setiap jobs nya, maka akan terlihat seperti ini

![GitHub Actions Jobs Logs](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-actions-jobs-logs.png)

Dikarenakan semua proses pipeline berhasil dijalankan, maka seharusnya sekarang terdapat beberapa update seperti ini

1. Pull requests auto comment & label

![GitHub Auto Comment Label](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-auto-comment-label.png)

2. Tag, Release, dan Changelog

![GitHub Tag Release](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-tag-release.png)

![GitHub Changelog](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-changelog.png)

3. Discord webhook message

![Discord New Message](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-new-message.png)

4. GitHub Container Registry (GHCR)

> **Catatan**: Untuk GitHub Container Registry (GHCR) kita perlu connect an packages nya ke repository `react-ci-pipeline`. Untuk melakukannya pergi ke `https://github.com/<username>?tab=packages`
>
> ![GitHub Packages](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-packages.png)
>
> Click button `Connect Repository`
>
> ![GitHub Packages Connect Repository](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-packages-connect-repository.png)
>
> Pilih repository `react-ci-pipeline`, selantjunya ubah settingan `visibility` ghcr nya menjadi public dengan cara pergi ke menu `Package settings` > `Change visibility` > `Public`.
>
> ![GitHub GHCR Visibility](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-ghcr-visibility.png)
>
> Maka sekarang tampilan di repository nya terdapat reference `Packages` seperti ini
>
> ![GitHub Packages References](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-packages-references.png)

![GitHub GHCR](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-ghcr.png)

#### Open Pull Request Branch staging ke main

Lakukan hal yang sama dimana Open Pull Request namun source branch nya dari `staging` dan destination nya ke branch `main`, dimana title Open PR nya `feat(ci): add ci pipeline configuration`.

![GitHub Open PR Main](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-openpr-main.png)

Maka seharusnya trigger pipeline `pr-build.yml` dan `release.yml` akan ke trigger kembali, namun nanti hasil tag versioning nya tanpa akhiran `rc` atau `Release Candidate` sebagai tanda versi stable.

1. Pull requests auto comment & label

![GitHub Auto Comment Label 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-auto-comment-label-2.png)

2. Tag, Release, dan Changelog

![GitHub Tag Release 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-tag-release-2.png)

![GitHub Changelog 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-changelog-2.png)

3. Discrod webhook message

![Discord New Message 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/discord-new-message-2.png)

4. GitHub Container Registry (GHCR)

![GitHub GHCR 2](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/github-ghcr-2.png)

### Menjalankan Container ghcr di Local

Setelah container berhasil di build dan di push, kita bisa uji coba jalankan container tersebut di local menggunakan perintah berikut ini

> **Catatan**: Ganti `<username>` dengan github account yang digunakan. Apabila ghcr yang digunakan adalah private, kita perlu melakukan authentication terlebih dahulu menggunakan perintah berikut ini:
>
> ```bash
> docker login ghcr.io -u "<username>"
> ```
>
> Setelah itu isikan password menggunakan Personal Access Token (PAT) yang sebelumnya di generate.

```bash
docker run --rm -p 5175:80 ghcr.io/<username>/react-ci-pipeline:1.0.0
```

Apabila container berhasil dijalankan, kalian bisa buka di url `http://localhost:5175`, maka akan muncul tampilan seperti gambar berikut ini

![Docker Run GHCR](${NEXT_PUBLIC_PUBLIC_ASSETS}/github-actions-membangun-ci-pipeline-apliaksi-reactjs/docker-run-ghcr.png)

## Saran

Terdapat beberapa saran yang bisa di improve untuk pembuatan CI Pipeline dari artikel ini, berikut adalah beberapa saran yang bisa diterapkan:

### Menerapkan CD Pipeline

Karena sudah berhasil melakukan CI Pipeline, langkah selanjutnya kalian bisa terapkan CD Pipeline untuk full automation deployment nya. Sebagai contoh bisa menambahkan job khusus deploy seperti ini

```yml
deploy:
  name: Deploy to Server
  needs: retag-and-push
  runs-on: ubuntu-latest
  permissions:
    actions: read
    contents: read
  environment: ${{ github.ref_name }}
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Download version.txt artifact
      uses: actions/download-artifact@v4
      with:
        name: release-version

    - name: Set VERSION env
      run: echo "VERSION=$(cat version.txt)" >> $GITHUB_ENV

    - name: Setup SSH
      run: |
        mkdir -p ~/.ssh
        echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
        chmod 644 ~/.ssh/known_hosts

    - name: Set Docker image name
      id: vars
      run: echo "DOCKER_IMAGE_NAME=${{ env.IMAGE_NAME }}:$VERSION" >> $GITHUB_OUTPUT

    - name: Deploy to Server via SSH
      run: |
        echo "Deploying version $VERSION to ${{ github.ref_name }} environment..."
        ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << EOF
          set -e
          if [[ "${{ vars.SERVICE_TYPE }}" == "container" ]]; then
              cd ${{ secrets.APPS_DIR }}

              cp docker-compose.template.yml docker-compose.yml
              sed -i "s|__FRONTEND_IMAGE__|${{ steps.vars.outputs.DOCKER_IMAGE_NAME }}|" docker-compose.yml
              sed -i "s|__FRONTEND_CONTAINER_NAME__|${{ vars.SERVICE_NAME }}|g" docker-compose.yml
              sed -i "s|__FRONTEND_CONTAINER_NAME__|${{ vars.SERVICE_NAME }}|" docker-compose.yml
              sed -i "s|__FRONTEND_PORT__|${{ vars.SERVICE_PORT }}:80'|" docker-compose.yml
              sed -i "s|__FRONTEND_ENVIRONMENT_FILE__|.env.${{ github.ref_name }}|" docker-compose.yml

              cp .env.${{ github.ref_name }} .env.tmp

              echo "# App Environment" > .env.${{ github.ref_name }}
              echo "NODE_ENV=$([[ "${{ github.ref_name }}" == "main" ]] && echo "production" || echo "development")" >> .env.${{ github.ref_name }}
              echo "BUILD_VERSION=$VERSION" >> .env.${{ github.ref_name }}
              echo "" >> .env.${{ github.ref_name }}

              echo "Pulling and deploying new image version: ${{ steps.vars.outputs.DOCKER_IMAGE_NAME }}"
              docker compose pull
              docker compose up -d

              PREVIOUS_VERSION=\$(grep BUILD_VERSION .env.tmp | cut -d '=' -f2)
              echo "Removing previous image version: ${{ vars.REGISTRY_SERVER }}/${{ vars.REGISTRY_IMAGE_NAME }}:\$PREVIOUS_VERSION"
              if docker image inspect ${{ vars.REGISTRY_SERVER }}/${{ vars.REGISTRY_IMAGE_NAME }}:\$PREVIOUS_VERSION > /dev/null 2>&1; then
                  docker image rm ${{ vars.REGISTRY_SERVER }}/${{ vars.REGISTRY_IMAGE_NAME }}:\$PREVIOUS_VERSION
              else
                  echo "Previous image version not found locally. Skipping removal."
              fi

              rm .env.tmp
          else
              echo "Service type unknown"
              exit 1
          fi
        EOF
```

### Menerapkan Modern GitOps (ArgoCD atau FluxCD)

Apabila deployment nya menggunakan Kubernetes, kalian bisa menerapkan modern GitOps seperti menggunakan `ArgoCD` atau `FluxCD`, dimana nanti terdapat repository khusus yang menyimpan manifest-manifest kubernetes dan akan otomatis melakukan sync atau pull oleh `ArgoCD` ke repository apabila ada perubahan.

Sebagai contoh jika setelah proses CI pipeline bump / naikkan version dan push ke ghcr, setelah itu buat jobs tambahan untuk mengubah versi container image yang digunakan di repository manifest yang sync ke `ArgoCD`.

### Penggunaan Secrets dan Variables

Pastikan penggunaan secrets dan variables sesuai dengan kebutuhannya, apabila terdapat Server Side (Runtime) environment, maka bisa simpan di secrets. Namun apabila terdapat Client Side (Build time) environment, maka simpan di variables.

Untuk Client Side (Build time) environment, pastikan melakukan passing argument di `Dockerfile` dan flag option di `docker build` nya, sebagai contoh seperti ini

```Dockerfile
# Receive VITE_* environment variable when build
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
```

```yml
- name: Build Docker Image with SHA tag
  run: |
    docker build \
      -f Dockerfile \
      --build-arg VITE_BASE_URL=${{ vars.VITE_BASE_URL || 'http://localhost:3000' }} \
      -t $IMAGE_NAME:${{ env.SHORT_SHA }} .
```

### Gunakan Multi Stage Build

Gunakan multi stage build ketika melakukan build container image, tujuannya adalah untuk memperkecil size dari container image yang di build. Sebetulnya `Dockerfile` di atas udah mengimplementasikannya, sehingga container image nya hanya berisi nginx dan static file Single Page Application (SPA) dari Client Side Rendering (CSR) React, sehingga tidak ada `node_modules` yang ikut tersimpan, dimana size nya hanya `20 MB`.

### Implementasi Secret Rotation

Untuk security kalian bisa terapkan terkait secret rotation, sehingga value dari secret bisa berubah-rubah dalam rentang waktu tertentu, dan biasanya menggunakan tool khusus untuk centralized secret seperti `Vault` dari HashiCorp.

## Penutup

Dengan mengimplementasikan CI Pipeline yang comprehensive seperti yang telah kita bahas, kalian tidak hanya mengotomatiskan proses build dan deployment, tetapi juga menciptakan safety net yang kuat untuk memastikan setiap perubahan kode melalui tahap validasi yang ketat sebelum mencapai production. Kombinasi dari semantic versioning, conventional commit, dan automation GitHub Actions akan membuat tim development kalian lebih produktif dan confident dalam merilis fitur baru. Jangan ragu untuk mengadaptasi konfigurasi ini sesuai dengan kebutuhan spesifik project kalian, dan terus eksplorasi kemungkinan-kemungkinan improvement lainnya seperti CD Pipeline dan GitOps modern untuk menciptakan development workflow yang truly robust dan scalable.
