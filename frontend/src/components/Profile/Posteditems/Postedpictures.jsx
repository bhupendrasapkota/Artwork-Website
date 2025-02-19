import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import api from "../../../Hooks/api/api";
import { FaHeart } from "react-icons/fa";

const Postedpictures = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        // Fetch logged-in user's info
        const userResponse = await api.get("/users/user-info/");
        const userId = userResponse.data.id; // Get user ID

        // Fetch posts for this user
        const response = await api.get(`/posts/all/?user_id=${userId}`);

        console.log("User ID:", userId);
        console.log("API Response:", response.data);

        if (Array.isArray(response.data.results)) {
          setPosts(response.data.results);
        } else {
          console.error("Unexpected response format:", response.data);
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4 p-10"
      columnClassName="masonry-column space-y-4"
    >
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="relative overflow-hidden shadow-lg group"
          >
            <img
              src={
                post.image.startsWith("http")
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
