import { Router } from 'express';
import * as ctrl from '../../controllers/users/ct_users';
import {check, body} from 'express-validator';
const usersRoutes = Router();

usersRoutes.post('/usuarios', ctrl.createUser);



export default usersRoutes;