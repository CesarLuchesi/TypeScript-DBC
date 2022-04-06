import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const { takeToken} = useContext<any>(AuthContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(!takeToken()){
      navigate('/login')
    }
  },[]);



  return (
    <div>Address</div>
  )
}

export default Address