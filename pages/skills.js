import Metadata from "@/components/utilities/metadata";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiExpress,
  SiPhp,
  SiCodeigniter,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiLinux,
  SiGnubash,
  SiApache,
  SiProxmox,
  SiMikrotik,
  SiUbiquiti,
  SiFigma,
  SiPostman,
  SiArduino,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { DiNodejs, DiNginx } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa6";

const SkillsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const grayscales = document.querySelectorAll(".grayscale");
    const iconSkills = document.querySelectorAll(".icon-skill");

    const animateGrayscale = () => {
      if (activeIndex < grayscales.length) {
        grayscales[activeIndex].classList.remove("grayscale", "opacity-60");
        grayscales[activeIndex].classList.add(
          "grayscale-0",
          "opacity-100",
          "scale-110"
        );

        iconSkills[activeIndex].classList.remove("scale-0");
        iconSkills[activeIndex].classList.add("scale-110");

        setTimeout(() => {
          grayscales[activeIndex].classList.remove(
            "grayscale-0",
            "opacity-100",
            "scale-110"
          );

          iconSkills[activeIndex].classList.remove("scale-110");

          grayscales[activeIndex].classList.add("grayscale", "opacity-60");
          iconSkills[activeIndex].classList.add("scale-0");
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
        image="/metadata/home.png"
        url="skills"
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

          <div className="w-full pr-5">
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-4 items-center justify-center">
              {/* HTML */}
              <a
                href="https://www.w3.org/html/"
                target="_blank"
                className="group mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiHtml5 className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[3.5rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  HTML5
                </span>
              </a>

              {/* CSS */}
              <a
                href="https://www.w3schools.com/css/"
                target="_blank"
                className="group mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCss3 className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[2.9rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  CSS3
                </span>
              </a>

              {/* Bootstrap */}
              <a
                href="https://getbootstrap.com/"
                target="_blank"
                className="group mx-4 max-w-[65px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiBootstrap className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4.8rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Bootstrap
                </span>
              </a>

              {/* Tailwind CSS */}
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiTailwindcss className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[5.8rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  TailwindCSS
                </span>
              </a>

              {/* Javascript */}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                className="group mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiJavascript className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.9rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[5.2rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  JavaScript
                </span>
              </a>

              {/* ReactJS */}
              <a
                href="https://react.dev/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiReact className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4.1rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  ReactJS
                </span>
              </a>

              {/* NodeJS */}
              <a
                href="https://nodejs.org/en"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <FaNodeJs className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  NodeJS
                </span>
              </a>

              {/* Express JS */}
              <a
                href="https://expressjs.com/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiExpress className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4.8rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  ExpressJS
                </span>
              </a>

              {/* Next JS */}
              <a
                href="https://nextjs.org/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <TbBrandNextjs className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[3.7rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  NextJS
                </span>
              </a>

              {/* PHP */}
              <a
                href="https://www.php.net/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiPhp className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[2.5rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  PHP
                </span>
              </a>

              {/* Codeigniter */}
              <a
                href="https://codeigniter.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCodeigniter className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.8rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[5.6rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  CodeIgniter
                </span>
              </a>

              {/* MySQL */}
              <a
                href="https://www.mysql.com/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMysql className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[1.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[7.3rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  MySQL/MariaDB
                </span>
              </a>

              {/* PostgreSQL */}
              <a
                href="https://www.mysql.com/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiPostgresql className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[5.4rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  PostgreSQL
                </span>
              </a>

              {/* Git */}
              <a
                href="https://git-scm.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGit className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[2.2rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Git
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGithub className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[3.7rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  GitHub
                </span>
              </a>

              {/* Linux */}
              <a
                href="https://www.linux.org/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiLinux className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[5.1rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  GNU/Linux
                </span>
              </a>

              {/* GNU Bash */}
              <a
                href="https://www.gnu.org/software/bash/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGnubash className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[3rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  BASH
                </span>
              </a>

              {/* Apache */}
              <a
                href="https://httpd.apache.org/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiApache className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Apache
                </span>
              </a>

              {/* Nginx */}
              <a
                href="https://www.nginx.com/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <DiNginx className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[3.2rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Nginx
                </span>
              </a>

              {/* PowerDNS */}
              <a
                href="https://www.powerdns.com"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <img src="./skills/powerdns.svg" alt="PowerDNS" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[5.1rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  PowerDNS
                </span>
              </a>

              {/* Proxmox */}
              <a
                href="https://www.proxmox.com"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiProxmox className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4.5rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Proxmox
                </span>
              </a>

              {/* Mikrotik */}
              <a
                href="https://mikrotik.com"
                target="_blank"
                className="group mx-4 max-w-[150px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMikrotik className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4.2rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Mikrotik
                </span>
              </a>

              {/* Ruijie */}
              <a
                href="https://www.ruijienetworks.com"
                target="_blank"
                className="group mx-4 max-w-[110px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <img src="./skills/ruijie.png" alt="Rujie" />
                <span className="icon-skill absolute top-[5.5rem] -right-[2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[7rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Ruijie/ReyeeOS
                </span>
              </a>

              {/* Ubiquiti */}
              <a
                href="https://www.ui.com"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiUbiquiti className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[1.6rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[6/2rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Unifi/Ubiquiti
                </span>
              </a>

              {/* Figma */}
              <a
                href="https://www.figma.com"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiFigma className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[3.4rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Figma
                </span>
              </a>

              {/* Postman */}
              <a
                href="https://www.postman.com"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiPostman className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4.4rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Postman
                </span>
              </a>

              {/* Arduino Uno */}
              <a
                href="https://www.arduino.cc"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiArduino className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 w-[4rem] whitespace-normal transition duration-300 ease-in-out font-bold">
                  Arduino
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsPage;
