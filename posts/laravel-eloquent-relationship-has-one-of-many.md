---
published: true
title: "Laravel Eloquent - Relationship Has One of Many"
tag: "Programming"
date: "January 28 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship Has One of Many"
cover_image: "/images/posts/Laravel Eloquent - Relationship Has One of Many.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Pada pembahasan sebelumnya kita sudah membahas mengenai Laravel Eloquent - Relationship Where Belongs To, pada artikel kali ini kita akan membahas sesuatu yang disebut Has One of Many. Apa itu Has One of Many dan mengapa kita membutuhkannya?

## Has One of Many

Terkadang suatu model mungkin memiliki banyak model terkait. Namun, mungkin kalian ingin dengan mudah mengambil relationship model terkait "latest" atau "oldest" nya. Misalnya, model `User` mungkin terkait dengan banyak model `Order`. Namun, kalian ingin menentukan cara yang nyaman untuk berinteraksi dengan data pesanan atau order-an terbaru (latest) yang dibuat oleh user. Nah kalian dapat melakukannya dengan menggunakan tipe relationship `hasOne` yang dikombinasikan atau men-chaining dengan method `ofMany`.

Mengapa relationship nya menggunakan `hasOne` dan kemudian melakukan chaining dengan method `ofMany`? Mengapa tidak menggunakan relationship `hasMany` atau `One to Many`? Karena jika kalian familiar ketika menggunakan RAW SQL, mungkin kalian mengetahui yang namanya aggregate function seperti `MIN` dan `MAX`. Nah, aggregate function tersebut simpel nya adalah melakukan pencarian dari banyak nya data menjadi satu bukan? Seperti kita ingin mencari nilai terkecil atau terbesar maka kita perlu mencari dari seluruh kemungkinan data yang ada kemudian kita ambil satu data sebagai kesimpulan data nya. Sehingga kita dapat menyimpulkan bahwa konsep ini adalah `satu dari banyak`, oleh karena itulah mengapa kita menggunakan relationship `hasOne` yang kemudian melakukan chaining method `ofMany`. Agar lebih terbayang mungkin kalian dapat melihat gambar relationship antara model `User` dengan model `Order` dibawah ini

![Relationship Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/relationship-design.png)

> **Catatan**:
>
> Kode dibawah ini adalah contoh method relationship dari model `User` ke model `Order`

```php
/**
 * Get the user's most recent order.
 */
public function latestOrder(): HasOne
{
    return $this->hasOne(Order::class)->latestOfMany();
}

/**
 * Get the user's oldest order.
 */
public function oldestOrder(): HasOne
{
    return $this->hasOne(Order::class)->oldestOfMany();
}
```

Secara default atau bawaan, method `latestOfMany` dan `oldestOfMany` akan mengambil model terkait untuk "latest" atau "oldest" berdasarkan primary key (id) model, yang dimana harus dapat diurutkan atau sortable. Namun, terkadang kalian mungkin ingin mengambil satu model dari relationship yang lebih besar menggunakan kriteria pengurutan atau sorting criteria yang berbeda.

Misalnya, dengan mengunakan method `ofMany`, kalian dapat mengambil pesanan atau order user yang paling mahal. Method `ofMany` menerima kolom yang dapat diurutkan sebagai argumen pertamanya dan aggregate function (`MIN` atau `MAX`) yang akan diterapkan saat melakukan query untuk model terkait

```php
/**
 * Get the user's largest order.
 */
public function largestOrder(): HasOne
{
    return $this->hasOne(Order::class)->ofMany('price', 'max');
}
```

## Implementasi Has One of Many

Setelah kita memahami apa itu `Has One of Many` dan bagaimana cara menggunakannya, sekarang kita akan mencoba meng-implementasikan pada project yang sudah kita buat.

### Model Order

Untuk membuat sebuah relationship dengan studi kasus seperti yang sudah saya buat diatas, kita perlu membuat model, migration, factory dan seeder nya `Order` terlebih dahulu. Untuk membuat model, migration, factory dan seeder secara sekaligus kita bisa gunakan perintah artisan berikut ini:

> **Catatan**: Tips
>
> Flag atau option `-mfs` disini artinya kita akan membuat model sekaligus dengan `migration`, `factory`, dan juga `seeder` nya.

```shell
php artisan make:model -mfs Order
```

Selanjutnya kita ubah file model `Order` nya di `app\Models\Order.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

#### Migration Order

Sekarang kita sesuaikan kode migration nya agar kolom dari tabel `orders` nya sesuai dengan design yang sudah saya buat diatas, file migration tersebut berada di `database\migration\2024_01_28_132329_create_orders_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
```

#### Factory Order

Selanjutnya kita siapkan data dummy untuk model `Factory` tersebut menggunakan faker di file factory `database\factories\OrderFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => mt_rand(1, 5),
            'price' => fake()->randomFloat(2, 1, 999)
        ];
    }
}
```

#### Seeder Order

Setelah factory faker nya sudah siap, sekarang kita eksekusi pembuatan data dummy nya di file `database\seeders\OrderSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        Order::factory(10)->create();
    }
}
```

Jangan lupa kita panggil class `OrderSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PhoneSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            OrderSeeder::class
        ]);
    }
}
```

Setelah semuanya siap, sekarang kita jalankan migration nya menggunakan perintah artisan berikut ini:

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya sudah terbuat sebuah tabel baru dengan nama `orders` didalam database nya dengan isian kolom dan data dummy seperti berikut ini

| Column     | Data Type       |
| ---------- | --------------- |
| id         | bigint unsigned |
| user_id    | bigint unsigned |
| price      | decimal(10,2)   |
| created_at | timestamp       |
| updated_at | timestamp       |

![User Orders](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/user-orders.png)

### Membuat Method Relation di Model User Agar Terhubung ke Model Order

Setelah model `Order` nya sudah siap, sekarang kita akan buat relationship `hasOne` yang kemudian men-chaining method `ofMany` pada model `User` nya

#### Mendapatkan Data Order Terakhir atau Latest Order User

Untuk mendapatkan data order terakhir user menggunakan `Has One of Many` kita bisa buat relationship pada model `User` seperti berikut ini

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    ...

    public function latestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->latestOfMany();
    }
}
```

Jika relationship nya sudah di definisikan, maka sekarang kita bisa mencoba menjalankan `Has One of Many` nya, kita bisa gunakan shell tinker untuk mencoba nya, untuk masuk kedalam shell nya kita jalankan perintah artisan berikut ini:

```shell
php artisan tinker
```

Setelah masuk kedalam shell nya, kita buat sebuah variabel dengan nama `latestOrder` yang isinya memanggil relationship atau "dynamic properties" nya seperti berikut ini

```php
$latestOrder = User::find(1)->latestOrder;
```

Maka seharusnya sekarang perintah diatas akan mengembalikan nilai mengenai order-an terakhir dari user nya

```php
= App\Models\Order {#6042
    id: 6,
    user_id: 1,
    price: "838.26",
    created_at: "2024-01-28 13:35:48",
    updated_at: "2024-01-28 13:35:48",
  }
```

![Tinker Latest Order](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/tinker-latest-order.png)

![User Latest Order](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/user-latest-order.png)

#### Mendapatkan Data Order Tertua atau Oldest Order User

Setelah sebelumnya kita berhasil mendapatkan data "latest" order user, sekarang kita akan mencoba mendapatkan data tertua atau "oldest" order user nya. Untuk mendapatkan nya kita buat terlebih dahulu relationship nya di model `User` seperti berikut ini:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    ...

    public function latestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->latestOfMany();
    }

    public function oldestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->oldestOfMany();
    }
}
```

Sekarang kita coba panggil relationship atau "dynamic properties" nya menggunakan tinker seperti berikut ini:

> **Catatan**: Tips
>
> Dikarenakan kita melakukan perubahan kode pada model nya, maka kita perlu melakukan restart session tinker untuk menerapkannya

```php
$oldestOrder = User::find(1)->oldestOrder;
```

Maka seharusnya sekarang perintah diatas akan mengembalikan nilai mengenai order-an tertua dari user nya

```php
= App\Models\Order {#5047
    id: 4,
    user_id: 1,
    price: "991.06",
    created_at: "2024-01-28 13:35:46",
    updated_at: "2024-01-28 13:35:46",
  }
```

![Tinker Oldest Order](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/tinker-oldest-order.png)

![User Oldest Order](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/user-oldest-order.png)

#### Mendapatkan Harga Tertinggi Dari Data Order User

Setelah kita berhasil mendapatkan data "latest" dan "oldest" order user, sekarang kita akan mencoba mencari atau mendapatkan harga tertinggi dari data order user nya. Untuk mendapatkannya kita buat terlebih dahulu relationship nya di model `User` seperti berikut ini:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    ...

    public function latestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->latestOfMany();
    }

    public function oldestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->oldestOfMany();
    }

    public function largestOrder(): HasOne
    {
        return $this->hasOne(Order::class)->ofMany('price', 'max');
    }
}
```

Sekarang kita coba panggil relationship atau "dynamic properties" nya menggunakan tinker seperti berikut ini

```php
$largestOrder = User::find(1)->largestOrder;
```

Maka seharusnya sekarang perintah diatas akan mengembalikan nilai mengenai order-an dengan harga tertinggi dari user nya

```php
= App\Models\Order {#6045
    id: 4,
    user_id: 1,
    price: "991.06",
    created_at: "2024-01-28 13:35:46",
    updated_at: "2024-01-28 13:35:46",
  }
```

![Tinker Largest Order](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/tinker-largest-order.png)

![User Largest Order](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/user-largest-order.png)

### Membuat Has One of Many Dapat Diakses Melalui Web

Agar kita dapat melihat RAW Query SQL yang dijalankan seperti apa menggunakan clockwork, kita bisa buat agar semua relationship yang sudah kita buat diatas dapat dijalankan melalui web. Untuk melakukannya kita bisa buat sebuah method dengan nama `hasOneOfMany` di file controller `RelationController`

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    ...

    public function hasOneOfMany(Request $request)
    {
        $user = User::find($request->id);
        $summary = [];
        $summary['latestOrder'] = $user->latestOrder;
        $summary['oldestOrder'] = $user->oldestOrder;
        $summary['largestOrder'] = $user->largestOrder;

        return $summary;
    }
}
```

Setelah method di controller nya dibuat, sekarang kita siapkan route untuk menangani method tersebut. Kita bisa buat route nya di file `routes\web.php`

```php
Route::get('/relation/hasOneOfMany', [RelationController::class, 'hasOneOfMany']);
```

Sekarang kita bisa akses route tersebut dengan endpoint `/relation/hasOneOfMany` dengan mengirimkan data `id` user nya untuk menjalankan relationship `Has One of Many` yang sudah kita buat. Jika kalian mencoba mengakses nya maka akan muncul 3 data order (latest, oldest, dan largest) dari user nya seperti gambar berikut ini

![Has One of Many Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/has-one-of-many-via-web.png)

Bisa kalian lihat RAW Query SQL yang dijalankan adalah menggunakan aggregate function yaitu `MIN` dan `MAX`

## Tips Tambahan

### Converting "Many" Relationship ke Has One Relationship

Mungkin kalian tidak menggunakan relationship `Has One of Many` pada studi kasus model `User` ke model `Order`, yang dimana relationship Has One of Many tersebut adalah `hasOne` (One to One) yang men-chaining method `ofMany`. Namun, kalian mungkin menggunakan atau sudah mempunyai relationship `hasMany` (One to Many) dari model `User` ke model `Order` seperti berikut ini

![Converting Has Many to Has One of Many](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/converting-has-many-to-has-one-of-many.png)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    ...

    /**
     * Get the user's orders.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
```

Nah, didalam Laravel kita dapat dengan mudah mengubah relationship tersebut menjadi "has one" relationship dengan men-chaining atau menerapkan method `one` pada relationship tersebut:

> **Catatan**:
>
> Hal ini juga berlaku untuk method
>
> - `latestOfMany`
> - `oldestOfMany`
> - `ofMany`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    ...

    /**
     * Get the user's orders.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the user's largest order.
     */
    public function largestOrder(): HasOne
    {
        return $this->orders()->one()->ofMany('price', 'max');
    }
}
```

Jika kalian belum terbayang, simpel nya adalah jika kita sudah memiliki relationship `hasMany` (One to Many) seperti method `orders` diatas, kita bisa lakukan convert relationship tersebut agar menjadi `Has One of Many` mengunakan method `one` dan diikuti dengan method selanjutnya seperti `latestOfMany`, `oldestOfMany` atau `ofMany`.

![Explain Convert Many Relationship to Has One](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-of-many/explain-convert-many-relationship-to-has-one.png)
