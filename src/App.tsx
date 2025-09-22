import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app">
        <h1>iCanBan</h1>
        <Board />
        <TaskModal task={null} />
      </div>
    </TaskProvider>
  );
};

export default App;
