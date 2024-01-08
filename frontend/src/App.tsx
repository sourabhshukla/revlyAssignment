import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as HomeLoader } from "./pages/Home";
import { loader as LoginLoader } from "./pages/Login";
import { loader as RegisterLoader } from "./pages/Register";

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: HomeLoader },
  {
    path: "/login",
    element: <Login />,
    loader: LoginLoader,
  },
  { path: "/register", element: <Register />, loader: RegisterLoader },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
