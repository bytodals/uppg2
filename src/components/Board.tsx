import React from "react";
import ColumnPage from "../pages/ColumnPage";
import { TaskProvider } from "../context/TaskContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";

const Board: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ColumnPage />} />
          <Route path="/columns/:columnId" element={<ColumnPage />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default Board;
