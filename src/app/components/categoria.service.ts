import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  #http = inject(HttpClient);
  #url = signal('http://localhost:8080/categoria')


  public getCategorias$(): Observable<any> {
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.#http.get<any>(this.#url(), { headers });
  }

  public insertCategory$(categoria:Categoria):Observable<Categoria>{
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.#http.post<Categoria>(this.#url(),categoria, { headers });
  }


}
