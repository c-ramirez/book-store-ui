import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from './catalogo.service';
import { Component, OnInit } from '@angular/core';
import { Libro } from './modelo/Libro';
import { combineLatest } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  constructor(private catalogoService: CatalogoService, private activatedRoute: ActivatedRoute) { }
  libros: Libro[];
  paginador: any;
  url = '/catalogo/';
  ngOnInit() {
    this.activatedRoute.url.pipe(
      withLatestFrom(this.activatedRoute.paramMap, this.activatedRoute.queryParamMap)
    ).subscribe(([url, params, queryMap]) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.catalogoService.listarLibros(page, queryMap.get('tag'))
        .pipe().subscribe(response => {
          this.libros = response.content as Libro[];
          this.paginador = response;
        });
    });

    /* this.activatedRoute.paramMap.subscribe(params => {
       let page: number = +params.get('page');
 
       if (!page) {
         page = 0;
       }
 
       this.catalogoService.listarLibros(page)
         .pipe().subscribe(response => {
           this.libros = response.content as Libro[];
           this.paginador = response;
         });
     });*/
  }

}
