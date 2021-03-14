import { Router } from 'express';
import * as ctrl from '../../controllers/authenticate/ct_authenticate';
import {check} from 'express-validator';

const authRoutes = Router();

authRoutes.post('/login', loginValidator(), ctrl.authenticate);



function loginValidator() {
    return [
        check('email').notEmpty().withMessage('pendente'),
        check('senha').notEmpty().withMessage('pendente')
    ]
}
  


export default authRoutes;