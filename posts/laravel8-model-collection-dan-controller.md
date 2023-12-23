---
published: true
title: "Laravel 8 - #5 - Model, Collection dan Controller"
tag: "Programming"
date: "December 22 2023"
excerpt: "Aplikasi yang sudah dibangun sebelumnya itu semua proses nya masih ditangani komponen `routes` kita, contohnya ketika kita melakukan request ke halaman `/posts` untuk menampilkan semua data dari blog post kita dilakukan di dalam routes, begitu pula dengan proses menampilkan halaman views, itu juga dilakukan di dalam routes. Hal tersebut tidak tepat, karena jika kita ingin menerapkan konsep MVC (Model, View, Controller) maka 2 proses tersebut seharusnya kita pisahkan sesuai dengan komponen nya."
cover_image: "/images/posts/Laravel 8 - Model, Collection dan Controller.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Aplikasi yang sudah dibangun sebelumnya itu semua proses nya masih ditangani komponen `routes` kita, contohnya ketika kita melakukan request ke halaman `/posts` untuk menampilkan semua data dari blog post kita dilakukan di dalam routes, begitu pula dengan proses menampilkan halaman views, itu juga dilakukan di dalam routes. Hal tersebut tidak tepat, karena jika kita ingin menerapkan konsep MVC (Model, View, Controller) maka 2 proses tersebut seharusnya kita pisahkan sesuai dengan komponen nya.

Misalkan jika kita ingin bekerja atau berhubungan dengan data, maka kita harus menyimpan kode nya di dalam komponen `Model`. Dan jika terdapat sebuah proses seperti memilih, menampilkan views, maka kita harus menyimpan kode nya di dalam komponen `Controller`.

Maka pada bagian ini, kita akan coba menerapkan konsep MVC dengan cara memisahkan kode nya ke dalam komponen-komponen yang terpisah. Sehingga nantinya kita akan belajar membuat model dan controller dan bagaimana cara menggabungkan ketiga komponen MVC tersebut.

Dan sedikit ada perubahan nama route pada aplikasi sebelumnya dari route `/blog` menjadi `/posts` di file `routes/web.php`

```php
Route::get('/blog', function () {
    ...
});
```

Menjadi

```php
Route::get('/posts', function () {
    ...
});
```

Kemudian navbar anchor link nya juga di file `resources/views/partials/navbar.blade.php`

```php
<a class="nav-link {{ ($title === 'Posts' ? 'active' : '') }}" href="/blog">Blog</a>
```

Menjadi

```php
<a class="nav-link {{ ($title === 'Posts' ? 'active' : '') }}" href="/posts">Blog</a>
```

Dan yang terakhir adalah anchor link pada single post di file `/resources/views/post.blade.php`

```php
<a href="/blog">Back to Posts</a>
```

Menjadi

```php
<a href="/posts">Back to Posts</a>
```

## 3 Cara Pembuatan Model

Terdapat 3 cara untuk pembuatan Model di aplikasi Laravel kita, berikut ada 3 cara untuk membuat Model pada aplikasi Laravel

### PHP Artisan: Membuat Model

Untuk membuat sebuah model pada aplikasi Laravel kita, kita bisa menggunakan perintah PHP Artisan dengan cara seperti berikut ini di terminal kalian

```php
php artisan make:model NamaModel
```

### Membuat Model Manual

Kalian juga bisa membuat model secara manual dengan cara membuat file pada folder `app/Models`

### Membuat Model menggunakan Extension Laravel Artisan

Jika kalian sudah menginstall extension nya, kalian bisa membuat sebuah model dengan menggunakan command palette milik nya Visual Studio Code. Caranya kalian cukup tekan `CTRL` + `P` kemudian ketikan `Artisan: Make Model`

![Artisan Command Pallete Create Model](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/model-collection-dan-controller/artisan-command-palette-create-model.png)

## Pembuatan Model Untuk Data Blog Post

Sebelumnya kita menyimpan data blog post di lokasi routes nya, nah cara tersebut sebetulnya tidak tepat dan tidak efisien (karena kita menduplikat variable tersebut pada route single post nya). Untuk mengatasi hal tersebut, kita disini akan mencoba memindahkan data blog post tersebut kedalam sebuah model.

Kita akan memilih pembuatan model menggunakan cara `PHP Artisan` yang dimana akan menjalankan artisan melalui aplikasi Terminal. Maka disini kita jalankan dengan perintah seperti berikut ini

```php
php artisan make:model Post
```

Maka sekarang terdapat sebuah file baru di folder `app/Models` dengan nama file nya adalah `Post.php`. Pada model tersebut terdapat sebuah kode

```php
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
```

yang dimana berfungsi untuk nantinya terhubung kedalam database, namun karena kita belum butuh maka bisa kita hapus dan extends pada Class `Model` nya juga bisa kita hapus

Sehingga sekarang isi dari file model `Post.php` tersebut seperti berikut ini

```php
<?php

namespace App\Models;

class Post
{

}
```

### Pemindahan Data Posts Dari Routes Kedalam Model

Selanjutnya kita coba cut atau ambil data `$blog_posts` dari route `/posts` agar disimpan di Model `Post.php` dengan access modifier private dan juga static

maka sekarang isi file `Post.php` seperti berikut ini

```php
<?php

namespace App\Models;

class Post
{
    private static $blog_posts = [
        [
            'title' => 'Judul Post Pertama',
            'slug' => 'judul-post-pertama',
            'author' => 'Arman Dwi Pangestu',
            'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi aliquid perspiciatis possimus. Quae sapiente molestiae perferendis ut dolorum illum fugit corrupti! Ratione pariatur quis odio! Explicabo quo incidunt velit aliquam iure, doloribus natus molestiae ab officiis, ea distinctio fugit dolores eos quam magni aliquid libero nihil ex iusto unde? Voluptates!'
        ],
        [
            'title' => 'Judul Post Kedua',
            'slug' => 'judul-post-kedua',
            'author' => 'Sandhika Galih',
            'body' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, nobis qui. Officia eius, debitis eveniet nisi culpa quas, voluptate enim impedit ipsa corrupti sapiente nesciunt mollitia facilis at cumque laudantium.'
        ]
    ];
}

```

### Menghubungkan Routes Dengan Model

Dan isi dari route `/posts` nya menjadi seperti berikut ini

> **Catatan**:
>
> Jika kalian mendapatkan error pada Class `Post` nya, maka kalian harus melakukan import Class nya pada bagian paling atas file dengan perintah berikut ini:
>
> ```php
> use App\Models\Post;
> ```
>
> Jika kalian ingin mempermudah masalah import namespace tersebut, kalian bisa install Extension VSCode yang namanaya `PHP Namespace Resolver`. Extension tersebut jika kita melakukan klik kanan pada VSCode maka kita bisa melakukan `Import All Classes`, sehingga jika ada Class yang error karena namespace nya tidak diload, dengan extension tersbeut akan otomatis terimport semua namespace nya.
>
> Method `all()` juga disini belum kita buat, sehingga pasti akan muncul error

```php
Route::get('/posts', function () {
    return view('posts', [
        "title" => "Posts",
        "posts" => Post::all()
    ]);
});
```

Setelah routes dan model nya terhubung, sekarang kita buat method `all()` nya di Class `Post` atau Model nya seperti berikut ini

> **Catatan**: Tips Object Oriented Programming!
>
> Dikarenakan disini property `$blog_posts` nya adalah `static` maka kita harus menggunakan keyword `self::$property`, namun jika property nya biasa maka kita menggunakan keyword `$this->property`.

```php
<?php

namespace App\Models;

class Post
{
    private static $blog_posts = [
        ...
    ];

    public static function all()
    {
        return self::$blog_posts;
    }
}
```

### Pemindahan Data Single Post Blog Agar Menggunakan Data Dari Model

Nah, pemindahan data dari routes ke model sudah selesai, jika kalian melakukan refresh pada web browser dengan routes `/posts` maka tidak akan muncul error, namun jika kalian masuk ke dalam single post nya, data nya masih menggunakan data dari routes nya (bukan dari model).

Selanjutnya kita akan ubah juga agar data dari single post menggunakan data dari model nya. Sekarang ubah route single page atau route slug nya menjadi seperti berikut ini

```php
// Halaman Single Post
Route::get('posts/{slug}', function ($slug) {
    return view('post', [
        'title' => 'Single Post',
        'post' => Post::find($slug)
    ]);
});
```

Selanjutnya kita buat sebuah method static lagi dengan nama method nya adalah `find()` di Model `Post` nya

```php
<?php

namespace App\Models;

class Post
{
    private static $blog_posts = [
        ...
    ];

    public static function all()
    {
        return self::$blog_posts;
    }

    public static function find($slug)
    {
        $posts = self::$blog_posts;

        $post = [];

        foreach ($posts as $p) {
            if ($p['slug'] === $slug) {
                $post = $p;
            }
        }

        return $post;
    }
}
```

Maka sekarang data dari view single post nya sudah mengambil dari Model yang sudah kita buat dan kode pada bagian routes nya juga sudah menjadi rapih (tidak ada data, karena data memang seharusnya di tempatkan pada komponen model).

## Collection Pada Laravel

Kita bisa ubah data yang kita ambil agar menjadi sesuatu yang disebut dengan collection di Laravel. Apa itu `Collection`? Collection sebetulny adalah pembungkus untuk sebuah Array, yang akan membuat Array menjadi lebih sakti.

Maksudnya bagaimana? lihat kode pada bagian mode berikut ini

```php
private static $blog_posts = [
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

public static function all()
{
    return self::$blog_posts;
}
```

Pada data model tersebut, kita mempunyai sebuah array di dalam array, ada array numeric yang didalamnya ada array associative. Nah kita akan membungkus array tersebut agar menjadi sebuah Collection.

Jika pada dokumentasi Laravel nya, di dalam Laravel menyediakan sebuah Collection yang merupakan pembungkus dari arrays of data. Sebagai contoh, lihat kode berikut ini. Kita akan menggunakan helper `collect` untuk membuat sebuah instance collection baru dari array kemudian menjalankan function `strtoupper` pada setiap element dan menghapus semua element kosong:

```php
$collection = collect(['taylor', 'abigail', null])->map(function ($name) {
    return strtoupper($name);
})->reject(function ($name) {
    return empty($name);
});
```

### Cara Membuat Collection

Seperti yang dijelaskan sebelumnya, helper `collect` akan mengembalikan sebuah namespace `Illuminate\Support\Collection` instance untuk memberikan array. Jadi, untuk membuat sebuah collection cukup simpel seperti kode berikut ini:

```php
$collection = collect([1, 2, 3]);
```

### Method Yang Tersedia Untuk Collection

Dengan mengubah array kita menjadi collection, maka array kita sekarang dapat menjalankan method-method yang tersedia pada collection. Berikut adalah list-list method yang tersedia pada Collection.

> **Catatan**:
>
> Kalian bisa melihat list method-method yang tersedia secara lebih lengkap pada dokumentasi laravel berikut ini [laravel.com/docs/8.x/collections#available-methods](https://laravel.com/docs/8.x/collections#available-methods)

![Collection Available Method](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/model-collection-dan-controller/collection-available-method.png)

### Alasan Mengapa Melakukan Convert Array Menjadi Collection

Nah, berhubung array yang di convert menjadi collection dapat menjalankan method-method. Kita akan menggunakan beberapa method keren pada collection seperti `first` dan `firstWhere`.

Method `first` ini berfungsi untuk mencari element yang pertama, jika method `firstWhere` untuk mencari element yang pertama ketemu dengan sebuah kondisi.

### Mengubah Data Post Model Menjadi Sebuah Collection

Setelah memahami mengapa kita perlu mengubah array menjadi collection, selanjutnya kita akan ubah data array pada post model yang sudah kita buat sebelumnya agar menjadi sebuah collection di file `app\Models\Post.php`

> **Catatan**: Tips Object Oriented Programming!
>
> Perhatikan penulisan pemanggilan sebuah method yang static
>
> ```php
> static::method();
> ```
>
> Keyword static didepan, merupakan teknik penulisan untuk pemanggilan method yang static, namun jika variabel teknik penulisan nya adalah
>
> ```php
> self::$property;
> ```

```php
<?php

namespace App\Models;

class Post
{
    private static $blog_posts = [
        ...
    ];

    public static function all()
    {
        return collect(self::$blog_posts);
    }

    public static function find($slug)
    {
        $posts = static::all();

        // $post = [];

        // foreach ($posts as $p) {
        //     if ($p['slug'] === $slug) {
        //         $post = $p;
        //     }
        // }

        return $posts->firstWhere('slug', $slug);
    }
}
```

Bisa kalian lihat pada kode diatas tersebut, yang sebelumnya kita melakukan sebuah looping untuk mencari data berdasarkan `$slug` di url atau route nya. Sekarang menjadi simpel dengan menggunakan method yang tersedia pada collection yaitu `firstWhere`.

Kode tersebut artinya sebagai berikut, ambil semua collection dari property `$posts` kemudian cari yang pertama kali ditemukan yang dimana slug nya = `$slug`.

## Pembuatan Controller

Setelah 2 komponen selesai kita buta yaitu Model dan View, selanjutnya kita akan membuat 1 komponen lagi yaitu Controller agar paradigma MVC benar-benar kita gunakan. Jika kalian lihat sekarang pada bagian routes nya, yang menangani proses itu masih routes nya itu sendiri.

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
        "image" => "me-circle.png"
    ]);
});

Route::get('/posts', function () {
    return view('posts', [
        "title" => "Posts",
        "posts" => Post::all()
    ]);
});

// Halaman Single Post
Route::get('posts/{slug}', function ($slug) {
    return view('post', [
        'title' => 'Single Post',
        'post' => Post::find($slug)
    ]);
});
```

Nah, seharusnya proses tersebut di handle atau diurus oleh Controller jika kita ingin menerapkan konsep paradgima MVC. Karena memang yang namanya Controller itu adalah yang menangani atau mengendalikan nampilin atau View yang mana dan ngambil Model dari mana.

Jika diambil penjelasan Controller pada website resmi Laravel nya, Controller adalah dari pada kita mendefinisikan semua logic program kita saat menangani proses request atau closure

```php
Route::get('', function() {
    // Anonymous function inilah yang dinamakan closure
})
```

Dari pada kita bikin sebagai closure di dalam routes file kita, kita bisa merapihkan hal tersebut menggunakan sebuah Class `Controller`. Controller bisa menggabungkan atau mengelompokan request yang serupa yang saling terkait untuk menangani logic nya dalam sebuah Class. Contohnya, jika kita ingin menangani halaman semua postingan dan yang menangani single postingan. Nah, hal tersebut cocok dijadikan satu Controller karena dua proses tersebut dihandle oleh Controller Post nantinya.

### Cara Membuat atau Menulis Controller

Untuk pembuatan atau penulisan sebuah Controller, kita bisa bikin sebuah file yang tersimpan di `app/Http/Controllers/` atau namespace folder ini `App\Http\Controllers\` kemudian isian dari file tersebut membuat sebuah class yang format penulisan nya adalah `Nama` kemudian di ikuti dengan kata `Controller` sehingga menjadi `IniNamaController` atau pada studi kasus kita `PostController` dan class tersebut meng-extends atau mewarisi class bawaan laravel yaitu `Controller`. Nah, didalam class tersebut nantinya mempunyai berbagai macam method untuk menangani tiap-tiap logic nya. Contoh penulisan Controller pada dokumentasi resmi Laravel nya sebagai berikut

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        return view('user.profile', [
            'user' => User::findOrFail($id)
        ]);
    }
}
```

Nah, nantinya kita akan membuat 2 buah method didalam class Controller tersebut, 1 untuk menangani semua postingan dan 1 lagi untuk menangani sebuah postingan atau single post nya. Nah, setelah controller jadi, maka si routes nya tidak mempunyai lagi closure, namun kita tulis seperti ini saja

```php
use App\Http\Controllers\UserController;

Route::get('/user/{id}', [UserController::class, 'show']);
```

### Cara Membuat Controller Menggunakan Artisan

Sama halnya dengan model, kita juga bisa membuat controller menggunakan perintah php artisan dengan perintah seperti berikut ini

```php
php artisan make:controller NamaController
```

### Implementasi atau Penerapan Controller untuk Semua Postingan

Setelah mengetahui mengapa menggunakan Controller dan bagaimana cara membuatnya, sekarang saatnya kita menerapkan nya. Sekarang kalian buat sebuah Controller menggunakan perintah berikut ini:

```php
php artisan make:controller PostController
```

Maka sekarang terdapat sebuah file baru di `app/Http/Controllers/PostController.php` dengan isian seperti berikut:

> **Catatan**:
>
> Abaikan terlebih dahulu bagian
>
> ```php
> use Illuminate\Http\Request;
> ```
>
> Karena hal tersebut nantinya akan berguna untuk menangani request jika kita mempunyai form atau data di URL sebagai request.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    //
}
```

Setelah Controller dibuat, selanjutnya kita akan membuat method yang namanya `index` sebagai method default nya.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return view('posts', [
            "title" => "Posts",
            // Menggunakan use
            //"posts" => Post::all()

            // Menggunakan expand class
            "posts" => \App\Models\Post::all()
        ]);
    }
}
```

Setelah Controller ready atau siap, sekarang kita benarkan penulisan routes nya agar tidak lagi menggunakan closure, sehingga yang tadinya penulisan nya seperti ini:

```php
Route::get('/posts', function () {
    return view('posts', [
        "title" => "Posts",
        "posts" => Post::all()
    ]);
});
```

Sekarang menjadi seperti ini

```php
Route::get('/posts', [PostController::class, 'index']);
```

Nah, sekarang kita sudah menerapkan controller untuk menangani halaman semua postingan blog kita.

### Implementasi atau Penerapan Controller untuk Single Postingan

Setelah sebelumnya kita sudah menerapkan controller untuk menangani halaman semua postingan, selanjutnya kita buat sebuah method baru dengan nama `show` untuk menangani single post nya.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return view('posts', [
            "title" => "Posts",
            // Menggunakan use
            //"posts" => Post::all()

            // Menggunakan expand class
            "posts" => \App\Models\Post::all()
        ]);
    }

    public function show($slug)
    {
        return view('post', [
            'title' => 'Single Post',
            'post' => \App\Models\Post::find($slug)
        ]);
    }
}
```

Nah, sekarang kita ubah bagian kode routes yang menggunakan closure pada route yang menangani single post nya agar menggunakan controller nya

```php
Route::get('/posts', [PostController::class, 'index']);
// Halaman Single Post
Route::get('posts/{slug}', [PostController::class, 'show']);
```
