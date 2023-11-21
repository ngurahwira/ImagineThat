import { useState, useEffect } from "react";
import socket from "../socket";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>
          <strong>{msg.name}:</strong> {msg.message}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
