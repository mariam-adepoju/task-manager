import { useDispatch } from "react-redux";
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
import Modal from "./Modal";
import { useState } from "react";
import Backdrop from "./Backdrop";
import type { TodoItemProps } from "../type";

const TodoItem = ({ item }: TodoItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToggle = () => dispatch(toggleTaskComplete(item.id));
  const handleDelete = () => {
    // console.log("deleting");
    dispatch(deleteTask(item.id));
    setShowModal(false);
  };
  const handleEdit = () => {
    if (!item.isCompleted) {
      dispatch(setTask(item));
      navigate("/addtask");
    }
  };

  return (
    <li>
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
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer"
            >
              <Delete />
            </button>
          </div>
        </CardFooter>
      </Card>
      {showModal && <Backdrop />}
      {showModal && (
        <Modal
          message={`Are you sure you want to delete "${item.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </li>
  );
};

export default TodoItem;
