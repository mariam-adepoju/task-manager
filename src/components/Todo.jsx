import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Form from "./Form";
import Header from "./Header";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  // console.log(tasks);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-full">
      <Header />
      <Form tasks={tasks} setTasks={setTasks} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Todo;
