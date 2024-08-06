import Metadata from "@/components/utilities/metadata";

const ExperiencePage = () => {
  return (
    <>
      <Metadata
        title="Portofolio - Pengalaman"
        description="Berikut adalah pengalaman kerja yang saya miliki"
        image="/metadata/home.png"
        url="pengalaman"
      />

      <section
        id="pengalaman"
        className="pb-32 pt-36 transition-all duration-300 dark:bg-dark"
      >
        <div className="container">
          <div className="w-full px-4">
            <div className="mx-auto mb-16 text-center">
              <h4 className="mb-2 text-lg font-semibold uppercase text-primary">
                Pengalaman
              </h4>
            </div>
          </div>

          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              <ol className="border-l border-dark dark:border-white">
                {/* First Item */}
                <li>
                  <div className="flex-start flex items-center pt-3">
                    <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary"></div>
                    <p className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                      Juni 2023 - Oktober 2023
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      PT CITRA JELAJAH INFORMATIKA
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      System Administrator
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menginstal, mengonfigurasi, dan memelihara server DNS
                        (PowerDNS, BIND), Web (Apache, Nginx), Basis Data (MySQL
                        / MariaDB, MongoDB), Mail (Postfix, Dovecot, Roundcube),
                        Pemantauan (Grafana, Prometheus, Cacti, PRTG, Zabbix,
                        The Dude)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menangani server cPanel & CentOS CWP
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Virtualisasi (Proxmox dan VMware ESXi)
                      </p>
                    </div>
                  </div>
                </li>

                {/* Thrid Item */}
                <li>
                  <div className="flex-start flex items-center pt-3">
                    <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary"></div>
                    <p className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                      Juni 2021 - Juni 2023
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      PT CITRA JELAJAH INFORMATIKA
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      Network Engineer
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menganalisa, mendesain, dan memasang kebutuhan jaringan
                        di gedung, mall, sekolah, hotel, dll.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Engineer on Site
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menangani Perangkat Wireless (Ruijie, Ubiquiti / Unifi,
                        TP-Link), Router (Mikrotik, Cisco), Switch Management
                        (Cisco, Arista)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Bekerja di Network Operation Center (NOC) dan Registrasi
                        Modem menggunakan GPON OLT ZTE
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Memonitoring Lalu Lintas Jaringan menggunakan The Dude,
                        Zabbix, Cacti
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperiencePage;
