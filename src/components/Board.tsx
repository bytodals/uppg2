import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { BoardProps } from '../types';
import '../main.css'; 
import '../components/CardModal.css';

const Board: React.FC<BoardProps> = ({ columns, cards, onCardClick, onAddCard }) => {
  return (
    <div className="board-container">
      {columns.map((column) => {
        const cardsInColumn = cards.filter(card => card.columnId === column.id);

        return (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                className="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>{column.title}</h2>
                {cardsInColumn.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => onCardClick(card)}
                        style={provided.draggableProps.style}
                      >
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                <button
                  onClick={() => onAddCard(column.id)}
                  className="add-card-button"
                  aria-label={`Add card to ${column.title}`}
                >
                  +
                </button>
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
};

export default Board;
