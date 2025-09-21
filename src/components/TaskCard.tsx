import React from "react";
import type { DraggableProvided } from "@hello-pangea/dnd";
import type { Task } from "../types";

type Props = {
  task: Task;
  index: number;
  onCardClick: (task: Task) => void;
  onDeleteCard: (taskId: string) => void;
  onMoveCardRight: (task: Task) => void;
  onMoveCardLeft: (task: Task) => void;
  provided: DraggableProvided;
};

const TaskCard: React.FC<Props> = ({
  task,
  onCardClick,
  onDeleteCard,
  onMoveCardRight,
  onMoveCardLeft,
  provided,
}) => {
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

      <div>
        <div>
          <button className= "arrow" onClick={(e) => {e.stopPropagation();onMoveCardLeft(task);}}>
            ◀
          </button>

          <button className= "arrow" onClick={(e) => {e.stopPropagation();onMoveCardRight(task);}}>
            ▶
          </button>
        </div>

        <button className="delete-btn"onClick={(e) => {e.stopPropagation();onDeleteCard(task.id);}}>
          remove
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
