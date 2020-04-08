import { Usuario } from './../login/model/Usuario';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../login/model/Rol';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  endPoint = 'http://localhost:8080/api';
  constructor(private http: HttpClient, private router: Router) { }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.endPoint + '/usuario', this.iniciarUsuario(usuario));
  }
  private iniciarUsuario(usuario: Usuario): Usuario {
    const rol = new Rol();
    rol.nombre = 'ROLE_USER';
    usuario.roles.push(rol);
    usuario.recordar = false;
    usuario.activo = true;
    return usuario;
  }
}
