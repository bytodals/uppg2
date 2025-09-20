import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { Task } from "../types";

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "MOVE_TASK"; payload: { id: string; newColumnId: string } };

type State = { tasks: Task[] };

const initialState: State = {
  tasks: [
    { id: "1", title: "Kort 1", description: "Beskrivning 1", columnId: "col-1" },
    { id: "2", title: "Kort 2", description: "Beskrivning 2", columnId: "col-1" },
    { id: "3", title: "Kort 3", description: "Beskrivning 3", columnId: "col-1" },
    { id: "a", title: "Kort A", description: "Beskrivning A", columnId: "col-2" },
    { id: "b", title: "Kort B", description: "Beskrivning B", columnId: "col-2" },
    { id: "c", title: "Kort C", description: "Beskrivning C", columnId: "col-3" }
  ],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return { tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case "UPDATE_TASK":
      return { tasks: state.tasks.map((t) => t.id === action.payload.id ? action.payload : t) };
    case "MOVE_TASK":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, columnId: action.payload.newColumnId } : t
        )
      };
    default:
      return state;
  }
}

const TaskContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};

