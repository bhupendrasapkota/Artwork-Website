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
import Profile from "./components/Profile/Profie"; 
import NotFound from "./pages/NotFound/Notfound";


const isAuthenticated = () => {
  return !!localStorage.getItem("userToken");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AuthRedirectRoute = ({ children }) => {
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
          
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/download" element={<ProtectedRoute><Download /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
