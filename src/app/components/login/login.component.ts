// login.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioLogin } from '../../model/UsuarioLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  #auth = inject(AuthService);
  #toastr = inject(ToastrService);
  #router = inject(Router);
  usuario = new UsuarioLogin();

  login(form: NgForm): void {
    if (form.valid) {
      this.#auth.login(this.usuario).subscribe({
        next: (response) => {
          if  (response && response.token && response.user && response.user.id) { 
            this.#auth.storeToken(response.token, response.user); 
            this.#router.navigate(['/categoria']);
          } else {
            console.error('Token ou usuário não encontrados na resposta');
          }
        },
        error: (error) => {
          if (error.status === 400) this.#toastr.info(error.error);
          if (error.status === 403) this.#toastr.error('Usuário não existe!');
        }
      });
    } else {
      this.#toastr.info('Preencha os campos!');
    }
  }
}
