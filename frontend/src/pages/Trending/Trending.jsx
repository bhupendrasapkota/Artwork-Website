import Banner from "../Trending/TrendBanner/Banner";
import Pagination from "./Paginated/Pagination";
const Trending = () => {
  return (
    <section className="pt-24">
      <Banner />
      <div className="flex pl-20 pb-20 pr-20 pt-1">
        <Pagination />
      </div>
    </section>
  );
};

export default Trending;
