// task optional description
export interface Task {
  id: number;
  title: string;
  description?: string;
  column: string;
}

// card in a column
export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

// component handling task
export interface TaskProps {
  task: Task;
  onRemove: (id: number) => void;
  onUpdate: (task: Task) => void;
}

export interface Props {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: () => void;
}

//modal handling Card
export interface CardModalProps {
  card: Card;
  onClose: () => void;
  onSave: (updatedCard: Card) => void;
  onDelete?: (cardId: string) => void;
}

// column on board
export interface Column {
  id: string;
  title: string;
}

//rendering columns and cards
export interface BoardProps {
  columns: Column[];
  cards: Card[];
  onCardClick: (card: Card) => void;
  onAddCard: (columnId: string) => void;
  onDelete?: (cardId: string) => void;
}