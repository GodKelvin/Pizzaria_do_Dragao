import notify from 'devextreme/ui/notify';

export function notificacao(msg: string, tipoNotificacao: string): void{
    notify({ message: msg, width: 300, shading: false }, tipoNotificacao, 5000);
}