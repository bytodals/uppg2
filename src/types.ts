
export interface Task {
  id: number; 
  title: string;
  description?: string;
  column: string;
}


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

export interface BoardProps {
  columns: ColumnModel[];
  cards: Card[];
  onCardClick: (card: Card) => void;
  onAddCard: (columnId: string) => void;
  onDelete?: (cardId: string) => void;
}

export interface ColumnComponentProps {
  title: string;
  column: string;
}
