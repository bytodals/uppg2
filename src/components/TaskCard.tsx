import { useState } from "react";
import TaskModal from "./TaskModal";
import "../main.css";
import type {Task , TaskProps} from "../types";


const TaskCard = ({ task, onRemove, onUpdate }: TaskProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="task-card" onClick={() => setModalOpen(true)}>
        <h4>{task.title}</h4>
        <h5>description</h5>
        <p>{task.description}</p>
      </div>

      {modalOpen && (
        <TaskModal
          task={task}
          onClose={() => setModalOpen(false)}
          onSave={(updatedTask) => { onUpdate(updatedTask); setModalOpen(false); }}
          onDelete={() => { onRemove(task.id); setModalOpen(false); }}
        />
      )}
    </>
  );
};

export default TaskCard;
