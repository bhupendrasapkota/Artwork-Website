import { useEffect, useState } from "react";
import { fetchRecentPosts } from "../../../../Hooks/api/api"; // Ensure correct path

const About_recent = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const loadRecentPosts = async () => {
      const posts = await fetchRecentPosts();
      setRecentPosts(posts);
    };

    loadRecentPosts();
  }, []);

  return (
    <section>
      {/* Main Content Section */}
      <div className="flex-grow grid grid-row-3 gap-6">
        {/* Recent Artworks Section */}
        <div className="border">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-4">
              Recent Artworks
            </h3>
          </div>
          <div className="flex flex-wrap m-2 gap-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <img
                  key={post.id}
                  src={post.image}
                  alt="Artwork"
                  className="w-24 h-24 rounded-md object-cover shadow-md"
                />
              ))
            ) : (
              <p className="text-gray-500">
                You have not posted any artworks yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About_recent;
