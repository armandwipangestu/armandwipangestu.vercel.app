import Metadata from "@/components/utilities/metadata";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  SiHtml5,
  SiMarkdown,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiCodeigniter,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiGitlab,
  SiLinux,
  SiGnubash,
  SiApache,
  SiProxmox,
  SiMikrotik,
  SiUbiquiti,
  SiFigma,
  SiPostman,
  SiArduino,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiCpanel,
  SiFirebase,
  SiMongodb,
  SiGithubactions,
  SiJenkins,
  SiMinio,
  SiCeph,
  SiApachehadoop,
  SiTrino,
  SiApachehive,
  SiApacheparquet,
  SiApachenifi,
  SiGrafana,
  SiPrometheus,
  SiThanos,
  SiVmware,
  SiTypescript,
  SiJsonwebtokens,
  SiCisco,
  SiTerraform,
  SiNotion,
  SiTrello,
  SiGooglecolab,
  SiJupyter,
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

      <section id="skills" className="pt-36 pb-36 dark:bg-dark">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  HTML5
                </span>
              </a>

              {/* Markdown */}
              <a
                href="https://www.markdownguide.org/"
                target="_blank"
                className="group mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMarkdown className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Markdown
                </span>
              </a>

              {/* CSS */}
              <a
                href="https://www.w3schools.com/css/"
                target="_blank"
                className="group mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCss3 className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[0.9rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  JavaScript
                </span>
              </a>

              {/* TypeScript */}
              <a
                href="https://www.typescriptlang.org"
                target="_blank"
                className="group mx-4 max-w-[60px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiTypescript className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.9rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  TypeScript
                </span>
              </a>

              {/* ReactJS */}
              <a
                href="https://react.dev/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiReact className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  React.js
                </span>
              </a>

              {/* NodeJS */}
              <a
                href="https://nodejs.org/en"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <FaNodeJs className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Node.js
                </span>
              </a>

              {/* Express JS */}
              <a
                href="https://expressjs.com/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiExpress className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Express.js
                </span>
              </a>

              {/* Next JS */}
              <a
                href="https://nextjs.org/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <TbBrandNextjs className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Next.js
                </span>
              </a>

              {/* PHP */}
              <a
                href="https://www.php.net/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiPhp className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  PHP
                </span>
              </a>

              {/* Laravel */}
              <a
                href="https://laravel.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiLaravel className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Laravel
                </span>
              </a>

              {/* Codeigniter */}
              <a
                href="https://codeigniter.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCodeigniter className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.8rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  CodeIgniter
                </span>
              </a>

              {/* JWT */}
              <a
                href="https://jwt.io/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiJsonwebtokens className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[-0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  JWT
                </span>
              </a>

              {/* MySQL */}
              <a
                href="https://www.mysql.com/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMysql className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[1.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  PostgreSQL
                </span>
              </a>

              {/* Firebase */}
              <a
                href="https://firebase.google.com/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiFirebase className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Firebase
                </span>
              </a>

              {/* MongoDB */}
              <a
                href="https://www.mongodb.com/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMongodb className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  MongoDB
                </span>
              </a>

              {/* Git */}
              <a
                href="https://git-scm.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGit className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  GitHub
                </span>
              </a>

              {/* GitHub Actions */}
              <a
                href="https://github.com/features/actions"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGithubactions className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  GitHub Actions
                </span>
              </a>

              {/* Jenkins */}
              <a
                href="https://www.jenkins.io/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiJenkins className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Jenkins
                </span>
              </a>

              {/* GitLab */}
              <a
                href="https://gitlab.com"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGitlab className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  GitLab
                </span>
              </a>

              {/* Linux */}
              <a
                href="https://www.linux.org/"
                target="_blank"
                className="group mx-4 max-w-[80px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiLinux className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  GNU BASH
                </span>
              </a>

              {/* Apache */}
              <a
                href="https://httpd.apache.org/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiApache className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Nginx
                </span>
              </a>

              {/* Docker */}
              <a
                href="https://www.docker.com/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiDocker className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Docker
                </span>
              </a>

              {/* Kubernetes */}
              <a
                href="https://kubernetes.io/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiKubernetes className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[-1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Kubernetes
                </span>
              </a>

              {/* Google Cloud Platform (GCP) */}
              <a
                href="https://cloud.google.com/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGooglecloud className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  GCP
                </span>
              </a>

              {/* Terraform */}
              <a
                href="https://www.terraform.io/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiTerraform className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[-0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Terraform
                </span>
              </a>

              {/* MinIO */}
              <a
                href="https://www.min.io"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMinio className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  MinIO
                </span>
              </a>

              {/* Ceph */}
              <a
                href="https://ceph.io"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCeph className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Ceph
                </span>
              </a>

              {/* Apache Hadoop */}
              <a
                href="https://hadoop.apache.org"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiApachehadoop className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Apache Hadoop
                </span>
              </a>

              {/* Trino */}
              <a
                href="https://trino.io"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiTrino className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Trino
                </span>
              </a>

              {/* Apache Hive */}
              <a
                href="https://hive.apache.org"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiApachehive className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Apache Hive
                </span>
              </a>

              {/* Apache Parquet */}
              <a
                href="https://parquet.apache.org"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiApacheparquet className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Apache Parquet
                </span>
              </a>

              {/* Apache NiFi */}
              <a
                href="https://nifi.apache.org"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiApachenifi className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Apache NiFi
                </span>
              </a>

              {/* Grafana */}
              <a
                href="https://grafana.com"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGrafana className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Grafana
                </span>
              </a>

              {/* Prometheus */}
              <a
                href="https://prometheus.io"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiPrometheus className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[1.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Prometheus
                </span>
              </a>

              {/* Thanos */}
              <a
                href="https://thanos.io"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiThanos className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Thanos
                </span>
              </a>

              {/* Proxmox */}
              <a
                href="https://www.proxmox.com"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiProxmox className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.5rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Proxmox
                </span>
              </a>

              {/* VMware */}
              <a
                href="https://www.vmware.com"
                target="_blank"
                className="group mx-4 max-w-[140px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiVmware className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  VMware
                </span>
              </a>

              {/* Cpanel */}
              <a
                href="https://cpanel.net/"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCpanel className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  cPanel
                </span>
              </a>

              {/* PowerDNS */}
              <a
                href="https://www.powerdns.com"
                target="_blank"
                className="group mx-4 max-w-[120px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <img src="./skills/powerdns.svg" alt="PowerDNS" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.7rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  PowerDNS
                </span>
              </a>

              {/* Mikrotik */}
              <a
                href="https://mikrotik.com"
                target="_blank"
                className="group mx-4 max-w-[150px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiMikrotik className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Mikrotik
                </span>
              </a>

              {/* Cisco */}
              <a
                href="https://www.cisco.com"
                target="_blank"
                className="group mx-4 max-w-[150px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiCisco className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[-0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Cisco
                </span>
              </a>

              {/* Ruijie */}
              <a
                href="https://www.ruijienetworks.com"
                target="_blank"
                className="group mx-4 max-w-[110px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <img src="./skills/ruijie.png" alt="Rujie" />
                <span className="icon-skill absolute top-[5.5rem] -right-[2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[1.6rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[0.4rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
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
                <span className="icon-skill absolute top-[5.5rem] -right-[0.3rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Arduino Uno
                </span>
              </a>

              {/* Notion */}
              <a
                href="https://www.notion.so/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiNotion className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Notion
                </span>
              </a>

              {/* Trello */}
              <a
                href="https://www.trello.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiTrello className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] right-[0.2rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Trello
                </span>
              </a>

              {/* Google Colab */}
              <a
                href="https://colab.research.google.com/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiGooglecolab className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Google Colab
                </span>
              </a>

              {/* Jupyter Notebook */}
              <a
                href="https://jupyter.org/"
                target="_blank"
                className="group mx-4 max-w-[70px] py-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 lg:mx-6 xl:mx-8 ease-in-out hover:scale-110"
              >
                <SiJupyter className="w-16 h-16" />
                <span className="icon-skill absolute top-[5.5rem] -right-[0.1rem] scale-0 rounded bg-dark text-white dark:bg-white dark:text-dark p-2 text-xs group-hover:scale-100 whitespace-normal transition duration-300 ease-in-out font-bold">
                  Jupyter Notebook
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
