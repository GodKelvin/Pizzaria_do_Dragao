import {Request, Response} from 'express';
import {bd} from '../../database';
import {HTTP_STATUS} from '../../utils/utils';
import {validationResult} from 'express-validator';

export const getPedidos = async (req: Request, res: Response):Promise<any> => {
    try{
        bd.select().from('pedido').then(rows => {
            return res.status(200).json(rows);
        });
    }catch(error){
        console.log("ERROR: ", error);
        return res.status(500).json("Internal Server Error");
    }
}

export const getPedidosbyID = async (req: Request, res: Response):Promise<any> => {
    try{
        const id_pedido = parseInt(req.params.id_pedido);
        bd.select()
        .from('pedido')
        .where('cd_pedido', id_pedido)
        .then(rows => {
            res.status(200).json(rows);
        });
    }catch(error){
        console.log("ERROR: ", error);
        res.status(500).json("Internal Server Error");
    }
}

export const getPedidosbyUser = async (req: Request, res: Response):Promise<any> => {
    try{
        const id_user = parseInt(req.params.id_user);
        bd.select()
        .from('pedido')
        .where('fk_cd_usuario', id_user)
        .then(rows => {
            res.status(200).json(rows);
        });
    }catch(error){
        console.log("ERROR: ", error);
        res.status(500).json("Internal Server Error");
    }
}

export const getPedidosDetails = async (req: Request, res: Response):Promise<any> => {
    try{
        const id_pedido = parseInt(req.params.id_pedido);
        bd('pedido')
        .innerJoin('pedido_pizza', 'pedido.cd_pedido', 'pedido_pizza.fk_cd_pedido')
        .innerJoin('pizza', 'pedido_pizza.fk_cd_pizza', 'pizza.cd_pizza')
        .where('pedido.cd_pedido', id_pedido)
        .select(
            'pedido.valor_pedido as valorPedido',
            'pedido.data_pedido as dataPedido',
            bd.raw('json_agg((pizza.cd_pizza, pizza.nm_pizza)) as listaPizzasPedidos')
        ).groupBy('pedido.valor_pedido', 'pedido.data_pedido')
        .then(rows => {
            res.status(HTTP_STATUS.OK).json(rows);
        }).catch(error => {
            console.log("ERROR: ", error);
            res.status(500).json("Internal Server Error");
        })

    }catch(error){
        console.log("ERROR: ", error);
        res.status(500).json("Internal Server Error");
    }
}

export const postItemPedido = async (req: Request, res: Response):Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }

        let {lista_pizza, cd_pedido} = req.body;
        let dadosPedido = lista_pizza.map((cd_pizza: Number) =>{
            return {
                fk_cd_pizza: cd_pizza, 
                fk_cd_pedido: cd_pedido
            }
        });

        bd('pedido_pizza')
        .insert(dadosPedido)
        .then(_rows => {
            let res_ok = {
                "items": lista_pizza,
                "pedido": cd_pedido
            };

            res.status(HTTP_STATUS.OK).json(res_ok);
        }).catch(error => {
            console.log("ERRR: ", error);
            res.status(HTTP_STATUS.SERVER_ERROR).json("Server Internal Error");
        });
    }catch(error){
        console.log("ERRR: ", error);
        res.status(HTTP_STATUS.SERVER_ERROR).json("Server Internal Error");
    }

}

export const postPedido = async (req: Request, res: Response):Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }

        let cd_pedido: Number = 0;
        let {lista_pizza, cd_usuario, valor_pedido, data_pedido} = req.body;
        console.log("VALORES: ", lista_pizza, cd_usuario, valor_pedido);
        bd.transaction((trx) => {
            //Insere o id no banco de dados e captura o ID da insercao
            return trx('pedido').insert({
                valor_pedido: valor_pedido,
                fk_cd_usuario: cd_usuario,
                data_pedido: data_pedido
            }, 'cd_pedido')
            //Se o pedido for criado com sucesso, insere a lista de produtos(pizza) junto com o ID retornado do pedido criado
            .then(resBD => {
                cd_pedido = resBD[0]

                let dadosPedido = lista_pizza.map((cd_pizza: Number) =>{
                    return {
                        fk_cd_pizza: cd_pizza, 
                        fk_cd_pedido: cd_pedido
                    }
                });

                return trx('pedido_pizza').insert(dadosPedido);
            })
            .then(trx.commit)
            .catch(error => {
                trx.rollback();
                console.log("ERROR TRANSACTION INSERT PEDIDO 1: ", error);
            })
        }).then(resBD => {
            let res_ok = {
                cd_pedido: cd_pedido,
                data_pedido: data_pedido
            }
            res.status(HTTP_STATUS.OK).json(res_ok);
        }).catch(error => {
            console.log("ERROR TRANSACTION INSERT PEDIDO 1: ", error);
            res.status(HTTP_STATUS.SERVER_ERROR).json("Internal Server Error");
        });

       

    }catch(error){
        console.log("ERROR: ", error);
        res.status(500).json("Internal Server Error");
    }
}

export const deletePedido = async (req: Request, res: Response):Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }

        const id_pedido = parseInt(req.params.id_pedido);
        bd('pedido')
        .where('cd_pedido', id_pedido)
        .then(rows => {
            res.status(200).json(rows);
        });
    }catch(error){
        console.log("ERROR: ", error);
        res.status(500).json("Internal Server Error");
    }
}

export const deleteItemPedido = async (req: Request, res: Response):Promise<any> => {
    try{
        const checkFields = validationResult(req);
        if(!checkFields.isEmpty()){
            res.status(HTTP_STATUS.BAD_REQUEST).json(checkFields);
            return;
        }

        const id_item_pedido = parseInt(req.params.id_item_pedido);
        bd('pedido_pizza')
        .where('cd_pedido_pizza', id_item_pedido)
        .then(rows => {
            res.status(200).json(rows);
        });
    }catch(error){
        console.log("ERROR: ", error);
        res.status(500).json("Internal Server Error");
    }
}

