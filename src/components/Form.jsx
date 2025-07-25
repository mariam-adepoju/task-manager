import { useState } from "react";

const Form = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(),
      name: task,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[500px] bg-white justify-between items-center mx-auto my-15 rounded-lg shadow-lg"
    >
      <input
        className="w-4/5 pl-2 text-black text-base focus:outline-none"
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        placeholder="Enter Task..."
      />
      <button
        className="w-1/5 border-0 rounded-r-lg bg-blue-950 px-5 py-3 text-white text-lg font-bold hover:opacity-90"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
