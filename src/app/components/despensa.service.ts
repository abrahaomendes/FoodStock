import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, shareReplay,map } from 'rxjs';
import { Produto } from '../model/Produto';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DespensaService {

  #http = inject(HttpClient);
  #url = signal(`${environment.apiUrl}/produtos`)


  public getList$(): Observable<Produto[]>{
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.#http.get<{content:Produto[]}>(this.#url(),{headers}).pipe(
      map(resp => resp.content),
      shareReplay())
  }

  public getListParams$(nome: string): Observable<Produto[]> {
    let params = new HttpParams()
    .set('nome-produto', nome)
    const token = localStorage.getItem('token');


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.#http.get<{ content: Produto[] }>(this.#url(), { params,headers }).pipe(
      map(resp => resp.content),
      shareReplay()
    );
  }
  public getListCat$(categoria: string): Observable<Produto[]> {
    let params = new HttpParams()
    .set('nome-categoria', categoria)
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.#http.get<{ content: Produto[] }>(`${this.#url()}/categorias`, { params,headers }).pipe(
      map(resp => resp.content),
      shareReplay()
    );
  }
  public delete$(id:number):Observable<any>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.#http.delete<any>(`${this.#url()}/${id}`, {headers});

  }

}
