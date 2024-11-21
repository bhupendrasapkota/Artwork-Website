import { Link } from "react-router-dom";
import genres from "../../../Data/genres.json";

const Recentlyart = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-white bg-black space-y-5 py-8 px-10">
      <div className="text-white w-full flex items-center justify-between px-10 py-2">
        <div className="font-mono uppercase text-lg text-white">recents</div>
        <div className="font-mono uppercase text-sm cursor-pointer text-white">
          view all
        </div>
      </div>

      {/* Scrollable Wrapper */}
      <div className="w-full overflow-x-auto scrollbar-none">
        {/* Horizontal Scroll Menu with padding on the x-axis */}
        <div className="flex flex-nowrap justify-start items-center space-x-4 px-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="bg-black w-64 flex-shrink-0 border border-gray-500 hover:border-white overflow-hidden"
              style={{
                width: "250px", // Fixed width to match image layout
              }}
            >
              <div className="relative">
                <img
                  src={genre.image}
                  alt={`${genre.title} genre`}
                  className="w-full h-64 object-cover border-b border-b-gray-500 hover:border-b-white"
                />
              </div>

              <div className="p-3 bg-black border-t border-t-gray-500 hover:border-t-white ">
                <h2 className="text-white text-lg font-mono">
                  <Link to="/">{genre.title}</Link>
                </h2>
                <h3 className="text-gray-400 text-sm font-mono">
                  {genre.games} Items
                </h3>
                <div className="flex gap-2 mt-2 text-xs">
                  <button className="border px-2 py-1 hover:text-black hover:bg-white hover:font-semibold">
                    PORTFOLIO
                  </button>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white hover:font-semibold">
                    CONTACT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recentlyart;
