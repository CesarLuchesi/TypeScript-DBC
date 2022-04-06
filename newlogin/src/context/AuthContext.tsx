import  {FC, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { LoginDTO } from "../model/LoginDTO";

export const AuthContext = createContext({});

const AuthProvider: FC<any>= ({children}) => {
  const [loginOn, setLoginOn] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (user:LoginDTO) => {
    try {
      const {data} = await api.post('/auth', user);
        setToken(data);
        localStorage.setItem('token', data);
        console.log(data)
        setLoginOn(true);
        api.defaults.headers.common['Authorization'] = data;
        navigate('/')
    } catch (error) {
      console.log(error)
    }}

    const handleLogout = () => {
      localStorage.removeItem('token')
      setLoginOn(false);
      navigate('/login')
    }
    const takeToken = () =>{
        return (localStorage.getItem('token'));
    }
  return(
    <AuthContext.Provider value={{handleLogin,loginOn,navigate,handleLogout,token,takeToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider