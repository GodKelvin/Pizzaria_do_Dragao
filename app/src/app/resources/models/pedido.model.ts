export interface Pedido{
    cd_pedido: number,
    valor_pedido: number,
    fk_cd_usuario: number,
    data_pedido: Date
}