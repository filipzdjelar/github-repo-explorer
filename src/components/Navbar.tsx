import { useState } from "react";

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <h3>LOGO</h3>
      <nav className={isNavOpen ? "responsive_nav" : ""}>
        <a href="/#">Home</a>
        <a href="/#">My work</a>
        <a href="/#">Blog</a>
        <a href="/#">About me</a>
        <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
          &#x2715;
        </button>
      </nav>
      <button className="nav-btn" onClick={toggleNavbar}>
        &#x2630;
      </button>
    </header>
  );
};

export default Navbar;
