import { CategoriaService } from './categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Tag } from './../../catalogo/modelo/Tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Array<Tag>;
  paginador: any;
  url = '/mantenimiento/categoria/';
  constructor(private activatedRoute: ActivatedRoute, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      console.log(page);
      this.categoriaService.obtenerPaginaCategorias(page)
        .subscribe(response => {
          this.categorias = response.content as Tag[];
          this.paginador = response;
        });
    });
  }

}
