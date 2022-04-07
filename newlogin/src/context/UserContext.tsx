import {FC,useEffect, createContext, useState } from "react";
import api from "../api";
import { UsersDTO } from "../model/UsersDTO";

export const UserContext = createContext({});

const UserProvider: FC<any> =({children}) => {
  const [people, setPeople] = useState <UsersDTO['people']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const GetPeoples = async () => {
    try{
      const {data} = await api.get('/pessoa');
      setPeople(data)
      console.log(data)
      setLoading(false)
    }
    catch (error){
      console.log(error)
      setError(true)
      setLoading(false)
    }}


  return (
    <UserContext.Provider value={{GetPeoples,people,error,loading}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider