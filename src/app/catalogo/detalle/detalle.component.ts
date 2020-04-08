import { AuthService } from './../../login/auth.service';
import { DetalleCompra } from './../../carrito/modelo/DetalleCompra';
import { Libro } from './../modelo/Libro';
import { CarritoService } from './../../carrito/carrito.service';
import { CatalogoService } from './../catalogo.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Autor } from '../modelo/Autor';
import { Editorial } from '../modelo/Editorial';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  private libro: Libro = new Libro();
  private cantidad: number;
  constructor(private catalogoService: CatalogoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private carritoService: CarritoService,
              private authService: AuthService) {
    this.libro = new Libro();
    this.libro.autor = new Autor();
    this.libro.editorial = new Editorial();
    this.cantidad = 1;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const isbn = params.get('id');
      if (isbn) {
        this.catalogoService.obtenerDetalleLibro(isbn).subscribe(
          (response: Libro) => {
            console.log(response);
            this.libro = response;
          }
        );
      }
    });
  }

  agregarACarrito() {
    if (this.authService.isAuthenticated()) {
      const detalle = new DetalleCompra();
      detalle.libroId = this.libro.id;
      detalle.libroIsbn = this.libro.isbn;
      detalle.cantidad = this.cantidad;
      detalle.precioUnidad = this.libro.precio;
      detalle.libroTitulo = this.libro.titulo;
      detalle.subtotal = this.cantidad * detalle.precioUnidad;
      const usuario = this.authService.usuario;
      detalle.usuarioId = usuario.id;
      detalle.usuarioDocumento = usuario.persona.documento;
      console.log(detalle);
      this.carritoService.agregarDetalle(detalle).subscribe(e => console.log(e));
      Swal.fire('Carrito', `Producto agregado con exito`, 'success');
    } else {
      Swal.fire('Error', `Debe logearse para agregar productos al carrito`, 'error');
    }
  }


}
