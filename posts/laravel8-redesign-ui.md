---
published: true
title: "Laravel 8 - #12 - Redesign UI"
tag: "Programming"
date: "December 29 2023"
excerpt: "Pada pembahasan kali ini kita akan istirahat terlebih dahulu untuk mempelajari feature-feature utama yang ada didalam Laravel. Pada pembahasan kali ini kita akan mencoba memperbaiki tampilan halaman web blog kita agar lebih fresh lagi dan lebih mudah untuk digunakan."
cover_image: "/images/posts/Laravel 8 - Redesign UI.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan kali ini kita akan istirahat terlebih dahulu untuk mempelajari feature-feature utama yang ada didalam Laravel. Pada pembahasan kali ini kita akan mencoba memperbaiki tampilan halaman web blog kita agar lebih fresh lagi dan lebih mudah untuk digunakan. Kita akan menggunakan bantuan framework frontent bootstrap lagi dan juga kita akan memakai API dari layanan Unsplash sebagai penyedia gambar yang akan membuat nanti setiap gambar postingan kita memiliki gambar default supaya lebih menarik lagi. Terdapat 3 halaman yang akan kita perbaiki yaitu `posts`, `post`, `categories`

## View Posts

Langkah pertama kita buka terlebih dahulu file view nya yaitu `posts.blade.php`. Pada view ini kita akan membuat agar halaman posts ini menampilkan yang pertama ada hero post (post yang paling baru itu akan muncul sebagai hero dan besar sendiri ukuran nya) kemudian nanti dibawah nya terdapat post-post yang lainnya akan muncul sebagai card-card kecil-kecil (disini kita akan buat agar 1 baris memuat 3 buah card dan jumlah baris nya sesuai dengan jumlah post yang ada). Apabila kalian tidak terbayang bagaimana bentuk, kalian bisa lihat gambar dibawah berikut ini

![Design Posts](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/design-posts.png)

### Hero Posts

Disini kita bisa membuka dokumentasi dari bootstrap nya kemudian cari komponen card, setelah masuk kedalam komponen card nya kita cari pada bagian `Image caps`. Kita copy code nya kemudian kita simpan dibawah h1 nya

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-5">{{ $title }}</h1>

    <div class="card mb-3">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
    </div>

    @foreach ($posts as $post)
        <article class="mb-5 border-bottom pb-4">
            <h2>
                <a href="/posts/{{ $post->slug }}" class="text-decoration-none">{{ $post->title }}</a>
            </h2>

            <h5>By: <a href="/authors/{{ $post->author->username }}" class="text-decoration-none">{{ $post->author->name }}</a> in <a href="/categories/{{ $post->category->slug }}" class="text-decoration-none">{{ $post->category->name }}</a></h5>

            <p>{{ $post->excerpt }}</p>

            <a href="/posts/{{ $post->slug }}" class="text-decoration-none">Read more..</a>
        </article>
    @endforeach
@endsection
```

Disini gambar nya karena kita belum punya, kita nanti akan memanfaatkan API dari Unsplash agar ada gambar nya, untuk sekarang kita abaikan dulu kemudian sekarang kita akan cek terlebih dahulu apakah postingan nya ada atau tidak (karena mungkin saja jika website nya baru pertama kali dibuat belum ada postingan nya). Oleh karena itu kita berikan kondisi seperti berikut ini

```php
@if ($posts->count())
    <div class="card mb-3">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
    </div>
@else
    <p class="text-center fs-4">No post found.</p>
@endif
```

Nah, sekarang kita ingin yang mengisi konten hero nya itu merupakan postingan terakhir atau terbaru, jika kita lihat pada PostController nya kita sudah mengurutkan data posts nya berdasarkan `latest`

```php
class PostController extends Controller
{
    public function index()
    {
        return view('posts', [
            "title" => "All Posts",
            "posts" => Post::with(['author', 'category'])->latest()->get()
        ]);
    }
}
```

Namun sebelum itu kita pindahkan dulu method `with` nya agar berada di model Post nya (sehingga tidak disimpan di controller nya). Caranya kita bikin sebuah property baru di model Post nya

```php
class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $with = ['category', 'author'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
```

Sehingga sekarang pada controller nya kita tidak usah panggil method `with` nya

```php
class PostController extends Controller
{
    public function index()
    {
        return view('posts', [
            "title" => "All Posts",
            "posts" => Post::latest()->get()
        ]);
    }
}
```

Nah, sekarang jika kita panggil postingan pertama maka itu pasti postingan terakhir atau terbaru sehingga kita bisa ambil index ke 0 pada collection `$posts` nya untuk mengisikan content pada hero post nya

> **Catatan**:
>
> method `diffForHumans()` digunakan untuk menampilkan perbedaan dari waktu yang ada dengan waktu sekarang tapi agar mudah dibaca oleh manusia. Feature tersebut punya-nya library yang namanya carbon untuk mengatur waktu dan itu sudah include didalam Laravel.

```php
<div class="card mb-3">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body text-center">
        <h3 class="card-title">
            <a href="/posts/{{ $posts[0]->slug }}">{{ $posts[0]->title }}</a>
        </h3>
        <p>
            <small class="text-body-secondary">
                By: <a href="/authors/{{ $posts[0]->author->username }}" class="text-decoration-none">{{ $posts[0]->author->name }}</a>
                in <a href="/categories/{{ $posts[0]->category->slug }}" class="text-decoration-none">{{ $posts[0]->category->name }}</a> {{ $posts[0]->created_at->diffForHumans() }}
            </small>
        </p>

        <p class="card-text">{{ $posts[0]->excerpt }}</p>

        <a href="/posts/{{ $posts[0]->slug }}" class="text-decoration-none btn btn-primary">Read more</a>
    </div>
</div>
```

Maka sekarang tampilannya akan seperti gambar berikut ini

![Hero Post Preview](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/hero-post-preview.png)

Naha sekarang kita tinggal perlu gambar nya, gambar nya kita akan ambil dari API unsplash di [source.unsplash.com](https://source.unsplash.com), kita bisa ambil gambar secara random, gambar dengan resolusi tertentu dan yang paling keren kita bisa ambil gambar berdasarkan category

```php
<img src="https://source.unsplash.com/1200x400?{{ $posts[0]->category->name }}" class="card-img-top" alt="{{ $posts[0]->category->name }}">
```

Maka sekarang akan muncul gambar berdasarkan category pada bagian hero post nya

![Hero Post Unsplash](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/hero-post-image-usnplash.png)

### Card Posts

Setelah selesai membuat tampilan hero section nya, sekarang kita fokus pada isi bagian foreach nya untuk membuat card-card sisanya. Pada bagian foreach tersebut kita ingin mengulang semua kecuali postingan pertama atau index ke 0 pada collection nya. Caranya bagaimana? kita bisa tambahkan method yang namanya `skip` dengan parameter nya 1 pada bagian collection `$posts` nya

```php
@foreach ($posts->skip(1) as $post)
    ...
@endforeach
```

Nah, maka sekarang postingan pertama pada looping nya tidak akan sama persis dengan yang ada di bagian hero

| Sebelum Skip                                                                                | Sesudah Skip                                                                              |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![Before Skip Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/before-skip-post.png) | ![After Skip Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/after-skip-post.png) |

Nah selanjutnya kita perlu membuat struktur halaman nya, seperti yang dijelaskan sebelumnya kita akan buat bagian ini menggunakan card yang berjejer sebanyak 3 buah. Berarti kita membutuhkan yang namanya kolom yang masing-masing ukurannya 4 (karena total kolom harus nya ada 12, maka jika dibagi (:) 4 hasilnya adalah 3)

```html
<div class="container">
  <div class="row">
    <div class="col-md-4"></div>
  </div>
</div>
```

Nah nanti foreach atau yang akan di looping nya pada bagian `col` nya, yang dimana isian konten nya kita bisa ambil komponen card dari bootstrap

```php
<div class="container">
    <div class="row">
        @foreach ($posts->skip(1) as $post)
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="position-absolute px-3 py-2" style="background-color: rgba(0, 0, 0, 0.7)">
                        <a href="/categories/{{ $post->category->slug }}" class="text-white text-decoration-none">
                            {{ $post->category->name }}
                        </a>
                    </div>
                    <img src="https://source.unsplash.com/500x400?{{ $post->category->name }}" class="card-img-top" alt="{{ $post->category->name }}">
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="/posts/{{ $post->slug }}" class="text-decoration-none">{{ $post->title }}</a>
                        </h5>

                        <p>
                            <small class="text-body-secondary">
                                By: <a href="/authors/{{ $posts[0]->author->username }}" class="text-decoration-none">{{ $post->author->name }}</a> {{ $post->created_at->diffForHumans() }}
                            </small>
                        </p>

                        <p class="card-text">{{ $post->excerpt }}</p>
                        <a  href="/posts/{{ $post->slug }}" class="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
```

Maka sekarang tampilan nya akan terlihat seperti gambar dibawah ini

![Card Post Image Unsplash](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/card-post-image-unsplash.png)

## View Single Post

Nah sekarang disini kita bikin ide nya agar si postingan single post ini tidak terlalu lebar (ukurannya jika dalam 12 kolom itu mungkin 8) supaya nanti jika kalian ingin di sisi kiri dan kanan nya itu mungkin ada sidebar nya, iklan atau link seperti ToC (Table of Contents). Untuk melakukannya kita buka view post nya di file `post.blade.php`

```php
@extends('layouts.main')

@section('container')

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1 class="mb-5">{{ $post->title }}</h1>

                <p>By:
                    <a href="/authors/{{ $post->author->username }}" class="text-decoration-none">
                        {{ $post->author->name }}
                    </a>
                    in
                    <a href="/categories/{{ $post->category->slug }}" class="text-decoration-none">
                        {{ $post->category->name }}
                    </a>
                </p>

                {!! $post->body !!}

                <a href="/posts" class="d-block mt-3">Back to Posts</a>
            </div>
        </div>
    </div>
@endsection
```

Sekarang jika kita lihat maka tampilan nya akan seperti gambar dibawah ini

![Single Post Preview](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/single-post-preview.png)

Nah, karena konten body nya sedikit, sekarang kita bikin agar banyak paragraf tapi dibungkus tag `<p>` nya. Untuk melakukannya kita perbaiki seeder atau factory kita di file `PostFactory.php`

```php
public function definition()
{
    return [
        'title' => $this->faker->sentence(mt_rand(2, 8)),
        'slug' => $this->faker->slug(),
        'excerpt' => $this->faker->paragraph(),

        // Menggunakan Implode
        //'body' => '<p>' . implode('</p><p>', $this->faker->paragraphs(mt_rand(5, 10))) . '</p>',

        // Menggunakan Map Closure
        // 'body' => collect($this->faker->paragraphs(mt_rand(5, 10)))
        //     ->map(function ($p) {
        //         return "<p>$p</p>";
        //     }),

        // Menggunakan Map Arrow Function
        'body' => collect($this->faker->paragraphs(mt_rand(5, 10)))
            ->map(fn ($p) => "<p>$p</p>")
            ->implode(''),

        'user_id' => mt_rand(1, 3),
        'category_id' => mt_rand(1, 2)
    ];
}
```

Setelah kita ubah bentuk factory nya, kita migrate

```php
php artisan migrate:fresh --seed
```

Maka sekarang paragraph nya di bagian body nya terdapat lebih dari satu

![Single Post Paragraphs](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/single-post-paragraphs.png)

Selanjutnya kita sekarang tambahkan gambar nya

```php
@extends('layouts.main')

@section('container')

    <div class="container">
        <div class="row justify-content-center mb-5">
            <div class="col-md-8">
                <h1 class="mb-3">{{ $post->title }}</h1>

                <p>By:
                    <a href="/authors/{{ $post->author->username }}" class="text-decoration-none">
                        {{ $post->author->name }}
                    </a>
                    in
                    <a href="/categories/{{ $post->category->slug }}" class="text-decoration-none">
                        {{ $post->category->name }}
                    </a>
                </p>

                <img src="https://source.unsplash.com/1200x400?{{ $post->category->name }}" alt="{{ $post->category->name }}" class="img-fluid">

                <article class="my-3 fs-5">
                    {!! $post->body !!}
                </article>

                <a href="/posts" class="d-block mt-3">Back to Posts</a>
            </div>
        </div>
    </div>
@endsection
```

Maka sekarang tampilan nya akan seperti gambar dibawah ini

![Single Post Final](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/single-post-final.png)

## View Categories

Terakhir kita akan bikin untuk halaman categories, sebelum melakukannya kita tambahkan dulu list item untuk mengarah ke route categories nya di file `navbar.blade.php`

> **Catatan**:
>
> Disin kita ubah deteksi route nya dari property `title` menjadi property `active`

```php
<nav class="navbar navbar-expand-lg bg-danger navbar-dark">
    <div class="container">
        <a class="navbar-brand" href="/">WPU Blog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link {{ ($active === 'home' ? 'active' : '') }}" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ ($active === 'about' ? 'active' : '') }}" href="/about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ ($active === 'posts' ? 'active' : '') }}" href="/posts">Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ ($active === 'categories' ? 'active' : '') }}" href="/categories">Categories</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ ($active === 'authors' ? 'active' : '') }}" href="/authors">Authors</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

Setelah itu kita kirimkan juga pada masing-masing controller nya agar mengirim property `active`

> **Catatan**:
>
> Jika kalian tidak menggunakan controller, maka kalian bisa passing property `active` nya di closure routes nya pada file `web.php`

- `PostController.php`

```php
public function index()
{
    return view('posts', [
        "title" => "All Posts",
        "active" => "posts",
        "posts" => Post::latest()->get()
    ]);
}

public function show(Post $post)
{
    return view('post', [
        'title' => 'Single Post',
        "active" => "posts",
        'post' => $post
    ]);
}
```

- `CategoryController.php`

```php
public function index()
{
    return view('categories', [
        'title' => 'Post Categories',
        "active" => "categories",
        'categories' => Category::all()
    ]);
}

public function show(Category $category)
{
    return view('posts', [
        'title' => "Post By Category: $category->name",
        "active" => "categories",
        'posts' => $category->posts->load('category', 'author'),
    ]);
}
```

- `AuthorController.php`

```php
public function index()
{
    return view('authors', [
        'title' => 'Authors',
        "active" => "authors",
        'authors' => User::all()
    ]);
}

public function show(User $author)
{
    return view('posts', [
        'title' => "Post By Author: $author->name",
        "active" => "authors",
        'posts' => $author->posts->load('category', 'author'),
    ]);
}
```

- `web.php`

```php
Route::get('/', function () {
    return view('home', [
        'title' => 'Home',
        "active" => 'home'
    ]);
});

Route::get('/about', function () {
    return view('about', [
        "title" => "About",
        "active" => "about",
        "name" => "Arman Dwi Pangestu",
        "email" => "armandwi.pangestu7@gmail.com",
        "image" => "me-circle.png"
    ]);
});
```

Setelah selesai menyelesaikan masalah navbar, sekarang kita kembali lagi ke tujuan utama yaitu redesign view categories. Pada view ini kita akan bikin 3 kotak sesuai dengan category nya dan nantinya pada kotaknya terdapat background gambar nya dari unsplash lagi sesuai dengan category nya.

Komponen bootstrap yang akan digunakan disini kita akan pakai card overlay, sekarang kita buka file view category nya di `categories.blade.php`

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-5">Post Categories</h1>

    <div class="container">
        <div class="row">
            @foreach ($categories as $category)
                <div class="col-md-4">
                    <a href="/categories/{{ $category->slug }}" class="text-decoration-none">
                        <div class="card text-bg-dark">
                            <img src="https://source.unsplash.com/500x500?{{ $category->name }}" class="card-img" alt="{{ $category->name }}">
                            <div class="card-img-overlay d-flex align-items-center p-0">
                                <h5 class="card-title text-center flex-fill p-4 fs-3" style="background-color: rgba(0, 0, 0, 0.7)">
                                    {{ $category->name }}
                                </h5>
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
@endsection
```

Maka sekarang tampilan nya akan seperti gambar berikut ini

![Categories Final](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/redesign-ui/categories-final.png)
