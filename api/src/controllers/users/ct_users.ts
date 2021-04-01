import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {bd} from '../../database';
import {validationResult} from 'express-validator';
import {HTTP_STATUS} from '../../utils/utils';
import jwt from 'jsonwebtoken';
import Config from '../../app-config.model';

export const getDataUser = async (req: Request, res: Response): Promise<any> => {
    try{
        let token: any = req.headers.authorization;
        if(token){
            let data:any = jwt.verify(token, Config.token.key_secret);
            let userID: any = data.userId;
            bd('usuario')
            .select('nome', 'email', 'cpf', 'data_nascimento', 'telefone')
            .where('cd_usuario', userID)
            .then(row => {
                res.status(HTTP_STATUS.OK).json(row);
            }).catch(error => {
                console.log("ERROR: ", error);
                res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
            })
            
        }else{
            let res_bad = {
                error: "Pendente token"
            }
            res.status(HTTP_STATUS.BAD_REQUEST).json(res_bad);
        }
        
        //const data = jwt.verify(token, Config.token.key_secret);
    }catch(error){
        console.log("ERROR: ", error);
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
    }
}

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
        console.log("ERROR: ", error);
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
    }
}

export const editUser = async (req: Request, res: Response): Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }
        let data_usuario = req.body;
        let cd_usuario = data_usuario.cd_usuario;
        data_usuario.senha = bcrypt.hashSync(data_usuario.senha, 9);

        delete data_usuario.cd_usuario;
        bd('usuario')
        .update(data_usuario)
        .where("cd_usuario", cd_usuario)
        .then(resBD => {
            res.status(HTTP_STATUS.OK).json(resBD);
        });
    }catch(error){
        console.log("ERROR: ", error);
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
    }
}
