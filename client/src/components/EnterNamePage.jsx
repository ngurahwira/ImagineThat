import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Container,
  FormGroup,
  FormControl,
} from "react-bootstrap";

import backgroundImage from "../assets/bg.jpg";

const EnterNamePage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (name) {
      localStorage.setItem("name", name);
      navigate("/home");
    } else {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        paddingRight: 120,
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "400px",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        className="animate__animated animate__bounceIn"
      >
        <Card.Body className="px-4 py-5">
          <Form onSubmit={handleNameSubmit}>
            <FormGroup className="mb-3">
              <h1
                className="text-center mb-4"
                style={{ fontFamily: "Mochiy Pop One" }}
              >
                <span style={{ color: "#7ACAD3" }}>Welcome to</span> <br />
                <span style={{ color: "orange" }}>ImagineThat</span>
              </h1>
              <Form.Label>Enter your name:</Form.Label>
              <FormControl
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </FormGroup>
            <Button
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#7ACAD3", borderColor: "white" }}
            >
              Enter Room
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EnterNamePage;
