import Artist from "./Artists/Artist";
import Genres from "./Genres/Genres";
import Sortby from "./SortBy/Sortby";

const Category = () => {
  return (
    <section className="bg-white text-black border border-zinc-700 flex flex-col h-auto w-auto p-5 font-mono space-y-16">
      <Sortby />
      <div className="space-y-1">
        <Genres />
        <Artist />
      </div>
    </section>
  );
};

export default Category;
