import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

const WhiteBoard = () => {
  const [socket, setSocket] = useState(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [currentColor, setCurrentColor] = useState("black");
  const [lineSize, setLineSize] = useState(2);

  console.log(canvasRef.current, 12);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);

    const newSocket = io("https://server-game.fly.dev/");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("drawing", (data) => {
      if (ctx) {
        const { x, y, prevX, prevY, color, size } = data;
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });

    socket.on("clearCanvas", () => {
      clearCanvas();
    });

    return () => {
      socket.off("drawing");
      socket.off("clearCanvas");
    };
  }, [socket, ctx]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    setPrevX(e.nativeEvent.offsetX);
    setPrevY(e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (drawing && ctx && socket) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      ctx.strokeStyle = currentColor;
      ctx.lineWidth = lineSize;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      socket.emit("drawing", {
        x,
        y,
        prevX,
        prevY,
        size: ctx.lineWidth,
        color: ctx.strokeStyle,
      });
      setPrevX(x);
      setPrevY(y);
    }
  };

  const handleLineSizeChange = (e) => {
    setLineSize(parseInt(e.target.value)); // Update ukuran garis
  };

  const lineSizeOptionsWithLabels = [
    { size: 2, label: "sm" },
    { size: 10, label: "md" },
    { size: 15, label: "lg" },
  ];

  const selectLineSize = (size) => {
    setLineSize(size);
  };

  // Define a list of colors for the user to choose from
  const colorOptions = ["black", "red", "green", "blue", "yellow", "purple"];

  const selectColor = (color) => {
    setCurrentColor(color);
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value); // Update the current color
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      socket.emit("clearCanvas");
    }
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <div className="position-relative" style={{ width: "700px" }}>
        <canvas
          ref={canvasRef}
          width={700}
          height={451}
          className="border"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ backgroundColor: "white", borderRadius: 10 }}
        />

        {/* Divider */}
        <hr
          style={{
            position: "absolute",
            top: "78%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
          }}
        />

        <div style={{ position: "absolute", top: "87%", left: "20px" }}>
          <p>Color :</p>
        </div>

        {/* Color options */}
        <div style={{ position: "absolute", top: "87%", left: "70px" }}>
          {colorOptions.map((color) => (
            <Button
              key={color}
              className="rounded-circle"
              style={{
                backgroundColor: color,
                margin: "0 4px",
                width: "30px",
                height: "30px",
                padding: "0",
                display: "inline-block",
                border: "none",
              }}
              onClick={() => selectColor(color)}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>

        <div style={{ position: "absolute", top: "87%", left: "400px" }}>
          <p>Size :</p>
        </div>

        {/* Line size options */}
        <div style={{ position: "absolute", top: "87%", left: "442px" }}>
          {lineSizeOptionsWithLabels.map(({ size, label }) => (
            <Button
              key={size}
              className="rounded-circle"
              style={{
                backgroundColor: "white",
                margin: "0 4px",
                width: "30px",
                height: "30px",
                padding: "0",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "black",
                fontSize: "12px",
                color: "black",
              }}
              onClick={() => selectLineSize(size)}
              aria-label={`Select line size ${label}`}
            >
              {label.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Eraser Option */}
        <div style={{ position: "absolute", top: "87%", left: "560px" }}>
          <Button
            className="rounded-circle"
            style={{
              backgroundColor: "white",
              margin: "0 4px",
              width: "30px",
              height: "30px",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              color: "black",
            }}
            onClick={() => setCurrentColor("#FFFFFF")}
            aria-label="Eraser"
          >
            <FontAwesomeIcon icon={faEraser} />
          </Button>
        </div>

        {/* Clear button */}
        <Button
          variant="outline-secondary"
          onClick={clearCanvas}
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default WhiteBoard;
