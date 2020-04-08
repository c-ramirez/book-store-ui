import { Router } from '@angular/router';
import { RegistroService } from './registro.service';
import { Usuario } from './../login/model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../login/model/Persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: Usuario;
  constructor(private registroService: RegistroService, private router: Router) {
    this.usuario = new Usuario();
    this.usuario.roles = [];
    this.usuario.persona = new Persona();
    this.usuario.persona.fechaNacimiento = new Date();
    this.usuario.persona.genero = 'M';
  }

  ngOnInit() {
  }
  registrarUsuario(userForm) {
    if (userForm.form.valid) {
      this.registroService.crearUsuario(this.usuario).subscribe(resp => {
        Swal.fire('Exito', 'Se creo el usuario correctamente, puede ahora iniciar sesión', 'success');
        this.router.navigate(['/login']);
      }, err => {
        Swal.fire('Error', 'Ocurrio un error al crear el usuario', 'error');
      });
    } else {
      Swal.fire('Error', 'Complete los campos obligatorios', 'error');
    }

  }
}
