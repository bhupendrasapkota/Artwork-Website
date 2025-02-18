import Post from "./Post/Post.jsx";
import Postedpictures from "./Posteditems/Postedpictures.jsx";
import Profile from "./UserProfile/Profile.jsx";

const Profie = () => {
  return (
    <section className=" pt-24 space-y-0.5 h-auto">
      <Profile />
      <Post />
      <Postedpictures />
    </section>
  );
};

export default Profie;
