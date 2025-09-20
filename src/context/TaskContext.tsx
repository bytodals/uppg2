import React, { createContext, useContext, useState } from "react";
import type { Task } from "../types";


type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Kort 1", description: "Beskrivning 1", columnId: "col-1" },
    { id: "2", title: "Kort 2", description: "Beskrivning 2", columnId: "col-1" },
    { id: "3", title: "Kort 3", description: "Beskrivning 3", columnId: "col-1" },
    { id: "a", title: "Kort A", description: "Beskrivning A", columnId: "col-2" },
    { id: "b", title: "Kort B", description: "Beskrivning B", columnId: "col-2" },
    { id: "c", title: "Kort C", description: "Beskrivning C", columnId: "col-3" }
  ]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const updateTask = (updatedTask: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
