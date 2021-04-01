import { Router } from 'express';
import * as ctrl from '../../controllers/pedidos/ct_pedidos';
import {check} from 'express-validator';
const pedidosRoutes = Router();


pedidosRoutes.get('/pedidos', ctrl.getPedidos);
pedidosRoutes.get('/pedidos/:id_pedido', ctrl.getPedidosbyID);
pedidosRoutes.get('/pedidos/user/:id_user', ctrl.getPedidosbyUser);
pedidosRoutes.get('/pedidos/details/:id_pedido', ctrl.getPedidosDetails);

//pedidosRoutes.get('/pedidos/details/:id_pedido', ctrl.teste);

pedidosRoutes.post('/pedidos', pedidoValidator(), ctrl.postPedido);
pedidosRoutes.post('/pedidos/item/', pedidoItemValidator(), ctrl.postItemPedido);

pedidosRoutes.delete('/pedidos/:id_pedido', ctrl.deletePedido);
//pedidosRoutes.delete('/pedidos/item/:id_item_pedido', ctrl.deleteItemPedido);

//Funcoes que checa os parametros obrigatorios das rotas
function pedidoValidator() {
    return [
        check('lista_pizza').notEmpty().withMessage('pendente'),
        check('valor_pedido').notEmpty().withMessage('pendente'),
        check('cd_usuario').notEmpty().withMessage('pendente'),
        check('data_pedido').notEmpty().withMessage('pendente'),
    ]
}

function pedidoItemValidator() {
    return [
        check('lista_pizza').notEmpty().withMessage('pendente'),
        check('cd_pedido').notEmpty().withMessage('pendente'),
    ]
}
  
  

export default pedidosRoutes;