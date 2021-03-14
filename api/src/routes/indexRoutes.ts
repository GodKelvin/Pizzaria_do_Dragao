import { Router } from 'express';
import pizzasRoutes from '../routes/pizzas/rt_pizzas';
import usersRoutes from '../routes/usuarios/rt_users';
import authRoutes from '../routes/authenticate/rt_authenticate';
import authMiddleware from '../middlewares/authMiddleware';

const routes = Router();


//midleware
routes.use(authMiddleware);

//Modulos criados para as rotas
routes.use(pizzasRoutes);
routes.use(usersRoutes);
routes.use(authRoutes);


export default routes;