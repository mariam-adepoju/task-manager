import { useDispatch, useSelector } from "react-redux";
import { addTask, setTask, updateTask } from "../store/taskSlice";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "@/store/type";
import type { RootState } from "../store/store";

const FormSchema = z.object({
  title: z.string().min(5, "Task title must exceed 5 characters"),
  description: z
    .string()
    .min(20, "Task description must exceed 20 characters")
    .max(100, "Task must not exceed 100 characters"),
  priority: z.enum(["low", "medium", "high"]),
  date: z.date().optional(),
});
const TaskForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      date: new Date(),
    },
  });

  const task: Task = useSelector((state: RootState) => state.task.task);
  // console.log("task", task);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (task?.id) {
      form.reset({
        title: task.title,
        description: task.description,
        priority: task.priority || "low",
        date: task?.date ? new Date(task.date) : undefined,
      });
    }
  }, [task, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // console.log(data);
    const newTask = {
      id: task?.id || String(Date.now()),
      title: data.title,
      description: data.description,
      date: data.date?.toISOString() || "",
      priority: data.priority as "low" | "medium" | "high",
      isCompleted: task?.isCompleted || false,
    };
    if (task?.id) {
      dispatch(updateTask(newTask));
      toast("Success", {
        description: "Task updated successfully!",
        style: { color: "green" },
      });
    } else {
      dispatch(addTask(newTask));
      toast("Success", {
        description: "Task added successfully!",
        style: { color: "green" },
      });
    }
    dispatch(
      setTask({
        id: "",
        title: "",
        description: "",
        date: "",
        isCompleted: false,
        priority: "low",
      })
    );
    navigate("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[400px] mx-auto space-y-8 px-[4%]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Task Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder="Enter Task Description..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => (field.onChange(date), setOpen(false))}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {task?.id ? "Update Task" : "Add Task"}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
