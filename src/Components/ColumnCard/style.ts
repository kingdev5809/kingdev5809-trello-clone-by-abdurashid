import styled from "styled-components";

export const StyledColumnCard = styled.div`
  padding: 10px;
  width: 250px;
  min-height: 30px;
  margin-right: 8px;
  border-radius: 10px;
  background: #f1f2f4;

  &.dragging {
    opacity: 0.3;
  }

  .col-title {
    display: flex;
    justify-content: space-between;
    gap: 5px;

    h3 {
      margin: 5px 0;
      color: #00003a;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 3px;
    button {
      border: none;
      background-color: transparent;
    }
    img {
      cursor: pointer;
    }
  }

  .col-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 15px;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    margin-top: 10px;
  }
`;
