---
published: true
title: "Laravel 8 - #23 - Authorization"
tag: "Programming"
date: "January 7 2024"
excerpt: "Pada pembahasan kali ini, kita akan membuat feature terakhir dari sistem blog kita, feature tersebut yaitu Authorization atau Otorisasi, setelah sebelumnya kita sudah membuat feature Autentikasi untuk login dan registrasi, sekarang kita akan membuat agar user yang tadi sudah berhasil registrasi dan juga login itu memiliki peran yang berbeda. Contohnya adalah terdapat user biasa dan juga user administrator."
cover_image: "/images/posts/Laravel 8 - Authorization.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan kali ini, kita akan membuat feature terakhir dari sistem blog kita, feature tersebut yaitu Authorization atau Otorisasi, setelah sebelumnya kita sudah membuat feature Autentikasi untuk login dan registrasi, sekarang kita akan membuat agar user yang tadi sudah berhasil registrasi dan juga login itu memiliki peran yang berbeda. Contohnya adalah terdapat user biasa dan juga user administrator.

Use case nya disini nanti kita akan mempunyai satu user admin yang bisa mengelola halaman lain selain user biasa. Contohnya adalah user admin tersebut bisa mengelola category seperti menambah, mengurang, mengubah dan menghapus, sehingga user biasa yang login bisa menentukan post nya sesuai dengan category yang sudah di kelola oleh admin.

Nah, sebetulnya Laravel ini mendukung pengelolaan yang namanya `Role` atau didalam Laravel hal tersebut disebut dengan `Policies` yang lebih kompleks lagi. Sehingga didalam aplikasinya kalian bisa menentukan banyak role selain admin dan user biasa.

## Apa itu Authorization?

Jika dikutip di web resmi Laravel nya, selain layanan dari authentication, Laravel juga menyediakan cara sederhana untuk melakukan otorisasi dari aksi user terhadap sumber daya. Contohnya, misalkan user itu sudah ter-autentikasi atau sudah bisa login, user tersebut bisa saja tidak punya hak akses terhadap update dan delete dari Model tertentu dari database. Sehingga user tersebut sudah login dan melihat data bisa tetapi mengedit dan menghapus data tidak bisa, hal tersebut lah yang dinamakan dengan Authorization. Feature Authorization di Laravel ini menyediakan sebuah cara yang mudah dan ter-organisir untuk mengelola pemeriksaan atau pengecekan hak akses tersebut.

Terdapat 2 cara utama didalam Laravel untuk melakukan Authorization tersebut yaitu [gates](https://laravel.com/docs/8.x/authorization#gates) dan [policies](https://laravel.com/docs/8.x/authorization#creating-policies). Dari kedua cara tersebut yang lebih simpel adalah `gates`, bayangkan kita memberikan pagar ke tempat-tempat yang seharusnya user biasa tidak boleh akses, sedangkan `policies` itu lebih kompleks. Nah, jika nantinya kalian kedepannya menggunakan starter kit Laravel misalkan menggunakan Jetstream atau Breeze yang didalamnya sudah tertanam feature Authentication dan Authorization yang bisa kita gunakan, starter kit tersebut sebetulnya dibelakang layar yang mereka gunakan adalah `gates` dan `policies`. Oleh karena itu penting bagi kita untuk mengetahui bagaimana Laravel bekerja dengan Authorization ini, sehingga kedepannya ketika kalian menggunakan starter kit nya kalian sudah mengerti pada saat memakainya.

## Membuat Resource Controller Category

Pada saat ini ketika kita ingin menambahkan post atau mengubah post, pada bagian category kita tidak bisa menambahkan data category baru yang dimana jika ingin ditambahkan kita harus mengisikan melalui seeder atau menyuntikan secara langsung melalui database nya. Oleh karena itu kita akan buat terlebih dahulu feature sederhana yaitu untuk mengelola Category tersebut. Pertama-tama kita buat Controller baru menggunakan perintah artisan

```php
php artisan make:controller AdminCategoryController --resource --model=Category
```

Sebelum kita ubah-ubah method didalam Controller nya, kita buka terlebih dahulu route kita di file `web.php` untuk membuat route baru untuk mengarah kedalam Resource Controller Category yang sudah dibikin sebelumnya

```php
use App\Http\Controllers\AdminCategoryController;

Route::resource('/dashboard/categories', AdminCategoryController::class)->except('show');
```

Sekarang kita balik lagi ke file controller nya untuk test method `index` nya

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        return 'ini adalah halaman categories';
    }

    ...
}
```

Maka sekarang seharusnya jika kita akses route `/dashboard/categories` akan muncul seperti gambar berikut ini

![Test Route Categories](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/test-route-categories.png)

Nah namun hati-hati, karena saat ini route tersebut bisa diakses oleh user yang belum login, hal tersebut seharusnya tidak diperbolehkan. Oleh karena itu bisa kita berikan Authentication pada route tersebut melalui Middleware

```php
Route::resource('/dashboard/categories', AdminCategoryController::class)->except('show')->middleware('auth');
```

Maka sekarang route tersebut sudah aman dari user yang belum ter-autentikasi. Selanjutnya kita tambahkan navlink pada sidebar untuk mengarah ke route category tersebut di file `sidebar.blade.php`

```html
<nav
  id="sidebarMenu"
  class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
>
  <div class="position-sticky pt-3">
    <ul class="nav flex-column">
      ...
    </ul>

    <h6
      class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
    >
      <span>Administrator</span>
    </h6>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a
          class="nav-link {{ Request::is('dashboard/categories*') ? 'active' : '' }}"
          aria-current="page"
          href="/dashboard/categories"
        >
          <span data-feather="grid"></span>
          Post Categories
        </a>
      </li>
    </ul>
  </div>
</nav>
```

Sekarang tampilan sidebar nya akan seperti gambar dibawah ini

![Sidebar Post Categories](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/sidebar-post-categories.png)

#### Membuat View Category

Setelah sidebar nya disiapkan, sekarang kita buat agar method `index` nya me-return view bukan text lagi

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        return view('dashboard.categories.index', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

Selantjutnya buat file view baru di `dashbaord/categories/index.blade.php`

```php
@extends('dashboard.layouts.main')

@section('container')
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Post Categories</h1>
    </div>

    @if (session()->has('success'))
        <div class="alert alert-success col-lg-6" role="alert">
            {{ session('success') }}
        </div>
    @endif

    <div class="table-responsive col-lg-6">
        <a href="/dashboard/categories/create" class="btn btn-primary mb-3">Create new category</a>
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($categories as $category)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $category->name }}</td>
                        <td>
                            <a href="/dashboard/categories/{{ $category->slug }}" class="badge bg-info">
                                <span data-feather="eye"></span>
                            </a>
                            <a href="/dashboard/categories/{{ $category->slug }}/edit" class="badge bg-warning">
                                <span data-feather="edit"></span>
                            </a>
                            <form action="/dashboard/categories/{{ $category->slug }}" method="POST" class="d-inline">
                                @method("DELETE")
                                @csrf
                                <button class="badge bg-danger border-0" onclick="return confirm('Are you sure?')">
                                    <span data-feather="x-circle"></span>
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
```

Sekarang seharusnya tampilan route `/dashboard/categories` akan terlihat seperti gambar dibawah ini

![Dashboard Categories View](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/dashboard-categories-view.png)

## Problem Authorization Semua User Bisa Mengakses

Nah, namun problem nya adalah sekarang semua user yang login bisa masuk kedalam menu `Post Categories` tersebut, padahal kita ingin hanya user tertentu atau admin saja yang bisa mengakses menu tersebut. Pertanyaannya bagaimana? kita bisa coba versi simpel nya terlebih dahulu.

### Manual Authorization

Kita bisa matikan Middleware di route nya kemudian lakukan pengecekan secara manual apakah yang login adalah user tertentu atau bukan

```php
Route::resource('/dashboard/categories', AdminCategoryController::class)->except('show');
```

Selanjutnya kita berikan pengecekan atau kondisi di method `index` pada controller nya

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        if (auth()->guest()) {
            abort(403);
        }

        return view('dashboard.categories.index', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

Maka sekarang jika kita akses route `/dashboard/categories` oleh user yang belum login akan menampilkan error `403 | Forbidden`

![Abort 403](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/abort-403.png)

Selanjutnya kita tambahkan kondisi lain untuk mengecek apakah user yang login adalah user yang ingin kita berikan akses atau bukan ke route tersebut

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        if (auth()->guest()) {
            abort(403);
        }

        if (auth()->user()->username !== 'devnull') {
            abort(403);
        }

        return view('dashboard.categories.index', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

Maka sekarang jika kita coba akses dengan user yang login dan username bukan `devnull` maka akan terkena error `403 | Forbidden` juga.

![User Not Authorized](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/user-not-authorized.png)

![Abort 403](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/abort-403.png)

Sekarang bagaimana jika login menggunakan user dengan username nya `devnull`? maka seharusnya user tersebut bisa meng-akses route tersebut

![User Authorized](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/user-authorized.png)

![Categories Authorized](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/categories-authorized.png)

Atau jika kalian ingin kondisi nya digabungkan, kalian bisa gunakan notasi `OR` pada bagian `if` nya

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        if (auth()->guest() || auth()->user()->username !== 'devnull') {
            abort(403);
        }

        return view('dashboard.categories.index', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

Atau kita bisa gunakan method `check` untuk mengganti method `guest`, method `check` tersebut mengecek apakah user udah login atau belum dan method tersebut mengembalikan nilai `true` ketika sudah login sehingga kita perlu tambahkan notasi `NOT` atau `!`

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        if (!auth()->check() || auth()->user()->username !== 'devnull') {
            abort(403);
        }

        return view('dashboard.categories.index', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

## Problem Authorization Setiap Method atau Route

Nah sekarang terlihat sudah oke bukan? tapi problem nya sekarang kita perlu melakukan copy-copy kode kondisi if atau pengecekan authorization tersebut ke setiap method didalam controller nya dan bayangkan jika terdapat perubahan misalkan username nya bukan `devnull` tetapi user lain, maka harus diubah semuanya dan ribet. Pertanyaannya sekarang, bagaimana cara meng-abstraksi hal tersebut? bagaimana agar kondisi tersebut bisa dipakai dengan mudah di semua tempat.

### Membuat Middleware Sendiri

Cara yang paling mudahnya adalah kita buat agar kondisi tersebut menjadi sebuah Middleware sendiri, cara membuat middleware sendiri kalian bisa menggunakan perintah artisan

```php
php artisan make:middleware IsAdmin
```

Maka sekarang seharusnya terdapat file baru dengan nama `IsAdmin.php` di `/app/Http/Middleware`, sekarang bagaimana cara memasukan logic atau kondisi yang sebelumnya dibuat? kita akan memasukan logic tersebut didalam method `handle`, sehingga kalian bisa cut kondisi pengecekan di method `index` pada controller nya kemudian paste di middleware nya

```php
class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || auth()->user()->username !== 'devnull') {
            abort(403);
        }

        return $next($request);
    }
}
```

Nah, namun sekarang kita tidak bisa langsung menjalankan middleware nya pada route nya karena kita belum mengetahui nama middleware nya apa

```php
Route::resource('/dashboard/categories', AdminCategoryController::class)->except('show')->middleware('');
```

### Registrasi Middleware Kedalam Kernel

Kita hanya baru mempunyai class middleware nya saja, sehingga bagaimana cara menjalankan middleware kita? kita harus masukkan kedalam `/app/Http/Kernel.php` nya supaya middleware kita di daftarkan. Didalam kernel tersebut kita mempunyai global middleware, yang dimana middleware tersebut akan otomatis berjalan ketika Laravel nya berjalan dan kita juga mempunyai application route middleware untuk dimasukkan kedalam group atau route individual nya.

```php
class Kernel extends HttpKernel
{
    ...

    protected $routeMiddleware = [
        ...
        'admin' => \App\Http\Middleware\IsAdmin::class
    ];
}
```

Maka sekarang kita bisa gunakan middleware tersebut didalam route nya dengan nama `admin`

```php
Route::resource('/dashboard/categories', AdminCategoryController::class)->except('show')->middleware('admin');
```

## Apa itu Gates?

Sekarang yang harus kita lakukan adalah menghilangkan navlink `Post Categories` jika user yang login bukan admin, kita bisa berikan feature Authorization menggunakan `gates`. Nah bagaimana cara membuat gates?

Jika dikutip dari dokumentasi resmi Laravel nya, Gates adalah sebuah cara yang bagus untuk mempelajari dasar-dasar dari Authorization Laravel, meskipun, ketika kita membuat aplikasi nya sudah cukup kompleks, kalian harus memikirkan juga untuk menggunakan yang namanya `policies` agar aturan Authorization kita lebih ter-origanize.

### Cara Membuat Gates

Nah, cara membuat gates kita cukup sebuah closure atau function untuk menentukan apakah seorang user tersebut memiliki akses untuk melakukan aksi tertentu. Umumnya, gates ini di definisikan di dalam method `boot` didalam class `App\Providers\AuthServiceProvider` menggunakan facade. Gates ini selalu menerima instace user sebagai argument pertama nya jadi otomatis tau user yang sedang login nya itu siapa sehingga kita bisa kasih user tersebut bisa melakukan aksi apa saja dan bisa juga kita berikan argument tambahan contohnya adalah model yang relevan.

Berikut adalah kode contohnya

```php
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

/**
 * Register any authentication / authorization services.
 *
 * @return void
 */
public function boot()
{
    $this->registerPolicies();

    Gate::define('update-post', function (User $user, Post $post) {
        return $user->id === $post->user_id;
    });
}
```

### Membuat Gates

Sekarang kita coba buat gates nya dengan cara membuka file `app/Providers/AppServiceProvider.php`

> **Catatan**: Tips
>
> Penulisan kondisi gates disini sebetulnya sama dengan penulisan pada middleware, namun bedanya didalam gates ini kita tidak perlu menambahkan pengecekan authentication karena sudah jelas bahwa gate ini untuk user yang sudah login sehingga kita cukup perluas lagi setelah login dia bisa melakukan aksi apa.

```php
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    ...

    public function boot()
    {
        Paginator::useBootstrap();
        Gate::define('admin', function(User $user) {
            return $user->username === 'devnull';
        });
    }
}
```

Kode diatas artinya kita membuat sebuah gate yang namanya `admin` dimana gate tersebut hanya bisa diakses oleh user yang username nya `devnull`. Sehingga sekarang kita mempunyai cara lain untuk melakukan authorization, authorization yang pertama itu kita menggunakan middleware `IsAdmin` dan yang kedua adalah menggunakan gate `admin`.

> **Catatan**: Tips
>
> Perlu di-ingat, kelebihan dari middleware itu adalah mudahnya ketika kita ingin memberikan authorization untuk banyak method sekaligus, sedangkan kekurangannya adalah dia tidak fleksibel.

Contoh disini kita tidak akan menggunakan middleware pada resource controller category nya

```php
Route::resource('/dashboard/categories', AdminCategoryController::class)->except('show');
```

### Menggunakan Gate

Kemudian kita gunakan gate yang sudah kita buat sebelumnya, kita gunakan gate tersebut di method `index` dengan method `authorize`

```php
class AdminCategoryController extends Controller
{
    public function index()
    {
        $this->authorize('admin');

        return view('dashboard.categories.index', [
            'categories' => Category::all()
        ]);
    }

    ...
}
```

Maka kode tersebut sekarang artinya adalah kita hanya bisa mengakses view nya jika sudah login dan dia adalah seorang admin. Jika kita coba sekarang login menggunakan user yang bukan admin atau username nya `devnull` maka akan muncul tampilan error `403 | This Action Is Unauthorized`

![Action Not Authorized 403](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/action-not-authorized-403.png)

Sekarang kita coba kembalikan lagi agar menggunakan middleware kembali agar mengelola dengan mudah semua method kita. Nah, sekarang kelebihan gate itu dari mana? Kelebihannya adalah kita bisa menggunakannya dimanapun. Maka sekarang kita bisa gunakan gate tersebut pada navlink khusus `Administrator`, sehingga komponen sidebar tersebut hanya akan muncul ketika yang login ada user admin atau user yang memiliki hak akses untuk melakukan aksi tersebut. Kita bisa gunakan gate tersebut di file `sidebar.blade.php` menggunakan blade directive `can`

```php
@can('admin')
    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Administrator</span>
    </h6>
    <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link {{ Request::is('dashboard/categories*') ? 'active' : '' }}" aria-current="page" href="/dashboard/categories">
                <span data-feather="grid"></span>
                Post Categories
            </a>
        </li>
    </ul>
@endcan
```

Sehingga sekarang kita menggabungkan middleware kita simpan didalam route dan gate nya kita simpan di komponen sidebar blade nya. Maka sekarang seharusnya user yang login bukan admin maka komponen `Post Categories` tersebut tidak akan muncul dan jika user mengetahui alamat URL dan mencoba nya secara paksa maka akan tetap terkena error `403 | Forbidden`

![Komponen Can Gate](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/komponen-can-gate.png)

![Abort 403](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/abort-403.png)

## Problem Jika Terdapat Admin Baru

Nah, namun sekarang terdapat problem baru yaitu, bagaimana jika terdapat admin baru? Sebetulnya kita bisa tambahkan kondisi lagi untuk menambahkan username admin lain didalam middleware ataupun gate nya. Namun hal tersebut rasanya akan sangat merepotkan jika terdapat perubahan username, penambahan admin dan sebagainya.

### Penambahan Field is_admin Pada Tabel Users

Cara yang paling efektif untuk mengatasi masalah tersebut adalah kita perlu mengubah skema tabel `users` kita agar mempunyai field `is_admin`, sehingga nantinya kita akan lakukan pengecekan berdasarkan data dari database. Untuk melakukannya kita buat migration baru untuk menyisipkan field `is_admin` tersebut kedalam tabel `users`, kita buat migration baru tersebut menggunakan perintah artisan

> **Catatan**
>
> Format penulisan migration `add_is_admin` artinya adalah kita akan menambahkan field `is_admin` kemudian `to_users_table` artinya adalah kedalam table yang namanya `users`

```php
php artisan make:migration add_is_admin_to_users_table
```

Selanjutnya kita tambahkan field tersebut di file migartion nya pada method `up` dan `down` nya

```php
class AddIsAdminToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }
}
```

Sekarang kita jalankan migration nya menggunakan artisan, kita hanya gunakan `migrate` saja tidak dengan `fresh` dan `--seed` karena kita hanya ingin menjalankan migaration yang belum diterapkan atau dijalankan saja sehingga tidak akan menggangu tabel post, category dan hanya akan mengedit tabel users semua isinya yang sebelumnya tidak mempunyai field `is_admin` menjadi punya

```php
php artisan migrate
```

```php
Migrating: 2024_01_07_092123_add_is_admin_to_users_table
Migrated:  2024_01_07_092123_add_is_admin_to_users_table (150.51ms)
```

Maka sekarang akan muncul field `is_admin` dan setiap user yang sudah terdaftar sekarang default nya belum menjadi admin karena value nya `0` atau `false`

```sql
mysql> DESCRIBE users;
+-------------------+-----------------+------+-----+---------+----------------+
| Field             | Type            | Null | Key | Default | Extra          |
+-------------------+-----------------+------+-----+---------+----------------+
| id                | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| name              | varchar(255)    | NO   |     | NULL    |                |
| username          | varchar(255)    | NO   | UNI | NULL    |                |
| email             | varchar(255)    | NO   | UNI | NULL    |                |
| email_verified_at | timestamp       | YES  |     | NULL    |                |
| password          | varchar(255)    | NO   |     | NULL    |                |
| remember_token    | varchar(100)    | YES  |     | NULL    |                |
| created_at        | timestamp       | YES  |     | NULL    |                |
| updated_at        | timestamp       | YES  |     | NULL    |                |
| is_admin          | tinyint(1)      | NO   |     | 0       |                |
+-------------------+-----------------+------+-----+---------+----------------+
10 rows in set (0.06 sec)
```

![Field Is Admin](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/field-is-admin.png)

Sekarang kita bisa ubah pada salah satu data user tersebut agar menjadi admin dengan cara mengubah value field `is_admin` yang asalnya `0` atau `false` menjadi `1` atau `true`. Maka sekarang disini username `devnull` adalah seorang admin

![User Admin](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/authorization/user-admin.png)

> **Catatan**: Tips
>
> Kelebihan dari kita hanya menyisipkan field `is_admin` kedalam tabel dengan cara membuat migration baru dan tidak mengubah migration asli nya dan hanya menjalankan perintah `migrate` saja, kita bisa melakukan `migrate:rollback` jika ternyata feature tersebut tidak jadi diterapkan dan field `is_admin` nya akan hilang.

### Implementasi Pengecekan Admin Berdasarkan Field is_admin

Untuk mengimplementasikan nya caranya cukup gampang yaitu kita cukup ganti saja logic nya, yang dimana sebelumnya kita melakukan cek berdasarkan field `username`, sekarang kita ganti cek berdasarkan field `is_admin`.

- Gate

```php
class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Paginator::useBootstrap();
        Gate::define('admin', function (User $user) {
            return $user->is_admin;
        });
    }
}
```

- Middleware

```php
class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || !auth()->user()->is_admin) {
            abort(403);
        }

        return $next($request);
    }
}
```
