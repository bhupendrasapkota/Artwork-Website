import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../../../Hooks/api/api";

const Profile = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [userData, setUserData] = useState({
    username: "",
    profile_picture: "",
  });

  useEffect(() => {
    api
      .get("/users/user-info/")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging output

        if (response.data && typeof response.data === "object") {
          setUserData(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setUserData({ username: "Unknown", profile_picture: "" });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUserData({ username: "Unknown", profile_picture: "" });
      });
  }, []);

  // Ensure correct image URL handling
  const profileImage =
    userData.profile_picture && !userData.profile_picture.startsWith("http")
      ? `http://localhost:8000${userData.profile_picture}` // Adjust base URL if needed
      : userData.profile_picture || "/profile.png"; // Ensure fallback image is available

  // Handle click to navigate to the profile page
  const handleProfileClick = () => {
    navigate(`/profile/`); // Assuming profile page URL is based on username
  };

  return (
    <section className="text-black rounded w-auto h-auto flex items-end justify-end space-x-2">
      <h2 onClick={handleProfileClick} className="cursor-pointer">
        {userData.username || "Username"}
      </h2>
      <div
        className="relative flex items-center justify-center border-black border-2 cursor-pointer overflow-hidden w-12 h-12"
        onClick={handleProfileClick} // Add click handler to the image container
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
