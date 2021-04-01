import { Router } from 'express';
import * as ctrl from '../../controllers/users/ct_users';
import {check} from 'express-validator';
const usersRoutes = Router();

usersRoutes.get('/usuario', registerValidator(), ctrl.getDataUser);

usersRoutes.post('/usuario', registerValidator(), ctrl.createUser);

//No momento nao esta sendo utilizado
//usersRoutes.put('/usuario', editValidator(), ctrl.editUser);

usersRoutes.put('/usuario-pass', editPassValidator(), ctrl.editPassword);

//Funcoes que checa os parametros obrigatorios das rotas
function registerValidator() {
    return [
        check('nome_usuario').notEmpty().withMessage('pendente'),
        check('senha').notEmpty().withMessage('pendente'),
        check('confirmar_senha').notEmpty().withMessage('pendente'),
        check('email').notEmpty().withMessage('pendente'),
        check('cpf').notEmpty().withMessage('pendente'),
        check('data_nascimento').notEmpty().withMessage('pendente'),
        check('telefone').notEmpty().withMessage('pendente')
    ]
}

function editPassValidator() {
    return [
        check('senha').notEmpty().withMessage('pendente'),
        check('confirmar_senha').notEmpty().withMessage('pendente')
    ]
}

//No momento nao esta sendo utilizado
function editValidator() {
    return [
        check('cd_usuario').notEmpty().withMessage('pendente')
        // check('nome').notEmpty().withMessage('pendente'),
        // check('senha').notEmpty().withMessage('pendente'),
        // check('confirmar_senha').notEmpty().withMessage('pendente'),
        // check('email').notEmpty().withMessage('pendente'),
        // check('cpf').notEmpty().withMessage('pendente'),
        // check('data_nascimento').notEmpty().withMessage('pendente'),
        // check('telefone').notEmpty().withMessage('pendente')
    ]
}
  

export default usersRoutes;