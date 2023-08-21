import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const Navbar = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const userLogout = () => {
    console.log("logged out");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="siteTitle">TEQBALL project</div>
      <div className="navbarButtons">
        <button onClick={() => navigate("/events")}>Events</button>
        <button onClick={() => navigate("/teams")}>Teams</button>
        <button onClick={userLogout}> Log out</button>
      </div>
    </div>
  );
};
