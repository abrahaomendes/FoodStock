import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../model/Categoria';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-nova-categoria',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './nova-categoria.component.html',
  styleUrl: './nova-categoria.component.css'
})
export class NovaCategoriaComponent {

  categoria = new Categoria();
  #categoryService=inject(CategoriaService);


  createCategory(form:NgForm){
    this.#categoryService.insertCategory$(this.categoria).subscribe({
      next:(next)=>{
        console.log(next);
      }
    })
    }

}
