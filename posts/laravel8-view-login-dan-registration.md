---
published: true
title: "Laravel 8 - #14 - View Login dan Registration"
tag: "Programming"
date: "December 31 2023"
excerpt: "Pada pembahasan kali ini kita akan membuat view untuk feature login dan registration. Seperti biasa disini kita akan menggunakan bantuan framework frontend yaitu Bootstrap untuk bagian komponen nya."
cover_image: "/images/posts/Laravel 8 - View Login dan Registration.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada beberapa pembahasan kedepan kita akan mulai membahas mengenai feature login dan juga registrasi untuk aplikasi kita, dimulai dengan artikel ini kita akan membuat view atau tampilan dari halaman login dan registrasi nya. Seperti biasa, disini kita akan menggunakan bantuan framework frontend yaitu Bootstrap.

## View Login

Disini kita akan menggunakan bantuan template dari bootstrap. Sehingga pertama kita kunjungi situs resmi bootstrap nya, kemudian pergi ke menu examples dan kita ambil komponen yang sudah jadi yaitu `Sign-in`

![Bootstrap Sign In](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/bootstra-sign-in.png)

Untuk mendapatkan kode example nya kita download terlebih dahulu pada bagian awal halaman example nya atau dipaling atas

![Download Example](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/download-example.png)

### Menyiapkan Navbar

Setelah itu kalian lakukan extract file example yang sudah di download nya. Selanjutnya kalian siapkan link pada bagian navbar untuk mengarahkan ke view login nantinya

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
        ...
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a
            href="/login"
            class="nav-link {{ ($active === 'login' ? 'active' : '') }}"
            ><i class="bi bi-box-arrow-right"></i> Login</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Setelah navbar dibuat selanjutnya kita load juga bootstrap icon di file layout `main.blade.php`

```php
<!DOCTYPE html>
<html lang="en">

<head>
    ...

    {{-- Bootstrap CSS --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

    {{-- Bootstrap Icon --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
</head>

<body>

    @include('partials.navbar')

    <div class="container mt-4">
        @yield('container')
    </div>

    ...
</body>

</html>
```

Maka sekarang seharusnya tampilan navbar nya seperti gambar dibawah ini, namun jika di klik akan muncul error `404 | NOT FOUND` karena kita belum tangani route nya

![New Navbar](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/new-navbar.png)

### Membuat Route Login

Setelah kita siapkan navlink yang mengarah ke route `/login`, selanjutnya kita buat route nya untuk menangani navlink tersebut, kita buka file `web.php`

```php
Route::get('/login', [AuthController::class, 'login']);
```

### Membuat Controller Login

Selanjutnya kita buat controller nya menggunakan perintah artisan

```php
php artisan make:controller AuthController
```

Setelah controller dibuat, selanjutnya kita bikin method `login` nya didalam file `AuthController.php`

```php
class AuthController extends Controller
{
    public function login()
    {
        return view('auth.login', [
            'title' => 'Login',
            'active' => 'login'
        ]);
    }
}
```

### Membuat View Login

Setelah menangani route dan controller nya, selanjutnya kita buat view nya di `resources/views/auth/login.blade.php`

```php
@extends('layouts.main')

@section('container')
@endsection
```

Nah untuk isian container nya kita ambil di file komponen example bootstrap yang sudah di download yaitu dibagian file `sign-in/index.html`

```php
@extends('layouts.main')

@section('container')
    <main class="form-signin w-100 m-auto">
        <form>
            <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>

            <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        </form>
    </main>
@endsection
```

Maka sekarang tampilan nya akan terlihat seperti ini

![Sign In Not CSS](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/sign-in-not-css.png)

Tampilan tersebut tidak sama dengan yang dilihat pada bagian examples karena CSS nya belum kita load, untuk melakukannya kita tinggal buka saja file css nya `signin.css` kemudian ambil class-class nya dan simpan pada file css kita sendiri yang kita buat di `public/assets/css/style.css`

```css
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
```

Setelah dipindahkan CSS nya, kita load file CSS nya di view layout kita `main.blade.php`

```php
{{-- Custom CSS --}}
<link rel="stylesheet" href="assets/css/style.css">
```

Sekarang jika kalian lihat kembali tampilannya, maka akan sama persis dengan yang ditampilkan dibagian examples

![Bootstrap Sign In Preview](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/bootstrap-sign-in-preview.png)

Nah, dikarenakan terlihat kecil jadi kita bisa hapus saja property css berikut ini

```css
.form-signin {
  max-width: 330px;
  padding: 1rem;
}
```

Kemudian kita bungkus form nya menggunakan row dan column

```php
@section('container')
    <div class="row justify-content-center">
        <div class="col-md-5">
            <main class="form-signin w-100 m-auto">
                <h1 class="h3 mb-3 fw-normal text-center">Please Login</h1>
                <form>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="btn btn-primary w-100 py-2" type="submit">Login</button>
                </form>
                <small class="text-center d-block mt-3">Not registered? <a href="/register">Register Now!</a></small>
            </main>
        </div>
    </div>
@endsection
```

Maka sekarang hasilnya akan seperti ini

![Custom Login](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/custom-login.png)

## View Register

Setelah kita membuat bagian login nya, sekarang kita buat bagian register nya.

### Membuat Route Register

Untuk melakukannya cukup mudah yaitu dengan kita buka file `web.php`, kemudian tambahkan route berikut ini

```php
Route::get('/register', [AuthController::class, 'register']);
```

### Membuat Controller Register

Setelah route kita buat, selanjutnya kita buat method `register` didalam file `AuthController.php`

```php
class AuthController extends Controller
{
    public function login()
    {
        return view('auth.login', [
            'title' => 'Login',
            'active' => 'login'
        ]);
    }

    public function register()
    {
        return view('auth.register', [
            'title' => 'Register',
            'active' => 'register'
        ]);
    }
}
```

### Membuat View Register

Sekarang kita buat file view register nya di `resources/views/auth/register.blade.php`

```php
@extends('layouts.main')

@section('container')
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <main class="form-registration w-100 m-auto">
                <h1 class="h3 mb-3 fw-normal text-center">Registration Form</h1>
                <form>
                    <div class="form-floating">
                        <input type="text" name="name" class="form-control rounded-top" id="name" placeholder="Name">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" name="username" class="form-control" id="username" placeholder="Username">
                        <label for="username">Username</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" name="email" class="form-control" id="email" placeholder="name@example.com">
                        <label for="email">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" name="password" class="form-control rounded-bottom" id="password" placeholder="Password">
                        <label for="password">Password</label>
                    </div>
                    <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
                </form>
                <small class="text-center d-block mt-3">Already registered? <a href="/login">Login</a></small>
            </main>
        </div>
    </div>
@endsection
```

Kemudian kita edit file CSS kita

```css
.form-signin .form-floating:focus-within,
.form-registration .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"],
.form-registration input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"],
.form-registration input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-registration input {
  border-radius: 0;
  margin-bottom: -1px;
}
```

Maka sekarang tampilannya akan terlihat seperti digambar bawah ini

![Registration](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/view-login-dan-registration/registration.png)
