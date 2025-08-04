import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import type { Task } from "@/store/type";
import type { RootState } from "../store/store";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

const TodoList = () => {
  const tasks: Task[] = useSelector((state: RootState) => state.task.tasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  const sortTasks = (list: Task[]) =>
    list.slice().sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  useEffect(() => {
    setFilteredTasks(sortTasks(tasks));
  }, [tasks]);
  const showAll = () => {
    setFilteredTasks(sortTasks(tasks));
    setActiveFilter("all");
  };
  const showPending = () => {
    setFilteredTasks(tasks.filter((t) => !t.isCompleted));
    setActiveFilter("pending");
  };
  const showCompleted = () => {
    setFilteredTasks(tasks.filter((t) => t.isCompleted));
    setActiveFilter("completed");
  };

  const isActive = (type: string) => activeFilter === type;
  const pendingCount = tasks.filter((t) => !t.isCompleted).length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const allCount = tasks.length;

  return (
    <div className="w-full mx-auto mb-10">
      <div className="flex justify-center items-center px-[4%] gap-2 my-10">
        <Button
          variant={isActive("all") ? "outline" : "ghost"}
          onClick={showAll}
          className="flex items-center"
        >
          <span
            className={`text-lg ${
              isActive("all") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            All
          </span>
          <span
            className={`rounded-full text-primary-foreground text-xs px-2 py-0.5 ${
              isActive("all") ? "bg-primary " : "bg-muted-foreground"
            }`}
          >
            {allCount}
          </span>
        </Button>
        <Button
          variant={isActive("pending") ? "outline" : "ghost"}
          onClick={showPending}
          className="flex items-center"
        >
          <span
            className={`text-lg ${
              isActive("pending") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Pending
          </span>
          <span
            className={`rounded-full text-primary-foreground text-xs px-2 py-0.5 ${
              isActive("pending") ? "bg-primary " : "bg-muted-foreground"
            }`}
          >
            {pendingCount}
          </span>
        </Button>
        <Button
          variant={isActive("completed") ? "outline" : "ghost"}
          onClick={showCompleted}
          className="flex items-center"
        >
          <span
            className={`text-lg ${
              isActive("completed") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Completed
          </span>
          <span
            className={`rounded-full text-primary-foreground text-xs px-2 py-0.5 ${
              isActive("completed") ? "bg-primary " : "bg-muted-foreground"
            }`}
          >
            {completedCount}
          </span>
        </Button>
      </div>
      <ul className="list-none w-full grid grid-cols-1 gap-2.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <li className="col-span-3 text-center text-xl text-primary">
              No {activeFilter} tasks found.
            </li>
          ) : (
            filteredTasks.map((item) => <TodoItem key={item.id} item={item} />)
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TodoList;
