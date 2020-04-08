import { DetalleCompra } from './DetalleCompra';
export class Compra {
    id: number;
    codigo: string;
    total: number;
    fecha: Date;
    usuarioId: string;
    usuarioDocumento: string;
    detalles: Array<DetalleCompra>;
}
