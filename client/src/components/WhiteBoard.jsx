import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

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

    const newSocket = io("http://localhost:3000"); // Ganti dengan URL server Anda
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
  const handleLineSizeChange = (e) => {
    setLineSize(parseInt(e.target.value)); // Update ukuran garis
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
        <select value={lineSize} onChange={handleLineSizeChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={70}>70</option>
        </select>
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          style={{ borderStyle: "solid" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    </center>
  );
};

export default WhiteBoard;
