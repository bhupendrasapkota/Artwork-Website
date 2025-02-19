import { useEffect, useRef } from "react";
import Searchitem from "../../../Functional/Searching/Inputsearch";

const Search = ({ toggleSearchBar, isSearchBarVisible }) => {
  const searchRef = useRef();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchBarVisible]);

  return (
    <div
      className={`z-40 fixed w-full bg-zinc-200 left-0 right-0 transition-all duration-300 ease-in-out px-4 md:px-10`}
      style={{
        top: "auto", // Prevent it from affecting the navbar's position
        transform: `translateY(${
          isSearchBarVisible ? "clamp(4rem, 6vw, 6rem)" : "-100%" // Slide down completely off-screen when not visible
        })`,
        height: "clamp(6rem, 20vw, 80rem)", // Responsive height
      }}
    >
      <Searchitem toggleSearchBar={toggleSearchBar} />
    </div>
  );
};

export default Search;
