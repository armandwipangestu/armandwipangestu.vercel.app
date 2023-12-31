---
published: true
title: "Laravel 8 - #15 - User Registration"
tag: "Programming"
date: "December 31 2023"
excerpt: "Pada pembahasan kali ini kita akan membuat feature registrasi untuk aplikasi blog laravel kita."
cover_image: "/images/posts/Laravel 8 - User Registration.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Setelah dipembahasan sebelumnya kita berhasil membuat tampilan halaman registrasi dan juga login, pada pemabahasan kali ini kita akan menjalankan feature-feature tersebut satu-persatu. Di artikel ini kita akan mencoba membuat feature registrasi agar selanjutnya user yang sudah berhasil ter-registrasi itu bisa login untuk masuk kedalam aplikasi.

## Menyiapkan Route Register

Sebelum kita menyiapkan route register nya, kita ubah dulu attribute pada form input di file view `register.blade.php` nya agar mengarah ke route `/register` dan method nya `POST`

```html
<form action="/register" method="POST">...</form>
```

Selanjutnya kita tambahkan route baru di file `web.php` untuk menangani request tersebut

```php
Route::post('/register', [AuthController::class, 'storeRegister']);
```

## Membuat Method storeRegister

Setelah route disiapkan, sekarang kita buat method dengan nama `storeRegister` untuk menangani request dari route tersebut, kita akan tangkap dan tampilkan terlebih dahulu semua request nya menggunakan method `request()->all()`

```php
public function storeRegister()
{
    return request()->all();
}
```

atau kita juga bisa menggunakan property `$request` seperti ini

```php
public function storeRegister(Request $request)
{
    return $request->all();
}
```

### CSRF

Sekarang jika kita mengisikan form input register dan melakukan request, maka akan muncul error `409 | PAGE EXPIRED` seperti gambar dibawah ini

![Test Register](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/test-register.png)

![419 | Page Expired](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/419-page-expired.png)

Hal tersebut sangat umum di Laravel dan ini terjadi karena Laravel berusaha mengamankan halaman web kita ketika kita melakukan post melalui form. Nah keamanan seperti apa? jika kita buka dokumentasi Laravel, itu terdapat yang namanya `CSRF` atau singkatan dari `Cross Site Request Forgery`. Jadi, ceritanya CSRF ini adalah sebuah teknik serangan terhadap website kita, dimana biasanya serangan ini memalsukan request dari website yang lain (ngebajak request kita). Sehingga bisa saja ada request yang dilakukan oleh website lain yang mengarah ke website kita menggunakan URL yang sesuai, jadi yang akan dikerjakan adalah route tertentu didalam aplikasi kita, padahal request tersebut bukan dari website kita melainkan dari website orang lain.

Contoh nya disini mungkin saja ada website orang lain yang membuat form input dimana isinya script jahat tapi action atau URL nya mengarah ke website kita.

```html
<form action="https://your-application.com/user/email" method="POST">
  <input type="email" value="malicious-email@example.com" />
</form>

<script>
  document.forms[0].submit();
</script>
```

### Preventing CSRF Request

Nah bagaimana cara mengatasi nya? Caranya adalah melakukan sesuatu yang disebut dengan `Preventing CSRF Request`. Sehingga kita akan menjaga request nya agar selalu dikirimkan dari website kita dengan menggunakan sesuatu yang dinamakan `csrf_token`, jadi nantinya website kita akan men-generate sebuah token didalam session dan nanti akan dicocokan dengan yang ada di request nya apakah sama atau tidak.

Cara menggunakan `csrf_token` nya bagaimana? caranya cukup mudah yaitu kita cukup tambahkan `@csrf` didalam form kita, sehingga nantinya dibelakang layar blade akan menerjemahkan `@csrf` tersebut menjadi sebuah input type hidden dengan value nya token yang digenerate

```php
<form method="POST" action="/profile">
    @csrf

    <!-- Equivalent to... -->
    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
</form>
```

### Implementasi CSRF Request

Setelah kita mengetahui mengapa Laravel memuncul tulisan `419 | PAGE EXPIRED` dan apa itu CSRF, selanjutnya kita implementasi kan pada form input kita di view `register.blade.php`

```php
<form action="/register" method="POST">
    @csrf
    ...
</form>
```

Maka sekarang seharusnya jika melakukan request kembali di web, maka tidak akan muncul error tersebut dan yang muncul adalah hasil return dari reqeust tersebut di controller nya beserta tokennya, sehingga jika token nya berbeda atau dibajak oleh orang lain atau bahkan tidak ada maka akan error halaman nya

![Return Request Register](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/return-request-register.png)

## Validasi Register

Untuk melakukannya kita bikin request nya agar melalui method `validate` yang isinya kita buat sebuah array untuk mendefinisikan rule atau aturan dari validasi kita

```php
public function storeRegister(Request $request)
{
    $request->validate([
        'name' => 'required|max:255', // pipe format
        'username' => ['required', 'min:3', 'max:255', 'unique:users'], // array format
        'email' => 'required|email|unique:users',
        'password' => 'required|min:5|max:255'
    ]);

    dd('registrasi berhasil');
}
```

Nah maka sekarang jika kriteria dari rule yang kita buat itu lolos semua maka akan muncul tulisan `registrasi berhasil`, namun jika salah satu tidak lolos maka method `dd` nya tidak akan jalan dan seolah-olah hanya me-refresh halamannya.

![DD Validate](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/dd-validate.png)

Sekarang validasi nya sudah jalan, namun problem nya adalah kita tidak diberi tau salah nya dimana, sehingga UX nya kurang karena user yang melakukan registrasi tidak akan tau kesalahannya dimana. Nah, sebetulnya Laravel sudah menyiapkan pesan error nya namun belum kita pakai, pesan error tersebut berada di directive blade yang namanya `@error`

```php
<form action="/register" method="POST">
    @csrf
    <div class="form-floating">
        <input type="text" name="name" class="form-control rounded-top @error('name')
            is-invalid
        @enderror" id="name" placeholder="Name">
        <label for="name">Name</label>
        @error('name')
            <div class="invalid-feedback">
                Please choose a username.
            </div>
        @enderror
    </div>
    ...
</form>
```

Maka sekarang jika kalian kosongkan input name nya, akan muncul error dengan tulisan `Please choose a username`

![Name at Error](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/name-at-error.png)

### Validasi Dengan Error Message

Nah bagaimana jika ingin tulisan error nya dinamis? caranya cukup mudah, kita cukup tampilkan saya variable `$message`

```php
@error('name')
    <div class="invalid-feedback">
        {{ $message }}
    </div>
@enderror
```

![Dynamic Error Message](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/dynamic-error-message.png)

Maka sekarang kita bisa tambahkan `@error` tersebut pada setiap field-field nya

```php
<form action="/register" method="POST">
    @csrf
    <div class="form-floating">
        <input type="text" name="name" class="form-control rounded-top @error('name')
            is-invalid
        @enderror" id="name" placeholder="Name" required>
        <label for="name">Name</label>
        @error('name')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <div class="form-floating">
        <input type="text" name="username" class="form-control @error('username')
            is-invalid
        @enderror" id="username" placeholder="Username" required>
        <label for="username">Username</label>
        @error('username')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <div class="form-floating">
        <input type="email" name="email" class="form-control @error('email')
            is-invalid
        @enderror" id="email" placeholder="name@example.com" required>
        <label for="email">Email address</label>
        @error('email')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <div class="form-floating">
        <input type="password" name="password" class="form-control rounded-bottom @error('password')
            is-invalid
        @enderror" id="password" placeholder="Password" required>
        <label for="password">Password</label>
        @error('password')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror
    </div>

    <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
</form>
```

Namun jika sekarang kita isikan format register nya seperti ini

- Name benar
- Username terlalu pendek
- Format email salah
- Password terlalu pendek

![Test Validate](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/test-validate.png)

Maka error email nya tidak muncul dan harus kita benarkan validasi nya

![Email not Error](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/email-not-error.png)

### Validasi Email Dengan Format Top Level Domain

Untuk membernarkan nya kita cukup tambahkan validasi `email:dns` seperti ini

```php
$request->validate([
    'name' => 'required|max:255', // pipe format
    'username' => ['required', 'min:3', 'max:255', 'unique:users'], // array format
    'email' => 'required|email:dns|unique:users',
    'password' => 'required|min:5|max:255'
]);
```

![Email Format DNS](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/email-format-dns.png)

### Old Value

Nah namun sekarang value dari setiap input nya ke-reset, sehingga secara UX juga kurang bagus, yang bagus adalah ketika terdapat error saat melakukan request form input, value nya tetap ada agar tidak mengulangi hal yang sama kecuali beberapa hal penting seperti password misalkan. Nah, untungnya Laravel sudah mempermudahkan kita untuk menangani hal tersebut menggunakan method `old` pada property value di input nya

```php
<input type="text" name="name" class="form-control rounded-top @error('name')
    is-invalid
@enderror" id="name" placeholder="Name" required value="{{ old('name') }}">
```

Cara kerja nya adalah method tersebut akan menambil input-an yang lama apa yang sudah kita isi sebelumnya dengan cara mengecek di session sebelumnya kita mengisikan apa. Maka sekarang value sebelumnya akan tetap ada walaupun terdapat error

![Input Value Old](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/input-value-old.png)

## Insert Register

Sekarang tinggal kita insert data nya kedalam database jika semua validasi nya lolos, bagaimana caranya? pertama kita simpan dulu kedalam sebuah variable untuk bagian validasi nya

```php
public function storeRegister(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|max:255', // pipe format
        'username' => ['required', 'min:3', 'max:255', 'unique:users'], // array format
        'email' => 'required|email:dns|unique:users',
        'password' => 'required|min:5|max:255'
    ]);

    User::create($validatedData);
}
```

Maka sekarang data nya akan masuk kedalam database jika kita melakukan registrasi

> **Catatan**:
>
> Jika kalian mendapatkan error field `username` doesn't have a default value, maka kita perlu mengubah skema model User dibagian property `$fillable` nya
>
> ```php
> protected $fillable = [
>   'name',
>   'username',
>   'email',
>   'password',
> ];
> ```
>
> Hal tersebut terjadi karena field `username` tidak diperbolehkan ketika melakukan insert data secara mass assignment

![New Data](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/new-data.png)

Sedikit tambahan, pastikan ketika melakukan insert data mengenai password harus di enkripsi misalkan menggunakan method `bcrypt` atau `Hash`

```php
public function storeRegister(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|max:255', // pipe format
        'username' => ['required', 'min:3', 'max:255', 'unique:users'], // array format
        'email' => 'required|email:dns|unique:users',
        'password' => 'required|min:5|max:255'
    ]);

    // Menggunakan bcypt
    //$validatedData['password'] = bcrypt($validatedData['password']);

    // Menggunakan Hash
    $validatedData['password'] = Hash::make($validatedData['password']);

    User::create($validatedData);

    return redirect('/login');
}
```

### Flash Message

Terakhir kita tambahkan flash message atau informasi notifikasi

```php
public function storeRegister(Request $request)
{
    ...

    User::create($validatedData);

    // Versi Session Flash
    // $request->session()->flash('success', 'Registration successfull! Please login');

    return redirect('/login')->with('success', 'Registration successfull! Please login'); // Versi shorthand, redirect sekaligus membawa flash message
}
```

Selanjutnya kita tampilkan flash message tersebut di view `login.blade.php` nya seperti berikut ini

```php
@extends('layouts.main')

@section('container')
    <div class="row justify-content-center">
        <div class="col-md-5">

            @if (session()->has('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            @endif

            <main class="form-signin w-100 m-auto">
                <h1 class="h3 mb-3 fw-normal text-center">Please Login</h1>
                <form>
                    ...
                </form>
                <small class="text-center d-block mt-3">Not registered? <a href="/register">Register Now!</a></small>
            </main>
        </div>
    </div>
@endsection
```

![Flash Message](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel8/user-registration/flash-message.png)
