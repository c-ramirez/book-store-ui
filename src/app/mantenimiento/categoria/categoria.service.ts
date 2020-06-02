import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlEndpoint = 'http://localhost:8083/api/categoria';
  constructor(private http: HttpClient, private router: Router) { }
  obtenerPaginaCategorias(pagina: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + pagina);
  }
  obtenerCategorias(): Observable<any> {
    return this.http.get(this.urlEndpoint);
  }
}
