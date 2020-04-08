import { Libro } from '../../catalogo/modelo/Libro';
export class DetalleCompra {
    id: number;
    libroId: number;
    libroIsbn: string;
    libroTitulo: string;
    cantidad: number;
    subtotal: number;
    precioUnidad: number;
    
    usuarioId: number;
    usuarioDocumento: string;
}
