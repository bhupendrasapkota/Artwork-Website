import { Link } from "react-router-dom";
import genres from "../../../Data/genres.json";

const Recent = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-white bg-black space-y-5 py-8 px-10">
      <div className="text-white w-full flex items-center justify-between px-10 py-2">
        <div className="font-mono uppercase text-lg text-white">Recents</div>
        <div className="font-mono uppercase text-sm cursor-pointer text-white">
          All Articles
        </div>
      </div>

      {/* Scrollable Wrapper */}
      <div className="w-full overflow-x-auto scrollbar-none rounded-sm">
        {/* Horizontal Scroll Menu with padding on the x-axis */}
        <div className="flex flex-nowrap justify-start items-center space-x-2">
          {/* Add px-5 for horizontal padding */}
          {genres.map((genre, index) => (
            <div
              key={index}
              className="bg-black w-96 flex-shrink-0 border border-gray-500 hover:border-white overflow-hidden"
              style={{
                width: "clamp(250px, 25vw, 400px)", // Increase max width for larger screens
              }}
            >
              <div className="relative">
                <img
                  src={genre.image}
                  alt={`${genre.title} genre`}
                  className="w-full h-42 object-cover border-b border-b-gray-500 hover:border-b-white"
                />
              </div>

              <div className="p-3 bg-black border-t border-t-gray-500 hover:border-t-white ">
                <h2 className="text-white text-lg font-mono text-[clamp(.9rem,2vw,1rem)]">
                  <Link to="/">{genre.title}</Link>
                </h2>
                <h3 className="text-gray-400 text-sm font-mono text-[clamp(1rem)]">
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

export default Recent;
