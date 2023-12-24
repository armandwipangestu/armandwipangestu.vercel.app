---
published: true
title: "Laravel 8 - #7 - Post Model dan Route Model Binding"
tag: "Programming"
date: "December 24 2023"
excerpt: "Pada pembahasan kali ini kita akan membahas kembali mengenai model didalam Laravel, yang dimana akan kita perbaiki model `Post` kita yang sebelumnya dibuat secara manual, kali ini kita akan coba buat agar model nya dengan cara yang benar yaitu dengan merepresentasikan class model nya sebagai tabel didalam database. Hal tersebut nantinya kita juga harus membuat sebuah migrasi untuk tabel Post tersebut."
cover_image: "/images/posts/Laravel 8 - Post Model dan Route Model Binding.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan kali ini kita akan membahas kembali mengenai model didalam Laravel, yang dimana akan kita perbaiki model `Post` kita yang sebelumnya dibuat secara manual, kali ini kita akan coba buat agar model nya dengan cara yang benar yaitu dengan merepresentasikan class model nya sebagai tabel didalam database. Hal tersebut nantinya kita juga harus membuat sebuah migrasi untuk tabel Post tersebut.

## Membuat Model Post Baru

Kalian bisa ubah nama file model `Post.php` di folder `app/Models` menjadi `Post_.php` agar tersimpan history pembelajaran nya, selanjutnya kita buat model Post baru namun dengan cara menggunakan perintah php artisan

```php
php artisan make:model Post
```

Nah, setelah membuat model nya kita juga perlu membuat migration nya untuk membuat skema tabel Post kita sehingga kita perlu membuat 2x. Namun, ada caranya agar kita dapat membuat model dan migration nya hanya dengan 1 perintah yaitu dengan perintah berikut ini

```php
php artisan make:model -m Post
```

Maka sekarang akan muncul output di terimanl nya seperti berikut ini

> **Catatan**:
>
> Bisa kalian lihat, nama file migration nya sudah menjadi plural atau jamak `posts` sedangkan nama model nya yaitu singular `Post`.

```php
Model created successfully.
Created Migration: 2023_12_23_182552_create_posts_table
```

Setelah file model dan migration nya dibuat, sekarang kita ubah field yang akan disimpan di tabel Post kita dengan cara mengubah isian dari method `up` pada file migration nya

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('excerpt');
        $table->text('body');
        $table->timestamp('publish_at')->nullable();
        $table->timestamps();
    });
}
```

Jika skema nya sudah siap, sekarang jalankan perintah berikut ini untuk memperbarui skema tabel nya

```php
php artisan migrate:fresh
```

### Mengisikan Data kedalam Tabel Post

Setelah tabel didalam database nya diperbarui, selanjutnya kita isikan data kedalam tabel post menggunakan `Tinker`

```php
php artisan tinker
```

Setelah masuk kedalam shell tinker nya, sekarang buat instance object dari class Model nya dengan perintah

```php
$post = new Post;
```

Selanjutnya kita isikan data object untuk masing-masing field nya

```php
$post->title = 'Judul Pertama';
$post->excerpt = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus illo atque quod minus, iusto nam error fugiat delectus nobis ullam incidunt a corrupti inventore reprehenderit blanditiis quia tempora qui culpa eligendi quas sit animi? Ex, adipisci.';
$post->body = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus illo atque quod minus, iusto nam error fugiat delectus nobis ullam incidunt a corrupti inventore reprehenderit blanditiis quia tempora qui culpa eligendi quas sit animi? Ex, adipisci. Fuga laboriosam facilis ullam animi at maxime, quo recusandae libero architecto sapiente sed ut unde aliquam sit consequatur itaque necessitatibus dicta hic nobis sequi minus nam. Minus architecto quibusdam fugiat earum voluptatibus aliquid deleniti animi tenetur, rerum quod aliquam voluptate autem neque reiciendis adipisci velit, nulla, at amet beatae natus accusantium pariatur. Officia atque incidunt rerum optio, ut at dolorem ratione facilis voluptatibus corrupti!';
```

Ingat, perintha diatas hanya menyimpan data kedalam object namun belum tersimpan kedalam database nya, untuk menyimpan nya kita harus save terlebih dahulu dengan perintah

```php
$post->save();
```

Sekarang buat post baru lagi dengan cara membuat instace baru

```php
$post = new Post;
```

Misalkan data nya seperti ini

```php
$post->title = 'Judul Kedua';
$post->excerpt = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere soluta quidem consequuntur a et, cupiditate officia consectetur! Molestias, molestiae.';
$post->body = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere soluta quidem consequuntur a et, cupiditate officia consectetur! Molestias, molestiae. Voluptas inventore eaque aut placeat ea sint esse voluptatem debitis nesciunt, eos consequuntur dignissimos sunt dolor, nihil veritatis, commodi soluta? Non vel quis omnis magnam eos ut, beatae laboriosam. Vero qui quas, cumque possimus illo deserunt rerum non quia nihil quibusdam doloremque cum repellat fugiat suscipit! Doloremque ducimus harum ipsam quisquam inventore itaque, voluptatibus aperiam sint non nulla cumque est tempora earum obcaecati mollitia perspiciatis, tenetur fugit eos natus modi sequi nemo odit exercitationem qui. Magni molestiae vitae dolorum aut voluptates?';
```

Dan kita save

```php
$post->save();
```

Setelah data nya tersimpan, kita bisa langsung query menggunakan tinker dengan perintah

### Jenis Jenis Query Collection

```php
Post::all();
```

Maka akan muncul semua data nya

```php
= Illuminate\Database\Eloquent\Collection {#7091
    all: [
      App\Models\Post {#7092
        id: 1,
        title: "Judul Pertama",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ...",
        body: "...",
        publish_at: null,
        created_at: "2023-12-23 18:39:35",
        updated_at: "2023-12-23 18:41:49",
      },
      App\Models\Post {#7093
        id: 2,
        title: "Judul Kedua",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ...",
        body: "...",
        publish_at: null,
        created_at: "2023-12-23 18:42:22",
        updated_at: "2023-12-23 18:42:22",
      },
    ],
  }
```

Atau hanya ingin menampilkan yang pertama saja

```php
Post::first();
```

Hasil data nya

```php
= App\Models\Post {#7095
    id: 1,
    title: "Judul Pertama",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ...",
    body: "...",
    publish_at: null,
    created_at: "2023-12-23 18:39:35",
    updated_at: "2023-12-23 18:41:49",
  }
```

Atau jika kita ingin mencari postingan semuanya namun hanya judul nya saja, bisa menggunakan method `pluck`

```php
Post::pluck('title');
```

Maka hasil data nya

```php
= Illuminate\Support\Collection {#7091
    all: [
      "Judul Pertama",
      "Judul Kedua",
    ],
  }
```

Atau ingin mencari postingan yang id nya `2`

```php
Post::find(2);
```

Maka hasilnya

```php
= App\Models\Post {#6142
    id: 2,
    title: "Judul Kedua",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    body: "...",
    publish_at: null,
    created_at: "2023-12-23 18:42:22",
    updated_at: "2023-12-23 18:42:22",
  }
```

### Penjelasan Mengapa Tidak Error

Sekarang jika kalian kembali ke halaman `/posts` maka tidak akan muncul error padahal kita tidak mengubah view, routes dan controller nya. Ajaib bukan? padahal jika kita lihat pada model Post nya tidak mempunyai method `all` dan method `find`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
}
```

Tidak seperti model yang kita buat sebelumnya yang sudah di rename menjadi `Post_.php`

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
        return $posts->firstWhere('slug', $slug);
    }
}
```

Mengapa bisa seperti itu? karena method `all` dan `find` sudah ada di Laravel, sehingga method `all` dan `find` pada Controller Post nya bisa berjalan

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return view('posts', [
            "title" => "Posts",
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

### Modifikasi Views Posts

Namun disini method `show` nya tidak berjalan karena method `find` bukan mencari berdasarkan slug melainkan mencari berdasarkan id, kita coba benarkan pada file views `posts.blade.php` agar link anchor nya mengarah ke id

```php
@extends('layouts.main')

@section('container')
    @foreach ($posts as $post)
        ...
            <h2>
                <a href="/posts/{{ $post['id'] }}">{{ $post['title'] }}</a>
            </h2>
        ...
    @endforeach
@endsection
```

Maka sekarang single page post nya akan berjalan kembali namun berdasarkan id nya bukan slug nya

![Single Page Post By Id](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/single-page-post-by-id.png)

Selanjutnya kita tidak akan lagi menggunakan notasi array `$post['id']` untuk mengakses data pada variable nya, namun kita akan menggunakan notasi object `$post->id`. Mengapa pada view tersebut jalan ketika menggunakan notasi array? karena collection itu memungkinkan kita bisa mengakses menggunakan kedua notasi tersebut.

Sehingga sekarang bisa kita ubah menjadi notasi object dengan menggunakan panah `->`, maka sekarang isian dari file view `posts.blade.php` nya seperti berikut ini

```php
@extends('layouts.main')

@section('container')
    @foreach ($posts as $post)
        <article class="mb-5">
            <h2>
                <a href="/posts/{{ $post->id }}">{{ $post->title }}</a>
            </h2>
            <h5>By: {{ $post->author }}</h5>
            <p>{{ $post->excerpt }}</p>
        </article>
    @endforeach
@endsection
```

### Modifikasi Views Post atau Single Page Post

Jika kalian perhatikan pada file view single page post `post.blade.php`, penulisan data dari `body` post nya kita simpan pada tag element `<p>`. Nah, mungkin saja kedepannya postingan yang dikirim itu beberapa paragraf (mungkin panjang). Sehingga, sangat memungkinkan tag element `<p>` tersebut berada didalam data `body` nya

```php
@extends('layouts.main')

@section('container')
    ...
        <p>{{ $post['body'] }}</p>
    ...
@endsection
```

Nah, jika sekarang kan isian dari `body` nya itu hanya seperti berikut ini

```html
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere soluta quidem
consequuntur a et, cupiditate officia consectetur! Molestias, molestiae.
Voluptas inventore eaque aut placeat ea sint esse voluptatem debitis nesciunt,
eos consequuntur dignissimos sunt dolor, nihil veritatis, commodi soluta? Non
vel quis omnis magnam eos ut, beatae laboriosam. Vero qui quas, cumque possimus
illo deserunt rerum non quia nihil quibusdam doloremque cum repellat fugiat
suscipit! Doloremque ducimus harum ipsam quisquam inventore itaque, voluptatibus
aperiam sint non nulla cumque est tempora earum obcaecati mollitia perspiciatis,
tenetur fugit eos natus modi sequi nemo odit exercitationem qui. Magni molestiae
vitae dolorum aut voluptates?
```

Mungkin saja isian dari body kedepannya seperti ini, mungkin nantinya kedepannya kita menggunakan tools WYSIWYG (What You See What You Get)

```html
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eius sint
  tempora, et alias tenetur saepe ipsa nihil temporibus nemo ipsum quas
  repellendus nulla tempore quaerat a vitae nam. Harum vitae cum, quas
  doloremque vero esse dicta tempora, quidem suscipit ad temporibus quibusdam
  impedit adipisci nemo, officia voluptas. Dolorum, delectus consequuntur
  impedit cupiditate cumque quibusdam dicta sed maxime in accusamus laboriosam
  magnam odio facere amet iure sit nisi incidunt numquam non blanditiis
  exercitationem dolorem voluptatibus architecto.
</p>

<p>
  Repudiandae reiciendis nisi dolore deserunt exercitationem vitae perferendis,
  minima accusantium amet. Animi, quia eius? Hic assumenda ipsum numquam
  repudiandae? Sapiente, quae ea atque ab iste aperiam harum! Expedita
  reprehenderit temporibus doloremque? Modi harum nobis deleniti laudantium
  aspernatur repellat corrupti nostrum vitae voluptatibus. At, ut.
</p>
```

Sehingga bisa kita hilangkan tag `<p>` pada view nya, sekalian kita ubah juga format penulisan nya dari array menjadi object seperti berikut ini.

```php
@extends('layouts.main')

@section('container')
    <article>
        <h2>{{ $post->title }}</h2>
        <h5>By: {{ $post->author }}</h5>
        {{ $post->body }}
    </article>

    <a href="/posts">Back to Posts</a>
@endsection
```

### Membuat Data Post Baru

Sekarang kita coba membuat data post baru menggunakan tinker namun pada bagian body nya kita sisipkan tag element html seperti `<p>` kira-kira apa yang akan terjadi.

```php
$post = new Post;
$post->title = 'Judul Post Ketiga';
$post->excerpt = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eius sint';
$post->body = '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eius sint tempora, et alias tenetur saepe ipsa nihil temporibus nemo ipsum quas repellendus nulla tem
pore quaerat a vitae nam. Harum vitae cum, quas doloremque vero esse dicta tempora, quidem suscipit ad temporibus quibusdam impedit adipisci nemo, officia voluptas. Dolorum, delectus conse
quuntur impedit cupiditate cumque quibusdam dicta sed maxime in accusamus laboriosam magnam odio facere amet iure sit nisi incidunt numquam non blanditiis exercitationem dolorem voluptatib
us architecto.</p><p>Repudiandae reiciendis nisi dolore deserunt exercitationem vitae perferendis, minima accusantium amet. Animi, quia eius? Hic assumenda ipsum numquam repudiandae? Sapie
nte, quae ea atque ab iste aperiam harum! Expedita reprehenderit temporibus doloremque? Modi harum nobis deleniti laudantium aspernatur repellat corrupti nostrum vitae voluptatibus. At, ut
.</p>';
$post->save();
```

Nah, sekarang jika kalian pergi ke single page post untuk postingan yang ketiga. Alih-alih tag nya berjalan, tag `<p>` nya malah ikut ter-render seperti text biasa, kita tidak mau dong hal tersebut terjadi.

![Single Page Post Render Element](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/single-page-post-render-element.png)

Hal tersebut mengapa terjadi? itu karena Laravel mencoba mengamankan isian dari variabel kita di dalam string blade ini

```php
{{ $post->body }}
```

Notasi double curly braces atau dua kurung kurawal tersebut artinya blade akan mencetak menggunakan `php echo` sekaligus menjalankan method atau function `htmlspecialchars`. Sehingga, jika didalam nya terdapat tag html, function tersebut akan meng-escape.

Jika hal tersebut tidak kita inginkan atau kita pengen menampilkan tag nya sesuai fungsi nya bukan di render seperti text biasa, kita jangan gunakan format penulisan bladde `{{  }}` tetapi kita bisa gunakan format penulisan blade nya seperti berikut ini

> **Catatan**: Penting!
>
> Format penulisan `{!!  !!}` harus dilakukan dengan hati-hati dan pastikan input-an yang dimasukan itu bebas dari script yang aneh-aneh.

```php
{!! $post->body !!}
```

Format penulisan `{!!  !!}` tersebut artinya kita tidak akan melakukan escape karatkter, sehingga sekarang tag `<p>` nya akan tampil sebagai mestinya.

![Single Page Post Un Esacpe Element](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/single-page-post-un-escape-element.png)

### Membuat Data Post Baru Menggunakan Method Create

Nah, pada sebelumnya kita membuat sebuah data pada tinker kita menjalankan perintah seperti berikut

```php
$post = new Post;
$post->title
$post->excerpt
$post->body
$post->save();
```

Kita bisa gunakan metode lain yaitu dengan cara menggunakan method `create` seperti berikut

```php
Post::create([
    'title' => 'Judul Ke Empat',
    'excerpt' => 'orem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad',
    'body' => '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad, animi iste eligendi dicta quam itaque consectetur magnam voluptates? Facilis, ipsum sapiente beatae suscipit fugiat quaerat necessitatibus accusamus.</p> <p>Illum voluptatum, reprehenderit animi iure labore itaque iusto assumenda voluptatibus dolorum vel deleniti illo ipsum obcaecati consequuntur cupiditate? Odio laboriosam officia hic aut esse delectus fugiat, recusandae at itaque nostrum dolor quo dolorem nesciunt tenetur ea neque vel sunt error quod exercitationem facere ex cum? Sint velit nihil quia veritatis corrupti! Vel ratione repudiandae libero aut excepturi in magni.</p> <p>Est, similique molestias culpa aliquam maiores perferendis placeat nulla iusto, optio deserunt magnam quae. Culpa exercitationem reiciendis omnis quod quia aliquid expedita at, doloribus nemo impedit unde quasi provident repellendus voluptate, asperiores quidem commodi laudantium. Fugiat aliquid culpa laborum aspernatur aliquam nam, debitis assumenda iusto vel dolore impedit dolor veritatis blanditiis. Sunt fugit sed in dolores?</p>',
]);
```

Nah jika kita mencoba menjalankan perintah pada tinker diatas, kita akan mendapatkan sebuah error message yaitu `Mass Assignment Exception`

```php
 Illuminate\Database\Eloquent\MassAssignmentException  Add [title] to fillable property to allow mass assignment on [App\Models\Post].
```

Hal tersebut terjadi karena Laravel sudah menangani nya, sehingga tidak boleh banyak property sekaligus langung dimasukan kedalam tabel seperti perintah tersebut, default nya tidak boleh atau dijagain.

Cara untuk mengatasi nya, kita harus membuat sebuah property yang namanya `fillable` didalam model `Post`, sekarang kita bisa tambahkan property berikut ini didalam model Post nya

> **Catatan**:
>
> Jika kita tidak tulis yang tidak masuk kedalam property `fillable` tersebut, maka field tersebut tidak bisa diisi menggunakan `create` dan nantinya akan otomatis diisi sesuai dengan apa yang kita buat didalam skema atau file migration (jika mempunyai nilai default, maka akan menggunakan nilai tersebut, jika timestamps maka akan menggunakan nilai waktu ketika data tersebut dibuat)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'excerpt', 'body'];
}
```

Jika sudah, sekarang kita bisa jalankan kembali method `create` nya di tinker namun harus di reset terlebih dahulu session nya dengan cara keluar dari shell nya kemudian masuk kembali lagi dan jalankan method create nya. Maka sekarang akan berhasil mengisikan data menggunakan create (tidak lagi terkena error Exception Mass Assignment)

```php
[!] Aliasing 'Post' to 'App\Models\Post' for this Tinker session.
= App\Models\Post {#6140
    title: "Judul Ke Empat",
    excerpt: "orem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad",
    body: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad, animi iste eligendi dicta quam itaque consectetur magnam voluptates? Facilis, ipsum sapiente beatae suscipit fugiat quaerat necessitatibus accusamus.</p> <p>Illum voluptatum, reprehenderit animi iure labore itaque iusto assumenda voluptatibus dolorum vel deleniti illo ipsum obcaecati consequuntur cupiditate? Odio laboriosam officia hic aut esse delectus fugiat, recusandae at itaque nostrum dolor quo dolorem nesciunt tenetur ea neque vel sunt error quod exercitationem facere ex cum? Sint velit nihil quia veritatis corrupti! Vel ratione repudiandae libero aut excepturi in magni.</p> <p>Est, similique molestias culpa aliquam maiores perferendis placeat nulla iusto, optio deserunt magnam quae. Culpa exercitationem reiciendis omnis quod quia aliquid expedita at, doloribus nemo impedit unde quasi provident repellendus voluptate, asperiores quidem commodi laudantium. Fugiat aliquid culpa laborum aspernatur aliquam nam, debitis assumenda iusto vel dolore impedit dolor veritatis blanditiis. Sunt fugit sed in dolores?</p>",
    updated_at: "2023-12-23 19:43:12",
    created_at: "2023-12-23 19:43:12",
    id: 4,
  }
```

Maka sekarang total post nya terdapat 4 buah data

![Total Post Data](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/total-post-data.png)

### Perbedaan Property Fillable dan Guarded

Nah, jadi harus ditulis field-field mana saja yang `fillable` atau property yang boleh diisi. Namun, sebetulnya ada kebalikan dari `fillable` jika kalian tidak ingin menambahkan satu-satu field-field nya yaitu `guarded`

Misalkan, field `id` yang ingin dijagain dan sisanya boleh diisi

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // protected $fillable = ['title', 'excerpt', 'body'];
    protected $guarded = ['id'];
}
```

Sehingga dapat kita simpulkan

- `fillable`: ini yang boleh diisi, sisanya tidak boleh
- `guarded`: ini yang tidak boleh diisi, sisanya boleh

Silahkan kalian pilih mau pakai yang mana, kedua property tersebut nantinya akan berguna jika ingin melakukan Mass Assignment yang lain (selain dari `create`), misalkan kita ingin `update`. Nah `update` juga merupakan sebuah Mass Assigment, sehingga jika kita menjalankan perintah seperti berikut ini

```php
Post::find(3)->update(['title' => 'Judul Ketiga Berubah']);
```

Nah hal tersebut bisa berjalan, karena kita hanya tidak memperbolehkan field `id` saja yang tidak boleh diubah

```php
protected $guarded = ['id'];
```

Maka sekarang jika kalian lihat data ketiga, title nya berubah menjadi `Judul Ketiga Berubah`

```php
Post::all();
```

```php
...
App\Models\Post {#7105
        id: 3,
        title: "Judul Ketiga Berubah",
        excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eius sint",
        body: "...",
        publish_at: null,
        created_at: "2023-12-23 19:19:38",
        updated_at: "2023-12-23 19:54:52",
      },
...
```

Atau misalkan kita coba ubah menggunakan metode lain yaitu `where`

> **Catatan**:
>
> Method `find` jika diartikan pada raw SQL adalah `WHERE id = ...` nah jika method `where` jika diartikan pada raw SQL bisa berubah ubah bukan hanya `id` atau pakai yang lain seperti `title`

```php
Post::where('title', 'Judul Ketiga Berubah')->update(['excerpt' => 'excerpt postingan ketiga berubah']);
```

Jika perintah diatas dijalankan maka akan muncul output

```php
= 1
```

Artinya terdapat 1 data yang berubah dan jika kita kembali kehalaman `/posts` nya maka data nya akan seperti berikut ini

![Update Data Posts](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/update-data-posts.png)

## Route Model Binding

Jika dikutip dari dokumentasi resmi Laravel nya. "Pada saat kita menyuntikkan sebuah id dari model kita kedalam route kita atau kedalam controller, yang biasanya kita lakukan adalah query record yang kita cari berdasarkan id tadi. Nah Laravel mempunyai sebuah fitur yang namanya Route Model Binding yang tugasnya meng-skip apa yang kita lakukan tadi, sehingga Laravel nya akan langsung melakukan query in agar supaya dapat langsung data sesuai dengan apa yang kita cari tadi, tanpa harus kirimin id terus kita query sendiri atau mengirimkan instance dari model yang sesuai"

### Implementasi Route Model Binding

> **Catatan**:
>
> Penulisan type hinting ini harus kalian perhatikan, misalkan yang kalian tulis pada property parameter anonymous function nya adalah `$user`, maka harus sama persis dengan apa yang kalian tulis pada route nya `/users/{user}` (tidak boleh berbeda)

```php
use App\Models\User;

Route::get('/users/{user}', function (User $user) {
    return $user->email;
});
```

Pada saat kita akan mendapatkan sesuatu dari URL kita, biasanya kan kita tulis `/users/{id}` atau `/users/{slug}` (kita kirimin willcard nya). Nah kalo sekarang kita langsung aja panggil instance nya, kalo kita ngirimin nya post kita kirim nya post di `/.../{disini}` atau kalo ngirim nya `user` langsung kita kirim `/users/{user}` tidak usah `id` atau `slug` lagi.

Tapi didalam parameter anonymous function nya kita langsung kasih type hinting nya atau tipe data nya bahwa dia itu adalah model yang namanya user `function (User $user)`

Jika kita lihat sekarang kode dari `PostController.php` nya

```php
public function show($slug)
{
    return view('post', [
        'title' => 'Single Post',
        'post' => \App\Models\Post::find($slug)
    ]);
}
```

Yang kita cari adalah slug, namun method `find` yang dicari adalah `id` sehingga bisa kita ubah menjadi

```php
public function show($id)
{
    return view('post', [
        'title' => 'Single Post',
        'post' => \App\Models\Post::find($id)
    ]);
}
```

Nah, method tersebut artinya kita melakukan query terlebih dahulu, ambil `id` nya lalu query menggunakan method `find`. Nah, sekarang kita bisa tidak melakukan hal tersebut dengan cara mengubah file routes nya di `web.php`

```php
Route::get('posts/{post}', [PostController::class, 'show']);
```

Nah sekarang di route nya, parameter yang ditangkap bukan lagi `id` melainkan `post` sehingga kode nya menjadi seperti berikut ini

```php
public function show(Post $post)
{
    return view('post', [
        'title' => 'Single Post',
        'post' => $post
    ]);
}
```

`Post $post` artinya kita ikat karena namanya juga Route Model Binding, jadi routes nya tadi mengirimkan model ke method `show` lalu di ikat di `Post $post`. Sehingga yang dikirimkan kedalam view nya tidak perlu lagi melakukan query dengan method `find` namun bisa langsung jadi `$post`.

Nah, hal tersebut memungkinkan kita untunk mengirimkan data bukan lagi `id` pada url nya. Karena jika `id` takutnya nanti ditebak atau diakses secara paksa.

### Penambahan Slug Pada Skema Tabel Post

Kita buka kembali file migrations untuk tabel post nya, kemudian tambahkan field `slug`

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
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

Setelah skema database diperbarui, kita lakukan lagi `migrate:fresh` untuk menerapkan skema terbaru

```php
php artisan migrate:fresh
```

Sekarang masuk kembali kedalam shell `Tinker` nya

```php
php artisan tinker
```

Kemudian isikan kembali data postingan nya

```php
Post::create([
    'title' => 'Judul Pertama',
    'slug' => 'judul-pertama',
    'author' => 'Arman Dwi Pangestu',
    'excerpt' => 'Lorem ipsum pertama',
    'body' => '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad, animi iste eligendi dicta quam itaque consectetur magnam voluptates? Facilis, ipsum sapiente beatae suscipit fugiat quaerat necessitatibus accusamus.</p> <p>Illum voluptatum, reprehenderit animi iure labore itaque iusto assumenda voluptatibus dolorum vel deleniti illo ipsum obcaecati consequuntur cupiditate? Odio laboriosam officia hic aut esse delectus fugiat, recusandae at itaque nostrum dolor quo dolorem nesciunt tenetur ea neque vel sunt error quod exercitationem facere ex cum? Sint velit nihil quia veritatis corrupti! Vel ratione repudiandae libero aut excepturi in magni.</p> <p>Est, similique molestias culpa aliquam maiores perferendis placeat nulla iusto, optio deserunt magnam quae. Culpa exercitationem reiciendis omnis quod quia aliquid expedita at, doloribus nemo impedit unde quasi provident repellendus voluptate, asperiores quidem commodi laudantium. Fugiat aliquid culpa laborum aspernatur aliquam nam, debitis assumenda iusto vel dolore impedit dolor veritatis blanditiis. Sunt fugit sed in dolores?</p>',
]);

Post::create([
    'title' => 'Judul Ke Dua',
    'slug' => 'judul-ke-dua',
    'author' => 'Arman Dwi Pangestu',
    'excerpt' => 'Lorem ipsum ke dua',
    'body' => '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad, animi iste eligendi dicta quam itaque consectetur magnam voluptates? Facilis, ipsum sapiente beatae suscipit fugiat quaerat necessitatibus accusamus.</p> <p>Illum voluptatum, reprehenderit animi iure labore itaque iusto assumenda voluptatibus dolorum vel deleniti illo ipsum obcaecati consequuntur cupiditate? Odio laboriosam officia hic aut esse delectus fugiat, recusandae at itaque nostrum dolor quo dolorem nesciunt tenetur ea neque vel sunt error quod exercitationem facere ex cum? Sint velit nihil quia veritatis corrupti! Vel ratione repudiandae libero aut excepturi in magni.</p> <p>Est, similique molestias culpa aliquam maiores perferendis placeat nulla iusto, optio deserunt magnam quae. Culpa exercitationem reiciendis omnis quod quia aliquid expedita at, doloribus nemo impedit unde quasi provident repellendus voluptate, asperiores quidem commodi laudantium. Fugiat aliquid culpa laborum aspernatur aliquam nam, debitis assumenda iusto vel dolore impedit dolor veritatis blanditiis. Sunt fugit sed in dolores?</p>',
]);

Post::create([
    'title' => 'Judul Ke Tiga',
    'slug' => 'judul-ke-tiga',
    'author' => 'Arman Dwi Pangestu',
    'excerpt' => 'Lorem ipsum ke tiga',
    'body' => '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quia, aliquid harum, facere optio fugit officia ad, animi iste eligendi dicta quam itaque consectetur magnam voluptates? Facilis, ipsum sapiente beatae suscipit fugiat quaerat necessitatibus accusamus.</p> <p>Illum voluptatum, reprehenderit animi iure labore itaque iusto assumenda voluptatibus dolorum vel deleniti illo ipsum obcaecati consequuntur cupiditate? Odio laboriosam officia hic aut esse delectus fugiat, recusandae at itaque nostrum dolor quo dolorem nesciunt tenetur ea neque vel sunt error quod exercitationem facere ex cum? Sint velit nihil quia veritatis corrupti! Vel ratione repudiandae libero aut excepturi in magni.</p> <p>Est, similique molestias culpa aliquam maiores perferendis placeat nulla iusto, optio deserunt magnam quae. Culpa exercitationem reiciendis omnis quod quia aliquid expedita at, doloribus nemo impedit unde quasi provident repellendus voluptate, asperiores quidem commodi laudantium. Fugiat aliquid culpa laborum aspernatur aliquam nam, debitis assumenda iusto vel dolore impedit dolor veritatis blanditiis. Sunt fugit sed in dolores?</p>',
]);
```

### Mengganti Id Menjadi Slug Pada Route Single Post

Untuk mengganti nya kita bisa ubah anchor link pada file view `posts.blade.php` nya agar mengarah atau menggunakan `slug`

```php
<a href="/posts/{{ $post->slug }}">{{ $post->title }}</a>
```

Sekarang jika kalian hover preview link nya sudah mengarah atau menggunakan slug, namun jika kalian mencoba membuka nya maka akan error karena masih mencari berdasarkan id

![Single Page Post By Slug](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/single-page-post-by-slug.png)

Bagaimana cara mengatasi agar pencarian nya menjadi menggunakan slug bukan id? nah cara nya cukup mudah, kalian buka kembali file routes `web.php` nya.

```php
Route::get('posts/{post}', [PostController::class, 'show']);
```

Jika kalian menggunakan wildcard nya adalah `{post}`, maka default nya akan mencari berdasarkan `id` sebagai unique identifier nya. Namun jika penulisan nya adalah `{post:slug}`

```php
Route::get('posts/{post:slug}', [PostController::class, 'show']);
```

Maka sekarang pencarian query nya akan berdasarkan `slug` nya untuk mendapatkan post yang unique nya. Sehingga jika kita simpulkan

- Jika menggunakan `{post}` = `WHERE id = ...`
- Jika menggunakan `{post:slug}` = `WHERE slug = ...`

![Single Page Post By Slug Work](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/post-model-dan-route-model-binding/single-page-post-by-slug-work.png)
