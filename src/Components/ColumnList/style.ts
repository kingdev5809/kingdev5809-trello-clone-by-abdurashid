import styled from "styled-components";

export const StyledColumnList = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  .add-card-btn {
    background-color: transparent;
    border: none;
    display: inline-flex;
    cursor: pointer;
    width: 80px;
    margin-bottom: 8px;
  }

  .task-actions {
    display: flex;
    justify-content: end;
    gap: 10px;
    button {
      padding: 4px 5px;
      background-color: #4caf50;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      font-size: 10px;
      max-height: 25px;
      margin: 5px 0;
      &:first-child {
        background-color: #3a444c;
      }

      &:last-child {
        background-color: transparent;
        border: 1px solid #3a444c;
        color: #000;
      }
    }
  }
`;
