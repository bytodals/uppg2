import React from "react";
import type { DraggableProvided } from "@hello-pangea/dnd";
import type { Task } from "../types";


type Props = {
  task: Task;
  index: number;
  onCardClick: (task: Task) => void;
  onDeleteCard: (taskId: string) => void;
  provided: DraggableProvided;
};

const TaskCard: React.FC<Props> = ({ task, onCardClick, onDeleteCard, provided }) => {
  return (
    <div
      className="card"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onCardClick(task)}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteCard(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TaskCard;
