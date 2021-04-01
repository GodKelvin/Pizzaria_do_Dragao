import { Router } from 'express';
import * as ctrl from '../../controllers/users/ct_users';
import {check} from 'express-validator';
const usersRoutes = Router();

usersRoutes.get('/usuario', registerValidator(), ctrl.getDataUser);

usersRoutes.post('/usuario', registerValidator(), ctrl.createUser);

usersRoutes.put('/usuario', editValidator(), ctrl.editUser);

//Funcoes que checa os parametros obrigatorios das rotas
function registerValidator() {
    return [
        check('nome_usuario').notEmpty().withMessage('pendente'),
        check('senha').notEmpty().withMessage('pendente'),
        check('email').notEmpty().withMessage('pendente'),
        check('cpf').notEmpty().withMessage('pendente'),
        check('data_nascimento').notEmpty().withMessage('pendente'),
        check('telefone').notEmpty().withMessage('pendente')
    ]
}

function editValidator() {
    return [
        check('cd_usuario').notEmpty().withMessage('pendente'),
        check('nome').notEmpty().withMessage('pendente'),
        check('senha').notEmpty().withMessage('pendente'),
        check('email').notEmpty().withMessage('pendente'),
        check('cpf').notEmpty().withMessage('pendente'),
        check('data_nascimento').notEmpty().withMessage('pendente'),
        check('telefone').notEmpty().withMessage('pendente')
    ]
}
  

export default usersRoutes;