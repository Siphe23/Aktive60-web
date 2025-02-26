import React from "react";
import "../styles/NotFound.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Aktiv60.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="logo-container">
      <img src={logo} alt="Aktiv80 Logo" className="logo" />
      </div>
      <div className="error-image">
        <img src={require("../assets/amico.png")} alt="404 Not Found" />
      </div>
      <button className="go-back" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
