import ChatRoom from "../components/ChatRoom";
import WhiteBoard from "../components/WhiteBoard";

const HomePage = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <WhiteBoard />
          <ChatRoom />
        </header>
      </div>
    </>
  );
};

export default HomePage;
