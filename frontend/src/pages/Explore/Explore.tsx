import Category from "../Explore/Category/Category";
import Items from "./Items/Items";
import Banner from "./ExploreBanner/Banner";

const Explore = () => {
  return (
    <section className="space-y-10 pt-24">
      <Banner />
      <div className="p-5 flex space-x-10">
        <Category />
        <Items />
      </div>
    </section>
  );
};

export default Explore;
