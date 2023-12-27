---
published: true
title: "Laravel 8 - #11 - N+1 Problem"
tag: "Programming"
date: "December 28 2023"
excerpt: "Pada pembahasan kali ini kita akan membahas sesuatu problem pada query database kita yang sangat berpengaruh terhadap performa aplikasi. Problem tersebut dinamakan N+1 Problem"
cover_image: "/images/posts/Laravel 8 - N1 Problem.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan sebelumnya kita telah berhasil melakukan relasi 3 tabel, yaitu tabel `posts`, `category` dan `users` untuk menampilkan post berdasarkan category dan post berdasarkan author atau penulisnya. Hal yang kita lakukan tersebut sebetulnya tidak ada masalah, bahkan sudah keren banget kita dapat dengan mudah menampilkan data dihalaman web kita. Nah, tapi kita sebetulnya itu melakukan hal yang sangat fatal dan akan berdampak pada performance aplikasi kita kedepannya.

Hal tersebut untuk saat ini mungkin belum terasa karena post yang kita punya masih belum banyak seperti 20 atau 25 post. Namun bagaimana jika nanti kedepannya aplikasi kita makin besar, post nya sudah banyak, penulis nya udah banyak semisal bisa sampai 200 post bahkan 2000 post. Nah, pada momen tersebut lah akan mulai terasa performance dari aplikasi kita pasti menurun.

Problem yang kita hadapi tersebut itu dinamakan dengan `N+1 Problem`, hal tersebut erat kaitannya dengan relasi serta query yang kita lakukan pada aplikasi kita. Nah apa itu `N+1 Problem`? dan bagaimana cara mengatasinya?

Sebelum membahas masalah dan cara mengatasi hal tersebut, disini kita perbaiki dulu view pada bagian category agar menampilkan detail deskripsi seperti author dan category nya seperti pada tampilan posts dan juga kita akan buat agar halaman category, author dan halaman posts mengarah pada view yang sama agar kita tidak perlu lagi membuat view untuk masing-masing route tersebut. Untuk melakukannya kita bisa jadikan file view `posts.blade.php` agar menjadi view dari ketiga route tersebut. Oleh karena itu sekarang kita bisa buka file routes `web.php` kemudian cari route yang mengarah category dan author agar mengarah ke view `posts`

```php
Route::get('/categories/{category:slug}', function(Category $category) {
    return view('posts', [
        'title' => $category->name,
        'posts' => $category->posts,
        'category' => $category->name
    ]);
});
```

Maka sekarang tampilan pada halaman category nya sudah terdapat deskripsi seperti author dan juga category pada setiap postingan nya. Selanjutnya kita tinggal buat agar heading dari view `posts` nya menjadi dinamis dengan cara menggunakan title yang dikirim pada route atau controller nya

```php
Route::get('/categories/{category:slug}', function(Category $category) {
    return view('posts', [
        'title' => "Post By Category: $category->name",
        'posts' => $category->posts,
    ]);
});

Route::get('/authors/{author:username}', function(User $author) {
    return view('posts', [
        'title' => "Post By Author: $author->name",
        'posts' => $author->posts,
    ]);
});
```

Kemudian file route controller post nya `PostController.php`

```php
public function index()
{
    return view('posts', [
        "title" => "All Posts",
        "posts" => \App\Models\Post::latest()->get()
    ]);
}
```

Selanjutnya kita ambil data `title` yang sudah dikirimkan dari route atau controller nya pada file view `posts.blade.php` agar digunakan di heading nya

```php
<h1 class="mb-5">{{ $title }}</h1>
```

## Apa itu N+1 Problem?

Inti dari `N+1 Problem` ini terjadi ketika aplikasi kita mengambil data dari database yang dimana di dalamnya kita melakukan yang namanya looping terhadap data kita (persis apa yang kita lakukan pada ketiga kasus kita). Nah yang terjadi adalah, kita akan melakukan pemanggilan kedalam database atau query nya berulang-ulang sehingga nantinya aplikasinya itu yang seharusnya hanya melakukan 2 query (query ke semua dan query ke data yang ada didalam nya) malah akan menambahkan `N` query (jadi akan banyak banget query nya).

### Contoh N+1 Problem

Nah contohnya seperti apa? kita coba lihat pada bagian route `/posts`, yang terjadi adalah kita menampilkan semua data postingan simpel banget yaitu hanya melakukan 1x kali query yaitu ambil semua data post `get()` lalu urutkan dari yang terbaru `latest()`

```php
return view('posts', [
    "title" => "All Posts",
    "posts" => Post::latest()->get()
]);
```

Atau jika pada raw SQL query nya adalah seperti berikut ini

```sql
SELECT * FROM posts
ORDER BY created_at DESC;
```

Hal tersebut sebetulnya tidak masalah, namun masalah nya terjadi adalah ketika kita melakukan looping pada view `posts.blade.php` nya

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-5">{{ $title }}</h1>

    @foreach ($posts as $post)
        ...
    @endforeach
@endsection
```

Ketika kita melakukan looping terhadap semua postingan `$posts` kita, kita membutuhkan tabel lain seperti `$post->author` dan `$post->category`. Nah, hal tersebut lah masalah nya, sehingga kita melakukan query lagi di dalam looping.

Problem nya adalah setiap kita melakukan query untuk mengecek author nya siapa maka program akan melakukan pemanggilan terhadap database. Hal tersebut seharusnya yang dilakukan hanya 3, yaitu

- Ambil semua postingan
- Ambil semua author
- Ambil semua category

Namun yang terjadi pada program kita saat ini ternyata tidak 3x, yang dilakukan adalah

- Ambil semua postingan 1x
- Setiap looping nya ambil penulis dan ambil category kemudian looping lagi

Bayangkan kita punya berapa postingan, misalkan 20 postingan. Nah, berarti ada 20x query yang dilakukan pada masing-masing tabel (20x ke tabel user + 20x ke tabel category) sehingga total query yang dilakukan adalah 40x.

Kelihatannya jika hanya 20 masih kecil dan rasanya belum terasa lambat pada aplikasi kita. Tapi bayangkan jika aplikasi nya sudah besar seperti blog nya sudah banyak yang nulis, postingan nya banyak yang nulis seperti ada 200 atau 2000, semakin lama query yang dilakukan akan semakin banyak.

Itulah yang disebut dengan `N+1 Problem` yang dimana terkadang kita tidak merasa melakukan itu karena waktu aplikasi nya kecil belum terasa. Namun, ketika data nya ribuan kenapa kok makin lama makin lambat, karena itulah yang terjadi.

Hal tersebut adalah by default pada Laravel nya, karena yang terjadi di Laravel nya ketika kita melakukan sebuah relationship seperti

```php
public function posts()
{
    return $this->hasMany(Post::class);
}

public function category()
{
    return $this->belongsTo(Category::class);
}

public function author()
{
    return $this->belongsTo(User::class, 'user_id');
}
```

Nah ketika kita melakukan looping pada view nya, Laravel itu melakukan apa yang disebut dengan `Lazy Loading` atau loading nya males sehingga ketika dibutuhkan baru dilakukan. Hal tersebut bisa jadi bagus, bisa jadi gk bagus ketika kasus nya seperti ini.

## Clockwork

Jika kita ingin melihat apakah yang kita lakukan itu benar-benar tidak efektif, kita bisa gunakan sebuah library yang namanya [clockwork](https://github.com/itsgoingd/clockwork). Clockwork tersebut adalah sebuah library yang bisa kita install kedalam aplikasi Laravel kita, yang nantinya akan kita hubungkan ke sebuah extension di browser untuk mengetahui sebenarnya aplikasi php kita itu melakukan pemanggilan query berapa kali untuk mengecek performance nya.

### Install Clockwork

Untuk menginstall clockwork nya kita bisa gunakan package manager `composer`

```php
composer require itsgoingd/clockwork
```

### Install Extension Browser

Sekarang kita install extension versi browser nya, disini saya menggunakan web browser google chrome

![Extension Browser Clockwork](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/extension-browser-clockwork.png)

Jika sudah berhasil di install, nanti extension ini akan muncul di developer tools nya jika kita membuka halaman yang dibikin menggunakan PHP

![Dev Tools Clockwork](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/dev-tools-clockwork.png)

### Melihat Performance Aplikasi

Sekarang kita bisa melihat performa aplikasi kita menggunakan extension clockwerk nya, kita pergi ke menu `Database`

![Total Queries](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/total-queries.png)

Bisa kalian lihat, terdapat `41` queries, bisa kalian lihat urutan query nya, yang pertama dilakukan adalah

> **Catatan**:
>
> `ORDER BY` disini karena kita menggunakan method `latest`

```sql
SELECT * FROM `posts` ORDER BY `created_at` DESC
```

Query tersebut untuk mengambil semua postingan, kemudian liat proses query setelah nya, kita melakukan looping sebanyak `20x` pada masing-masing tabel yang memiliki relasi hanya untuk mengambil data user dan data category.

```sql
SELECT * FROM `users` WHERE `users`.`id` = 1 LIMIT 1
SELECT * FROM `categories` WHERE `categories`.`id` = 2 LIMIT 1
...
```

Nah, hal tersebut bisa kita singkat supaya `N+1 Problem` nya tidak terjadi, karena yang kita lakukan itu hanya satu yaitu

```sql
SELECT * FROM `posts` ORDER BY `created_at` DESC
```

Sedangkan `N` nya itu adalah yang dibawah atau proses setelah query tersebut. Nah, bagaimana caranya kita melakukan sesuatu yang disebut dengan `Eager Loading` (kebalikan dari `Lazy Loading`). Jadi jika eager itu semangat sedangkan lazy itu malas, sehingga lazy itu lakukan ketika dibutuhkan sedangkan eager lakukan semua diawal sehingga kita sudah mempunyai data nya, sehingga ketika saat proses looping nya nanti tidak perlu melakukan query kembali kedalam database lagi.

## Apa itu Eager Loading?

Jika dikutip melalui dokumentasi resmi Laravel nya disini [laravel.com/docs/8.x/eloquent-relationships#eager-loading](https://laravel.com/docs/8.x/eloquent-relationships#eager-loading). Pada saat kita mengakses sebuah relationship didalam eloquent seperti `belongsTo`, `hasMany` dan lain sebagainya. Maka model nya akan melakukan teknik yang namanya `Lazy Loading`, artinya data relationship nya ini tidak di load atau tidak dipanggil sampai nantinya kita mengakses property nya (pada saat kita looping). Nah, tapi kita bisa melakukan agar si Eloquent nya melakukan `Eager Loading` ketika kita melakukan query pada parent nya (pada saat kita melakukan query pada postingan nya, sehingga nanti dia akan sekalian query langsung author dan category nya).

Eager Loading ini kita lakukan untuk menghindari `N+1 Problem` (Laravel sudah tau bakalan ada `N+1 Problem` tersebut)

### Contoh Eager Loading

Contoh misalkan kita mempunyai model `Buku` kemudian mempunyai relasi kedalam model `Author`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /**
     * Get the author that wrote the book.
     */
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
```

Jika kita melakukan pengambilan data seluruh buku dan masing-masing author nya

```php
use App\Models\Book;

$books = Book::all();

foreach ($books as $book) {
    echo $book->author->name;
}
```

Hal tersebut sama persis seperti kita mempunyai model `Post` yang memiliki relasi kedalam model `User`.

Problem dari contoh tersebut adalah setiap 25 buku, kita melakukan 26 query (1 untuk buku, 25 untuk nama author). Untuk menghindari problem tersebut untungnya kita bisa menggunakan `Eager Loading` agar mengurangi operasi nya hanya jadi `2 Query` (yang asalnya 26 query menjadi 2 query). Caranya bagaimana? caranya kita tinggal tambahkan sebuah mehtod yang namanya `with` sebelum kita mendapatkan semua datanya.

```php
$books = Book::with('author')->get();

foreach ($books as $book) {
    echo $book->author->name;
}
```

### Implementasi Eager Loading Pada Posts

Setelah mengetahui `N+1 Problem` dan cara menyelesaikan nya menggunakan Eager Loading, selanjutnya kita terapkan metode tersebut pada aplikasi kita. Pertama kita pergi terlebih dahulu ke file post controller `PostController.php`

```php
public function index()
{
    return view('posts', [
        "title" => "All Posts",
        "posts" => Post::with(['author', 'category'])->latest()->get()
    ]);
}
```

Nah jika kalian sekarang kembali ke route `/posts` maka terlihat tidak ada perubahan kan? namun dibelakang layar jika kita menggunakan clockwork kembali, maka sekarang proses query nya hanya memakan `3x` bukan `41x` lagi.

![Implement Eager Loading](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/implement-eager-loading.png)

Jauh banget bukan? bayangin jika kalian mempunyai 1000 post, maka query yang dilakukan akan tetap 3x (tidak lagi memanggil ratusan bahkan ribuan query), mantap bukan? hanya tinggal mengganti sedikit yaitu menggunakan method `with` tetapi perfomance nya jauh meningkat.

Sehingga pada saat aplikasi kalian lambat, jangan dulu menyalahkan database nya, jangan dulu menyalahkan server nya. Namun, cek dulu mungkin saja kode kalian kurang optimal.

### Implementasi Lazy Eager Loading Pada Authors

Nah, itu baru baru yang pertama, kita masih mempunyai 2 problem lagi yaitu ketika kita masuk ke route `authors/{author:username}`. Hal tersebut juga sama yaitu kita mengambil author tetapi didalamnya ngikut postingan dan juga category

![Lazy Load Authors](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/lazy-load-authors.png)

Bisa kalian lihat terdapat 16 query yang dilakukan, query nya dilakukan secara berulang. Nah, hal tersebut juga bisa kita persingkat namun caranya agak berbeda karena jika kita lihat pada route `web.php` yang mengarah ke `/authors/{author:username}` kita menggunakan Route Model Binding sehingga jadi berbeda

```php
Route::get('/authors/{author:username}', function(User $author) {
    return view('posts', [
        'title' => "Post By Author: $author->name",
        'posts' => $author->posts,
    ]);
});
```

Karena jika pada kasus `PostController.php` itu kita tidak menggunakan Route Model Binding sehingga cukup gampang tinggal tamabhakn method `with`. Method tersebut tidak bisa kita gunakan pada Route Model Binding karena yang kita cari adalah `author`.

Teknik untuk mengatasi nya adalah `Lazy Eager Loading`. Teknik tersebut menggabungkan antara lazy loading dan eager loading. Penjelasan `Lazy Eager Loading` jika dikutip dari dokumentasi resmi Larave nya adalah, kadang-kadang kita butuh melakukan eager loading pada relationship kita tetapi setelah parent nya sudah didapatkan, sehingga tidak sekalian diambil (karena kita lagi melakukan Route Model Binding). Untuk menggunakan nya kita pakai method yang namanya `load`

```php
Route::get('/authors/{author:username}', function(User $author) {
    return view('posts', [
        'title' => "Post By Author: $author->name",
        'posts' => $author->posts->load('category', 'author'),
    ]);
});
```

![Implementasi Lazy Eager Loading](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/implement-lazy-eager-loading.png)

Maka sekarang jadi cuman 4 query saja proses nya.

### Implementasi Lazy Eager Loading Pada Categories

Sekarang sisa 1 lagi yaitu pada route `/categories/{categories:slug}`

```php
Route::get('/categories/{category:slug}', function(Category $category) {
    return view('posts', [
        'title' => "Post By Category: $category->name",
        'posts' => $category->posts,
    ]);
});
```

![Total Queries Categories](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/total-queries-categories.png)

Sekarang kita cukup tambahkan method `load`

```php
Route::get('/categories/{category:slug}', function(Category $category) {
    return view('posts', [
        'title' => "Post By Category: $category->name",
        'posts' => $category->posts->load('category', 'author'),
    ]);
});
```

Maka sekarang total query nya hanya 4x jauh lebih optimal, ajaib ya, Laravel sudah memikirkan hal tersebut.

![Implement Lazy Eager Loading Categories](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/n+1-problem/implement-lazy-eager-loading-categories.png)
