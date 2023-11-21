import React, { useState, useEffect } from "react";
import socket from "../socket";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};

export default MessageList;
