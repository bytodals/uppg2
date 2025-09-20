import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Routes, Route } from 'react-router-dom';

import type { Card } from './types';
import type { Column } from './types';
import Board from './components/Board';
import CardModal from './components/CardModal';

import initialCards from './components/TaskCard';
import initialColumns from './components/Column'; 
import TaskCard from './components/TaskCard';

function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [creatingCardForColumn, setCreatingCardForColumn] = useState<string | null>(null);


  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setCards(prevCards => {
      const cardToMove = prevCards.find(c => c.id === draggableId);
      if (!cardToMove) return prevCards;

      const updatedCards = prevCards.map(card =>
        card.id === draggableId
          ? { ...card, columnId: destination.droppableId }
          : card
      );
      return updatedCards;
    });
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleSaveCard = (updatedCard: Card) => {
    setCards(prev =>
      prev.map(card => (card.id === updatedCard.id ? updatedCard : card))
    );
    setSelectedCard(null);
  };


  const handleDeleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    setSelectedCard(null);
  };

  
  const handleAddCard = (columnId: string) => {
    const newCard: Card = {
      id: Date.now().toString(),
      title: 'New Card',
      description: '',
      columnId,
    };
    setCards(prev => [...prev, newCard]);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Routes>
          <Route
            path="/"
            element={
              <Board
                columns={initialColumns}
                cards={cards}
                onCardClick={handleCardClick}
                onAddCard={handleAddCard}
                onDelete={handleDeleteCard}
              />
            }
          />
        </Routes>
      </DragDropContext>

  
      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
        />
      )}
    </>
  );
}

export default App;
