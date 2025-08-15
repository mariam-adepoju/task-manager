// import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
