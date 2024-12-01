import { FaArrowRight } from "react-icons/fa";

const Signup = () => {
  return (
    <>
      <input
        type="email"
        placeholder="Email"
        className="border border-black p-2 w-96 h-16"
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-black p-2 w-96 h-16"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="border border-black p-2 w-96 h-16"
      />
      <button
        type="submit"
        className="group flex items-center justify-center gap-2 border border-black w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        SignUp
        <FaArrowRight className="text-xs group-hover:text-white group-hover:bg-black" />
      </button>
    </>
  );
};

export default Signup;
