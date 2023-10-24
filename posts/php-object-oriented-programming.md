---
title: "PHP - Object Oriented Programming"
tag: "Programming"
date: "January 18 2023"
excerpt: "Object Oriented Programming atau biasa disingkat OOP merupakan sebuah paradigma pada bahasa pemrograman"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

<!-- <h4 class="mt-4">
   <i class="fas fa-book me-2"></i> Daftar Isi:
</h4>

[1. Apa itu Object Oriented Programming?](#object-oriented-programming)
<br>
└─ [1.1 Karakteristik Object Oriented Programming](#karakteristik-object-oriented-programming)
<br>
└─ [1.2 Kelebihan Object Oriented Programming](#kelebihan-object-oriented-programming)
<br>
└─ [1.3 Karakteristik Procedural Programming](#karakteristik-procedural-programming)
<br>
└─ [1.4 Kelebihan Procedural Programming](#kelebihan-procedural-programming)

[2. Class dan Object](#class-dan-object)
<br>
└─ [2.1 Class](#class)
<br>
└─ [2.1.1 Cara Membuat Class](#cara-membuat-class)
<br>
└─ [2.2 Object](#object)
<br>
└─ [2.3 Contoh Program](#contoh-program-class-dan-object)

[3. Property dan Method](#property-dan-method)
<br>
└─ [3.1 Property](#property)
<br>
└─ [3.2 Method](#method)

[4. Constructor Method](#constructor-method)
<br>
└─ [4.1 Contoh Program](#contoh-program-constructor-method)

[5. Object Type](#object-type)
<br>
└─ [5.1 Contoh Program](#contoh-program-object-type)
<br>
└─ [5.2 Breakdown Code](#breakdown-code-object-type)

[6. Inheritance (Pewarisan)](#inheritance-atau-pewarisan)
<br>
└─ [6.1 Contoh Program](#contoh-program-inheritance)

[7. Overriding](#overriding)
<br>
└─ [7.1 Contoh Program](#contoh-program-overriding)

[8. Visibility](#visibility)
<br>
└─ [ 8.1 Kenapa kita membutuhkan Visibility?](#kenapa-visibility)
<br>
└─ [8.2 Contoh Program](#contoh-program-visibility)

[9. Setter & Getter (Accessor Method)](#setter-dan-getter)
<br>
└─ [9.1 Contoh Program](#contoh-program-setter-dan-getter)

[10. Static Keyword](#static-keyword)
<br>
└─ [10.1 Untuk Apa Static Keyword?](#untuk-apa-static-keyword)
<br>
└─ [10.2 Keyword yang dipakai?](#keyword-yang-dipakai-static-keyword)
<br>
└─ [10.3 Contoh Program](#contoh-program-static-keyword)

[11. Constant](#constant)
<br>
└─ [11.1 Keyword yang dipakai?](#keyword-yang-dipakai-constant)
<br>
└─ [11.2 Contoh Program](#contoh-program-constant-pada-oop)
<br>
└─ [11.3 Cara Memanggil Constant](#cara-memanggil-constant)
<br>
└─ [11.4 Magic Constant](#magic-constant)
<br>
└─ [11.5 Contoh Program Magic Constant](#contoh-program-magic-constant)

[12. Abstract Class](#abstract-class)
<br>
└─ [12.1 Contoh Penerapan / Studi Kasus Abstract Class](#contoh-penerapan-atau-studi-kasus-abstract-class)
<br>
└─ [12.2 Cara Membuat Class Abstract](#cara-membuat-class-abstract)
<br>
└─ [12.3 Contoh Program Membuat Class Abstract](#contoh-program-membuat-class-abstract)
<br>
└─ [12.4 Abstrak Class 2](#abstract-class-2)
<br>
└─ [12.5 Contoh Class Abstract](#contoh-class-abstract)
<br>
└─ [12.6 Kenapa Kelas Abstrak?](#kenapa-kelas-abstrak)

[13. Abstract Class (Bagian 2) Studi Kasus](#abstract-class-bagian-2-studi-kasus)
<br>
└─ [13.1 Contoh Kasus Program Tanpa Abstract Class](#contoh-kasus-program-tanpa-abstract-class)
<br>
└─ [13.2 Penerapan Konsep Abstract Class Pada Kasus Program diatas](#penerapan-konsep-abstract-class-pada-kasus-program-diatas)

[14. Interface](#interface)
<br>
└─ [14.1 Keyword yang dipakai?](#keyword-yang-dipakai-interface)
<br>
└─ [14.2 Impelementasi Interface](#implementasi-interface)
<br>
└─ [14.3 Penerapan Konsep Interface Pada Kasus Program diatas](#penerapan-konsep-interface-pada-kasus-program-diatas)

[15. Autoloading](#autoloading)
<br>
└─

[16. Namespace](#namespace)
<br>
└─ -->

## Object Oriented Programming

Objet Oriented Programming merupakan gaya pemrograman / programming style atau paradigma pemrograman

#### Karakteristik Object Oriented Programming

- Menyusun semua kode program dan struktur data sebagai objek
- Objek adalah unit dasar dari program
- Objek menyimpan data dan perilaku
- Objek bisa saling berinteraksi
- Java, Ruby, Python, C++, Javascript, PHP 5^

#### Kelebihan Object Oriented Programming

- Representasi dunia nyata
- Enkapsulasi & Abstraksi data
- Reusability
- Skalabilitas & Ekstensibilitas
- Kemudahan pengelolaan
- Digunakan oleh framework

#### Karakteristik Procedural Programming

- Intruksi dilakukan langkah demi langkah
- Memecah program menjadi bagian - bagian kecil
- Deisebut prosedur, subroutine, atau function
- Linear / Top-to-Bottom
- Fortran, ALGOL, COBOL, PASCAL, C, PHP, Javascript

#### Kelebihan Procedural Programming

- To-the-Point
- Simplicity & Kemudahan Implementasi (untuk compiler & interpreter)
- Mudah ditelusuri
- Membtuhkan sedikit memory (dibandingkan dengan OOP)

<hr>

## Class dan Object

#### Class:

- Blueprint / Template untuk membuat instance dari object
- Class mendefinisikan Object
- Menyimpan data dan perilaku yang disebut property dan method

#### Membuat Class:

- Di-awali dengan menuliskan keyword `class`, di-ikuti nama dan dibatasi dengan `{}` untuk menyimpan property dan method di dalamnya
- Aturan penamaan Class sama seperti variable atau function

#### Object:

- Object adalah implementasi atau instance dari rancangan lass
- Instance yang didefiniskan oleh Class
- Banyak Object dapat dibuat menggunakan satu Class
- Object dibuat dengan keyword `new`

#### Contoh program:

```php
// Class
class Coba
{
}

// Object
$a = new Coba(); // Instance
$b = new Coba();
```

<hr>

## Property & Method

#### Property:

- Merepresentasikan data atau keadaan dari sebuah Object - Variable yang ada di dalam Object (member variable) - Sama seperti variable di-dalam PHP namun di tambah dengan visibility di depannya

#### Method:

- Merepresentasikan perilaku (behavior) dari sebuah object
- Function yang ada di-dalam Object
- Sama seperti function di-dalam PHP namun di tambah dengan visibility di depannya

<hr>

## Constructor Method

- Merupakan sebuah method special atau method khusus yang ada di dalam sebuah Class. Kenapa special? `Karena otomatis dijalankan ketika sebuah Class kita instansiasi atau kita buat Object-nya`

#### Contoh Program:

```php
class Contoh {
   public function __construct() {
        echo "Hello World!";
   }
}
new Contoh;
```

- Output:

```php
Hello World!
```

<hr>

## Object Type

- Pengertian:
  Object Type merupakan sebuah tipe data yang isinya merupakan object atau instance dari sebuah class yang dimana dikirimkannya melalui parameter suatu method.

#### Contoh Program:

```php
class Produk
{
  public $judul,
    $penulis,
    $penerbit,
    $harga;


  public function __construct($judul = "Judul", $penulis = "Penulis", $penerbit = "Penerbit", $harga = 0)
  {
    $this->judul = $judul;
    $this->penulis = $penulis;
    $this->penerbit = $penerbit;
    $this->harga = $harga;
  }

  public function getLabel()
  {
    return "$this->penulis, $this->penerbit";
  }
}

class CetakInfoProduk
{
  public function cetak(Produk $produk)
  {
    $str = "{$produk->judul} | {$produk->getLabel()} (Rp. {$produk->harga})";
    return $str;
  }
}

$produk1 = new Produk("Naruto", "Masashi Khisimoto", "Shonen Jump", 30000);
$produk2 = new Produk("Uncharted", "Neil Druckamn", "Sony Computer", 250000);

echo "Komik : " . $produk1->getLabel();
echo "<br>";
echo "Game : " . $produk2->getLabel();

echo "<br>";
$infoProduk1 = new CetakInfoProduk();
echo $infoProduk1->cetak("asdsadas");

```

#### Breakdown

```php
class CetakInfoProduk
{
  public function cetak(Produk $produk)
  {
    $str = "{$produk->judul} | {$produk->getLabel()} (Rp. {$produk->harga})";
    return $str;
  }
}
```

`Produk $produk` artinya hanya dapat menerima parameter yang instance pada Class Produk

Sehingga ketika

```php
$infoProduk1 = new CetakInfoProduk();
echo $infoProduk1->cetak("asdsadas");
```

error, karena parameter yang dikirimkan bukan instance dari Class Produk

#### Contoh:

```php
$infoProduk1 = new CetakInfoProduk();
echo $infoProduk1->cetak($produk1);
```

<hr>

## Inheritance ( Pewarisan )

- Menciptakan hierarki antar Class ( Parent & Child )
- Child Class, mewarisi semua property dan method dari parrent-na (yang visible)
- Child Class, memperluas (extends) fungsionalitas dari parrent-nya
- Keyword `extends`

#### Contoh Program:

```php
class Produk {
   public function __construct() {
      echo "Ini function __construct Class " . __CLASS__;
   }
}

class Komik extends Produk {

}

new Komik;
```

- Output:

```php
Ini function __construct Class Produk
```

<hr>

## Overiding

Overriding adalah sebuah istilah dimana kita bisa membuat method di Class Child yang memiliki nama yang sama dengan Class Parent nya, atau istilahnya Overriding ini mengambil alih atau menimpa. `Method yang kita buat menimpa method punya-nya Parent Class`

#### Contoh Program:

```php
class Produk {

  public function getInfoProduk() {

    return "Function " . __FUNCTION__ . " Dari Class " . __CLASS__ ;

  }

}

class Game extends Produk {

  public function getInfoProduk() {

    return "Function " . __FUNCTION__ . " Dari Class " . __CLASS__ ;

  }

  public function __construct() {

    echo $this->getInfoProduk();

    echo "

";

    echo parent::getInfoProduk();

  }

}

$obj = new Produk;
echo $obj->getInfoProduk();

echo "

";

$obj2 = new Game;
```

Seperti contoh code diatas dimana Child Class memiliki method yang sama dengan parent nya yaitu `getInfoProduk()`. Jika kita ingin menggunakan method `getInfoProduk()` Class nya sendiri menggunakan keyword `$this->getInfoProduk()` tetapi jika ingin menggunakan method parent nya menggunakan `parent::getInfoProduk()`

<hr>

## Visibility

- Konsep yang digunakan untuk mengatur akses dari <b>property</b> dan <b>method</b> pada sebuah objek
- Ada 3 keyword visibility : <b>public</b>, <b>protected</b> dan <b>private</b>
- <b>public</b> dapat digunakan di mana saja, bahkan di luar kelas nya itu sendiri
- <b>protected</b> hanya dapat digunakan di dalam sebuah kelas beserta turunannya (inheritance)
- <b>private</b> hanya dapat digunakan di dalam sebuah kelas tertentu saja

#### Kenapa kita membutuhkan visibility?

- Hanya memperlihatkan aspek dari class yang dibutuhkan oleh "client"
- Menentukan kebutuhan yang jelas untuk object
- Memberikan kendali pada kode untuk menghindari "bug"

#### Contoh Program:

```php
class Scope {

  # Visibility Public (Global Scope)
  public $harga = 50000;

  # Visibility Proected (Self Class & Child Class Scope)
  protected $harga2 = 100000;

  # Visibility Private (Self Class Scope)
  private $harga3 = 150000;

  public function getHarga() {
    echo "Function " . __FUNCTION__ . " dari Class " . __CLASS__;
    echo "<hr>";

    echo "Public Harga = {$this->harga}";
    echo "<br>";

    echo "Protected Harga2 = {$this->harga2}";
    echo "<br>";

    echo "Private Harga3 = {$this->harga3}";
  }

}

class ChildScope extends Scope {
  public function getHarga() {
    echo "Function " . __FUNCTION__ . " dari Class " . __CLASS__;
    echo "<hr>";

    echo "Public Harga = {$this->harga}";
    echo "<br>";

    echo "Protected Harga2 = {$this->harga2}";
    echo "<br>";

    echo "Private Harga3 = {$this->harga3}";
  }
}

class SuperScope {

  private $harga;

  public function __construct( $harga ) {
    $this->harga = $harga;
  }

  public function getHarga() {
    echo "Function " . __FUNCTION__ . " dari Class " . __CLASS__;
    echo "<hr>";

    echo "Public Harga = {$this->harga}"
  }
}

$scope1 = new Scope();
$scope2 = new ChildScope();
$scope3 = new SuperScope( $scope1->harga );

echo $scope1->getHarga();
echo "<br><br>";

echo $scope2->getHarga();
echo "<br><br>";

echo $scope3->getHarga();

```

<hr>

## Setter & Getter (Accessor Method)

Setter dan Getter ini erat kaitan nya dengan Visibility. Memungkinkan kita untuk melakukan validasi

#### Contoh Program:

```php
class Foo {
  private $class_name;
  public $class_name2;

  public function setClassName( $class_name ) {
    $this->class_name = $class_name;
  }

  public function getClassName() {
    return $this->class_name . $this->class_name2;
  }
}

$obj = new Foo();
$obj->setClassName("Foo");
$obj->class_name = "awikwik";
$obj->class_name2 = "awokwok";
echo $obj->getClassName();

```

<hr>

## Static Keyword

Kita bisa mengakses <b>property</b> dan <b>method</b> dalam konteks <b>class</b>

#### Untuk Apa Static Keyword?

- Member yang terikat dengan class, bukan dengan object
- Nilai static akan selalu tetap meskipun object di-instansiasi berulang kali

#### Keyword yang dipakai?

- Ketika ingin membuat atau mendeklarasikan variable (property) atau function (method) menggunakan keyword <b>static</b> di depannya
- Ketika ingin memanggil variable (property) atau function (method) menggunakan keyword <b>self::</b> di depannya

#### Contoh Program:

```php
class ContohStatic {
  public static $angka = 1;

  public static function halo() {
    return "Halo " . self::$angka++ . " kali.";
  }
}

//echo ContohStatic::$angka;
//echo "<br>";
//echo ContohStatic::halo();
//echo "<hr>";
//echo ContohStatic::halo();

class Contoh {
  public $angka = 1;

  public function __construct() {
    echo "Function " . __FUNCTION__ . " dari Class " . __CLASS__ . "<br><br>";
  }

  public function halo() {
    return "Halo " . $this->angka++ . " kali. <br>";
  }
}

class Contoh2 {
  public static $angka = 1;

  public function __construct() {
    echo "Function " . __FUNCTION__ . " dari Class " . __CLASS__ . " Static Keyword<br><br>";
  }

  public function halo() {
    return "Halo " . self::$angka++ . " kali. <br>";
  }
}

$obj = new Contoh;
echo $obj->halo();
echo $obj->halo();
echo $obj->halo();

echo "<hr>";

$obj2 = new Contoh;
echo $obj2->halo();
echo $obj2->halo();
echo $obj2->halo();

echo "<hr>";

$obj3 = new Contoh2;
echo $obj3->halo();
echo $obj3->halo();
echo $obj3->halo();

echo "<hr>";

$obj4 = new Contoh2;
echo $obj4->halo();
echo $obj4->halo();
echo $obj4->halo();
```

<hr>

## Constant

Sebuah identifier untuk menyimpan nilai, sesuai dengan namanya nilai-nya tidak dapat berubah ketika kita sudah set di dalam program kita. Misalkan kita mempunyai konstanta bernilai 1 maka sampai selesai programnya dijalankan nilai nya akan selalu 1.

#### Keyword yang dipakai Constant:

Keyword membuat konstanta pada PHP `define("NAME", value)` & `const`

Contoh program constant dengan keyword `define()`:

```php
define("NAMA", "Arman Dwi Pangestu");

echo NAMA;
```

Output:

```php
Arman Dwi Pangestu
```

Contoh program constant dengan keyword `const`

```php
const UMUR = 19;

echo UMUR;
```

Output:

```php
19
```

Perbedaannya adalah ketika kita ingin menggunakan konsep Object Oriented, nah menggunakan `define()` ini kita tidak dapat menyimpan kedalam sebuah Class, jadi `define()` ini harus disimpan diluar kelas sebagai constanta global. Sedangkan `const` ini kita bisa masukan kedalam sebuah Class sehingga dapat kita gunakan pada konsep Object Oriented

#### Contoh program constanta pada konsep Object Oriented:

```php
class Coba {
   const NAMA = "Arman Dwi Pangestu";
}

echo Coba::NAMA;
```

Output:

```php
Arman Dwi Pangestu
```

#### Cara Memanggil Constant

Cara memanggil constant sama halnya dengan memanggil static keyword yaitu menggunakan keyword `::` dengan cara `Class::Property`

#### Magic Constant pada PHP:

- `__LINE__` --> Menampilkan `baris` dimana constant ini ditulis
- `__FILE__` --> Menampilkan `PATH File` yang bersangkutan
- `__DIR__` --> Menampilkan `PATH Directory File` yang bersangkutan
- `__FUNCTION__` --> Menampilkan `nama Function` dimana constant ini ditulis
- `__CLASS__` --> Menampilkan `nama Class` dimana constant ini ditulis
- `__TRAIT__` --> Menampilkan `nama Trait`. Nama Trait termasuk namespace yang dideklarasikan (e.g. `FooBar`).
- `__METHOD__` --> Menampilkan `nama Method` dimana constant ini ditulis
- `__NAMESPACE__` --> Menampilkan `nama Namespace`

Selebihnya dapat dibaca di docs php [disini.](https://www.php.net/manual/en/language.constants.magic.php)

#### Contoh Program Magic Constant:

- Magic Constant `__FUNCTION__`

```php
function coba() {
   return __FUNCTION__;
}

echo coba();
```

Output:

```php
coba
```

- Magic Constant `__CLASS__`

```php
class Coba {
   public $kelas = __CLASS__;
}

$obj = new Coba;

echo $obj->kelas;
```

Output:

```php
Coba
```

<hr>

## Abstract Class

- Sebuah kelas yang <b>tidak dapat di-instansiasi</b> (tidak bisa membuat Object dari Class Abstract ini), yang di instansiasi adalah Class turunannya (Child Class)
- Bisa disebut sebagai Kelas "abstrak" yang dimana Class sesungguhnya adalah Class-Class turunannya
- Mendifinisikan interface untuk kelas lain yang menjadi turunannya
- Berperan sebagai "kerangka dasar" untuk kelas turunannya (saling terkait) jadi nanti kelas-kelas turunannya itu akan bekerja sesuai kerangka atau interface yang kita buat di Class Abstrak ini
- Harus memiliki minimal 1 <b>method abstrak</b>, dan nanti method ini yang akan kita anggap sebagai interface atau kerangka method yang akan kita buat di kelas-kelas turunannya
- Erat kaitannya dengan inheritance atau pewarisan
- Digunakan dalam "pewarisan" / inheritance untuk "<b>memaksakan</b>" implementasi method abstrak yang sama untuk kelas turunannya. Di dalam Class Abstract nanti kita mempunyai sebuah method abstrak yang hanya interface nya saja (namanya saja gk ada isinya), isinya nanti kita tuliskan di Class-Class turunannya dengan menggunakan method yang namanya sama

#### Contoh penerapan / studi kasus untuk Abstract Class

```php
class Buah {
   private $warna;

   public function makan() {
      // kunyah
      // nyam..nyam..nyam
   }

   public function setWarna($warna) {
      $this->warna = $warna;
   }
}
```

Setalah itu ada `class Apel` dan `class Jeruk` yang meng-extends atau mewarisi `method` dan `property` dari `class Buah`

```php
class Apel extends Buah {
   public function makan() {
      // kunyah
      // sampai bagian tengah
   }
}
```

```php
class Jeruk extends Buah {
   public function makan() {
      // kupas
      // kunyah
   }
}
```

Jika kalian melakukan instansiasi `class Apel` atau `class Jeruk` dan menjalankan `method makan` maka rasa nya rasa apel atau jeruk (tidak ada masalah)

```php
$apel = new Apel();
$apel->makan();
```

tetapi jika kalian menginstansisasi `class Buah`

```php
$buah = new Buah();
$buah->makan();
```

dan kita juga menjalankan `method makan`, karena class buah mempunyai `method makan`, sekarang pertanyaan-nya buah nya rasa apa? nah pasti bingung kan, maka harus jelas dulu buah nya buah apa, apakah buah apel atau jeruk. Jadi sepertinya `class Buah` ini bukan sebuah class yang akan kita instansiasi, karena yang akan kita instansiasi kalo gk `class Apel` atau `class Jeruk` (Child Class-nya). Nah kalo ada kasus seperti ini kemungkinan yang tepat untuk menerapkan konsep `Abstract Class`

#### Cara Membuat Class Abstract

Cukup menambahkan keyword `abstract` sebelum keyword `class`

#### Contoh Program Membuat Class Abstract

```php
abstract class Buah {
   private $warna;

   abstract public function makan();

   public function setWarna($warna) {
      $this->warna = $warna;
   }
}
```

Seperti pada penjelasan sebelumnya, bahwa Class Abstract ini harus memiliki minimal 1 method abstract, yang dimana pada contoh program diatas, yang menjadi method abstract nya adalah method:

```php
abstract public function makan();
```

Method ini hanya interface saja dan implementasi nya ada di kelas turunannya, nantinya pada kelas turunannya wajib ada implementasi dari method

```php
abstract public function makan();
```

#### Abstract Class 2

- Semua kelas turunan, harus mengimplementasikan method abstrak yang ada di kelas abstraknya
- Kelas abstrak boleh memiliki property / method reguler
- Kelas abstrak boleh memiliki property / static method

#### Contoh Class Abstract 2

- `class mobil Extends Kendaraan`
- `class Laptop Extends Komputer`
- `class Email Extends Komunikasi`
- `...`

Nah pada contoh ini seharus-nya kalian sudah bisa lihat kira - kira mana yang class Abstract, semua yang disebelah kanan, yaitu:

```php
Kendaraan
```

```php
Komputer
```

```php
Komunikasi
```

bisa kita jadikan sebagai class Abstract

#### Kenapa Kelas Abstrak?

Kenapa menggunakan kelas abstrak?

- Merepresentasikan ide atau konsep dasar yang nantinya akan di implementasikan di kelas-kelas turunannya, dan yang harus kalian pahami penggunaan kelas abstrak ini bukan masalah benar dan salah tetapi adalah keputusan design (keputusan dari perancangan sebuah kelas). Kalo kalian ingin benar-benar menerapkan konsep Object Oriented kenapa tidak menggunakan konsep kelas abstrak ini
- <i>"Composition over Inheritance"</i> jadi sebaiknya kita melakukan komposisi dibandingkan kita melakukan inheritance begitu saja, sebetulnya tanpa menggunakan kelas abstrak pun bisa, hanya menggunakan inheritance saja, seperti yang kita lakukan tadi waktu kita buat `class Buah` di awal sebetulnya tidak error cuman nanti agak aneh ketika kita melakukan instansiasi `class Buah` padahal kalo `class Buah` gk pernah kita instansiasi gk ada masalah. Nah komposisi disini maksudnya nanti kalian menggunakan abstraksi atau interface
- Salah satu cara menerapkan Polimorphism
- Sentralisasi logic
- Mempermudah pengerjaan tim

<hr>

## Abstract Class (Bagian 2) Studi Kasus

Seperti pembahasan sebelumnya, konsep ini bukan masalah benar atau salah nya melainkan keputusan perancangan kode ketika membuat program

#### Contoh Kasus Program Tanpa Abstract Class

```php
class Produk {
   private $nama;

   public function __construct($nama) {
      $this->nama = $nama;
   }

   public function getInfoProduk() {
      $str = "Nama Produk : $this->nama";
      return $str;
   }
}

class Game extends Produk {

   private $waktuMain;

   public function __construct($nama = "Nama Produk", $waktuMain = 0) {
      parent::__construct($nama);
      $this->waktuMain = $waktuMain;
   }

   public function getInfoProduk() {
      $str = "Game --> " . parent::getInfoProduk() . ", Waktu Main : {$this->waktuMain}";
      return $str;
   }

}

class Komik extends Produk {

   private $jumlahHalaman;

   public function __construct($nama = "Nama Produk", $jumlahHalaman = 0) {
      parent::__construct($nama);
      $this->jumlahHalaman = $jumlahHalaman;
   }

   public function getInfoProduk() {
      $str = "Komik --> " . parent::getInfoProduk() . ", Jumlah Halaman {$this->jumlahHalaman}";
      return $str;
   }

}

class CetakInfoProduk {
   public $daftarProduk = [];

   public function tambahProduk(Produk $produk) {
      $this->daftarProduk[] = $produk;
   }

   public function cetak() {
      $str = "DAFTAR PRODUK : <br>";

      forEach($this->daftarProduk as $p) {
         $str .= "- {$p->getInfoProduk()} <br>";
      }

      return $str;
   }
}

$produk1 = new Game("Resident Evil", 100);
$produk2 = new Game("Mortal Kombat 11", 50);
$produk3 = new Komik("Naruto Shippuden", 125);

$cetakProduk = new CetakInfoProduk();
$cetakProduk->tambahProduk($produk1);
$cetakProduk->tambahProduk($produk2);
$cetakProduk->tambahProduk($produk3);
echo $cetakProduk->cetak();
```

Output

```php
DAFTAR PRODUK :
- Game --> Nama Produk : Resident Evil, Waktu Main : 100
- Game --> Nama Produk : Mortal Kombat 11, Waktu Main : 50
- Komik --> Nama Produk : Naruto Shippuden, Jumlah Halaman 125
```

Pada program diatas, dapat kita simpulkan bahwa `class Produk` ini tidak akan kita instansiasi (yang akan kita instansiasi adalah kelas turunannya `child Class`) sehingga dapat kita terapkan konsep Abstract Class nya, untuk menerapkan konsep `Abstract Class` cukup menambahkan keyword `abstract` sebelum keyword `class`. Menjadi seperti ini:

```php
abstract class Produk {
   ...
}
```

Perlu di ingat, aturan Abstract Class ini harus mempunyai setidaknya 1 buah `method abstract`. Pada kasus ini method yang dapat kita jadikan abstract adalah:

```php
abstract class Produk {
   public function getInfoProduk() {
      ...
   }
}
```

karena jika kita lihat, method ini ada dan juga digunakan di child class nya, yaitu:

```php
class Game extends Produk {
   public function getInfoProduk() {
      ...
   }
}

class Komik extends Produk {
   public function getInfoProduk() {
      ...
   }
}
```

untuk membuat method ini menjadi abstract cukup menambahkan keyword `abstract` sebelum visibility nya, menjadi:

```php
abstract class Produk {
   abstract public function getInfoProduk();
}
```

method abstract ini hanya interface nya saja atau dengan kata lain hanya template pembuatan method, untuk pen-deklarasian method nya ada di `Child Class`-nya.

```php
abstract class Produk {
   abstract public function getInfoProduk();
}

class Game extends Produk {
   public function getInfoProduk() {
      ...
   }
}

class Komik extends Produk {
   public function getInfoProduk() {
      ...
   }
}
```

#### Penerapan Konsep Abstract Class Pada Kasus Program diatas

```php
abstract class Produk
{

  private $nama;

  public function __construct($nama)
  {
    $this->nama = $nama;
  }

  abstract public function getInfoProduk();

  public function getInfo()
  {
    $str = "Nama Produk : $this->nama";
    return $str;
  }
}

class Game extends Produk
{

  private $waktuMain;

  public function __construct($nama = "Nama Produk", $waktuMain = 0)
  {
    parent::__construct($nama);
    $this->waktuMain = $waktuMain;
  }

  public function getInfoProduk()
  {
    $str = "Game --> " . $this->getInfo() . ", Waktu Main : {$this->waktuMain}";
    return $str;
  }
}

class Komik extends Produk
{
  private $jumlahHalaman;

  public function __construct($nama = "Nama Produk", $jumlahHalaman = 0)
  {
    parent::__construct($nama);
    $this->jumlahHalaman = $jumlahHalaman;
  }

  public function getInfoProduk()
  {
    $str = "Komik --> " . $this->getInfo() . ", Jumlah Halaman {$this->jumlahHalaman}";
    return $str;
  }
}

class CetakInfoProduk
{
  public $daftarProduk = [];

  public function tambahProduk(Produk $produk)
  {
    $this->daftarProduk[] = $produk;
  }

  public function cetak()
  {
    $str = "DAFTAR PRODUK : <br>";

    foreach ($this->daftarProduk as $p) {
      $str .= "- {$p->getInfoProduk()} <br>";
    }

    return $str;
  }
}

$produk1 = new Game("Resident Evil", 100);
$produk2 = new Game("Mortal Kombat 11", 50);
$produk3 = new Komik("Naruto Shippuden", 125);

$cetakProduk = new CetakInfoProduk();
$cetakProduk->tambahProduk($produk1);
$cetakProduk->tambahProduk($produk2);
$cetakProduk->tambahProduk($produk3);
echo $cetakProduk->cetak();
```

Output:

```php
DAFTAR PRODUK : <br>
- Game --> Nama Produk : Resident Evil, Waktu Main : 100 <br>
- Game --> Nama Produk : Mortal Kombat 11, Waktu Main : 50 <br>
- Komik --> Nama Produk : Naruto Shippuden, Jumlah Halaman 125 <br>
```

<hr />

## Interface

- Merupakan `kelas abstrak` yang sama sekali tidak memiliki implementasi
- <b>Murni</b> merupakan template untuk kelas turunannya
- <b>Tidak boleh</b> memiliki property, hanya deklarasi method nya saja
- Semua method harus dideklarasikan dengan `visbility public`
- Boleh mendeklarasikan `__construct()`
- Satu kelas boleh mengimplementasikan <b>banyak interface</b>
- Dengan menggunakan type-hinting dapat melakukan **Dependency Injection**

> `type-hinting` ini sudah kita lakukan di bagian `Object Type` dimana sebuah `Object` bisa kita jadikan sebagai parameter. Istilah **Dependency Injection** ini sekarang sudah banyak digunakan, dimana sebuah method untuk menerima parameter nya adalah `Object`

- Pada akhirnya akan mencapai `Polymorphism`

#### Keyword yang dipakai Interface

Keyword yang digunakan adalah `interface`. Jadi cukup menambahkan keyword tersebut di depan atau sebelum nama class nya dan tidak menulis keyword `class` nya lagi jadi cukup `interface NamaKelas`, contoh program nya:

```php
interface Buah {
   public function makan();
   public function setWarna($warna);
}
```

Di dalam class `interface` kita hanya boleh mempunyai deklarasi method nya saja. Jika sebelumnya method `makan()` ini adalah `abstract` sekarang dikembalikan lagi seperti biasa namun tidak ada implementasi nya dan method `setWarna($warna)` juga tidak boleh ada implementasi nya (hanya deklarasinya saja). Betul - betul murni sebagai template yang nantinya kelas turunannya wajib ada dua implementasi dari method ini.

```php
...
   public function makan();
   public function setWarna($warna);
...
```

#### Implementasi Interface

Kelas turunannya kita ubah seperti apa? misalnya disini `class Apel` ingin menjadi implementasi dari `class Buah` maka tambahkan keyword `implements` bukan `extends` lagi, contoh program:

```php
interface Buah {
   public function makan();
   public function setWarna($warna);
}

class Apel implements Buah {
   protected $warna;
   public function makan() {
      //kunyah
      //sampai bagian tengah
   }
   public function setWarna($warna) {
      $this->warna = $warna;
   }
}
```

dan didalamnya harus ada impelementasi dari dua method yang ada di dalam `interface`, kalo di interface nya ada tiga (3) maka harus ada tiga (3) yang menjadi implementasi dari class interface nya. Lebih boleh di dalam `class Apel` ada empat (4) method gapapa tapi minimal semua method yang dideklarasikan di kelas interface itu ada.

Kelas turunannya dapat mengimplementasikan banyak interface, seperti program dibawah ini:

```php
interface Buah {
  public function makan();
  public function setWarna($warna);
}

interface Benda {
  public function setUkuran($ukuran);
}

class Apel implements Buah, Benda {
  protected $warna;
  protected $ukuran;
  public function makan() {
    //kunyah
    //sampai bagian tengah
  }
  public function setWarna($warna) {
    $this->warna = $warna;
  }
  public function setUkuran($ukuran) {
    $this->ukuran = $ukuran;
  }
}

class Jeruk implements Buah {
  protected $warna;
  public function makan() {
    // kupas
    // kunyah
  }
  public function setWarna($warna) {
    $this->warna = $warna;
  }
}
```

Pada program diatas artinya `Class Apel` meng-implementasikan `interface Buah` dan `interface Benda`. Jika sudah begini konsekuensi nya adalah kita wajib menuliskan method dari kedua implementasi nya

#### Penerapan Konsep Interface Pada Kasus Program Diatas

```php
<?php

interface InfoProduk {
  public function getInfoProduk();
}

abstract class Produk
{
  protected $judul,
    $penulis,
    $penerbit,
    $harga,
    $diskon = 0;

  public function __construct($judul = "Judul", $penulis = "Penulis", $penerbit = "Penerbit", $harga = 0)
  {
    $this->judul = $judul;
    $this->penulis = $penulis;
    $this->penerbit = $penerbit;
    $this->harga = $harga;
  }

  public function getJudul() {
    return $this->judul;
  }

  public function setJudul( $judul ) {
    //if ( !is_string($judul) ) {
    //  throw new Exception("Judul harus string!");
    //}
    $this->judul = $judul;
  }

  public function setPenulis( $penulis ) {
    $this->penulis = $penulis;
  }

  public function getPenulis() {
    return $this->penulis;
  }

  public function setPenerbit( $penerbit ) {
    $this->penerbit = $penerbit;
  }

  public function getPenerbit() {
    return $this->penerbit;
  }

  public function setDiskon( $diskon ) {
    $this->diskon = $diskon;
  }

  public function getDiskon() {
    return $this->diskon;
  }

  public function setHarga( $harga ) {
    $this->harga = $harga;
  }

  public function getHarga() {
    return $this->harga - ( $this->harga * $this->diskon / 100 );
  }

  public function getLabel()
  {
    return "$this->penulis, $this->penerbit";
  }

  abstract public function getInfo();

}

class Komik extends Produk implements InfoProduk
{
  public $jumlahHalaman;

  public function __construct($judul = "Judul", $penulis = "Penulis", $penerbit = "Penerbit", $harga = 0, $jumlahHalaman = 0)
  {
    parent::__construct($judul, $penulis, $penerbit, $harga);
    $this->jumlahHalaman = $jumlahHalaman;
  }

 public function getInfo() {
    $str = "{$this->judul} | {$this->getLabel()} (Rp. {$this->harga})";
    return $str;
  }

  public function getInfoProduk()
  {
    $str = "Komik : " . $this->getInfo() . " - {$this->jumlahHalaman} Halaman.";
    return $str;
  }
}

class Game extends Produk implements InfoProduk
{
  public $waktuMain;

  public function __construct($judul = "Judul", $penulis = "Penulis", $penerbit = "Penerbit", $harga = 0, $waktuMain = 0)
  {
    parent::__construct($judul, $penulis, $penerbit, $harga);
    $this->waktuMain = $waktuMain;
  }

 public function getInfo() {
    $str = "{$this->judul} | {$this->getLabel()} (Rp. {$this->harga})";
    return $str;
  }

  public function getInfoProduk()
  {
    $str = "Game : " . $this->getInfo() . " ~ {$this->waktuMain} Jam.";
    return $str;
  }
}

class CetakInfoProduk
{
  public $daftarProduk = []; //array();

  public function tambahProduk( Produk $produk ) {
    $this->daftarProduk[] = $produk;
  }

  public function cetak()
  {
    $str = "DAFTAR PRODUK : <br>\n";

    foreach ($this->daftarProduk as $p) {
      $str .= "- {$p->getInfoProduk()} <br>\n";
    }

    return $str;
  }
}

//$produk = new Produk();

$produk1 = new Komik("Naruto", "Masashi Khisimoto", "Shonen Jump", 30000, 100);
$produk2 = new Game("Uncharted", "Neil Druckamn", "Sony Computer", 250000, 50);

$cetakProduk = new CetakInfoProduk();
$cetakProduk->tambahProduk( $produk1 );
$cetakProduk->tambahProduk( $produk2 );
echo $cetakProduk->cetak();
```
