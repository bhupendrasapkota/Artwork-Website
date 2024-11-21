import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-400 h-auto border-t border-neutral-700">
      <div className="h-full p-2">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center h-36 px-10 font-mono text-white">
          {/* Description */}
          <div className="Description">
            <p className="text-[clamp(.9rem,2vw,2rem)]">
              Discover unique art and creative inspiration.
            </p>
            <p className="text-[clamp(0.6rem,1.5vw,1rem)] mt-3">
              Discover art and resources for designers and enthusiasts alike.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex mt-4 md:mt-0">
            <a
              href="#gallery"
              className="hover:text-neutral-700 text-[clamp(0.9rem,2vw,1.125rem)]"
              style={{ marginRight: "clamp(1rem, 2vw, 2rem)" }} // Responsive margin for spacing
            >
              Gallery
            </a>
            <a
              href="#blog"
              className="hover:text-neutral-700 text-[clamp(0.9rem,2vw,1.125rem)]"
              style={{ marginRight: "clamp(1rem, 2vw, 2rem)" }} // Responsive margin for spacing
            >
              Blog
            </a>
            <a
              href="#contact"
              className="hover:text-neutral-700 text-[clamp(0.9rem,2vw,1.125rem)]"
              style={{ marginRight: "clamp(1rem, 2vw, 2rem)" }} // Responsive margin for spacing
            >
              Contact
            </a>
            <a
              href="#about"
              className="hover:text-neutral-700 text-[clamp(0.9rem,2vw,1.125rem)]"
            >
              About
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6 px-10 h-16 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="border-2 border-neutral-700 rounded-full hover:bg-white p-3 hover:text-black text-[clamp(3rem,2vw,2rem)]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="border-2 border-neutral-700 rounded-full hover:bg-white p-3 hover:text-black text-[clamp(3rem,2vw,2rem)]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="border-2 border-neutral-700 rounded-full hover:bg-white p-3 hover:text-black text-[clamp(3rem,2vw,2rem)]" />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm font-mono text-neutral-700 px-10">
          <div className="flex flex-col space-y-2 text-base">
            <div className="space-x-6 border-b border-zinc-700">
              <a
                href="#privacy"
                className="hover:text-white text-[clamp(.9rem,2vw,1rem)]"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-white text-[clamp(0.9rem,2vw,1rem)]"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="hover:text-white text-[clamp(0.9rem,2vw,1rem)]"
              >
                Cookie Policy
              </a>
              <a
                href="#terms"
                className="hover:text-white text-[clamp(0.9rem,2vw,1rem)]"
              >
                Terms and Conditions
              </a>
            </div>
            <p className="text-[clamp(0.9rem,2vw,1rem)]">
              Artwork, images, and trademarks belong to their respective owners
              and are used with permission.
            </p>
          </div>
          <p className="text-center text-[clamp(1rem,2vw,1.125rem)]">
            &copy; 2024 Artistry Showcase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
