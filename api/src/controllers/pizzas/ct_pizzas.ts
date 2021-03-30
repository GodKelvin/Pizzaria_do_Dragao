import {Request, Response} from 'express';
import {bd} from '../../database';
import {HTTP_STATUS} from '../../utils/utils';

export const getPizzas = async (req: Request, res: Response):Promise<any> => {
    try{
        bd.select().from('pizza').then(rows => {
            return res.status(200).json(rows);
        });
    }catch(error){
        console.log("ERROR: ", error);
        return res.status(500).json("Internal Server Error");
    }
}

//Refatorar codigo
export const getPizzaByID = async (req: Request, res: Response):Promise<any> => {
    try{
        const id = parseInt(req.params.id);
        //const response: QueryResult = await pool.query("SELECT * FROM pizza WHERE cd_pizza = $1;", [id]);
        bd('pizza').
        where('cd_pizza', id)
        .then(rows => {
            res.status(200).json(rows);
        }).catch(error => {
            console.log("ERROR: ", error);
            res.status(500).json("Internal Server Error");
        })

    }catch(error){
        console.log("ERROR: ", error);
        return res.status(500).json("Internal Server Error");
    }
}

export const getAllPizzaDetails = async (req: Request, res: Response):Promise<any> => {
    try{
        bd('pizza')
        .innerJoin('pizza_ingrediente', 'pizza.cd_pizza', 'pizza_ingrediente.fk_cd_pizza')
        .innerJoin('ingrediente', 'pizza_ingrediente.fk_cd_ingrediente', 'ingrediente.cd_ingrediente')
        .select(
            'pizza.nm_pizza as nomePizza',
            'pizza.preco as precoPizza',
            bd.raw('json_agg((ingrediente.cd_ingrediente, ingrediente.nm_ingrediente)) as listaIngredientesPizza')
        ).groupBy('pizza.nm_pizza', 'pizza.preco')
        .then(rows => {
            res.status(HTTP_STATUS.OK).json(rows);
        }).catch(error => {
            console.log("ERROR: ", error);
            res.status(500).json("Internal Server Error");
        })

//        return res.status(200).json(response.rows);
    }catch(error){
        console.log("ERROR: ", error);
        return res.status(500).json("SERVER INTERNAL ERROR");
    }
}