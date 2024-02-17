// import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "./navigation";
import Footer from "./footer";
import JumpToTop from "../utilities/JumpToTop";

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-poppins",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

const poppins = localFont({
  src: [
    {
      path: "../../pages/fonts/Poppins/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../pages/fonts/Poppins/Poppins-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../pages/fonts/Poppins/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../pages/fonts/Poppins/Poppins-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

const Layout = ({ children }) => {
  return (
    <div className={poppins.className}>
      <Navigation />
      <main>{children}</main>
      <JumpToTop />
      <Footer />
    </div>
  );
};

export default Layout;
