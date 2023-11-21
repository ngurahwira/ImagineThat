import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = () => {
  const username = localStorage.getItem("username") || "Anonymous";

  return (
    <div>
      <h2>Welcome, {username}</h2> {/* Menampilkan nama pengguna */}
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
