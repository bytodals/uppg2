import React from "react";
import TaskCard from "./TaskCard";
import type { Column, Task } from "../types";

type ColumnViewProps = {
  columns: Column[];
  tasks: Task[];
  onCardClick: (task: Task) => void;
  onAddCard: (columnId: string) => void;
  onDeleteCard: (id: string) => void;
  onMoveCardLeft: (id: string) => void;
  onMoveCardRight: (id: string) => void;
};

const ColumnView: React.FC<ColumnViewProps> = ({ columns, tasks, onCardClick, onAddCard, onDeleteCard, onMoveCardLeft, onMoveCardRight }) => (
  <>
    {columns.map(column => {
      const tasksInColumn = tasks.filter(task => task.columnId === column.id);
      return (
        <div key={column.id} className="column">
          <h2>{column.title}</h2>
          {tasksInColumn.map(task => (
            <div key={task.id} className="card-wrapper">
              <TaskCard task={task} onCardClick={onCardClick} onDeleteCard={onDeleteCard} />
              <div className="card-buttons">
                {column.id !== "col-1" && <button onClick={() => onMoveCardLeft(task.id)}>←</button>}
                {column.id !== "col-3" && <button onClick={() => onMoveCardRight(task.id)}>→</button>}
              </div>
            </div>
          ))}
          <button className="add-card-button" onClick={() => onAddCard(column.id)}>Add Card</button>
        </div>
      );
    })}
  </>
);

export default ColumnView;
