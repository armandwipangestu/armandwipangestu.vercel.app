import React, { useState, useEffect } from "react";
import { Moon, Sun } from "../utilities/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const pathName = usePathname();

  const handleDarkMode = () => {
    const currentTheme = !darkMode;
    setDarkMode(currentTheme);
    localStorage.setItem("dark-mode", currentTheme);
  };

  const hamburgerToggle = () => {
    setHamburger(!hamburger);
  };

  useEffect(() => {
    const html = document.querySelector("html");
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("dark-mode");
    storedTheme !== null ? setDarkMode(storedTheme === "true") : "";

    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQuery = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaQuery);

    const handleScroll = () => {
      const header = document.querySelector("header");
      const fixedNav = header.offsetTop;

      window.pageYOffset > fixedNav ? setNavbar(true) : setNavbar(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuery);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menus = [
    { title: "Beranda", target: "/" },
    { title: "Tentang Saya", target: "/about" },
    { title: "Portofolio", target: "/portofolio" },
    { title: "Skills", target: "/skills" },
    { title: "Pendidikan", target: "/pendidikan" },
    { title: "Pengalaman", target: "/pengalaman" },
    { title: "Blog", target: "/blog" },
  ];

  return (
    <header
      className={`navbar-fixed fixed top-0 z-10 w-full items-center border-b border-white/10 bg-transparent transition-all duration-300 ease-in-out`}
    >
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <Link
              href="/"
              className="block py-5 text-lg font-bold lowercase text-primary"
            >
              &{">"} /dev/null
            </Link>
          </div>

          <div className="flex items-center px-4">
            <button
              id="hamburger"
              name="hamburger"
              type="button"
              className={`absolute right-4 block lg:hidden ${
                hamburger ? "hamburger-active" : ""
              }`}
              onClick={hamburgerToggle}
            >
              <span className="hamburger-line origin-top-left transition duration-300 ease-in-out"></span>
              <span className="hamburger-line transition duration-300 ease-in-out"></span>
              <span className="hamburger-line origin-bottom-left transition duration-300 ease-in-out"></span>
            </button>

            {isMobile ? (
              <div className="absolute right-16 flex">
                <label
                  htmlFor="dark-toggle"
                  className="cursor-pointer"
                  onClick={handleDarkMode}
                >
                  <div
                    className={`toggle-icon rounded-full p-1 ${
                      darkMode
                        ? "dark hover:bg-accents-200"
                        : "light hover:bg-emphasis-200"
                    }`}
                  >
                    {darkMode ? (
                      <Sun className="transition duration-300 ease-in-out dark:text-white" />
                    ) : (
                      <Moon className="transition duration-300 ease-in-out text-dark" />
                    )}
                  </div>
                </label>
              </div>
            ) : (
              ""
            )}

            <nav
              className={`${
                hamburger ? "mt-1 transition duration-300" : "hidden"
              } ${
                isMobile ? "border dark:border-white dark:bg-dark z-[9999]" : ""
              } absolute right-0 top-full w-full max-w-full rounded-lg bg-white py-5 shadow-lg lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none`}
            >
              <ul className="block lg:flex">
                {menus.map((menu, index) => (
                  <Link
                    href={menu.target}
                    className={`group mx-2 ${
                      isMobile ? "my-2" : ""
                    } flex cursor-pointer rounded-full px-4 py-2 text-base text-accents-300 transition duration-300 hover:bg-blue-200/60 hover:text-cyan-600 dark:text-slate-400 hover:dark:bg-cyan-300/20 hover:dark:text-cyan-600 ${
                      pathName === menu.target
                        ? "bg-cyan-200/60 text-cyan-600 dark:bg-cyan-300/30 dark:text-cyan-600"
                        : ""
                    }`}
                    key={index}
                  >
                    <li>{menu.title}</li>
                  </Link>
                ))}
                {!isMobile ? (
                  <li className="mt-3 flex items-center pl-7 lg:mt-0 lg:pl-5">
                    <div className="flex">
                      <label
                        htmlFor="dark-toggle"
                        className="cursor-pointer"
                        onClick={handleDarkMode}
                      >
                        <div
                          className={`toggle-icon rounded-full p-1 ${
                            darkMode
                              ? "dark hover:bg-accents-200"
                              : "light hover:bg-emphasis-200"
                          }`}
                        >
                          {darkMode ? (
                            <Sun className="transition duration-300 ease-in-out dark:text-slate-400" />
                          ) : (
                            <Moon className="transition duration-300 ease-in-out text-dark" />
                          )}
                        </div>
                      </label>
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
