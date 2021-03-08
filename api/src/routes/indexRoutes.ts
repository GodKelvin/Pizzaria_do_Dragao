import { Router } from 'express';
import pizzasRoutes from '../routes/pizzas/rt_pizzas';
import usersRoutes from '../routes/usuarios/rt_users';

const routes = Router();

//Modulos criados para as rotas
routes.use(pizzasRoutes);
routes.use(usersRoutes);

export default routes;