import Post from "./Post/Post.tsx";
import Postedpictures from "./Posteditems/Postedpictures.tsx";
import Profile from "./UserProfile/Profile.tsx";

const Profie = () => {
  return (
    <section className=" pt-24 space-y-0.5 h-screen">
      <Profile />
      <Post />
      <Postedpictures />
      <h1>
        Hello testing branch
      </h1>
    </section>
  );
};

export default Profie;
