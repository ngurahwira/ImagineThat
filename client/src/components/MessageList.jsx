import { useState, useEffect } from "react";
import socket from "../socket";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const name = localStorage.getItem("name") || "Anonymous";
    socket.emit("join room", { name });
    socket.on("user joined", (data) => {
      console.log(data, 14);
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: data.name, message: "joined the room." },
      ]);
    });

    socket.on("user left", (data) => {
      console.log(data, 20);
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: data.name, message: "left the room." },
      ]);
    });

    return () => {
      socket.off("user joined");
      socket.off("user left");
    };
  }, []);

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.name}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MessageList;
