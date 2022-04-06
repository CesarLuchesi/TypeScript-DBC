import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { 
  Card,
  CardTitle,
  Container,
} from "./Home.styles"

function Home() {
  
  const {takeToken} = useContext<any>(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() =>{
    if(!takeToken()){
      navigate('/login')
    }
  },[])


  return (
    <Container>
      <Card>
        <CardTitle>Usuários</CardTitle>
      </Card>
      <Card>
        <CardTitle>Endereço</CardTitle>
      </Card>
    </Container>
  )

}

export default Home