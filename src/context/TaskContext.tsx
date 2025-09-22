import React, { createContext, useState, useContext, type ReactNode } from "react";
import type { Task, Column } from "../types";

type TaskContextType = {
  tasks: Task[];
  columns: Column[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "To Do" },
    { id: "2", title: "In Progress" },
    { id: "3", title: "Done" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: "a", title: "Task A", description: "Description A", columnId: "1" },
    { id: "b", title: "Task B", description: "Description B", columnId: "2" },
    { id: "c", title: "Task C", description: "Description C", columnId: "1" },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, columns, setTasks, setColumns }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
