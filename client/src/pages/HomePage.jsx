import ChatRoom from "../components/ChatRoom";
import WhiteBoard from "../components/WhiteBoard";

const HomePage = () => {
  const name = localStorage.getItem("name") || "Anonymous";
  return (
    <>
      <div className="App">
        <h2>Welcome, {name}</h2>
        <header className="App-header">
          <WhiteBoard />
          <ChatRoom />
        </header>
      </div>
    </>
  );
};

export default HomePage;
