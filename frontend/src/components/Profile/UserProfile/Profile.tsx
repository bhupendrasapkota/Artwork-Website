import About_recent from "./Items/About_recent";

const Profile = () => {
  return (
    <div className="relative border font-mono text-black bg-white shadow-lg p-6 flex items-start gap-10 border-b border-black">
      {/* Profile Picture and Basic Info */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
          alt="Profile"
          className="w-40 h-64 object-cover border border-gray-700 shadow-md"
        />
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">User Name</h2>
          <p className="text-sm text-gray-500">Artist | Dreamer | Creator</p>
          <button className="mt-3 px-4 py-2 text-white bg-zinc-700 rounded-md hover:bg-black">
            Edit Profile
          </button>
        </div>
      </div>
      <About_recent />
    </div>
  );
};

export default Profile;
