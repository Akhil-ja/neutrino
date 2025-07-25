import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import FoodSearchPage from "../pages/FoodSearchPage";
import FoodDetail from "../pages/FoodDetail";
import CompareFoodsPage from "../pages/CompareFoodsPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <FoodSearchPage /> },
      { path: "food/:foodName/:foodType", element: <FoodDetail /> },
      { path: "food/:foodName/:foodType/:itemId", element: <FoodDetail /> },
      { path: "compare", element: <CompareFoodsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
