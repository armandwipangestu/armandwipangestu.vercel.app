import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const JumpToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-9 right-7 md:bottom-10 md:right-10 z-[999] transition-all duration-300 ${
          showButton ? "bottom-0 opacity-100" : "bottom-[-50px] opacity-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`block bg-black dark:bg-white py-3 px-3.5 text-lg hover:opacity-80 hover:shadow-lg rounded-full transition-transform duration-300 ${
            isHovered ? "transform translate-y-[-8px]" : ""
          }`}
          onClick={handleClick}
        >
          <FaArrowUp className="text-white dark:text-dark" />
        </button>
      </div>
    </>
  );
};

export default JumpToTop;
