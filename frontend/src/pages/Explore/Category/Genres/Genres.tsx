import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const Genres = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-80 space-y-5">
      <div className="topList">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between border w-full h-16 px-4"
        >
          <h1>Genres</h1>
          <FaArrowDown />
        </button>

        {/* Dropdown List */}
        <ul
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "h-50 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <li>
            <button className="flex items-center justify-between border w-full h-16 px-4">
              <h1>Recent Add</h1>
            </button>
          </li>
          <li>
            <button className="flex items-center justify-between border w-full h-16 px-4">
              <h1>Alphabetical - A to Z</h1>
            </button>
          </li>
          <li>
            <button className="flex items-center justify-between border w-full h-16 px-4">
              <h1>Alphabetical - Z to A</h1>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Genres;
