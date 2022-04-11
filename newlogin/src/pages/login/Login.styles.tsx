import styled from "styled-components";
import logoDBC from '../../images/logoDBC.png';

export const ContainerLogin = styled.div`
   background-color:rgba(54, 55, 64, 1);
   height: 100vh;
`;

export const CardForm = styled.div`
background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  padding: 0 0 32px;
  margin: auto;
  width: 380px;
  height: 582px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
  display: grid;
`;

export const TitleLogin = styled.h1`
  font-size: 19px;
  color: rgba(164, 166, 179, 1);
  font-weight: bold;
  text-align: center;
  align-items: center;
`;

export const LogoImg = styled.img.attrs({
  src: `${logoDBC}`
})`
  width: 150px;
  height: 150px;
  margin: auto;
`;



export const DivForm = styled.div`

`;

export const DivFormName = styled.div`
  margin-bottom: 6px;
  height: 20px;
  font-weight: bold;
  letter-spacing: 0.3px;
  font-size: 20px;
  color: rgba(164, 166, 179, 1);
`;




export const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 316px;
  height: 42px;

`;


export const Buttonn = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: rgba(55, 81, 255, 1);
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


export const CardIcon = styled.span`
  color: #666;
  cursor: pointer;
  opacity: .25;
  transition: opacity .25s ease-in;

  &:hover {
    opacity: .95;
  }
`;

export const ShowPassword = styled.a`
position: absolute;
margin-left: 300px;
margin-top: 22px;
font-size: 25px;
  cursor: pointer;
`;

export const MinorButton = styled.button`
  display: block;
  width: 30%;
  padding: 10px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: rgba(55, 81, 255, 1);
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