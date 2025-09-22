import React from "react";
import type { Task } from "../types";
import "../App.css";

type TaskCardProps = {
  task: Task;
  onDeleteCard: (taskId: string) => void;
  onMoveLeft: (taskId: string) => void;
  onMoveRight: (taskId: string) => void;
  onOpenModal: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDeleteCard,
  onMoveLeft,
  onMoveRight,
  onOpenModal,
}) => {
  return (
    <div className="card">
      <h3 onClick={onOpenModal}>
        {task.title}
      </h3>
      <p>{task.description}</p>
      <div className="card-buttons">
        <button onClick={() => onMoveLeft(task.id)}>🠸</button>
        <button onClick={() => onMoveRight(task.id)}>🠺</button>
        <button onClick={() => onDeleteCard(task.id)}>⌫</button>
      </div>
    </div>
  );
};

export default TaskCard;
