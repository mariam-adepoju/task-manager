import { Link } from "react-router-dom";
import TodoList from "../components/TodoList";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { format } from "date-fns";

const Home = () => {
  return (
    <div className="w-full px-[4%]">
      <div className="flex justify-between items-center  mb-4">
        <div className="">
          <h1 className="text-2xl text-primary">Today's Task</h1>
          <p className="text-muted-foreground">
            {format(new Date(), "EEEE, dd MMMM")}
          </p>
        </div>
        <div className="">
          <Button asChild className="text-lg p-5">
            <Link to="/addtask">
              <Plus />
              New Task
            </Link>
          </Button>
        </div>
      </div>
      <TodoList />
    </div>
  );
};

export default Home;
