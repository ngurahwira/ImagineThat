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
  const [lineSize, setLineSize] = useState(2);
  const [wordToDraw, setWordToDraw] = useState("");

  // console.log(canvasRef.current, 12);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);

    const newSocket = io("http://localhost:3000");
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
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("wordToDraw", (word) => {
      setWordToDraw(word);
      console.log(word, 58);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  // console.log(wordToDraw, 65);

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
        color: ctx.strokeStyle,
        size: ctx.lineWidth,
      });
      setPrevX(x);
      setPrevY(y);
    }
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
    <center>
      <div>
        <div>
          <button onClick={clearCanvas}>Clear</button>
          <input
            type="color"
            value={currentColor}
            onChange={handleColorChange}
          />
        </div>
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
