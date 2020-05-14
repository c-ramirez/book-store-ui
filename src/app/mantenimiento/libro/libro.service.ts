import { Libro } from './../../catalogo/modelo/Libro';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private urlEndpoint = 'http://localhost:8083/api/mant/libro';
  constructor(private http: HttpClient, private router: Router) { }

  obtenerLibros(page: number): Observable<any> {
    const url = this.urlEndpoint + '/page/' + page;
    return this.http.get(url);
  }
  obtenerDetalleLibro(isbn: string): Observable<any> {
    return this.http.get(this.urlEndpoint + '/' + isbn);
  }
  guardarLibro(libro: Libro): Observable<any> {
    return this.http.post(this.urlEndpoint, libro);
  }
}
