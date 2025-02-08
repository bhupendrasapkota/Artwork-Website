import { useState, useEffect } from "react";
import images from "../../../Data/Banner.json";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen pt-24 overflow-hidden">
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img) => (
          <div key={img.id} className="w-full flex-shrink-0 relative">
            <img src={img.image} className="w-full h-full object-cover" alt={`Slide ${img.id}`} />
            <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark Overlay */}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-5 bg-transparent">
        <button
          className="h-10 w-96 flex items-center justify-center bg-white rounded-md hover:bg-black group"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
        >
          <FaArrowLeft className="bg-transparent group-hover:text-white transition-colors duration-0" />
        </button>
        <button
          className="h-10 w-96 flex items-center justify-center bg-white rounded-md hover:bg-black group"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
        >
          <FaArrowRight className=" bg-transparent group-hover:text-white transition-colors duration-0" />
        </button>
      </div>
    </section>
  );
};

export default Banner;
