import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const links = [
    { name: "React", link: "/react" },
    { name: "Angular", link: "/angular" },
    { name: "Vue", link: "/vue" },
  ];

  const toggleNavbar = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  const handleLinkClick = () => {
    if (isNavOpen === false) return;
    setIsNavOpen(false);
  };

  return (
    <header className="header">
      <Link to={"/"}>REPO EXPLORER</Link>
      <nav className={isNavOpen ? "responsive_nav" : ""}>
        {links.map((link) => (
          <Link
            key={link.name}
            to={`${link.link}`}
            onClick={handleLinkClick}
            className="nav-link"
          >
            {link.name}
          </Link>
        ))}

        <button
          className="nav-btn nav-close-btn"
          onClick={toggleNavbar}
          aria-label="Close navigation menu"
        >
          &#x2715;
        </button>
      </nav>
      <button
        className="nav-btn"
        onClick={toggleNavbar}
        aria-label="Open navigation menu"
      >
        &#x2630;
      </button>
    </header>
  );
};

export default Navbar;
