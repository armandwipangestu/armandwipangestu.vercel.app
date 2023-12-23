---
published: true
title: "Laravel 8 - #4 - Blade Templating Engine"
tag: "Programming"
date: "December 21 2023"
excerpt: "Templating Engine adalah sebuah fitur atau tools untuk membantu kita dalam mengelola tampilan halaman web, khususnya untuk sebuah framework dan untuk framework laravel, templating engine nya dinamakan dengan Blade."
cover_image: "/images/posts/Laravel 8 - Blade Templating Engine.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Apa itu Templating Engine?

Templating Engine adalah sebuah fitur atau tools untuk membantu kita dalam mengelola tampilan halaman web, khususnya untuk sebuah framework dan untuk framework laravel, templating engine nya dinamakan dengan `Blade`.

Bagaimana blade ini bisa mempermudah kita dalam mengelola tampilan halaman web? contoh sederhana nya adalah ketika kita ingin bekerja dengan sebuah variabel misalkan dan membuat struktur kendali seperti pengulangan atau loop, pengkondisian atau if else dan sampai dengan kemudahan kita saat membuat sebuah layout komponen atau yang disebut dengan parsial.

Blade adalah sebuah templating engine yang sudah terdapat didalam laravel, sehingga kita tidak perlu melakukan install-install lagi. Pada blade ini kita tetap bisa menggunakan sintaks PHP didalam views kita dengan tambahan sintaks blade didalamnya. Sehingga nantinya apapun yang kita tulis dengan sintaks blade, itu pada akhirnya akan di compile kedalam sintaks PHP biasa.

Blade template menggunakan nama file extension `*.blade.php` dan disimpan di folder `resources/views`. Blade views biasanya digunakan untuk sebuah return value dari route atau controller menggunakan global view helper. Blade juga dapat dapat menerima sebuah data dari route atau controller nya menggunakan argument ke 2 pada view helper, seperti kode berikut ini:

```php
Route::get('/', function () {
    return view('greeting', ['name' => 'Foobar']);
});
```

## Menampilkan Data

Anda dapat menampilkan data yang diteruskan ke tampilan atau views Blade dengan membungkus variabel dalam double curly braces (kurung kurawal) `{{  }}`. Misalkan disini kita mengirim data dari route

```php
Route::get('/', function () {
    return view('greeting', ['name' => 'Foobar']);
});
```

Maka kita bisa tampilkan data variable dari route tersebut dengan sintaks seperti ini:

> **Catatan**:
>
> Blade `{{  }}` echo statements dibelakang layar otomatis menggunakan `htmlspecialchars` function untuk menghindari XSS atau Cross Site Scripting Attack. Sehingga kita tidak perlu lagi menggunakan perintah `<?php echo ?>` atau `<?= ?>`.

```php
Hello, {{ $name }}
```

Sebetulnya kode view tersebut dibelakang layar di compile menjadi kode PHP biasa oleh blade, apabila kalian ingin melihat dimana lokasi hasil compile nya kalian bisa pergi ke folder `storage/framework/views`

## Membuat Sistem Layouting Sederhana Menggunakan Blade

Disini kita akan menggunakan framework Bootstrap untuk bagian frontend nya. Misalkan disini kita membuat sebuah file main layouts nya di folder views `resources/views/layouts/main.blade.php` dengan isian kode seperti berikut

> **Catatan**:
>
> Pengertian sintaks pada blade templating engine
>
> | Sintaks      | Pengertian                                                                                                                                                                                                                                                                             |
> | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `@extends()` | Menunjukkan bahwa view saat ini mewarisi atau inherit dengan template atau view lain. View yang menggunakan `extends` dapat memasukan konten ke bagian section menggunakan keyword `@section()`. Kemudian konten tersebut akan ditampilkan dalam layout menggunakan keyword `@yield()` |
> | `@yield()`   | Untuk menampilkan konten dari bagian tertentu atau section tertentu.                                                                                                                                                                                                                   |
> | `@section()` | Mendefinisikan suatu bagian konten                                                                                                                                                                                                                                                     |
> | `@include()` | Menunjukkan tampilan subview, semua variabel yang tersedia pada tampilan induk akan tersedia pada tampilan subview nya.                                                                                                                                                                |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>WPU Blog | Home</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
  </head>

  <body>
    @include('partials.navbar')

    <div class="container mt-4">@yield('container')</div>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

Kemudian kita buat juga sebuah navbar partials (komponen khusus yang bisa di pasang atau tidak seperti lego) di lokasi `resources/views/partials/navbar.blade.php` dengan isian seperti berikut ini:

```html
<nav class="navbar navbar-expand-lg bg-danger navbar-dark">
  <div class="container">
    <a class="navbar-brand" href="/">WPU Blog</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/blog">Blog</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Setelah layouts dan partials sudah dibuat, maka kita sekarang bisa menggunakannya di views yang akan digunakan pada route nya, misalkan disini pada Route `/` atau `root`

```php
Route::get('/', function () {
    return view('home');
});
```

Mengembalikan atau menampilkan views dari `home.blade.php` maka kode pada views untuk menggunakan layouts dan partials yang sudah dibuat sebelum nya seperti berikut ini:

> **Catatan**:
>
> Penulisan value dari `@extends()` bisa seperti berikut ini `@extends('folder.file_name')` atau `@extends('folder/file_name')`. Perlu diingat bahwa `@extends()` ini sudah relative terhadap folder `resources/views`.

```php
@extends('layouts.main')

@section('container')
    <h1>Halaman Home</h1>
@endsection
```

atau route lain misalkan `/about` dan `/blog`

```php
Route::get('/about', function () {
    return view('about', [
        "name" => "Arman Dwi Pangestu",
        "email" => "armandwi.pangestu7@gmail.com",
        "image" => "arman.jpg"
    ]);
});
```

```php
Route::get('/blog', function () {
    return view('posts');
});
```

ketika pada views `about.blade.php` dan `blog.blade.php` nya menjadi seperti berikut ini:

```php
@extends('layouts.main')

@section('container')
    <h1>Halaman About</h1>
    <h3>{{ $name }}</h3>
    <p>{{ $email }}</p>
    <img src="assets/img/{{ $image }}" alt="{{ $name }}" width="200" height="300">
@endsection
```

```php
@extends('layouts.main')

@section('container')
    <h1>Halaman Posts</h1>
@endsection
```

Maka sekarang tampilan nya akan terlihat seperti gambar berikut ini:

> **Catatan**:
>
> Jika kita berpindah halaman atau route ke `/about` dan `/blog` maka bagian navbar juga akan otomatis tetap ada karena melakukan `@extends()` dan `@section()` di child view nya, sehingga yang yang berbeda atau berubah hanya konten nya saja yaitu dibagian `@section()`

![Blade Layouting](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-layouting.png)

### Dynamic Title

Jika anda perhatikan saat ini title nya statis, yang dimana jika berpindah halaman atau route tulisan atau isi dari title nya tetap `WPU Blog | Home`. Untuk mengatasi hal tersebut kita bisa mengirimkan sebuah data pada Route nya dengan nama key dari associative array nya yaitu `title` pada masing-masing route nya di file `routes/web.php`

![Blade Static Title](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-static-title.png)

```php
Route::get('/', function () {
    return view('home', [
        'title' => 'Home'
    ]);
});

Route::get('/about', function () {
    return view('about', [
        "title" => "About",
        "name" => "Arman Dwi Pangestu",
        "email" => "armandwi.pangestu7@gmail.com",
        "image" => "arman.jpg"
    ]);
});

Route::get('/blog', function () {
    return view('posts', [
        "title" => "Posts"
    ]);
});
```

Sehingga kita bisa menggunakan variabel atau data yang sudah dikirimkan di route nya pada file main layouts nya `resources/views/layouts/main.blade.php` dengan echo blade `{{ $title }}` seperti berikut ini

```php
<!DOCTYPE html>
<html lang="en">
<head>
    ...
    <title>WPU Blog | {{ $title }}</title>
    ...
</head>

<body>
    ...
</body>
</html>
```

![Blade Dynamic Title](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-dynamic-title.png)

### Dynamic Active Link

Setelah sebelumnya menyelesaikan masalah title yang statis, selanjutnya jika Anda menyadari, bahwa class active link dari bootstrap nya hanya active pada tulisan `Home`, seharusnya class active link ini relative terhadap route yang diakses oleh user.

![Blade Static Active Link](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-static-active-link.png)

Untuk mengatasi hal tersebut kalian bisa membuat sebuah kondisi menggunakan operator ternary pada navlink nya untuk mengecek apakah data title yang dikirim dari routes sama dengan navlink nya seperti berikut ini di file `resources/views/partials/navbar.blade.php`

```php
<nav class="navbar navbar-expand-lg bg-danger navbar-dark">
    ...
        <li class="nav-item">
            <a class="nav-link {{ ($title === 'Home' ? 'active' : '') }}" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{ ($title === 'About' ? 'active' : '') }}" href="/about">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{ ($title === 'Posts' ? 'active' : '') }}" href="/blog">Blog</a>
        </li>
    ...
</nav>
```

Maka sekarang jika kalian berpindah ke posisi masing-masing route, class active link nya akan dinamis atau sesuai dengan route yang diakses

![Blade Dynamic Active Link](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-dynamic-active-link.png)

## Mengirim Data Konten Untuk Route Single Post

Pada bagian ini kita akan mengirimkan data untuk konten di route `/blog` dan menampilkan nya. Untuk mengirimkan nya sama seperti sebelumnya, misalkan disini kita akan menampung terlebih dahulu kontent data nya pada sebuah variabel `$blog_post` seperti berikut ini

```php
$blog_post = [
    [
        'title' => 'Judul Post Pertama',
        'author' => 'Arman Dwi Pangestu',
        'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi aliquid perspiciatis possimus. Quae sapiente molestiae perferendis ut dolorum illum fugit corrupti! Ratione pariatur quis odio! Explicabo quo incidunt velit aliquam iure, doloribus natus molestiae ab officiis, ea distinctio fugit dolores eos quam magni aliquid libero nihil ex iusto unde? Voluptates!'
    ],
    [
        'title' => 'Judul Post Kedua',
        'author' => 'Sandhika Galih',
        'body' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, nobis qui. Officia eius, debitis eveniet nisi culpa quas, voluptate enim impedit ipsa corrupti sapiente nesciunt mollitia facilis at cumque laudantium.'
    ]
];
```

Kemudian kita passing atau kirimkan ke view nya dengan cara seperti ini di file `routes/web.php`

```php
Route::get('/blog', function () {
    $blog_post = [
        ...
    ];

    return view('posts', [
        "title" => "Posts",
        "posts" => $blog_post
    ]);
});
```

Setelah data dikirim, selanjutnya kita bisa dump atau cek menggunakan function `dd()`. Function ini artinya adalah dump and die, jika kalian familiar dengan `var_dump()` dan `die()` nah hal tersebut mirip atau kurang lebih sama namun function `dd()` ini menggunakan gaya laravel. Sehingga sekarang kita bisa dump data `$posts` dari route nya pada file view nya di `resources/views/posts.blade.php` seperti berikut ini

```php
@dd($posts)

@extends('layouts.main')

@section('container')
    <h1>Halaman Posts</h1>
@endsection
```

Maka sekarang hasil dari variabel nya akan muncul seperti gambar berikut ini

![Blade Dump and Die](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-dump-and-die.png)

Nah, setelah data postingan nya sudah terkirim, sekarang kita bisa lakukan looping atau perulangan untuk setiap data nya menggunakan function `foreach()` seperti berikut ini:

```php
@extends('layouts.main')

@section('container')
    @foreach ($posts as $post)
        <article class="mb-5">
            <h2>{{ $post['title'] }}</h2>
            <h5>By: {{ $post['author'] }}</h5>
            <p>{{ $post['body'] }}</p>
        </article>
    @endforeach
@endsection
```

Maka sekarang tampilan nya akan seperti gambar berikut ini

![Blade Foreach](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-foreach.png)

## Membuat View Untuk Single Post

> **Catatan**:
>
> `Slug` disini adalah versi lain dari title, namun yang membedakan adalah dimana semua text nya menjadi huruf kecil semua atau `lowercase` dan karakter spasi atau space diubah menjadi `dash`. Misalkan terdapat title `Judul Post Pertama` maka versi slug nya adalah `judul-post-pertama`.

Setelah data untuk postingan nya sudah tampil pada route `/blog`, sekarang kita akan membuat sebuah view untuk menangani masing-masing post tersebut. Untuk melakukannya kita perlu membungkus `title` nya dengan `anchor` kemudian arahkan ke route `/posts/{slug}`.

Untuk itu kita perlu mengubah struktur data array pada route nya agar terdapat slug nya untuk masing-masing post nya.

```php
Route::get('/blog', function () {
    $blog_post = [
        [
            'title' => 'Judul Post Pertama',
            'slug' => 'judul-post-pertama',
            ...
        ],
        [
            'title' => 'Judul Post Kedua',
            'slug' => 'judul-post-kedua',
            ...
        ]
    ];

    return view('posts', [
        "title" => "Posts",
        "posts" => $blog_post
    ]);
});
```

Selanjutnya kita bungkus title pada masing-masing post di view nya seperti berikut ini

```php
...

@section('container')
    @foreach ($posts as $post)
        ...
            <h2>
                <a href="/posts/{{ $post['slug'] }}">{{ $post['title'] }}</a>
            </h2>
            ...
        ...
    @endforeach
@endsection
```

Maka sekarang jika kalian sorot atau hover pada bagian title nya akan muncul sebuah preview link ke slug nya seperti gambar berikut ini

![Blade Slug Link](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-slug-link.png)

Setelah slug dan anchor link nya sudah ready atau siap, selanjutnya kita siapkan route nya untuk menangani slug tersebut pada file `routes/web.php` seperti berikut ini

> **Catatan**:
>
> `{slug}` disini adalah sebuah wildcard, yang dimana berisi semua hal setelah `posts/`

```php
// Halaman Single Post
Route::get('posts/{slug}', function ($slug) {
    $blog_post = [
        [
            'title' => 'Judul Post Pertama',
            'slug' => 'judul-post-pertama',
            ...
        ],
        [
            'title' => 'Judul Post Kedua',
            'slug' => 'judul-post-kedua',
            ...
        ]
    ];

    $new_post = [];

    foreach ($blog_post as $post) {
        if ($post['slug'] === $slug) {
            $new_post += $post;
        }
    }

    return view('post', [
        'title' => 'Single Post',
        'post' => $new_post
    ]);
});
```

Selanjutnya kita siapkan view `post` pada file `resources/views/post.blade.php`

```php
@extends('layouts.main')

@section('container')
    <article>
        <h2>{{ $post['title'] }}</h2>
        <h5>By: {{ $post['author'] }}</h5>
        <p>{{ $post['body'] }}</p>
    </article>

    <a href="/blog">Back to Posts</a>
@endsection
```

Nah, maka sekarang single post nya sudah jalan seperti gambar berikut ini

| Post Pertama                                                                                                              | Post Kedua                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ![Blade Single Post Pertama](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-single-post-pertama.png) | ![Blade Single Post Kedua](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/blade-templating-engine/blade-single-post-kedua.png) |
