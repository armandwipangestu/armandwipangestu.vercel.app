---
published: true
title: "Laravel 8 - #6 - Database, Migration dan Eloquent"
tag: "Programming"
date: "December 23 2023"
excerpt: "Laravel, sebagai salah satu framework PHP yang paling populer, menyediakan pendekatan yang kuat dan efisien dalam mengelola basis data. Dalam artikel ini, kita akan menjelajahi aspek-aspek kunci terkait database di Laravel, dengan penekanan khusus pada konsep migrasi (migration) dan Eloquent, sistem ORM bawaan Laravel."
cover_image: "/images/posts/Laravel 8 - Database, Migration dan Eloquent.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada aplikasi Laravel, terdapat sebuah file konfigurasi yaitu DotEnv (`.env`). File tersebut akan kita gunakan untuk menyimpan informasi mengenai settingan aplikasi Laravel kita pada lingkungan pengembangan atau development. Karena, nantinya kita tidak akan menyimpan atau mendistribusikan konfigurasi ini, karena konfigurasi seharusnya hanya diketahui oleh developernya saja dan tidak bisa dilihat oleh orang lain, apalagi jika aplikasi kita sudah di upload atau berjalan di production.

Pada aplikasi Laravel terdapat 2 file konfigurasi pada root folder nya yaitu `.env` dan `.env.example`, perbedaan dari kedua file tersebut adalah yang `.env` itu yang akan kita gunakan dan yang `.env.example` itu adalah template nya sehingga nama-nama variabel nya sama namun value nya berbeda.

Di dalam file `.env` pada saat kita menginstall aplikasi Laravel, itu sudah terdapat nilai default yang sudah diisikan, contohnya variabel `APP_KEY` yang dimana akan otomatis di generate ketika kita selesai mendownload aplikasi Laravel kita dari composer. Lalu ada variabel `APP_NAME`, variabel tersebut berfungsi untuk nama aplikasi kita, misal kita ubah nilai nya menjadi `WPU_Blog`. Kemudian ada variabel `APP_ENV`, variabel tersebut berfungsi untuk memberitahu lingkungan pengembangan sekarang kita lagi ditahap proses apa, ada `local`, `development`, `production`. Nah, jika kita set ke `production` nanti perilaku nya akan berubah, misalkan tidak akan menampilkan pesan kesalahan selengkap jika kita berada di proses `local` atau `development`.

Pada file tersebut juga terdapat konfigurasi database seperti `DB_CONNECTION` dan sebagainya. Nah, pada variabel-variabel tersebut menentukan konfigurasi database dari aplikasi Laravel kita. Secara default Laravel menggunakan database driver nya yaitu `mysql`, jika kalian ingin menggunakan database lain kalian juga bisa ubah pada konfigurasi variabel tersebut. Kemudian ada `DB_HOST`, secara default akan menggunakan ip loopback `127.0.0.1` atau `localhost`. Lalu ada `DB_PORT` untuk service database nya listen pada port berapa, default listen port database mysql di port `3306`. Kemudian ada `DB_DATABASE` yang berisi nama database yang akan digunakan dan yang terakhir ada `DB_USERNAME` dan `DB_PASSWORD` yaitu autentikasi user pass untuk akses database yang akan digunakan.

Intinya, file `.env` ini agar Laravel nya bisa terhubung ke lingkungan pengembangan kita sekarang dan nantinya jika aplikasi kita sudah siap untuk di release ke production, file ini tidak akan kita bawa, apalagi jika disimpan pada repository. Jika kalian sadar tulisan warna dari file `.env` di Visual Studio Code nya agak sedikit gelap atau kontras dengan warna yang lain, itu karena file tersebut sudah di ignore atau tidak disertakan pada konfigurasi `.gitignore`, sehingga file tersebut tidak akan ikut di push atau di upload pada repository kita (jika menggunakan git).

## Konfigurasi File `.env`

Kita akan ubah konfigurasi file `.env` agar bisa terkoneksi kedalam database kita. Kalian bisa sesuaikan dengan konfigurasi yang kalian gunakan, berikut konfigurasi yang saya gunakan

> **Catatan**:
>
> Kalian buat terlebih dahulu database yang akan digunakan, misalkan disini saya menggunakan nama database nya adalah `laravel8_wpu_blog`
>
> ```sql
> CREATE DATABASE laravel8_wpu_blog;
> ```

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel8_wpu_blog
DB_USERNAME=root
DB_PASSWORD=
```

Perlu diketahui, nantinya Laravel akan membaca konfigurasi yang sudah kita ubah pada file `.env` tersebut. Contoh jika kalian buka file `config/database.php`, pada file tersebut tedapat kode

```php
'default' => env('DB_CONNECTION', 'mysql'),
```

Nah, kode tersebut artinya, secara default akan memilih `DB_CONNECTION` atau database driver nya dari file `.env` yang sudah kita set sebelumnya, namun jika nilai nya kosong maka default nya akan menggunakan `mysql`.

Untuk mengelola database nya, disini saya akan menggunakan database client yaitu `Beekeper Studio`, namun kalian juga bisa menggunakan `phpMyAdmin` atau `MySQL Workbench` atau `HeidiSQL`, sesuaikan dengan kenyamanan masing-masing.

![Database Client](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-client.png)

## Database Migration Laravel

Jika membaca dari dokumentasi resmi laravel nya, Migrasi ini seperti Version Control untuk databse kita, jika kalian tahu, Version Control itu seperti git, jadi kita bisa melacak perubahan yang ada pada kodingan kita. Nah, migration ini untuk melacak perubahan yang terjadi pada database kita namun melalui kodingan Laravel kita, yang dimana memungkinkan kita dan team kita untuk mendefinisikan serta mendistribusikan atau membagikan skema atau schema atau struktur dari database kita. Sehingga, struktur nya tidak kita buat lagi didalam DBMS nya, namun dibuatnya menggunakan kodingan melalui Class yang ada didalam Laravel. Caranya bagaimana? kita akan menggunakan perintah php artisan

### Generate Database Migration

> **Catatan**:
>
> Secara default, laravel sudah memiliki file-file migration yang sudah dibuat

Untuk men-generate database migration menggunakan php artisan kita bisa jalankan perintah berikut ini

```php
php artisan make:migration create_nama_tabel
```

### Menjalankan Database Migration

Setelah tabel dari migrasi database nya dibuat, kita bisa jalankan migration tersebut menggunakan perintah

```php
php artisan migrate
```

Perintah tersebut nantinya, semua file migration nya akan dieksekusi menjadi sebuah tabel. Jika kita mencoba menjalankan perintah tersebut pada terminal kita, maka laravel akan mengeksekusi file migration bawaan nya seperti berikut ini

![Database Migration](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-migration.png)

Nah, sekarang jika kalian mencoba melihat pada aplikasi database client nya, maka sekarang akan muncul tabel-tabel `failed_jobs`, `migrations`, `password_resets`, `personal_access_tokens`, `users` baru yang sudah diterapkan melalui perintah migration tersebut.

![Database Show Tables](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-show-tables.png)

Tabel `migrations` bisa kalian anggap sebagai folder `.git`, tabel tersebutlah yang akan melacak perubahan yang akan kalian lakukan pada tabel-tabel ini.

Tabel-tabel tersebut muncul karena ada file di folder `database/migrations`

![Database Migration File](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-migration-file.png)

Sehingga nantinya jika kalian ingin membuat sebuah migration baru, maka file nya akan muncul di folder tersebut.

Jika kalian lihat pada salah satu file migration tersebut, misalkan tabel user, pasti terdapat 2 buah method didalam Class nya. Terdapat method yang namanya `up` dan juga method yang namanya `down`

Method `up` tersebut adalah method yang akan kita gunakan ketika kita akan membuat skema atau schema atau struktur dari tabel nya.

```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

Sehingga method tersebut cara kita membuat struktur tabel nya (tidak lagi menggunakan database client atau DBMS nya) seperti `CREATE TABLE` dan struktur nya seperti apa dan sebagainya, sehingga kita membuat struktur nya melalui kodingan file migration tersebut. Dan method `up` tersebut akan dieksekusi ketika kita ketik `migrate`.

### Menjalankan Database Migration Rollback

Nah method satunya lagi yaitu `down`, merupakan method kebalikan dari `up` yaitu untuk menghilangkan atau menghapus atau drop tabel dari skema yang sudah kita bikin. Dan jika kita menggunakan perintah php artisan, perintah nya yaitu `rollback`

```php
public function down()
{
    Schema::dropIfExists('users');
}
```

Sehingga jika kita menjalankan perintah

```php
php artisan migrate
```

perintah artisan tersebut hanya akan menjalankan method yang `up` nya saja, namun jika perintah php artisan nya seperti berikut

```php
php artisan migrate:rollback
```

Maka, semua file migrasi yang ada di folder `database/migrations` akan menjalankan method `down`. Sehingga sekarang seharusnya semua tabel dari database nya akan hilang kecuali tabel `migrations` karena tabel tersebut lah yang melacak perubahan nya.

![Database Migration Rollback](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-migration-rollback.png)

Nah hal tersebut keren banget bukan? sehingga jika kita ingin bekerja secara team atau kita ingin melakukan deployment, kita tidak perlu repot-repot lagi membuat tabel nya secara manual atau bahkan kita melakukan export dan import database.

### Menjalankan Database Migration Fresh

Nah jika perintah php artisan sebelumnya hanya menjalan salah satu method pada file migration nya, perintah `fresh` disini akan mengeksekusi kedua method tersebut yaitu `down` dan `up` atau `rollback` dan `migrate` sekaligus.

```php
php artisan migrate:fresh
```

Sehingga, perintah tersebut akan men-drop dulu semua tabel, lalu melakukan migrate nya.

![Database Migration Fresh](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-migration-fresh.png)

Fungsi nya untuk apa `fresh` disini? fungsinya adalah jika kita ingin mengubah skema atau struktur dari tabel nya. Misalkan disini pada tabel `users` terdapat entitas `email_verified_at` nah jika kita hapus dan menjalankan migrate dengan `fresh` maka struktur tabel nya akan ter-update

```php
public function up()
{
    ...
        $table->timestamp('email_verified_at')->nullable();
    ...
}
```

| Entitas Sebelum Tabel User                                                                                                                   | Entitas Sesudah Tabel User                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Entitas Sebelum Tabel User](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-entitas-sebelum-tabel-user.png) | ![Entitas Sesudah Tabel User](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/database-entitas-sesudah-tabel-user.png) |

Kerennya lagi, Laravel akan memberi tahu jika kita tidak sengaja melakukan `migrate:fresh` ketika aplikasi kita berada di environtment `production`. Karena jika di level production otomatis tabel dan data nya sudah ada, sehingga jika melakukan hal tersebut maka akan menghapus dan membuat ulang skema database nya, yang dimana kita tidak mau dong data dari aplikasi kita hilang semua :). Nanti keringat dikit, cemas kau deck ketika data nya hilang XD

![Migration Warning Production](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/migration-warning-production.png)

### Tipe Data Yang Tersedia

Nah, sebelumny kita sudah mencoba membuat atau menghapus salah satu entitas dari skema nya. Selanjutnya jika kita ingin membuat skema, maka kita harus tahu tipe data apa saja yang tersedia. Berikut adalah list tipe data yang tersedia menurut dokumentasi resmi Laravel nya disini [laravel.com/docs/8.x/migrations#available-column-types](https://laravel.com/docs/8.x/migrations#available-column-types)

![Available Column Types](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/available-column-types.png)

## Eloquent ORM Laravel

Apa itu ORM? ORM merupakan singkatan dari `object-relational mapper` yang merupakan sebuah fungsi untuk memetakan tiap-tiap data yang ada didalam tabel atau database nanti kedalam sebuah objek.

Sehingga didalam Laravel ada yang disebut sebagai Eloquent, dimana eloquent tersebut merupakan sebuah ORM yang membuat kita dapat dengan mudah berinteraksi dengan database yang kita buat.

Ketika kita menggunakan `Eloquent` ini, setiap table akan korespondensi atau terhubung pada sebuah model yang bisa kita gunakan untuk berinteraksi dengan tabel. Sehingga, antara website kita dan tabel didalam database kita terdapat perantara yang namanya `Model`. Jika kalian masih ingat, dipembahasan sebelumnya kita sudah membuat komponen model, namun model tersebut belum sempurna karena data nya masih dibuat secara hard-code bukan data dari database.

Eloquent ini juga, selain kita bisa menggambil data-data dari tabel atau record dari database kita, Eloquent ini memungkinkan kita untuk melakukan `CRUD` (Create, Read, Update dan Delete) kedalam tabel melalui kodingan, sehingga kita tidak perlu lagi menyentuh database client nya. Hal tersebut dapat terjadi karena adanya `Active Record Pattern`.

### Active Record Pattern

Active Record Pattern merupakan sebuah pendekatan untuk mengakses data di sebuah database. Sehingga tabel didalam database kita itu dibungkus menjadi sebuah class. Jadi representasi tabel didalam database itu ada class nya yang kita sebut `Model` tadi.

Sehingga jika sudah terdapat sebuah class yang merepresentasikan sebuah tabel, maka setiap data atau disebutnya row itu terhubung kedalam instance dari class nya atau kita sebut `Object`, jadi nanti satu data itu satu object yang merepresentasikan setiap record atau row atau data didalam tabel.

Jadi ketika membuat sebuah object atau instance dari sebuah class nya, maka baris baru ditabel nya itu akan ditambahkan pada saat kita melakukan save.

Itulah penjelasan mengenai Active Record Pattern yang biasanya digunakan pada ORM.

### Implementasi ORM Eloquent

Untuk implementasi nya, kita akan menggunakan tinker, tinker adalah sebuah aplikasi didalam Laravel yang bisa kita gunakan untuk berinteraksi dengan aplikasi Laravel kita. Caranya kalian bisa ketikan perintah berikut ini

```php
php artisan tinker
```

Nah jika perintah tersebut berhasil dijalankan, maka prompt kita akan masuk kedalam sebuah shell untuk terhubung kedalam aplikasi kita seperti gambar berikut ini

![Artisan Tinker](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/artisan-tinker.png)

Sebelum kita mengetikan sesuatu untuk berinterkasi dengan tabel user, jika kalian sadar melihat file Model di folder `app/Models` terdapat sebuah model dengan nama file nya adalah `User.php`

Nah file model tersebut saling berhubungan atau berpasangan dengan file migration untuk tabel user nya. Makanya model yang kita buat sebelumnya yaitu `Post.php` merupakan model setengah jadi, karena tidak mempunyai pasangan file migration nya.

Sekarang jika kalian mencoba melihat file model `User.php` nya, terdapat beberapa perintah-perintah nya seperti `fillable` (field-field mana saja yang boleh diisi yaitu `name`, `email`, `password` dan sisanya akan diisi secara otomatis oleh Laravel).

```php
protected $fillable = [
    'name',
    'email',
    'password',
];
```

Kemudian ada `hidden`

```php
protected $hidden = [
    'password',
    'remember_token',
];
```

Nah file class tersebut kita anggap sebagai class adalah `Blueprint` nya atau cetakan ketika kita nanti ingin membuat user baru. Untuk mengakses cetakan tersebut pada shell `Tinker`, kita bisa membuat sebuah variabel terlebih dahulu, misalkan `$user` yang berisi instance dari class `User` sebagai model kita.

> **Catatan**:
>
> Jika kalian menyimpan file Model nya sesuai aturan yaitu di `app/Models`, kita bisa langsung melakukan instance pada class tersebut hanya dengan nama file nya saja seperti berikut ini
>
> ```php
> $user = new User;
> ```
>
> Nantinya laravel akan otomatis berasumsi bahwa Blueprint model nya disimpan di `app/Models`. Sehingga jika kita jalankan perintah tersebut akan otomatis muncul sebuah informasi
>
> ```php
> [!] Aliasing 'User' to 'App\Models\User' for this Tinker session.
> = App\Models\User {#6133}
> ```

```php
$user = new App\Models\User;
```

Nah sekarang `$user` tersebut merupakan sebuah instance dari Model `User` sehingga kita bisa mengisikan data nya melalui instance tersebut. Sekarang kita bisa langsung mengisikan data kedalam tabel dengan cara berikut ini

> **Catatan**:
>
> Perlu diingat, disini kita hanya mengisikan 3 field saja karena 3 field tersebut lah yang fillable

- Field Name

```php
$user->name = 'Arman Dwi Pangestu';
```

Output

```php
= "Arman Dwi Pangestu"
```

- Field Email

```php
$user->email = 'armandwi.pangestu7@gmail.com';
```

Output

```php
= "armandwi.pangestu7@gmail.com"
```

- Field Password

```php
$user->password = bcrypt('12345');
```

Output

```php
= "$2y$10$XJrQr7WZkPdITwSNQoRh8u4J8gbNhb7FjCOqaOWsOL4V8eFP0Ex/6"
```

Nah dengan kalian mengetikan perintah tersebut, itu artinya kita sudah membuat satu buah objek yang namanya `$user` dengan isian data yang sudah diisikan pada perintah diatas. Jika hanya menulis seperti itu, hal tersebut belum tersimpan kedalam database nya

Untuk menyimpannya, kita perlu melakukan `save` seperti pada penjelasan Active Record Pattern nya, setelah object nya dibuat itu baru bisa tersimpan kedalam tabel ketika kita melakukan save. Nah, cara untuk melakukan save nya kalian jalankan perintah berikut

```php
$user->save();
```

Perintah tersebut artinya, semua hal apapun yang ada didalam object `$user` akan tersimpan kedalam tabel yang sesuai dan berkorespondensi dengan model ini.

![Artisan Tinker ORM](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-migration-dan-eloquent/artisan-tinker-orm.png)

Keren bukan? sehingga kita tidak lagi perlu menggunakan database client nya untuk melakukan create data pada tabel kita atau tidak perlu lagi membuat sebuah form input pada website kita.

Nah jika kita ingin menampilkan isi didalam tabel `user` itu terdapat apa saja kita bisa menggunakan Tinker dengan perintah seperti berikut

> **Catatan**:
>
> Method `all` ini sudah milik nya Eloquent didalam Laravel, jika kalian ingat pada pembahasan sebelumnya kita membuat sendiri method `all` nya, padahal didalam Eloquent sudah tersedia.

```php
$user->all();
```

Maka output nya akan seperti ini

```php
= Illuminate\Database\Eloquent\Collection {#7089
    all: [
      App\Models\User {#7090
        id: 1,
        name: "Arman Dwi Pangestu",
        email: "armandwi.pangestu7@gmail.com",
        email_verified_at: null,
        #password: "$2y$10$XJrQr7WZkPdITwSNQoRh8u4J8gbNhb7FjCOqaOWsOL4V8eFP0Ex/6",
        #remember_token: null,
        created_at: "2023-12-23 11:23:17",
        updated_at: "2023-12-23 11:23:17",
      },
    ],
  }
```

Dapat kalian lihat pada output kembalian data tersebut, terdapat satu buah data dan bentuk nya sudah `Collection`. Selanjutnya agar terlihat lebih dari satu data kita tambahkan data baru lagi misalkan seperti berikut

```php
$user = new User;
$user->name = 'Sandhika Galih';
$user->email = 'sandhikagalih@gmail.com';
$user->password = bcrpy('54321');
$user->save();
```

Maka jika sekarang kita tampilkan lagi menggunakan perintah

```php
$user->all();
```

Akan muncul 2 buah data dalam bentuk `Collection` seperti berikut ini

```php
= Illuminate\Database\Eloquent\Collection {#7094
    all: [
      App\Models\User {#7092
        id: 1,
        name: "Arman Dwi Pangestu",
        email: "armandwi.pangestu7@gmail.com",
        email_verified_at: null,
        #password: "$2y$10$XJrQr7WZkPdITwSNQoRh8u4J8gbNhb7FjCOqaOWsOL4V8eFP0Ex/6",
        #remember_token: null,
        created_at: "2023-12-23 11:23:17",
        updated_at: "2023-12-23 11:23:17",
      },
      App\Models\User {#7093
        id: 2,
        name: "Sandhika Galih",
        email: "sandhikagalih@gmail.com",
        email_verified_at: null,
        #password: "$2y$10$4BzzoyqD.AIUSFwLna1bOOurOeVbufPE6MwQ30OoLIqLPGeW/8Eoa",
        #remember_token: null,
        created_at: "2023-12-23 11:33:01",
        updated_at: "2023-12-23 11:33:01",
      },
    ],
  }
```

Seperti pada pembahasan `Collection` sebelumnya, kita bisa menjalankan method-method bawaan yang tersedia pada collection, misalkan jika kita ingin mencari data pertama, kita bisa menggunakan method `first`

```php
$user->first();
```

Maka akan muncul data pertama nya

```php
= App\Models\User {#7095
    id: 1,
    name: "Arman Dwi Pangestu",
    email: "armandwi.pangestu7@gmail.com",
    email_verified_at: null,
    #password: "$2y$10$XJrQr7WZkPdITwSNQoRh8u4J8gbNhb7FjCOqaOWsOL4V8eFP0Ex/6",
    #remember_token: null,
    created_at: "2023-12-23 11:23:17",
    updated_at: "2023-12-23 11:23:17",
  }
```

Atau misalkan kita ingin mencari data user dengan `id` nya adalah `2`

> **catatan**:
>
> Method `find` disini berfungsi untuk mencari data berdasarkan `id`

```php
$user->find(2);
```

Maka sekarang akan muncul data

```php
= App\Models\User {#6127
    id: 2,
    name: "Sandhika Galih",
    email: "sandhikagalih@gmail.com",
    email_verified_at: null,
    #password: "$2y$10$4BzzoyqD.AIUSFwLna1bOOurOeVbufPE6MwQ30OoLIqLPGeW/8Eoa",
    #remember_token: null,
    created_at: "2023-12-23 11:33:01",
    updated_at: "2023-12-23 11:33:01",
  }
```

Nah bagaiman jika kita mencari id yang tidak ada? misalkan id nya `2000`

```php
$user->find(2000);
```

Maka kembalian dari function tersebut adalah

```php
= null
```

Karena memang tidak ada data dengan id nya `2000`, namun terdapat method lain yang keren untuk langsung menangani ketika yang kita cari itu tidak ada yaitu

```php
$user->findOrFail(2000);
```

Nah maka sekarang akan muncul sebuah `Exception` bahwa Model Not Found dengan data user yang id nya `2000` di model `User`

```php
 Illuminate\Database\Eloquent\ModelNotFoundException  No query results for model [App\Models\User] 2000.
```
