import { FaArrowRight } from "react-icons/fa";

const Signin = () => {
  return (
    <>
      <input
        className="border border-black p-2 w-96 h-16"
        type="email"
        name="email"
        id="email"
        placeholder="Enter email"
      />
      <input
        className="border border-black p-2 w-96 h-16"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        SignIn
        <FaArrowRight className="text-xs group-hover:text-white group-hover:bg-black" />
      </button>
      <button
        type="submit"
        className=" flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        Forgot Password?
      </button>
    </>
  );
};

export default Signin;
