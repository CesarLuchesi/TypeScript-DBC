import { AuthContext } from "../../context/AuthContext"
import {useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { UsersDTO } from "../../model/UsersDTO";
import api from "../../api";
import * as Yup from 'yup'
import {
// Table,
TrTable,
TdTable,
TitleUsers,
TheadTable,
TableBackGround,
} from "./User.styles"
import { Container } from "../home/Home.styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


function Users() {
  const [people, setPeople] = useState <UsersDTO['people']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 const {handleLogin, navigate} = useContext<any>(AuthContext);
   const [atualizar, setAtualizar] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any>([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


 const GetPeoples = async () => {
  try{
    const {data} = await api.get('/pessoa');
    setPeople(data)
    setRows(data.map((item: any) => {
      return { id: item.idPessoa, ...item };
    }));
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

const refresh = () => {
      window.location.reload();
    };

    const creatNewUser = async (values:any) => {
          const newUser = {
            nome: values.nome,
            dataNascimento: values.dataNascimento,
            cpf: values.cpf,
            email: values.email,
          };
          try {
            const { data } = await api.post("/pessoa", newUser);
            alert("cadastro realizado com sucesso");
          } catch (error) {
            console.log(error);
          }
        };


 const deleteUser = async (id: number) => {
     try {
       const { data } = await api.delete(`/pessoa/${id}`);
          refresh();
      } catch (error) {
      console.log(error);
}};


const getUserById = async (id: number) => {
      try {
        const { data } = await api.get(`pessoa/{idPessoa}?idPessoa=${id}`);
        formikProps.setFieldValue("nome", data.nome);
        formikProps.setFieldValue("dataNascimento", data.dataNascimento);
        formikProps.setFieldValue("cpf", data.cpf);
        formikProps.setFieldValue("complemento", data.complemento);
        formikProps.setFieldValue("email", data.email);
      } catch (error) {
        console.log(error);
      }
    };


  const updateUser = async () => {
          const updatedUser = {
            nome: formikProps.values.nome,
            cpf: formikProps.values.cpf,
            email: formikProps.values.email,
            dataNascimento: formikProps.values.dataNascimento,
            idPessoa: idUpdate,
          };
          try {
            const { data } = await api.put(`/pessoa/${idUpdate}`, updatedUser);
            alert("Editado com sucesso");
            formikProps.resetForm();
            setAtualizar(false);
          } catch (error) {
            console.log(error);
          }
        };
        const setupUpdateUser = (id: number) => {
          handleOpen()
          getUserById(id);
          setAtualizar(true);
          setIdUpdate(id);
        };

       

        
      const SignupSchema = Yup.object().shape({
                  nome: Yup.string()
                    .min(3, 'Muito curto')
                    .max(50, 'Muito longo')
                    .required('Campo obrigatório'),
                    dataNascimento: Yup.string()
                    .min(10, 'Data de nascimento inválida')
                    .max(10, 'Data de nascimento inválida')
                    .required('Campo obrigatório'),
                    cpf: Yup.string()
                    .min(11, 'CPF inválido')
                    .max(11, 'CPF inválido')
                    .required('Campo obrigatório'),
                    email: Yup.string()
                    .email('E-mail inválido')
                    .required('Campo obrigatório'),
                });

// função formik para props
                const formikProps = useFormik({
                      initialValues: {
                        nome: "",
                        dataNascimento: "",
                        cpf: "",
                        email: "",
                      },
                      onSubmit: async (values: any, actions: any) => {
                        if (!atualizar) {
                          await creatNewUser(values);
                        }
                        if (atualizar) {
                          await updateUser();
                        }
                        actions.setSubmitting(false);
                      },
                      validationSchema: SignupSchema
                    });
                   
                  
                    const style = {
                      position: "absolute" as "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
                      boxShadow: 24,
                      pt: 2,
                      px: 4,
                      pb: 3,
                    };
// interface para fazer paginação

interface Column {
  id: 'nome' | 'cpf' | 'dataNascimento' | 'email' | 'acao';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  {
    id: 'dataNascimento',
    label: 'Data de Nascimento',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'acao',
    label: 'Ação',
    minWidth: 170,
    align: 'right',
  },
];

const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
      
                      

          
  return (
<TableBackGround>
<Button onClick={handleOpen}>Cadastrar usuário</Button>
      <Modal
        open = {open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>

        <div>
          <h1>Cadastrar Usuário</h1>
        </div>
        <Container>
          <form onSubmit={formikProps.handleSubmit}>
             <div>
             <label htmlFor="nome">Nome:</label>              
              <input
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={formikProps.values.nome}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.nome && formikProps.touched.nome ? (
                <div>{formikProps.errors.nome}</div>
                ) : null}
            </div>

            <div>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <input
                id="dataNascimento"
                name="dataNascimento"
                placeholder="Digite sua data de nascimento"
                value={formikProps.values.dataNascimento}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.dataNascimento && formikProps.touched.dataNascimento ? (
                <div>{formikProps.errors.dataNascimento}</div>
                ) : null}
            </div>

            <div>
              <label htmlFor="cpf">CPF:</label>
              <input
                id="cpf"
                name="cpf"
                placeholder="Digite o número do seu CPF"
                value={formikProps.values.cpf}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.cpf && formikProps.touched.cpf ? (
                <div>{formikProps.errors.cpf}</div>
                ) : null}
            </div>

            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                id="email"
                name="email"
                placeholder="Digite o seu email"
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
              />
              {formikProps.errors.email && formikProps.touched.email ? (
                <div>{formikProps.errors.email}</div>
                ) : null}
            </div>
            <button type="submit">Salvar</button>
          </form>
        </Container>
        </Box>
      </Modal>
        <div>
        <TitleUsers>Lista de Usuários</TitleUsers>
        </div>
        <div>
            {/* paginação */}

    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7}>
              Lista de endereços
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody> 
          {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column: any) => {
                      if(column.id === "acao"){
                          return(
                            <TableCell key={column.id} align={column.align}>
                            <>
                            <button onClick={() => setupUpdateUser(row.idPessoa)}> update</button>
                              
                              </>
                            <>
                            <button onClick={() => deleteUser(row.idPessoa)}> delete</button>
                            
                              </>
                          </TableCell>
                          );
                      }else{
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>         






          {/* <Table>
            <TheadTable>
              <tr>
                <th>Usuário:</th>
                <th>CPF:</th>
                <th>Data de Nascimento:</th>
                <th>Email:</th>
                <th>Editar:</th>
                <th>Deletar:</th>
              </tr>
            </TheadTable>
            <tbody>
              {people.map((user: any) => (
                <TrTable key={user.idPessoa}>
                   <TdTable>{user.nome}</TdTable>
            <TdTable>{user.cpf}</TdTable>
            <TdTable>{user.dataNascimento}</TdTable> 
            <TdTable>{user.email}</TdTable>
                  <TdTable>
                    <button onClick={() => setupUpdateUser(user.idPessoa)}> update</button>
                    

                     
                      
                  
                  </TdTable>
                  <TdTable>
                    <button onClick={() => deleteUser(user.idPessoa)}> delete</button>     
                            </TdTable>
                </TrTable>
              ))}
            </tbody>
          </Table> */}
        </div>
      </TableBackGround>

  );
}


export default Users