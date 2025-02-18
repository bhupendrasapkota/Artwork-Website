import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import genres from "../../../Data/genres.json";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom Arrow Buttons
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute flex items-center justify-center top-80 left-1/4  transform -translate-y-1/2 z-10 bg-black text-white p-2 h-5 w-96  shadow-md hover:bg-zinc-700"
    onClick={onClick}
  >
    <FaArrowLeft className="bg-transparent" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute flex items-center justify-center top-80  left-2/4 transform -translate-y-1/2 z-10 bg-black text-white  p-2 w-96 h-5  shadow-md hover:bg-zinc-700"
    onClick={onClick}
  >
    <FaArrowRight className="bg-transparent" />
  </button>
);

const Banner = () => {
  const settings = {
    dots: false, // Hide dots, but you can enable them if needed
    infinite: true, // Infinite loop scrolling
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of visible slides
    slidesToScroll: 1, // Number of slides to scroll per swipe
    autoplay: true,
    autoplaySpeed: 3000, // Auto-scroll every 3 seconds
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Adjust for mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="relative flex flex-col justify-center items-center text-black bg-white space-y-5 border-t border-black h-96  font-mono ">
      <div className="w-full flex items-center justify-between px-10 uppercase">
        <div className="text-lg">Genres</div>
        <div className="text-sm cursor-pointer">All Genres</div>
      </div>
      {/* Scrollable Wrapper */}
      <div className="w-full h-96 overflow-x-auto scrollbar-none">
        {/* Horizontal Scroll Menu */}
        <Slider {...settings} className="flex flex-nowrap justify-start items-center  cursor-pointer">
          {genres.map((genre, index) => (
            <div key={index} className="px-2">
              <div
                className="w-80 flex-shrink-0 border border-black hover:border-zinc-300 overflow-hidden"
                style={{
                  width: "clamp(200px, 25vw, 400px)", // Responsive width using clamp for small screens
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
                    {genre.items} Items
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
