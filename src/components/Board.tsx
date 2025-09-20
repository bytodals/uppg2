import React from "react";
import ColumnView from "./ColumnView";
import { useTasks } from "../context/TaskContext";
import type { Column, Task } from "../types";

const Board: React.FC = () => {
  const { tasks, addTask, moveTask, deleteTask } = useTasks(); // hämtar alla tasks och funktioner från context

  // Kolumner som visas
  const columns: Column[] = [
    { id: "col-1", title: "Att göra" },
    { id: "col-2", title: "Pågående" },
    { id: "col-3", title: "Klart" },
  ];

  // Klick på kort
  const handleCardClick = (task: Task) => {
    console.log("Clicked task:", task);
    // Här kan du öppna popup för redigering
  };

  // Lägg till nytt kort i en kolumn
  const handleAddCard = (columnId: string) => {
    const newCard: Task = {
      id: `${tasks.length + 1}`, // sträng-ID
      title: `Nytt kort ${tasks.length + 1}`,
      description: "Beskrivning",
      columnId,
    };
    addTask(newCard);
  };

  // Flytta kort till nästa kolumn (exempel)
  const handleMoveCardRight = (task: Task) => {
    const currentIndex = columns.findIndex(col => col.id === task.columnId);
    if (currentIndex < columns.length - 1) {
      moveTask(task.id, columns[currentIndex + 1].id);
    }
  };

  // Flytta kort till föregående kolumn (exempel)
  const handleMoveCardLeft = (task: Task) => {
    const currentIndex = columns.findIndex(col => col.id === task.columnId);
    if (currentIndex > 0) {
      moveTask(task.id, columns[currentIndex - 1].id);
    }
  };

  return (
    <div className="board-container">
      <ColumnView
        columns={columns}
        tasks={tasks}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
        onMoveCardRight={handleMoveCardRight}
        onMoveCardLeft={handleMoveCardLeft}
        onDeleteCard={deleteTask}
      />
    </div>
  );
};

export default Board;
