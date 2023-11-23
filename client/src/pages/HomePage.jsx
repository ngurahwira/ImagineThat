import ChatRoom from "../components/ChatRoom";
import WhiteBoard from "../components/WhiteBoard";
import { Container } from "react-bootstrap";
import backgroundImage from "../assets/bg1.jpg";

const HomePage = () => {
  const name = localStorage.getItem("name") || "Anonymous";
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
      <div className="App" style={{ paddingTop: 20 }}>
        <h2
          className="p-2 border rounded-3 bg-light"
          style={{ width: 300, fontFamily: "Mochiy Pop One" }}
        >
          <span style={{ color: "#7ACAD3" }}>Hello, </span>
          <span style={{ color: "orange" }}>{name}</span>
        </h2>
        <header
          className="App-header"
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <WhiteBoard />
          </div>
          <ChatRoom style={{ flex: 1 }} />
        </header>
      </div>
    </Container>
  );
};

export default HomePage;
