import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from './modelo/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private urlEndpoint = 'http://localhost:8086/api';
  constructor(private http: HttpClient, private router: Router) { }

  public obtenerComentarios(isbn: string): Observable<any> {
    return this.http.get(this.urlEndpoint + '/comentario/' + isbn);
  }

  public guardarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.urlEndpoint + '/comentario', comentario);
  }
}
