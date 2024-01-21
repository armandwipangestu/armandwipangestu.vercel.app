---
published: true
title: "Laravel Eloquent - Relationship One to One"
tag: "Programming"
date: "January 20 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship untuk tipe One to One atau hasOne"
cover_image: "/images/posts/Laravel Eloquent - Relationship One to One.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Instalasi dan Setup Laravel

Sebelum kita memulai mempelajari Eloquent relationship, kita perlu mempunyai terlebih dahulu project Laravel nya, untuk melakukannya kita
bisa install Laravel menggunakan `Laravel Installer`. Jika kalian belum mempunyai installer nya kalian bisa install menggunakan `composer`
dengan perintah berikut ini:

```shell
composer global require laravel/installer
```

Setelah package `Laravel Installer` nya terinstall secara global, sekarang kita bisa buat project Laravel nya menggunakan perintah:

> **Catatan**: Tips
>
> `laravel-learn-relationship` adalah nama folder atau project nya, kalian bisa gunakan nama lain jika menginginkannya

```shell
laravel new laravel-learn-relationship
```

Maka sekarang seharusnya terdapat folder dengan nama `laravel-learn-relationship` seperti gambar dibawah ini

![Laravel Folder](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/laravel-folder.png)

Setelah folder project Laravel terinstall, kita bisa pindah atau change working directory agar berada di dalam aplikasi Laravel nya dengan perintah:

```shell
cd laravel-learn-relationship
```

Setelah itu kita bisa buka menggunakan Text Editor Visual Studio Code dengan perintah

```shell
code .
```

### Setup Locale Faker

Selanjutnya kita akan setup agar locale faker nya menggunakan data dari indonesia, untuk melakukannya kita bisa tambahkan dulu variable dengan nama `FAKER_LOCALE` di file `.env` pada bagian akhir

```env
FAKER_LOCALE="id_ID"
```

Setelah membuat variable `FAKER_LOCALE` selanjutnya kita set agar konfigurasi faker nya menggunakan data dari variable `.env`, untuk melakukannya
kalian bisa ubah di file `config/app.php`

```php
...
'faker_locale' => env("FAKER_LOCALE", 'en_US'),
...
```

### Setup Clockwork

Setelah men-setup locale faker, selanjutnya kita akan install package yang namanya `clockwork`, package tersebut berfungsi untuk mengecek query yang digunakan pada aplikasi Laravel kita. Untuk menginstall nya kita bisa gunakan package manager `composer` dengan perintah berikut ini:

```shell
composer require itsgoingd/clockwork
```

Setelah package `clockwork` terinstall, selanjutnya kita perlu menginstall juga extension versi browser nya, disini saya menggunakan web browser google chrome

![Extension Browser Clockwork](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/extension-browser-clockwork.png)

Jika sudah berhasil di install, nanti extension ini akan muncul di menu developer tools nya jika kita membuka halaman yang dibuat menggunakan PHP

> **Catatan**:
>
> Disini saya menggunakan `Laragon`, yang dimana jika terdapat project php atau Laravel yang tersimpan di folder `www` atau web server nya, maka
> akan otomatis dapat dibuka atau langsung berjalan di web server nya dengan local domain `.test`, jika kalian tidak menggunakan web server,
> kalian dapat menjalankan Laravel nya dengan perintah berikut ini:
>
> ```shell
> php artisan serve
> ```
>
> Nantinya aplikasi Laravel akan berjalan di port `8000` dengan host nya yaitu `localhost` atau ip loopback `127.0.0.1`

![Devtools Clockwork](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/dev-tools-clockwork.png)

Setelah kita melakukan setup-setup diatas, kita akan memulai membahas mengenai relationship pada Eloquent Laravel

## Pendahuluan

Tabel database seringkali berhubungan antara satu dengan yang lainnya. Misalnya, sebuah postingan blog mungkin memiliki banyak komentar atau contoh lainnya adalah seorang user mungking terkait dengan data nomor teleponnya. Eloquent membuat pengelolaan dan penanganan relationship tersebut menjadi lebih mudah dan mendukung berbagai relationship yang umum atau common seperti:

- One to One
- One to Many
- Many to Many
- Has One Through
- Has Many Through

## Mendefinisikan Relationships

Eloquent relationships didefinisikan sebagai method pada class model Eloquent kalian. Karena relationship juga berfungsi sebagai query builders
yang kuat, maka mendefinisikan relationship sebagai method akan memberikan kemampuan merangkai (chaining) method dan membuat query yang kuat.
Misalnya, kita dapat merangkai atau chaining untuk memberikan batasan atau kondisi query tambahan pada sebuah relationship user dengan data nomor teleponnya:

```php
$user->phone()->where('active', 1)->get();
```

## One to One

Sebuah relasi one-to-one adalah tipe relationship yang sangat mendasar pada database. Misalnya, model `User` mungkin dikatikan dengan satu model `Phone`. Untuk mendefinisikan relationship tersebut, kita akan membuat sebuah method dengan nama `phone` pada model `User`. Method `phone` tersebut harus memanggil method `hasOne` dan mengembalikan nilai atau return value nya. Method `hasOne` tersebut bisa kita gunakan atau tersedia di model melalui base class `Illuminate\Database\Eloquent\Model`. Agar lebih jelas atau terbayang mengenai relationship antara model `User` dengan model `Phone` tersebut kalian bisa lihat gambar dibawah ini

![Design Model User and Model Phone](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/design-model-user-and-model-phone.png)

### Mengubah Model, Migration dan Factory User

Disini kita akan mencoba mengubah model, migration dan factory bawaan Laravel yaitu `User` agar sesuai dengan design model yang sudah saya buat pada gambar diatas.

- Model User

Pertama kita akan coba ubah terlebih dahulu model user nya seperti berikut ini di file `app\Models\User.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

- Migration User

Selanjutnya kita ubah file migration atau file yang langsung merepresentasikan field-field apa saja yang ada di tabel `users` nya agar sesuai dengan design yang sudah saya buat, file migration ini berada di `database\migrations\2014_10_12_000000_create_users_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

- Factory User

Sekarang kita ubah kode factory atau kode yang akan membuat data dummy menggunakan faker tersebut agar sesuai dengan field yang sudah saya design, file factory tersebut berada di `database\factories\UserFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail()
        ];
    }
}
```

#### Membuat Seeder untuk Model User

Setelah melakukan konfigurasi model, migration dan factory User selanjutnya kita akan buat file seeder tersendiri untuk model `User` tersebut. Untuk melakukannya kalian bisa jalankan perintah
`php artisan` seperti berikut ini:

```shell
php artisan make:seeder UserSeeder
```

Maka sekarang akan terbuat sebuah file seeder baru di `database\seeders\UserSeeder.php`, selanjutnya kita akan buat data dummy untuk model `User` dengan bantuan file `UserFactory` yang sudah kita ubah sebelumnya

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Arman Dwi Pangestu',
            'username' => 'devnull',
            'email' => 'arman@example.net'
        ]);

        User::factory(4)->create();
    }
}
```

Setelah seeder nya terbuat, selanjutnya kita buat agar `UserSeeder` tersebut dijalankan ketika kita menggunakan perintah php artisan `migrate`, untuk melakukan hal tersebut kita bisa panggil class
`UserSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class
        ]);
    }
}
```

#### Menjalankan Artisan Migrate

Jika semua nya sudah siap (Model, Migration, Factory dan Seeder) kita bisa eksekusi menggunakan perintah berikut ini

```shell
php artisan migrate
```

> **Catatan**:
>
> Jika muncul sebuah prompt pertanyaan seperti berikut ini
>
> ```php
>  WARN  The database 'laravel_learn_relationship' does not exist on the 'mysql' connection.
>
>  Would you like to create it? (yes/no) [no]
> ```
>
> Kita bisa ketik `yes` kemudian enter.

![PHP Artisan Migrate User](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/php-artisan-migrate-user.png)

Maka sekarang seharusnya sudah terbuat sebuah tabel dengan nama `users` di database `laravel_learn_relationship` dengan isian kolom seperti berikut ini

| Column     | Data Type       |
| ---------- | --------------- |
| id         | bigint unsigned |
| name       | varchar(255)    |
| username   | varchar(255)    |
| email      | varchar(255)    |
| created_at | timestamp       |
| updated_at | timestamp       |

![Database and Model User Created](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/database-and-model-user-created.png)

Selanjutnya kita jalankan kembali perintah artisan `migrate` dengan tambahan flag atau option berikut ini

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya terbuat beberapa data dummy pada tabel `users`

![Data Dummy Model User](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/data-dummy-model-user.png)

### Model Phone

Setelah model `User` siap, selanjutnya kita siapkan untuk model `Phone`, untuk membuat model, migration, factory dan seeder secara sekaligus kita bisa gunakan perintah artisan berikut ini:

> **Catatan**: Tips
>
> flag atau option `-mfs` disini artinya adalah kita buat model sekaligus `migration`, `factory`, dan `seeder`

```shell
php artisan make:model -mfs Phone
```

Selanjutnya kita ubah file model `Phone` nya di `app\Models\Phone.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

#### Migration Phone

Sekarang kita sesuaikan kode migration nya agar kolom dari tabel `phones` sesuai dengan design yang sudah saya buat, file migration tersebut berada di `database\migrations\2024_01_20_192104_create_phones_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('phone', 20);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('phones');
    }
};
```

#### Factory Phone

Selanjutnya kita siapkan data dummy untuk model `Phone` tersebut menggunakan faker di file factory `database\factory\PhoneFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PhoneFactory extends Factory
{
    public function definition(): array
    {
        $user_id = [1, 2, 3, 4, 5];
        return [
            'user_id' => fake()->unique()->randomElement($user_id),
            'phone' => fake()->phoneNumber()
        ];
    }
}
```

#### Seeder Phone

Setelah Factory faker nya sudah siap, sekarang kita eksekusi pembuatan data dummy nya di file `database\seeders\PhoneSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\Phone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PhoneSeeder extends Seeder
{
    public function run(): void
    {
        Phone::factory(5)->create();
    }
}
```

Jangan lupa kita panggil class `PhoneSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PhoneSeeder::class
        ]);
    }
}
```

Setelah semuanya siap, sekarang kita jalankan migrate lagi

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya sudah terbuat sebuah tabel baru dengan nama `phones` di database dengan isian kolom dan data seperti berikut ini

| Column     | Data Type       |
| ---------- | --------------- |
| id         | bigint unsigned |
| user_id    | bigint unsigned |
| phone      | varchar(20)     |
| created_at | timestamp       |
| updated_at | timestamp       |

![Table Phones With Data Dummy](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/table-phones-with-data-dummy.png)

### Membuat Method hasOne

Setelah kita siapkan model, migration, factory dan seeder untuk `User` dan `Phone`. Sekarang kita akan membuat method `hasOne` di model `User` agar membuat sebuah relationship one-to-one

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function phone(): HasOne
    {
        return $this->hasOne(Phone::class);
    }
}
```

Argument pertama yang dikirimkan di method `hasOne` adalah nama class model yang terkait dengan relation nya. Setelah relationship ditentukan, sekarang kita dapat mengambil data terkait menggunakan
dynamic property atau variable Eloquent. Dynamic property ini memungkinkan kalian mengakses relationship method yang sudah dibuat di model `User`.

#### Mengakses atau Menjalankan Relation One to One

Untuk mencoba nya kalian bisa menggunakan `tinker` dengan cara masuk terlebih dahulu kedalam shell nya dengan perintah berikut ini

```shell
php artisan tinker
```

Jika sudah didalam shell nya, sekarang kita bisa buat sebuah variable dengan nama `phone` yang value nya adalah model `User` men-chaining method relationship atau dynamic property nya

> **Catatan**: Tips
>
> Nama dari dynamic property Eloquent `phone` berikut ini adalah merepresetasikan nama method relationship yang ada di model `User`

```php
$phone = User::find(1)->phone
```

Maka seharusnya perintah diatas tersebut akan me-return value data nomor telepon yang terkait dengan user nya

```php
[!] Aliasing 'User' to 'App\Models\User' for this Tinker session.
= App\Models\Phone {#6033
    id: 5,
    user_id: 1,
    phone: "(+62) 301 8577 592",
    created_at: "2024-01-20 19:32:51",
    updated_at: "2024-01-20 19:32:51",
  }
```

![Tinker Get Phone User](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/tinker-get-phone-user.png)

### Format atau Aturan Penulisan

#### Foreign Key

Eloquent menentukan `foreign key` pada suatu relationship berdasarkan sesuai dengan nama parent atau induk model nya. Pada kasus ini, model `Phone` secara otomatis `diasumsikan` memiliki
sebuah column untuk menampung foreign key dengan nama `user_id`. Jika kalian ingin mengesampikan aturan ini, kalian dapat menambahkan nama custom column foreign key pada argument kedua di
method `hasOne` nya:

```php
public function phone(): HasOne
{
    return $this->hasOne(Phone::class, 'foreign_key');
}
```

#### Primary Key

Selain hal tersebut, Eloquent juga berasumsi bahwa `foreign key` tersebut harus memiliki nilai yang cocok atau sama dengan column `primary key` di parent atau induk model nya. Dengan kata lain,
Eloquent akan mencari nilai user id (foreign key) pada column `user_id` di data `Phone` kemudian membadingkannya dengan nilai user id (primary key) pada column `id` di data `User` nya.
Jika kalian ingin relationship tersebut menggunakan nilai `primary key` selain column `id` atau property `$primaryKey` pada model, kalian bisa menambahkan nama custom column primary key pada argument ketiga di method `hasOne` nya:

```php
public function phone(): HasOne
{
    return $this->hasOne(Phone::class, 'foreign_key', 'local_key');
}
```

## Inverse Relationship

Setelah mendefinisikan relationship `hasOne` atau `One to One` dari model `User` ke model `Phone`, maka kita sekarang dapat mengkases model `Phone` secara langsung dari model `User` dengan
cara men-chaining method `phone` pada instance `User`. Selanjutnya, kita akan tentukan relationship pada model `Phone` ke model `User` atau invers (kebalikan) relationship yang memungkinkan kita dapat mengakses data user yang memiliki nomor telepon. Kita dapat mendefinisikan invers relationship dari method `hasOne` dengan menggunakan method `belongsTo`.

Agar lebih terbayang, kalian bisa lihat gambar dibawah ini mengenai relationship `hasOne` dari model `User` ke model `Phone` dan `belongsTo` (inverse) dari model `Phone` ke model `User`

![Invers Relation Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/invers-relation-design.png)

### Membuat Method belongsTo

Untuk membuat inverse relation nya, kita perlu membuat sebuah method dengan nama `user` di model `Phone`. Method `user` tersebut harus memanggil method `belongsTo` dan mengembalikan nilai atau return value nya.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Phone extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

Saat memanggil method `user`, Eloquent akan berusaha menemukan model `User` yang memiliki id yang cocok dengan column `user_id` pada model `Phone`.

Eloquent menentukan nama `foreign key` dengan memeriksa nama method relationship nya dan menambahkan nama akhiran atau suffix method dengan format `_id`. Jadi, dalam hal ini, Eloquent `mengasumsikan` bahwa model `Phone` memiliki column `user_id`. Namun, jika nama column `foreign key` di model `Phone` bukan `user_id`, kalian dapat menambahkan argument kedua di method `belongsTo`

```php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class, 'foreign_key');
}
```

Jika parent atau induk model tidak menggunakan column `id` sebagai `primary key` nya, atau mungkin kalian ingin mencari model terkait menggunakan column yang berbeda, Anda dapat menambahkan argument ketiga di method `belongsTo` untuk menentukan nama custom key column di parent atau induk model nya

```php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class, 'foreign_key', 'owner_key');
}
```

#### Mengakses atau Menjalankan Relation belongsTo

Untuk mencoba nya kalian bisa gunakan `tinker` kembali, namun kita perlu me-restart session shell nya agar terupdate, kalian bisa exit terlebih dahulu dari session nya kemudian masuk kembali menggunakan perintah artisan

```shell
php artisan tinker
```

Jika sudah didalam shell nya, sekarang kita bisa buat sebuah variable dengan nama `user` yang value nya adalah model `Phone` men-chaining method relationship atau dynamic property nya

> **Catatan**: Tips
>
> Nama dari dynamic property Eloquent `user` berikut ini adalah merepresetasikan nama method relationship yang ada di model `Phone`

```php
$user = App\Models\Phone::find(1)->user
```

Maka seharusnya perintah diatas akan me-return value data user yang terkait dengan nomor telepon nya

```php
= App\Models\User {#6031
    id: 1,
    name: "Arman Dwi Pangestu",
    username: "devnull",
    email: "arman@example.net",
    created_at: "2024-01-20 19:32:51",
    updated_at: "2024-01-20 19:32:51",
  }
```

![Tinker Get User Phone](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/tinker-get-user-phone.png)

## Membuat Eloquent Relationship Agar Dapat Diakses Melalui Web

Untuk membuat agar Eloquent Relationship yang sudah kita buat sebelumnya dapat diakses melalui web, kita bisa buat sebuah controller baru dengan nama `RelationController`. Untuk membuat nya kita bisa gunakan perintah php artisan berikut ini

```shell
php artisan make:controller RelationController
```

Selanjutnya kita buat sebuah method untuk menangani route yang akan kita tentukan sesuai dengan relationship yang sudah kita buat, untuk melakukannya kita bisa buat method tersebut di file `app\Models\Http\Controllers\RelationController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use App\Models\User;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    public function hasOne(Request $request)
    {
        $phone = User::find($request->id)->phone;
        return $phone;
    }

    public function belongsTo(Request $request)
    {
        $user = Phone::find($request->id)->user;
        return $user;
    }
}
```

Setelah controller nya siap, sekarang kita tinggal routing agar method di controller tersebut dapat digunakan, untuk melakukannya kita bisa tambahkan route di file `routes\web.php`

```php
<?php

use App\Http\Controllers\RelationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/relation/hasOne', [RelationController::class, 'hasOne']);
Route::get('/relation/belongsTo', [RelationController::class, 'belongsTo']);
```

Maka sekarang kita bisa langsung mengakses method relationship `hasOne` atau `One to One` dan `belongsTo` atau `Invers One to One` tersebut melalui web dengan syarat kita mengirimkan request `id` di alamat URL nya.

![Eloquent Relationship Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/eloquent-relationship-via-web.png)

### Kelebihan Akses Melalui Web

Nah berhubung sekarang kita bisa mengakses response dari relationship nya melalui web, maka kita bisa intip raw query SQL yang dijalankan nya itu seperti apa sih dengan menggunakan clockwork

![Clockwork See Query](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-one/clockwork-see-query.png)
