import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  const name = localStorage.getItem("name") || "Anonymous";
  return (
    <div>
      <MessageList />
      <MessageInput name={name} />
    </div>
  );
};

export default ChatRoom;
