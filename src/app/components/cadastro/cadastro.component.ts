import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../model/Usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  #auth=inject(AuthService);
  #toastr=inject(ToastrService);
  usuario=new Usuario();


  cadastrar(form:NgForm){
    console.log(this.usuario)
    this.#auth.cadastro(this.usuario).subscribe({
      next:(next)=>{
        this.#toastr.success('Cadastro Realizado com Sucesso!');
        form.resetForm();
      }
    })
  }

}
