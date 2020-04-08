import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Libro } from './modelo/Libro';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private urlEndpoint = 'http://localhost:8083/api/libro';
  private urlDetalle = 'http://localhost:8083/api/libro/';
  private urlTag = 'http://localhost:8083/api/tag';
  constructor(private http: HttpClient, private router: Router) { }

  listarLibros(page: number, tag: string): Observable<any> {
    let endpoint = this.urlEndpoint + '/page/' + page;
    if (tag) {
      endpoint += '?tag=' + tag;
    }
    return this.http.get(endpoint).pipe(
      tap((response: any) => {
        console.log(response);
      }),
      map((response: any) => {
        (response.content as Libro[]).map(libro => {
          libro.titulo = libro.titulo.toUpperCase();
          return libro;
        });
        return response;
      })
    );
  }
  obtenerDetalleLibro(isbn: string): Observable<any> {
    return this.http.get(this.urlDetalle + isbn);
  }
  obtenerTags(): Observable<any> {
    return this.http.get(this.urlTag);
  }
}
