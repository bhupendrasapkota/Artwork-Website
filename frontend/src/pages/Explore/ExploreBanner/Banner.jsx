import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../../Hooks/api/api";

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

  // Fetch categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/posts/categories/");
        setCategories(response.data.categories); // Store fetched categories in state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="relative flex flex-col justify-center items-center text-black space-y-5 border-t border-black h-auto font-mono">
      <div className="w-full flex items-center justify-between px-10 uppercase">
        <div className="text-lg">Genres</div>
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
                style={{
                  width: "clamp(200px, 25vw, 400px)", // Responsive width using clamp
                }}
              >
                <div className="relative">
                  <img
                    src={category.image} // Corrected image reference
                    alt={`${category.name} genre`} // Corrected alt text
                    className="w-full h-50 object-cover border-b border-b-black"
                  />
                </div>
                <div className="p-3 border-t border-t-black">
                  <h2 className="text-lg text-[clamp(.9rem,2vw,1rem)]">
                    <Link to="/">{category.name}</Link>{" "}
                    {/* Corrected category reference */}
                  </h2>
                  <h3 className="text-gray-600 text-sm text-[clamp(1rem)]">
                    {category.post_count} Items{" "}
                    {/* Corrected category reference */}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <button
        className="absolute flex items-center justify-center top-80 z-10 bg-transparent text-black p-2 w-auto h-20"
      >
        <h1 className="text-2xl">
          Hello Everyone having fun dfvdvdsnfdv nokfdnvodfvnofvn ovndfovndfovnfvoenfv  niovnfovnfdv onvovnofd
        </h1>
      </button>
    </section>
  );
};

export default Banner;
