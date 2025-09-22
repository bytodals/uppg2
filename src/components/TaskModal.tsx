import React, { useState, useEffect } from "react";
import type { Task } from "../types";
import { useTasks } from "../context/TaskContext";

type Props = { task: Task | null };
const TaskModal: React.FC<Props> = ({ task }) => {
  const { updateTask, closeModal } = useTasks();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  useEffect(() => { setTitle(task?.title || ""); setDescription(task?.description || ""); }, [task]);
  if (!task) return null;
  const handleSave = () => { updateTask({ ...task, title, description }); closeModal(); };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <label>Title<input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
        <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} /></label>
        <div>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleSave} disabled={!title.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
