import {Request, Response} from 'express';
import {pool} from '../database';


export const getUsers = (req: Request, res: Response) => {
    res.send("Users");
}