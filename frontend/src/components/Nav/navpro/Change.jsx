import React, { useEffect, useState } from "react";
import Profile from "../navpro/Prof/Profile";
import Inup from "../navpro/Inup/Inup";

const Change = () => {
  const getAuthStatus = () => !!localStorage.getItem("access_token");
  const [isLoggedIn, setIsLoggedIn] = useState(getAuthStatus);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = getAuthStatus();
      setIsLoggedIn((prev) => (prev !== authStatus ? authStatus : prev));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <section className="flex justify-center items-center">
      {isLoggedIn ? <Profile /> : <Inup />}
    </section>
  );
};

export default Change;
