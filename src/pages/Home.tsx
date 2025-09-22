import React from "react";
import { Link } from "react-router-dom";
import BoardProps from "../components/Board";
import { TaskProvider } from "../context/TaskContext";
import "../App.css";

const Home: React.FC = () => (
  <TaskProvider>
    <div className="home-page">
      <h1>iCanBan Home</h1>
      <BoardProps/>
      <div className="column-links">
        <h2>Columns</h2>
        <ul>
          <li><Link to="/column/col-1">To Do</Link></li>
          <li><Link to="/column/col-2">In Progress</Link></li>
          <li><Link to="/column/col-3">Done</Link></li>
        </ul>
      </div>
    </div>
  </TaskProvider>
);

export default Home;
