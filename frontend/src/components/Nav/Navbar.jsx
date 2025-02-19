// Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import Change from "./navpro/Change";
import Search from "./navpro/search/Search"; // Import the Search component
import Icon from "./navpro/search/Searchicon/icon"; // Import the Icon component

const Navbar = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleLogoClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
  };

  const navLinks = [
    { to: "/Explore", label: "Explore" },
    { to: "/trending", label: "Trending" },
    { to: "/feed", label: "Feed" },
    { to: "/download", label: "Download" },
  ];

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <li key={link.label}>
        <Link
          to={link.to}
          className="no-underline text-black hover:text-zinc-500"
          style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 1rem)" }}
          aria-label={link.label} // Adding aria-label for accessibility
        >
          {link.label}
        </Link>
      </li>
    ));

  return (
    <section>
      <div
        className="fixed top-0 w-full bg-white text-white flex items-center border-b border-b-black z-50"
        style={{
          height: "clamp(4rem, 6vw, 6rem)",
          padding: "clamp(1rem, 2vw, 2rem)",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="lonav flex items-center">
            <Link to="/" onClick={handleLogoClick} aria-label="Home">
              <img
                src="./images/Logo/Logo.svg"
                alt="Logo"
                className={`object-cover h-auto bg-transparent ${
                  isAnimating ? "animate-rotateSpin" : ""
                }`}
                style={{
                  height: "clamp(2.5rem, 4vw, 4rem)", // Logo height responsive
                  width: "clamp(3rem, 5vw, 5rem)", // Logo width responsive
                }}
              />
            </Link>
            <nav
              className="hidden md:flex ml-4"
              style={{ fontSize: "clamp(0.75rem, 1vw + 0.5rem, 1.25rem)" }}
            >
              <ul className="flex space-x-4 font-mono uppercase">
                {renderNavLinks()}
              </ul>
            </nav>
          </div>
          <div className="flex items-center justify-end sm:space-x-1">
            <Change />
          </div>
        </div>
      </div>

      <div className="fixed right-0 top-24 z-40">
        <Icon toggleSearchBar={toggleSearchBar} />
      </div>
      <Search
        toggleSearchBar={toggleSearchBar}
        isSearchBarVisible={isSearchBarVisible}
      />
    </section>
  );
};

export default Navbar;
