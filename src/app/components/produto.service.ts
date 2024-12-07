import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Produto } from '../model/Produto';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  #http = inject(HttpClient);
  #url = signal("http://localhost:8080/produtos")


  #setCreate = signal<any>(null);
  get getCreate(){
    return this.#setCreate.asReadonly();
  }
  public create(produto:Produto):Observable<any>{
    const token = localStorage.getItem('token');
    var headers = new HttpHeaders({"Content-Type":"application/json",  'Authorization': `Bearer ${token}` })

    return this.#http.post<any>(this.#url(), produto, {headers}).pipe(
      shareReplay(),
      tap((res) => this.#setCreate.set(res))
    )
  }
  public update$(id:number,produto:Produto):Observable<any>{
    const token = localStorage.getItem('token');
    var headers = new HttpHeaders({"Content-Type":"application/json",  'Authorization': `Bearer ${token}` })

    return this.#http.put<any>(`${this.#url()}/${id}`, produto, {headers}).pipe(
      shareReplay(),
      tap((res) => this.#setCreate.set(res))
    )
  }
}
