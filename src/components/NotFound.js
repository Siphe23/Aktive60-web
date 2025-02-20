import React from "react";
import "../styles/NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="logo-container">
        <h1 className="logo">Aktiv<span>60</span></h1>
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