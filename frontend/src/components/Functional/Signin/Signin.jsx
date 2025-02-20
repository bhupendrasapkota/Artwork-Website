import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../Hooks/api/api";

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

    try {
      const response = await api.post("/users/login/", { username, password });

      console.log("Login Successful:", response.data);


      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);


      console.log("Stored access_token:", localStorage.getItem("access_token"));
      console.log("Stored refresh_token:", localStorage.getItem("refresh_token"));

      const user = await api.get("/users/user-info/");
      localStorage.setItem("Username", user.data.username);

      window.dispatchEvent(new Event("storage"));

      navigate("/profile");
      console.log("Navigating to /profile");

    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setErrorMessage(error.response?.data?.error || "Invalid credentials.");
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
