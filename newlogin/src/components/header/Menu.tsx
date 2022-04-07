import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import {
  LiMenu,
  ButtonLogout,
  } from "./Header.styles"


function Menu() {

const {handleLogout} = useContext<any>(AuthContext);

const token = localStorage.getItem('token')
  return (
    <>
        {token ?(
        <>
          <Link to="/">
            <LiMenu>Home</LiMenu>
          </Link> 
          <Link to="/users">
            <LiMenu>Usuario</LiMenu>
          </Link>
          <Link to="/address">
            <LiMenu>Endereço</LiMenu>
          </Link>
        <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>
        </> ):
          <Link to="/login">
            <LiMenu>Login</LiMenu>
          </Link> 
        }
    </>
  )
}

export default Menu


