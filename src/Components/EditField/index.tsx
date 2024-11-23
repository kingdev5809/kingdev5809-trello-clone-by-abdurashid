import React, { useState } from "react";
import { StyledEditField } from "./style";

interface EditFieldProps {
  defaultValue?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  placeholder: string;
}

const EditField: React.FC<EditFieldProps> = ({
  onSave,
  onCancel,
  placeholder,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <StyledEditField className="edit-field">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="edit-input"
      />
      <div className="task-actions">
        <button onClick={() => onSave(value)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </StyledEditField>
  );
};

export default EditField;
