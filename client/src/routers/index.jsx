import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EnterNamePage from "../components/EnterNamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EnterNamePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

export default router;
