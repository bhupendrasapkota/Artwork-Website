import Items from "./Items/Items";
import Banner from "./UserBanner/Banner";

const Users = () => {
  return (
    <section className="pt-24">
      <Banner />
      <div className="pl-15 pb-16 pr-15">
        <Items />
      </div>
    </section>
  );
};

export default Users;
