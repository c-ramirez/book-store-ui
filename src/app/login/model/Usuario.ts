import { Rol } from './Rol';
import { Persona } from './Persona';


export class Usuario {
    id: number;
    username: string;
    password: string;
    confirmPassword: string;
    persona: Persona;
    roles: Array<Rol>;
    authorities: string[] = [];
    recordar: boolean;
    activo: boolean;
}
