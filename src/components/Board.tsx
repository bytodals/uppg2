import React from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import ColumnView from "./ColumnView";
import { useTasks } from "../context/TaskContext";
import type { Column, Task } from "../types";

// Board props
type BoardProps = {
  onCardClick?: (task: Task) => void;
};

const Board: React.FC<BoardProps> = ({ onCardClick }) => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  // Kolumner
  const columns: Column[] = [
    { id: "col-1", title: "Att göra" },
    { id: "col-2", title: "Pågående" },
    { id: "col-3", title: "Klart" },
  ];

  // Lägg till nytt kort
  const handleAddCard = (columnId: string) => {
    const newCard: Task = {
      id: `${tasks.length + 1}`,
      title: `Nytt kort ${tasks.length + 1}`,
      description: "Beskrivning",
      columnId,
    };
    addTask(newCard);
  };

  // Flytta kort till nästa kolumn
  const handleMoveCardRight = (task: Task) => {
    const currentIndex = columns.findIndex((col) => col.id === task.columnId);
    if (currentIndex < columns.length - 1) {
      const updatedTask = { ...task, columnId: columns[currentIndex + 1].id };
      updateTask(updatedTask);
    }
  };

  // Flytta kort till föregående kolumn
  const handleMoveCardLeft = (task: Task) => {
    const currentIndex = columns.findIndex((col) => col.id === task.columnId);
    if (currentIndex > 0) {
      const updatedTask = { ...task, columnId: columns[currentIndex - 1].id };
      updateTask(updatedTask);
    }
  };

  // Drag & Drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;
    updateTask({ ...task, columnId: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-wrapper">
        <div className="board-container">
          <ColumnView
            columns={columns}
            onCardClick={onCardClick || (() => {})}
            onAddCard={handleAddCard}
            onMoveCardRight={handleMoveCardRight}
            onMoveCardLeft={handleMoveCardLeft}
            onDeleteCard={deleteTask}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
