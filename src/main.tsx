import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Home from "./pages/Home.tsx";
import TaskForm from "./pages/TaskForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: Home },
      { path: "addtask", Component: TaskForm },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>
);
