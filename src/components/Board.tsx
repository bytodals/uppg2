import React from "react";
import ColumnView from "./ColumnView";
import { useTasks } from "../context/TaskContext";
import type { Column, Task } from "../types";




const Board: React.FC = () => {
  const { tasks, addTask } = useTasks(); // hämtar alla tasks från context

  // Kolumner som visas
  const columns: Column[] = [
    { id: "col-1", title: "Att göra" },
    { id: "col-2", title: "Pågående" },
    { id: "col-3", title: "Klart" },
  ];

  // Klick på kort
  const handleCardClick = (task: Task) => {
    console.log("Clicked task:", task);
  };

  // Lägg till nytt kort i en kolumn
  const handleAddCard = (columnId: string) => {
    const newCard: Task = {
      id: (tasks.length + 1).toString(),
      title: `Nytt kort ${tasks.length + 1}`,
      description: "Beskrivning",
      columnId,
    };
    addTask(newCard);
  };

  return (
    <div className="board-container">
      <ColumnView
        columns={columns}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
      />
    </div>
  );
};

export default Board;
