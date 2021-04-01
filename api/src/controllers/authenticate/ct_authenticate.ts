import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {bd} from '../../database';
import {validationResult} from 'express-validator';
import {HTTP_STATUS} from '../../utils/utils';
import jwt from 'jsonwebtoken';
import Config from '../../app-config.model';
//Checar parametros

interface User{
    cd_usuario: number,
    nome: string,
    senha: string,
    email: string,
    cpf: string,
    data_nascimento: Date,
    telefone: string,
    fk_cd_tipo_usuario: number
};

export const authenticate = async (req: Request, res: Response): Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }
        let {senha, email} = req.body;

        bd.select().from('usuario').where('email', email).then(row => {
            if(!row.length){    
                let res_denied = {
                    error: "Acesso negado"
                };
                res.status(HTTP_STATUS.UNAUTHORIZED).json(res_denied);
            }else{
                let usuario: User = row[0] as User;
                //Verificando se a senha eh valida
                bcrypt.compare(senha, usuario.senha).then(valid => {
                    if(valid){
                        const tokenUser = jwt.sign({userId: usuario.cd_usuario, userName: usuario.nome}, Config.token.key_secret, Config.token.duration);

                        const res_login = {
                            //user: dataUser,
                            //cd_usuario: usuario.cd_usuario,
                            token: tokenUser
                        };
                        res.status(HTTP_STATUS.OK).json(res_login);
                    }else{
                        let res_denied = {
                            error: "Acesso negado"
                        };
                        res.status(HTTP_STATUS.UNAUTHORIZED).json(res_denied);
                    }
                });
            }
        });
    }catch(error){
        console.log("ERROR: ", error);
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER ERROR");
    }
}



