const About_recent = () => {
  return (
    <section>
      {/* Main Content Section */}
      <div className="flex-grow grid grid-cols-3 gap-6">
        {/* About Section */}
        <div className="border">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-4">
            About Me
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            I am a passionate artist exploring the boundaries of creativity. My
            work blends modern styles with traditional techniques to tell unique
            stories through visual art.
          </p>
        </div>

        {/* Recent Artworks Section */}
        <div className="border">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-4">
            Recent Artworks
          </h3>
          <div className="flex flex-wrap m-2 gap-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 1"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 2"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 3"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 4"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 4"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 4"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 4"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Artwork 4"
              className="w-24 h-24 rounded-md object-cover shadow-md"
            />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-4">
            Connect
          </h3>
          <div className="m-3 space-y-3">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-zinc-600 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🌐</span> Portfolio
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-zinc-600 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📸</span> Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-zinc-600 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🐦</span> Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About_recent;
