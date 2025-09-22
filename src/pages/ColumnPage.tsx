import React from "react";
import { Link, useParams } from "react-router-dom";
import { TaskProvider, useTasks } from "../context/TaskContext";
import Board from "../components/Board";
import type { Column } from "../types";
import "../App.css";

const ColumnBoard: React.FC<{ columnId: string }> = ({ columnId }) => {
  const { tasks } = useTasks();
  const filteredTasks = tasks.filter(task => task.columnId === columnId);

  const columns: Column[] = [
    { id: columnId, title: columnId === "col-1" ? "To Do" : columnId === "col-2" ? "In Progress" : "Done" }
  ];

  return (
    <Board columns={columns} tasks={filteredTasks} />
  );
};

const ColumnPage: React.FC = () => {
  const { columnId } = useParams<{ columnId: string }>();

  if (!columnId) return <div>Column not found</div>;

  return (
    <TaskProvider>
      <div className="column-page">
        <Link to="/">Back to Home</Link>
        <ColumnBoard columnId={columnId} />
      </div>
    </TaskProvider>
  );
};

export default ColumnPage;
