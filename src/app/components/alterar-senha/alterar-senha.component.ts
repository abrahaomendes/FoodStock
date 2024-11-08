import { Component, Inject, inject, OnInit } from '@angular/core';
import { Usuario } from '../../model/Usuario';
import {  FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.css'
})
export class AlterarSenhaComponent implements OnInit {

  senha:string='';
  repetirSenha:string='';
  id: string  = '';
  #toastr = inject(ToastrService)
  #route = inject(ActivatedRoute)
  #service = inject(AuthService)

  ngOnInit(): void {
    this.#route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log("ID resgatado da URL:", this.id);
    });
  }


  alterarSenha(form: NgForm) {
    if (this.senha === this.repetirSenha) {
      this.#service.alterar(this.senha, this.id).subscribe({
        next: (resp) => {
          this.#toastr.success('Senha alterada com sucesso')
          form.resetForm();
        },
        error: (err) => {
          console.error('Erro na alteração de senha:', err);  // Log do erro
          this.#toastr.error(err.message || 'Erro ao alterar senha');
        }
      });
    } else {
      this.#toastr.error('Senhas não coincidem!');
    }
  }



}
