import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DespensaService } from '../despensa.service';
import { Produto } from '../../model/Produto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlterarProdutoComponent } from '../alterar-produto/alterar-produto.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmeDialogComponent } from '../../core/confirme-dialog/confirme-dialog.component';

@Component({
  selector: 'app-despensa',
  standalone: true,
  imports: [NgxPaginationModule,CommonModule,RouterLink, FormsModule],
  templateUrl: './despensa.component.html',
  styleUrl: './despensa.component.css'
})
export class DespensaComponent implements OnInit {

  public items = signal<Array<Produto>>([]);
  public page:number=1;
  #despensaService = inject(DespensaService)
  dialog=inject(MatDialog)
  public total:number=0;
  params:string='';
  array=[1,2,3,4,5]
  #route = inject(ActivatedRoute)


  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(){
    let categoria = this.#route.snapshot.params['nome'];
    if(categoria != null){
     this.getListCat(categoria);
    }else{
      this.getList()
    }
  }

  getListParams(params: string) {
    this.items.set([]);
    this.#despensaService.getListParams$(params).subscribe({
      next: (next) => {
        console.log(next);
        this.items.set(next);
        this.total = next.length;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getListCat(params: string) {
    console.log(params)
    this.items.set([]);
    this.#despensaService.getListCat$(params).subscribe({
      next: (next) => {
        console.log(next);
        this.items.set(next);
        this.total = next.length;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getList(){
    this.#despensaService.getList$().subscribe({
      next: (next) => {
        console.log(next)
        this.items.set(next);
        this.total = next.length;
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }
  delete(id:number){
    let dialogRef = this.dialog.open(ConfirmeDialogComponent);
    dialogRef.afterClosed().subscribe((result:boolean)=>{
    if(result){
    this.#despensaService.delete$(id).subscribe({
      next:(next)=>{
        console.log(next);
        this.carregarLista();
      }
    })}})
  }
  isExpired(date: Date): string {
    const today = new Date();
    const tenDaysFromToday = new Date(today);
    tenDaysFromToday.setDate(today.getDate() + 10);
    const targetDate = new Date(date);

    if (targetDate < today) return 'vencido';
    if (targetDate <= tenDaysFromToday) return 'prestes-a-vencer';
    return '';
  }
  openModal(dado:any) {
    console.log(dado)
    const dialogRef = this.dialog.open(AlterarProdutoComponent, {
      width: '500px',  // Definindo a largura do modal
      data: { data: { ...dado } }  // Passando os dados do produto para o modal
    });

    // Método que será chamado quando o modal for fechado
    dialogRef.afterClosed().subscribe(result => {
        this.carregarLista();

    });

}
}
