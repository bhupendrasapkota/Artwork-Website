import Banner from "./Home_banner/Banner";
import Article from "./Articles/Article";
import Recent from "./Recents/Recent";
import Recently from "./RecentlyAddedArt/Recentlyart";

const Home = () => {
  return (
    <div className="bg-black h-full flex flex-col overflow-y-auto">
      <Banner />
      <Article />
      <Recent />
      <Recently />
    </div>
  );
};

export default Home;
