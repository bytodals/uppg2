/*

export interface ColumnModel {
  id: string;
  title: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface TaskProps {
  task: Task;
  onRemove: (id: number) => void;
  onUpdate: (task: Task) => void;
}

export interface CardModalProps {
  card: Card;
  onClose: () => void;
  onSave: (updatedCard: Card) => void;
  onDelete?: (cardId: string) => void;
}

export type BoardProps = {
  columns: Column[];
  cards: Task[];
  onCardClick: (card: Task) => void;
  onAddCard: (columnId: string) => void;
  onDeleteCard: (cardId: string) => void;  
};


export type Column = {
  id: string;       // Viktigt: string för Droppable
  title: string;
};

// Typ för ett kort / task
export type Task = {
  id: string;        // Viktigt: string för Draggable
  title: string;
  description: string;
  columnId: string;  // ID på kolumnen som kortet tillhör
};

// Props för Board / ColumnView
export type BoardProps = {
  columns: Column[];
  cards: Task[];
  onCardClick: (card: Task) => void;
  onAddCard: (columnId: string) => void;
};

export interface ColumnComponentProps {
  title: string;
  column: string;
}
*/

export type Task = {
  id: string;
  title: string;
  description: string;
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
};
