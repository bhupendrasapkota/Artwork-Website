import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import api from "../../../Hooks/api/api";
import { FaHeart } from "react-icons/fa";

interface Post {
  id: number;
  image: string;
  description: string | null;
  likes_count: number;
}

const Postedpictures: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/user/")
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

  // Define column breakpoints for responsiveness
  const breakpointColumns = {
    default: 4,  
    1100: 3,    
    768: 2,      
    500: 1,     
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4 p-10"
      columnClassName="masonry-column space-y-4"
    >
      {posts.map((post) => (
        <div key={post.id} className="relative overflow-hidden shadow-lg group">
          {/* Image */}
          <img
            src={`http://127.0.0.1:8000${post.image}`} 
            alt={post.description || "Post Image"}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Like Button + Like Count (Top Right) */}
          <div className="absolute top-3 right-3 bg-transparent p-2 shadow-md flex items-center justify-center gap-1 rounded group-hover:bg-white">
            <FaHeart className="text-transparent bg-transparent w-5 h-5 group-hover:text-black" />
            <span className="text-transparent bg-transparent text-sm group-hover:text-black">{post.likes_count ?? 0}</span>
          </div>
          {/* Description (Bottom Left) */}
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
export default Postedpictures;