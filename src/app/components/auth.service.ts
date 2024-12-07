// auth.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  url = 'http://localhost:8080/auth';

  public cadastro(usuario: Usuario): Observable<any> {
    return this.#http.post<any>(`${this.url}/register`, usuario);
  }

  public login(usuario: UsuarioLogin): Observable<any> {
    return this.#http.post<any>(`${this.url}/login`, usuario);
  }

  public recuperar(email: string): Observable<any> {
    let body = { email: email }
    console.log(body);
    return this.#http.post<any>(`${this.url}/recover`, body);
  }

  public alterar(senha: string, id: string): Observable<any> {
    let params = new HttpParams().set('id', id);
    let body = { novaSenha: senha };
    return this.#http.post<any>(`${this.url}/change-password`, body, { params });
  }


  storeToken(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));  
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
}
