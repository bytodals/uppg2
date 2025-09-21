import React, { useState } from "react";
import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import type { Task } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <TaskProvider>
      <div className="app">
        <h1>iCanBan</h1>
        <Board onCardClick={handleCardClick} />
        {selectedTask && (
          <TaskModal task={selectedTask} onClose={handleCloseModal} />
        )}
      </div>
    </TaskProvider>
  );
};

export default App;
