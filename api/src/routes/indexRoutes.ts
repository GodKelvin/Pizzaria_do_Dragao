import { Router } from 'express';
import pizzasRoutes from '../routes/pizzas/rt_pizzas';
import usersRoutes from './users/rt_users';
import authRoutes from '../routes/authenticate/rt_authenticate';
//import authMiddleware from '../middlewares/authMiddleware';
import pedidosRoutes from '../routes/pedidos/rt_pedidos';

const routes = Router();


//midleware


//Modulos criados para as rotas
routes.use(pizzasRoutes);
routes.use(usersRoutes);
routes.use(authRoutes);
routes.use(pedidosRoutes);



export default routes;