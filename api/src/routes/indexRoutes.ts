import { Router } from 'express';
import pizzasRoutes from '../routes/pizzas/rt_pizzas';

const routes = Router();

//Modulos criados para as rotas
routes.use(pizzasRoutes);

export default routes;