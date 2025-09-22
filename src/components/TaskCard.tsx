import React from "react";
import type { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onCardClick: (task: Task) => void;
  onDeleteCard: (taskId: string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onCardClick, onDeleteCard }) => (
  <div className="card" onClick={() => onCardClick(task)}>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <button onClick={e => { e.stopPropagation(); onDeleteCard(task.id); }}>X</button>
  </div>
);

export default TaskCard;
