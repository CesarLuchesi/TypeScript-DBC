import styled from "styled-components";


export const TableBackGround = styled.div`
  background-color: #E5E5E5;
  margin-left: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100vh - 30vh;
`;

export const TitleUsers = styled.h1`
  color: rgba(37, 39, 51, 1);
  margin: 36px 0px 58px 30px;
`;

export const Table = styled.table`
  width: 150vh;
  text-align: center;
  border-spacing: 0px;
  border-radius: 8px;
  border: 1.5px solid #dfe0eb;
`;

export const TheadTable = styled.thead`
  height: 90px;
  background-color: #eeeeee;
  font-size: 24px;
  color: #a8a8a8;
`;

export const TrTable = styled.tr`
  background-color: rgba(255, 255, 255, 1);
;
`;

export const TdTable = styled.td`
  border-bottom: 1.5px solid #dfe0eb;
  color: #777777;
  font-size: 18px;
  height: 90px;
`;

export const DeletButton = styled.button`
  width: 30%;
  padding: 10px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #e5195f;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }

`;

export const AtuaButton = styled.button`
  width: 35%;
  padding: 10px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: yellow;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }

`;