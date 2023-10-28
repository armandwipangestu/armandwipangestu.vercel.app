export const sortPostsByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Daftar nama bulan dalam bahasa Indonesia
  const monthNamesId = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Ambil nama bulan dalam bahasa Indonesia
  const monthNameId = monthNamesId[monthIndex];

  return `${day} ${monthNameId} ${year}`;
};

// export const formatDate = (dateString) => {
//   // Buat objek Date dari tanggal yang ada
//   const date = new Date(dateString);

//   // Daftar nama bulan dalam bahasa Inggris
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Ambil tanggal, bulan, dan tahun dari objek Date
//   const day = date.getDate();
//   const month = monthNames[date.getMonth()];
//   const year = date.getFullYear();

//   // Buat tanggal dalam format yang diinginkan
//   return `${day} ${month} ${year}`;
// };
