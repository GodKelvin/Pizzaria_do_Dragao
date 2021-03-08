import { Router } from 'express';
import * as ctrl from '../../controllers/users/ct_users';

const usersRoutes = Router();

usersRoutes.get('/usuarios', ctrl.createUser);

export default usersRoutes;