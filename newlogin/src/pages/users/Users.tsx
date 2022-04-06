import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const {takeToken } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(!takeToken()){
      navigate('/login')
    }
  },[])


  
  return (
    <div>users</div>
  )
}


export default Users