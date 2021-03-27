import { Router } from 'express';
import * as ctrl from '../../controllers/users/ct_users';
import {check} from 'express-validator';
const usersRoutes = Router();

usersRoutes.post('/createUser', registerValidator(), ctrl.createUser);

//Funcoes que checa os parametros obrigatorios das rotas
//Inserir mais verificacoes
function registerValidator() {
    return [
        check('nome_usuario').notEmpty().withMessage('pendente'),
        check('senha').notEmpty().withMessage('pendente'),
        check('email').notEmpty().withMessage('pendente'),
        check('cpf').notEmpty().withMessage('pendente'),
        check('data_nascimento').notEmpty().withMessage('pendente'),
        check('telefone').notEmpty().withMessage('pendente'),
        check('tipo_usuario').notEmpty().withMessage('pendente')
    ]
}
  

export default usersRoutes;