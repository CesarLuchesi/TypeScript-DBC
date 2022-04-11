import styled from 'styled-components';

export const Container = styled.div`
    background-color: #E5E5E5;
  margin-left: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100vh - 30vh;
`;

export const Card = styled.div`
    background-color: #FFF;
    border-radius: 10px;
    border: 1px solid #000;
    height: 100%;
    width: 70vh;
    display: flex;
    text-align: center;
    margin: 20px 0 20px 0;
`;

export const CardTitle = styled.h1`
    color: #333;
    font-size: 40px;
    
`;