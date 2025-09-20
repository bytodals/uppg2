import React from "react";
import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Min Kanban Board</h1>
        <Board />
      </div>
    </TaskProvider>
  );
};

export default App;
