import {Request, Response} from 'express';
import {bd} from '../../database';

//Checar parametros
export const createUser = async (req: Request, res: Response): Promise<any> => {
    try{
        const {nome_usuario, senha_cliente, email_cliente, cpf_cliente, data_nascimento_cliente} = req.body;
        bd.select().from('cliente').where('email', email_cliente).then(row => {
            console.log("ROW: ", row);
            if(!row.length){
                console.log("OPA!");
                bd('cliente').insert({
                    nome: nome_usuario,
                    senha: senha_cliente,
                    email: email_cliente,

                })
            }else{
                console.log("EXISTE :(");
            }
        });
    }catch(error){

    }
}

