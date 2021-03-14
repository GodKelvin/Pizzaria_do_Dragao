import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {bd} from '../../database';
import {check, body, validationResult} from 'express-validator';
import {HTTP_STATUS} from '../../utils/utils';
//Checar parametros
export const createUser = async (req: Request, res: Response): Promise<any> => {
    try{
        let {nome_usuario, senha, email, cpf, data_nascimento, tipo_usuario, telefone} = req.body;
        
        console.log(nome_usuario, senha, email, cpf, data_nascimento, tipo_usuario);
        senha = bcrypt.hashSync(senha, 9);

        bd.select().from('usuario').where('email', email).then(row => {
            if(!row.length){
                bd('usuario').insert({
                    nome: nome_usuario,
                    senha: senha,
                    email: email,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    telefone: telefone,
                    fk_cd_tipo_usuario: tipo_usuario

                }).then(row => {
                    res.status(HTTP_STATUS.OK).json("usuario criado com sucesso");
                })
            }else{
                res.status(HTTP_STATUS.BAD_REQUEST).json("email já cadastrado");
            }
        });
    }catch(error){
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
    }
}



