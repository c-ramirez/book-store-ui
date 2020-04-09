import Swal from 'sweetalert2';
import { AuthService } from './../login/auth.service';
import { Libro } from './../catalogo/modelo/Libro';
import { ComentarioService } from './comentario.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Comentario } from './modelo/Comentario';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit, OnChanges {
  @Input()
  libro: Libro;
  comentarios: Array<Comentario> = [];
  comentario: Comentario;
  editComentario: Comentario;
  constructor(private comentarioService: ComentarioService,
    private authService: AuthService) {
    this.comentario = new Comentario();
    this.editComentario = new Comentario();
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.libro) {
      this.comentarioService.obtenerComentarios(this.libro.isbn).subscribe(result => {
        console.log(result);
        this.comentarios = result;
      });
    }
  }
  public guardarComentario() {
    if (this.comentario.comentario) {
      const usuario = this.authService.usuario;
      this.comentario.libroId = this.libro.id;
      this.comentario.libroIsbn = this.libro.isbn;
      this.comentario.libroNombre = this.libro.titulo;
      this.comentario.usuarioId = usuario.id;
      this.comentario.usuarioNombre = usuario.username;
      this.comentarioService.guardarComentario(this.comentario).subscribe(result => {
        result.publicacion = new Date();
        this.comentarios.unshift(result);
        Swal.fire('Guardado', 'El comentario fue publicado', 'success');
        this.comentario = new Comentario();
      }, err => {
        if (err.status === 401) {
          Swal.fire('Error', 'Para publicar un comentario debe iniciar sesión', 'error');
        } else {
          Swal.fire('Error', 'Ocurrio un error al escribir el comentario', 'error');
        }

      });
    } else {
      Swal.fire('Error', 'El comentario no puede estar vacio', 'error');
    }

  }
  public habilitarEdicion(comentario: Comentario) {
    this.editComentario.comentario = comentario.comentario;
    this.editComentario.id = comentario.id;
    comentario.editar = true;
  }
  public editarComentario(comentario: Comentario) {
    this.comentarioService.editarComentario(this.editComentario).subscribe(result => {
      comentario.comentario = this.editComentario.comentario;
      comentario.editar = false;
    });
  }
  public cancelarEdicion(comentario: Comentario) {
    comentario.editar = false;
  }
  public eliminarComentario(id: number) {
    Swal.fire({
      text: '¿Deseas eliminar el comentario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.comentarioService.eliminarComentario(id).subscribe(result => {
          this.comentarios = this.comentarios.filter(c => id !== c.id);
          Swal.fire('Guardado', 'El comentario fue borrado', 'success');
        }, err => {
          Swal.fire('Error', 'Ocurrio un error al eliminar el comentario', 'error');
        });
      }
    });

  }

}
