---
title: "CSS - Belajar CSS"
tag: "Programming"
date: "October 10 2023"
excerpt: "Pada artikel ini Saya akan membahas mengenai CSS seperti anatomi, penempatan dan lainnya"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Apa itu CSS? CSS atau **Cascading Style Sheet** yang dimana nanti nya kita bisa memberikan sebuah style seperti warna, ukuran, dan posisi kedalam element-element pada HTML. Definisi CSS menurut [www.w3.org/style/CSS](https://www.w3.org/style/CSS) adalah "**Mekanisme sederhana yang mengatur gaya atau style (contoh: warna, ukuran, posisi, dll) pada halaman web**".

Pertanyaan nya, bagaimana dulu ketika belum ada CSS kita dapat memberikan styling? Sebetulnya HTML sendiri bisa kita berikan style namun dengan segala keterbatasannya. Contohnya disini kita mempunyai sebuah text `Hello World` yang disimpan pada element `h1`

```html
<font size="+5" color="salmon" face="arial">
  <center>
    <h1>Hello World!</h1>
  </center>
</font>
```

![h1](../images/posts/assets/belajar_css/h1.png)

Bisa kalian lihat diatas, hanya untuk membuat sebuah style pada element h1 dengan font arial, warna nya salmon kalian butuh `font-size`, `font-color`, `font-face` dan lainnya, panjang bukan? bayangkan jika kalian memiliki banyak element seperti h1 terdapat 5 buah, paragraph ada 10 buah. Kebayang bukan? sangat berantakan sekali karena mempersatukan antara content dengan style. Nah jika kalian sudah tau CSS jangan lagi lakukan hal tersebut.

Jika menggunakan CSS, maka kode nya akan menjadi seperti berikut ini:

```html
<h1>Hello World!</h1>
```

```css
h1 {
  font-size: 120px;
  font-family: arial;
  color: salmon;
  text-align: center;
}
```

Maka hasilnya akan sama persis, namun sekarang antara content dan style betul-betul terpisah dan itu yang kita inginkan.

Berikut adalah teori dari CSS:

- Aturan yang digunakan untuk menampilkan element atau tag HTML. Sehingga kalo _HTML itu adalah untuk menyajikan content, sedangkan CSS itu untuk mengatur bagaimana content tersebut akan ditampilkan, seperti ukuran font, jenis font dan lainnya_
- Dibuat terpisah dengan HTML
- Bertujuan untuk memisahkan antara content dan style
- 1 CSS dapat digunakan untuk banyak halaman HTML sekaligus
- 1 halaman HTML dapat terlihat berbeda jika menggunakan CSS yang berbeda pula

## Anatomi CSS

Berikut adalah anatomi atau struktur dari CSS

```css
selector {
  property: value;
}
```

Dapat kalian lihat pada syntax CSS diatas, CSS itu terbagi menjadi beberapa bagian:

1. Ada yang disebut sebagai `selector`
2. Didalamnya terdapat sebuah `property` dan `value`
3. `property` dan `value` nya dibatasi dengan sebuah kurung kurawal buka dan tutup `{}`
4. Setiap `property` terdapat sebuah karakter titik dua `:` setelah nya kemudian di ikuti dengan `value` nya dan di akhiri dengan karakter titik koma `;`

Hal diatas tersebut adalah sebuah syntax yang harus kalian tuliskan untuk membuat satu deklarasi dari CSS, contoh lainnya seperti ini

```css
h1 {
  color: salmon;
}
```

Syntax diatas tersebut artinya, seluruh tulisan yang ada di dalam element `h1` itu warnanya berubah menjadi salmon

### Apa itu Selector

- Digunakan untuk memilih dan memanipulasi element spesifik pada HTML.
- Element HTML dipilih berdasarkan tag, id, class bahkan pola atau pattern.
- Semakin kompleks struktur HTML, maka selector juga bisa semakin kompleks atau spesifik.
