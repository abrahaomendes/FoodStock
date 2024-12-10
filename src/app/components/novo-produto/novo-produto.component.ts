import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { CategoriaService } from '../categoria.service';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../../model/Produto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-novo-produto',
  standalone: true,
  imports: [FormsModule, RouterLink,CommonModule, NgxMaskDirective],
  templateUrl: './novo-produto.component.html',
  styleUrl: './novo-produto.component.css'
})
export class NovoProdutoComponent implements OnInit {

  ngOnInit(): void {
    this.carregarCategorias();
  }

  #toastr = inject(ToastrService);
  produto = new Produto();
  #apiService = inject(ProdutoService);
  #apiServiceCat = inject(CategoriaService);
  categorias: Array<any> = [];
  categoriaSelecionada: any;

  createProduct(form: NgForm) {
    if (form.valid) {
        if (this.categoriaSelecionada) {
            this.produto.categories = [this.categoriaSelecionada];
        }
        return this.#apiService.create(this.produto).subscribe({
            next: (next) => {
                this.produto = next;
                this.#toastr.success('Salvo com sucesso!');
                form.resetForm();
            },
            error: (error) => {
                this.#toastr.error(error.error);
            }
        });
    } else {
        this.#toastr.info('Preencha os campos obrigatórios!');
    }
    return null;
}


  carregarCategorias() {
    return this.#apiServiceCat.getCategorias$().subscribe(
      res => {
        console.log(res);
        this.categorias = res.content;
      }
    );
  }
}
