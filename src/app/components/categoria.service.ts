import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  #http = inject(HttpClient);
  #url = signal(`${environment.apiUrl}/categoria`)


  public getCategorias$(): Observable<any> {
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.#http.get<any>(this.#url(), { headers });
  }

  public insertCategory$(file:File,categoria:Categoria):Observable<Categoria>{
    const token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('categoria', JSON.stringify(categoria));
    formData.append('file', file)


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.#http.post<Categoria>(this.#url(), formData, {
      headers,
      responseType: 'json'
    });
  }
  public update$(id:number,file:File,categoria:Categoria):Observable<Categoria>{
    const token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('categoria', JSON.stringify(categoria));
    formData.append('file', file)


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.#http.put<Categoria>(`${this.#url()}/${id}`, formData, {
      headers,
      responseType: 'json'
    });
  }
  public delete$(id:number):Observable<void>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.#http.delete<void>(`${this.#url()}/${id}`,{headers})
  }
}
