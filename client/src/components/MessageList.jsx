import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, selectMessages } from "../features/chat/chatSlice";
import socket from "../socket";

const MessageList = () => {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const name = localStorage.getItem("name") || "Anonymous";
    socket.emit("join room", { name });

    const handleNewMessage = (message) => {
      const isDuplicate = messages.some(
        (msg) => msg.name === message.name && msg.message === message.message
      );

      if (!isDuplicate) {
        dispatch(addMessage(message));
      }
    };

    socket.on("chat message", handleNewMessage);
    socket.on("user joined", (user) =>
      handleNewMessage({ name: user.name, message: "joined the room." })
    );
    socket.on("user left", (user) =>
      handleNewMessage({ name: user.name, message: "left the room." })
    );

    return () => {
      socket.off("chat message", handleNewMessage);
      socket.off("user joined");
      socket.off("user left");
    };
  }, [dispatch, messages]);

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
