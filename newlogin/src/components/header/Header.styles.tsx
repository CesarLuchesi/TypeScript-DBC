import styled from "styled-components";
import logoDBC from '../../images/logoDBC.png'

export const ContainerHeader = styled.header`
    background-color: #363740;
  display: flex;
  flex-direction: column;
  width: 30vh;
  height: 100vh;
  align-items: center;
`;

export const LiMenu = styled.li`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  padding-left: 30px;
  height: 15%;
  position: relative;
  color: #a4a6b3;
  &:hover {
    background-color: rgb(159, 162, 180, 0.08);
  }
  :hover:before {
    content: "";
    left: 0px;
    position: absolute;
    height: 100%;
    background-color: rgba(55, 81, 255, 1);
    width: 2px;
  }
`;

export const LogoImg = styled.img.attrs({
  src: `${logoDBC}`
})`
  width: 150px;
  height: 150px;
  margin: auto;
`;

export const ButtonLogout = styled.button`
  margin-top: 40%;
  width: 100%;
  padding: 12px 0;
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