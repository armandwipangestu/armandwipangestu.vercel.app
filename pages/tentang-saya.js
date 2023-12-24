import Metadata from "@/components/utilities/metadata";
import {
  FaGithub,
  FaGitlab,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
      <Metadata
        title="Portofolio - Tentang Saya"
        description="Saya adalah seorang Junior Web Developer, Network Technician, System Administrator"
        image="/metadata/home.png"
        url="tentang-saya"
      />

      <section className="pb-32 pt-32 transition duration-300 ease-in-out dark:bg-dark lg:pt-44">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="mb-10 w-full px-4 lg:w-1/2">
              <h4 className="mb-3 text-lg font-bold uppercase text-primary">
                Tentang Saya
              </h4>

              <h2 className="mb-5 max-w-lg text-3xl font-bold text-dark dark:text-white lg:text-4xl">
                Menghubungkan Kreativitas Dengan{" "}
                <span className="animate-gradient-pulse from-background to-background text-foreground ml-1 inline-block -rotate-1 rounded-xl bg-gradient-to-r via-primary/10 px-4 py-1.5 text-lg tracking-tight shadow-2xl shadow-primary/[0.25] ring-2 ring-dark/70 dark:ring-white/70 sm:px-4 sm:py-3 sm:text-3xl lg:text-4xl">
                  Kode.
                </span>
              </h2>

              <p className="max-w-xl text-base font-medium text-secondary lg:text-lg">
                Saya seorang Junior Web Developer yang bersemangat dalam hal
                mempelajari teknologi yang dibutuhkan agar masalah dapat
                terselesaikan, Saya berusaha memberikan pengalaman pengguna yang
                menarik dan fungsional.
                <br />
                <br />
                Sebagai seorang Network Technician, Saya berusaha menjaga
                konektivitas yang andal dan efisien. Saya senang menganalisis
                masalah jaringan dan mengoptimalkan performa, menjadikan
                komunikasi yang lancar sebagai prioritas utama.
                <br />
                <br />
                Dalam peran System Administrator, Saya menyatukan pengetahuan
                tentang jaringan dan programming dengan kecakapan teknis dalam
                merancang dan mengelola infrastruktur yang handal. Saya
                berdedikasi untuk menjaga operasi yang lancar dan efisien.
              </p>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white lg:pt-10 lg:text-4xl">
                Mari Berteman
              </h2>

              <p className="mb-6 text-base font-medium text-secondary lg:mt-14 lg:text-lg">
                Saya senang dapat berbagi perjalanan dan pencapaian saya di
                dunia digital dengan Anda. Setiap langkah yang Saya ambil dalam
                mengembangkan proyek-proyek kreatif, menyelesaikan tantangan
                teknis atau memperkuat konektivitas jaringan, Saya rasa adalah
                bagian dari cerita yang lebih besar. Cerita tentang inovasi,
                kerja keras dan semangat untuk terus belajar dan tumbuh.
                <br />
                <br />
                Jangan ragu untuk mengituki Saya di berbagai akun media sosial
                yang ada di bawah ini. Saya sangat berharap dapat terhubung
                dengan Anda dan menjalin persahabatan yang lebih dekat. Terima
                kasih atas kunjungannya, dan mari bersama-sama menginspirasi dan
                memajukan dunia teknologi!
              </p>

              <div className="flex items-center">
                {/* Github */}
                <a
                  href="https://github.com/armandwipangestu"
                  target="_blank"
                  className="group mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaGithub className="h-6 w-6" />
                  <span className="absolute mt-20 scale-0 rounded bg-primary text-white p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                    GitHub
                  </span>
                </a>

                {/* GitLab */}
                <a
                  href="https://gitlab.com/armandwipangestu"
                  target="_blank"
                  className="group mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaGitlab className="h-6 w-6" />
                  <span className="absolute mt-20 scale-0 rounded bg-primary text-white p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                    GitLab
                  </span>
                </a>

                {/* Youtube */}
                <a
                  href="https://www.youtube.com/channel/UCqo9Q_EpEJWGJLB2xmm_g3A"
                  target="_blank"
                  className="group mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaYoutube className="h-6 w-6" />
                  <span className="absolute mt-20 scale-0 rounded bg-primary text-white p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                    YouTube
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/devvnnull/"
                  target="_blank"
                  className="group mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaInstagram className="h-6 w-6" />
                  <span className="absolute mt-20 scale-0 rounded bg-primary text-white p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                    Instagram
                  </span>
                </a>

                {/* Linkedin */}
                <a
                  href="https://www.linkedin.com/in/arman-dwi-pangestu"
                  target="_blank"
                  className="group mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaLinkedin className="h-6 w-6" />
                  <span className="absolute mt-20 scale-0 rounded bg-primary text-white p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
