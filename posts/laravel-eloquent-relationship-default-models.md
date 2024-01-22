---
published: true
title: "Laravel Eloquent - Relationship Default Models"
tag: "Programming"
date: "January 22 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship Default Models"
cover_image: "/images/posts/Laravel Eloquent - Relationship Default Models.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Setelah pada pemabahasan sebelumnya kita membuat relationship One to One dan juga One to Many beserta inverse relationship nya, sekarang kita akan membahas mengenai relationship default models. Apa itu relationship default models?

## Default Models

Pada Eloquent Relationship kita dapat menetapkan model default atau nilai default yang akan digunakan jika suatu relationship bernilai null. Dengan kata lain, jika relationship nya tidak menemukan data terkait, maka model default ini yang akan digunakan sebagai penggantinya.

Relationship `belongsTo`, `hasOne`, `hasOneThrough`, dan `morphOne` dapat mengizinkan kita untuk mendefinisikan sebuah default model yang akan dikembalikan jika relationship nya bernilai `null`. Pola ini juga sering disebut sebagai `Null Object pattern` dan dapat membantu menghilangkan pemeriksaan kondisional dalam kode kalian.

Untuk contoh nya, pada pembahasan relationship One to Many sebelumnya kita sudah mempunyai model `Post`, yang dimana model tersebut mempunyai kolom untuk menampung `foreign key` dari model `User`. Singkat nya kita dapat menyimpan author atau penulis dari postingan tersebut. Agar lebih terbayang kalian bisa lihat gambar dibawah ini

![Inverse Relation Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-default-models/inverse-relation-design.png)

Pada contoh tersebut, inverse relationship dari model `Post` ke model `User` menggunakan method `user` akan mengembalikan nilai `null` jika tidak ada user yang dikaitkan ke model `Post`. Misalkan, kita buat data postingan baru dengan kolom `user_id` nya berisi `null` di `PostSeeder.php` seperti berikut ini

### Membuat Data Postingan Yang Tidak Memiliki User Id

> **Catatan**:
>
> Dikarenakan disini kita akan membuat sebuah data `null` pada kolom `user_id` di model `Post`, maka kita perlu menginzinkan kolom tersebut agar bisa di isikan dengan data kosong atau null. Untuk melakukannya kita bisa ubah attribute pada bagian kolom `user_id` di file migration `posts` nya agar men-chaning method `nullable`
>
> ```php
> public function up(): void
>    {
>        Schema::create('posts', function (Blueprint $table) {
>            $table->id();
>            $table->foreignId('user_id')->nullable();
>            ...
>        });
>    }
> ```

```php
<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'user_id' => null,
            'title' => "Testing Default Models Post",
            'slug' => 'testing-default-models-post',
            'excerpt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minima vel placeat facere natus debitis.',
            'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In inventore recusandae eum, illo vel facere voluptatem non architecto ut beatae culpa aliquam eos suscipit voluptate nemo esse hic dolores. Dignissimos vitae nisi qui, nemo tempora provident mollitia! Ratione voluptas tempora quasi iusto sapiente nihil deleniti at sed qui tenetur earum laboriosam dolor tempore, adipisci nam consequuntur amet excepturi blanditiis veritatis cum debitis, hic neque impedit dicta? Sunt quae placeat atque est, molestiae totam architecto dicta distinctio vitae quia? Doloribus aut consequuntur, rerum nesciunt ad earum saepe minus exercitationem commodi nemo, quae dolores temporibus? Dolor similique ab excepturi voluptates corrupti quo.'
        ]);

        Post::factory(20)->create();
    }
}
```

Selanjutnya kita bisa jalankan migartion nya menggunakan perintah artisan seperti berikut ini:

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya terdapat satu buah data postingan yang tidak memiliki `user_id` atau author nya seperti gambar dibawah ini

![Data Post With Null Id User](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-default-models/data-post-with-null-id-user.png)

## Inverse Relationship

### Membuat Method belongsTo

Setelah kita membuat data postingan khusus yang tidak mempunyai `user_id` atau author nya, sekarang kita buat atau definisikan untuk method inverse relationship nya dari model `Post` ke model `User` menggunakan method `user`. Method `user` tersebut harus memanggil method `belongsTo` dan mengembalikan nilai atau return value nya.

> **Catatan**:
>
> Untuk membuat default models, kita akan men-chaining method `withDefault` pada relationship nya kemudian kita dapat mengirimkan sebuah array atau closure pada argument method `withDefault` tersebut

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    ...

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Guest Author'
        ]);
    }
}
```

> **Catatan**:
>
> Seperti pada pembahasan diatas, untuk membuat default models kita men-chaning method `withDefault` dan mengirimkan sebuah array atau clsoure pada argument nya, berikut ini adalah contoh untuk versi mengirimkan sebuah array dan closure
>
> - Array
>
> ```php
> public function user(): BelongsTo
> {
>    return $this->belongsTo(User::class)->withDefault([
>        'name' => 'Guest Author',
>    ]);
> }
> ```
>
> - Closure
>
> ```php
> public function user(): BelongsTo
> {
>    return $this->belongsTo(User::class)->withDefault(function (User $user, Post $post) {
>        $user->name = 'Guest Author';
>    });
> }
> ```
>
> Kalian bebas ingin menggunakan cara mengirimkan sebuah array atau mengirimkan sebuah closure

### Mengakses atau Menjalankan Relation belongsTo

Setelah inverse relationship nya ditentukan, sekarang kita dapat mengambil data user atau author yang menulis postingan tertentu melalui model `Post` dengan cara mengakses "dynamic relationship property" seperti berikut ini

> **Catatan**:
>
> Seperti biasa kita akan gunakan tinker untuk mencoba nya

```php
$author = App\Models\Post::find(1)->user
```

Maka seharusnya perintah diatas akan me-return value dari default model yang sudah kita buat

```php
= App\Models\User {#5819
    name: "Guest Author",
  }
```

![Tinker Get Default Models](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-default-models/tinker-get-default-models.png)

Namun jika kita coba dengan data postingan yang memiliki `user_id` atau author nya maka seharusnya akan menampilkan data yang terkait dengan user nya

```php
$author = App\Models\Post::find(1)->user
```

```php
= App\Models\User {#6035
    id: 4,
    name: "Arsipatra Ardianto",
    username: "radit.astuti",
    email: "mustofa.diah@example.net",
    created_at: "2024-01-22 14:39:01",
    updated_at: "2024-01-22 14:39:01",
  }
```

![Tinker Get Author Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-default-models/tinker-get-author-post.png)

## Membuat Relation Default Model Agar Dapat Diakses Melalui Web

Seperti biasa kita akan buat agar default model tersebut bisa kita akses melalui web, pertama-tama kita buat terlebih dahulu method dengan nama `defaultModels` pada `RelationController`

```php
public function defaultModels(Request $request)
{
    $author = Post::find($request->id)->user;
    return $author;
}
```

Selanjutnya kita buat sebuah route dengan endpoint `/relation/defaultModels` dengan method `GET` untuk mengeksekusi method controller tersebut, untuk membuat route tersebut kita simpan di file `routes\web.php`

```php
Route::get('/relation/defaultModels', [RelationController::class, 'defaultModels']);
```

- Default Models

![Default Models Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-default-models/default-models-via-web.png)

- Author Post

![Author Post Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-default-models/author-post-via-web.png)
