import { Request, Response, NextFunction } from "express";
import {HTTP_STATUS} from '../utils/utils';
import jwt from 'jsonwebtoken';
import Config from '../app-config.model';

interface TokenPayload {
    "userId": number,
    "userName": string,
    "iat": number,
    "exp": number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers;

    if(!authorization){
        let res_error = {
            error: "Acesso negado"
        }
        res.status(HTTP_STATUS.UNAUTHORIZED).json(res_error);
        return;
    }

    

    try{
        const token = authorization.replace('Bearer', '').trim();
        //Verificar se os dados do token fazem sentido
        const data = jwt.verify(token, Config.token.key_secret);
        console.log("DATA: ", data);
        //Prosseguir com os middlewares
        return next();
    }catch{
        res.status(HTTP_STATUS.SERVER_ERROR).json("SERVER INTERNAL ERROR");
    }
}