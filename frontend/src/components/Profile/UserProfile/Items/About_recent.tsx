const About_recent = () => {
  return (
    <section>
      {/* Main Content Section */}
      <div className="flex-grow grid grid-cols-3 gap-6">

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
      </div>
    </section>
  );
};

export default About_recent;
