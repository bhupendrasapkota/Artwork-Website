import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Hooks/api/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    profile_picture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // Fetch profile data
  const fetchProfileData = useCallback(async () => {
    try {
      const { data } = await api.get("/get-profile/");
      setProfile(data);
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      console.error("Error fetching profile:", error);
      setError(error.response?.data?.detail || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProfile((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Handle file change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  // Update profile
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("bio", profile.bio);
      if (selectedFile) {
        formData.append("profile_picture", selectedFile);
      }

      await api.put("/update-profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsEditing(false);
      fetchProfileData(); // Refresh after update
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      console.error("Error updating profile:", error);
      setError(error.response?.data?.detail || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Preview image (Memoized)
  const previewImage = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return profile.profile_picture
      ? `http://localhost:8000${profile.profile_picture}`
      : "/default-avatar.png";
  }, [selectedFile, profile.profile_picture]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // Logout if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/signin");
    }
  }, [navigate]);

  // Loading or error states
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative border font-mono text-black bg-white shadow-lg p-6 flex items-start gap-10 border-b border-black">
      <div className="flex-shrink-0 flex flex-col items-center justify-center">
        {/* Profile Picture */}
        <label htmlFor="profilePicture" className="cursor-pointer">
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

        {/* Profile Info */}
        <div className="mt-4 text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="text-xl font-bold border px-2 py-1 rounded"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="text-sm text-gray-500 border px-2 py-1 rounded w-full mt-2"
              />
              <button
                onClick={handleSubmit}
                className="mt-3 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-3 ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">{profile.username || "Unknown User"}</h2>
              <p className="text-sm text-gray-500">{profile.bio || "No bio available"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-3 px-4 py-2 text-white bg-zinc-700 rounded-md hover:bg-black"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
