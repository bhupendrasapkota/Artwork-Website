import { FaGoogle, FaApple, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <section className="relative bg-black border-white p-1 pt-24">
      <div className="h-full p-2 flex items-center justify-center">
        <div className="flex flex-col items-center w-full h-full px-4 py-4 ">
          {/* Welcome Section */}
          <div className="flex flex-col items-center justify-center text-white w-full h-96 border space-y-2">
            <h1 className="font-mono text-9xl uppercase">Welcome</h1>
            <h2 className="font-mono text-4xl uppercase">To Art-me</h2>
          </div>
          {/* Image Section */}
          <div className="border p-2">
            <img
              src="./images/Login/loginpics.png"
              alt="Artwork"
              className="object-contain w-full h-full bg-white"
            />
          </div>
        </div>

        {/* Greeting Section */}
        <div className="flex flex-col items-center w-full h-full px-4 py-4">
          <div className="flex flex-col items-center justify-center text-white w-full h-[49.55rem] border p-2">
            <form className="flex flex-col items-center justify-center w-full h-full text-white space-y-5">
              <h3 className="text-8xl font-mono">Login</h3>
              <button
                type="submit"
                className=" flex items-center justify-center gap-2 bg-white text-black w-96 h-12 py-2 px-4"
              >
                <FaGoogle className="bg-white text-2xl" />
                Sign In With Google
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-white text-black w-96 h-12 py-2 px-4"
              >
                <FaApple className="bg-white text-2xl" />
                Sign In With Apple
              </button>
              <div className="flex items-center justify-center w-80 h-10 space-x-2">
                <h1 className="border justify-center w-full border-zinc-600" />
                <h1>Or</h1>
                <h1 className="border flex items-center justify-center w-full border-zinc-600" />
              </div>
              <input
                type="email"
                placeholder="Phone, email, or username"
                className="border border-gray-400 p-2 w-96 h-16"
              />
              <button
                type="submit"
                className=" flex items-center justify-center gap-2 bg-white text-black w-96 h-12 py-2 px-4"
              >
                Next
                <FaArrowRight className="bg-white text-xs" />
              </button>
              <button
                type="submit"
                className=" flex items-center justify-center gap-2 bg-white text-black w-96 h-12 py-2 px-4"
              >
                Forgot Password?
              </button>
            </form>
            <div className="text-white flex space-x-2">
              <h1 className="text-zinc-700">Don't have an account?</h1>
              <Link to="/signup" className="hover:text-zinc-700">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
