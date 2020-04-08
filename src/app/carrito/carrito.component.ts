import { AuthService } from './../login/auth.service';
import { CarritoService } from './carrito.service';
import { DetalleCompra } from './modelo/DetalleCompra';
import { Compra } from './modelo/Compra';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  compra: Compra;
  contador: number;
  constructor(private carritoService: CarritoService,
    private authService: AuthService) {
    this.compra = new Compra();
    this.compra.detalles = [];
    this.contador = 1;
  }
  ngOnInit() {
    const usuario = this.authService.usuario;
    this.carritoService.obtenerCompra(usuario.id).subscribe(result => {
      this.compra = result;
    });
  }
  eliminarDetalleCarrito(detalle: DetalleCompra) {
    this.carritoService.eliminarDetalleCompra(detalle.id).subscribe(() => {
      this.compra.total -= detalle.subtotal;
      this.compra.detalles = this.compra.detalles.filter(det => det.id !== detalle.id);
      Swal.fire('Eliminado', 'El producto ha sido retirado del carrito', 'success');
    });
  }

}
