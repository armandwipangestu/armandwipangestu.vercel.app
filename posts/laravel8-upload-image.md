---
published: true
title: "Laravel 8 - #21 - Upload Image"
tag: "Programming"
date: "January 6 2024"
excerpt: "Pada pembahasan kali ini kita akan mencoba menambahkan sebuah feature untuk melengkapi CRUD dari blog kita, yaitu menambahkan feature upload gambar yang dimana nantinya user dapat mengupload gambar sendiri dari komputer nya untuk menggantikan gambar yang sebelumnya kita ambil dari API nya Unsplash."
cover_image: "/images/posts/Laravel 8 - Upload Image.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan kali ini kita akan mencoba menambahkan sebuah feature untuk melengkapi CRUD dari blog kita, yaitu menambahkan feature upload gambar yang dimana nantinya user dapat mengupload gambar sendiri dari komputer nya untuk menggantikan gambar yang sebelumnya kita ambil dari API nya Unsplash.

Namun, jika kita lihat tabel `posts` didalam database kita saat ini belum terdapat field untuk menyimpan gambar, nantinya akan kita perbaiki. Nah, namun jika postingan nya tidak memiliki gambar maka gambar yang akan digunakan tetap menggunakan API unsplash.

## New Post Input Gambar

Untuk melakukannya, pertama-tama kita tambahkan field input gambar di file view `create.blade.php` kita

> **Catatan**:
>
> Perlu diingat, ketika kita akan bekerja dengan file didalam form, maka kita tambahkan attribute `enctype` didalam element form nya yang isi dari value nya adalah `multipart/form-data`. Karena jika tidak menggunakan attribute tersebut maka form tersebut tidak bisa menangani file, namun jika menggunakan attribute tersebut maka form tersebut bisa menangani dua hal:
>
> 1. Semua input-an dalam bentuk text akan diambil menggunakan request biasa
> 2. Jika terdapat input-an file maka akan diambil menggunakan request file `multipart/form-data`
>
> Jika tidak ada attribute tersebut maka file kalian tidak akan bisa di upload

```php
<form action="/dashboard/posts" method="POST" class="mb-5" enctype="multipart/form-data">
    @csrf
    ...
    <div class="mb-3">
        <label for="image" class="form-label">Post Image</label>
        <input class="form-control" type="file" id="image" name="image">
    </div>
    ...
    <button type="submit" class="btn btn-primary">Create Post</button>
</form>
```

### Bagaimana Laravel Menangani Upload File?

Nah sebelum kita jalankan upload gambar nya, kita akan lihat terlebih dahulu bagaimana Laravel ini menangani upload sebuah file tersebut seperti apa. Kita bisa buka terlebih dahulu file controller `DashboardPostController.php`

> **Catatan**: Tips
>
> Method `ddd` disini artinya adalah:
>
> - Dump
> - Die
> - Debug

```php
public function store(Request $request)
{
    ddd($request);

    ...

    Post::create($validateData);

    return redirect('/dashboard/posts')->with('success', 'New post has been added!');
}
```

Sekarang jika kalian mencoba mengisikan form input di new post dengan data sembarang dan upload sebuah gambar maka akan muncul tampilan dari method `ddd` nya

![ddd New Post](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/ddd-new-post.png)

![Info ddd](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/info-ddd.png)

Dapat kalian lihat terdapat banyak sekali informasi, namun yang kita butuhkan hanya yang didalam `request`

![ddd Info Request](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/ddd-info-request.png)

Jika kalian lihat, maka akan bertanya-tanya, dimana `image` yang sudah kita upload? tenang, `image` yang kalian upload masuk kedalam `files`, sehingga itulah mengapa kita membutuhkan `multipart`. Jadi yang string masuk nya kedalam `request` dan yang file masuknya kedalam `files`

![ddd Info Files](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/ddd-info-files.png)

Didalam `files` tersebut terdapat beberapa informasi seperti original name, mimeType atau bentuk file atau extension, kemudian terdapat lokasi file penyimpanan dan nama sementara, ukurang file nya dan seterusnya.

### Bagaimana Cara Menyimpan File?

Nah sekarang pertanyaan nya, bagaimana cara menyimpan file yang sudah di upload tersebut? caranya cukup gampang, misalkan disini kita akan return value pada method `store` nya sehingga kode dibawah nya tidak akan dijalankan

```php
public function store(Request $request)
{
    return $request->file('image')->store('post-images');

    ...
}
```

Sekarang jika kita mencoba kembali melakukan upload gambar, maka akan muncul tulisan dari return value `store` tersebut yaitu dengan format `nama-folder/nama-file-hash` seperti gambar dibawah ini

![Return Store Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/return-store-image.png)

File tersebut sebetulnya sudah ter-upload, dimana letak file tersebut sekarang? kalian bisa lihat di folder `/storage/app/post-images`

![First Upload File](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/first-upload-file.png)

Keren bukan? hanya satu baris kode doang kita bisa upload file. Namun, hal tersebut banyak yang harus kita perbaiki seperti pengaturan lokasi file penyimpanan atau PATH nya. Jika kalian bertanya-tanya "mengapa sih disimpen nya di folder `/storage`? bukan ditempat yang kita mau", untuk mencari jawaban tersebut kita bisa lihat di dokumentasi resmi Laravel nya mengenai File System atau File Storage.

Jika dikutip dari web resmi Laravel nya, Laravel sudah menyediakan sebuah file system yang powerfull berkat library yang namanya [Flysystem](https://github.com/thephpleague/flysystem). Sehingga jika nanti kedepannya kalian ingin meng-integrasikan aplikasi kalian agar bisa meng-upload ke beberapa tempat seperti local filesystem, SFTP atau Amazon S3.

### Custom PATH

Sekarang bagaimana cara mengatur nya? kalian bisa pergi ke file `config/filesystems.php`

```php
'default' => env('FILESYSTEM_DRIVER', 'local'),
```

Secara default itu adalah `local` namun sebelum local tersebut laravel akan mengecek variabel di `.env` dengan nama `FILESYSTEM_DRIVER`. Nah, `local` tersebut berada di `storage_path('app)`

```php
    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        ...

    ]
```

Sehingga file yang di upload tadi tersimpan di `/storage/app`. Kedepannya kita tidak ingin menyimpan nya di lokasi tersebut, karena kita ingin agar file-file yang di upload tersebut dapat diaskses secara public untuk ditampilkan di halaman blog kita jadi kita harus memindahkannya ke lokasi `/storage/app/public`.

Agar tersimpan nya ke public maka default filesystem nya jangan di `local` namun kita pindahkan ke `public`. Caranya kalian bisa ganti menjadi seperti ini

```php
'default' => env('FILESYSTEM_DRIVER', 'public'),
```

Atau kalian bisa tambahkan variabel baru dengan nama `FILESYSTEM_DRIVER` di `.env` kalian dengan value nya adalah `public`

```env
FILESYSTEM_DRIVER=public
```

Maka sekarang jika kita mencoba upload kembali file nya, akan tersimpan di lokasi `/storage/app/public/post-images`

![File Upload Public](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/file-upload-public.png)

Nah namun hal tersebut masih terdapat problem jika kita akses langsung melalui browser dengan cara copy relative path dari file tersebut

![Storage File Not Found](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/storage-file-not-found.png)

### Permission

Problem diatas tersebut nantinya akan menyebabkan kita tidak bisa menggunakan atau menampilkan gambar tersebut walaupun sudah disimpan di folder `public`. Hal tersebut terjadi karena folder `/storage/app/public` itu harus kita hubungkan terlebih dahulu dengan folder `/public` yang ada didalam aplikasi kita.

Folder `/public` tersebutlah yang benar-benar bisa diakses oleh user, contohnya disini saya mempunyai gambar saya sendiri

![Example File Public](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/example-file-public.png)

![Structure Public](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/structure-public.png)

### Symbolic Link

Sekarang, bagaimana cara menghubungkan folder `/storage/app/public` kedalam folder `/public`? Caranya kita cukup buatkan symlink atau symbolic link dengan perintah artisan berikut ini

```php
php artisan storage:link
```

![Storage Link](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/storage-link.png)

Maka sekarang akan muncul folder `storage` didalam folder `/public`

> **Catatan**: Tips
>
> Bisa kalian lihat, terdapat tanda panah di ujung kanan folder nya, itu menandakan bahwa folder tersebut adalah symbolic link

![Symlink Storage](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/symlink-storage.png)

Sehingga nantinya jika kita ingin meng-akses file nya, kita bisa gunakan method yang namanya `asset`

```php
echo asset('storage/file.txt');
```

Jika sekarang kita coba akses melalui browser relative path nya, maka sekarang tidak akan lagi muncul error `404 | NOT FOUND`

![Access Symbolic Link](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/access-symbolic-link.png)

Hal tersebut yang perlu perbaiki sehingga sekarang kita sudah siap meng-upload file nya.

## Skema Migration Baru

Namun sebelum kita jalankan perlu di ingat bahwa kita belum mempunyai field untuk menyimpan gambar didalam tabel `posts` nya, oleh karena itu kita tambahkan field baru didalam file migration nya

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id');
        $table->foreignId('user_id');
        $table->string('title');
        $table->string('slug')->unique();
        $table->string('image')->nullable();
        $table->text('excerpt');
        $table->text('body');
        $table->timestamp('publish_at')->nullable();
        $table->timestamps();
    });
}
```

Sebelum kita jalankan migration nya, kita buka terlebih dahulu file seeder nya

```php
public function run()
{
    User::create([
        'name' => 'Arman Dwi Pangestu',
        'username' => 'devnull',
        'email' => 'arman@gmail.com',
        'password' => bcrypt('password')
    ]);

    User::factory(3)->create();

    Category::create([
        'name' => 'Web Programming',
        'slug' => 'web-programming'
    ]);

    Category::create([
        'name' => 'Web Design',
        'slug' => 'web-design'
    ]);

    Category::create([
        'name' => 'Personal',
        'slug' => 'personal'
    ]);

    Post::factory(20)->create();
}
```

Sekarang kita jalankan perintah migration nya dengan artisan

```php
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya akan muncul field baru dengan nama `image` pada tabel `posts`

```sql
mysql> DESCRIBE posts;
+-------------+-----------------+------+-----+---------+----------------+
| Field       | Type            | Null | Key | Default | Extra          |
+-------------+-----------------+------+-----+---------+----------------+
| id          | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| category_id | bigint unsigned | NO   |     | NULL    |                |
| user_id     | bigint unsigned | NO   |     | NULL    |                |
| title       | varchar(255)    | NO   |     | NULL    |                |
| slug        | varchar(255)    | NO   | UNI | NULL    |                |
| image       | varchar(255)    | YES  |     | NULL    |                |
| excerpt     | text            | NO   |     | NULL    |                |
| body        | text            | NO   |     | NULL    |                |
| publish_at  | timestamp       | YES  |     | NULL    |                |
| created_at  | timestamp       | YES  |     | NULL    |                |
| updated_at  | timestamp       | YES  |     | NULL    |                |
+-------------+-----------------+------+-----+---------+----------------+
11 rows in set (0.03 sec)
```

## Validasi Upload Gambar

Setelah field `image` didalam tabel `posts` nya kita buat, selanjutnya kita balik lagi ke validasi penyimpanan data di `DashboardPostController.php` pada method `store` nya

> **Catatan**: Tips
>
> Pada validasi `image|file` kita bisa masukkan beberapa kriteria ukuran file nya dalam ukuran kilobyte, misalkan
>
> - `image|file|min:1024` : artinya adalah file yang di upload `minimum` size nya adalah `1MB`
>
> - `image|file|size:1024` : artinya adalah file yang di upload `harus sama persis` size nya adalah `1MB`
>
> - `image|file|max:1024` : artinya adalah file yang di upload `maksimal` size nya adalah `1MB`
>
> Dan jika kita tidak tambahkan validasi `file` di depannya, maka akan dianggap validasi karakter atau integer bukan file

```php
public function store(Request $request)
{
    $validateData = $request->validate([
        'title' => 'required|max:255',
        'slug' => 'required|unique:posts',
        'category_id' => 'required',
        'image' => 'image|file|max:1024',
        'body' => 'required'
    ]);

    $validateData['user_id'] = auth()->user()->id;
    $validateData['excerpt'] = Str::limit(strip_tags($request->body), 200);

    Post::create($validateData);

    return redirect('/dashboard/posts')->with('success', 'New post has been added!');
}
```

Selanjutnya kita balik lagi ke view `create.blade.php` untuk memberikan error nya jika validasi nya tidak lolos

> **Catatan**:
>
> Problem dari upload image disini kita tidak bisa menggunakan method `old` untuk menangkap value dari gambar sebelumnya karena hal tersebut terjadi karena pertimbangan security untuk mencegah agar orang lain tidak mengetahui sturktur directory kita.

```php
<form action="/dashboard/posts" method="POST" class="mb-5" enctype="multipart/form-data">
    @csrf
    ...
    <div class="mb-3">
        <label for="image" class="form-label">Post Image</label>
        <input class="form-control @error('image')
            is-invalid
        @enderror" type="file" id="image" name="image">
        @error('image')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>
    ...
</form>
```

Jika sekarang kita mencoba meng-upload file diatas `1MB` maka validasi error nya akan muncul karena kita set di validasi nya maksimal size file yang bisa di upload adalah `1MB`

![Image Validate Size](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/image-validate-size.png)

Dan jika kita coba upload file selain gambar maka akan muncul juga validasi error nya, misalkan disini saya mencoba upload file pdf

![Image Validate Type](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/image-validate-type.png)

Selanjutnya kita lakukan pengecekan jika user nya tidak mengisikan atau meng-upload gambar nya, karena yang kita inginkan jika tidak ada gambar maka gunakan gambar dari unsplash

```php
public function store(Request $request)
{
    $validateData = $request->validate([
        'title' => 'required|max:255',
        'slug' => 'required|unique:posts',
        'category_id' => 'required',
        'image' => 'image|file|max:2048',
        'body' => 'required'
    ]);

    if ($request->file('image')) {
        $validateData['image'] = $request->file('image')->store('post-images');
    }

    $validateData['user_id'] = auth()->user()->id;
    $validateData['excerpt'] = Str::limit(strip_tags($request->body), 200);

    Post::create($validateData);

    return redirect('/dashboard/posts')->with('success', 'New post has been added!');
}
```

Sekarang kita coba buat postingan baru dengan ukuran gambar yang sesuai

![New Post With Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/new-post-with-image.png)

![New Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/new-image.png)

![Field Image Filled](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/field-image-filled.png)

## View Menggunakan Gambar Dari Database

Sekarang sisanya kita tinggal ubah kode dibagian view nya agar menggunakan gambar dari database jika field nya memiliki gambar dan jika tidak memiliki gambar maka gunakan dari unsplash, kita mulai dari view `show.blade.php`

```php
@extends('dashboard.layouts.main')

@section('container')
    <div class="container">
        <div class="row mb-5">
            <div class="col-lg-8">
                <h1 class="my-3">{{ $post->title }}</h1>
                ...

                @if ($post->image)
                    <div style="max-height: 350px; overflow: hidden">
                        <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->category->name }}" class="img-fluid mt-3">
                    </div>
                @else
                    <img src="https://source.unsplash.com/1200x400?{{ $post->category->name }}" alt="{{ $post->category->name }}" class="img-fluid mt-3">
                @endif

                ...
            </div>
        </div>
    </div>
@endsection
```

Maka sekarang akan tampil gambar yang sudah kita upload sebelumnya

![Post With Custom Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/psot-with-custom-image.png)

Sisanya kita cukup perbaiki `src` pada view yang menangani postingan blog di bagian depan (bukan dashboard) di file `posts.blade.php`

```php
@extends('layouts.main')

@section('container')
    <h1 class="mb-3 text-center">{{ $title }}</h1>

    ...

    @if ($posts->count())
        <div class="card mb-3">
            @if ($posts[0]->image)
                <div style="max-height: 400px; overflow: hidden">
                    <img src="{{ asset('storage/' . $posts[0]->image) }}" alt="{{ $posts[0]->category->name }}" class="img-fluid">
                </div>
            @else
                <img src="https://source.unsplash.com/1200x400?{{ $posts[0]->category->name }}" class="card-img-top" alt="{{ $posts[0]->category->name }}">
            @endif

            ...
        </div>

        <div class="container">
            <div class="row mb-5">
                @foreach ($posts->skip(1) as $post)
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            ...

                            @if ($post->image)
                                <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->category->name }}" class="img-fluid">
                            @else
                                <img src="https://source.unsplash.com/500x400?{{ $post->category->name }}" class="card-img-top" alt="{{ $post->category->name }}">
                            @endif

                            ...
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @else
        <p class="text-center fs-4">No post found.</p>
    @endif

    <div class="d-flex justify-content-end">
        {{ $posts->links() }}
    </div>

@endsection
```

Sekarang seharusnya sudah tampil gambar dari database pada postingan frontend nya

![Front Post Using Custom Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/front-post-using-custom-image.png)

Terakhir paling pada halaman view single post nya di file `post.blade.php`

```php
@if ($post->image)
    <div style="max-height: 350px; overflow: hidden">
        <img src="{{ asset('storage/' . $post->image) }}" alt="{{ $post->category->name }}" class="img-fluid">
    </div>
@else
    <img src="https://source.unsplash.com/1200x400?{{ $post->category->name }}" alt="{{ $post->category->name }}" class="img-fluid">
@endif
```

![Single Post Custom Image](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/upload-image/single-post-custom-image.png)
