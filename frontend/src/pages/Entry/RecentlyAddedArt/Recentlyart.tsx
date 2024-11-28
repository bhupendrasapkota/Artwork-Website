import { Link } from "react-router-dom";
import genres from "../../../Data/genres.json";

const Recentlyart = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-black bg-white space-y-5 py-8 px-2 font-mono">
      <div className="w-full flex items-center justify-between px-10 py-2 uppercase">
        <div className="text-lg">recents</div>
        <div className="text-sm cursor-pointer">view all</div>
      </div>

      {/* Scrollable Wrapper */}
      <div className="w-full overflow-x-auto scrollbar-none">
        {/* Horizontal Scroll Menu with padding on the x-axis */}
        <div className="flex flex-nowrap justify-start items-center space-x-4 px-4 cursor-pointer">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="w-64 flex-shrink-0 border border-black overflow-hidden hover:border-zinc-300"
              style={{
                width: "250px", // Fixed width to match image layout
              }}
            >
              <div className="relative">
                <img
                  src={genre.image}
                  alt={`${genre.title} genre`}
                  className="w-full h-64 object-cover border-b border-b-black"
                />
              </div>

              <div className="p-3 border-t border-t-black">
                <h2 className="text-lg">
                  <Link to="/">{genre.title}</Link>
                </h2>
                <h3 className="text-zinc-400 text-sm">{genre.games} Items</h3>
                <div className="flex gap-2 mt-2 text-xs">
                  <button className="border border-black px-2 py-1 hover:text-white hover:bg-black hover:font-semibold">
                    PORTFOLIO
                  </button>
                  <button className="border border-black px-2 py-1 hover:text-white hover:bg-black hover:font-semibold">
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
