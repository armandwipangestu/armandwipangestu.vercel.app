// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
});

export default async function handler(req, res) {
  cors(req, res, async () => {
    res.status(200).json({
      data,
    });
  });
}

const data = [
  {
    link: "https://github.com/armandwipangestu/e-perpus-solo",
    thubmnail: "/portofolio/e-perpus-solo.png",
    alt: "CodeIgniter 3 - E-PERPUS SOLO",
    title: "CodeIgniter 3 - E-PERPUS SOLO",
    excerpt:
      "Web perpustakaan online atau LMS (Library Management System), proyek ini merupakan tugas dari mata kuliah Sistem Basis Data",
    techs: ["CodeIgniter 3", "Mazer", "ApexCharts", "MySQL/MariaDB"],
  },
  {
    link: "https://github.com/armandwipangestu/armandwipangestu.vercel.app",
    thubmnail: "/portofolio/portofolio.png",
    alt: "NextJS - Web Portofolio & Blog",
    title: "NextJS - Web Portofolio & Blog",
    excerpt: "Web Portofolio dibuat menggunakan NextJS dan Tailwind CSS",
    techs: ["NextJS", "ReactJS", "TailwindCSS", "Markdown"],
  },
  {
    link: "https://github.com/armandwipangestu/beasiswa",
    thubmnail: "/portofolio/beasiswa.png",
    alt: "CodeIgniter 3 - Beasiswa",
    title: "CodeIgniter 3 - Beasiswa",
    excerpt:
      "Aplikasi pencatatan pengajuan penerima beasiswa, proyek ini merupakan tugas dari mata kuliah Mini Project 2.",
    techs: ["CodeIgniter 3", "Bootstrap", "Stisla", "MySQL/MariaDB"],
  },
  {
    link: "https://github.com/armandwipangestu/vba-toko-alat-olahraga",
    thubmnail: "/portofolio/vba-toko_alat_olahraga.png",
    alt: "VBA - Toko Alat Olahraga",
    title: "VBA - Toko Alat Olahraga",
    excerpt:
      "Aplikasi toko alat olahraga yang memiliki fitur CRUD pada Excel, proyek ini merupakan tugas dari mata kuliah Mini Project 1.",
    techs: ["Visual Basic Application", "Excel"],
  },
  {
    link: "https://github.com/armandwipangestu/openai-project",
    thubmnail: "/portofolio/openai-project.png",
    alt: "ReactJS - OpenAI Project",
    title: "ReactJS - OpenAI Project",
    excerpt:
      "Simpel Web App untuk berinteraksi dengan ChatGPT dan Dall·E 2 menggunakan OpenAI API, dibuat menggunakan ReactJS dan Axios untuk request API.",
    techs: ["ReactJS", "TailwindCSS", "Axios"],
  },
  {
    link: "https://github.com/Awesomesh0t/awesomeshot",
    thubmnail: "/portofolio/awesomeshot2.png",
    alt: "BASH - Awesomeshot",
    title: "BASH - Awesomeshot",
    excerpt:
      "Command Line Tools untuk memodifikasi gambar atau screenshot menggunakan BASH dan ImageMagick.",
    techs: ["BASH", "ImageMagick"],
  },
  {
    link: "https://github.com/armandwipangestu/blog",
    thubmnail: "/portofolio/blog-php-native.png",
    alt: "PHP - Blog",
    title: "PHP - Blog",
    excerpt:
      "Blog sederhana dibuat menggunakan php native dan content menggunakan markdown. Dibuat ketika pertama kali mempelajari bahasa pemrograman PHP",
    techs: ["PHP", "Bootstrap", "Markdown", "MySQL/MariaDB"],
  },
];
