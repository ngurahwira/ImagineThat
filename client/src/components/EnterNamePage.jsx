import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterNamePage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (name) {
      localStorage.setItem("name", name);
      navigate("/home");
    } else {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleNameSubmit}>
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
};

export default EnterNamePage;
