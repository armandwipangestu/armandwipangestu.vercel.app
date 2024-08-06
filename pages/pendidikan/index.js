import Metadata from "@/components/utilities/metadata";

const EducationPage = () => {
  return (
    <>
      <Metadata
        title="Portofolio - Pendidikan"
        description="Berikut adalah pendidikan yang saya tempuh"
        image="/metadata/home.png"
        url="pendidikan"
      />

      <section
        id="pendidikan"
        className="pb-32 pt-36 transition-all duration-300 dark:bg-dark"
      >
        <div className="container">
          <div className="w-full px-4">
            <div className="mx-auto mb-16 text-center">
              <h4 className="mb-2 text-lg font-semibold uppercase text-primary">
                Pendidikan
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
                      Februari 2024 - Juli 2024
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      Bangkit Academy 2024 Batch 1 - Distinction Graduate, Grade
                      92.56 (A)
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      Cloud Computing
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menangani Deployment Resources Google Cloud Platform
                        untuk Proyek Capstone (Infrastruktur, Perancangan
                        Arsitektur, Manajemen Akses Identitas)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Membuat Back-End RESTful API dengan Modern Stack dan
                        Secure menggunakan Docker, JWT, Zod, dll
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Menangani DevOps CI/CD Pipeline pada Deployment
                        Menggunakan GitHub Actions untuk Build Docker Image dan
                        Men-deploy ke Cloud Run (serverless atau PaaS)
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex-start flex items-center pt-3">
                    <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary"></div>
                    <p className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                      September 2021 - Sekarang
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      STMIK Bandung, Grade 3.70
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      S1 Teknik Informatika
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Software Engineering (Web dengan PHP, Mobile dengan
                        Java, Desktop dengan Visual Basic)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Database (MySQL / MariaDB, PostgreSQL)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Microcontroller dan Internet of Things (Arduino Uno
                        dengan Pemrograman C++)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Artificial Intelligence (Computer Vision dengan OpenCV
                        Python)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Machine Learning (Supervised dengan Linear Regression,
                        Unsupervised dengan K-means Clustering, Reinforcement
                        Learning)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Deep Learning (Convolutional Neural Network with
                        TensorFlow Python)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Big Data Analysis (Hadoop)
                      </p>
                    </div>
                  </div>
                </li>

                {/* Second Item */}
                <li>
                  <div className="flex-start flex items-center pt-3">
                    <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary"></div>
                    <p className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-tight text-cyan-500 transition-colors hover:bg-cyan-500/20 focus:outline-none">
                      2018 - 2021
                    </p>
                  </div>
                  <div className="mb-6 ml-4 mt-2">
                    <h4 className="tex-dark mb-1.5 text-xl font-semibold dark:text-white">
                      SMK Merdeka Bandung
                    </h4>
                    <p className="mb-3 text-neutral-500 dark:text-neutral-300">
                      TKJ (Teknik Komputer dan Jaringan)
                    </p>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Computer (Binary, Hexadecimal, Octal Decimal, RAM,
                        Hardisk, Microsoft Office, Linux)
                      </p>
                    </div>

                    <div className="flex-start flex items-center">
                      <div className="mr-3 h-[8px] w-[8px] rounded-full bg-dark dark:bg-white"></div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-300">
                        Networking (Kabel LAN dengan Crossover dan Straight
                        Through, Subnetting, Routing, Switching, Wireless)
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

export default EducationPage;
