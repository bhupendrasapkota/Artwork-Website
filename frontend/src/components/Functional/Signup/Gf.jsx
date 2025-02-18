import { FaApple, FaGoogle } from "react-icons/fa";

const Gf = () => {
  return (
    <>
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        <FaApple className="text-2xl group-hover:text-white group-hover:bg-black" />
        Sign Up With Apple
      </button>
      <button
        type="submit"
        className="group flex items-center justify-center border border-black gap-2 w-96 h-12 py-2 px-4 hover:text-white hover:bg-black"
      >
        <FaGoogle className="text-2xl group-hover:text-white group-hover:bg-black" />
        Sign Up With Google
      </button>
    </>
  );
};

export default Gf;
