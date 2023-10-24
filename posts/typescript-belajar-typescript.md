---
title: "TypeScript - Belajar TypeScript"
tag: "Programming"
date: "October 16 2023"
excerpt: "Pada artikel kali ini, saya akan membahas mengenai typescript"
cover_image: "/images/posts/TypeScript - Belajar TypeScript.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Apa itu sih TypeScript? TypeScript adalah bahasa pemrograman berorientasi objek yang dibuat oleh Microsoft, TypeScript juga adalah bahasa pemrograman yang di kompilasi menjadi kode JavaScript. Oleh karena itu untuk kalian yang ingin belajar TypeScript, sangat disarankan untuk mempelajari JavaScript terlebih dahulu, kenapa? karena nantinya ketika kita membuat program menggunakan TypeScript, pada akhirnya kode tersebut akan di kompilasi atau di ubah menjadi JavaScript.

Mengapa menggunakan TypeScript? dengan menggunakan TypeScript akan membuat kode kita lebih mudah dibaca dan di debug dibandingkan menggunakan JavaScript, kenapa? karena TypeScript adalah static language atau Strongly Type (Seperti bahasa pemrograman Java, C# dan C atau C++).

Untuk detail lebih lanjut nya kalian bisa mengunjungi website resmi nya disini [www.typescriptlang.org](https://www.typescriptlang.org).

## Proses Development Bahasa TypeScript

![Proses Development TypeScript](/images/posts/assets/belajar_typescript/proses_development_typescript.png)

- Pada tahap pertama, kita akan membuat kode program menggunakan bahasa pemrograman TypeScript.
- Setelah kode program yang kita buat tersebut, nantinya akan dilakukan kompilasi menggunakan `TypeScript Compiler`.
- Setelah kode program TypeScript berhasil di compile, maka hasil akhirnya adalah sebuah JavaScript Code.

Sehingga kesimpulannya adalah, pada dasarnya kita membuat kode program JavaScript, namun kita membuatnya melalui TypeScript namun nantinya di compile oleh `TypeScript Compiler` untuk dirubah kedalam kode JavaScript.

Pertanyaannya, mengapa kita tidak langsung saja menggunakan JavaScript? dengan menggunakan TypeScript, banyak keuntungan yang kita dapat, berikut adalah beberapa keuntungannya.

## Keuntungan Belajar TypeScript

- Saat ini banyak sekali perusahaan yang mulai mengadopsi atau menggunakan TypeScript, hal tersebut karena banyaknya fitur yang dimiliki oleh TypeScript itu sendiri yang memudahkan saat proses pemrograman aplikasi.
- Karena TypeScript melakukan kompilasi kode menjadi JavaScript, hal ini secara otomatis kita tidak perlu lagi pusing dengan fitur-fitur di JavaScript yang belum di support, karena TypeScript lah yang secara otomatis akan mengurusnya.
- Selain itu, banyak juga framework-framework yang populer sekarang mulai beralih menggunakan TypeScript, seperti ReactJS, VueJS, NestJS dan lainnya.

## Membuat Project NodeJS

Sebelum memulainya, disini kita akan membuat project terlebih dahulu. Untuk membuatnya disini caranya cukup sama dengan membuat project NodeJS pada umumnya.

- **Langkah Pertama**: Buat sebuah folder, misalkan dengan nama `belajar-typescript`

```shell
mkdir belajar-typescript && cd belajar-typescript
```

- **Langkah Kedua**: Inisiasi NPM pada folder tersebut

```shell
npm init
```

> **Catatan**: Apabila terdapat prompt untuk mengisikan beberapa informasi, kalian bisa sesuaikan dengan konfigurasi yang saya buat seperti berikut ini
>
> ```shell
> package name: (belajar-typescript)
> version: (1.0.0)
> description: Belajar TypeScript Dasar
> entry point: (index.js)
> test command:
> git repository:
> keywords:
> author: Arman Dwi Pangestu
> license: (ISC)
> ```

- **Langkah Ketiga**: Buka file `package.json` dan tambahkan `type module`

Default yang akan digunakan adalah CommonJS, oleh karena itu kita perlu mengubah nya menjadi ES Modules

```json
{
  "name": "belajar-typescript",
  ...
  "license": "ISC",
  "type": "module"
}
```

- **Langkah Keempat**: Menambahkan Library `Jest` untuk Unit Test

Untuk melakukannya cukup jalankan perintah berikut ini:

```shell
npm install --save-dev jest @types/jest
```

Apabila kalian ingin mengetahui informasi lebih dari package Jest tersebut, kalian bisa lihat disini [www.npmjs.com/package/jest](https://www.npmjs.com/package/jest)

- **Langkah Kelima**: Menambahkan Library `Babel`, library ini berfungsi agar package `Jest` tersebut support ES Modules

Untuk menambahkannya jalankan perintah berikut ini:

```shell
npm install --save-dev babel-jest @babel/preset-env
```

Untuk melihat detail lebih lengkapnya kalian bisa kunjungi situs berikut ini [babeljs.io/setup#installation](https://babeljs.io/setup#installation)

Setelah library babel terinstall, tambahkan konfigurasi berikut ini pada file `package.json`

```json
{
  ...
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  },
  ...
}
```

Selanjutnya buat file baru dengan nama `babel.config.json` pada root folder.

```shell
touch babel.config.json
```

Setelah itu isikan dengan konfigurasi seperti berikut

```json
{
  "presets": ["@babel/preset-env"]
}
```

## Membuat Project TypeScript

Setelah sebelumnya melakukan setup project NodeJS nya, selanjutnya kita perlu mengubah project tesebut menjadi project TypeScript

- **Langkah Pertama**: Menambahkan TypeScript

Untuk menambahkannya jalankan perintah berikut ini:

```shell
npm install --save-dev typescript
```

Mengapa kita menginstall TypeScript nya pada development? karena pada akhirnya dia akan di compile menjadi JavaScript, sehingga nantinya ketika program dijalankan kita tidak butuh lagi kode dari TypeScript nya. Untuk informasi lebih lanjut mengenai package typescript tersebut kalian bisa baca disini [www.npmjs.com/package/typescript](https://www.npmjs.com/package/typescript).

- **Langkah Kedua**: Setup TypeScript Project

Untuk melakukan setup project TypeScript jalankan perintah berikut ini:

```shell
npx tsc --init
```

Nantinya semua konfigurasi akan dibuat di file `tsconfig.json`. Kemudian ubah konfigurasi dari `"module": "commonjs"` menjadi `"module": "es6"`

```json
{
  "compilerOptions": {
    ...
    "module": "ES6",
    ...
  }
}
```

- **Langkah Ketiga**: Setup TypeScript untuk Jest

Default dari Jest digunakan untuk Unit Test JavaScript, namun kita juga ingin menggunakan Jest tapi untuk TypeScript. Nah untuk melakukan setup nya kalian bisa baca lebih lanjut pada website resmi nya disini [jestjs.io/docs/getting-started#using-typescript](https://jestjs.io/docs/getting-started#using-typescript).

Untuk melakukannya jalankan perintah berikut ini:

```shell
npm install --save-dev @babel/preset-typescript
```

Kemudian tambahkan konfigurasi berikut pada file `babel.config.json`

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

Selanjutnya install dependency `ts-jest` menggunakan perintah berikut ini:

```shell
npm install --save-dev ts-jest
```

Setelah itu install dependency `jest/globals` dengan perintah berikut ini:

```shell
npm install --save-dev @jest/globals
```

Pada tahap ini kita sudah selesai melakukan setup project untuk Unit Test menggunakan `Jest` dan juga setup project `TypeScript` nya. Untuk melakukan test apakah sudah dapat berjalan atau tidak, kalian bisa membuat folder baru dengan nama `tests` pada root folder. Folder `tests` disini nantinya akan kita gunakan untuk menyimpan setiap file unit test yang akan dibuat.

```shell
mkdir tests
```

Kemudian buat file dengan nama `hello.test.ts`

```shell
touch tests/hello.test.ts
```

Setelah itu isikan file tersebut dengan kode program berikut ini:

```ts
describe("Hello", function () {
  it("Should say hello", function () {
    const name = "Hello Arman";

    expect(name).toBe("Hello Arman");
  });
});
```

Kemudian jalankan unit test `Jest` menggunakan perintah:

```shell
npx jest
```

Maka hasilnya akan seperti berikut:

```shell
 PASS  tests/hello.test.ts
  Hello
    ✓ Should say hello (5 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.389 s
Ran all test suites.
```

## Say Hello Function

Sebelum mulai belajar, kita akan coba buat terlebih dahulu sebuah function untuk menampilkan text hello dengan file TypeScript. Untuk melakukannya kalian bisa buat folder baru terlebih dahulu dengan nama `src` pada root folder nya. Folder `src` disini nantinya akan kita gunakan untuk menyimpan setiap file kode program TypeScript nya.

```shell
mkdir src
```

Kemudian buat file baru dengan nama `say-hello.ts`

```shell
touch src/say-hello.ts
```

Setelah file tersebut dibuat, isikan dengan kode program berikut ini:

```ts
export function sayHello(name: String): String {
  return `Hello ${name}`;
}
```

Selanjutnya buatkan sebuah file baru untuk unit test nya di folder `tests` dengan nama file nya adalah `say-hello.test.ts`

```shell
touch tests/say-hello.test.ts
```

Isikan file unit test tersebut dengan kode berikut ini:

> **Catatan**: Perhatikan pada bagian `import`, dapat kalian lihat disini kita tidak perlu memanggil full nama file nya seperti nama extension nya, nah untuk extension tersebut adalah optional, sehingga disini kita tidak perlu lagi memanggil extension nya.
>
> Kenapa? karena nantinya kan akan di compile menjadi kode JavaScript, sehingga apabila kita lakukan hardcode dengan nama extension nya (misalkan `.ts`), maka nantinya otomatis tidak akan dapat berjalan.

```ts
import { sayHello } from "../src/say-hello";

describe("sayHello", function (): void {
  it("should return hello arman", function (): void {
    expect(sayHello("arman")).toBe("Hello arman");
  });
});
```

Selanjutnya lakukan unit test nya menggunakan perintah:

```shell
npm test
```

Maka output nya akan seperti berikut ini:

```shell
 PASS  tests/say-hello.test.ts
 PASS  tests/hello.test.ts

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        3.737 s
Ran all test suites.
```

## Kompilasi TypeScript

- Seperti yang dijelaskan di awal, bahwa kode TypeScript tidak bisa langsung dijalankan, kita harus melakukan kompilasi terlebih dahulu agar kode nya menjadi JavaScript.
- Untuk melakukan kompilasi nya, kita bisa gunakan perintah: `npx tsc`
- Secara default, semua file hasil kompilasi akan disimpan di lokasi yang sama dengan file TypeScript.
- Namun, terkadang kebanyakan programmer TypeScript biasanya memisahkan lokasi hasil file kompilasi nya ke sebuah folder terpisah, misalkan `dist` (distribution). Mengapa dipisah? fungsi nya agar hasil kode kompilasi atau javascript nya tidak di commit didalam git repository nya.
- Untuk mengubah lokasi file hasil kompilasi, kita perlu ubah di file `tsconfig.json`.

### Mengubah Lokasi Hasil Kompilasi

Nah untuk mengubah lokasi hasil kompilasi nya, kalian cukup ubah konfigurasi berikut pada file `tsconfig.json`

```json
{
  "compilerOptions": {
    ...
    "outDir": "dist/"
    ...
  }
}
```

Untuk mencoba apakah hasil kompilasi TypeScript nya sudah berpindah ke dalam folder `dist/`, kalian bisa jalankan perintah berikut ini:

```shell
npx tsc
```

Maka sekarang dapat kalian lihat pada root folder nya terdapat folder dengan nama `dist/` dan berisi kode JavaScript yang sudah di compile nya.

```
dist
├── src
│  └── say-hello.js
└── tests
   ├── hello.test.js
   └── say-hello.test.js
```

### Include dan Exclude

Secara default, semua file `.ts` akan coba dikompilasi oleh TypeScript, namun terkadang kita tidak membutuhkan hal tersebut. Misalkan kita hanya ingin melakukan kompilasi untuk kode program dan tidak butuh melakukan kompilasi untuk kode unit testing nya. Nah, dengan menggunakan konfigurasi include dan exlucde ini, kita bisa custom pada file `tsconfig.json` nya, agar kode yang akan di kompilasi spesifik yang ingin kita mau.

Untuk lebih detail nya kalian bisa baca pada website berikut ini:

- [www.typescriptlang.org/tsconfig#include](https://www.typescriptlang.org/tsconfig#include)
- [www.typescriptlang.org/tsconfig#exclude](https://www.typescriptlang.org/tsconfig#exclude)

Misalkan disini saya ingin menambahkan konfigurasi berikut pada file `tsconfig.json` nya:

```json
{
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["src/**/*.test.ts", "tests/**/*.test.ts"],
  "compilerOptions": {
    ...
  }
}
```

Pada konfigurasi di atas artinya adalah:

- Kita akan melakukan compile pada semua file yang ada di folder `src/` dan `tests/`
- Namun kita juga akan melakukan exclude (pengecualian) pada semua file dengan extension `test.ts` yang ada di folder `src/` dan `tests/` agar tidak di compile.

Untuk melihat perubahan nya, kalian bisa hapus terlebih dahulu folder `dist/` nya dengan perintah berikut ini:

```shell
rm -rf dist/
```

Setelah folder `dist/` terhapus, sekarang jalankan kembali perintah berikut:

```shell
npx tsc
```

Maka sekarang hasil dari folder `dist/` menjadi seperti berikut ini:

```
dist
└── say-hello.js
```

dapat kalian lihat, file yang di compile hanya yang berada di folder `src/` nya saja, tidak dengan file yang berada di folder `tests/`. Namun karena kita saat ini masih dalam proses belajar, alangkah baiknya compile semuanya terlebih dahulu (termasuk file unit testing nya). Sehingga cukup tambahkan comment pada konfigurasi file `tsconfig.json` nya menjadi seperti berikut ini:

```json
{
  "include": ["src/**/*", "tests/**/*"],
  //"exclude": ["src/**/*.test.ts", "tests/**/*.test.ts"],
  "compilerOptions": {
    ...
  }
}
```

Kemudian jalankan kembali perintah berikut:

```shell
npx tsc
```

## Tipe Data Primitif

TypeScript sebetulnya menggunakan tipe data yang ada di JavaScript, sehingga semua tipe data seperti `string`, `number`, `boolean` otomatis didukung juga oleh TypeScript.

### Daftar Tipe Data Primitif

Berikut adalah daftar tipe data primitif yang ada didalam TypeScript:

| Tipe Data Primitif | Keterangan            |
| ------------------ | --------------------- |
| number             | Number di JavaScript  |
| boolean            | Boolean di JavaScript |
| string             | String di JavaScript  |

Jika dilihat dari keterangan nya, lantas apa bedanya dengan yang ada di JavaScript? bedanya adalah tipe data ini harus di define atau di deklarasikan ketika kita menggunakan TypeScript, sedangkan jika kita menggunakan JavaScript kita bebas membuat parameter atau attribute dengan tipe data apapun dan juga bebas di ubah-ubah. Nah, jika di TypeScript, saat kita sudah tentukan satu tipe data maka kita tidak bisa kita ubah dengan tipe data yang lainnya.

### Deklarasi Variabel

Karena TypeScript adalah Strongly Type Language, oleh karena itu saat kita membuat variabel, kita harus menentukan tipe data variabel nya dan jika kita sudah menentukan tipe datanya, kita tidak boleh mengubah variabel tersebut menjadi tipe data yang berbeda atau yang lainnya. TypeScript secara otomatis mendeteksi tipe data yang sedang digunakan, tetapi kita juga bisa menentukan secara eksplisit menggunakan perintah:

> **Catatan**: Jika kita tidak tentukan secara explicit tipe data nya, maka TypeScript akan otomatis mendeteksi berdasarkan tipe data dari value nya, misalkan jika value nya adalah sebuah string, maka tipe data nya otomatis string, namun jika value nya number maka tipe data nya adalah number.

```ts
const namaVariabel: tipedata = value;
const namaFunction = function(parameter: tipedata): tipedata {
  return ...
}
```

### Kode Tipe Data Primitif

Misalkan disini saya mempunyai kode seperti berikut pada file `tests/tipe-data.test.ts`:

```ts
describe("Data Type", function () {
  it("should must declare", function () {
    let name: string = "Arman Dwi Pangestu";
    let balance: number = 999999;
    let isVip: boolean = true;

    console.info(name);
    console.info(balance);
    console.info(isVip);
  });
});
```

Nah jika kita ubah misalkan menjadi seperti berikut:

```ts
describe("Data Type", function () {
  it("should must declare", function () {
    let name: string = "Arman Dwi Pangestu";
    name = 123;
    let balance: number = 999999;
    let isVip: boolean = true;

    console.info(name);
    console.info(balance);
    console.info(isVip);
  });
});
```

Kemudian melakukan compile dengan perintah berikut:

```shell
npx tsc
```

Maka akan muncul error seperti berikut ini:

```ts
tests/tipe-data.test.ts:4:5 - error TS2322: Type 'number' is not assignable to type 'string'.

4     name = 123;
      ~~~~


Found 1 error in tests/tipe-data.test.ts:4
```

Artinya, tipe data number pada baris ke 4 tidak bisa diterapkan kedalam tipe data string, karena sudah kita tentukan bahwa variabel `name` tipe datanya adalah string. Kita ubah kembali kode program nya menjadi seperti berikut ini:

```ts
describe("Data Type", function () {
  it("should must declare", function () {
    const name: string = "Arman Dwi Pangestu";
    const balance: number = 999999;
    const isVip: boolean = true;

    console.info(name);
    console.info(balance);
    console.info(isVip);
  });
});
```

Kemudian jalankan unit test nya menggunakan perintah berikut:

```shell
npm test
```

Maka hasilnya akan sukses seperti berikut:

```ts
 PASS  tests/tipe-data.test.ts
  ● Console

    console.info
      Arman Dwi Pangestu

      at Object.info (tests/tipe-data.test.ts:7:13)

    console.info
      999999

      at Object.info (tests/tipe-data.test.ts:8:13)

    console.info
      true

      at Object.info (tests/tipe-data.test.ts:9:13)
```

Selanjutnya kita compile kode typescript nya menggunakan perintah berikut:

```shell
npx tsc
```

Dapat kalian lihat pada hasil compile kedalam JavaScript di file `dist/tests/tipe-data.test.js`, bahwa informasi mengenai tipe data tersebut menjadi hilang, karena pada JavaScript tidak ada mengenai deklarasi tipe data. Oleh karena itu, kita bisa menggunakan TypeScript untuk menjaga nya bahwa yang awalnya string, ya sudah string saja (tidak dapat diubah).

```js
"use strict";
describe("Data Type", function () {
  it("should must declare", function () {
    const name = "Arman Dwi Pangestu";
    const balance = 999999;
    const isVip = true;

    console.info(name);
    console.info(balance);
    console.info(isVip);
  });
});
```

## Babel TypeScript

Untuk menjalankan unit test, kita mengggunakan Jest dan Babel, banyak programmer TypeScript yang mengeluh ketika proses development menggunakan TypeScript lebih lambat karena harus melakukan kompilasi terlebih dahulu. Oleh karena itu, `@babel/typescript` melakukan cara kompilasi nya dengan cara menghapus seluruh kode TypeScript dan menjadikan kode JavaScript, hal tersebut memang terdengan lucu bukan? tapi itulah kenyataannya.

Oleh karena itu, error pada TypeScript yang sering harusnya terjadi di Unit Test terkadang tidak terjadi karena kode TypeScript nya dihapus oleh Babel. Maka dari itu, kita harus secara reguler melakukan pengecekan menggunakan perintah `npx tsc` untuk memastikan tidak ada kode TypeScript kita yang bermasalah.

### Kode Error TypeScript

Misalkan disini saya mempunyai kode seperti berikut ini:

```ts
describe("Data Type", function () {
  it("should must declare", function () {
    let name: string = "Arman Dwi Pangestu";
    let balance: number = 999999;
    let isVip: boolean = true;

    console.info(name);
    console.info(balance);
    console.info(isVip);

    name = 1; // error
    balance = "999999"; // error
    isVip = 1; // error
  });
});
```

Saat kalian mencoba melakukan compile kode program diatas menggunakan perintah `npx tsc`, maka akan muncul error, namun ketika kalian mencoba menjalankan unit test nya menggunakan perintah `npm test`, maka hasilnya akan success. Kenapa? karena kode TypeScript tersebut semuanya akan di hapus menjadi kode JavaScript. Yang dimana kode tersebut jika dalam bahasa JavaScript akan tetap valid, karena dalam JavaScript variabel apapun menggunakan tipe data apapun.

Dapat kita simpulkan, ketika kita membuat kode TypeScript, pastikan jangan hanya melakukan pengecekan menggunakan `Jest` atau `Babel` nya saja, pastikan juga dengan kompilasi dan pastikan juga tidak ada yang error.

### TypeScript Compiler

Sebetulnya terdapat cara yang lebih mudah apabila kalian ingin melakukan pengecekan secara regular untuk kompilasi, kalian bisa menjalankan TypeScript Compiler secara terus menerus dengan perintah:

```shell
npx tsc --watch
```

Perintah diatas akan mengecek setiap perubahan pada program kita, apabila terdapat perubahan maka dia akan langsung di compile, sehingga akan langsung diketahui jika terdapat error.

## Tipe Data Array

Tipe data Array pada TypeScript itu sama juga dengan yang ada di JavaScript, dari mulai cara pembuatannya dan juga cara penggunaannya. Di TypeScript tipe data Array bisa menggunakan tanda `TipeData[]` atau `Array<TipeData>`.

### Kode Tipe Data Array

Misalkan disini kita mempunyai sebuah variable `names` array yang isinya adalah string dan variable `values` array yang isinya number. Kalian bisa buat file unit test nya dengan nama `array.test.ts`

```ts
describe("Array", function () {
  it("should same with javascript", function () {
    const names: string[] = ["Arman", "Dwi", "Pangestu"];
    const values: number[] = [1, 2, 3];

    console.info(names);
    console.info(values);
  });
});
```

## Read Only Array

Pada TypeScript, kita bisa membuat sebuah Array dengan tipe readonly atau tidak bisa diubah lagi dengan menggunakan tipe data `ReadonlyArray<TipeData>`. Sehingga jika kalian mempunyai kode program, kemudian kalian mencoba mengubah value dari array dengan readonly, maka akan di reject. Namun, sebetulnya jika kode program nya sudah di ubah menjadi JavaScript, value nya tetap bisa diubah. Sehingga yang menjaga agar value nya tidak bisa diubah si TypeScript compiler nya.

### Kode Read Only Array

```ts
describe("Array", function () {
  it("should same with javascript", function () {
    ...
  })

  it("should support readonly array", function() {
    const hobbies: ReadonlyArray<string> = ["Membaca", "Menulis"];
    console.info(hobbies);

    hobbies[0] = "Bermain Game";
  })
})
```

Nah pada kode program yang mengubah value index ke-0 dari array `hobbies` menjadi `Bermain Game`, itu akan muncul error `Index signature in type 'readonly string[]' only permits reading.`

## Tipe Data Tuple

Apa itu tipe data Tuple? tuple adalah tipe data Array, namun panjang array dan juga tipe data pada setiap index nya sudah ditentukan. Pada tipe data Tuple ini, kita juga bisa memberikan sifat readonly atau tidak bisa diubah dengan cara menambahkan keyword atau kata kunci `readonly`.

### Kode Tipe Data Tuple

```ts
describe("Array", function () {
  it("should same with javascript", function () {
    ...
  })

  it("should support readonly array", function() {
    ...
  })

  it("should support tupple", function () {
    const person: readonly [string, string, number] = ["Arman", "Dwi", 21];

    console.info(person[0]);
    console.info(person[1]);
    console.info(person[2]);
  });
})
```

Jika kalian mencoba mengubah value dari variable tuple readonly tersebut seperti berikut misalkan:

```ts
...
  ...
    person[0] = "Something";
  ...
...
```

Maka akan muncul error `Cannot assign to '0' because it is a read-only property.`.

Sehingga dapat kita simpulkan bahwa implementasi tipe data array sebetulnya tetap sama dengan di JavaScript, namun terdapat fitur tambahan pada TypeScript yang mempermudah kita. Dari mulai membuat array biasa, array readonly, sampai dengan tuple (array yang jumlah nya sudah ditentukan dan isi tipe data nya sudah ditentukan juga).

## Tipe Data Any

Saat kita menggunakan TypeScript, setiap jenis data idealnya harus di deklarasikan tipe datanya. Contoh ketika kita ingin menggunakan tipe data JavaScript Object, idealnya harusnya ada ketentuan attribute yang dimilikinya, sedangkan di JavaScript hal itu tidak diwajibkan. Pada kasus kita memang ingin membuat tipe data yang bebas seperti di JavaScript, nah pada TypeScript kita bisa gunakan tipe data `Any`. Tipe data ini menjadikan TypeScript tidak melakukan pengecekan apapun terhadap akses data tersebut.

Walaupun tipe data ini ada, sebaiknya kalian jangan terlalu banyak menggunakan tipe data ini. Kenapa? karena jika kalian terlalu banyak menggunakan tipe data ini, lantas apa bedanya dengan kalian menggunakan JavaScript bukan?

Sehingga penggunaan tipe data ini lebih kedalam kondisi urgent atau mendesak yang dimana kita membutuhkan sebuah tipe data dinamis.

### Kode Tipe Data Any

Buat file unit test baru dengan nama file `any.test.ts`, kemudian isikan file tersebut dengan kode berikut ini:

```ts
describe("Any", function () {
  it("should support in typescript", function () {
    const person: any = {
      id: 1,
      name: "Arman Dwi Pangestu",
      age: 21,
    };

    person.age = 22;
    person.address = "Indonesia";

    console.info(person);
  });
});
```

## Tipe Data Union Type

Seperti yang kita ketahui, JavaScript sebetulnya bisa menyimpan berbagai jenis tipe data di variabel yang sama. Namun, di TypeScript hal itu dilarang karena praktek yang buruk. Pada kasus jika kita ingin membuat variabel yang bisa berubah bentuk tipe data, kita bisa memberi tahunya menggunakan `Union Type`. Maka secara otomatis TypeScript akan membolehkan kita mengubah tipe data nya, namun sesuai yang sudah ditentukan di union type nya.

### Kode Tipe Data Union Type

Kalian bisa buat file unit test baru dengan nama `union.test.ts` kemudian isikan dengan kode berikut ini:

```ts
describe("Union Type", function () {
  it("should support in typescript", function () {
    let sample: number | string | boolean = "Arman";
    console.info(sample);

    sample = 100;
    console.info(sample);

    sample = true;
    console.info(sample);
  });
});
```

Nah jika kalian mencoba mengubah value dari variable sample diatas menjadi sebuah array, misalkan seperti berikut ini:

```ts
describe("Union Type", function () {
  it("should support in typescript", function () {
    let sample: number | string | boolean = "Arman";
    ...

    sample = [];
  });
});
```

Maka akan muncul error `Type 'never[]' is not assignable to type 'string | number | boolean'.`.

### Menggunakan Union Type

Saat kita membuat union type, kita perlu berhati-hati ketika memanggil method terhadap variable tersebut. Hal ini karena tipe datanya bisa berubah, oleh karena itu ada baiknya kita melakukan pengecekan tipe data terlebih dahulu menggunakan keyword atau kata kunci `typeof`.

### Kode Menggunakan Union Type

Misalkan disini kita mempunyai sebuah method dengan nama `process`, yang dimana method tersebut mempunyai sebuah parameter dengan nama `value` dan parameter tersebut memperbolehkan tipe data `number`, `string` dan `boolean`. Maka kita bisa gunakan operator `typeof` untuk mengecek tipe data nya.

> **Catatan**: Penggunaan union type ini berfungsi untuk mencegah error, misalkan jika tipe data nya string, maka dia akan mempunyai object method bawaan seperti `toUpperCase()`, nah jika kita tidak menggunakan union type dan yang di kirim adalah sebuah number atau boolean, maka akan error atau undefined, karena tipe data tersebut tidak mempunyai object method bawaan `toUpperCase()` nya. Dan sebaliknya jika tipe data nya adalah number maka mempunyai object method bawaan seperti `toString()` dsb.

```ts
describe("Union Type", function () {
  it("should support in typescript", function () {
    ...
  });

  it("should support typeof operator", function () {
    function process(value: number | string | boolean) {
      if (typeof value === "string") {
        return value.toUpperCase();
      } else if (typeof value === "number") {
        return value + 2;
      } else {
        return !value;
      }
    }

    expect(process("Arman")).toBe("ARMAN");
    expect(process(98)).toBe(100);
    expect(process(true)).toBe(false);
  });
});
```

## Tipe Data Type Alias

Ketika menggunakan tipe data Any, sebenarnya hal tersebut tidak direkomendasikan. Biasanya kita akan menggunakan tipe data Any, jika memang data yang akan kita gunakan misal dari library orang lain yang sudah tidak bisa diubah atau memang ketika attribute nya tidak pasti datanya. Contoh nya ketika memanggil data dari sebuah function tetapi return value nya bisa berubah-ubah isi datanya, maka mungkin tipe data Any bisa kita gunakan. Nah, namun pada kasus jika kita membuat tipe data JavaScript object sendiri, yang dimana kita bisa mengontrol isi dari attribute nya terdapat apa saja, maka kita bisa membuat alias untuk struktur tipe data objectnya.

### Kode Alias

Kalian bisa buat file src baru dengan nama file `type-alias.ts`, kemudian isikan dengan kode berikut:

```ts
export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
};
```

Sehingga nantinya ketika kita mempunyai sebuah object yang struktur nya seperti type diatas, kita bisa gunakan tipe data nya tersebut atau bisa dibilang seperti blueprint atau kerangka nya.

### Kode Test Alias

Setelah kita membuat kerangka object nya menggunakan type alias, selanjutnya kalian bisa buat file unit test baru dengan nama `type-alias.test.ts` kemudian isikan kode nya seperti berikut ini:

```ts
import { Category, Product } from "../src/type-alias";

describe("Type Alias", function () {
  it("should support in typescript", function () {
    const category: Category = {
      id: "1",
      name: "Laptop",
    };

    const product: Product = {
      id: "1",
      name: "MacBook Pro M1",
      price: 2000000,
      category: category,
    };

    console.info(category);
    console.info(product);
  });
});
```

Nah sebetulnya ketika kode program diatas di compile kedalam JavaScript, maka kode tersebut akan berubah menjadi object biasa di JavaScript, namun kita tidak bisa menambahkan data baru se-enaknya yang tidak di definisikan didalam type alias tersebut, sehingga bisa dibilang lebih safety karena sudah kita buatkan struktur yang harus ada itu apa saja.

Jika kalian mencoba memaksa menambahkan data baru seperti berikut:

```ts
import { Category, Product } from "../src/type-alias";

describe("Type Alias", function () {
  ...
    ...

    const product: Product = {
      id: "1",
      name: "MacBook Pro M1",
      price: 2000000,
      category: category,
    };

    product.description = "Test";

    ...
  ...
});
```

Maka akan muncul error `Property 'description' does not exist on type 'Product'.`

## Type Alias untuk Union Type

Type Alias juga bisa kita gunakan untuk membuat union type jika kalian menginginkannya. Caranya bagaimana? caranya kalian bisa gunakan seperti berikut di file `type-alias.ts`:

> **Catatan**: Disini artinya attribute `id` bisa memiliki 2 tipe data, yaitu `string` atau `number`.

```ts
export type ID = string | number;

export type Category = {
  id: ID;
  name: string;
};

export type Product = {
  id: ID;
  name: string;
  price: number;
  category: Category;
};
```

Untuk mencoba nya, kalian bisa ubah tipe data pada file `type-alias.test.ts` menjadi seperti berikut:

> **Catatan**: Perhatikan pada attribute `id` nya.

```ts
import { Category, Product } from "../src/type-alias";

describe("Type Alias", function () {
  ...
    const category: Category = {
      id: 1,
      ...
    };

    const product: Product = {
      id: "1",
      ...
    };

    ...
  ...
});
```
