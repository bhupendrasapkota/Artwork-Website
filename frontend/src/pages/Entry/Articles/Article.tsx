const Article = () => {
  return (
    <section className="relative flex justify-between items-center bg-black text-white p-10 h-auto">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col h-96 border border-neutral-600  items-center justify-center font-mono hover:border-white">
        <h1 className="text-[clamp(2rem,10vw,8rem)]">ARTWORK</h1>{" "}
        {/* Using clamp for responsive font size */}
        <h2 className="text-[clamp(1rem,5vw,2rem)]">SHOWCASE Me</h2>{" "}
        {/* Using clamp for responsive font size */}
        <p className="text-sm mt-6 text-[clamp(.2rem,3vw,1rem)]">
          FOR CREATIVE DESIGNERS
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center border border-neutral-600 hover:border-white w-2/4 h-96 font-mono px-8 md:px-48">
        <h2 className="text-[clamp(1.5rem,1vw,1rem)]">
          100+ Premium Art Mockups
        </h2>{" "}
        {/* Using clamp for responsive font size */}
        <p className="text-zinc-500 mt-2 text-xs">
          50+ Creative Art Mockups
        </p>{" "}
        {/* Consistent small text */}
        <div className="flex gap-4 mt-4 text-xs">
          <button
            className="border px-2 py-1 hover:text-black hover:bg-white hover:font-semibold"
            style={{ fontSize: "clamp(0.1rem, 1vw + 0.2rem, 1rem)" }} // Responsive font size for button
          >
            PORTFOLIO
          </button>
          <button
            className="border px-2 py-1 hover:text-black hover:bg-white hover:font-semibold"
            style={{ fontSize: "clamp(0.1rem, 1vw + 0.2rem, 1rem)" }} // Responsive font size for button
          >
            CONTACT
          </button>
        </div>
      </div>
    </section>
  );
};

export default Article;
