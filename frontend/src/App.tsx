import "./App.css";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Home from "./pages/Entry/Home";
import Footer from "./components/Footer/Footer";
import Login from "./pages/register/login";
import Signup from "./pages/register/signup";
import Explore from "./pages/Explore/Explore";
import Feed from "./pages/Feed/Feed";
import Trending from "./pages/Trending/Trending";
import Download from "./pages/Download/Download";
import Profile from "./components/Profile/Profie"; // Fix typo

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("userToken"); // Change this to your auth logic
};

// Protected Route Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

// Redirect Authenticated Users Away from Login & Signup
const AuthRedirectRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : element;
};

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthRedirectRoute element={<Login />} />} />
          <Route path="/signup" element={<AuthRedirectRoute element={<Signup />} />} />
          
          {/* Protected Routes */}
          <Route path="/explore" element={<ProtectedRoute element={<Explore />} />} />
          <Route path="/trending" element={<ProtectedRoute element={<Trending />} />} />
          <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
          <Route path="/download" element={<ProtectedRoute element={<Download />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
