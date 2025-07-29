import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Form from "./Form";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  // console.log(tasks);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-full px-5">
      <Form tasks={tasks} setTasks={setTasks} task={task} setTask={setTask} />
      <TodoList tasks={tasks} setTasks={setTasks} setTask={setTask} />
    </div>
  );
};

export default Todo;
