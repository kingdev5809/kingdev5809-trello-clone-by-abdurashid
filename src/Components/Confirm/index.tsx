import React from "react";
import { StyledConfirmDialog } from "./style";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <StyledConfirmDialog className="confirm-dialog">
      <p>{message}</p>
      <div className="task-actions">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </StyledConfirmDialog>
  );
};

export default ConfirmDialog;
