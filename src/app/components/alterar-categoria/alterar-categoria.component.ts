import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../categoria.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<AlterarCategoriaComponent>,
    private serviceCat: CategoriaService,
    private toast: ToastrService
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
    const { id, ...modalDataWithoutId } = this.modalData;
    this.serviceCat.update$(this.modalData.id,this.selectedFile,modalDataWithoutId).subscribe({
      next:(resp)=> this.toast.success('Categoria Atualizada!')
    })

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
