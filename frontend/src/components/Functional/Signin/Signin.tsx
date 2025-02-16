import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      console.log('Please fill all the fields');
      return;
    }

    const userData = { username, password };

    axios
      .post("http://127.0.0.1:8000/login/", userData) // Ensure your API endpoint is correct
      .then((response) => {
        console.log('User signed in:', response.data);

        // Store the JWT token in localStorage
        localStorage.setItem("access_token", response.data.access_token);

        // Redirect to Home after successful login
        navigate("/"); // This will redirect the user to the Home component
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error || 'Something went wrong!');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        className="border border-black p-2 w-96 h-16"
        type="text"  // Changed type to text for username
        name="username"
        id="username"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border border-black p-2 w-96 h-16"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        SignIn
        <FaArrowRight className="text-xs group-hover:text-white group-hover:bg-black" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        Forgot Password?
      </button>
      {/* Display error message if exists */}
      {errorMessage && (
        <div className="text-red-500 mt-2">{errorMessage}</div>
      )}
    </form>
  );
};

export default Signin;
