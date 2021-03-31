export interface Pedido{
    cd_pedido: number,
    valor_pedido: number,
    fk_cd_usuario: number,
    data_pedido: Date
}

export interface DetalhesPedido{
    valorPedido: number,
    dataPedido: Date,
    listapizzaspedidos: string[]
}

export interface NovoPedido{
    lista_pizza: number[],
    valor_pedido: number,
    cd_usuario: number,
    data_pedido: Date
}