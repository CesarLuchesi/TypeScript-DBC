import Logo from "./Logo";
import Menu from "./Menu";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import {
ContainerHeader,
} from "./Header.styles"

function Header() {

  const {isToken} = useContext<any>(AuthContext)
  return (
    <>
    {isToken && (
    <ContainerHeader>
      <header>
        <Logo/>
        <Menu/>
      </header>
      </ContainerHeader>
    )}
    </>
  )
}

export default Header