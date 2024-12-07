import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../model/Categoria';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nova-categoria',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './nova-categoria.component.html',
  styleUrl: './nova-categoria.component.css'
})
export class NovaCategoriaComponent {

  categoria = new Categoria();
  selectedFile!: File;
  #categoryService=inject(CategoriaService);
  #toast = inject(ToastrService)


  createCategory(form:NgForm){
    if(this.selectedFile){
      console.log('presente')
    }
    this.#categoryService.insertCategory$(this.selectedFile,this.categoria).subscribe({
      next:(next)=>{
        this.#toast.success('Categoria Salva!')
        form.resetForm();
      }
    })
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }
  
  

}
