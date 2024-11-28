import { Link } from "react-router-dom";
import genres from "../../../Data/genres.json";

const Genre = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-black bg-white space-y-5 border-t border-black py-8 px-2 font-mono">
      <div className="w-full flex items-center justify-between px-10 py-2 uppercase">
        <div className="text-lg">Genres</div>
        <div className="text-sm cursor-pointer">All Genres</div>
      </div>

      {/* Scrollable Wrapper */}
      <div className="w-full overflow-x-auto scrollbar-none rounded-sm">
        {/* Horizontal Scroll Menu with padding on the x-axis */}
        <div className="flex flex-nowrap justify-start items-center space-x-2 cursor-pointer">
          {" "}
          {/* Add px-5 for horizontal padding */}
          {genres.map((genre, index) => (
            <div
              key={index}
              className="w-80 flex-shrink-0 border border-black hover:border-zinc-300 overflow-hidden"
              style={{
                width: "clamp(200px, 20vw, 320px)", // Responsive width using clamp for small screens
              }}
            >
              <div className="relative">
                <img
                  src={genre.image}
                  alt={`${genre.title} genre`}
                  className="w-full h-42 object-cover border-b border-b-black"
                />
              </div>

              <div className="p-3 border-t border-t-black">
                <h2 className="text-lg text-[clamp(.9rem,2vw,1rem)]">
                  <Link to="/">{genre.title}</Link>
                </h2>
                <h3 className="text-gray-600 text-sm text-[clamp(1rem)]">
                  {genre.games} Items
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genre;
