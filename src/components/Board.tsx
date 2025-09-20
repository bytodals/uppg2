import Column from "./Column"; 
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";

const Board = () => {
  const { tasks, updateTask } = useTasks();
  const columns = ["to do", "in progress", "done"];

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const taskId = Number(draggableId);
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    updateTask({ ...task, column: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {columns.map((col) => (
          <Column key={col} title={col.toUpperCase()} column={col} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
