---
published: true
title: "Codeigniter - Configurasi Dasar"
tag: "Programming"
date: "February 4 2023"
excerpt: "Pada artikel ini kita akan melakukan configurasi dasar pada Framework Codeigniter"
cover_image: "/images/posts/Codeigniter - Basic Configuration.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Autoload

`autoload.php` file ini digunakan untuk mengatur fungsi-fungsi yang akan dimuat otomatis di awal ketika program dijalankan.

Untuk melakukan konfigurasi pada file `autoload.php` silahkan buka folder:

`application/config/autoload.php`

seperti gambar berikut:

![autoload.php](https://user-images.githubusercontent.com/64394320/216672203-7c7e7787-4c2c-4266-82a2-1f929568ed35.png)

Ada beberapa hal yang bisa diload secara otomatis diantaranya:

- packages
- libraries
- drivers
- helper files
- custom config files
- language files
- dan models

Untuk konfigurasi dasar yang perlu Anda ketahui adalah **libraries** dan **helper files**.

Hal ini bertujuan agar beberapa library dan helper tertentu berjalan secara otomatis.

Untuk melakukan konfigurasi pada libraries, buka file `autoload.php` dengan text editor seperti `Visual Studio Code`

Kemudian temukan kode berikut:

```php
$autoload['libraries'] = array();
```

Atur atau ubah menjadi seperti berikut:

```php
$autoload['libraries'] = array('database');
```

Pada kode diatas, artinya kita meload library **database** secara otomatis.

Dengan demikian Anda dapat menggunakan fungsi-fungsi database pada codeigniter.

Seperti fungsi: **Query Builder Class**

Selanjutnya, untuk melakukan konfigurasi pada helper files, buka file `autoload.php` dengan text editor.

Kemudian temukan kode berikut:

```php
$autoload['helper'] = array();
```

Atur atau ubah menjadi seperti berikut:

```php
$autoload['helper'] = array('url');
```

Pada kode diatas, artinya kita meload helper **url** secara otomatis.

Dengan demikian Anda dapat menggunakan fungsi-fungsi url pada codeigniter.

Seperti fungsi:

- **base_url()**
- **site_url()**
- **URI Segment**
- dan sebagainya

## Config

Pada file ini terdapat beberapa konfigurasi yang secara standar sudah terkonfigurasi.

Namun terdapat beberapa konfigurasi yang perlu diperhatikan yaitu:

```php
$config['base_url']
$config['index_page']
$config['encryption_key']
```

Untuk konfigurasi dasar, Anda cukup mengetahui konfigurasi **base_url**.

`base_url` merupakan url dasar dari project Anda.

Untuk mengkonfigurasi `base_url`, buka file `config.php` dengan text editor.

![base_url](https://user-images.githubusercontent.com/64394320/216674088-9e77e7b5-3f82-44f8-9e83-3576098087d4.png)

Kemudian temukan kode berikut:

```php
$config['base_url'] = '';
```

Atur menjadi seperti berikut:

```php
$config['base_url'] = 'http://localhost/myproject';
```

## Database

Dilihat dari nama filenya maka Anda sudah dapat menangkap apa fungsi dari file ini.

File `database.php` digunakan untuk melakukan konfigurasi yang berkaitan dengan konfigurasi databse dari website yang akan dibuat.

Adapun konfigurasi yang perlu diperhatikan yaitu:

- hostname
- username
- password
- database

Untuk melakukan konfigurasi pada `database.php`. Buka file `database.php` dengan text editor.

![database](https://user-images.githubusercontent.com/64394320/216674781-a1bb2665-8260-49df-88af-747d1161866d.png)

Kemudian temukan kode berikut:

```php
$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => '',
	'password' => '',
	'database' => '',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
```

Atur menjadi seperti berikut:

```php
$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost', // Hostname
	'username' => 'root', // Username
	'password' => '', // Password
	'database' => '', // Databse Name
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
```

## Hello World Codeigniter

Jika serius dengan codeigniter, Anda harus mengerti bagaimana sebuah controller bekerja.

Untuk lebih jelasnya, saya akan sharing kasus sederhana agar Anda dapat memahami bagaimana controller bekerja.

Disini saya mengangkat kasus yaitu bagaimana menampilkan text **Hello World!** pada browser menggunakan controller.

Let's dive right in.

Buat sebuah controller dengan nama `Hello.php` seperti gambar berikut:

![Hello World](https://user-images.githubusercontent.com/64394320/216675396-7a114259-a0d6-4610-b2cb-1a0b6faf3e8a.png)

Kemudian ketikan kode berikut:

> **NOTE**:
> Setiap penulisan nama file dan nama class selalu di dahului dengan huruf _Capital_.

```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Hello extends CI_Controller {
    public function index() {
        echo "Hello World!";
    }
}
```

Setelah itu save dan buka browser Anda, lalu kunjungi url berikut:

```
http://localhost/myproject/index.php/hello
```

Maka akan terlihat text `Hello World` pada browser Anda seperti berikut:
![image](https://user-images.githubusercontent.com/64394320/216675923-0e7cb39b-4c9b-44b9-8fdd-e59763e1855c.png)

Jika Anda perhatikan dengan seksama, pada dasarnya url pada codeigniter terlihat seperti gambar berikut:

![image](https://user-images.githubusercontent.com/64394320/216676223-3baa423c-2637-49f5-906e-e8b38f9c825f.png)

Dimana, terpadat protocol, primary domain, index.php, class name, dan function name.

Mungkin terdengar rumit, tapi sebenarnya tidak.

Untuk lebih jelasnya silahkan tambahkan satu function lagi pada **Controller** `Hello.php`. Disini saya beri nama `show`

Sehingga controller `Hello.php` menjadi seperti berikut:

```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Hello extends CI_Controller {
    public function index() {
        echo "Hello World!";
    }

    public function show() {
        echo "I Make The World Better Place";
    }
}
```

Jika Anda jalankan dengan mengunjungi URL berikut:

```
http://localhost/myproject/index.php/Hello/show
```

Maka, akan tampil hasilnya seperti berikut:

![image](https://user-images.githubusercontent.com/64394320/216676681-f44a57a3-6222-4709-9da0-5d75a6872206.png)

## Menghilangkan index.php pada URL

Codeigniter merupakan framework php yang mendukung clean URL.

Dengan demikian Anda dapat membuat URL yang mudah dibaca dan sekaligus SEO Friendly.

Pada URL aplikasi **Hello World** diatas, dapat dilihat bahwa adanya **index.php** pada url yang terlihat menggangu.

Adakah cara untuk menghilangkan index.php dari URL?

Tentu saja, Anda dapat menggunakan file `.htaccess` untuk menghilangkannya.

Bagaimana membuat file `.htaccess`?

Mari kita mulai.

Buat sebuah file dengan nama `.htaccess` pada web root Anda dan ketikan kode berikut:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?/$1 [L]
```

Seperti gambar berikut:

![image](https://user-images.githubusercontent.com/64394320/216677323-620dbcab-4fa3-4633-893d-771fd8c6035b.png)

Kemudian buka folder `application/config/config.php` dengan text editor.

![image](https://user-images.githubusercontent.com/64394320/216677581-fc312266-3fc6-4618-b803-8375cdc5ffd8.png)

Kemudian temukan kode berikut:

```php
$config['index_page'] = 'index.php';
```

Atur menjadi seperti berikut:

```php
$config['index_page'] = '';
```

Sekarang silahkan kunjungi url berikut untuk uji coba:

```
http://localhost/myproject/hello/show
```

Maka akan terlihat hasilnya seperti berikut:

![image](https://user-images.githubusercontent.com/64394320/216677898-cc46dbc7-be38-4b38-9f06-787e4df4fe20.png)

Pada gambar diatas, dapat dilihat bahwa URL menjadi lebih rapi dan SEO Friendly dengan menghilangkan `index.php` pada URL.

## Controller dan View

Pada kasus sebelumnya, Anda telah mengetahui bagaimana menampilkan text **Hello World!** langsung dari controller.

Namun hal tersebut sebaiknya dilakukan di view.

Sekarang saya akan menunjukkan bagaimana menampilkan view melalui controller

Mari kita mulai.

Pertama, buat sebuah file pada `application/controller` dengan nama `Blog.php`

Kemudian ketikan kode berikut:

```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function index() {
        $this->load->view('blog_view', $data);
    }
}
```

Kedua buat sebuah file di `application/views` dengan nama `blog_view.php`

Kemudian ketikan kode berikut:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Blog</title>
  </head>
  <body>
    <h1>Welcome To My Blog</h1>
  </body>
</html>
```

Kemudian, buka browser Anda dan akses controller `blog`. Maka akan terlihat hasilnya seperti berikut:

![image](https://user-images.githubusercontent.com/64394320/216678645-7cdda4a2-121f-42e6-8cbd-21d80b13cf45.png)

Anda juga dapat mengirimkan parameter ke view melalui controller.

Sebagai contoh, silahkan ubah controller `Blog.php` menjadi seperti berikut:

```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
    }

    public function index() {
        $data['title'] = "This Is Title";
        $data['content'] = 'This Is Content';
        $this->load->view('blog_view', $data);
    }
}
```

Kemudian ubah view `blog_view.php` menjadi seperti berikutL:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= $title ?></title>
  </head>
  <body>
    <h1><?= $content ?></h1>
  </body>
</html>
```

Kemudian, buka browser Anda dan akses kembali controller `blog`. Maka akan terlihat hasilnya seperti berikut:

![image](https://user-images.githubusercontent.com/64394320/216679137-a4ccd346-7172-46b2-9cd9-e1be0969f3c2.png)

Saya harap Anda dapat memahami perbedaanya.
