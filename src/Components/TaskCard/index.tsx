import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Task } from "@/interfaces";
import { StyledTaskCard } from "./style";
import { PenIcon, TrashIcon } from "@/assets/icons";
import EditField from "@/Components/EditField";
import ConfirmDialog from "@/Components/Confirm";
import { useBoardStore } from "@/store/boardStore";
import { apiService } from "@/services/api";

interface TaskCardProps {
  task: Task;
  columnId: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columnId }) => {
  const { deleteTask, updateTask } = useBoardStore();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK_CARD",
    item: { id: task.id, columnId, },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSaveEdit = async (value: string) => {
    const updatedTask = { ...task, name: value };
    const res = await apiService.updateTask(task.id, updatedTask);
    updateTask(task.id, columnId, res);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await apiService.deleteTask(task.id);
    deleteTask(task.id, columnId);
    setShowDeleteConfirm(false);
  };

  return (
    <StyledTaskCard ref={drag} className={isDragging ? "dragging" : ""}>
      {isEditing ? (
        <EditField
          defaultValue={task.name}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          placeholder="Edit task name"
        />
      ) : (
        <div className="title">
          <p>{task.name}</p>
          <div className="action-btn">
            <button onClick={handleEdit}>
              <img src={PenIcon} alt="Edit" />
            </button>
            <button onClick={() => setShowDeleteConfirm(true)}>
              <img src={TrashIcon} alt="Delete" />
            </button>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </StyledTaskCard>
  );
};

export default TaskCard;
