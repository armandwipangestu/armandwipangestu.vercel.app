---
published: true
title: "PHP JS - Select Option Form Input"
tag: "Programming"
date: "January 24 2023"
excerpt: "Pada artikel ini kita akan menggabungkan PHP dan JS untuk menangani select option pada form input"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Kode dibagian PHP

Di bagian kode ini kita akan membuat variabel dengan tipe data array of object untuk menampung data merk mobil sekaligus harganya

```php
<?php

$cars = [
    (object) [
        "brand" => "Porcshe",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Mazda RX 8",
        "price" => "3000000000"
    ],
    (object) [
        "brand" => "Alphard",
        "price" => "100000000"
    ],
    (object) [
        "brand" => "Lamborgini",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Carera GT",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Cobalt",
        "price" => "500000000"
    ],
];

?>
```

## Kode dibagian HTML

Pada bagian ini kita akan membuat form input dengan tag tabel untuk memunculkan data dari variable `cars` dan melakukan looping di bagian option
dengan tambahan attribute `value` yang menampung nama merk dan attribute `data-price` yang menampung harga mobil

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PHP - JS</title>
  </head>
  <body>
    <section id="form">
      <form method="post" action="">
        <table>
          <tr>
            <th>Brand</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>
              <select name="brand" onchange="getDataPrice()" id="selection">
                <?php foreach($cars as $car): ?>
                <option
                  value="<?= $car->brand ?>"
                  data-price="<?= $car->price ?>"
                  name="brand"
                >
                  <?= $car->brand ?>
                </option>
                <?php endforeach; ?>
              </select>
            </td>
            <td>
              <input
                id="input-price"
                placeholder="price"
                value="<?= $cars[0]->price ?>"
                name="price"
              />
            </td>
          </tr>
        </table>
        <button type="submit" name="preview">Submit</button>
      </form>
    </section>
  </body>
</html>
```

## Kode dibagian javascript

Di kode javascript ini kita akan membuat function dengan nama `getDataPrice` yang berfungsi untuk mendapatkan attribute `data-price` ketika
option yang dipilih berubah sehingga kita bisa melakukan DOM `(Document Object Model)` untuk input form `price` sesuai dengan merk mobil yang dipilih

```javascript
const getDataPrice = () => {
  const selectElement = document.querySelector("#selection");
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const priceAttribute = selectedOption.getAttribute("data-price");

  const inputPriceElement = document.querySelector("#input-price");
  inputPriceElement.setAttribute("value", priceAttribute);
};
```

## Kode tambahan untuk PHP

Kode berikut berfungsi untuk menangkap trigger dari button `submit` ketika di click dan melakukan debugging atas data yang dikirim dari form tersebut

```php
if (isset($_POST["preview"])) {
    $data = $_POST;
    $brand = $data["brand"];
    $price = $data["price"];
    echo "brand : $brand";
    echo "<br />";
    echo "price : $price";
    die;
}
```

## Hasil kode diatas

```php
<?php

$cars = [
    (object) [
        "brand" => "Porcshe",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Mazda RX 8",
        "price" => "3000000000"
    ],
    (object) [
        "brand" => "Alphard",
        "price" => "100000000"
    ],
    (object) [
        "brand" => "Lamborgini",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Carera GT",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Cobalt",
        "price" => "500000000"
    ],
];

if (isset($_POST["preview"])) {
    $data = $_POST;
    $brand = $data["brand"];
    $price = $data["price"];
    echo "brand : $brand";
    echo "<br />";
    echo "price : $price";
    die;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP - JS</title>
</head>
<body>
    <section id="form">
        <form method="post" action="">
            <table>
                <tr>
                    <th>Brand</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>
                        <select name="brand" onchange="getDataPrice()" id="selection">
                            <?php foreach($cars as $car): ?>
                                <option value="<?= $car->brand ?>" data-price="<?= $car->price ?>" name="brand"><?= $car->brand ?></option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                    <td>
                        <input id="input-price" placeholder="price" value="<?= $cars[0]->price ?>" name="price" />
                    </td>
                </tr>
            </table>
            <button type="submit" name="preview">
                Submit
            </button>
        </form>
    </section>

    <script>
        const getDataPrice = () => {
            const selectElement = document.querySelector("#selection")
            const selectedOption = selectElement.options[selectElement.selectedIndex]
            const priceAttribute = selectedOption.getAttribute("data-price")

            const inputPriceElement = document.querySelector("#input-price")
            inputPriceElement.setAttribute("value", priceAttribute)
        }
    </script>
</body>
</html>
```

## Breakdown Code

Pada bagian ini kita akan melakukan breakdown code sehingga semakin jelas setiap syntax kode diatas

### Variable Cars

Seperti yang dijelaskan sebelumnya kode berikut adalah untuk menampung data merk mobil sekaligus harganya dengan tipe data array of object

```php
$cars = [
    (object) [
        "brand" => "Porcshe",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Mazda RX 8",
        "price" => "3000000000"
    ],
    (object) [
        "brand" => "Alphard",
        "price" => "100000000"
    ],
    (object) [
        "brand" => "Lamborgini",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Carera GT",
        "price" => "5000000000"
    ],
    (object) [
        "brand" => "Cobalt",
        "price" => "500000000"
    ],
];
```

### Form, select, option, button

#### Form

Pada kode attribute berikut `method="post"` berfungsi untuk mengirim data dengan method post yang dimana method post ini biasanya digunakan untuk
menyimpan data dan attribute `action=""` berfungsi untuk mengirimkan data ke halaman yang sama apabila action tersebut empty atau kosong, attribute
tersebut dapat diisi dengan path file yang di inginkan apabila data yang dikirim diluar page atau file itu sendiri contohnya `action="post/index.php"`

```html
<form method="post" action=""></form>
```

#### Select

Attribute `name="brand"` befungsi untuk mengirimkan data sesuai option yang dipilih, attribute `onchange="getDataPrice()"` berfungsi untuk mentrigger
ketika option berganti sehingga setiap option berubah maka akan memanggil function `getDataPrice()` dan attribute `id="selection"` berfungsi untuk
`querySelector` pada javascript sehingga kita dapat mendapatkan tag dengan spesifik id dengan nama `selection`

```html
<select name="brand" onchange="getDataPrice()" id="selection"></select>
```

#### Option

Pada bagian ini variable `cars` di lakukan looping menggunakan function `foreach`. Attribute `data-price` berfungsi untuk mendapatkan data `price`
yang dimana nantinya akan dilakukan DOM menggunakan javascript ke input form price sesuai dengan option yang dipilih

```php
<?php foreach($cars as $car): ?>
    <option value="<?= $car->brand ?>" data-price="<?= $car->price ?>" name="brand"><?= $car->brand ?></option>
<?php endforeach; ?>
```
