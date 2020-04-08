import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetalleCompra } from './modelo/DetalleCompra';
import { Libro } from './../catalogo/modelo/Libro';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private urlEndPoint: string = 'http://localhost:8085/api';
  constructor(private http: HttpClient, private router: Router) { }

  agregarDetalle(detalle: DetalleCompra): Observable<any> {
    return this.http.post(this.urlEndPoint + '/detalle', detalle).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }
      )
    );
  }

  obtenerCompra(usuarioId: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/compra/' + usuarioId).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  eliminarDetalleCompra(detalleId: number): Observable<any> {
    console.log(this.urlEndPoint + '/detalle/' + detalleId);
    return this.http.delete(this.urlEndPoint + '/detalle/' + detalleId).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

}
