import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../Hooks/api/api"; // Custom Axios instance

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/users/signup/", formData);

      console.log("Signup Successful:", data);

      // Store tokens properly
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
      setErrorMessage(error.response?.data?.error || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        className="border border-black p-2 w-96 h-16"
        type="text"
        name="username"
        placeholder="Enter Username"
        autoComplete="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="border border-black p-2 w-96 h-16"
        type="email"
        name="email"
        placeholder="Enter Email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="border border-black p-2 w-96 h-16"
        type="password"
        name="password"
        placeholder="Enter Password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
        <FaArrowRight className="text-xs group-hover:text-white" />
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default Signup;
