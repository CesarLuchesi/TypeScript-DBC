import { Formik, Field, Form, FormikHelpers, useFormik } from 'formik';
import {FC} from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import api from '../../api';
import { useEffect, useState} from "react";
import { EnderecoDTO } from "../../model/AddressDTO";
import {
ContainerAddress,
} from './Address.styles'
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


export const Address: FC<{}> = () =>{
  const [lista, setLista] = useState<any>([]);
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    listAddress();
  }, []);

  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

   const refresh = () => {
    window.location.reload();
  };


const deleteAddress = async (id: number) => {
  try {
    const { data } = await api.delete(`/endereco/${id}`);
    refresh();
  } catch (error) {
    console.log(error);
  }
};


const getAddressById = async (id: number) => {
  try {
    const { data } = await api.get(`endereco/${id}`);
    formikProps.setFieldValue("logradouro", data.logradouro);
    formikProps.setFieldValue("localidade", data.cidade);
    formikProps.setFieldValue("uf", data.estado);
    formikProps.setFieldValue("complemento", data.complemento);
    formikProps.setFieldValue("numero", data.numero);
    formikProps.setFieldValue("cep", data.cep);
    formikProps.setFieldValue("pais", data.pais);
  } catch (error) {
    console.log(error);
  }
};


const setupUpdateAddress = (id: number) => {
  handleOpen()
  getAddressById(id);
  setAtualizar(true);
  setIdUpdate(id);
};


const updateAddress = async () => {
  const updatedAddress = {
    cep: formikProps.values.cep,
    cidade: formikProps.values.localidade,
    complemento: formikProps.values.complemento,
    estado: formikProps.values.uf,
    logradouro: formikProps.values.logradouro,
    pais: formikProps.values.pais,
    tipo: formikProps.values.tipo,
    numero: parseInt(formikProps.values.numero),
    idEndereco: idUpdate,
  };
  try {
    const { data } = await api.put(`/endereco/${idUpdate}`, updatedAddress);
    alert("cadastro editado com sucesso");
    formikProps.resetForm();
    setAtualizar(false);
  } catch (error) {
    console.log(error);
  }
};



const listAddress = async () => {
  try {
    const { data } = await api.get("/endereco");
    setLista(data);
    setRows(data.map((item: any) => {
      return { id: item.idEndereco, ...item };
    }));
  } catch (error) {
    console.log(error);
  }
};


 const getAddress = async (values: string) => {
  try {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${values}/json/`
    );
    formikProps.setFieldValue("logradouro", data.logradouro);
    formikProps.setFieldValue("bairro", data.bairro);
    formikProps.setFieldValue("localidade", data.localidade);
    formikProps.setFieldValue("uf", data.uf);
  } catch (error) {
    console.log(error);
  }
};


const postAddress = async (values: EnderecoDTO) => {
  const newAddress = {
    cep: formikProps.values.cep,
    cidade: formikProps.values.localidade,
    complemento: formikProps.values.complemento,
    estado: formikProps.values.uf,
    logradouro: formikProps.values.logradouro,
    pais: formikProps.values.pais,
    tipo: formikProps.values.tipo,
    numero: parseInt(formikProps.values.numero),
  };
  try {
    const { data } = await api.put("/endereco/777", newAddress);
    alert("cadastro realizado com sucesso");
  } catch (error) {
    console.log(error);
  }
};

const SignupSchema = Yup.object().shape({
  logradouro: Yup.string()
    .min(3, 'Muito curto')
    .max(50, 'Muito longo')
    .required('Campo obrigatório'),
    cep: Yup.string()
    .min(8, 'muito curto')
    .max(9, 'muito longo')
    .required('Campo obrigatório'),
    bairro: Yup.string()
    .min(3, 'muito curto')
    .max(50, 'muito longo')
    .required('Campo obrigatório'),
    localidade: Yup.string()
    .min(3, 'muito curto')
    .max(30, 'muito longo')
    .required('Campo obrigatório'),
    numero: Yup.string()
    .min(1, 'muito curto')
    .max(10, 'muito longo')
    .required('Campo obrigatório'),
    complemento: Yup.string()
    .min(1, 'muito curto')
    .max(10, 'muito longo'),
    uf: Yup.string()
    .min(2, 'muito curto')
    .max(2, 'muito longo')
    .required('Campo obrigatório'),
    pais: Yup.string()
    .min(3, 'muito curto')
    .max(40, 'muito longo')
    .required('Campo obrigatório'),
    
});

const formikProps = useFormik({
  initialValues: {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    pais: "",
    tipo: "RESIDENCIAL",
    complemento: "",
    numero: "",
  },
  onSubmit: async (values: any, actions: any) => {
    if (!atualizar) {
      await postAddress(values);
    }
    if (atualizar) {
      await updateAddress();
    }
    actions.setSubmitting(false);
  },validationSchema: SignupSchema
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

// paginação

interface Column {
  id: 'logradouro' | 'numero' | 'complemento' | 'cidade' | 'estado' | 'pais' | 'acao';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'logradouro', label: 'Rua', minWidth: 170 },
  { id: 'numero', label: 'Número', minWidth: 100 },
  {
    id: 'complemento',
    label: 'Complemento',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'cidade',
    label: 'Cidade',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'estado',
    label: 'Estado',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'pais',
    label: 'País',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'acao',
    label: 'Ações',
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
    <ContainerAddress>
      <Button onClick={handleOpen}>Cadastrar Endereço</Button>
      <Modal
        open = {open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
    <h1>Endereços</h1>
    <form onSubmit={formikProps.handleSubmit}>
      <div>
      <label htmlFor="cep">CEP:</label>
      <input
        id="cep"
        name="cep"
        placeholder="Digite seu cep"
        value={formikProps.values.cep}
        onChange={formikProps.handleChange}
      />
      {formikProps.errors.cep && formikProps.touched.cep ? (
                <div>{formikProps.errors.cep}</div>
                ) : null}

      <button
        type="button"
        onClick={() => getAddress(formikProps.values.cep)}
      >
        Buscar
      </button>
      </div>

    <div>
      <label htmlFor="logradouro">Logradouro:</label>
      <input
        id="logradouro"
        name="logradouro"
        placeholder="Digite seu logradouro"
        value={formikProps.values.logradouro}
        onChange={formikProps.handleChange}
      />
       {formikProps.errors.logradouro && formikProps.touched.logradouro ? (
                <div>{formikProps.errors.logradouro}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="numero">Número:</label>
      <input
        id="numero"
        name="numero"
        placeholder="Digite o número da sua residência"
        value={formikProps.values.numero}
        onChange={formikProps.handleChange}
      />
       {formikProps.errors.numero && formikProps.touched.numero ? (
                <div>{formikProps.errors.numero}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="complemento">Complemento:</label>
      <input
        id="complemento"
        name="complemento"
        placeholder="Digite o seu complemento"
        value={formikProps.values.complemento}
        onChange={formikProps.handleChange}
      />
       {formikProps.errors.complemento && formikProps.touched.complemento ? (
                <div>{formikProps.errors.complemento}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="bairro">Bairro:</label>
      <input
        id="bairro"
        name="bairro"
        placeholder="Digite seu bairro"
        value={formikProps.values.bairro}
        onChange={formikProps.handleChange}
      />
      {formikProps.errors.bairro && formikProps.touched.bairro ? (
                <div>{formikProps.errors.bairro}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="localidade">Cidade:</label>
      <input
        id="localidade"
        name="localidade"
        placeholder="Digite sua localidade"
        value={formikProps.values.localidade}
        onChange={formikProps.handleChange}
      />
      {formikProps.errors.localidade && formikProps.touched.localidade ? (
                <div>{formikProps.errors.localidade}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="uf">Estado:</label>
      <input
        id="uf"
        name="uf"
        placeholder="Digite a sigla do seu estado"
        value={formikProps.values.uf}
        onChange={formikProps.handleChange}
      />
      {formikProps.errors.uf && formikProps.touched.uf ? (
                <div>{formikProps.errors.uf}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="pais">País:</label>
      <input
        id="pais"
        name="pais"
        placeholder="Digite o seu país"
        value={formikProps.values.pais}
        onChange={formikProps.handleChange}
      />
      {formikProps.errors.pais && formikProps.touched.pais ? (
                <div>{formikProps.errors.pais}</div>
                ) : null}
    </div>

    <div>
      <label htmlFor="tipo">Tipo de contato:</label>
      <select
        name="tipo"
        value={formikProps.values.tipo}
        onChange={formikProps.handleChange}
      >
        <option value="RESIDENCIAL">Residencial</option>
        <option value="COMERCIAL">Comercial</option>
      </select>
    </div>

    <button type="submit">Submit</button>
  </form>
  </Box>
    </Modal>
  <div>
    <h1>Lista de endereços</h1>
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
                            <button onClick={() => setupUpdateAddress(row.id)}> atualizar</button>
                              
                              </>
                            <>
                            <button onClick={() => deleteAddress(row.id)}> deletar </button>
                            
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
        </div>
        </ContainerAddress>
) ;
}

export default Address