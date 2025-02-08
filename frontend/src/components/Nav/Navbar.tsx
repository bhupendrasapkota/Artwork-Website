import { Link } from "react-router-dom";
import { useState } from "react";

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
    <>
      <header
        className="fixed top-0 w-full bg-white text-white flex items-center border-b border-b-black z-50"
        style={{
          height: "clamp(4rem, 6vw, 6rem)", // Responsive height
          padding: "clamp(1rem, 2vw, 2rem)", // Responsive padding
        }}
      >
        <div className="flex items-center justify-between w-full pr-4 md:pr-10">
          <div className="flex items-center">
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
          <div className="flex items-center space-x-4 sm:space-x-1">
            <div
              className="flex items-center justify-center"
              style={{
                width: "clamp(2rem, 3vw, 3rem)", // Icon container width
                height: "clamp(2rem, 3vw, 3rem)", // Icon container height
              }}
            >
              <svg
                className="text-black transition-transform duration-200 ease-in-out transform hover:rotate-180 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24.5"
                stroke="currentColor"
                onClick={toggleSearchBar}
                style={{
                  width: "clamp(1.25rem, 2vw, 2rem)", // Icon width
                  height: "clamp(1.25rem, 2vw, 2rem)", // Icon height
                }}
                aria-label="Search" // Adding aria-label for accessibility
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="16.5"
                  y1="16.5"
                  x2="22"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="button">
              <Link to="/login">
                <button
                  className="group relative m-1 cursor-pointer overflow-hidden rounded-2xl border-2 bg-black px-7 py-2"
                  style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 1rem)" }}
                >
                  <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-white transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32"></span>
                  <span className="ease relative text-white bg-transparent transition duration-300 group-hover:text-black">
                    Log in / Sign up
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Search Bar */}
      <div
        className="z-40 fixed  flex items-start justify-start flex-col  bg-zinc-200  left-0 right-0 transition-transform px-4 md:px-10"
        style={{
          height: "clamp(6rem, 20vw,80rem)", // Responsive height
          transform: `translateY(${
            isSearchBarVisible ? "clamp(4rem, 6vw, 6rem)" : "-100%"
          })`, // Responsive translate-y
        }}
      >
        <input
          type="text"
          placeholder="Search Me"
          className="w-full p-2 text-zinc-500 focus:text-black border-b-2 bg-transparent border-b-zinc-500 focus:outline-none focus:border-black"
          style={{
            fontSize: "clamp(1rem, 3vw, 4rem)", // Responsive font size
            fontWeight: "300", // Lighter font weight for a minimal look
          }}
          aria-label="Search input" // Adding aria-label for accessibility
        />
        <div className="h-full w-full flex items-start justify-end bg-transparent">
          <button
            className=" text-white bg-black py-2 px-4"
            style={{
              fontSize: "clamp(1rem, 3vw, 4rem)", // Responsive font size
              fontWeight: "300", // Lighter font weight for a minimal look
            }}
            onClick={toggleSearchBar}
          >
            Magic
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
