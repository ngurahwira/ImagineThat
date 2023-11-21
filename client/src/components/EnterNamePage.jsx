// src/EnterNamePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterNamePage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username) {
      localStorage.setItem("username", username);
      navigate("/");
    } else {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUsernameSubmit}>
        <label htmlFor="username">Enter your name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
};

export default EnterNamePage;
