import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Column, Task } from "../types";
import { useTasks } from "../context/TaskContext";


type ColumnViewProps = {
  columns: Column[];
  onCardClick: (task: Task) => void;
  onAddCard: (columnId: string) => void;
};

const ColumnView: React.FC<ColumnViewProps> = ({ columns, onCardClick, onAddCard }) => {
  const { tasks, deleteTask } = useTasks();

  return (
    <>
      {columns.map((column) => {
        const cardsInColumn = tasks.filter((task) => task.columnId === column.id);

        return (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
                <h2>{column.title}</h2>

                {cardsInColumn.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskCard
                        task={task}
                        index={index}
                        onCardClick={onCardClick}
                        onDeleteCard={deleteTask}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                <button className="add-card-button" onClick={() => onAddCard(column.id)}>
                  Add Card
                </button>
              </div>
            )}
          </Droppable>
        );
      })}
    </>
  );
};

export default ColumnView;
