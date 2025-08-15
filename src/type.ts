export type TodoItemProps = {
  item: {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    date: string;
    isCompleted: boolean;
  };
};
