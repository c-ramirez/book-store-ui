import { Tag } from './../catalogo/modelo/Tag';
import { CatalogoService } from './../catalogo/catalogo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  tags: Array<Tag> = [];
  constructor(catalogoService: CatalogoService) {
    catalogoService.obtenerTags().subscribe(result =>{
      this.tags = result;
    }
    );
  }

  ngOnInit() {

  }

}
