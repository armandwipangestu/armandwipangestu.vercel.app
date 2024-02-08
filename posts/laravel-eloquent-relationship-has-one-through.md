---
published: false
title: "Laravel Eloquent - Relationship Has One Through"
tag: "Programming"
date: "February 4 2024"
excerpt: "Pada artikel kali ini kita akan membahas mengenai Laravel Eloquent Relationship Has One Through"
cover_image: "/images/posts/Laravel Eloquent - Relationship Has One Through.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Pendahuluan

Setelah pada 2 pembahasan sebelumnya kita membahas mengenai relationship Has One of Many, pada pembahasan kali ini kita akan membahas relationship Has One Through. Apa itu relationship Has One Through?

## Has One Through

Relationship Has One Through adalah relationship yang mendefinisikan hubungan satu-ke-satu dengan model lain. Namun, relationship ini menunjukkan bahwa model yang mendeklarasikan dapat dicocokan dengan satu contoh model lain dengan melanjutkan melalui model ketiga.

Agar lebih terbayang, kita buat studi kasus mengenai model `Mehcanic`, `Car`, dan `Owner`. Sekarang kita bayangkan dalam aplikasi bengkel kendaraan, setiap model `Mechanic` dapat dikaitkan dengan satu model `Car`, dan setiap model `Car` dapat dikaitkan dengan satu model `Owner`. Meskipun model `Mechanic` dan model `Owner` tidak memiliki relationship secara langsung didalam database, model `Mechanic` ini dapat mengakses model `Owner` melalui model `Car`. Agar lebih terbayang kalian bisa lihat gambar dibawah ini.

![Relationship Design](${NEXT_PUBLIC_PUBLIC_ASSETS}/laravel-eloquent/relationship-has-one-through/relationship-design.png)
