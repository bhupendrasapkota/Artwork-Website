import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    const userData = { username, email, password };

    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/", userData);

      console.log("Signup Successful:", response.data);

      // Store the JWT token in localStorage
      localStorage.setItem("userToken", response.data.access_token);

      // Redirect & refresh to update authentication state
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Signup error:", error.response?.data || error);
        setErrorMessage(error.response?.data?.detail || "Signup failed.");
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage("An unexpected error occurred.");
      }
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
        type="email"
        name="email"
        id="email"
        placeholder="Enter Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-black p-2 w-96 h-16"
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        Sign Up
        <FaArrowRight className="text-xs group-hover:text-white" />
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default Signup;
