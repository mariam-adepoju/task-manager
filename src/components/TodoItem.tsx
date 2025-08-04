import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { deleteTask, toggleTaskComplete, setTask } from "../store/taskSlice";
import { useNavigate } from "react-router-dom";
import { AlarmClock, CheckCheckIcon, Delete } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
type TodoItemProps = {
  item: {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    date: string;
    isCompleted: boolean;
  };
};

const TodoItem = ({ item }: TodoItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToggle = () => dispatch(toggleTaskComplete(item.id));
  const handleDelete = () => dispatch(deleteTask(item.id));
  const handleEdit = () => {
    if (!item.isCompleted) {
      dispatch(setTask(item));
      navigate("/addtask");
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileTap={{ scale: 0.98 }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -100) handleDelete();
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, x: -200, transition: { duration: 0.2 } }}
      className="w-full"
    >
      <Card
        className={cn(
          "transition-shadow max-w-[500px] mx-auto",
          !item.isCompleted && "hover:shadow-md cursor-pointer"
        )}
      >
        <div
          onClick={() => {
            if (!item.isCompleted) handleEdit();
          }}
          className={`${
            item.isCompleted ? "line-through " : "cursor-pointer"
          } capitalize`}
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </div>
        <CardContent className="space-y-2">
          <p
            className={cn(
              "text-sm flex gap-2 items-center",
              item.priority === "high" && "text-red-600",
              item.priority === "medium" && "text-yellow-600",
              item.priority === "low" && "text-green-600"
            )}
          >
            <AlarmClock />
            {item.date ? format(new Date(item.date), "EEE dd, MMM") : "No date"}
          </p>
          <p
            className={cn(
              "text-xs",
              item.isCompleted ? "text-green-600" : "text-yellow-600"
            )}
          >
            {item.isCompleted ? "completed" : "pending"}
          </p>
        </CardContent>
        <CardFooter>
          <Badge
            className={cn(
              "text-xs font-medium capitalize",
              item.priority === "high" && "bg-red-200 text-red-600",
              item.priority === "medium" && "bg-yellow-200 text-yellow-600",
              item.priority === "low" && "bg-green-200 text-green-600"
            )}
          >
            {item.priority}
          </Badge>
          <div className="w-full flex gap-4 items-center justify-end">
            <button
              onClick={() => handleToggle()}
              disabled={item.isCompleted}
              className="cursor-pointer disabled:opacity-50"
            >
              <CheckCheckIcon />
            </button>
            <button onClick={() => handleDelete()} className="cursor-pointer">
              <Delete />
            </button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TodoItem;
