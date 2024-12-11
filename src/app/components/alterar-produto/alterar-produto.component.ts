import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';  // Importando o
import { CategoriaService } from '../categoria.service';
import { ProdutoService } from '../produto.service';
import { ToastrService } from 'ngx-toastr';

type Unidade = 'Kg' | 'Unidade' | 'Litro' | 'Pacote';

@Component({
  selector: 'app-alterar-produto',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './alterar-produto.component.html',
  styleUrls: ['./alterar-produto.component.css']
})
export class AlterarProdutoComponent implements OnInit {


  modalData: any;
  categorias:any;
  unidades: Unidade[] = ['Kg', 'Unidade', 'Litro', 'Pacote'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AlterarProdutoComponent>,
    private datePipe: DatePipe,
    private serviceCat: CategoriaService,
    private serviceProd: ProdutoService,
    private toast: ToastrService
  ) {
    this.modalData = { ...data.data };
  }
  ngOnInit(): void {
    this.getCategorias()
      let validadeData = new Date(this.modalData.validade + 1);
      this.modalData.validade = this.datePipe.transform(validadeData, 'yyyy-MM-dd');
  }


  salvarProduto(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.modalData);
    } else {
      console.log('Formulário inválido');
    }
  }

  onClose() {
    this.dialogRef.close();
  }
  onSave(form:NgForm){
    const { id, ...modalDataWithoutId } = this.modalData;
    this.serviceProd.update$(this.modalData.id,modalDataWithoutId).subscribe({
      next:()=> this.toast.success('Produto Atualizado!'),
      error:()=> this.toast.error('Error ao atualizar!')
    })

  }
  getCategorias(){
    this.serviceCat.getCategorias$().subscribe(
      res => {
        console.log(res);
        this.categorias = res.content;
      }
    );
  }
}
