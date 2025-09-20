import React from "react";
import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onRemove: (id: number) => void;
  onUpdate?: (updatedTask: Task) => void;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onRemove, onUpdate, onClick }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent bubbling if card has onClick
    onRemove(task.id);
  };

  return (
    <div className="task-card" onClick={onClick}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button className="task-card-remove" onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default TaskCard;
