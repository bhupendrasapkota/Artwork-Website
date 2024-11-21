import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
const Sortby = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="w-80 space-y-5">
      <h1 className="text-2xl">Sort By</h1>
      <div className="topList">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between border w-full h-16 px-4"
        >
          <h1>Most Popular</h1>
          <FaArrowDown />
        </button>

        {/* Dropdown List */}
        <ul
          className={`transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
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

export default Sortby;
