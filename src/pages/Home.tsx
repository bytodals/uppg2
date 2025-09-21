import React from "react";
import Board from "../components/Board";
import { TaskProvider } from "../context/TaskContext";


const Home: React.FC = () => {
  return (
    <TaskProvider>
      <div className="home-page">
        <Board />
      </div>
    </TaskProvider>
  );
};

export default Home;
