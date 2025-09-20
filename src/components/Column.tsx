import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { BoardProps, Props } from '../types'; 

const Column: React.FC<BoardProps> = ({ columns, cards, onCardClick, onAddCard }) => {
  return (
      {columns.map((column) => {
        const cardsInColumn = cards.filter((card) => card.columnId === column.id);

        return (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={styles.column}
              >
                <h2>{column.title}</h2>

                {cardsInColumn.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => onCardClick(card)}
                        style={{
                          ...styles.card,
                          ...provided.draggableProps.style,
                        }}
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
                  style={styles.addButton}
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

export default Column;
