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
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: "produto", component: NovoProdutoComponent, canActivate: [AuthGuard] },
  { path: "alterar-senha", component: AlterarSenhaComponent, canActivate: [AuthGuard] },
  { path: "cadastro-categoria", component: NovaCategoriaComponent, canActivate: [AuthGuard] },
  { path: "categoria/despensa/:nome", component: DespensaComponent, canActivate: [AuthGuard] },
  { path: "despensa", component: DespensaComponent, canActivate: [AuthGuard] },
  { path: "categoria", component: CategoriaComponent, canActivate: [AuthGuard] },
  { path: "configuracao", component: ConfiguracaoComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "recuperar", component: RecuperarComponent },
  { path: "", component: LoginComponent },
  { path: "**", component: NotFoundComponent }
];
