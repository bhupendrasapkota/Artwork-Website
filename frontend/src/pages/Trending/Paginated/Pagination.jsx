import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { fetchMostLikedPosts } from "../../../Hooks/api/api"; // Import API function
import { FaHeart, FaDownload, FaPlus } from "react-icons/fa";

const Pagination = () => {
  const [mostLikedPosts, setMostLikedPosts] = useState([]);

  useEffect(() => {
    const loadMostLikedPosts = async () => {
      const data = await fetchMostLikedPosts();
      setMostLikedPosts(data);
    };

    loadMostLikedPosts();
  }, []);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = imageUrl.split("/").pop() || "download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4"
      columnClassName="masonry-column space-y-4"
    >
      {mostLikedPosts.map((post) => (
        <div key={post.id} className="relative overflow-hidden shadow-lg group">
          <img
            src={`http://127.0.0.1:8000${post.image}`}
            alt={post.description || "Post Image"}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Displaying the Username and Profile Picture */}
          <div className="absolute bottom-5 left-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              src={`http://127.0.0.1:8000${post.profile_picture}`}
              alt={post.user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col items-start">
              <span className="text-white text-lg font-sans">{post.user}</span>
              <span className="text-white text-sm">{post.description}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-3 right-3 space-x-2 flex">
              <div className="p-2 flex items-center justify-center rounded bg-white shadow">
                <FaHeart className="w-4 h-4 text-red-500" />
              </div>
              <div className="p-2 flex items-center justify-center rounded bg-white shadow">
                <FaPlus className="w-4 h-4 text-black" />
              </div>
            </div>

            <button
              onClick={() =>
                downloadImage(`http://127.0.0.1:8000${post.image}`)
              }
              className="absolute bottom-3 right-3 p-2 rounded flex items-center bg-white shadow"
            >
              <FaDownload className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default Pagination;
