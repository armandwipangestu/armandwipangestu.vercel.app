---
published: true
title: "Laravel 8 - #3 - Struktur Folder, Routes dan View"
tag: "Programming"
date: "December 21 2023"
excerpt: "Bagaimana struktur folder, routes dan view pada aplikasi Laravel?"
cover_image: "/images/posts/Laravel 8 - Struktur Folder, Routes dan View.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

> **Catatan**:
>
> Kalian jangan khawatir dengan banyak nya folder di aplikasi Laravel, karena jika Anda baru pertama kali belajar, kita hanya akan memodifikasi di beberapa folder dan file saja (tidak perlu dibuka semua folder dan file).

## Struktur Direktori atau Folder

Struktur aplikasi Laravel default dimaksudkan untuk memberikan titik awal yang baik untuk aplikasi besar dan kecil. Namun Anda bebas mengatur aplikasi sesuka Anda. Laravel hampir tidak menerapkan batasan di mana class tertentu berada - selama composer dapat memuat class secara otomatis.

## Root Direktori

### App Direktori

Direktori `app` berisi kode inti aplikasi Anda. Kami akan segera menjelajahi direktori ini secara lebih rinci; namun, hampir semua class dalam aplikasi Anda akan berada di direktori ini.

### Bootstrap Direktori

Direktori `bootstrap` berisi file `app.php` yang mem-bootstrap framework. Direktori ini juga menampung direktori cache yang berisi file yang dihasilkan framework untuk optimalisasi kinerja seperti route dan service cache files. Biasanya Anda tidak perlu mengubah file apapun pada direktori ini.

### Config Direktori

Direktori `config` sesuai dengan namanya, berisi semua file konfigurasi aplikasi Anda. Merupakan ide bagus untuk membaca semua file ini dan membiasakan diri dengan semua opsi yang tersedia untuk Anda.

### Database Direktori

Direktori `database` berisi database migration Anda, model factories (pabrik model) dan seeds. Jika mau, Anda juga dapat menggunakan direktori ini untuk menyimpan database SQLite.

### Public Direktori

Direktori `public` berisi file `index.php` yang merupakan titik masuk untuk semua permintaan yang masuk ke aplikasi Anda dan mengonfigurasi autoloading (pemuatan otomatis). Direktori ini juga menampung aset Anda seperti gambar, javascript dan css.

### Resources Direktori

Direktori `resources` berisi views anda serta asset mentah yang belum di compile seperti CSS atau javascript. Direktori ini juga menampung semua file bahasa Anda.

### Routes Direktori

Direktori `routes` berisi semua definisi route untuk aplikasi Anda. Secara default, beberapa file route disertakan dengan Laravel: `web.php`, `api.php`, `console.php`, dan `channels.php`.

File `web.php` berisi route yang ditempatkan `RouteServiceProvider` di grup middleware web, yang menyediakan keadaan session, perlindungan CSRF, dan enkripsi cookie. Jika aplikasi Anda tidak menawarkan API RESTful dan tanpa keadaan (stateless), kemungkinan besar semua route Anda akan ditentukan di file `web.php`.

File `api.php` berisi route yang ditempatkan `RouteServiceProvider` di grup api middleware. Route-route ini dimaksudkan untuk menjadi tanpa keadaan (stateless), jadi permintaan yang masuk ke aplikasi melalui route-route ini dimaksudkan untuk diautentikasi melalui token dan tidak akan memiliki akses ke keadaan session (session state).

File `console.php` adalah tempat Anda dapat menentukan semua perintah console berbasis penutupan (closure based console commands). Setiap penutupan terikat pada instance perintah yang memungkinkan pendekatan sederhana untuk berinteraksi dengan metode IO setiap perintah. Meskipun file ini tidak menentukan route HTTP, file ini mendefinisikan titik masuk (route) berbasis console ke dalam aplikasi Anda.

File `channels.php` adalah tempat Anda dapat mendaftarkan semua saluran penyiaran acara (broadcasting channels) yang didukung aplikasi Anda.

### Storage Direktori

Direktori `storage` berisi log Anda, tempat template blade yang dikompilasi, session berbasis file (file based sessions), cache file, dan file lain yang dihasilkan oleh framework. Direktori ini dipisahkan menjadi direktori `app`, `framework`, dan `logs`. Direktori `app` dapat digunakan untuk menyimpan file apapun yang dihasilkan oleh aplikasi Anda. Direktori `framework` digunakan untuk menyimpan file dan cache yang dihasilkan framework. Terakhir, direktori `logs` berisi file log aplikasi Anda.

Direktori `storage/app/public` dapat digunakan untuk menyimpan file buatan pengguna, seperti avatar profile, yang harus dapat diakses secara publik. Anda harus membuat tautan simbolik (symbolic link) di `public/storage` yang menunjuk ke direktori ini. Anda dapat membuat tautan menggunakan perintah Artisan `php artisan storage:link`

### Tests Direktori

Direktori `tests` berisi test otomatis Anda. Contoh pengujian PHPUnit dan pengujian fitur disediakan secara langsung. Setiap class test harus diakhiri dengan kata `Test`. Anda dapat menjalankan pengujian menggunakan perintah `phpunit` atau `php verndor/bin/phpunit`. Atau, jika Anda menginginkan representasi hasil pengujian yang lebih detail dan indah, Anda dapat menjalankan pengujian menggunakan perintah Artisan `php artisan test`.

### Vendor Direktori

Direktori `vendor` berisi dependency package composer Anda.

## App Direktori Main

Mayoritas aplikasi Anda ditempatkan di direktori `app`. Secara default, direktori ini dibawah namespaced `App` dan dimuat secara otomatis oleh composer menggunakan standar pemuatan otomatis PSR-4 (PSR-4 autoloading standard).

Direktori `app` berisi berbagai direktori tambahan seperti `Console`, `Http`, dan `Providers`. Bayangkan direktori `Console` dan `Http` menyediakan API ke dalam inti aplikasi Anda. Protokol HTTP dan CLI keduanya merupakan mekanisme untuk berinterkasi dengan aplikasi Anda, namun sebenarnya tidak berisi logika aplikasi. Dengan kata lain, ini adalah dua cara mengeluarkan perintah ke aplikasi Anda. Direktori `Console` berisi semua perintah Artisan Anda, sedangkan direktori `Http` berisi Controllers, middleware, dan requests.

Berbagai direktori lain akan dihasilkan di dalam direktori `app` saat Anda menggunakan perintah Artisan `make` untuk menghasilkan class. Jadi, misalnya, direktori `app/Jobs` tidak akan ada sampai Anda menjalankan perintah Artisan `make:job` untuk menghasilkan Job Class.

> **Catatan**:
>
> Banyak class di direktori `app` dapat dihasilkan oleh perintah Artisan. Untuk meninjau perintah yang tersedia, jalankan perintah `php artisan list make` di terminal Anda.

### Broadcasting Direktori

Direktori `Broadcasting` berisi semua class broadcast channel untuk aplikasi Anda. Class-class ini dihasilkan menggunakan perintah `make:channel`. Direktori ini tidak ada secara default, tetapi akan dibuat untuk Anda saat Anda membuat saluran atau channel pertama. Untuk mempelajari tentang saluran atau channel, lihat dokumentasi di event broadcasting.

### Console Direktori

Direktori `Console` berisi semua perintah Artisan khusus atau custom Artisan untuk aplikasi Anda. Perintah-perintah ini dapat dihasilkan menggunakan perintah `make:command`. Direktori ini juga menampung kernel console Anda, yang merupakan tempat perintah Artisan khusus Anda didaftarkan dan tugas terjadwal Anda ditentukan.

### Events Direktori

Direktori `Events` ini tidak ada secara default, tetapi akan dibuat untuk Anda dengan perintah Artisan `event:generate` dan `make:event`. Direktori `Events` menampung Class Event. Event dapat digunakan untuk mengingatkan bagian lain aplikasi Anda bahwa tindakan tertentu telah terjadi, sehingga memberikan banyak fleksibilitas dan pemisahan.

### Exceptions Direktori

Direktori `Exceptions` berisi pengendali pengecualian aplikasi Anda dan juga merupakan tempat yang baik untuk menempatkan pengecualian apapaun yang diberikan oleh aplikasi Anda. Jika Anda ingin menyesuaikan cara pengecualian dicatat atau dirender, Anda harus memodifikasi Class `Handler` di direktori ini.

### Http Direktori

Direktori `Http` berisi pengontrol, middleware dan permintaan formulir (form request) Anda. Hampur semua logika untuk menangani permintaan yang masuk ke aplikasi Anda akan ditempatkan di direktori ini.

### Jobs Direktori

Direktori `Jobs` ini tidak ada secara default, namun akan dibuat untuk Anda jika Anda menjalankan perintah Artisan `make:job`. Direktori `Jobs` menampung pekerjaan yang dapat diantrekan untuk aplikasi Anda (queueable jobs for your application). Jobs mungkin dimasukkan ke dalam antrean oleh aplikasi Anda atau dijalankan secara sinkron dalam siklus hidup permintaan saat ini. Jobs yang dijalankan secara sinkron selama permintaan saat ini terkadang disebut sebagai "perintah" atau "commands" karena merupakan implementasi dari pola perintah (implementation of the command pattern).

### Listeners Direktori

Direktori `Listeners` ini tidak ada secara default, namun akan dibuat untuk Anda jika Anda menjalankan perintah Artisan `event:generate` atau `make:listener`. Direktori `Listeners` berisi Class-Class yang menangani Event Anda. Pemroses event menerima instance Event dan menjalankan logika setiap respons terhadap Event yang diaktifkan. Misalnya, Event `UserRegistered` mungkin ditangani oleh listener `SendWelcomeEmail`.

### Mail Direktori

Direktori `Mail` ini tidak ada secara default, namun akan dibuat untuk Anda jika Anda menjalankan perintah Artisan `make:mail`. Direktori `Mail` berisi semua Class Anda yang mewakili email yang dikirim oleh aplikasi Anda. Objek email memungkinkan Anda merangkum semua logika pembuatan email dalam satu Class sederhana yang dapat dikirim menggunakan metode `Mail::send`.

### Models Direktori

Direktori `Models` ini berisi semua Class model Eloquent Anda. ORM Eloquent yang disertakan dengan Laravel menyediakan implementasi `ActiveRecord` yang indah dan sederhana untuk bekerja dengan database Anda. Setiap tabel database memiliki "Model" terkait yang digunakan untuk berinteraksi dengan tabel tersebut. Model memungkinkan Anda membuat query data dalam tabel Anda, serta menyisipkan catatan baru ke dalam tabel.

### Notifications Direktori

Direktori `Notifications` ini tidak ada secara default, tetapi akan dibuat untuk Anda jika Anda menjalankan perintah Artisan `make:notification`. Direktori `Notifications` berisi semua notifikasi "transaksional" yang dikirimkan oleh aplikasi Anda, seperti notifikasi sederhana tentang Event yang terjadi dalam aplikasi Anda. Fitur notifikasi Laravel mengabstraksi pengiriman notifkasi melalui berbagai driver seperti email, Slack, SMS, atau disimpan dalam database.

### Policies Direktori

Direktori `Policies` ini tidak ada secara default, namun akan dibuat untuk Anda jika Anda menjalankan perintah Artisan `make:policy`. Direktori `Policies` berisi Class kebijakan otorisasi (authorization policy) untuk aplikasi Anda. Kebijkan atau Policies digunakan untuk menentukan apakah pengguna dapat melakukan tindakan tertentu terhadap sumber daya (resource).

### Providers Direktori

Direktori `Providers` ini berisi semua providers atau penyedia layanan untuk aplikasi Anda. Penyedia layanan (Service providers) mem-bootstrap aplikasi Anda dengan mengikat layanan (binding services) dalam wadah layanan, mendaftarkan event atau peristiwa, atau melakukan tugas lain apapun untuk mempersiapkan aplikasi Anda menghadapi permintaan masuk.

Dalam aplikasi Laravel yang baru, direktori ini sudah berisi beberapa provider atau penyedia. Anda bebas menambahkan provider atau penyedia Anda sendiri ke direktori ini sesuai dengan kebutuhan Anda.

### Rules Direktori

Direktori `Rules` ini tidak ada secara default, tetapi akan dibuat untuk Anda jika Anda menjalankan perintah Artisan `make:rule`. Direktori `Rules` berisi objek aturan validasi khusus untuk aplikasi Anda. Aturan digunakan untuk merangkum logika validasi yang rumit dalam objek sederhana. Untuk informasi lebih lanjut, lihat dokumentasi validasi.

## Lokasi Folder atau File MVC dan Yang Perlu Di ingat pada Aplikasi Laravel

| Nama                   | PATH atau Lokasi          | Penjelasan                                                                                                       |
| ---------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Model                  | `app/Models`              | Semua yang berhubungan dengan Model                                                                              |
| View                   | `resources/views`         | Semua yang berhubungan dengan View                                                                               |
| Controller             | `app/Http/Controllers`    | Semua yang berhubungan dengan Controller                                                                         |
| Routes                 | `app/routes`              | Semua yang berhubungan dengan route                                                                              |
| Assets Statis          | `public`                  | Semua yang berhubungan dengan asset statis (css, javascript, gambar)                                             |
| Assets Sistem Bundling | `resources/{css,js,lang}` | Semua yang berhubungan dengan asset saat menggunakan sistem bundling                                             |
| Environment File       | `.env`                    | Semua yang berhubungan dengan environment aplikasi Laravel, seperti informasi Database, app url atau baseurl dsb |

## Simpel Route Laravel

Ketika kalian berhubungan dengan yang nama route atau rute pada aplikasi kalian, maka kalian perlu mengetahui bagaimana dan dari mana kode tersebut ditangani, pada Laravel ini, route aplikasi kalian di tangani oleh file `app/routes/web.php` jika kasus nya adalah web.

Simpel route yang sudah ada adalah seperti berikut:

```php
Route::get('/', function () {
    return view('welcome');
});
```

> **Catatan**:
>
> Sebetulnya nama file lengkap dari view nya adalah `welcome.blade.php`. `blade` disini adalah sebuah templating engine dari laravel yang dimana kita bisa mengetikan perintah perintah tertentu pada view tersebut. Namun sebetulnya jika kita hapus nama `blade` tersebut tidak akan terjadi apa-apa (akan tetap tampil) namun akan ada fitur-fitur yang tidak jalan.

Perintah tersebut artinya adalah, laravel tolong tampilkan view `welcome` ketika ada request user yang mengarah ke route `/` atau `root`. Laravel akan mencari view yang nama file nya `welcome` terlebih dahulu di folder `resources/views`

## Membuat View dan Menggunakannya di Route Laravel

Untuk membuat sebuah view baru, kalian bisa membuat sebuah file di foler `resources/views` dengan nama file `*.blade.php`, misalkan disini saya membuat view baru untuk Home dengan nama file `home.blade.php`. Kemudian isikan struktur HTML biasa seperti berikut ini:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>WPU Blog | Home</title>
  </head>
  <body>
    <h1>Halaman Home</h1>
  </body>
</html>
```

Setelah view nya dibuat, selanjutnya gunakan view tersebut di routes nya seperti berikut ini di file `app/routes/web.php`:

```php
Route::get('/', function () {
    return view('home');
});
```

Maka akan view nya muncul seperti gambar dibawah ini

> **Catatan**:
>
> Disini saya menggunakan valet, sehingga mempunyai top level domain `*.test`, apabila kalian sama menggunakan valet, maka kalian harus mengubah `APP_URL` atau baseurl laravel kalian di file `.env` agar mengarah ke nama domain tersebut
>
> ```bash
> APP_URL=http://wpu-laravel-8.test
> ```

![View Home](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/struktur-folder-routes-dan-view/view-home.png)

## Menerapkan CSS kedalam View di Laravel

Seperti yang sudah dijelaskan di pengertian atau fungsi folder diatas, kita bisa membuat file statis di folder `public`, sehingga jika ingin membuat file CSS kita bisa membuat misal dengan struktur seperti ini `public/assets/css/style.css` dengan isian file mengubah warna background body menjadi salmon

```css
body {
  background-color: salmon;
}
```

Setelah CSS dibuat, selanjutnya adalah melakukan load CSS pada bagian view nya, misalkan disini saya akan menerapkan CSS tersebut di view `home.blade.php`

> **Catatan**:
>
> href atau URL pada bagian link yang meload CSS ini sudah relative terhadap folder `public` nya, sehingga tidak perlu menuliskan `public` nya.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="assets/css/style.css" />
    <title>WPU Blog | Home</title>
  </head>
  <body>
    <h1>Halaman Home</h1>
  </body>
</html>
```

Maka sekarang background dari view `home` nya akan berwana merah salmon seperti berikut ini

![View Home Salmon](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/struktur-folder-routes-dan-view/view-home-salmon.png)

## Menerapkan Javascript kedalam View di Laravel

Sama halnya seperti CSS, kita juga bisa menerapkan javascript pada aplikasi laravel kita, misalkan disini saya membuat file js di folder `public/assets/js/script.js` dengan isian

```js
alert("Hello WPU!");
```

Nah, setelah file javascript dibuat selanjutnya kita load pada view kita dibagian sebelum tag penutup element `body`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="assets/css/style.css" />
    <title>WPU Blog | Home</title>
  </head>
  <body>
    <h1>Halaman Home</h1>

    <script src="assets/js/script.js"></script>
  </body>
</html>
```

Maka sekarang ketika view `home` nya di load pertama kali, akan muncul sebuah alert dengan tulisan `Hello WPU!` seperti digambar berikut ini

![View Home Alert](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/struktur-folder-routes-dan-view/view-home-alert.png)

## Menerapkan Gambar kedalam View di Laravel

Sama halnya seperti CSS dan Javascript diatas, kita juga bisa menerapkan gambar di aplikasi laravel kita, misalkan disini saya mempunyai gambar di folder `public/assets/img` dengan nama file nya `arman.jpg`

Maka, sekarang kita bisa load gambar tersebut pada bagian view dengan tag `img` seperti berikut ini di file `home.blade.php`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="assets/css/style.css" />
    <title>WPU Blog | Home</title>
  </head>
  <body>
    <h1>Halaman Home</h1>
    <h3>Arman Dwi Pangestu</h3>
    <p>armandwi.pangestu7@gmail.com</p>
    <img src="assets/img/arman.jpg" alt="Foto Saya" width="200" height="300" />
  </body>
</html>
```

Maka sekarang jika kita lihat view `home` nya akan muncul sebuah gambar seperti pada gambar berikut ini

![View Home Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/struktur-folder-routes-dan-view/view-home-image.png)

## Mengirim Data Dari Routes kedalam View di Laravel

Pada laravel, kita bisa mengirimkan data dari Route kedalam View, misalkan disini saya ingin mengirim `nama`, `email` dan `gambar` di view home menjadi dinamis (anggap saja data tersebut seharusnya berubah-ubah sesuai dengan user nya). Maka kita bisa kirim data dari `routes` seperti berikut ini:

> **Catatan**:
>
> Untuk mengirimkan data dari routes kedalam view kita cukup berikan data menggunakan associative array dengan pembatas koma setelah nama view nya seperti berikut
>
> ```php
> view('nama_view', [
>   "data-key-1" => "data-value-1"
> ]);
> ```

```php
Route::get('/', function () {
    return view('home', [
        "name" => "Arman Dwi Pangestu",
        "email" => "armandwi.pangestu7@gmail.com",
        "image" => "arman.jpg"
    ]);
});
```

Setelah data dikirimkan kedalam view, selanjutnya kita bisa menggunakan data tersebut di file view yang dikirim nya seperti berikut

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="assets/css/style.css" />
    <title>WPU Blog | Home</title>
  </head>
  <body>
    <h1>Halaman Home</h1>
    <h3>{{ $name }}</h3>
    <p>{{ $email }}</p>
    <img
      src="assets/img/{{ $image }}"
      alt="Foto Saya"
      width="200"
      height="300"
    />
  </body>
</html>
```
