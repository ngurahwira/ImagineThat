import { useState } from "react";
import socket from "../socket";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

const MessageInput = ({ name }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("chat message", { name, message });
      setMessage("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Type message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "#7ACAD3", borderColor: "white" }}
        >
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
