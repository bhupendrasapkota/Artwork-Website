const Banner = () => {
  return (
    <section className="relative border-b border-zinc-700 font-mono text-white">
      <div
        className="h-72 p-2 flex flex-col items-start justify-center px-14 space-y-3"
        style={{
          backgroundImage: 'url("./images/photos/nothing/ExploreBanner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black  opacity-70"></div>
        <h2 className="text-5xl relative z-10 bg-transparent">Trending</h2>
        <p className="text-sm relative z-10 bg-transparent">
          Suggests a diverse exploration of different art styles, mediums, and
          genres.
        </p>
      </div>
    </section>
  );
};

export default Banner;
