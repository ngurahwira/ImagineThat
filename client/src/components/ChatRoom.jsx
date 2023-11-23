import React from "react";
import { Provider } from "react-redux";
import store from "../app/store";
import { Card } from "react-bootstrap";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  const name = localStorage.getItem("name") || "Anonymous";

  return (
    <Provider store={store}>
      <div>
        <MessageList />
        <MessageInput name={name} />
    <Card
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Card.Header as="h5">Chat Room</Card.Header>
      <Card.Body style={{ height: "355px", overflowY: "scroll" }}>
        <MessageList />
      </Card.Body>
      <Card.Footer>
        <MessageInput name={name} />
      </Card.Footer>
    </Card>
      </div>
    </Provider>
  );
};

export default ChatRoom;
