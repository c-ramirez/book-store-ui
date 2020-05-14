import { ActivatedRoute } from '@angular/router';
import { AutorService } from './autor.service';
import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/catalogo/modelo/Autor';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autores: Array<Autor>;
  paginador: any;
  url = '/mantenimiento/autor/';
  constructor(private autorService: AutorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      console.log(page);
      this.autorService.obtenerPaginaAutores(page)
        .subscribe(response => {
          this.autores = response.content as Autor[];
          this.paginador = response;
        });
    });
  }

}
