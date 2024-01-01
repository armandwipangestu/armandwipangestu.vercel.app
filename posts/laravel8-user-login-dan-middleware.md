---
published: true
title: "Laravel 8 - #16 - User Login dan Middleware"
tag: "Programming"
date: "January 1 2024"
excerpt: "Pada pembahasan kali ini kita akan melanjutkan pembahasan mengenai aplikasi blog kita, setelah sebelumnya kita berhasil membuat feature registrasi untuk user kita. Nah, sekarang saatnya kita akan membuat dan meng-aplikasikan feature login nya, sehingga nantinya user yang berhasil registrasi itu bisa masuk kedalam aplikasi kita. Selain kita membuat feature login, kita juga akan sambil mempelajari featrue `middleware` yang ada didalam Laravel."
cover_image: "/images/posts/Laravel 8 - User Login dan Middleware.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan kali ini kita akan melanjutkan pembahasan mengenai aplikasi blog kita, setelah sebelumnya kita berhasil membuat feature registrasi untuk user kita. Nah, sekarang saatnya kita akan membuat dan meng-aplikasikan feature login nya, sehingga nantinya user yang berhasil registrasi itu bisa masuk kedalam aplikasi kita.

Selain kita membuat feature login, kita juga akan sambil mempelajari featrue `middleware` yang ada didalam Laravel.

## Penjelasan Authentication di Laravel

Sebelum kita mulai coding, kita cari tau terlbeih dahulu di dokumentasi Laravel nya mengenai Authentication (bagaimana Laravel ini menangani feature login).

### Starter Kits

Sebetulnya Laravel ini menyediakan feature `Starter Kits`, jadi terdapat semacam plugin atau aplikasi yang khusus menangani masalah khusus authentication yaitu namanya [Laravel Breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze), [Laravel Jetstrem](https://laravel.com/docs/8.x/starter-kits#laravel-jetstream) dan [Laravel Fortify](https://laravel.com/docs/8.x/fortify). Nah sebetulnya dengan aplikasi tersebut kita bisa dengan mudah menangani masalah autentikasi ini, mulai dari registrasi, login bahkan mempunyai verifikasi lewat email, remember me, forgot password dan semua yang berhubungan dengan authentication dan authorization itu sudah ditangani oleh Starter Kits ini. Semua plugin tersebut bisa kalian download atau install menggunakan composer namun UI nya dibuat menggunakan tailwind.

### Manual Authentication

Pada pembahasan kali ini kita tidak akan menggunakan starter kits tersebut melainkan kita akan menggunakan versi manual. Sehingga jika kita tidak akan menggunakan aplikasi starter kit yang mempunyai scaffolding authentication nya tidak perlu khawatir karena Laravel mempunyai sebuah authentication service melalui `Auth` [facade](https://laravel.com/docs/8.x/facades).

Facade ini seperti library didalam Laravel yang namanya Auth, sehingga nantinya kita akan dipermudah dalam pengelolaan session untuk loginnya. Cara menggunakannya cukup mudah yaitu kita cukup panggil facade nya didalam controller kita kemudian kita pakai apa yang dibutuhkan.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
```

## Memperbaiki Bagian View Login

Sebelum kita melakukan authentication, kita benarkan terlebih dahulu view `login.blade.php` nya seperti `csrf_token` dan juga attribute `action` dan `method` nya,

```php
<form action="/login" method="POST">
    @csrf
    <div class="form-floating">
        <input type="email" name="email" class="form-control @error('email')
            is-invalid
        @enderror" id="email" placeholder="name@example.com" autofocus required value="{{ old('email') }}">
        <label for="email">Email address</label>
        @error('email')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>
    <div class="form-floating">
        <input type="password" name="password" class="form-control" id="password" placeholder="Password" required>
        <label for="password">Password</label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Login</button>
</form>
```

## Menyiapkan Route Login

Setelah kita memberikan action dan method pada form view login nya, sekarang kita siapkan route nya untuk menangani request tersebut di file `web.php`

```php
Route::post('/login', [AuthController::class, 'authenticate']);
```

## Membuat Method authenticate

Sekarang kita siapkan method dengan nama `authenticate` di file `AuthController.php` untuk menangani route yang sudah kita bikin sebelumnya

```php
use Illuminate\Support\Facades\Auth;

public function authenticate(Request $request)
{

}
```

### Validasi Credentials

Sekarang kita buatkan validasi credentials request login nya didalam method `authenticate` nya

```php
public function authenticate(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email:dns'],
        'password' => ['required']
    ]);
}
```

### Pengecekan Login

Setelah kita definisikan validasi credentials yang bisa login, sekarang kita cek apakah percobaan login nya berhasil atau tidak data nya sesuai dengan yang di database menggunakan method `attempt` dan jika gagal maka kita redirect ke halaman login dengan mengirimkan pesan error nya

> **Catatan**: Tips Security
>
> Pastikan pesan error yang dikirim bukan mengenai data yang senstivie seperti:
>
> - Email belum terdaftar
> - Password salah
>
> Walaupun pesan error tersebut sangat bagus atau sangat membantu user nya, tetapi hal tersebut juga bisa menjadi celah keamanan, karena user yang berniat jahat menjadi tau jika email tersebut sudah atau belum terdaftar di sebuah sistem (sehingga orang tersebut minimal mengetahui alamat email nya). Sebaiknya kita tidak sedikitpun memberi sebuah clue walaupun password nya tidak ketauan.
>
> Alternative lain kita bisa kirimkan saja informasi seperti `Login failed` atau `Login gagal`
>
> Dan satu hal lagi, mengapa kita melakukan regenerate session seperti kode dibawah ini ketika login berhasil, itu dilakukan untuk menghindari sebuah teknik yang namanya `Session Fixation`. Teknik tersebut bekerja dengan bagaimana seseorang itu masuk kedalam celah keamanan sistem menggunakan session, sehingga seperti berpura-pura masuk dengan session yang sama sebelumnya sehingga tidak perlu login lagi karena sudah menggunakan session yang sama.

```php
public function authenticate(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email:dns'],
        'password' => ['required']
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    // Error disini akan masuk kedalam variabel @error
    // return back()->withErrors('');

    // Menggunakan flash message sebagai informasi error
    return back()->with('loginError', 'Login failed!');
}
```

Method `intended` pada bagian return setelah login berhasil adalah sebuah method yang disediakan oleh Laravel yang akan me-redirect user nya ke sebuah tempat atau URL sebelum melewati sebuah authentication middleware.

Setelah method authenticate dibuat, sekarang kita tambahkan informasi flash message yang dikirim dari method tersebut apabila terdapat login error di file view `login.blade.php`

```php
@if (session()->has('loginError'))
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ session('loginError') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
```

Maka sekarang jika kalian mencoba memasukkan data email benar dan password salah, akan muncul error flash message nya

![Flash Message Login Error](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/flash-message-login-error.png)

Nah, bagaimana sekarang jika kalian mencoba dengan data login yang benar? sedangkan kita belum mempunyai route dan view `/dashboard` nya, maka sekarang akan muncul error `404 | NOT FOUND`

![Dashboard 404 Not Found](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/dashboard-404-not-found.png)

Namun didalam session nya sekarang kita sudah terdaftar login, Laravel nya tau sekarang kita sudah ter-autentikasi.

### Membuat Controller, View dan Route Dashboard

Sekarang kita buat controller untuk dashboard nya menggunakan perintah artisan

```php
php artisan make:controller DashboardController
```

Setelah itu kita siapkan method `index` untuk menangani view default nya

```php
class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard.index');
    }
}
```

Selanjutnya kita buat folder dan file `dashboard/index.blade.php` baru di `resources/views` dengan isian

```html
<h1>Welcome, devnull</h1>
```

Terakhir kita siapkan route untuk mengarah ke controller dashboard nya di file `web.php`

```php
use App\Http\Controllers\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index']);
```

Maka sekarang tampilan dashboard nya akan muncul tulisan `Welcome, devnull`

![Greeting Dashboard](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/greeting-dashboard.png)

Sampai sini kelihatannya sudah sangat oke, namun masih banyak yang harus kita perbaiki contohnya adalah jika kita paksa kembali ke route `/login` maka akan tetap tampil, seharusnya jika kita sudah login kita tidak bisa masuk ke route login lagi dan juga kita belum mempunyai cara untuk logout.

Nah untuk melakukan hal tersebut kita harus mengenal dulu yang namanya authentication middleware.

## Apa itu Middleware?

Jika dikutip dari dokumentasi resmi Laravel nya, middelware itu menyediakan sebuah mekanisme yang memudahkan kita untuk melakukan sebuah insfeksi dan filtering HTTP Request, sehingga request kita di filter terlebih dahulu oleh middleware ini. Contohnya, laravel sudah menyertakan sebuah middleware didalamnya yang melakukan verifikasi apakah seorang user didalam aplikasi kita itu sudah ter-autentikasi atau belum, jika belum maka middleware tadi akan melakukan redirect user tadi ke halaman `/login` atau ke halaman mana sesuai dengan yang kita inginkan. Tapi jika sudah ter-autentikasi maka middleware akan memperbolehkan kita untuk lanjut masuk kedalam aplikasi kita.

Jadi sebetulnya middleware itu seperti ini, middleware itu bisa kita pasang misalkan di route kita seperti ini

```php
Route::get('/login', [AuthController::class, 'login']);
```

Route tersebut dibaca seperti ini

- Jika terdapat request dengan method `get`
- Ke route atau alamat `/login`
- Maka jalankan Class Controller `Auth` dengan method nya adalah `login`

Nah, nantinya kita bisa pasangkan middleware kedalam route tersebut, middleware akan berjalan sebelum `[AuthController::class, 'login']`. Sehingga jika terdapat request dengan method `get` ke route `/login` maka jalanin dulu middleware dan jika sudah oke maka lanjut ke controller nya.

Secara default didalam Laravel itu sudah ada banyak middleware yang jalan yaitu `Global Middleware`

### Global Middleware

Didalam aplikasi Laravel ada middleware default yang otomatis jalan setiap HTTP Request kita dijalankan di `app/Http/Kernel.php`

```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class,
        \App\Http\Middleware\TrustProxies::class,
        \Fruitcake\Cors\HandleCors::class,
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array<string, class-string|string>
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ];
}
```

Bisa kalian lihat terdapat middleware yang namanya `auth` didalam property `$routeMiddleware`. Nah, middleware tersebut akan kita gunakan ketika kita ingin route atau halaman tertentu hanya bisa diakses oleh user yang sudah ter-autentikasi.

Dan middleware `guest` didalam property `$routeMiddleware` juga akan kita gunakan ketika kita ingin menangani route atau halaman tertentu jika user nya belum ter-autentikasi.

Jadi, bisa kalian anggap middleware `auth` ini kalian sudah login dan middleware `guest` ini tamu belum login.

### Implementasi Middleware

Contohnya misalkan kita ingin halaman login yang ini

```php
Route::get('/login', [AuthController::class, 'login']);
```

hanya bisa diakses oleh user yang belum ter-autentikasi, berarti menggunakan middleware `guest`.

Sedangkan halaman dashboard yang ini

```php
Route::get('/dashboard', [DashboardController::class, 'index']);
```

hanya bisa diakses oleh user yang sudah ter-autentikasi, berarti menggunakan middleware `auth`.

Sehingga sekarang kita bisa terapkan middlware tersebut pada route yang kita inginkan seperti berikut ini

```php
Route::get('/login', [AuthController::class, 'login'])->middleware('guest');
Route::get('/register', [AuthController::class, 'register'])->middleware('guest');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth');
```

Maka sekarang jika kita mencoba masuk ke route `/login` dengan posisi sudah ter-autentikasi, maka kita akan di redirect ke route `/home`

![Redirect Home](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/redirect-home.png)

Hal tersebut terjadi karena default middleware dari `guest`, jika kalian ingin mencoba mengubah default redirect nya kalian bisa ubah di file service provider nya `app/Providers/RouteServiceProvider.php`

```php
public const HOME = '/';
```

Maka sekarang default redirect nya jika kita paksa ke route `/login` dengan posisi sudah ter-autentikai, maka kita akan di redirect ke route `/`

![Redirect Root](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/redirect-root.png)

### Fix Komponen

Nah, bahkan kerennya sekarang kita bisa buat agar button login nya berubah jika kita sudah ter-autentikasi, cara nya kita ubah file `navbar.blade.php`

```php
<ul class="navbar-nav ms-auto">
    @auth
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Welcome, {{ auth()->user()->name }}
            </a>
            <ul class="dropdown-menu">
                <li>
                    <a class="dropdown-item" href="/dashboard">
                        <i class="bi bi-layout-text-sidebar-reverse"></i> My Dashboard
                    </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <form action="">
                        <button type="submit" class="dropdown-item">
                            <i class="bi bi-box-arrow-right"></i> Logout
                        </button>
                    </form>
                </li>
            </ul>
        </li>
    @else
        <li class="nav-item">
            <a href="/login" class="nav-link {{ ($active === 'login' ? 'active' : '') }}">
                <i class="bi bi-box-arrow-right"></i> Login
            </a>
        </li>
    @endauth
</ul>
```

Maka sekarang tampilan navlink item sebelah kanan nya akan seperti ini dan memiliki dropdown untuk pergi ke dashboard dan juga logout

![Nav Auth](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/nav-auth.png)

### Feature Logout

Setelah kita menyiapkan form dengan button untuk melakukan logout di navigation, sekarang kita arahkan action nya ke `/logout` dengan method nya `POST`

```php
<li>
    <form action="/logout" method="POST">
        @csrf
        <button type="submit" class="dropdown-item">
            <i class="bi bi-box-arrow-right"></i> Logout
        </button>
    </form>
</li>
```

Selanjutnya kita siapkan route `/logout` nya di file `web.php`

```php
Route::post('/logout', [AuthController::class, 'logout']);
```

Setelah route nya kita siapkan, sekarang kita buat method `logout` di controller nya

```php
public function logout(Request $request)
{
    Auth::logout();

    // Invalidate session agar tidak bisa digunakan
    $request->session()->invalidate();

    // Regenerate Token atau bikin baru agar tidak dibajak
    $request->session()->regenerateToken();

    return redirect('/');
}
```

Maka sekarang jika kita mencoba logout, komponen navbar dropdown nya sekarang berubah menjadi komponen button login lagi

![Navbar Komponen Login](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/navbar-komponen-login.png)

### Named Routes

Sekarang jika kita paksa masuk kedalam route `/dashboard` dengan posisi kita belum ter-autentikasi maka akan muncul error `Route [login] not defined`

![Route Login Not Defined](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-login-dan-middleware/route-login-not-defined.png)

Hal tersebut terjadi karena kita tidak mempunyai sebuah route yang namanya `login`, kenapa harus login? karena jika kalian lihat di file `app/Http/Middleware/Authenticate.php`

```php
protected function redirectTo($request)
{
    if (! $request->expectsJson()) {
        return route('login');
    }
}
```

Terdapat default route pada method `redirectTo` yang mengarah ke route `login` jika kita menggunakan middleware `auth`. Nah, route di Laravel itu bisa kita berikan sebuah nama atau istilah nya itu adalah `Named Routes` agar route nya tidak berpatokan pada URL nya. Sehingga jika URL nya apapun asalakan nama route nya apa kita bisa akses.

```php
Route::get('/login', [AuthController::class, 'login'])->name('login')->middleware('guest');
```

Maka sekarang jika kalian mencoba memaksa masuk ke route `/dashboard` dengan posisi belum ter-autentikasi, maka akan dikembalikan lagi ke route `/login`. Namun jika sudah ter-autentikasi maka diperbolehkan.
