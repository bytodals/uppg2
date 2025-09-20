import React from "react";
import Board from "../components/Board";
import { TaskProvider } from "../context/TaskContext";


const Home: React.FC = () => {
  return (
    <TaskProvider>
      <div className="home-page">
        <h1>Min Kanban Board</h1>
        <Board />
      </div>
    </TaskProvider>
  );
};

export default Home;
