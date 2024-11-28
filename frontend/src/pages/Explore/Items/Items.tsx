import { Link } from "react-router-dom";
import genres from "../../../Data/genres.json";
const Items = () => {
  return (
    <div className="flex flex-wrap justify-start items-center gap-5 text-black bg-white font-mono">
      {genres.map((genre, index) => (
        <div
          key={index}
          className="border border-black hover:border-zinc-300 overflow-hidden"
          style={{
            width: "clamp(250px, 25vw, 400px)", // Increased width for larger cards
          }}
        >
          <div className="relative">
            <img
              src={genre.image}
              alt={`${genre.title} genre`}
              className="w-full h-60 object-cover border-b border-b-black"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl text-[clamp(1rem,2.5vw,1.25rem)]">
              <Link to="/">{genre.title}</Link>
            </h2>
            <h3 className="text-gray-500 text-md">
              {genre.games} Items
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
