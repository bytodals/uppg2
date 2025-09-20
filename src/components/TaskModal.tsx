import { useState } from "react";
import type { Task } from "../types";


const TaskModal = ({ task, onClose, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => onSave({ ...task, title, description });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={onClose}>x</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
