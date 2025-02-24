import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../Hooks/api/api"; // Import API function

const Items = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center text-black border-t border-black h-auto font-mono pt-2">
      <div className="w-full h-auto overflow-x-auto scrollbar-none flex flex-wrap justify-center gap-y-4">
        {categories.map((category, index) => (
          <div key={index} className="px-2">
            <div
              className="w-80 flex-shrink-0 border border-black hover:border-zinc-300 overflow-hidden"
              style={{
                width: "clamp(200px, 25vw, 400px)", // Responsive width
              }}
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={`${category.name} genre`}
                  className="w-full h-50 object-cover border-b border-b-black"
                />
              </div>
              <div className="p-3 border-t border-t-black">
                <h2 className="text-lg text-[clamp(.9rem,2vw,1rem)]">
                  <Link to="/">{category.name}</Link>
                </h2>
                <h3 className="text-gray-600 text-sm text-[clamp(1rem)]">
                  {category.post_count} Items
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Items;
