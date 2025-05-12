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
                      November 2024 - Sekarang
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      Sovware Data Mandiri
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      Junior System Administrator - Full Time
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Mendesain arsitektur Big Data agar mendukung Scalable,
                        High Availability, Fault Tolerant, dan Load Balancing.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Melakukan deployment Big Data teknologi di server
                        On-Premise yang berjalan di atas Hypervisor Proxmox
                        menggunakan MinIO, Ceph, Dremio, Trino, Apache Hue,
                        Zookeeper, Nessie, MariaDB, Galera Cluster, HAProxy,
                        Keepalived, Apache NiFi, Nginx, beserta monitoring
                        system menggunakan Prometheus, Grafana, Thanos, Loki,
                        dan Alloy.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Membuat CI/CD Pipeline untuk kebutuhan automation
                        deployment di GitLab menggunakan GitLab Runner dengan
                        output containerized dan disimpan di GitLab Registry.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Membuat Single Sign On (SSO) service menggunakan
                        Keycloak untuk kebutuhan Authentication yang mendukung
                        OIDC (OpenID Connect) yang berjalan di atas framework
                        OAuth 2.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menyiapkan VPN Server menggunakan L2TP, IPsec, dan
                        OpenVPN untuk kebutuhan koneksi server.
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex-start flex items-center pt-3">
                    <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary"></div>
                    <p className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                      September 2024 - November 2024
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      BuildWithAngga
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      Backend Laravel - Internship
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Membuat fitur saved article di website BuildWithAngga
                        menggunakan framework Laravel.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Kolaborasi menggunakan Version Control System (Git &
                        GitHub) dengan developer lain.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Mempelajari Unit Testing pada framework Laravel
                        menggunakan PHPUnit.
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Membuat ebook dengan judul{" "}
                        <b>
                          Kelas Online Laravel 11 Service Repository Pattern
                          menggunakan Filament: Web Event dan Workshop Ticket
                        </b>
                        .
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menyiapkan materi dan menjadi speaker dari webinar
                        dengan judul{" "}
                        <b>Pengenalan System Administration & DNS Server</b>.
                      </p>
                    </div>
                  </div>
                </li>

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
                      System Administrator - Full Time
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
                      Network Engineer - Full Time
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
