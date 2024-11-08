import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {

  #service = inject(AuthService);
  #toastr = inject(ToastrService);
  email:string='';

  enviar(form:NgForm){
    if(form.valid)
    this.#service.recuperar(this.email).subscribe({
      next:()=>{
        this.#toastr.success('Link enviado ao email!')
        form.resetForm();
      },
      error: (err)=> this.#toastr.error(err)
    })
  }

}
