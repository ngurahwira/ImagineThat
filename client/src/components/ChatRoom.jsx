import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  return (
    <div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
