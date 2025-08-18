import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import RootLayout from "./layout/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import TaskForm from "./pages/TaskForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "addtask", Component: TaskForm },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />,
    </>
  );
}

export default App;
