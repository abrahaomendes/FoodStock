import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../categoria.service';

import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alterar-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alterar-categoria.component.html',
  styleUrl: './alterar-categoria.component.css'
})
export class AlterarCategoriaComponent implements OnInit{

  modalData: any;
  selectedFile!: File;
  #toast = inject(ToastrService)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AlterarCategoriaComponent>,
    private serviceCat: CategoriaService,
  ) {
    this.modalData = { ...data.data };
  }
  ngOnInit(): void {

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
    if(form.valid){
      const { id,imagem, ...modalDataWithoutId } = this.modalData;
      this.serviceCat.update$(this.modalData.id,this.selectedFile,modalDataWithoutId).subscribe({
        next:()=> this.#toast.success('Categoria Atualizada!'),
        error:(err)=> this.#toast.error(err.error)
      })
    }else{
      this.#toast.error('Campos inválidos')
    }

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
