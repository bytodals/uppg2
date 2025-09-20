import React, { useState, useEffect } from "react";
import type { Task } from "../types";

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modal-input"
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="modal-textarea"
          />
        </label>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-button cancel">Cancel</button>
          <button onClick={handleSave} disabled={!title.trim()} className="modal-button save">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;