import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { fetchUserPosts } from "../../../Hooks/api/api";
import { FaHeart } from "react-icons/fa";

const Postedpictures = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const userPosts = await fetchUserPosts();
        setPosts(Array.isArray(userPosts) ? userPosts : []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  if (loading) return <p className="text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4 p-10"
      columnClassName="masonry-column space-y-4"
    >
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="relative overflow-hidden shadow-lg group"
          >
            <img
              src={
                post.image?.startsWith("http")
                  ? post.image
                  : `http://127.0.0.1:8000${post.image}`
              }
              alt={post.description || "Post Image"}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-white p-2 shadow-md flex items-center justify-center gap-1 rounded">
              <FaHeart className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              <span className="text-sm">{post.likes_count ?? 0}</span>
            </div>
            {post.description && (
              <p className="absolute bottom-1 left-3 bg-black bg-opacity-50 text-white text-sm p-2 rounded">
                {post.description}
              </p>
            )}
          </div>
        ))
      )}
    </Masonry>
  );
};

export default Postedpictures;
