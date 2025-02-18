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

          <div className="absolute top-3 left-80 bg-transparent p-2 flex items-center justify-center rounded group-hover:bg-white">
            <FaHeart className="text-transparent bg-transparent w-4 h-4 group-hover:text-black" />
          </div>

          <button
            onClick={() => downloadImage(`http://127.0.0.1:8000${post.image}`)}
            className="absolute bottom-3 left-80 bg-transparent text-transparent text-xs p-2 rounded flex items-center group-hover:text-black group-hover:bg-white"
          >
            <FaDownload className="w-4 h-4 bg-transparent"/>
          </button>

          {post.description && (
            <p className="absolute bottom-1 left-3 bg-transparent font-extralight text-transparent text-sm p-2 rounded group-hover:text-white">
              {post.description}
            </p>
          )}
        </div>
      ))}
    </Masonry>
  );
};

export default Items;
