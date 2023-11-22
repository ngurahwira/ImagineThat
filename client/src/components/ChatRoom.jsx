import React from "react";
import { Provider } from "react-redux";
import store from "../app/store";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  const name = localStorage.getItem("name") || "Anonymous";
  return (
    <Provider store={store}>
      <div>
        <MessageList />
        <MessageInput name={name} />
      </div>
    </Provider>
  );
};

export default ChatRoom;
