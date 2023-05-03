import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ToastBar from "./ToastBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ToastBar />
      <Navbar />
      <main className="main-container min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
