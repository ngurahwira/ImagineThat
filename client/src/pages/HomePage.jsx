import { useState } from "react";
import ChatRoom from "../components/ChatRoom";
import WhiteBoard from "../components/WhiteBoard";
import { Container } from "react-bootstrap";
import backgroundImage from "../assets/bg1.jpg";

const HomePage = () => {
  const name = localStorage.getItem("name") || "Anonymous";
  // console.log(generate());
  // console.log(randomWord);

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <div className="App">
        <h2>Welcome, {name}</h2>
        <header
          className="App-header"
          style={{ display: "flex", width: "100%", gap: "40px" }}
        >
          <WhiteBoard style={{ flex: 1 }} />
          <ChatRoom style={{ flex: 1 }} />
        </header>
      </div>
    </Container>
  );
};

export default HomePage;
