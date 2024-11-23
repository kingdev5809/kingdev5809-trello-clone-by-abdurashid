import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ColumnCard from "../ColumnCard";
import { StyledColumnList } from "./style";
import { useBoardStore } from "@/store/boardStore";
import { apiService } from "@/services/api";
import EditField from "../EditField";

const ColumnList: React.FC = () => {
  const { boardState, setBoardState } = useBoardStore();
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const handleAddColumn = async (value: string) => {
    if (value.trim() !== "") {
      const newColumn = {
        name: value,
        tasks: [],
      };
      const res = await apiService.createColumn(newColumn);
      setBoardState({
        ...boardState,
        columns: [...boardState.columns, res],
      });
      setIsAddingColumn(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledColumnList>
        {boardState?.columns?.map((column) => (
          <ColumnCard key={column.id} column={column} tasks={column.tasks} />
        ))}
        <div className="add-new-col">
          {isAddingColumn ? (
            <EditField
              onSave={handleAddColumn}
              onCancel={() => setIsAddingColumn(false)}
              placeholder="Enter column name"
            />
          ) : (
            <button
              className="add-card-btn"
              onClick={() => setIsAddingColumn(true)}
            >
              + Add new
            </button>
          )}
        </div>
      </StyledColumnList>
    </DndProvider>
  );
};

export default ColumnList;
