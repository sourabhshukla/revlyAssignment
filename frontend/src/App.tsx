import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as HomeLoader } from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: HomeLoader },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
