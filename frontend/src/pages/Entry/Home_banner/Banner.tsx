import videoData from "../../../Data/Bannervideo.json";

const Banner = () => {
  const videoSrc = videoData.bannerVideo;

  return (
    <section
      className="relative w-full"
      style={{ height: "clamp(600px, 45vw, 900px)" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center" />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-transparent p-4 font-mono text-white">
        <h1
          className="mb-2 uppercase bg-transparent"
          style={{ fontSize: "clamp(1.5rem, 3vw + 1rem, 3rem)" }} // Responsive font size for h1
        >
          Welcome to Our Artme
        </h1>
        <p
          className="mb-4 bg-transparent"
          style={{ fontSize: "clamp(1rem, 2vw + 0.5rem, 1.4rem)" }} // Responsive font size for p
        >
          Experience the best
        </p>
        <button
          className="group relative m-1 cursor-pointer overflow-hidden border-2 rounded-lg bg-white px-14 py-2 border-black hover:border-white"
          style={{
            fontSize: "clamp(1.5rem, 2vw + 0.25rem, 1rem)",
          }} // Responsive font size for button
        >
          <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-black transition-all duration-300 group-hover:h-64 group-hover:-translate-y-32"></span>
          <span className="ease relative text-slate-900 bg-transparent transition duration-300 group-hover:text-white">
            Explore
          </span>
        </button>
      </div>
    </section>
  );
};

export default Banner;
