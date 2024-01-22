---
published: true
title: "Laravel Eloquent - Relationship One to Many"
tag: "Programming"
date: "January 22 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship untuk tipe One to Many atau hasMany"
cover_image: "/images/posts/Laravel Eloquent - Relationship One to Many.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Setelah pada pembahasan sebelumnya kita membahas relationship One to One atau `hasOne` dan relationship invers nya yaitu `belongsTo`, pada pembahasan kali ini kita akan membahas relationship One to Many atau `hasMany`.

## One to Many

Sebuah relationship one-to-many digunakan untuk mendefinisikan hubungan dimana satu model adalah parent atau induk dari satu atau lebih model turunan. Misalnya, sebuah postingan blog mungkin memiliki jumlah comment atau komentar yang tidak terbatas. Agar lebih jelas atau terbayang mengenai relationship antar model `Post` dan `Comment` tersebut kalian bisa lihat gambar dibawah ini

> **Catatan**: Tips
>
> Seperti pada semua Eloquent Relationship, relationship one-to-many juga di definisikan melalui sebuah method pada model Eloquent

![Design Model Post and Model Comment](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/design-model-post-and-model-comment.png)

### Model Post

Untuk membuat sebuah relationship dengan studi kasus satu postingan blog memiliki jumlah komentar yang tidak terbatas, kita perlu membuat model, migration, factory dan seeder nya terlebih dahulu. Kita bisa mulai membuat dari model `Post` beserta migartion, factory dan seeder nya secara sekaligus menggunakan perintah artisan berikut ini:

> **Catatan**: Tips
>
> Flag atau option `-mfs` disini artinya kita buat model sekaligus `migration`, `factory`, dan juga `seeder` nya

```shell
php artisan make:model -mfs Post
```

Selanjutnya kita ubah file model `Post` nya di `app\Models\Post.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

#### Migration Post

Sekarang kita sesuaikan kode migration nya agar kolom dari tabel `posts` nya sesuai dengan design yang sudah saya buat, file migration tersebut berada di `database\migration\2024_01_22_072537_create_posts_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->text('body');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

#### Factory Post

Selanjutnya kita siapkan data dummy untuk model `Post` tersebut menggunakan faker di file factory `database\factories\PostFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => mt_rand(1, 5),
            'title' => fake()->sentence(mt_rand(2, 8)),
            'slug' => fake()->slug(),
            'excerpt' => fake()->paragraph(),
            'body' => collect(fake()->paragraphs(mt_rand(5, 10)))
                ->map(fn ($p) => "<p>$p</p>")
                ->implode('')
        ];
    }
}
```

#### Seeder Post

Setelah factory faker nya sudah siap, sekarang kita eksekusi pembuatan data dummy nya di file `database\seeders\PostSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory(20)->create();
    }
}
```

Jangan lupa kita panggil class `PostSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

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
            PhoneSeeder::class,
            PostSeeder::class
        ]);
    }
}
```

Setelah semua nya siap, sekarang kita jalankan migration nya menggunakan perintah artisan berikut ini

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya sudah terbuat sebuah tabel baru dengan nama `posts` didalam database nya dengan isian kolom dan data dummy seperti berikut ini

| Column     | Data Type       |
| ---------- | --------------- |
| id         | bigint unsigned |
| user_id    | bigint unsigned |
| title      | varchar(255)    |
| slug       | varchar(255)    |
| excerpt    | text            |
| body       | text            |
| created_at | timestamp       |
| updated_at | timestamp       |

![Data Dummy Model Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/data-dummy-model-post.png)

### Model Comment

Setelah model `Post` siap, selanjutnya kita siapkan untuk model `Comment`, untuk membuat model, migration, factory dan seeder nya secara sekaligus kita bisa gunakan perintah artisan berikut ini:

```shell
php artisan make:model -mfs Comment
```

Selanjutnya kita ubah file model `Comment` nya di `app\Models\Comment.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

#### Migration Comment

Sekarang kita sesuaikan kode migration nya agar kolom dari tabel `comments` sesuai dengan design yang sudah saya buat, file migration tersebut berada di `database\migrations\2024_01_22_074358_create_comments_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id');
            $table->foreignId('user_id');
            $table->text('body');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
```

#### Factory Comment

Selanjutnya kita siapkan data dummy untuk model `Comment` tersebut menggunakan faker di file factory `database\factories\CommentFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'post_id' => mt_rand(1, 20),
            'user_id' => mt_rand(1, 5),
            'body' => fake()->paragraph()
        ];
    }
}
```

#### Seeder Comment

Setelah factory faker nya sudah siap, sekarang kita bisa eksekusi pembuatan data dummy nya di file `database\seeders\CommentSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        Comment::factory(40)->create();
    }
}
```

Jangan lupa kita panggil class `CommentSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

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
            PhoneSeeder::class,
            PostSeeder::class,
            CommentSeeder::class
        ]);
    }
}
```

Setelah semuanya siap, sekarang kita bisa jalankan migration nya menggunakan perintah artisan berikut ini:

```shell
php artisan migration:fresh --seed
```

Maka sekarang seharusnya sudah terbuat sebuah tabel baru dengan nama `comments` didalam database dengan isian kolom dan dummy data seperti berikut ini

| Column     | Data Type       |
| ---------- | --------------- |
| id         | bigint unsigned |
| post_id    | bigint unsigned |
| user_id    | bigint unsigned |
| body       | text            |
| created_at | timestamp       |
| updated_at | timestamp       |

![Data Dummy Model Comment](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/data-dummy-model-comment.png)

### Membuat Method hasMany

Setelah kita siapkan model, migration, factory dan seeder untuk masing-masing model yaitu `Post` dan `Comment`. Sekarang kita akan membuat method `hasMany` di parent model atau model `Post` agar membuat sebuah relationship one-to-many

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
```

Perlu kalian ingat, Eloquent akan secara otomatis menentukan kolom foreign key yang tepat untuk model `Comment`. Berdasarkan konvensi atau aturan Laravel, Eloquent akan mengambil nama "snake case" dari parent atau induk model dan menambahkan akhiran atau suffix nya dengan `_id`. Jadi, dalam contoh ini, Eloquent akan menganggap nama kolom dari foreign key post pada model `Comment` adalah `post_id`.

Setelah method relationship di definisikan, kita dapat mengakses collection atau kumpulan komentar terkait post nya dengan mengakses dynamic property `comments`. Ingat, karena Eloquent menyediakan "dynamic relationship properties", maka kita dapat mengakses relationship method tersebut seolah-olah method tersebut di definisikan sebagai properti pada model.

#### Mengakses atau Menjalankan Relation One to Many

Untuk mencoba nya seperti biasa kita bisa gunakan shell `tinker` dengan cara masuk terlebih dahulu kedalam shell nya menggunakan perintah berikut ini

```shell
php artisan tinker
```

Jika sudah didalam shell nya, sekarang kita bisa buat sebuah variabel dengan nama `comments` yang value nya adalah model `Post` yang men-chaining relationship method atau dynamic property nya

> **Catatan**: Tips
>
> Nama dari dynamic property Eloquent `comments` berikut ini adalah merepresentasikan nama relationship method yang ada di model `Post`

```php
$comments = App\Models\Post::find(1)->comments;
```

Maka seharusnya perintah diatas akan me-return value dari data komentar yang terkait dengan postingan nya

```php
= Illuminate\Database\Eloquent\Collection {#6034
    all: [
      App\Models\Comment {#6037
        id: 9,
        post_id: 1,
        user_id: 2,
        body: "Aut impedit occaecati aut ea et magnam. Aut tempora exercitationem impedit cumque possimus. Quasi commodi vero aut eos molestiae ea.",
        created_at: "2024-01-22 07:51:47",
        updated_at: "2024-01-22 07:51:47",
      },
      App\Models\Comment {#6038
        id: 19,
        post_id: 1,
        user_id: 5,
        body: "Consequuntur et iure aperiam. Numquam velit consequatur omnis dolorem quia omnis laborum. Dolore quia et sint unde nulla.",
        created_at: "2024-01-22 07:51:47",
        updated_at: "2024-01-22 07:51:47",
      },
    ],
  }
```

![Tinker Get Comment Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/tinker-get-comment-post.png)

Karena semua relationship juga berfungsi sebagai pembuat query, jika kalian ingin menambahkan atau memberikan batasan atau kondisi tertentu lebih lanjut pada query relationship tersebut, kalian bisa men-chaining nya seperti berikut ini

```php
$comment = Post::find(1)->comments()->where('title', 'foobar')->first();
```

### Format atau Aturan Penulisan

#### Foreign Key dan Primary Key

Sama seperti method `hasOne`, jika kalian ingin mengganti atau menggunakan nama lain dari column foreign key dan primary key yang digunakan sebagai relationship, kalian bisa menambahkan nya pada argument kedua dan ketiga di method `hasMany` nya seperti berikut ini:

```php
public function comments(): HasMany
{
    return $this->hasMany(Comment::class, 'foreign_key', 'local_key');
}
```

## Inverse Relationship

Setelah mendefinisikan relationship `hasMany` atau `One to Many` dari model `Post` ke model `Comment`, maka kita sekarang dapat mengakses model `Comment` secara langsung dari model `Post` dengan cara men-chaining method `comments` pada instance `Post`. Selanjutnya, kita akan tentukan relationship kebalikannya atau inverse dari model `Comment` ke model `Post`, relationship inverse tersebut nantinya memungkinkan kita dapat mengakses data post secara langsung melalui model `Comment`. Kita dapat mendefinisikan invers relationship dari method `hasMany` dengan menggunakan method `belongsTo`.

Agar lebih terbayang, kalian bisa lihat gambar dibawah ini mengenai relationship `hasMany` dari model `Post` ke model `Comment` dan `belongsTo` (inverse) dari model `Comment` ke model `Post`

![Invers Relation Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/invers-relation-design.png)

### Membuat Method belongsTo

Untuk membuat inverse relation nya, kita perlu membuat sebuah method dengan nama `post` di model `Comment`. Method `post` tersebut harus memanggil method `belongsTo` dan mengembalikan nilai atau return value nya.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
```

Pada contoh diatas, Eloquent akan beruasaha mencari model `Post` yang memiliki id yang cocok dengan kolom `post_id` pada model `Comment`.

Eloquent menentukan foreign key secara default dengan cara memeriksa nama relationship method nya dan menambahkan akhiran atau suffix `_` diikuti dengan nama kolom primary key nya pada parent atau induk model. Jadi, dalam contoh ini, Eloquent akan menganggap bahwa foreign key model `Post` di tabel `comments` adalah `post_id`

- `post` = nama method yang di definisikan pada model `Comment`
- `_` = otomatis ditambahkan oleh eloquent
- `id` = nama primary key yang ada di parent atau induk model yaitu `Post`

Namun seperti biasa, jika kalian tidak menggunakan aturan standar dari Laravel misalkan nama kolom dari foreign key dan primary key nya berbeda, kalian bisa menambahkannya pada argument keuda dan ketiga di method `belongsTo`

```php
public function post(): BelongsTo
{
    return $this->belongsTo(Post::class, 'foreign_key', 'owner_key');
}
```

#### Mengakses atau Menjalankan Relation belongsTo

Setelah inverse relationship ditentukan, sekarang kita dapat mengambil data postingan yang berada di parent atau induk model nya melalui model `Comment` dengan cara mengakses "dynamic relationship property" seperti berikut ini

> **Catatan**: Tips
>
> Kalian perlu melakukan restart session tinker nya dengan cara exit kemudian masuk kembali agar pembaruan kode yang sudah dilakukan dapat dijalankan

```php
$post = App\Models\Comment::find(1)->post
```

Maka seharusnya perintah diatas akan me-return value data postingan yang terkait dengan komentar nya

```php
= App\Models\Post {#6033
    id: 18,
    user_id: 3,
    title: "Natus at quibusdam voluptatum ipsam iusto dolorum maxime qui ea.",
    slug: "ipsa-dolor-excepturi-ut",
    excerpt: "Tempore commodi accusantium et assumenda dolor et aspernatur et. Quo quo ullam repellendus occaecati ab labore est natus. Velit labore totam praesentium aut quae distinctio aut.",
    body: "<p>Cum maiores ab non error et exercitationem. Soluta iure saepe omnis hic harum beatae natus. Qui harum accusamus quia incidunt incidunt autem.</p><p>Illum labore fugiat omnis ut voluptatem ut. Praesentium aut est enim laborum debitis et cumque ea. Ut numquam error odio quis.</p><p>Et voluptas nostrum ut doloribus. Laudantium nihil eum ducimus. Harum reiciendis perspiciatis quisquam est ad unde dolores. Magnam nam odit recusandae tempora illo eligendi. Libero esse alias aut veritatis quos.</p><p>Expedita totam qui non officia quasi necessitatibus quidem. Rerum est qui qui illo. Similique quasi ipsam cum cupiditate a aut. Velit qui consequuntur magnam ex dolor pariatur.</p><p>Quis eum pariatur quod sed vel. Quo vel nisi ab voluptatem. Iure perspiciatis voluptatum ipsum quia. Aut saepe vero hic distinctio ratione doloribus. Dolores at tempore ad odio autem.</p><p>Eos ipsum enim sunt error accusamus tempora. Odit tenetur repudiandae architecto ex error praesentium. Quisquam quidem delectus voluptatum neque est ad quaerat. Modi soluta quibusdam aut.</p><p>Architecto sunt aperiam aut et. Fugiat temporibus quo possimus sunt voluptate dicta. Pariatur quod eaque possimus cum nemo.</p><p>Aut et dolorem qui earum voluptatibus et eius. Suscipit molestiae modi reiciendis deleniti rem. Minus quas quam quia aut non.</p>",
    created_at: "2024-01-22 07:51:47",
    updated_at: "2024-01-22 07:51:47",
  }
```

![Tinker Get Post Comment](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/tinker-get-post-comment.png)

## Membuat Eloquent Relationship Agar Dapat Diakses Melalui Web

Seperti pada pembahasan One to One, kita sudah mempunyai sebuah controller khusus untuk membuat Eloquent Relationship yang sudah kita buat bisa diakses melalui web, kita bisa tambahkan 2 buah method yaitu `oneToMany` dan `oneToManyInverse` pada `RelationController`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Phone;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    ...

    public function oneToMany(Request $request)
    {
        $comments = Post::find($request->id)->comments;
        return $comments;
    }

    public function oneToManyInverse(Request $request)
    {
        $post = Comment::find($request->id)->post;
        return $post;
    }
}
```

Selanjutnya kita tambahkan routing untuk mengakses method controller tersebut di file `routes\web.php`

```php
Route::get('/relation/oneToMany', [RelationController::class, 'oneToMany']);
Route::get('/relation/oneToManyInverse', [RelationController::class, 'oneToManyInverse']);
```

- One to Many

![One to Many Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/one-to-many-via-web.png)

- One to Many (Inverse) / Belongs To

![One to Many Inverse Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-one-to-many/one-to-many-inverse-via-web.png)
