import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo, clearAuth } from "../../../../Hooks/api/api";
import { MdOutlineLogout } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    profile_picture: "",
  });
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const loadUserInfo = async () => {
      const data = await fetchUserInfo();
      if (data.username) {
        setUserData(data);
        localStorage.setItem("username", data.username);
      }
    };
    loadUserInfo();
  }, []);

  const profileImage = userData.profile_picture
    ? userData.profile_picture.startsWith("http")
      ? userData.profile_picture
      : `http://localhost:8000${userData.profile_picture}`
    : "/profile.png";

  const handleProfileClick = () => {
    if (userData.username) navigate(`/user/${userData.username}`);
  };

  return (
    <section className="relative flex items-center space-x-4 pr-5">
      <div
        className="flex items-end space-x-3 relative group"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        <h2
          onClick={handleProfileClick}
          className="cursor-pointer text-sm font-mono text-black"
        >
          {userData.username || "Username"}
        </h2>
        <div
          className="w-12 h-12 overflow-hidden border cursor-pointer z-10"
          onClick={handleProfileClick}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <button
          className={`absolute right-0 p-2 h-12 hover:text-white hover:bg-black border bg-black text-white transition-all duration-500 ${
            showLogout
              ? "translate-x-[100%] opacity-100"
              : "translate-x-0 opacity-0"
          }`}
          onClick={clearAuth}
        >
          <MdOutlineLogout className="text-2xl bg-transparent" />
        </button>
      </div>
    </section>
  );
};

export default Profile;
