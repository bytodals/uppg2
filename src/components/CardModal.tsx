import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types";

interface CardModalProps {
  task: Task | null;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks(); // hämtar funktioner från TaskContext

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
  }, [task]);

  const handleSave = () => {
    if (!task) return;

    updateTask({
      ...task,
      title: title.trim(),
      description: description.trim(),
    });

    onClose();
  };

  const handleDelete = () => {
    if (!task) return;

    deleteTask(task.id);
    onClose();
  };

  if (!task) return null; 

  return (
    <div
    
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
       
      >
        <h2>Edit Card</h2>

        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div>
          <button onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Save
          </button>
          <button
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
