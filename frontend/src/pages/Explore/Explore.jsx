import Items from "./Items/Items";
import Banner from "./ExploreBanner/Banner";

const Explore = () => {
  return (
    <section className="pt-24">
      <Banner />
      <div className="flex pl-20 pb-20 pr-20">
        <Items />
      </div>
    </section>
  );
};

export default Explore;
