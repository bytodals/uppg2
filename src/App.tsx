import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColumnPage from "./pages/ColumnPage";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";

  const App: React.FC = () => {
    return (
    <TaskProvider>
      <Router>
        <Routes>
            <Route path="/" element={<ColumnPage />} />
            <Route path="/columns/:columnId" element={<ColumnPage />} />
            <Route path="/tasks/:taskId" element={<ColumnPage />} />
        </Routes>
      </Router>
    </TaskProvider>
    );
  };

export default App;
