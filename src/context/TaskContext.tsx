import React, { createContext, useContext, useState } from "react";
import type { Task } from "../types";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  moveTaskLeft: (taskId: string) => void;
  moveTaskRight: (taskId: string) => void;
  selectedTask: Task | null;
  isModalOpen: boolean;
  openModal: (task: Task) => void;
  closeModal: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", description: "Description 1", columnId: "col-1" },
    { id: "2", title: "Task 2", description: "Description 2", columnId: "col-1" },
    { id: "3", title: "Task 3", description: "Description 3", columnId: "col-1" },
    { id: "a", title: "Task A", description: "Description A", columnId: "col-2" },
    { id: "b", title: "Task B", description: "Description B", columnId: "col-2" },
    { id: "c", title: "Task C", description: "Description C", columnId: "col-3" }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));
  const updateTask = (updatedTask: Task) => setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  const moveTaskLeft = (taskId: string) => setTasks(prev => prev.map(task => {
    if (task.id !== taskId) return task;
    if (task.columnId === "col-2") return { ...task, columnId: "col-1" };
    if (task.columnId === "col-3") return { ...task, columnId: "col-2" };
    return task;
  }));
  const moveTaskRight = (taskId: string) => setTasks(prev => prev.map(task => {
    if (task.id !== taskId) return task;
    if (task.columnId === "col-1") return { ...task, columnId: "col-2" };
    if (task.columnId === "col-2") return { ...task, columnId: "col-3" };
    return task;
  }));
  const openModal = (task: Task) => { setSelectedTask(task); setIsModalOpen(true); };
  const closeModal = () => { setSelectedTask(null); setIsModalOpen(false); };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, moveTaskLeft, moveTaskRight, selectedTask, isModalOpen, openModal, closeModal }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
