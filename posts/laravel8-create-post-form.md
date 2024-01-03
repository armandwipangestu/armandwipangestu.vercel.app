---
published: true
title: "Laravel 8 - #18 - Create Post Form"
tag: "Programming"
date: "January 3 2024"
excerpt: "Kali ini kita akan melanjutkan kembali pembuatan feature CRUD pada aplikasi sistem blog sederhana kita, setelah sebelumnya kita berhasil membuat tampilan UI untuk bagian Dashboard kita sambil juga menampilkan data post dari user yang sudah berhasil login, feature tersebut sebetulnya sudah masuk kedalam CRUD yaitu bagian READ nya. Nah, sekarang tersisa 3 lagi yaitu CREATE, UPDATE dan DELETE."
cover_image: "/images/posts/Laravel 8 - Create Post Form.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Kali ini kita akan melanjutkan kembali pembuatan feature CRUD pada aplikasi sistem blog sederhana kita, setelah sebelumnya kita berhasil membuat tampilan UI untuk bagian Dashboard kita sambil juga menampilkan data post dari user yang sudah berhasil login, feature tersebut sebetulnya sudah masuk kedalam CRUD yaitu bagian READ nya. Nah, sekarang tersisa 3 lagi yaitu CREATE, UPDATE dan DELETE.

Saat ini kita akan masuk kedalam feature CREATE, yaitu untuk menambahkan data post kedalam database kita, sebelumnya kita sudah mencoba nya menggunakan tinker namun sekarang kita akan benar-benar melakukan hal tersebut melalui dashboard.

## Membuat Post Form

Pertama-tama kita siapkan terlebih dahulu button untuk mengarah ke tambah postingan didalam view `dashboard/posts/index.blade.php`

```php
<div class="table-responsive col-lg-8">
    <a href="/dashboard/posts/create" class="btn btn-primary mb-3">Create new Post</a>
    <table>
        ...
    </table>
</div>
```

![Button Create new Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/button-create-new-post.png)

### Menyiapkan Controller dan View Post Form

Setelah kita menambahkan button untuk mengarah ke `/dashboard/posts/create` selanjutnya kita siapkan method `create` untuk bagian view nya di resource controller yang sudah kita buat sebelumnya `DashboardPostController.php`

```php
public function create()
{
    return view('dashboard.posts.create');
}
```

Selanjutnya kita buatkan file view nya di `dashboard.posts.create` dengan isian seperti ini

```php
@extends('dashboard.layouts.main')

@section('container')
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Create New Post</h1>
    </div>
@endsection
```

![Dashboard Create New Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/dashboard-create-new-post.png)

Jika kalian perhatikan, saat ini navlink `My Posts` nya tidak active lagi, jika kalian ingin meng-aktifkan nya ketika berada di sub request `/dashboard/posts`, kalian bisa benarkan kondisi menggunakan wildcard `*` nya di bagian `sidebar.blade.php` seperti berikut ini agar ketika berada di sub request apapun navlink nya akan tetap active

```php
<li class="nav-item">
    <a class="nav-link {{ Request::is('dashboard/posts*') ? 'active' : '' }}" href="/dashboard/posts">
        <span data-feather="file-text"></span>
        My Posts
    </a>
</li>
```

![Fix Wildcard Navlink](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/fix-wildcard-navlink.png)

#### Membuat Form

Setelah view nya disiapkan, sekarang kita isikan content untuk bagian form nya menggunakan bootstrap

```php
<div class="col-lg-8">
    <form action="/dashboard/posts" method="POST">
        @csrf
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="mb-3">
            <label for="slug" class="form-label">Slug</label>
            <input type="text" class="form-control" id="slug" name="slug">
        </div>
        <button type="submit" class="btn btn-primary">Create Post</button>
    </form>
</div>
```

![2 Field Form](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/2-field-form.png)

Sebelum kita melanjutkan membuat element input lain seperti bagian `category` dan `body`, kita akan mencoba agar slug nya menjadi otomatis. Misalkan, jika kita menulis title nya adalah `Ini adalah Title` maka nanti dibagian input element slug nya akan otomatis terisi `ini-adalah-title` ketika terdapat event `TAB` atau pindah focus dari element title ke element slug.

#### Eloquent Sluggable

Untuk melakukan hal tersebut kita akan gunakan sebuah package yang memang tugasnya membuat slug menggunakan composer, sehingga kita tidak perlu lagi membuat logic nya sendiri. Nama package tersebut adalah [eloquent-sluggable](https://github.com/cviebrock/eloquent-sluggable).

Untuk menginstall nya kita cukup jalankan perintah berikut ini didalam terminal

```php
composer require cviebrock/eloquent-sluggable
```

Setelah menginstall package nya, sekarang bagaimana cara menggunakannya? cara nya kita harus update terlebih dahulu model kita yang ingin menggunakan slug nya, model kita yang akan menggunakan slug ini adalah model `Post` sehingga kita cukup panggil `namespace` nya kemudian `use` trait dari sluggable nya dan terakhir kita buat method `sluggable`

```php
use Cviebrock\EloquentSluggable\Sluggable;

class Post extends Model
{
    use HasFactory, Sluggable;

    ...

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }
}
```

Nah, sekarang bagaimana consume agar ketika kita mengetikan title kemudian kita pindah input an ke slug maka otomatis dibuatkan? Mau tidak mau hal tersebut harus dilakukan menggunakan javascript, disini kita akan gunakan `Fetch API` agar ketika berpindah input otomatis memanggil method `sluggable` tersebut.

Disini kita buka file view `dashboard/posts/create.blade.php`, kemudian tambahkan kode javascript berikut ini sebelum `@endsection`

```php
@extends('dashboard.layouts.main')

@section('container')
    ...

    <script>
        const title = document.querySelector('#title')
        const slug = document.querySelector('#slug')

        title.addEventListener('change', () => {
            fetch(`/dashboard/posts/getSlug?title=${title.value}`)
                .then(response => response.json())
                .then(data => slug.value = data.slug)
        })
    </script>
@endsection
```

Selanjutnya kita siapkan endpoint yang mengarah ke `/dashboard/posts/getSlug` dengan method `GET` untuk hit api `getSlug` nya di route `web.php` kita

```php
Route::get('/dashboard/posts/getSlug', [DashboardPostController::class, 'getSlug'])->middleware('auth');
```

Setelah itu kita siapkan method `getSlug` di `DashboardPostController.php` nya

```php
use \Cviebrock\EloquentSluggable\Services\SlugService;

class DashboardPostController extends Controller
{
    ...

    public function getSlug(Request $request)
    {
        $slug = SlugService::createSlug(Post::class, 'slug', $request->title);

        return response()->json([
            'slug' => $slug
        ]);
    }
}
```

Maka sekarang jika kalian mencoba mengisikan title dan menekan tab atau berpindah fokus input an nya, akan otomatis terisi value dari input an slug nya

![Sluggable](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/sluggable.png)

#### Category Select Option

Untuk menambahkan field input category dengan element select option, kita perlu kirimkan terlebih dahulu data nya di controller nya

```php
use App\Models\Category;

class DashboardPostController extends Controller
{
    ...

    public function create()
    {
        return view('dashboard.posts.create', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

Selanjutnya kita looping data `categories` tersebut di view nya

```php
<form action="/dashboard/posts" method="POST">
    @csrf
    ...
    <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select class="form-select" name="category_id" id="category">
            @foreach ($categories as $category)
                <option value="{{ $category->id }}">{{ $category->name }}</option>
            @endforeach
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Create Post</button>
</form>
```

Maka sekarang akan muncul field category dengan data dibagian select option berdasarkan data dari database

![Category Select Option](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/category-select-option.png)

#### WYSIWYG Trix Editor

Sekarang kita membutuhkan sebuah editor untuk menuliskan body nya, kenapa excerpt nya dilewat? karena nanti excerpt nya akan dibikin otomatis mengambil beberapa kata dari body nya. Untuk Editor body postingan nya kita akan gunakan yang namanya `Trix Editor`, kalian sebetulnya bisa menggunakan editor lain seperti `CKEditor`.

Alasan disini memilih Trix Editor adalah karena cukup simpel, tampilannya akan seperti gambar dibawah ini

![WYSIWYG Trix Editor Preview](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/wysiwyg-trix-editor-preview.png)

Untuk mendownload nya kalian bisa kunjungi repository nya di github [github.com/baseamp/trix/tree/1.3.1](https://github.com/basecamp/trix/tree/1.3.1) kemudian download ZIP file nya atau jika kalian biasa menggunakan git kalian bisa clone kemudian ganti branch ke versi `1.3.1`

```shell
git clone https://github.com/basecamp/trix
cd trix
git checkout 1.3.1
```

Selanjutnya kalian bisa extract jika mendownload versi ZIP, setelah itu kita pindahkan file dari folder `dist` nya kedalam folder `public` di Laravel kita

- `dist/trix.css` -> `public/assets/css`
- `dist/trix.js` -> `public/assets/js`

Setelah memindahkan file dari dist nya, sekarang kita panggil atau load trix nya pada bagian `dashboard/layouts/main.blade.php`

```html
<head>
  ...

  <!-- Trix Editor -->
  <link rel="stylesheet" type="text/css" href="/assets/css/trix.css" />
  <script type="text/javascript" src="/assets/js/trix.js"></script>
</head>
```

Sekarang kita tinggal buat form input hidden dengan element setelah nya adalah komponen dari trix editor nya di file `create.blade.php`

```php
<form action="/dashboard/posts" method="POST">
    @csrf
    ...
    <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <input id="body" type="hidden" name="body">
        <trix-editor input="body"></trix-editor>
    </div>
    <button type="submit" class="btn btn-primary">Create Post</button>
</form>
```

Maka sekarang jika kalian lihat kembali pada form input nya terdapat komponen text editor nya

![Implement Trix Editor](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/implement-trix-editor.png)

Namun sebelum kita lanjutkan, sekarang kita akan hilangkan toolbar file attach atau file upload nya dengan menggunakan CSS di file `main.blade.php`

```html
<head>
  ...

  <!-- Trix Editor -->
  <link rel="stylesheet" type="text/css" href="/assets/css/trix.css" />
  <script type="text/javascript" src="/assets/js/trix.js"></script>

  <style>
    trix-toolbar [data-trix-button-group="file-tools"] {
      display: none;
    }
  </style>
</head>
```

Selanjutnya agar fitur nya tidak jalan kita tambahkan kode javascript di file `create.blade.php`

```html
<script>
  const title = document.querySelector("#title");
  const slug = document.querySelector("#slug");

  title.addEventListener("change", () => {
    fetch(`/dashboard/posts/getSlug?title=${title.value}`)
      .then((response) => response.json())
      .then((data) => (slug.value = data.slug));
  });

  document.addEventListener("trix-file-accept", (e) => {
    e.preventDefault();
  });
</script>
```

Terakhir, sekarang kita coba isi data nya apakah terkirim atau tidak, caranya kita tinggal return `$request` di method `store` controller nya

```php
class DashboardPostController extends Controller
{
    ...

    public function store(Request $request)
    {
        return $request;
    }

    ...
}
```

![Testing Send Data](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/testing-send-data.png)

Maka sekarang hasil dari body nya terdapat tag-tag html nya

![Return Request](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/create-post-form/return-request.png)
