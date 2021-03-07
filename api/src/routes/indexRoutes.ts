import { Router } from 'express';
import * as ctrl from '../controllers/indexController';

const router = Router();

router.get('/users', ctrl.getUsers);

export default router;