import { Categoria } from "./Categoria";

export class Produto{
  id:number=0;
  nome: string='';
  marca: string='';
  preco?:number;
  categories: Categoria[] = [];
  quantidade?: number;
  unidade:string='';
  validade?: Date;
  descricao?:string;
}

