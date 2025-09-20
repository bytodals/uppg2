import { useState } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import "../main.css";

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
        column: column,
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
            placeholder={`new task in ${title}`}
        />
            <button onClick={handleAdd}>Add</button>
        </div>

        {filtered.map((task) => (
        <TaskCard 
            key={task.id}
            task={task}
            onRemove={removeTask}
            onUpdate={updateTask}
            
        />
            ))}
        </div>
    );
};

export default Column;
