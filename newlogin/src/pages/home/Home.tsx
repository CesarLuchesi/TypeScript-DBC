import api from "../../api";
import { UsersDTO } from "../../model/UsersDTO";
import {
  useEffect,
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

import { 
  Card,
  CardTitle,
  Container,
} from "./Home.styles"

function Home() {

  const [people, setPeople] = useState<UsersDTO["people"]>([]);
  const [lista, setLista] = useState<any>([]);

  const GetPeoples = async () => {
    try {
      const { data } = await api.get("/pessoa");
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listAddress = async () => {
    try {
      const { data } = await api.get("/endereco");
      setLista(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
    }
    GetPeoples();
    listAddress();
  }, []);
  
  return (
    <Container>
      <Card>
        <CardTitle>
          <h6> Número de Usuarios Cadastrados</h6>
          {people.length}
        </CardTitle>
      </Card>
      <Card>
        <CardTitle>
          <h6>Numero de Endereços Cadastrados</h6>
          {lista.length}
          </CardTitle>
      </Card>
    </Container>
  )

}

export default Home