import styled from "styled-components";

export const StyledTaskCard = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  cursor: pointer;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      color: #000;
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
  }
  &.dragging {
    border: 1px solid #388bff;
  }
`;
