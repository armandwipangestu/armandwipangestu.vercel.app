---
published: true
title: "Laravel Eloquent - Relationship Advanced Has One of Many"
tag: "Programming"
date: "January 30 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship Advanced Has One of Many"
cover_image: "/images/posts/Laravel Eloquent - Relationship Advanced Has One of Many.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Setelah pada pembahasan sebelumnya kita membahas mengenai Laravel Eloquent - Relationship Has One of Many, pada artikel kali ini kita akan membahas mengenai Advance dari Has One of Many atau studi kasus yang lebih kompleks dari sekedar model `User` dan model `Order`. Pada pembahasan kali ini terdapat sebuah studi kasus mengenai product yang memiliki banyak nya harga yang bisa diterapkan atau ditetapkan. Misalkan, sebuah model `Product` mungkin memiliki banyak model `Price` terkait yang dipertahankan dalam sistem bahkan setelah harga baru di publish. Selain itu, data harga baru untuk produk tersebut mungkin dapat di publish terlebih dahulu agar belaku di masa mendatang melalui kolom `published_at`.

Jadi, secara singkat, kita perlu mengambil harga terbaru yang di publish (latest published) dimana tanggal published nya bukan di masa depan. Selain itu, jika terdapat dua harga yang memiliki tanggal publish yang sama, maka Eloquent akan memilih harga berdasarkan urutan `id` terbesar. Untuk mencapai hal tersebut, kita harus meneruskan (passing) array ke method `ofMany` pada argumen pertama yang berisi kolom yang dapat diurutkan (sortable) yang menentukan harga terbaru. Selain itu, sebuah closure akan diberikan pada argumen kedua pada method `ofMany`. Closure tersebut akan bertanggung jawab untuk menambahkan batasan tanggal publish tambahan kedalam relationship query.

Agar lebih terbayang mungkin kalian bisa melihat gambar relationship dibawah ini antara model `Product` dan model `Price`

![Relationship Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/relationship-design.png)

## Studi Kasus Harga Jagung

Jika masih belum terbayang mungkin kalian bisa lihat gambar dibawah ini sebagai representasi data nya, Saya ambil kasus misalkan product nya adalah jagung, yang dimana harga jagung tersebut biasanya akan naik jika mendekati tahun baru dan jika sudah lewat tahun baru maka harga nya akan kembali normal. Nah, dikarenakan banyak nya harga yang akan ditetapkan sesuai dengan tanggal tertentu maka kita bisa simpan harga dari product tersebut lebih dari satu kemudian untuk menerapkan harga terkini nya kita bisa ambil berdasarkan kolom `published_at`.

![Studi Case Corn Price](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/studi-case-corn-price.png)

## Implementasi Studi Kasus

Setelah memahami studi kasus diatas, sekarang kita akan mencoba meng-implementasikan pada project yang sudah kita buat.

### Model Product

Untuk membuat sebuah relationship dengan studi kasus seperti yang sudah saya buat diatas, kita perlu membuat model, migration, factory dan seeder nya `Product` terlebih dahulu. Untuk membuat model, migration, factory dan seeder secara sekaligus kita bisa gunakan perintah artisan berikut ini:

> **Catatan**: Tips
>
> Flag atau option `-mfs` disini artinya kita akan membuat model sekaligus dengan `migration`, `factory`, dan juga `seeder` nya.

```shell
php artisan make:model -mfs Product
```

Selanjutnya kita ubah file model `Product` nya di `app\Models\Product.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

#### Migration Product

Sekarang kita sesuaikan kode migration nya agar kolom dari tabel `products` nya sesuai dengan design yang sudah saya buat diatas, file migration tersebut berada di `database\migrations\2024_01_30_181940_create_products_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

#### Factory Product

Selanjutnya kita siapkan data dummy untuk model `Product` tersebut menggunakan faker di file factory `database\factories\ProductFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->word
        ];
    }
}
```

#### Seeder Product

Setelah factory faker nya sudah siap, sekarang kita eksekusi pembuatan data dummy nya di file `database\seeders\ProductSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory(10)->create();
    }
}
```

Jangan lupa kita panggil class `ProductSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

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
            OrderSeeder::class,
            ProductSeeder::class
        ]);
    }
}
```

Setelah semuanya siap, sekarang kita jalankan migration nya menggunakan perintah artisan berikut ini:

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya sudah terbuat sebuah tabel baru dengan nama `products` didalam database nya dengan isian kolom dan data dummy seperti berikut ini

| Column     | Data Type       |
| ---------- | --------------- |
| id         | bigint unsigned |
| name       | bigint unsigned |
| created_at | timestamp       |
| updated_at | timestamp       |

![Products](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/products.png)

### Model Price

Setelah model `Product` siap, sekarang kita siapkan untuk model `Price`, untuk membuat model, migration, factory dan seeder nya secara sekaligus kita bisa gunakan perintah artisan berikut ini:

```shell
php artisan make:model -mfs Price
```

Selanjutnya kita ubah file model `Price` nya di `app\Models\Price.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
```

#### Migration Price

Sekarang kita sesuaikan kode migration nya agar kolom dari tabel `prices` nya sesuai dengan design yang sudah saya buat, file migration tersebut berada di `database\migrations\2024_01_30_183427_create_prices_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id');
            $table->decimal('amount', 10, 2);
            $table->timestamp('published_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
```

#### Factory Price

Selanjutnya kita siapkan data dummy untuk model `Price` tersebut menggunakan faker di file factory `database\factories\PriceFactory.php`

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PriceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => mt_rand(1, 10),
            'amount' => fake()->randomFloat(2, 1, 1000),
            'published_at' => fake()->dateTimeThisMonth()
        ];
    }
}
```

#### Seeder Price

Setelah factory nya sudah siap, sekarang kita bisa eksekusi pembuatan data dummy nya di file `database\seeders\PriceSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    public function run(): void
    {
        Price::factory(20)->create();
    }
}
```

Jangan lupa kita panggil class `PriceSeeder` tersebut di file `database\seeders\DatabaseSeeder.php`

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
            OrderSeeder::class,
            ProductSeeder::class,
            PriceSeeder::class
        ]);
    }
}
```

Setelah semuanya siap, sekarang kita bisa jalankan migration nya menggunakan perintah artisan berikut ini:

```shell
php artisan migrate:fresh --seed
```

Maka sekarang seharusnya sudah terbuat tabel baru dengan nama `prices` didalam database dengan isian kolom dan dummy data seperti berikut ini

| Column       | Data Type       |
| ------------ | --------------- |
| id           | bigint unsigned |
| product_id   | bigint unsigned |
| amount       | decimal(10,2)   |
| published_at | timestamp       |
| created_at   | timestamp       |
| updated_at   | timestamp       |

![Prices](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/prices.png)

### Membuat Method Relationship di Model Product Agar Terhubung ke Model Price

Setelah model `Product` dan `Price` nya sudah siap, sekarang kita akan buat method dengan nama `currentPricing` yang relationship nya adalah `hasOne` yang kemudian men-chaining method `ofMany` pada model `Product` nya

> **Catatan**:
>
> - Pada argument pertama di method `ofMany` disini kita akan ambil data harga yang dari kolom `published_at` dan `id` nya terkini
> - Pada argument kedua di method `ofMany` disini kita kirimkan sebuah closure untuk untuk memberikan kondisi batasan agar harga yang di ambil adalah harga yang bukan dari masa yang akan mendatang

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function currentPricing(): HasOne
    {
        return $this->hasOne(Price::class)->ofMany([
            'published_at' => 'max',
            'id' => 'max',
        ], function (Builder $query) {
            $query->where('published_at', '<', now());
        });
    }
}
```

#### Mengakses atau Menjalankan Method Relationship

Untuk mencoba nya seperti biasa kita akan gunakan shell `tinker` dengan cara masuk terlebih dahulu kedalam shell nya menggunakan perintah artisan berikut ini

```shell
php artisan tinker
```

Jika sudah didalam shell nya, sekarang kita bisa buat sebuah variabel dengan nama `price` yang value nya adalah model `Product` yang men-chaining relationship method `currentPricing` atau dynamic property nya

```php
$price = App\Models\Product::find(1)->currentPricing;
```

Maka seharusnya perintah diatas akan me-return value dari data harga yang terkait dengan product nya

```php
= App\Models\Price {#6049
    id: 10,
    product_id: 1,
    amount: "902.14",
    published_at: "2024-01-25 09:23:39",
    created_at: "2024-01-30 18:42:42",
    updated_at: "2024-01-30 18:42:42",
  }
```

![Tinker Get Price](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/tinker-get-price.png)

![Current Prices 1](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/current-prices-1.png)

#### Tes Data Dengan Tanggal Publish Yang Sama

Sekarang kita coba ubah data dengan id `10` tersebut agar data `published_at` nya sama dengan yang id nya `18`

![Price Change Published At](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/price-change-published-at.png)

```php
$price = App\Models\Product::find(1)->currentPricing;
```

Maka seharusnya sekarang harga dari product nya adalah harga yang id nya `18` karena id nya lebih besar

```php
= App\Models\Price {#6069
    id: 18,
    product_id: 1,
    amount: "136.15",
    published_at: "2024-01-18 05:01:13",
    created_at: "2024-01-30 18:42:42",
    updated_at: "2024-01-30 18:42:42",
  }
```

![Tinker Get Price Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/tinker-get-price-update.png)

![Current Price Update](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/current-price-update.png)

Agar lebih terbayang kalian bisa lihat gambar dibawah ini

![Studi Case Data Dummy](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/studi-case-data-dummy.png)

### Membuat Method Relationship Dapat Diakses Melalui Web

Sekarang kita buat agar method relationship Has One of Many yang lebih kompleks tersebut agar dapat berjalan di web sehingga kita bisa liat RAW Query SQL yang berjalan seperti apa menggnunakan clockwork. Untuk melakukannya kita bisa buat sebuah method dengan nama `advancedHasOneOfMany` di file controller `RelationController`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    ...

    public function advancedHasOneOfMany(Request $request)
    {
        $price = Product::find($request->id)->currentPricing;
        return $price;
    }
}
```

Setelah method di controller nya dibuat, sekarang kita buat route baru untuk menangani method tersebut. Kita bisa buat route nya di file `routes\web.php`

```php
Route::get('/relation/advancedHasOneOfMany', [RelationController::class, 'advancedHasOneOfMany']);
```

Sekarang kita bisa akses route tersebut dengan endpoint `/relation/advancedHasOneOfMany` dengan mengirimkan request data `id` product di URL nya untuk menjalankan relationship yang sudah kita buat.

![Advanced Has One of Many Via Web](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-advanced-has-one-of-many/advanced-has-one-of-many-via-web.png)
