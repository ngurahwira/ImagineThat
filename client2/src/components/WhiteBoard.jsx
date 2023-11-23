import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Form } from "react-bootstrap";

const WhiteBoard = () => {
  const [socket, setSocket] = useState(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [currentColor, setCurrentColor] = useState("black");
  const [isDrawer, setIsDrawer] = useState(false);
  const [isGuesser, setIsGuesser] = useState(false);
  const [wordToDraw, setWordToDraw] = useState("");
  // console.log(canvasRef.current, 12);
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
        const { x, y, prevX, prevY, color } = data;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
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

    socket.on("yourTurnToDraw", (word) => {
      setWordToDraw(word);
      setIsDrawer(true);
      alert(`Your turn to draw: ${word}`); // atau tampilkan di UI
    });

    socket.on("startGuessing", () => {
      setIsDrawer(false);
      setIsGuesser(true);
      alert("Your turn to guess!");
    });
    return () => {
      socket.off("drawing");
      socket.off("clearCanvas");
    };
  }, [socket, ctx]);

  const handleMouseDown = (e) => {
    if (!isDrawer) return;
    setDrawing(true);
    setPrevX(e.nativeEvent.offsetX);
    setPrevY(e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!drawing || !isDrawer) return;
    if (drawing && ctx && socket) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      socket.emit("drawing", { x, y, prevX, prevY, color: ctx.strokeStyle });
      setPrevX(x);
      setPrevY(y);
    }
  };
  // Define a list of colors for the user to choose from
  const colorOptions = ["black", "red", "green", "blue", "yellow", "purple"];

  const selectColor = (color) => {
    setCurrentColor(color);
  };

  // const handleColorChange = (e) => {
  //   setCurrentColor(e.target.value); // Update the current color
  // };

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
    <div
      className="d-flex justify-content-start align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="position-relative" style={{ width: "700px" }}>
        <canvas
          ref={canvasRef}
          width={700}
          height={450}
          className="border"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ backgroundColor: "white", borderRadius: 10 }}
        />

        {/* Color options */}
        <div style={{ position: "absolute", top: "86%", left: "50px" }}>
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
