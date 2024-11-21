import { Link } from "react-router-dom";
import genres from "../../../Data/genres.json";
const Items = () => {
  return (
    <div className="flex flex-wrap justify-start items-center gap-5">
      {genres.map((genre, index) => (
        <div
          key={index}
          className="bg-black border border-gray-500 hover:border-white overflow-hidden"
          style={{
            width: "clamp(250px, 25vw, 400px)", // Increased width for larger cards
          }}
        >
          <div className="relative">
            <img
              src={genre.image}
              alt={`${genre.title} genre`}
              className="w-full h-60 object-cover border-b border-b-gray-500 hover:border-b-white"
            />
          </div>
          <div className="p-4 bg-black border-t border-t-gray-500 hover:border-t-white">
            <h2 className="text-white text-xl font-mono text-[clamp(1rem,2.5vw,1.25rem)]">
              <Link to="/">{genre.title}</Link>
            </h2>
            <h3 className="text-gray-400 text-md font-mono">
              {genre.games} Items
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
