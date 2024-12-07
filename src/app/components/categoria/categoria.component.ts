import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from '../../model/Categoria';
import { MatDialog } from '@angular/material/dialog';
import { AlterarCategoriaComponent } from '../alterar-categoria/alterar-categoria.component';

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
  dialog=inject(MatDialog)
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
  openModal(dado:any) {
    const dialogRef = this.dialog.open(AlterarCategoriaComponent, {
      width: '500px',  
      data: { data: { ...dado } }  
    });

    dialogRef.afterClosed().subscribe(result => {
        this.carregarCategorias();
      
    });
  }
}
