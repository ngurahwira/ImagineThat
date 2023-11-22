import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, selectMessages } from "../features/chat/chatSlice";
import socket from "../socket";

const MessageList = () => {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on("chat message", handleNewMessage);

    return () => {
      socket.off("chat message", handleNewMessage);
    };
  }, [dispatch]);

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
