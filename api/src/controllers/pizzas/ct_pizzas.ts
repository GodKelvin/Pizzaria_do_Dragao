import {Request, Response} from 'express';
import {Query, QueryResult} from 'pg';
import {pool} from '../../database';

export const getPizzas = async (req: Request, res: Response):Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM pizza');
        return res.status(200).json(response.rows);
    }catch(error){
        console.log("ERROR: ", error);
        return res.status(500).json("Internal Server Error");
    }
}

export const getPizzaByID = async (req: Request, res: Response):Promise<Response> => {
    try{
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query("SELECT * FROM pizza WHERE cd_pizza = $1;", [id]);
        return res.status(200).json(response.rows);
    }catch(error){
        return res.status(500).json("Internal Server Error");
    }
}

export const getAllPizzaDetails = async (req: Request, res: Response):Promise<Response> => {
    try{
        const response: QueryResult = await pool.query(
            "SELECT pizza.nm_pizza, pizza.preco, ingrediente.nm_ingrediente\
            FROM pizza\
            INNER JOIN pizza_ingrediente\
            ON(pizza.cd_pizza = pizza_ingrediente.fk_cd_pizza)\
            INNER JOIN ingrediente\
            ON(pizza_ingrediente.fk_cd_ingrediente = ingrediente.cd_ingrediente);"
        );
        return res.status(200).json(response.rows);
    }catch(error){
        return res.status(500).json("SERVER INTERNAL ERROR");
    }
}