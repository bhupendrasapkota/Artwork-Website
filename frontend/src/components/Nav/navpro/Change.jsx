import React, { useEffect, useState } from "react";
import Profile from "../navpro/Prof/Profile";
import Inup from "../navpro/Inup/Inup";

const Change = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    // Listen for storage changes (login/logout in another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <section className="flex justify-center items-center">
      {isLoggedIn ? <Profile /> : <Inup />}
    </section>
  );
};

export default Change;
