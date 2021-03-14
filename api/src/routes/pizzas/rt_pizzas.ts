import { Router } from 'express';
import * as ctrl from '../../controllers/pizzas/ct_pizzas';
const pizzasRoutes = Router();

pizzasRoutes.get('/pizzas', ctrl.getPizzas);
pizzasRoutes.get('/pizzas/:id', ctrl.getPizzaByID);
pizzasRoutes.get('/pizzas-details', ctrl.getAllPizzaDetails);

export default pizzasRoutes;