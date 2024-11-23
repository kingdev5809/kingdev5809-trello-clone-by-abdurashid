import React, { useState, useCallback } from "react";
import { Task, Column } from "@/interfaces";
import { useBoardStore } from "@/store/boardStore";
import { ColumnHeader } from "./ColumnHeader";
import ConfirmDialog from "../Confirm";
import TaskCard from "../TaskCard";
import EditField from "../EditField";
import { StyledColumnCard } from "./style";
import { apiService } from "@/services/api";
import { useDrop } from "react-dnd";

interface ColumnCardProps {
  column: Column;
  tasks?: Task[];
}

const ColumnCard: React.FC<ColumnCardProps> = ({ column, tasks = [] }) => {
  const { moveTask, addTask, updateColumnTitle, deleteColumn } =
    useBoardStore();

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [, dropTask] = useDrop({
    accept: "TASK_CARD",
    drop: (draggedItem: { id: number; columnId: number }) => {
      if (draggedItem.columnId !== column.id) {
        const newOrder = column.tasks?.length || 0;
        moveTask(draggedItem.id, draggedItem.columnId, column.id);
        apiService.updateTask(draggedItem.id, {
          order: newOrder,
          columnId: column.id,
        });
      }
    },
  });

  const handleSaveCol = useCallback(
    async (value: string) => {
      if (value.trim() !== "") {
        await apiService.updateColumn(column.id, { name: value });
        updateColumnTitle(column.id, value);
        setIsEditing(false);
      }
    },
    [column.id, updateColumnTitle]
  );

  const handleDelete = useCallback(async () => {
    await apiService.deleteColumn(column.id);
    deleteColumn(column.id);
    setShowDeleteConfirm(false);
  }, [column.id, deleteColumn]);

  const handleSaveTask = useCallback(
    async (value: string) => {
      if (value.trim() !== "") {
        const newTask: Task = {
          id: Date.now(),
          name: value,
          columnId: column.id,
        };
        const res = await apiService.createTask(newTask);
        addTask(column.id, res);
        setIsAdding(false);
      }
    },
    [column.id, tasks.length, addTask]
  );

  return (
    <StyledColumnCard ref={(node) => dropTask(node)}>
      <div className="col-title">
        <ColumnHeader
          name={column.name}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setShowDeleteConfirm(true)}
          onSave={handleSaveCol}
          onCancelEdit={() => setIsEditing(false)}
        />
      </div>
      {showDeleteConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this column?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
      <div className="col-content">
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} columnId={column.id} />
          ))}
        </div>

        {isAdding ? (
          <EditField
            onSave={handleSaveTask}
            onCancel={() => setIsAdding(false)}
            placeholder="Enter task name"
          />
        ) : (
          <button className="add-card-btn" onClick={() => setIsAdding(true)}>
            + Add task
          </button>
        )}
      </div>
    </StyledColumnCard>
  );
};

export default ColumnCard;
