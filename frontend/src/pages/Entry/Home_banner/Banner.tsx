import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import imageData from "../../../Data/Banner.json";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!imageData || imageData.length === 0) {
      console.error("No image data available.");
    }
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  if (!imageData || imageData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="relative flex flex-col items-center justify-center bg-black pt-24 font-mono border-b border-zinc-700"
      style={{
        height: "clamp(650px, 20vw, 900px)",
        backgroundImage: `url(${imageData[currentIndex].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative flex flex-col lg:flex-row items-center bg-white rounded shadow-black p-4 lg:p-6 w-11/12 lg:w-5/6 max-w-6xl space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] overflow-hidden">
            <img
              src={imageData[currentIndex].src}
              alt={imageData[currentIndex].name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
          <div className="uppercase flex flex-col items-center justify-center text-3xl sm:text-4xl md:text-5xl font-serif">
            <h1 className="text-clamp text-center leading-tight">Feel</h1>
            <h1 className="text-clamp text-center leading-tight">the</h1>
            <h1 className="text-clamp text-center leading-tight">nature</h1>
          </div>

          <div>
            <h2 className="text-sm sm:text-lg md:text-xl text-gray-800 mb-2 lg:mb-4 text-center">
              {imageData[currentIndex].name}
            </h2>

            {/* Progress Bar */}
            <div className="flex flex-col md:flex-row items-center mt-2 lg:mt-4 space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex items-center text-xs sm:text-sm md:text-base font-medium text-gray-500">
                {imageData.map((_, index) => (
                  <span
                    key={index}
                    className={`mr-1 ${
                      index === currentIndex
                        ? "text-black font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                ))}
              </div>

              <div className="relative flex-grow h-1 bg-gray-300 rounded">
                <div
                  className="absolute top-0 left-0 h-1 bg-black rounded transition-all duration-500 ease-in-out"
                  style={{
                    width: `${((currentIndex + 1) / imageData.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center md:justify-end mt-4 lg:mt-6 space-x-4">
              <button
                onClick={prevImage}
                className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-zinc-300 rounded-full hover:bg-black"
              >
                <FaArrowLeft className="text-gray-600 bg-transparent group-hover:text-white" />
              </button>
              <button
                onClick={nextImage}
                className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-zinc-300 rounded-full hover:bg-black"
              >
                <FaArrowRight className="text-gray-600 bg-transparent group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
