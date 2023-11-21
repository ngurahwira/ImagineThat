import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const WhiteBoard = () => {
  const [socket, setSocket] = useState(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  console.log(canvasRef.current, 12);
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
        const { x, y, prevX, prevY } = data;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });

    return () => {
      socket.off("drawing");
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

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      socket.emit("drawing", { x, y, prevX, prevY });
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
        </div>
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
