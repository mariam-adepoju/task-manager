import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, setTasks, setTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const sorted = tasks
      .slice()
      .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    setFilteredTasks(sorted);
  }, [tasks]);

  const showPending = () => {
    const pending = tasks.slice().filter((item) => !item.isCompleted);
    setFilteredTasks(pending);
  };
  const showCompleted = () => {
    const completed = tasks.slice().filter((item) => item.isCompleted);
    setFilteredTasks(completed);
  };
  const showAll = () => {
    const sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    setFilteredTasks(sortedTasks);
  };

  return (
    <div className="max-w-[500px] mx-auto mb-10">
      <div className="flex justify-center items-center gap-2 my-10">
        <button
          className="border-0 rounded-lg bg-blue-950 py-2 px-3 cursor-pointer text-white font-semibold hover:opacity-90"
          onClick={showAll}
        >
          All
        </button>
        <button
          className="border-0 rounded-lg bg-blue-950 py-2 px-3 cursor-pointer text-white font-semibold hover:opacity-90"
          onClick={showPending}
        >
          Pending
        </button>
        <button
          className="border-0 rounded-lg bg-blue-950  py-2 px-3 cursor-pointer text-white font-semibold hover:opacity-90"
          onClick={showCompleted}
        >
          Completed
        </button>
      </div>
      <ul className="list-none w-full flex flex-col gap-5">
        {filteredTasks.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            tasks={tasks}
            setTask={setTask}
            setTasks={setTasks}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
