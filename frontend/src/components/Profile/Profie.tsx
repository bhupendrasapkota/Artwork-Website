import Post from "./Post/Post.tsx";
import Postedpictures from "./Posteditems/Postedpictures.tsx";
import Profile from "./UserProfile/Profile.tsx";

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
