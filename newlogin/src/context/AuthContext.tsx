import  {FC, createContext, useState, useEffect,} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { LoginDTO } from "../model/LoginDTO";

export const AuthContext = createContext({});

const AuthProvider: FC<any>= ({children}) => {
  const navigate = useNavigate();
  const [loginOn, setLoginOn] = useState(true);
  const [isToken, setIsToken] = useState(false);
  const [token, setToken] = useState <string | null>('');
  

  useEffect(() => {
    const token = (localStorage.getItem('token'));
      if(token){
        api.defaults.headers.common['Authorization'] = token;
        setIsToken(true);
      }else{
      navigate('/login');
      }
      setLoginOn(false);
  },[])


  const handleLogin = async (user:LoginDTO) => {
    try {
      const {data} = await api.post('/auth', user);
        localStorage.setItem('token', data);
        api.defaults.headers.common['Authorization'] = data;
        setIsToken(true);
        navigate('/');
    } catch (error) {
      console.log(error)
    }}

    const handleLogout = () => {
      localStorage.removeItem('token')
      setIsToken(false);
      navigate('/login')
    }

    if (loginOn){
      return(<h1>loading...</h1>)
    }
  return(
    <AuthContext.Provider value={{handleLogin,loginOn,navigate,handleLogout,token,isToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider