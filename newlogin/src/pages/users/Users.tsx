import moment from "moment";
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState,FC } from "react";
import { UsersDTO } from "../../model/UsersDTO";
import {UserContext} from "../../context/UserContext";
import api from "../../api";
import {
TableBackGround,
} from "./User.styles"

function Users() {
  const [people, setPeople] = useState<UsersDTO['people']>([]);
//  const {people, setPeople} = useContext<any>(UserContext);
 const {handleLogin, navigate} = useContext<any>(AuthContext);


 const formatCpf: FC<any> = (cpf) => {
  cpf = cpf.toString()
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

 const GetPeoples = async () => {
  try{
    const {data} = await api.get('/pessoa');
    setPeople(data)
    console.log(data)
  }
  catch (error){
    console.log(error)
  }}
  
 useEffect(() => {
  const token = localStorage.getItem('token')
  if (token){
    api.defaults.headers.common['Authorization'] = token;
  }
  GetPeoples();
},[])


  return (
    <TableBackGround>
    <div>
      <h1>Usuario</h1>

      {people.map((user) => (
        <div key={user.idPessoa}>
          <h3>{user.nome}</h3>
          <p>{formatCpf(user.cpf)}</p>
          <p>{moment(user.dataNascimento).format('DD/MM/YYYY')}</p> 
          <p>{user.email}</p>
        </div>
      ))}
    </div>
    </TableBackGround>
  )
};


export default Users