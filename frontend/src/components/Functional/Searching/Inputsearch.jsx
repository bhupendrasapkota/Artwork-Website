import React from "react";

const Inputsearch = ({toggleSearchBar}) => {
  return (
    <section>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Me"
        autoComplete="off"
        className="w-full p-2 text-zinc-500 focus:text-black border-b-2 bg-transparent border-b-zinc-500 focus:outline-none focus:border-black"
        style={{
          fontSize: "clamp(1rem, 3vw, 4rem)", // Responsive font size
          fontWeight: "300", // Lighter font weight for a minimal look
        }}
        aria-label="Search input"
      />

      <div className="w-full flex justify-end bg-transparent">
        <button
          className="text-white bg-black py-2 px-4"
          style={{
            fontSize: "clamp(1rem, 3vw, 4rem)", // Responsive font size
            fontWeight: "300", // Lighter font weight for a minimal look
          }}
          onClick={toggleSearchBar} // Close the search bar
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default Inputsearch;
