import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types";

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks();

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
          <button onClick={onClose} className="modal-button cancel">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="modal-button save"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="modal-button delete"
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

