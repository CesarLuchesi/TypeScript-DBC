import { Link } from "react-router-dom"
import {
  LogoImg,
  } from "./Header.styles"

function Logo() {

  const token = localStorage.getItem('token')
  
  return (
    <>
    {token ?(
      <>
    <Link to="/"><LogoImg></LogoImg></Link>
    </>):
    <Link to="/login">LOGO</Link>}
    </>
  )
}

export default Logo