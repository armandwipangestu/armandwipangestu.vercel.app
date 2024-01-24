---
published: true
title: "Laravel Eloquent - Relationship Where Belongs To"
tag: "Programming"
date: "January 24 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship Where Belongs To"
cover_image: "/images/posts/Laravel Eloquent - Relationship Where Belongs To.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan sebelumnya kita sudah membahas mengenai Laravel Eloquent - Default Models, pada artikel kali ini kita akan membahas sesuatu yang disebut `whereBelongsTo` atau `Querying Belongs To Relationships`. Apa itu `whereBelongsTo`?

## Where Belongs To

Penggunaan `whereBelongsTo` memungkinkan kita untuk menuliskan query-query Eloquent dengan lebih ringkas dan ekspresif saat bekerja dengan relationship `belongsTo`. Penggunaan ini membantu kita untuk meningkatkan kejelasan kode dan mengurangi boilerplate code yang biasanya diperlukan untuk menuliskan query Eloquent yang sering digunakan. Contoh studi kasus nya kita ambil dari model `Post` ke model `User`, ketika kita melakukan query untuk children model yang memiliki relationship `belongsTo` ke parent model nya, mungkin kita akan melakukan chaining method atau klausa `where` untuk mendapatkan model Eloquent yang sesuai seperti berikut ini:

![Inverse Relation Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-where-belongs-to/inverse-relation-design.png)

> **Catatan**:
>
> Kalian bisa menjalankan perintah berikut ini melalui tinker

```php
use App\Models\User;
use App\Models\Post;

$user = User::find(1);
$posts = Post::where('user_id', $user->id)->get();
```

Nah dengan menggunakan `whereBelongsTo` kita dapat mempersingkat penulisan kode tersebut menjadi seperti ini

```php
use App\Models\User;
use App\Models\Post;

$user = User::find(1);
$posts = Post::whereBelongsTo($user)->get();
```

Mengapa bisa seperti itu? karena method `whereBelongsTo` akan secara otomatis menentukan relationship dan foreign key yang tepat untuk model tertentu. Mungkin juga kalian akan mengirimkan sebuah instance `collection` kedalam method `whereBelongsTo` tersebut. Saat melakukan hal tersebut, Laravel akan mengambil salah satu parent atau induk model dalam `collection` tersebut. Contoh misalkan disini kita ingin mendapatkan postingan hanya dari user yang `vip`.

> **Catatan**:
>
> Kode dibawah ini tidak dapat dijalankan karena kita belum mempunyai field `vip` di model `User` nya, nanti kita akan coba setelah pembahasan `whereBelongsTo` nya

```php
$users = User::where('vip', true)->get();
$posts = Post::whereBelongsTo($users)->get();
```

Secara default, Laravel akan menentukan relationship yang terkait dengan model tertentu berdasarkan nama class model nya. Namun, jika kalian ingin menentukan manual secara spesifik nama relationship nya, kalian dapat mengirimkannya pada argumen kedua di method `whereBelongsTo`

> **Catatan**:
>
> `author` disini adalah nama method pada model `Post`, dimana method tersebut akan me-return relationship antara model `Post` dan juga model `User`. Jika kalian tidak menggunakan custom relationship maka secara default Laravel akan menggunakan nama class parent nya yaitu `user`. Dikarenakan pada pembahasan sebelumnya kita sudah membuat method `user` juga maka tidak akan terjadi error karena relationship nya sudah di definisikan.

```php
$users = User::where('vip', true)->get();
$posts = Post::whereBelongsTo($user, 'author')->get();
```

## Implementasi whereBelongsTo

Setelah kita memahami apa itu `whereBelongsTo` dan bagaimana cara menggunakannya, sekarang kita akan mencoba meng-implementasikan pada project yang sudah kita buat.

### Mengubah Skema Migration User

Untuk melakukannya, disini kita perlu menambahkan terlebih dahulu field `vip` dengan tipe data nya `boolean` pada migration `users` nya

```php
public function up(): void
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('username')->unique();
        $table->string('email')->unique();
        $table->boolean('vip');
        $table->timestamps();
    });
}
```

### Mengubah Factory Untuk Data Dummy User

Setelah mengubah skema migration user nya, sekarang kita perlu mengubah kode factory nya juga agar setiap user dummy yang dibuat akan memiliki data apakah user tersebut vip atau bukan. Untuk melakukannya kita bisa ubah di file `database\factories\UserFactory.php`

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
            'email' => fake()->unique()->safeEmail(),
            'vip' => fake()->randomElement([0, 1])
        ];
    }
}
```

### Mengubah Seeder User

Jika kalian ingat, kita memiliki satu buah data user yang dibuat tanpa menggunakan bantuan factory dan faker. Nah data user tersebut juga kita perlu ubah agar mempunyai field `vip` nya, untuk melakukannya kita bisa ubah di file `database\seeders\UserSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Arman Dwi Pangestu',
            'username' => 'devnull',
            'email' => 'arman@example.net',
            'vip' => 1
        ]);

        User::factory(4)->create();
    }
}
```

Setelah semuanya siap, sekarang kita jalankan migration nya menggunakan perintah artisan berikut ini

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya pada tabel `users` terdapat satu buah field tambahan yaitu `vip` seperti gambar dibawah ini

![User VIP](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-where-belongs-to/user-vip.png)

### Mengakses atau Menjalankan whereBelongsTo

Setelah skema database nya diperbarui sekarang bisa kita coba akses atau jalankan whereBelongsTo tersebut menggunakan tinker, untuk masuk kedalam tinker nya kita gunakan perintah artisan berikut ini:

```shell
php artisan tinker
```

Jika sudah masuk kedalam tinker sekarang kita panggil model nya dengan perintah berikut ini

```php
use App\Models\User;
use App\Models\Post;
```

Setelah model nya di panggil, sekarang kita buat sebuah variable untuk menampung user `vip` dengan perintah berikut ini:

```php
$users = User::where('vip', true)->get();
```

Maka sekarang seharusnya me-return data user yang `vip` seperti gambar dibawah ini

![Users VIP](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-where-belongs-to/users-vip.png)

Jika sudah mendapatkan list users yang `vip`, sekarang kita bisa ambil postingan berdasarkan masing-masing user vip tersebut menggunakan `whereBelongsTo`, untuk melakukannya kita bisa buat sebuah variabel dengan nama `posts` kemudian isinya adalah data dari model `Post` yang men-chaining method `whereBelongsTo` kemudian pada argument nya kita kirimkan collection `users` nya

```php
$posts = Post::whereBelongsTo($users)->get();
```

Maka seharusnya perintah diatas tersebut akan me-return list postingan berdasarkan user `vip` yang sudah kita simpan di variabel atau collection `users`

![Posts User VIP](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-where-belongs-to/posts-user-vip.png)

## Membuat whereBelongsTo Agar Dapat Diakses Melalui Web

Seperti biasa kita akan buat semua yang kita pelajari mengenai Eloquent Relationship agar dapat diakses melalui web agar dapat kita lihat proses RAW Query SQL nya seperti apa menggunakan clockwork. Untuk melakukannya kita bisa buat sebuah method dengan nama `whereBelongsTo` di file controller `RelationController`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    ...

    public function whereBelongsTo()
    {
        $users = User::where('vip', true)->get();
        $posts = Post::whereBelongsTo($users)->get();
        return $posts;
    }
}
```

Setelah method di controller nya dibuat, sekarang kita siapkan route untuk menangani method tersebut. Kita bisa buat route nya di file `routes\web.php`

```php
Route::get('/relation/whereBelongsTo', [RelationController::class, 'whereBelongsTo']);
```

Sekarang kita bisa akses route dengan endpoint `/relation/whereBelongsTo` untuk menjalankan method `whereBelongsTo`. Jika kalian mencoba mengakses nya maka akan muncul data postingan dari user yang `vip` seperti gambar berikut ini

![Where Belongs To Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-where-belongs-to/where-belongs-to-via-web.png)
