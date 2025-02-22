import { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/posts/all/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPosts(response.data.results); // Adjust based on API response structure
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="bg-white text-black p-4">
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded-lg shadow">
            <h3 className="font-bold">{post.user}</h3>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-60 object-cover mt-2"
            />
            <p className="mt-2">{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
