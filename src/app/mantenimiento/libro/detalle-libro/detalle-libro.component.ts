import { tap } from 'rxjs/operators';
import { CategoriaService } from './../../categoria/categoria.service';
import { Tag } from './../../../catalogo/modelo/Tag';
import { AutorService } from './../../autor/autor.service';
import { ActivatedRoute } from '@angular/router';
import { Libro } from './../../../catalogo/modelo/Libro';
import { LibroService } from './../libro.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Autor } from 'src/app/catalogo/modelo/Autor';
import Swal from 'sweetalert2';
import { MatListModule } from '@angular/material/list';
import * as _ from 'lodash';
@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {
  private libro: Libro;
  private tempLibro: Libro;
  private edicion = false;
  publicacionForm: FormControl;
  private autores: Array<Autor>;
  categorias: Array<Tag>;
  constructor(private libroService: LibroService,
    private autorService: AutorService,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.autorService.obtenerAutores().subscribe(result => {
      this.autores = result;
    });
    this.categoriaService.obtenerCategorias().subscribe(result => {
      this.categorias = result;
      this.categorias.forEach(tag => tag.selected = false);
    });
    this.activatedRoute.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      if (isbn) {
        this.libroService.obtenerDetalleLibro(isbn).subscribe(
          (response: Libro) => {
            console.log(response);
            this.libro = response;
            this.publicacionForm = new FormControl(this.libro.publicacion);
            this.tempLibro = _.cloneDeep(this.libro);
            for (let cat of this.categorias) {
              for (let tag of this.libro.tags) {
                if (cat.nombre === tag.nombre) {
                  cat.selected = true;
                }
              }
            }
          }
        );
      }
    });

  }
  habilitarEdicion() {
    this.tempLibro = _.cloneDeep(this.libro);
    this.edicion = !this.edicion;
  }
  guardarCambios() {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea guardar los cambios?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.libro.autor = _.cloneDeep(this.autores.filter(a => a.id === this.libro.autor.id)[0]);
        console.log(this.libro);
        this.libroService.guardarLibro(this.libro).subscribe(result => {
          this.edicion = false;
          Swal.fire('Cambios guardados', 'Se guardo los cambios realizados en el Libro', 'info');
        }, err => {
          Swal.fire('Error', 'Ocurrio un error al guardar los cambios', 'error');
        });

      }
    });
  }
  cancelarEdicion() {
    this.libro = _.cloneDeep(this.tempLibro);
    this.habilitarEdicion();
  }
}
