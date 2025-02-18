import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../Hooks/api/api"; // Import the custom Axios instance

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    const userData = { username, password };

    try {
      const response = await api.post("api/users/login/", userData);
      console.log("Login Successful:", response.data);

      // Store token in localStorage
      localStorage.setItem("userToken", response.data.access_token);

      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setErrorMessage(error.response?.data?.detail || "Invalid credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        className="border border-black p-2 w-96 h-16"
        type="text"
        name="username"
        id="username"
        placeholder="Enter Username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border border-black p-2 w-96 h-16"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        Sign In
        <FaArrowRight className="text-xs group-hover:text-white" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        Forgot Password?
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default Signin;