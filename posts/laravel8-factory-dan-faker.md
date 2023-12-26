---
published: true
title: "Laravel 8 - #10 - Factory dan Faker"
tag: "Programming"
date: "December 27 2023"
excerpt: "Pada pembahasan kali ini kita akan membahas sesuatu yang tidak kalah menarik yaitu Factory dan Faker pada Laravel, feature tersebut akan sangat berguna jika kita sedang mendevelop sesuatu yang berhubungan dengan dummy data."
cover_image: "/images/posts/Laravel 8 - Factory dan Faker.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan kali ini kita akan melanjutkan materi mengenai seeding pada database kita, kali ini kita akan belajar mengenai feature factory yang ada di Laravel. Feature factory ini nantinya akan kita gunakan ketika kita ingin membuat banyak data sekaligus secara otomatis untuk nanti nya sebagai data didalam seeder kita. Kalo sebelumnya kita melakukan insert data secara satu per-satu didalam file seeder nya. Nah, nantinya juga kita akan menggunakan library tambahan yang dinamakan `faker` untuk membuat data kita otomatis terisi dengan data palsu atau data dummy yang masuk akal secara random, sehingga nantinya kita tidak perlu lagi memikirkan data apa yang akan kita masukan sebagai seeder nya.

## Apa itu Factories?

Pertama-tama kita bicara terlebih dahulu mengenai Eloquent model factories. Pada saat pengujian kita mungkin saja atau bahkan pasti butuh menambahkan data baru kedalam database kita sebelum menjalankan test. Dari pada melakukanny secara manual mengetikan setiap data, setiap kolom nya ketika membuat sebuah data dummy. Nah, Laravel itu memungkinkan kita untuk mendifinisikan sebuah factories kedalam model kita (sehingga setiap model kita mempunyai factories nya sendiri).

Bagaimana cara kerja nya? kalian bisa lihat di UserFactory di file `database/factories/UserFactory.php`

```php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
```

Jika kalian lihat isian dari method `definition` diatas, kita sama-sama merancang skema seperti di file Seeder pada pembahasan sebelumnya.

### Cara Membuat Factories

Untuk membuat sebuah factory, kalian bisa jalankan perintah artisan berikut ini

```php
php artisan make:factory NamaFactory
```

File factory baru akan disimpan di folder `database/factories`

### Menjalankan Factories Untuk Model User

> **Catatan**:
>
> Sebelum membuat factories untuk model post, kita setting terlebih dahulu agar `faker` nya berubah menjadi locale indonesia dengan cara pergi ke file `config/app.php`
>
> ```php
> 'faker_locale' => env('FAKER_LOCALE', 'en_US'),
> ```
>
> Selanjutnya kita buat variabel `FAKER_LOCALE` di file `.env` kita
>
> ```php
> FAKER_LOCALE=id_ID
> ```

Sekarang kita berikan komtentar pada bagian yang membuat data user di file `DatabaseSeeder.php`

```php
User::create([
    'name' => 'Arman Dwi Pangestu',
    'email' => 'armandwi.pangestu7@gmail.com',
    'password' => bcrypt('12345')
]);

User::create([
    'name' => 'Sandhika Galih',
    'email' => 'sandhikagalih@gmail.com',
    'password' => bcrypt('54321')
]);
```

Selanjutnya kita tambahkan kode berikut ini agar membuat data user nya menggunakan factory

```php
User::factory(5)->create();
```

Setelah factory nya siap, sekarang kita lakukan `migrate:fresh --seed`

```php
php artisan migrate:fresh --seed
```

Maka sekarang didalam database kalian akan tersimpan 5 data user dengan format indonesia

```php
[!] Aliasing 'User' to 'App\Models\User' for this Tinker session.
= Illuminate\Database\Eloquent\Collection {#7091
    all: [
      App\Models\User {#7092
        id: 1,
        name: "Carla Karen Zulaika",
        email: "kusmawati.umi@example.net",
        email_verified_at: "2023-12-26 11:57:02",
        #password: "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        #remember_token: "lgQLdpsJib",
        created_at: "2023-12-26 11:57:02",
        updated_at: "2023-12-26 11:57:02",
      },
      ...
      App\Models\User {#7096
        id: 5,
        name: "Anita Andriani",
        email: "zamira.prasetyo@example.org",
        email_verified_at: "2023-12-26 11:57:02",
        #password: "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        #remember_token: "19EWkbjJPf",
        created_at: "2023-12-26 11:57:02",
        updated_at: "2023-12-26 11:57:02",
      },
    ],
  }
```

### Membuat Factories Untuk Model Post

Untuk membuat nya kalian bisa jalankan perintah artisan berikut ini

> **Catatan**: Tips artisan
>
> Jika kalian sudah terbiasa dengan membuat model, migration, factory dan seeder menggunakan perintah artisan. Kalian bisa membuat nya semua secara sekaligus, misalkan jika ingin membuat model `Student` dan kalian mungkin kedepannya membutuhkan file migration, factory dan seeder nya. Nah, kalian bisa jalankan perintah artisan `make:model` namun disertai dengan flag atau option nya seperti berikut ini
>
> ```php
> php artiasn make:model Student -mfs
> ```

```php
php artisan make:factory PostFactory
```

Setelah factory untuk post dibuat, sekarang kita definisikan skema factory untuk model data post nya pada bagian method `definition`

```php
public function definition()
{
    return [
        'title' => $this->faker->sentence(mt_rand(2, 8)),
        'slug' => $this->faker->slug(),
        'excerpt' => $this->faker->paragraph(),
        'body' => $this->faker->paragraph(mt_rand(5, 10)),
        'user_id' => 1,
        'category_id' => 1
    ];
}
```

Selanjutnya kalian berikan komentar atau hapus kode untuk membuat data post nya di file `DatabaseSeeder.php`

```php
Post::create([
    'title' => 'Judul Pertama',
    'slug' => 'judul-pertama',
    ...
]);

Post::create([
    'title' => 'Judul Ke Dua',
    'slug' => 'judul-ke-dua',
    ...
]);

Post::create([
    'title' => 'Judul Ke Tiga',
    'slug' => 'judul-ke-tiga',
    ...
]);

Post::create([
    'title' => 'Judul Ke Empat',
    'slug' => 'judul-ke-empat',
    ...
]);
```

Setelah itu, kalian tambahkan kode berikut ini di file `DatabaseSeeder.php` nya, agar factory yang sudah kita buat sebelumnya dapat berjalan

```php
Post::factory(20)->create();
```

Setelah factory Post nya siap dan dijalankan pada file seeder nya, sekarang kita lakukan `migrate:fresh --seed`

```php
php artisan migrate:fresh --seed
```

Maka sekarang akan tersimpan 20 data post dummy pada database kalian

```php
[!] Aliasing 'Post' to 'App\Models\Post' for this Tinker session.
= Illuminate\Database\Eloquent\Collection {#7106
    all: [
      App\Models\Post {#7107
        id: 1,
        category_id: 1,
        user_id: 1,
        title: "Laudantium ipsa.",
        ...
      },
      ...
      App\Models\Post {#7126
        id: 20,
        category_id: 1,
        user_id: 1,
        title: "Illum omnis inventore maiores culpa.",
        ...
      },
    ],
  }
```

Jika kita mengjungi route `posts` di web nya juga, maka akan muncul data-data post dummy tersebut seperti di gambar berikut ini

![Post Factory Faker](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/factory-dan-faker/post-factory-faker.png)

Sekarang, apabila kalian sadar, author dan category nya ternyata sama semua bukan? itu terjadi karena kita mendefinisikan `user_id` dan `category_id` pada factory nya secara statis yaitu diisi dengan angka `1`

```php
public function definition()
{
    return [
        ...
        'user_id' => 1,
        'category_id' => 1
    ];
}
```

Nah, cara mengatasi nya cukup agak tricky agar id foreign key tersebut menjadi dinamis menggunakan method random juga, namun masalahnya kurang bisa dinamis karena kita tidak tahu user nya bakalan ada berapa. Contoh disini kita akan bikin user nya 3 saja dan category nya 2 saja, sehingga kita bisa lakukan seperti ini

```php
public function definition()
{
    return [
        'title' => $this->faker->sentence(mt_rand(2, 8)),
        'slug' => $this->faker->slug(),
        'excerpt' => $this->faker->paragraph(),
        'body' => $this->faker->paragraph(mt_rand(5, 10)),
        'user_id' => mt_rand(1, 3),
        'category_id' => mt_rand(1, 2)
    ];
}
```

Jika user_id nya kita definisikan random dari 1 - 3, maka kita perlu sesuaikan pada file `DatabaseSeeder.php` nya agar user yang dibuat hanya 3 user.

```php
User::factory(3)->create();
```

Sekarang kita lakukan `migrate:fresh --seed`

```php
php artisan migrate:fresh --seed
```

Maka sekarang author dan category nya akan berbeda-beda sesuai dengan method `mt_rand` atau math random tersebut

![Post Factory Faker Random](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/factory-dan-faker/post-factory-faker-random.png)

## Sorting Post Berdasarkan Paling Terbaru

Sekarang kita bisa lakukan sorting postingan berdasarkan paling terbaru (saat ini postingan tersebut di sorting berdasarkan urutan `id` post nya). Untuk melakukannya, kalian bisa pergi ke file controller `PostController.php`

```php
public function index()
{
    return view('posts', [
        "title" => "Posts",
        // "posts" => \App\Models\Post::all()
        "posts" => \App\Models\Post::latest()->get()
    ]);
}
```

Sekarang jika kalian pergi melihat view atau route `posts` nya, maka tidak akan ada perubahan urutan postigan nya karena masing-masing data yang dibuat sebelumnya menggunakan factory dan faker tersebut dibuat diwaktu yang bersamaan pada field `created_at`. Untuk mencoba apakah fitur sorting nya bekerja, kita bisa membuat 5 postingan baru pada seeder nya tetapi tidak semua perintah dijalankan

```php
// User::factory(3)->create();

// Category::create([
//     'name' => 'Web Programming',
//     'slug' => 'web-programming'
// ]);

// Category::create([
//     'name' => 'Personal',
//     'slug' => 'personal'
// ]);

Post::factory(5)->create();
```

Setelah disiapkan, sekarang kita jalankan perintah artisan nya (tanpa `migrate:seed` agar data sebelumnya tidak hilang)

```php
php artisan db:seed
```

Maka sekarang urutan postingan nya tampil berdasarkan yang paling terbaru dari hitungan field `created_at` nya

![Post Sort By Newest](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/factory-dan-faker/post-sort-by-newest.png)

![Data Post Latest](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/factory-dan-faker/data-post-latest.png)

## Feature Author

Sebetulnya tujuan kita itu membuat feature author, namun kita malah membahas factory dan faker :D. Untuk membuat feature author sebetulnya sama seperti pembuatan feature category. Sekarang kita bisa pergi ke file routes nya `web.php` kemudian tambahkan route baru

```php
Route::get('/authors/{user}', function (User $user) {
    return view('posts', [
        'title' => 'User Posts',
        'posts' => $user->posts(),
    ]);
});
```

Sekarang kita arahkan anchor dari author nya agar mengarah ke route yang sudah kita buat di file `posts.blade.php`

```php
<h5>By: <a href="/authors/{{ $post->user->id }}" class="text-decoration-none">{{ $post->user->name }}</a> ... </h5>
```

Maka sekarang jika kalian klik pada tulisan author nya, akan berpindah ke routes `/authors/{id}` kemudian muncul postingan-postingan blog berdasarkan user yang membuatnya

![Feat Authors](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/factory-dan-faker/feat-authors.png)

Jika kalian sadar, sekarang route wildcard nya menggunakan `id` yang dimana kurang bagus karena bisa ditebak berdasrkan angka nya. Bagaimana cara mengatasi nya? kita harus mencari field yang lain yang representatif atau uniqe, jika kita lihat pada file migration user nya, pada skema model tersebut terdapat field `name`, field tersebut tidak bisa kita gunakan karena dia tidak uniqe, oleh karena itu tidak bisa karena untuk menerapkan route model binding itu harus unique.

Alternative lain kita bisa gunakan field `email` namun akan aneh bukan pada tulisan routes atau url nya karena terdapat titik sehingga kurang tepat. Bagaimana jika kita buat sturuktur baru atau field baru yaitu `username`

```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('username')->unique();
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

Sebelum melakukan migration, kita benarkan terlebih dahulu factory user nya karena belum ada field `username` di file `UserFactory.php`

```php
public function definition()
{
    return [
        'name' => $this->faker->name(),
        'username' => $this->faker->unique()->userName(),
        'email' => $this->faker->unique()->safeEmail(),
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
}
```

Setelah itu kita perbaiki juga kode `DatabaseSeeder.php` nya karena sebelumnya kita berikan komentar

```php
User::factory(3)->create();

Category::create([
    'name' => 'Web Programming',
    'slug' => 'web-programming'
]);

Category::create([
    'name' => 'Personal',
    'slug' => 'personal'
]);

Post::factory(20)->create();
```

Sekarang semua nya sudah siap, kita lakukan `migrate:fresh --seed`

```php
php artisan migrate:fresh --seed
```

Sekarang kita benarkan routes dan anchor nya agar mengarah ke `username`

```php
Route::get('/authors/{user:username}', function (User $user) {
    return view('posts', [
        'title' => 'User Posts',
        'posts' => $user->posts(),
    ]);
});
```

```php
<h5>By: <a href="/authors/{{ $post->user->username }}" class="text-decoration-none">{{ $post->user->name }}</a> ... </h5>
```

Maka sekarang route authors nya sudah menggunakan `username`

![Routes Authors By Username](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/factory-dan-faker/routes-authors-by-username.png)

### Fix Feature Author Route Model Binding

Jika kalian sadar pada route authors yang sudah kita buat, pada route model binding nya kita memasukan `user` sedangkan konteks nya disini `author` bukan?

```php
Route::get('/authors/{user:username}', function (User $user) {
    return view('posts', [
        'title' => 'User Posts',
        'posts' => $user->posts(),
    ]);
});
```

Nah hal tersebut rasanya kurang tepat, sehingga bagusnya kita ganti agar menggunakan `author`

```php
Route::get('/authors/{author:username}', function (User $author) {
    return view('posts', [
        'title' => 'User Posts',
        'posts' => $author->posts(),
    ]);
});
```

Selanjutnya method yang dipanggil pada view `posts.blade.php` namanya adalah `user`

```php
<a href="/authors/{{ $post->user->username }}" ...
```

Nah jika kita ingin mengubah agar nama method nya menjadi `author`, kita bisa ubah dibagian model Post nya

```php
class Post extends Model
{
    ...

    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
```

Namun hal tersebut akan menjadi error karena nantinya Laravel akan mengecek apakah ada di tabel post yang field nya bernama `author_id` sebagai foreign key nya, sedangkan yang ada itu adalah field yang bernama `user_id`. Nah jika kita ingin mengganti menjadi author kita ubah menjadi seperti berikut ini

```php
class Post extends Model
{
    ...

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
```

Selanjutnya kita ubah kode di sisi view nya agar menggunakan nama method `author` yang sudah kita ganti pada model Post nya

```php
<h5>By: <a href="/authors/{{ $post->author->username }}" ...>{{ $post->author->name }}</a> ...</h5>
```

Maka sekarang feature author nya sudah lebih optimal dengan penyesuaian nama sesuai konteks di wildcard pada route model binding dan nama method yang digunakan.

## Penutup

Itulah pembahasan mengenai factory dan juga faker yang bisa kita gunakan untuk men-generate data dalam seeder kita. Mudah-mudahan kalian paham dengan penjelasannya dan kedepannya semoga kalian bisa dengan mudah melakukan seeding pada database kalian, walaupun kalian tetap harus mengubah-ngubah skema database nya namun minimal isi atau record data nya sudah bisa kita generate secara otomatis.
