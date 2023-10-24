import Metadata from "@/components/utilities/metadata";
import React, { useEffect, useState } from "react";

const SkillsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const grayscales = document.querySelectorAll(".grayscale");
    const animateGrayscale = () => {
      if (activeIndex < grayscales.length) {
        grayscales[activeIndex].classList.remove("grayscale", "opacity-60");
        grayscales[activeIndex].classList.add("grayscale-0", "opacity-100");
        setTimeout(() => {
          grayscales[activeIndex].classList.remove(
            "grayscale-0",
            "opacity-100"
          );
          grayscales[activeIndex].classList.add("grayscale", "opacity-60");
          setActiveIndex(activeIndex + 1);
        }, 500);
      } else {
        setActiveIndex(0);
      }
    };

    animateGrayscale();
  }, [activeIndex]);

  return (
    <>
      <Metadata
        title="Portofolio - Skills"
        description="Berikut adalah list Teknologi, Programming Laguage dan Tools yang saya kuasai."
        image="/metadata/root.png"
        url="https://armandwipangestu.vercel.app/skills"
      />

      <section
        id="skills"
        className="pt-36 pb-36 transition duration-300 ease-in-out dark:bg-dark"
      >
        <div className="container">
          <div className="w-full px-4">
            <div className="mx-auto mb-16 text-center">
              <h4 className="mb-2 text-lg font-semibold uppercase text-primary">
                Skills
              </h4>
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">
                Penguasaan Teknologi, Programming Language dan Tools
              </h2>
              <p className="text-medium font-medium text-secondary md:text-lg mt-10">
                Ketika berbicara tentang penguasaan teknologi, pemahaman
                mendalam tentang berbagai bahasa pemrograman dan alat-alat yang
                kritis adalah kunci dalam menghadapi tantangan dunia teknologi
                yang terus berkembang. Saya telah mengembangkan keahlian yang
                cukup dalam berbagai bidang, yang memungkinkan saya untuk
                merangkai solusi yang tangguh dan efektif. <br />
                <br />
                Berikut adalah list Teknologi, Programming Language dan Tools
                yang saya kuasai.
              </p>
            </div>
          </div>

          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              {/* HTML */}
              <a
                href="https://www.w3.org/html/"
                target="_blank"
                className="mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/html.png" alt="HTML" />
                {/* <div class="absolute left-2 top-0 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white">
                Lancar
              </div> */}
              </a>

              {/* CSS */}
              <a
                href="https://www.w3schools.com/css/"
                target="_blank"
                className="mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/css.svg" alt="CSS" />
                {/* <div class='absolute left-2 top-0 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white'>
                                Menengah
                            </div> */}
              </a>

              {/* Bootstrap */}
              <a
                href="https://getbootstrap.com/"
                target="_blank"
                className="mx-4 max-w-[65px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/bootstrap.svg" alt="Bootstrap" />
                {/* <div class='absolute left-2 top-0 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white'>
                                Menengah
                            </div> */}
              </a>

              {/* Tailwind CSS */}
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                className="mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/tailwindcss.png" alt="Tailwind CSS" />
                {/* <div class='absolute left-2 top-0 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white'>
                                Menengah
                            </div> */}
              </a>

              {/* Javascript */}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                className="mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/javascript.png" alt="Javascript" />
                {/* <div class='absolute left-2 top-0 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white'>
                                Menengah
                            </div> */}
              </a>

              {/* ReactJS */}
              <a
                href="https://react.dev/"
                target="_blank"
                className="mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/reactjs.svg" alt="ReactJS" />
                {/* <div class='absolute left-2 top-4 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white'>
                                Menengah
                            </div> */}
              </a>

              {/* NodeJS */}
              <a
                href="https://nodejs.org/en"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/nodejs.svg" alt="NodeJS" />
                {/* <div class='absolute left-2 top-0 inline-flex items-center justify-center rounded-full border-2 bg-primary px-2 text-xs font-bold text-white'>
                                Menengah
                            </div> */}
              </a>

              {/* Express JS */}
              <a
                href="https://expressjs.com/"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/express.png" alt="Express JS" />
              </a>

              {/* PHP */}
              <a
                href="https://www.php.net/"
                target="_blank"
                className="mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/php-2.svg" alt="PHP" />
              </a>

              {/* Codeigniter */}
              <a
                href="https://codeigniter.com/"
                target="_blank"
                className="mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/codeigniter.svg" alt="Codeigniter" />
              </a>

              {/* MySQL */}
              <a
                href="https://www.mysql.com/"
                target="_blank"
                className="mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/mysql.svg" alt="MySQL" />
              </a>

              {/* Git */}
              <a
                href="https://git-scm.com/"
                target="_blank"
                className="mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/git.svg" alt="Git" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                className="mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/github.svg" alt="GitHub" />
              </a>

              {/* Linux */}
              <a
                href="https://www.linux.org/"
                target="_blank"
                className="mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/linux.png" alt="Linux" />
              </a>

              {/* GNU Bash */}
              <a
                href="https://www.gnu.org/software/bash/"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/gnu-bash.svg" alt="Bash" />
              </a>

              {/* Apache */}
              <a
                href="https://httpd.apache.org/"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/apache.svg" alt="Apache HTTP Web Server" />
              </a>

              {/* Nginx */}
              <a
                href="https://www.nginx.com/"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/nginx.svg" alt="Nginx" />
              </a>

              {/* PowerDNS */}
              <a
                href="https://www.powerdns.com"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/powerdns.svg" alt="PowerDNS" />
              </a>

              {/* Proxmox */}
              <a
                href="https://www.proxmox.com"
                target="_blank"
                className="mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/proxmox.svg" alt="Proxmox" />
              </a>

              {/* Mikrotik */}
              <a
                href="https://mikrotik.com"
                target="_blank"
                className="mx-4 max-w-[150px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/mikrotik.png" alt="Mikrotik" />
              </a>

              {/* Ruijie */}
              <a
                href="https://www.ruijienetworks.com"
                target="_blank"
                className="mx-4 max-w-[110px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/ruijie.png" alt="Rujie" />
              </a>

              {/* Ubiquiti */}
              <a
                href="https://www.ui.com"
                target="_blank"
                className="mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/ubiquiti.svg" alt="Ubiquiti" />
              </a>

              {/* Figma */}
              <a
                href="https://www.figma.com"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/figma.svg" alt="Figma" />
              </a>

              {/* Postman */}
              <a
                href="https://www.postman.com"
                target="_blank"
                className="mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/postman.svg" alt="Postman" />
              </a>

              {/* Arduino Uno */}
              <a
                href="https://www.arduino.cc"
                target="_blank"
                className="mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8"
              >
                <img src="./skills/arduino.svg" alt="Arduino Uno" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsPage;
