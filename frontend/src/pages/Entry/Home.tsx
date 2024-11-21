import Banner from "./Home_banner/Banner";
import Genre from "./Genres/Genre";
import Article from "./Articles/Article";
import Recent from "./Recents/Recent";
import Recently from "./RecentlyAddedArt/Recentlyart";

const Home = () => {
  return (
    <div className="bg-red-400 h-full flex flex-col overflow-y-auto">
      <Banner />
      <Genre />
      <Article />
      <Recent />
      <Recently />
    </div>
  );
};

export default Home;
