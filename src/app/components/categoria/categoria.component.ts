import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from '../../model/Categoria';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  #apiServiceCat=inject(CategoriaService);
  #router=inject(Router)
  categorias:Array<Categoria>=[
  ]

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(){
    return this.#apiServiceCat.getCategorias$().subscribe(
      res =>{

        this.categorias = res.content
        console.log(this.categorias)
      }
    )
  }

}
