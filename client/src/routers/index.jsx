import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EnterNamePage from "../components/EnterNamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <EnterNamePage />,
  },
]);

export default router;
