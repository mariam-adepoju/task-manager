type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
};

type TaskState = {
  task: Task;
  tasks: Task[];
};

export type { Task, TaskState };
