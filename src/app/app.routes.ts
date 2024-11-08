import { Routes } from '@angular/router';
import { NovoProdutoComponent } from './components/novo-produto/novo-produto.component';
import { DespensaComponent } from './components/despensa/despensa.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { NovaCategoriaComponent } from './components/nova-categoria/nova-categoria.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';

export const routes: Routes = [
  {path:"produto", component:NovoProdutoComponent},
  {path:"alterar-senha", component:AlterarSenhaComponent},
  {path:"cadastro-categoria", component:NovaCategoriaComponent},
  {path:"categoria/despensa/:nome", component:DespensaComponent},
  {path:"despensa", component:DespensaComponent},
  {path:"categoria", component:CategoriaComponent},
  {path:"login", component:LoginComponent},
  {path:"cadastro", component:CadastroComponent},
  {path:"recuperar", component:RecuperarComponent},
  {path:"", component:LoginComponent},
  {path:"**", component:NotFoundComponent}
];
