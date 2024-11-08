
/*
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlLogin = `http://localhost:8080/auth/login`;
    const token = localStorage.getItem('token');

    // Log para depuração: Verifique se o token está sendo recuperado
    console.log('Token recuperado:', token);

    // Se for uma requisição de login, apenas define o Content-Type
    if (request.url === urlLogin && request.method === 'POST') {
      const authReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json' // Assumindo que você está enviando JSON
        })
      });
      return next.handle(authReq);
    }

    // Para outras requisições, adiciona o Bearer Token se existir
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      // Log para depuração: Verifique se o cabeçalho Authorization foi adicionado corretamente
      console.log('Requisição com token:', authReq.headers.get('Authorization'));

      return next.handle(authReq);
    }

    // Caso não haja token, continua a requisição sem alterações
    return next.handle(request);
  }
}

*/
