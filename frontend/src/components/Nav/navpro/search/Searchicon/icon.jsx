import React from "react";

const Icon = ({ toggleSearchBar }) => {
  return (
    <div
      className="flex items-center justify-center bg-black"
      style={{
        width: "clamp(2rem, 3vw, 3rem)", // Icon container width
        height: "clamp(2rem, 3vw, 3rem)", // Icon container height
      }}
    >
      <svg
        className="text-white bg-black transition-transform duration-200 ease-in-out transform hover:rotate-180 cursor-pointer"
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
  );
};

export default Icon;
