import { useContext, useEffect } from "react"
import { Formik,Field, Form, FormikHelpers } from "formik"
import { LoginDTO } from "../../model/LoginDTO"
import { 
  DivForm, 
  TitleLogin,
  ContainerLogin, 
} from "./Login.styles"

import { AuthContext } from "../../context/AuthContext"

function Login() {
  const {handleLogin} = useContext<any>(AuthContext);

  return (
    <ContainerLogin>
        <TitleLogin>Login Vemser</TitleLogin>
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
          <label htmlFor="usuario">Usuário</label>
        <Field name="usuario" id= "usuario" placeholder= "Digite o nome do usuário"/>
          </DivForm>
          <DivForm>
          <label htmlFor="senha">senha</label>
        <Field name="senha" id= "senha" type = "password" placeholder= "Digite a sua senha"/>
          </DivForm>
          <button type="submit"> Entrar</button>
          </Form>
        </Formik>
    </ContainerLogin>
  )};

export default Login