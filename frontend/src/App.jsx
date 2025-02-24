import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Nav/Navbar";
import Home from "./pages/Entry/Home";
import Footer from "./components/Footer/Footer";
import Login from "./pages/register/login";
import Signup from "./pages/register/signup";
import Explore from "./pages/Explore/Explore";
import Collect from "./pages/Collection/collection";
import Trending from "./pages/Trending/Trending";
import User from "./pages/User/Users";
import Profile from "./components/Profile/Profie";
import NotFound from "./pages/NotFound/Notfound";

const getAuthStatus = () => !!localStorage.getItem("access_token");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());

  useEffect(() => {
    const handleStorageChange = () => setIsAuthenticated(getAuthStatus());

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const AuthRedirectRoute = ({ children }) => {
    return isAuthenticated ? (
      <Navigate to={`/user/${localStorage.getItem("username")}`} />
    ) : (
      children
    );
  };

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <AuthRedirectRoute>
                <Login />
              </AuthRedirectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirectRoute>
                <Signup />
              </AuthRedirectRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <Collect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/:username"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
