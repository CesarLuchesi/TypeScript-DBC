export interface UsersDTO{
  people:{
    idPessoa: number;
    nome: string;
    email: string;
    dataNascimento: string;
    cpf: string;
  }[]
}