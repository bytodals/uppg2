import React, { useState } from "react";
import type { Task } from "../types";
import "../App.css";

  type TaskModalProps = {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  };

  const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onSave({ ...task, title, description });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>Edit</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
  };

export default TaskModal;
