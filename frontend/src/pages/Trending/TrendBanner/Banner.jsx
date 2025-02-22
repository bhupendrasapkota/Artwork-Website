import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../Hooks/api/api"; // Import API function

// Custom Arrow Buttons
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute flex items-center justify-center top-80 left-0 transform -translate-y-1/2 z-10 bg-black text-white p-2 h-10 w-20 shadow-md hover:bg-zinc-700"
    onClick={onClick}
  >
    <FaArrowLeft className="bg-transparent" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute flex items-center justify-center top-80 right-0 transform -translate-y-1/2 z-10 bg-black text-white p-2 w-20 h-10 shadow-md hover:bg-zinc-700"
    onClick={onClick}
  >
    <FaArrowRight className="bg-transparent" />
  </button>
);

const Banner = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="relative flex flex-col justify-center items-center text-black border-t border-black h-auto font-mono">
      <div className="w-full h-12 flex items-center justify-center px-10 uppercase">
        <div className="text-3xl">Trending</div>
      </div>
      <div className="w-full h-96 overflow-x-auto scrollbar-none">
        <Slider
          {...settings}
          className="flex flex-nowrap justify-start items-center cursor-pointer"
        >
          {categories.map((category, index) => (
            <div key={index} className="px-2">
              <div
                className="w-80 flex-shrink-0 border border-black hover:border-zinc-300 overflow-hidden"
                style={{ width: "clamp(200px, 25vw, 400px)" }} // Responsive width using clamp
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
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
