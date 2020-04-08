import { Tag } from './Tag';
import { Editorial } from './Editorial';
import { Autor } from './Autor';

export class Libro {
    id: number;
    isbn: string;
    titulo: string;
    publicacion: Date;
    sinopsis: string;
    edicion: number;
    paginas: number;
    precio: number;
    cantidad: number;
    autor: Autor;
    editorial: Editorial;
    tags: Array<Tag>;

}
