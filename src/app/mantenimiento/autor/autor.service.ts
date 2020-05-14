import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private urlEndpoint = 'http://localhost:8083/api/mant/autor';
  constructor(private http: HttpClient, private router: Router) { }

  obtenerPaginaAutores(page: number): Observable<any> {
    const url = this.urlEndpoint + '/page/' + page;
    return this.http.get(url);
  }
  obtenerAutores(): Observable<any> {
    return this.http.get(this.urlEndpoint);
  }
}
