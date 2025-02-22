import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../../../Hooks/api/api";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    profile_picture: "",
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      const data = await fetchUserInfo();
      if (data.username) {
        setUserData(data);
        localStorage.setItem("username", data.username); // Store username for navigation
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
    if (userData.username) {
      navigate(`/user/${userData.username}`); // Navigate using username
    }
  };

  return (
    <section className="text-black rounded w-auto h-auto flex items-end justify-end space-x-2">
      <h2 onClick={handleProfileClick} className="cursor-pointer">
        {userData.username || "Username"}
      </h2>
      <div
        className="relative flex items-center justify-center border-black border-2 cursor-pointer overflow-hidden w-12 h-12"
        onClick={handleProfileClick}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
    </section>
  );
};

export default Profile;
