import { create } from "zustand";
import { BoardState, Column, Task } from "@/interfaces";

interface BoardStore {
  boardState: BoardState;
  moveTask: (taskId: number, fromColumnId: number, toColumnId: number) => void;
  setBoardState: (state: BoardState) => void;
  addTask: (columnId: number, task: Task) => void;
  updateColumnTitle: (columnId: number, newTitle: string) => void;
  updateTask: (taskId: number, columnId: number, updatedTask: Task) => void;
  deleteColumn: (columnId: number) => void;
  deleteTask: (taskId: number, columnId: number) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  boardState: {
    columns: [],
  },

  setBoardState: (state: BoardState) => set({ boardState: state }),

  moveTask: (taskId, fromColumnId, toColumnId) =>
    set((state) => {
      const updatedColumns = state.boardState.columns.map((column) => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            tasks: column.tasks?.filter((task) => task.id !== taskId) ?? [],
          };
        }
        if (column.id === toColumnId) {
          const taskToMove = state.boardState.columns
            .find((col) => col.id === fromColumnId)
            ?.tasks?.find((t) => t.id === taskId);

          if (taskToMove) {
            return {
              ...column,
              tasks: [...(column.tasks ?? []), taskToMove],
            };
          }
        }
        return column;
      });

      return { boardState: { ...state.boardState, columns: updatedColumns } };
    }),

  addTask: (columnId, task) =>
    set((state) => {
      const updatedColumns = state.boardState.columns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: [...(col.tasks ?? []), task],
          };
        }
        return col;
      });

      return { boardState: { ...state.boardState, columns: updatedColumns } };
    }),

  updateColumnTitle: (columnId: number, newTitle: string) => {
    set((state) => {
      const updatedColumns = state.boardState.columns.map((column) =>
        column.id === columnId ? { ...column, name: newTitle } : column
      );
      return { boardState: { ...state.boardState, columns: updatedColumns } };
    });
  },

  updateTask: (taskId, columnId, updatedTask) =>
    set((state) => {
      const updatedColumns = state.boardState.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks:
              column.tasks?.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ) ?? [],
          };
        }
        return column;
      });

      return { boardState: { ...state.boardState, columns: updatedColumns } };
    }),

  deleteTask: (taskId, columnId) =>
    set((state) => {
      const updatedColumns = state.boardState.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks?.filter((task) => task.id !== taskId) ?? [],
          };
        }
        return column;
      });

      return { boardState: { ...state.boardState, columns: updatedColumns } };
    }),

  deleteColumn: (columnId: number) => {
    set((state) => {
      const updatedColumns = state.boardState.columns.filter(
        (column) => column.id !== columnId
      );

      return {
        boardState: {
          ...state.boardState,
          columns: updatedColumns,
        },
      };
    });
  },
}));
