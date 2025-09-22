import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useTaskContext } from "../context/TaskContext";
import type { Task, Column } from "../types";

const ColumnPage: React.FC = () => {
  const { tasks, columns, setTasks } = useTaskContext();
  const navigate = useNavigate();
  const { columnId } = useParams<{ columnId: string }>();

  const handleColumnClick = (column: Column) => {
  navigate(`/columns/${column.id}`);
};

const handleAddTask = (columnId: string) => {
  const newTask: Task = {
    id: Date.now().toString(), 
    title: "New Task",
    description: "",
    columnId: columnId,
  };
  setTasks([...tasks, newTask]);
};

  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (columnId) {
      const column = columns.find((c) => c.id === columnId) || null;
      setSelectedColumn(column);
    } else {
      setSelectedColumn(null);
    }
  }, [columnId, columns]);

  const handleTitleClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };
const handleMoveLeft = (taskId: string) => {
  setTasks(prev =>
    prev.map(t => {
      if (t.id !== taskId) return t;
      const currentIndex = columns.findIndex(c => c.id === t.columnId);
      if (currentIndex > 0) {
        return { ...t, columnId: columns[currentIndex - 1].id };
      }
      return t;
    })
  );
};

const handleMoveRight = (taskId: string) => {
  setTasks(prev =>
    prev.map(t => {
      if (t.id !== taskId) return t;
      const currentIndex = columns.findIndex(c => c.id === t.columnId);
      if (currentIndex < columns.length - 1) {
        return { ...t, columnId: columns[currentIndex + 1].id };
      }
      return t;
    })
  );
};

 
 const columnsToRender = selectedColumn ? [selectedColumn] : columns;

if (!columnsToRender.length) {
  return <div className="error">Column not found</div>;
}
return (
  <div className="columns-container">
    {columnsToRender.map((column) => (
      <div key={column.id} className="column">
        <h2 onClick={() => handleColumnClick(column)}>
          {column.title}
        </h2>

        <button onClick={() => handleAddTask(column.id)}>
          + Add Task
        </button>

        {tasks
          .filter((task) => task.columnId === column.id)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpenModal={() => handleTitleClick(task)}
              onDeleteCard={handleDeleteTask}
              onMoveLeft={handleMoveLeft}
              onMoveRight={handleMoveRight}
            />
          ))}
      </div>
    ))}

    {selectedTask && (
      <TaskModal
        task={selectedTask}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />
    )}
  </div>
);

};

export default ColumnPage;
