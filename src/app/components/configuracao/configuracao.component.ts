// configuracao.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css'
})
export class ConfiguracaoComponent implements OnInit {

  senha: string = '';
  repetirSenha: string = '';
  id: string = ''; 
  #toastr = inject(ToastrService);
  #route = inject(ActivatedRoute);
  #service = inject(AuthService);

  ngOnInit(): void {
    const user = this.#service.getCurrentUser();
    if (user && user.id) {
      this.id = user.id;
    } else {
      this.#toastr.error('Usuário não encontrado!');
    }
  }

  alterarSenha(form: NgForm) {
    if (this.senha === this.repetirSenha) {
      this.#service.alterar(this.senha, this.id).subscribe({
        next: (resp) => {
          this.#toastr.success('Senha alterada com sucesso');
          form.resetForm();
        },
        error: (err) => {
          console.error('Erro na alteração de senha:', err);
          this.#toastr.error(err.message || 'Erro ao alterar senha');
        }
      });
    } else {
      this.#toastr.error('Senhas não coincidem!');
    }
  }
}
