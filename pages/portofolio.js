import Metadata from "@/components/utilities/metadata";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const PortofolioPage = () => {
  const [portos, setPortos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://portofolio-next-js-armandwipangestu.vercel.app/api/portofolio"
      );
      const data = await response.json();
      setPortos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Metadata
        title="Portofolio"
        description="Berikut adalah list portofolio yang saya miliki"
        image="/metadata/root.png"
        url="https://armandwipangestu.vercel.app/portofolio"
      />

      <section className="pt-36 pb-36 transition duration-300 ease-in-out dark:bg-dark">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-16 text-center">
                <h4 className="mb-2 text-lg font-semibold uppercase text-primary">
                  Portofolio
                </h4>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">
                  Project Terbaru
                </h2>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 mb-5">
              <p className="text-medium font-medium text-secondary md:text-lg">
                Saya dengan senang hati membagikan perjalanan dan pencapaian
                terbaru saya dalam dunia teknologi. Setiap project yang saya
                bagikan dibawah ini mewakili komitmen saya dalam mempelajari
                suatu teknologi sehingga dapat menciptakan suatu solusi yang
                inovatif dan berdampak.
              </p>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <p className="text-medium font-medium text-secondary md:text-lg">
                Dalam setiap proyek, saya selalu berusaha untuk menggabungkan
                kreativitas dengan pemahaman teknis yang mendalam. Saya percaya
                bahwa teknologi adalah sarana untuk mewujudkan ide-ide luar
                biasa dan mengatasi tantangan yang kompleks. Proyek-proyek ini
                tidak hanya merupakan hasil dari kerja keras saya, tetapi juga
                kolaborasi dengan rekan tim yang luar biasa.
              </p>
            </div>
          </div>

          <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:gap-x-20 lg:gap-y-24 mt-20 px-4">
            {portos.map((porto, index) => (
              <div key={index}>
                <Link href={porto.link}>
                  <div
                    data-radix-aspect-ratio-wrapper=""
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingBottom: "56.25%",
                    }}
                  >
                    <div
                      className="ring-border/50 text-accent-foreground grid place-content-center overflow-hidden rounded-[0.60rem] bg-accent font-mono text-sm ring-1 ring-black dark:ring-white"
                      style={{
                        position: "absolute",
                        inset: "0px",
                      }}
                    >
                      <img
                        alt=""
                        height="360"
                        width="640"
                        src={porto.thubmnail}
                      />
                    </div>
                  </div>
                </Link>
                <div className="mt-4 rounded-lg">
                  <div className="line-clamp-1 dark:text-white">
                    <Link href={porto.link}>
                      <span className="hover:text-primary transition duration-300 ease-in-out">
                        {porto.title}
                      </span>
                    </Link>
                  </div>
                  <div className="mb-4 mt-2 line-clamp-2 text-sm text-slate-400">
                    {porto.excerpt}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                      {porto.techs?.map((tech, index) => (
                        <div
                          className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none"
                          key={index}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortofolioPage;
