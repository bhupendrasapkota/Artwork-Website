import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Signup from "../../components/Functional/Signup/Signup";
import Gf from "../../components/Functional/Signin/Gf";
const signup = () => {
  return (
    <section className="relative bg-white text-black border-black p-1 pt-24 font-mono">
      <div className="h-full p-2 flex items-center justify-center">
        <div className="flex-col items-center w-full h-full px-4 py-4 lg:block hidden">
          {/* Welcome Section */}
          <div className="flex flex-col items-center justify-center w-full h-96 border border-black space-y-2 uppercase">
            <h1 className="text-9xl">Welcome</h1>
            <h2 className="text-4xl">To Art-me</h2>
          </div>
          {/* Image Section */}
          <div className="border border-black p-2">
            <img
              src="./images/Login/loginpics.png"
              alt="Artwork"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Greeting Section */}
        <div className="flex flex-col items-center w-full h-full px-4 py-4">
          <div className="flex flex-col items-center justify-center w-full h-[49.55rem] border border-black p-2">
            <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
              <h3 className="text-8xl">SignUp</h3>
              <Gf />
              <div className="flex items-center justify-center w-80 h-10 space-x-2">
                <h1 className="border justify-center w-full border-black" />
                <h1>Or</h1>
                <h1 className="border flex items-center justify-center w-full border-black" />
              </div>
              <Signup />
            </div>
            <div className="flex items-center space-x-2">
              <h1>Have an account?</h1>
              <FaArrowRight className="bg-white text-xs" />
              <Link to="/login" className="hover:text-zinc-500">
                SignIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default signup;
