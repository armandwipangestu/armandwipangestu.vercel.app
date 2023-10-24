import { Poppins } from "next/font/google";
import Navigation from "./navigation";
import Footer from "./footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({ children }) => {
  return (
    <div className={poppins.className}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
