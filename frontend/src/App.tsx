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
import Profile from "./components/Profile/Profie"; // Fixed typo
import NotFound from "./pages/NotFound/Notfound"; // Fixed typo

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("userToken"); // Change this to your auth logic
};

// Protected Route Component (using children instead of element)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Redirect Authenticated Users Away from Login & Signup
const AuthRedirectRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthRedirectRoute><Login /></AuthRedirectRoute>} />
          <Route path="/signup" element={<AuthRedirectRoute><Signup /></AuthRedirectRoute>} />
          
          {/* Protected Routes */}
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/download" element={<ProtectedRoute><Download /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Catch-all route for invalid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
