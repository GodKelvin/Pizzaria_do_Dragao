import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {bd} from '../../database';
import {validationResult} from 'express-validator';
import {HTTP_STATUS} from '../../utils/utils';
//Checar parametros
export const createUser = async (req: Request, res: Response): Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }

        let {email} = req.body;
        bd.select().from('usuario').where('email', email).then(row => {
            if(!row.length){
                //Se nao encontrar o email, captura o restante dos parametros
                let {nome_usuario, senha, cpf, data_nascimento, tipo_usuario, telefone, confirmar_senha} = req.body;

                //Verifica se as senhas sao iguais
                if(senha != confirmar_senha){
                    let res_bad = {
                        error: "Senhas não conferem"
                    };
                    res.status(HTTP_STATUS.BAD_REQUEST).json(res_bad);
                    return;
                }

                senha = bcrypt.hashSync(senha, 9);
                
                bd('usuario').insert({
                    nome: nome_usuario,
                    senha: senha,
                    email: email,
                    cpf: cpf,
                    data_nascimento: data_nascimento,
                    telefone: telefone,
                    fk_cd_tipo_usuario: tipo_usuario

                }).then((_row) => {
                    let res_ok = {
                        userName: nome_usuario,
                        email: email,
                        data_nascimento: data_nascimento,
                        telefone: telefone
                    };
                    res.status(HTTP_STATUS.OK).json(res_ok);
                })
            }else{
                let res_bad = {
                    type: 'email',
                    error: "email já cadastrado"
                };
                res.status(HTTP_STATUS.BAD_REQUEST).json(res_bad);
            }
        });
    }catch(error){
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
    }
}