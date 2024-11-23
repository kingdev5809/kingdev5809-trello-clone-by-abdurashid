import React from "react";
import { PenIcon, TrashIcon } from "@/assets/icons";
import EditField from "@/Components/EditField";

interface ColumnHeaderProps {
  name: string;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (value: string) => void;
  onCancelEdit: () => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  name,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
}) => {
  if (isEditing) {
    return (
      <EditField
        onSave={onSave}
        onCancel={onCancelEdit}
        placeholder="Enter column title"
        defaultValue={name}
      />
    );
  }

  return (
    <>
      <h3>{name}</h3>
      <div className="action-btn">
        <button onClick={onEdit}>
          <img src={PenIcon} alt="Edit" />
        </button>
        <button onClick={onDelete}>
          <img src={TrashIcon} alt="Delete" />
        </button>
      </div>
    </>
  );
};
