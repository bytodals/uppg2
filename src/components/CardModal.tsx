import React, { useState, useEffect } from "react";
import type { Task } from "../types";

interface CardModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const CardModal: React.FC<CardModalProps> = ({ task, onClose, onSave }) => {
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

  if (!task) return null; 

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} 
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "20px",
          width: "400px",
          maxWidth: "90%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2>Edit Card</h2>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginTop: "4px", padding: "8px" }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginTop: "4px", padding: "8px", minHeight: "80px" }}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ padding: "8px 12px" }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            style={{ padding: "8px 12px" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
