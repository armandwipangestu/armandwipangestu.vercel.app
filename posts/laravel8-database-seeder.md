---
published: true
title: "Laravel 8 - #9 - Database Seeder"
tag: "Programming"
date: "December 26 2023"
excerpt: "Pada pembahasan kali ini kita akan membahas sesuatu feature yang tidak kalah keren pada Laravel yaitu Seeder"
cover_image: "/images/posts/Laravel 8 - Database Seeder.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Seperti yang kita tau, dari beberapa pembahasan sebelumnya jika kita ingin menambahkan data pada aplikasi kita, kita menggunakan sebuah fitur yang namanya tinker. Nah, sebetulnya hal tersebut tidak ada masalah untuk menambahkan beberapa data kedalam aplikasi kita melalui terminal karena kita belum masuk kedalam materi CRUD melalui form input, hal tersebut ketika ingin menambahkan 2, 3, 4 atau 5 data masih oke. Namun, bayangkan jika ingin menambahkan 20 atau 30 data post, mungkin hal tersebut akan cukup merepotkan jika melalui tulis secara manual melalui tinker.

Atau dalam kasus kita kali ini adalah masih dalam tahap pengembangan atau development, tahap tersebut pastinya kita sering mengubah-ubah skema dari tabel kita seperti menambah field baru atau menghapus field yang sudah ada didalam database atau ingin menambahkan relasi. Pastinya tabel tersebut masih sering kita ubah dan kita harus melakukan yang namanya `migration` yang artinya database kita akan kembali kosong lagi dan memulai nya kembali dari awal sehingga jika ingin menambahkan data lagi kita perlu membuka tinker dan mengisikan data nya kembali satu per-satu. Hal tersebut lah baru terasa sangat merepotkan, lantas bagaimana cara mengatasinya?

Untuk mengatasinya tenang, karena pada Laravel terdapat fitur untuk mempermudah hal tersebut, nama fitur tersebut adalah `Seeder` dan juga `Factory`. Feature tersebut nantinya akan mempermudah kita mempopulasi (istilah nya) atau mengisikan data secara otomatis ketika kita melakukan `migration`, sehingga ketika kita melakukan migration, maka di tabel nya akan otomatis terdapat isi nya dan tidak perlu lagi repot-repot melakukan insert data satu per-satu secara manual.

Untuk pendahuluan sebelum masuk kedalam seeder, disini kita benarkan dan tambahkan beberapa UI pada tampilan blog kita seperti menghilangkan garis underline pada anchor link, kemudian menambahkan detail category dan sebagai nya. Kita mulai dari file view `posts.blade.php`, berikut adalah kode view nya

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-5">Halaman Blog Posts</h1>

    @foreach ($posts as $post)
        <article class="mb-5 border-bottom pb-4">
            <h2>
                <a href="/posts/{{ $post->slug }}" class="text-decoration-none">{{ $post->title }}</a>
            </h2>

            <h5>By: {{ $post->author }} in <a href="/categories/{{ $post->category->slug }}" class="text-decoration-none">{{ $post->category->name }}</a></h5>

            <p>{{ $post->excerpt }}</p>

            <a href="/posts/{{ $post->slug }}" class="text-decoration-none">Read more..</a>
        </article>
    @endforeach
@endsection
```

Kemudian file view `post.blade.php`

```php
@extends('layouts.main')

@section('container')
    <article>
        <h2>{{ $post->title }}</h2>

        <h5>By: {{ $post->author }} in <a href="/categories/{{ $post->category->slug }}" class="text-decoration-none">{{ $post->category->name }}</a></h5>

        {!! $post->body !!}
    </article>

    <a href="/posts">Back to Posts</a>
@endsection
```

File view `categories.blade.php`

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-5">Post Categories</h1>

    @foreach ($categories as $category)
        <ul>
            <li>
                <h2>
                    <a href="/categories/{{ $category->slug }}" class="text-decoration-none">{{ $category->name }}</a>
                </h2>
            </li>
        </ul>
    @endforeach
@endsection
```

dan yang terakhir file `category.blade.php`

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-5">Post Category : {{ $category }}</h1>

    @foreach ($posts as $post)
        <article class="mb-5">
            <h2>
                <a href="/posts/{{ $post->slug }}" class="text-decoration-none">{{ $post->title }}</a>
            </h2>
            <h5>By: {{ $post->author }}</h5>
            <p>{{ $post->excerpt }}</p>
        </article>
    @endforeach
@endsection
```

Fitur selanjutnya kita akan buat juga agar tulisan author nya bisa di klik seperti tulisan category nya, sehingga kita perlu membuat relasi antar model Post dan juga model User. Oleh karena itu kita tambahkan pada skema model post nya agar menyimpan atau memuat foreign key `user_id` dari tabel User di file migration nya

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id');
        $table->foreignId('user_id');
        $table->string('title');
        $table->string('slug')->unique();
        $table->string('author');
        $table->text('excerpt');
        $table->text('body');
        $table->timestamp('publish_at')->nullable();
        $table->timestamps();
    });
}
```

Sekarang problem nya adalah kita harus melakukan migration lagi, dengan melakukan hal tersebut lagi-lagi akan mengosongkan tabel kita. Sekarang apakah kalian sudah merasa kesal? karena dari pembahasan sebelumnya kita sudah melakukan hapus tabel, buat lagi dan seterusnya bukan? Nah, karena memang kita masih dalam proses development, maka sangat wajar bukan banyaknya perubahan yang terjadi? Nah, pada tahap inilah kita butuh yang namanya `Seeder`. Sekarang kita lakukan migaration nya terlebih dahulu

```php
php artisan migrate:fresh
```

## Apa itu Seeder?

Seeding ini jika saya terjemahkan itu seperti kita menyemai benih, karena `seed` ini benih atau biji. Jadi ceritanya kita bisa mengisi otomatis tabel kita ketika kita buat, sehingga seperti kita memanen tabel nya.

Jika dikutip dari dokumentasi resmi Laravel nya "Laravel memiliki kemampuan untuk melakukan seed didalam database kita dengan data `testing` dengan cara menggunakan class `Seed`. Sehingga tiap model itu kita bisa bikin class seed nya dan nantinya disimpan kedalam folder `database/seeders`. Secara default, kita sudah diberikan sebuah seeder yang namanya `DatabaseSeeder`, yang nantinya kita bisa gunakan untuk menjalankan proses seeding nya dari class-class atau model-model yang lain."

### Cara Membuat atau Menulis Seeder

Untuk men-generate sebuah seeder, kalian bisa jalankan perintah artisan `make:seeder`. Semua seeder yang di-generate oleh framework akan disimpan di folder `database/seeders`

```php
php artisan make:seeder NamaSeeder
```

Berikut adalah contoh isi dari class bawaan `DatabaseSeeder` yang sudah ada pada framework Laravel dan menambahkan sebuah statement database insert pada method `run`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
```

### Menggunakan Model Factories

Kita juga bisa membuat seeder dengan `Factories`, sehingga seakan-akan kita membuat pabrik pembuat data untuk melakukan seeding nya secara otomatis. Misalkan, membuat 50 user yang masing-masing nya memiliki satu buah postingan terkait

```php
use App\Models\User;

/**
 * Run the database seeders.
 *
 * @return void
 */
public function run()
{
    User::factory()
            ->count(50)
            ->hasPosts(1)
            ->create();
}
```

Atau jika kita ingin membuat seeding nya satu-persatu, misalkan User membuat seeding sendiri, Post membuat seeding sendiri dan seterusnya

```php
/**
 * Run the database seeders.
 *
 * @return void
 */
public function run()
{
    $this->call([
        UserSeeder::class,
        PostSeeder::class,
        CommentSeeder::class,
    ]);
}
```

### Menjalankan Seeder

Setelah menyiapkan skema seeding nya, selanjutnya kita perlu eksekusi agar data nya tersimpan pada database menggunakan perintah artisan

> **Catatan**:
>
> Secara default perintah `db:seed` akan menjalankan class `Database\Seeders\DatabaseSeeder`, yang pada gilirannya dimana dapat memanggil class seed lainnya

```php
php artisan db:seed
```

Jika kalian hanya ingin men-spesifikan class seeder mana yang ingin dieksekusi atau secara individual, kalian bisa menggunakan option `--class`

```php
php artisan db:seed --class=UserSeeder
```

### Mencoba Seeder

Kita bisa mencoba database seeder dengan simpel, kalian bisa buka file `DatabaseSeeder.php` kemudian uncomment agar isian dari method `run` nya bisa dieksekusi

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
    }
}
```

Sekarang kita bisa jalankan seeder nya dengan perintah artisan

```php
php artisan db:seed
```

Maka akan muncul output tulisan

```php
Database seeding completed successfully.
```

Dan jika kita lihat menggunakan tinker data di tabel user, maka sekarang akan muncul 10 data random

```php
User::all();
```

```php
[!] Aliasing 'User' to 'App\Models\User' for this Tinker session.
= Illuminate\Database\Eloquent\Collection {#7096
    all: [
      App\Models\User {#7097
        id: 1,
        name: "Prof. Nels Buckridge",
        email: "reinger.terrell@example.com",
        email_verified_at: "2023-12-26 01:50:54",
        #password: "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        #remember_token: "HlsdfsMUsv",
        created_at: "2023-12-26 01:50:55",
        updated_at: "2023-12-26 01:50:55",
      },
      App\Models\User {#7098
        id: 2,
        ...
      },
      App\Models\User {#7099
        id: 3,
        ...
      },
      App\Models\User {#7100
        id: 4,
        ...
      },
      App\Models\User {#7101
        id: 5,
        ...
      },
      App\Models\User {#7102
        id: 6,
        ...
      },
      App\Models\User {#7103
        id: 7,
        ...
      },
      App\Models\User {#7104
        id: 8,
        ...
      },
      App\Models\User {#7105
        id: 9,
        ...
      },
      App\Models\User {#7106
        id: 10,
        ...
      },
    ],
  }
```

Hal tersebut kita sudah melakukan seeding dengan bantuan factory, yang dimana terdapat sebuah feature untuk mengenerate 10 data palsu untuk dimasukan kedalam tabel kita. Keren banget bukan? tapi sekarang kita akan coba terlebih dahulu secara manual, maka kita hapus kembali data nya dengan cara migrate ulang

```php
php artisan migrate:fresh
```

Kemudian kasih komentar kembali isian dari method `run` di file `DatabaseSeeder.php` nya

```php
public function run()
{
    // \App\Models\User::factory(10)->create();
}
```

### Implementasi Seeding

Nah sekarang kita akan melakukan seeding secara manual, cara kita tulis apa yang kita ketikan didalam tinker di pembahasan sebelumnya seperti

```php
Post::create([])
```

Nah hal tersebut yang dilakukan didalam tinker, kita lakukan didalam seeding sekarang

```php
public function run()
{
    // \App\Models\User::factory(10)->create();

    User::create([
        'name' => 'Arman Dwi Pangestu',
        'email' => 'armandwi.pangestu7@gmail.com',
        'password' => bcrypt('12345')
    ]);

    Category::create([
        'name' => 'Web Programming',
        'slug' => 'web-programming'
    ]);

    Category::create([
        'name' => 'Personal',
        'slug' => 'personal'
    ]);

    Post::create([
        'title' => 'Judul Pertama',
        'slug' => 'judul-pertama',
        'excerpt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sed quis, perferendis adipisci placeat, quidem rem mollitia quam voluptate, excepturi voluptas soluta quos. Officiis similique nihil unde quibusdam, iste quae cupiditate iure maxime! Fugiat doloremque dignissimos adipisci omnis saepe rem possimus tenetur! Voluptates omnis eaque facere architecto asperiores a odio illo nemo quam alias repellat praesentium aspernatur, soluta voluptate sapiente doloremque minus quisquam dolores. Voluptate sit blanditiis odio quos. Ipsa error nam distinctio! Illo voluptatibus, quia tempore eos fuga vero consequatur libero fugiat enim consectetur facilis sint corporis delectus illum, eius nemo tempora dolor iusto eligendi rem eum veritatis. Voluptatibus?',
        'category_id' => 1,
        'user_id' => 1
    ]);

    Post::create([
        'title' => 'Judul Kedua',
        'slug' => 'judul-kedua',
        'excerpt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sed quis, perferendis adipisci placeat, quidem rem mollitia quam voluptate, excepturi voluptas soluta quos. Officiis similique nihil unde quibusdam, iste quae cupiditate iure maxime! Fugiat doloremque dignissimos adipisci omnis saepe rem possimus tenetur! Voluptates omnis eaque facere architecto asperiores a odio illo nemo quam alias repellat praesentium aspernatur, soluta voluptate sapiente doloremque minus quisquam dolores. Voluptate sit blanditiis odio quos. Ipsa error nam distinctio! Illo voluptatibus, quia tempore eos fuga vero consequatur libero fugiat enim consectetur facilis sint corporis delectus illum, eius nemo tempora dolor iusto eligendi rem eum veritatis. Voluptatibus?',
        'category_id' => 1,
        'user_id' => 1
    ]);

    Post::create([
        'title' => 'Judul Ketiga',
        'slug' => 'judul-ketiga',
        'excerpt' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sed quis, perferendis adipisci placeat, quidem rem mollitia quam voluptate, excepturi voluptas soluta quos. Officiis similique nihil unde quibusdam, iste quae cupiditate iure maxime! Fugiat doloremque dignissimos adipisci omnis saepe rem possimus tenetur! Voluptates omnis eaque facere architecto asperiores a odio illo nemo quam alias repellat praesentium aspernatur, soluta voluptate sapiente doloremque minus quisquam dolores. Voluptate sit blanditiis odio quos. Ipsa error nam distinctio! Illo voluptatibus, quia tempore eos fuga vero consequatur libero fugiat enim consectetur facilis sint corporis delectus illum, eius nemo tempora dolor iusto eligendi rem eum veritatis. Voluptatibus?',
        'category_id' => 2,
        'user_id' => 1
    ]);
}
```

Nah sekarang kita sudah membuat seed nya secara manual semuanya, tapi meskipun manual ini sudah tersimpan didalam `DatabaseSeeder`, sehinnga jika kita butuhin kita tinggal jalankan saja perintah artisan `db:seed` nya.

```php
php artisan db:seed
```

Maka sekarang data user, post dan category nya sudah masuk kedalam database setelah migration (tidak perlu lagi isi melalui tinker).

Perlu di-ingat, jika kita menjalankan kembali perintah diatas `db:seed` maka akan muncul error, karena seed ini akan menambahkan data nya kembali sedangkan pada file migration kita terdapat sebuah field yang `uniqe` seperti field `email` pada model user dan field `slug` pada model post. Lantas bagaimana jika terdapat perubahan pada file seeder nya tapi tetap ingin menjalankan perintah `db:seed` nya? Kalian bisa jalankan perintah berikut ini untuk melakukan `migrate:fresh` sekaligus `seeding`.

```php
php artisan migrate:fresh --seed
```

## Fitur Tulisan Author Post

Nah, sekarang jika kalian ingin menjalankan fitur tulisan author post agar seperti category, kita bisa mulai ubah dari file view `posts.blade.php`

```php
<h5>By: <a href="#">{{ $post->user->name }}</a> ... </h5>
```

Namun, jika kita mencoba menjalankan nya akan muncul error bahwa property `name` tersebut tidak ada.

![Error Property Name](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-seeder/error-property-name.png)

Hal tersebut terjadi karena didalam instance `$post` nya belum ada user nya, jika kalian ingat kita hanya baru saja menghubungkan model antara postingan kita dengan category sedangkan kita belum mempunyai hubungan antara model postingan dengan model user nya. Jika kalian membuka file model `Post.php` nya maka bisa kalian lihat hanya terdapat method `category`

```php
public function category()
{
    return $this->belongsTo(Category::class);
}
```

Nah jika ingin menghubungkan nya juga dengan model User, kita bikin juga method `user`

```php
public function user()
{
    return $this->belongsTo(User::class);
}
```

Setelah itu, kita sekarang buat relasi di model `User.php` nya

```php
public function posts()
{
    return $this->hasMany(Post::class);
}
```

Maka sekarang akan view `posts` nya akan berjalan

![View Posts Users](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/database-seeder/view-posts-users.png)

Nah sekarang kita perbaiki pada view single post nya di file `post.blade.php`

```php
<h5>By: <a href="#" class="text-decoration-none">{{ $post->user->name }}</a> ... </h5>
```
