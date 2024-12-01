import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Home from "./pages/Entry/Home";
import Footer from "./components/Footer/Footer";
import Login from "./pages/register/login";
import Signup from "./pages/register/signup";
import Explore from "./pages/Explore/Explore";
import Feed from "./pages/Feed/Feed";
import Trending from "./pages/Trending/Trending";
import Download from "./pages/Download/Download";
import Profie from "./components/Profile/Profie";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/download" element={<Download />} />
          <Route path="/profile" element={<Profie />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
