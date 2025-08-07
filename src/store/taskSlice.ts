import { createSlice } from "@reduxjs/toolkit";
import type { Task, TaskState } from "./type";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: TaskState = {
  task: {
    id: "",
    title: "",
    description: "",
    date: "",
    isCompleted: false,
    priority: "low",
  },
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks") as string)
    : [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t: Task) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskComplete(state, action: PayloadAction<string>) {
      const task: Task | undefined = state.tasks.find(
        (t: Task) => t.id === action.payload
      );
      if (task) {
        task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTask(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((t: Task) => t.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
      state.task = {
        id: "",
        title: "",
        description: "",
        date: "",
        isCompleted: false,
        priority: "low",
      }; // reset current task
    },
  },
});

export const { setTask, addTask, deleteTask, updateTask, toggleTaskComplete } =
  taskSlice.actions;
export default taskSlice.reducer;
