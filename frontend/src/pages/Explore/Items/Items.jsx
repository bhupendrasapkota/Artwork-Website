import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import api from "../../../Hooks/api/api";
import { FaHeart, FaDownload } from "react-icons/fa";  

const Items = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/all/")
      .then((response) => {
        console.log("API Response:", response.data.results);

        if (response.data && Array.isArray(response.data.results)) {
          setPosts(response.data.results);
        } else {
          console.error("Unexpected response format:", response.data);
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      });
  }, []);

  const breakpointColumns = {
    default: 4,  
    1100: 3,    
    768: 2,      
    500: 1,     
  };

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = imageUrl.split("/").pop() || "download.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4 p-10"
      columnClassName="masonry-column space-y-4"
    >
      {posts.map((post) => (
        <div key={post.id} className="relative overflow-hidden shadow-lg group">
          <img
            src={`http://127.0.0.1:8000${post.image}`} 
            alt={post.description || "Post Image"}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Displaying the Username and Profile Picture */}
          <div className="absolute bottom-5 bg-transparent left-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img
              src={`http://127.0.0.1:8000${post.profile_picture}`} 
              alt={post.user} 
              className="w-10 h-10 rounded-full  object-cover"
            />
            <div className="flex flex-col items-start justify-start bg-transparent">
              <span className="text-white bg-transparent text-lg font-sans">{post.user}</span>
              <span className="text-white bg-transparent text-sm">{post.description}</span>
            </div>
          </div>
          <div className=" text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="space-x-1">
            <div className="absolute top-3 left-72 p-2 flex items-center justify-center rounded bg-white">
            <FaHeart className=" w-4 h-4" />
          </div>
          <div className="absolute top-3 left-80 p-2 flex items-center justify-center rounded bg-white">
            <FaHeart className=" w-4 h-4" />
          </div>
            </div>

          <button
            onClick={() => downloadImage(`http://127.0.0.1:8000${post.image}`)}
            className="absolute bottom-6 left-80 text-xs p-2 rounded flex items-center bg-white"
          >
            <FaDownload className="w-4 h-4 bg-transparent"/>
          </button>
          </div>

        </div>
      ))}
    </Masonry>
  );
};

export default Items;
