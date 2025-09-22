import React from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import type { Column, Task } from "../types";
import TaskCard from "./TaskCard";

const Board: React.FC = () => {
  const { tasks, addTask, deleteTask, moveTaskLeft, moveTaskRight, openModal } = useTasks();
  const navigate = useNavigate();

  const columns: Column[] = [
    { id: "col-1", title: "To Do" },
    { id: "col-2", title: "In Progress" },
    { id: "col-3", title: "Done" },
  ];

  const handleColumnClick = (columnId: string) => {
    navigate(`/column/${columnId}`);
  };

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: `New Task ${tasks.length + 1}`,
      description: "Description",
      columnId,
    };
    addTask(newTask);
  };

  return (
    <div className="board-container">
      {columns.map((column) => {
        const tasksInColumn = tasks.filter(task => task.columnId === column.id);
        return (
          <div key={column.id} className="column">
            <h2 onClick={() => handleColumnClick(column.id)}>{column.title}</h2>
            {tasksInColumn.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                index={0} 
                onCardClick={() => openModal(task)}
                onDeleteCard={() => deleteTask(task.id)}
                provided={{} as any} 
              />
            ))}
            <button onClick={() => handleAddTask(column.id)}>Add Task</button>
            <div className="move-buttons">
              {tasksInColumn.map(task => (
                <div key={task.id}>
                  <button onClick={() => moveTaskLeft(task.id)}>{"<"}</button>
                  <button onClick={() => moveTaskRight(task.id)}>{">"}</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
