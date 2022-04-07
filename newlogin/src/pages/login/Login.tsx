import { useContext, useEffect, useState } from "react"
import { Formik,Field, Form, FormikHelpers } from "formik"
import { LoginDTO } from "../../model/LoginDTO"
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
import ReactDOM from "react-dom";

import { 
  Button,
  Input,
  LogoImg,
  DivForm, 
  CardBody,
  CardIcon,
  CardForm,
  TitleLogin,
  CardHeader,
  DivFormName,
  ShowPassword,
  ContainerLogin, 
} from "./Login.styles"

import { AuthContext } from "../../context/AuthContext"

function Login() {
  const {handleLogin, navigate} = useContext<any>(AuthContext);
  const [eyeON, setEyeOn] = useState(true);

  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token)
    navigate('/');
  },[])

  return (
    <ContainerLogin>
      <CardForm>

        <CardHeader>
        <LogoImg></LogoImg>
        <TitleLogin>
          Login Vemser
          </TitleLogin>
        </CardHeader>

        <CardBody>
        <Formik
        initialValues={{
          usuario: '',
          senha:'',
        }}
        onSubmit={(
          values: LoginDTO,
          { setSubmitting }: FormikHelpers<LoginDTO>
        ) =>{
          handleLogin(values);
          setSubmitting(false);
        }}
        >
          <Form>

          <DivForm>
          <DivFormName>
          <label htmlFor="usuario">Usuário</label>
          </DivFormName>
        <Field 
        as={Input}
        name="usuario" id= "usuario" placeholder= "Digite o nome do usuário"/>
          </DivForm>

          <DivForm>
          <DivFormName>
          <label htmlFor="senha">senha</label>
          </DivFormName>
          <ShowPassword onClick={() => setEyeOn(!eyeON)}>
        {eyeON ? < AiOutlineEye/> : < AiOutlineEyeInvisible/>}
        </ShowPassword>
        <Field
        as={Input}
        name="senha" id= "senha" type ={eyeON? "password" : "text"} placeholder= "Digite a sua senha" />
         
          </DivForm>
          <Button type="submit"> Entrar</Button>
          </Form>
        </Formik>
        </CardBody>
        </CardForm>
    </ContainerLogin>
  )};


export default Login