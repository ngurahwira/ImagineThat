import React from "react";
import ChatRoom from "./components/ChatRoom";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
