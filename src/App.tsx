import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TaskForm from "./pages/TaskForm";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtask" element={<TaskForm />} />
      </Routes>
    </>
  );
}

export default App;
