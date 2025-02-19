import React from 'react'
import { Link } from "react-router-dom";

const Inup = () => {
  return (
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
  );
}

export default Inup