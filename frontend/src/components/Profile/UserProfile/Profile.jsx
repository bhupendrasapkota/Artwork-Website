import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfileData, updateProfile } from "../../../Hooks/api/api"; // Import functions

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    profile_picture: "",
    about_me: "",
    contact: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMove) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMove]);

  useEffect(() => {
    fetchProfileData(setProfile, setError, setLoading);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const handleSubmit = () => {
    updateProfile(
      profile,
      selectedFile,
      setIsEditing,
      setIsMove,
      () => fetchProfileData(setProfile, setError, setLoading),
      setError,
      setLoading
    );
  };

  const previewImage = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return profile.profile_picture
      ? `http://localhost:8000${profile.profile_picture}`
      : "/default-avatar.png";
  }, [selectedFile, profile.profile_picture]);

  useEffect(() => {
    return () => {
      if (previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/users/login");
    }
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative border font-mono text-black bg-white shadow-lg p-6 flex items-start justify-start gap-10 border-b border-black">
      <div className="flex-shrink-0 flex flex-col items-center justify-center">
        <label>
          <img
            src={previewImage}
            alt="Profile"
            className="w-40 h-64 object-cover border border-gray-700 shadow-md"
          />
        </label>
        <input
          type="file"
          id="profilePicture"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="mt-4 text-center flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">
            {profile.username || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500">
            {profile.bio || "No bio available"}
          </p>
          <button
            onClick={() => {
              setIsEditing(true);
              setIsMove(true);
            }}
            className="mt-3 px-4 py-2 text-white bg-zinc-700 rounded-md hover:bg-black"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="aboutcontact flex-grow grid grid-cols-3 gap-6 h-60">
        <div className="border p-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-4">
            About Me
          </h3>
          <p className="mt-3 text-sm text-gray-600">{profile.about_me}</p>
        </div>

        <div className="border p-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-black pb-4">
            Connect
          </h3>
          <p className="m-3 text-sm text-gray-600">{profile.contact}</p>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

            {/* Image Preview and Upload */}
            <div className="flex flex-col items-center mb-3">
              <label htmlFor="editProfilePicture" className="cursor-pointer">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-sm"
                />
              </label>
              <input
                type="file"
                id="editProfilePicture"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500 mt-2">
                Click image to change
              </p>
            </div>

            {/* Other Profile Inputs */}
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3"
              placeholder="Username"
            />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3"
              placeholder="Bio"
            />
            <textarea
              name="about_me"
              value={profile.about_me}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3"
              placeholder="About Me"
            />
            <textarea
              name="contact"
              value={profile.contact}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3"
              placeholder="Contact Info"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setIsMove(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
