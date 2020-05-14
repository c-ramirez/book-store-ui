import { ActivatedRoute } from '@angular/router';
import { Libro } from './../../catalogo/modelo/Libro';
import { LibroService } from './libro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libros: Array<Libro>;
  paginador: any;
  url = '/mantenimiento/libro/';
  constructor(private libroService: LibroService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      console.log(page);
      this.libroService.obtenerLibros(page)
        .subscribe(response => {
          this.libros = response.content as Libro[];
          this.paginador = response;
        });
    });
  }

}
