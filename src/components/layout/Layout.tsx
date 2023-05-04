import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ToastBar from "../common/ToastBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ToastBar />
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
