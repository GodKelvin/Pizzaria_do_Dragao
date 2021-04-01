export interface Usuario{
    cd_usuario?: number,
    nome_usuario: string,
    senha: string,
    confirmar_senha: string,
    email: string,
    cpf: string,
    data_nascimento: Date,
    telefone: string,
    tipo_usuario?: number
}

export interface Password{
    senha: string,
    confirmar_senha: string
  }