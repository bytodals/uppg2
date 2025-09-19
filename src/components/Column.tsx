import { useState } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContext";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface Props {
  title: string;
  column: string;
}

const Column = ({ title, column }: Props) => {
  const { tasks, addTask, removeTask, updateTask } = useTasks();
  const [newTitle, setNewTitle] = useState("");

  const filtered = tasks.filter((t) => t.column === column);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTask({
      id: Date.now(),
      title: newTitle,
      column,
    });
    setNewTitle("");
  };

  return (
    <div className="column">
      <h2>{title}</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={`New task`}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>add</button>
      </div>

      <Droppable droppableId={column}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filtered.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} onRemove={removeTask} onUpdate={updateTask} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
