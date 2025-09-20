import { useState } from 'react';
import './CardModal.css';
import "../main.css";
import type { CardModalProps} from '../types';


export default function CardModal({ card, onClose, onSave, onDelete }: CardModalProps) {
  const [editedCard, setEditedCard] = useState({ ...card });

    return (
    <div className="modal-overlay">
        <div className="modal-content">
            <button className="x" onClick={onClose}>x</button>
            <input
            value={editedCard.title}
            onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
        />
            <textarea
            value={editedCard.description}
            onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
        />
            <div className="modal-buttons">
            <button onClick={() => onSave(editedCard)}>save</button>
            <button onClick={() => onDelete?.(editedCard.id)}>delete</button>
        </div>
        </div>
    </div>
    );
}
