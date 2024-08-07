import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/utilities/metadata";
import ReactTyped from "react-typed";

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Portofolio"
        description="Website Portofolio Dibuat Menggunakan NextJS dan TailwindCSS"
        image="/metadata/home.png"
        url=""
      />

      <section className="pt-36 pb-36 transition duration-300 ease-in-out dark:bg-dark">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-4 lg:w-1/2">
              <h1 className="text-base font-semibold text-primary md:text-xl">
                Halo Semua 👋, Saya
                <span className="mt-1 block text-3xl font-bold text-dark dark:text-white lg:text-5xl">
                  Arman Dwi Pangestu
                </span>
              </h1>

              <h2 className="mb-8 mt-2 text-md md:text-lg font-medium text-accents-300 dark:text-white/80 lg:mt-3 lg:text-xl">
                Saya Seorang Junior -{" "}
                <ReactTyped
                  strings={[
                    "Web Developer",
                    "Network Engineer",
                    "System Administrator",
                    "Cloud Engineer",
                  ]}
                  typeSpeed={40}
                  loop
                  backSpeed={15}
                  className="font-bold text-dark dark:text-white"
                />
              </h2>

              <p className="mb-10 font-medium leading-relaxed text-accents-300 dark:text-white/80">
                &quot;<i>Imagination is more important than knowledge</i>&ldquo;{" "}
                <span className="font-bold text-dark dark:text-white">
                  - Albert Einstein
                </span>
              </p>

              <Link
                href="/tentang-saya"
                className="rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg md:px-8 md:py-3"
              >
                Tentang Saya
              </Link>

              <Link
                href="/Curriculum Vitae.pdf"
                target="_blank"
                className="ml-2 md:ml-5 rounded-full bg-dark text-white dark:bg-white dark:text-dark px-5 py-2.5 text-base font-semibold transition duration-300 ease-in-out hover:opacity-80 hover:shadow-lg md:px-8 md:py-3"
              >
                Download CV
              </Link>
            </div>

            <div className="w-full self-end px-4 lg:w-1/2">
              <div className="relative mt-10 lg:right-0 lg:mt-0">
                <Image
                  alt="Arman Dwi Pangestu"
                  src="/me.png"
                  className="relative z-[1] mx-auto max-w-full"
                  width={417}
                  height={598}
                />
                <span className="absolute bottom-20 left-1/2 -translate-x-1/2 md:scale-125">
                  <svg
                    width={400}
                    height={400}
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#31B5D5"
                      d="M64.1,-21.5C70.9,-0.1,55.7,27.8,33.1,43.8C10.5,59.7,-19.4,63.8,-40.2,49.9C-61,36.1,-72.8,4.3,-64.5,-19.2C-56.3,-42.7,-28.2,-57.9,0.3,-57.9C28.7,-58,57.4,-43,64.1,-21.5Z"
                      transform="translate(100 100) scale(1.1)"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
