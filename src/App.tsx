// src/App.tsx
import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import ColumnView from './components/ColumnView'; 
import type { Card, ColumnModel } from './types';
import './main.css';
import './components/CardModal.css';

const initialCards: Card[] = [

];

const initialColumns: ColumnModel[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [columns] = useState<ColumnModel[]>(initialColumns);
  const [, setSelectedCard] = useState<Card | null>(null);
  const [, setCreatingCardForColumn] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const draggedCardIndex = prevCards.findIndex(card => card.id === draggableId);
      if (draggedCardIndex === -1) return prevCards;

      const draggedCard = { ...prevCards[draggedCardIndex], columnId: destination.droppableId };

      updatedCards.splice(draggedCardIndex, 1); // remove from old position
      updatedCards.splice(destination.index, 0, draggedCard); // insert at new position

      return updatedCards;
    });
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleAddCard = (columnId: string) => {
    setCreatingCardForColumn(columnId);
  };


  // Other handlers for save, delete, update cards...

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Routes>
        <Route
          path="/"
          element={
            <Board
              columns={columns}
              cards={cards}
              onCardClick={handleCardClick}
              onAddCard={handleAddCard}
            />
          }
        />

        <Route
          path="/column/:columnId"
          element={
            <ColumnView
              columns={columns}
              cards={cards}
              onCardClick={handleCardClick}
              onAddCard={handleAddCard}
            />
          }
        />
      </Routes>
    </DragDropContext>
  );
}

export default App;
