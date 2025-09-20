import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { BoardProps } from '../types';

const ColumnView: React.FC<BoardProps> = ({ columns, cards, onCardClick, onAddCard }) => {

  const column = columns[0]; 

  const cardsInColumn = cards.filter(card => card.columnId === column.id);

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2>{column.title}</h2>
          {cardsInColumn.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => onCardClick(card)}
                >
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button onClick={() => onAddCard(column.id)}>Add Card</button>
        </div>
      )}
    </Droppable>
  );
};

export default ColumnView;
